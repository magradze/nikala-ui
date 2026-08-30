import fs from "fs-extra";
import path from "node:path";
import prompts from "prompts";
import pc from "picocolors";
import { readConfig } from "../utils/file.js";
import { installDependencies } from "../utils/pkg.js";
import {
  getRegistryIndex,
  getRegistryItem,
  resolveRegistryDependencies,
} from "../utils/registry.js";
import { writeComponentFiles } from "../utils/add/write-component-files.js";

interface AddOptions {
  overwrite?: boolean;
  all?: boolean;
  hook?: boolean;
  block?: boolean;
}

/**
 * Command handler to fetch and install Nikala UI components from GitHub remote registry or custom URLs.
 */
export async function add(components: string[] = [], options: AddOptions = {}) {
  const cwd = process.cwd();
  const config = await readConfig(cwd);

  if (!config) {
    console.log(pc.red("❌ nikala.config.json not found! Run `nikala init` first."));
    process.exit(1);
  }

  const registryIndex = await getRegistryIndex();
  if (!registryIndex) {
    console.log(pc.red("❌ Failed to load registry index. Ensure network connection or build registry."));
    process.exit(1);
  }

  const isHookMode = Boolean(options.hook);
  const isBlockMode = Boolean(options.block);

  let filteredRegistry = registryIndex;
  if (isHookMode) {
    filteredRegistry = registryIndex.filter((item) => item.type === "registry:hook");
  } else if (isBlockMode) {
    filteredRegistry = registryIndex.filter((item) => item.type === "registry:block");
  } else {
    filteredRegistry = registryIndex.filter((item) => item.type !== "registry:hook");
  }

  const isAllRequested = options.all || components.includes("all");
  let requestedComponents = components.filter((c) => c !== "all");

  if (isAllRequested) {
    requestedComponents = filteredRegistry.map((item) => item.name);
  } else if (requestedComponents.length === 0) {
    const itemLabel = isHookMode ? "hooks" : isBlockMode ? "blocks" : "components";
    const response = await prompts({
      type: "autocompleteMultiselect",
      name: "selectedComponents",
      message: `Select ${itemLabel} to install (Space to toggle, Enter to confirm)`,
      choices: filteredRegistry.map((item) => ({
        title: item.title,
        description: item.description,
        value: item.name,
      })),
      hint: "- Space to select. Return to submit",
    });

    if (!response.selectedComponents || response.selectedComponents.length === 0) {
      console.log(pc.yellow(`\n❌ Installation cancelled. No ${itemLabel} selected.`));
      return;
    }

    requestedComponents = response.selectedComponents;
  }

  const resolvedTargets = await resolveRegistryDependencies(
    requestedComponents,
    config.registries
  );
  const componentsDir = path.resolve(cwd, config.alias.components);

  console.log(pc.cyan(`\n🎨 Adding items to project...\n`));

  const requiredNpmDeps = new Set<string>();

  if (isHookMode) {
    requiredNpmDeps.add("@nikala-ui/hooks");
  }

  for (const target of resolvedTargets) {
    const item = await getRegistryItem(target, config.registries);

    if (!item) {
      const availableStr = registryIndex ? registryIndex.map((i) => i.name).join(", ") : "none";
      console.log(pc.red(`❌ "${target}" not found in registry. Available: ${availableStr}`));
      continue;
    }

    if (item.dependencies && item.dependencies.length > 0) {
      for (const dep of item.dependencies) {
        requiredNpmDeps.add(dep);
      }
    }

    await writeComponentFiles(cwd, item, componentsDir, options.overwrite);
  }

  // Inspect user package.json and install missing NPM packages
  const userPkgPath = path.join(cwd, "package.json");
  if (await fs.pathExists(userPkgPath)) {
    try {
      const userPkg = await fs.readJson(userPkgPath);
      const installedDeps = {
        ...userPkg.dependencies,
        ...userPkg.devDependencies,
      };

      const missingDeps = Array.from(requiredNpmDeps).filter(
        (dep) => !installedDeps[dep]
      );

      if (missingDeps.length > 0) {
        console.log(
          pc.cyan(`\n📦 Installing missing dependencies: ${missingDeps.join(", ")}...\n`)
        );
        await installDependencies(missingDeps, cwd);
      }
    } catch {
      // Gracefully continue
    }
  }

  console.log(pc.green(`\n✨ Successfully added ${resolvedTargets.length} item(s)!`));
}