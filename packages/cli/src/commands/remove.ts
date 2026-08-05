import fs from "fs-extra";
import path from "node:path";
import prompts from "prompts";
import pc from "picocolors";
import { readConfig } from "../utils/file.js";
import { getRegistryIndex } from "../utils/registry.js";

interface RemoveOptions {
  all?: boolean;
  hook?: boolean;
}

/**
 * Command handler to safely uninstall/remove local Nikala UI components or reactive hooks.
 */
export async function removeCommand(components: string[] = [], options: RemoveOptions = {}) {
  const cwd = process.cwd();
  const config = await readConfig(cwd);

  if (!config) {
    console.log(pc.red("❌ nikala.config.json not found! Run `nikala init` first."));
    process.exit(1);
  }

  const isHookMode = Boolean(options.hook);
  const targetDir = isHookMode
    ? config.alias.hooks
      ? path.resolve(cwd, config.alias.hooks)
      : path.join(cwd, "src/hooks")
    : path.resolve(cwd, config.alias.components);

  if (!(await fs.pathExists(targetDir))) {
    console.log(pc.yellow(`⚠️ Directory ${targetDir} does not exist.`));
    return;
  }

  // Find installed files in target directory
  const files = await fs.readdir(targetDir);
  const installedItems: string[] = [];

  for (const file of files) {
    if (file.endsWith(".tsx") || file.endsWith(".ts")) {
      const name = path.basename(file, path.extname(file));
      if (name !== "index" && name !== "cn") {
        installedItems.push(name);
      }
    }
  }

  if (installedItems.length === 0) {
    console.log(pc.yellow(`\n⚠️ No installed ${isHookMode ? "hooks" : "components"} found to remove.`));
    return;
  }

  let itemsToRemove: string[] = [];

  if (options.all || components.includes("all")) {
    itemsToRemove = installedItems;
  } else if (components.length > 0) {
    itemsToRemove = components.filter((c) => installedItems.includes(c));
    if (itemsToRemove.length === 0) {
      console.log(pc.red(`❌ None of the specified items (${components.join(", ")}) exist in ${targetDir}`));
      return;
    }
  } else {
    const response = await prompts({
      type: "autocompleteMultiselect",
      name: "selectedItems",
      message: `Select ${isHookMode ? "hooks" : "components"} to remove (Space to select, Enter to confirm)`,
      choices: installedItems.map((item) => ({
        title: item,
        value: item,
      })),
      hint: "- Space to select. Return to submit.",
    });

    if (!response.selectedItems || response.selectedItems.length === 0) {
      console.log(pc.yellow(`\n❌ Removal cancelled. No items selected.`));
      return;
    }

    itemsToRemove = response.selectedItems;
  }

  const confirmPrompt = await prompts({
    type: "confirm",
    name: "confirmed",
    message: `Are you sure you want to delete ${itemsToRemove.length} item(s) (${itemsToRemove.join(", ")})?`,
    initial: false,
  });

  if (!confirmPrompt.confirmed) {
    console.log(pc.yellow("\n❌ Removal cancelled."));
    return;
  }

  console.log(pc.cyan(`\n🗑️ Removing items...\n`));

  for (const name of itemsToRemove) {
    const tsxPath = path.join(targetDir, `${name}.tsx`);
    const tsPath = path.join(targetDir, `${name}.ts`);

    if (await fs.pathExists(tsxPath)) {
      await fs.remove(tsxPath);
      console.log(pc.green(`  ✓ Removed ${name}.tsx`));
    } else if (await fs.pathExists(tsPath)) {
      await fs.remove(tsPath);
      console.log(pc.green(`  ✓ Removed ${name}.ts`));
    }
  }

  console.log(pc.green(`\n✅ Successfully removed ${itemsToRemove.length} ${isHookMode ? "hook(s)" : "component(s)"}!`));
}
