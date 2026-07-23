import fs from "fs-extra";
import path from "node:path";
import pc from "picocolors";
import { readConfig } from "../utils/file.js";
import { installDependencies } from "../utils/pkg.js";
import {
  getRegistryIndex,
  getRegistryItem,
  resolveRegistryDependencies,
} from "../utils/registry.js";

interface AddOptions {
  overwrite?: boolean;
  all?: boolean;
}

/**
 * Command handler to fetch and install Nikala UI components from the registry or remote URLs.
 * Automatically resolves dependencies and installs missing NPM packages.
 *
 * @param components - List of component names or HTTP(S) URLs specified by the user
 * @param options - CLI options including --overwrite and --all
 */
export async function add(components: string[], options: AddOptions) {
  const cwd = process.cwd();
  const config = await readConfig(cwd);

  if (!config) {
    console.log(pc.red("❌ nikala.config.json not found! Run `nikala init` first."));
    process.exit(1);
  }

  const registryIndex = await getRegistryIndex();

  // Determine target components to install
  let requestedComponents = components;
  if (options.all) {
    if (!registryIndex) {
      console.log(pc.red("❌ Failed to load registry index for --all flag."));
      process.exit(1);
    }
    requestedComponents = registryIndex.map((item) => item.name);
  }

  if (requestedComponents.length === 0) {
    console.log(pc.yellow("⚠️  No components specified. Usage: `nikala add button` or `nikala add <URL>`"));
    return;
  }

  // Resolve all internal or remote component dependencies recursively
  const resolvedTargets = await resolveRegistryDependencies(requestedComponents);
  const componentsDir = path.resolve(cwd, config.alias.components);

  console.log(pc.cyan(`\n🎨 Adding components to ${config.alias.components}...\n`));

  const requiredNpmDeps = new Set<string>();

  for (const target of resolvedTargets) {
    const item = await getRegistryItem(target);

    if (!item) {
      if (target.startsWith("http://") || target.startsWith("https://")) {
        console.log(pc.red(`❌ Failed to fetch component from remote URL: ${target}`));
      } else {
        const availableStr = registryIndex ? registryIndex.map((i) => i.name).join(", ") : "none";
        console.log(pc.red(`❌ "${target}" not found in registry. Available: ${availableStr}`));
      }
      continue;
    }

    // Collect required NPM dependencies for this component
    if (item.dependencies && item.dependencies.length > 0) {
      for (const dep of item.dependencies) {
        requiredNpmDeps.add(dep);
      }
    }

    // Process and write component files
    for (const file of item.files) {
      const fileName = path.basename(file.path);
      const targetFilePath = path.join(componentsDir, fileName);

      if ((await fs.pathExists(targetFilePath)) && !options.overwrite) {
        console.log(pc.yellow(`⚠️  ${fileName} already exists. Use --overwrite to replace.`));
        continue;
      }

      await fs.ensureDir(componentsDir);
      await fs.writeFile(targetFilePath, file.content, "utf-8");

      const sourceInfo = target.startsWith("http") ? ` (from remote URL)` : "";
      console.log(pc.green(`  ✓ Added ${fileName}${sourceInfo}`));
    }
  }

  // Inspect user's package.json to identify missing NPM dependencies
  const userPkgPath = path.join(cwd, "package.json");
  const missingNpmDeps: string[] = [];

  if (await fs.pathExists(userPkgPath)) {
    try {
      const userPkg = await fs.readJson(userPkgPath);
      const installedDeps = {
        ...userPkg.dependencies,
        ...userPkg.devDependencies,
      };

      for (const dep of requiredNpmDeps) {
        if (!installedDeps[dep]) {
          missingNpmDeps.push(dep);
        }
      }
    } catch {
      missingNpmDeps.push(...Array.from(requiredNpmDeps));
    }
  } else {
    missingNpmDeps.push(...Array.from(requiredNpmDeps));
  }

  // Automatically install any missing NPM packages
  if (missingNpmDeps.length > 0) {
    await installDependencies(missingNpmDeps, cwd);
  }

  console.log(pc.cyan("\n✅ Components successfully added!"));
  console.log(pc.white(`Import example: import { Button } from "${config.alias.components}/button"`));
}