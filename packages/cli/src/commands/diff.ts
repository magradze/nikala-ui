import fs from "fs-extra";
import path from "node:path";
import prompts from "prompts";
import pc from "picocolors";
import { readConfig } from "../utils/file.js";
import { getRegistryItem } from "../utils/registry.js";
import { compareLines } from "../utils/diff/compare-lines.js";
import { printFormattedDiff } from "../utils/diff/format-diff.js";

/**
 * Command handler for `nikala diff [component]`.
 * Compares local installed component files against latest registry manifests and displays line differences.
 *
 * @param componentName - Optional specific component name to diff (e.g., "button")
 */
export async function diffCommand(componentName?: string) {
  const cwd = process.cwd();
  const config = await readConfig(cwd);

  if (!config) {
    console.log(pc.red("❌ nikala.config.json not found! Run `nikala init` first."));
    process.exit(1);
  }

  const componentsDir = path.resolve(cwd, config.alias.components);

  if (!(await fs.pathExists(componentsDir))) {
    console.log(pc.yellow(`⚠️ Components directory not found: ${config.alias.components}`));
    return;
  }

  let targets: string[] = [];

  if (componentName) {
    targets = [componentName];
  } else {
    // Scan all installed component .tsx files in local components directory
    const files = await fs.readdir(componentsDir);
    targets = files
      .filter((f) => f.endsWith(".tsx"))
      .map((f) => path.basename(f, ".tsx"));
  }

  if (targets.length === 0) {
    console.log(pc.yellow("No local components found to compare."));
    return;
  }

  console.log(pc.cyan("\nComparing local components with latest registry manifests...\n"));

  let totalDiffsFound = 0;

  for (const name of targets) {
    const registryItem = await getRegistryItem(name);
    if (!registryItem) {
      continue;
    }

    const targetFile = registryItem.files.find(
      (f) => path.basename(f.path, ".tsx") === name
    );
    if (!targetFile) continue;

    const localFilePath = path.join(componentsDir, `${name}.tsx`);
    if (!(await fs.pathExists(localFilePath))) continue;

    const localContent = await fs.readFile(localFilePath, "utf-8");
    const diffs = compareLines(localContent, targetFile.content);
    const hasChanges = diffs.some((d) => d.type !== "same");

    if (hasChanges) {
      totalDiffsFound++;
      console.log(pc.bold(pc.yellow(`Differences found in ${name}.tsx:`)));
      printFormattedDiff(diffs);

      const response = await prompts({
        type: "select",
        name: "action",
        message: `Action for ${name}.tsx:`,
        choices: [
          { title: "Keep local version (skip)", value: "skip" },
          { title: "Overwrite with latest registry version", value: "overwrite" },
        ],
        initial: 0,
      });

      if (response.action === "overwrite") {
        await fs.writeFile(localFilePath, targetFile.content, "utf-8");
        console.log(pc.green(`  ✓ Overwrote ${name}.tsx with latest registry version.\n`));
      } else {
        console.log(pc.dim(`  Kept local version of ${name}.tsx.\n`));
      }
    } else {
      console.log(`  ✓ ${pc.bold(name)}.tsx is up-to-date with registry`);
    }
  }

  if (totalDiffsFound === 0) {
    console.log(pc.green("\nAll local components are up-to-date with the latest registry manifests!"));
  }
}