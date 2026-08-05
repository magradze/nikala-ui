import fs from "fs-extra";
import path from "node:path";
import prompts from "prompts";
import pc from "picocolors";
import { readConfig } from "../utils/file.js";
import { installDependencies } from "../utils/pkg.js";
import { getRegistryIndex, getRegistryItem } from "../utils/registry.js";
import { writeComponentFiles } from "../utils/add/write-component-files.js";

interface UpgradeOptions {
  all?: boolean;
  overwrite?: boolean;
}

/**
 * Command handler to inspect local components/hooks against the latest registry
 * and update them to the latest versions.
 */
export async function upgradeCommand(targets: string[] = [], options: UpgradeOptions = {}) {
  const cwd = process.cwd();
  const config = await readConfig(cwd);

  if (!config) {
    console.log(pc.red("❌ nikala.config.json not found! Run `nikala init` first."));
    process.exit(1);
  }

  const registryIndex = await getRegistryIndex();
  if (!registryIndex) {
    console.log(pc.red("❌ Failed to fetch registry index. Ensure network connection."));
    process.exit(1);
  }

  const componentsDir = path.resolve(cwd, config.alias.components);
  const hooksDir = config.alias.hooks ? path.resolve(cwd, config.alias.hooks) : path.join(cwd, "src/hooks");

  // Inspect locally installed components and hooks
  const installedItems: Array<{ name: string; type: string; title: string }> = [];

  for (const item of registryIndex) {
    const isHook = item.type === "registry:hook";
    const targetDir = isHook ? hooksDir : componentsDir;
    const itemPath = path.join(targetDir, `${item.name}.tsx`);
    const hookItemPath = path.join(targetDir, `${item.name}.ts`);

    if ((await fs.pathExists(itemPath)) || (await fs.pathExists(hookItemPath))) {
      installedItems.push({
        name: item.name,
        type: item.type,
        title: item.title,
      });
    }
  }

  if (installedItems.length === 0) {
    console.log(pc.yellow("\n⚠️ No Nikala UI components or hooks found in your project to upgrade."));
    return;
  }

  let itemsToUpgrade: string[] = [];

  if (options.all || targets.includes("all")) {
    itemsToUpgrade = installedItems.map((i) => i.name);
  } else if (targets.length > 0) {
    itemsToUpgrade = targets.filter((t) => installedItems.some((i) => i.name === t));
    if (itemsToUpgrade.length === 0) {
      console.log(pc.red(`❌ None of the requested items (${targets.join(", ")}) are installed locally.`));
      return;
    }
  } else {
    const response = await prompts({
      type: "autocompleteMultiselect",
      name: "selected",
      message: "Select installed components/hooks to upgrade to latest version",
      choices: installedItems.map((item) => ({
        title: `${item.title} (${item.type === "registry:hook" ? "Hook" : "Component"})`,
        value: item.name,
        selected: true,
      })),
      hint: "- Space to toggle selection. Return to confirm.",
    });

    if (!response.selected || response.selected.length === 0) {
      console.log(pc.yellow("\n❌ Upgrade cancelled. No items selected."));
      return;
    }

    itemsToUpgrade = response.selected;
  }

  // 2. Resolve internal registry component dependencies automatically
  const { resolveRegistryDependencies } = await import("../utils/registry.js");
  const resolvedUpgradeTargets = await resolveRegistryDependencies(itemsToUpgrade);

  console.log(pc.cyan(`\n🔄 Upgrading ${resolvedUpgradeTargets.length} item(s) to latest registry version...\n`));

  const requiredNpmDeps = new Set<string>();

  for (const name of resolvedUpgradeTargets) {
    const item = await getRegistryItem(name);
    if (!item) continue;

    const isHook = item.type === "registry:hook";
    const targetDir = isHook ? hooksDir : componentsDir;

    if (item.dependencies) {
      for (const dep of item.dependencies) {
        requiredNpmDeps.add(dep);
      }
    }

    await writeComponentFiles(cwd, item, targetDir, true);
    console.log(pc.green(`  ✓ Updated ${name} (${isHook ? "Hook" : "Component"})`));
  }

  // Check npm packages upgrade
  const missingNpmDeps: string[] = [];
  const userPkgPath = path.join(cwd, "package.json");

  if (await fs.pathExists(userPkgPath)) {
    try {
      const userPkg = await fs.readJson(userPkgPath);
      const installed = { ...userPkg.dependencies, ...userPkg.devDependencies };

      for (const dep of requiredNpmDeps) {
        if (!installed[dep]) {
          missingNpmDeps.push(dep);
        }
      }
    } catch {
      missingNpmDeps.push(...Array.from(requiredNpmDeps));
    }
  }

  if (missingNpmDeps.length > 0) {
    console.log(pc.yellow("\n📦 Installing newly required dependencies..."));
    await installDependencies(missingNpmDeps, cwd);
  }

  console.log(pc.green(`\n✅ Successfully upgraded ${itemsToUpgrade.length} item(s) to latest version!`));
}
