import fs from "fs-extra";
import path from "node:path";
import pc from "picocolors";
import type { RegistryItem } from "../../registry/index.js";

/**
 * Writes registry component files to target workspace directories (ui vs providers).
 */
export async function writeComponentFiles(
  cwd: string,
  item: RegistryItem,
  componentsDir: string,
  overwrite: boolean = false
): Promise<void> {
  for (const file of item.files) {
    let targetFilePath: string;

    if (file.path.startsWith("ui/")) {
      const relativePath = file.path.replace(/^ui\//, "");
      targetFilePath = path.join(componentsDir, relativePath);
    } else {
      targetFilePath = path.resolve(cwd, "src", file.path);
    }

    const displayPath = path.relative(cwd, targetFilePath);

    if ((await fs.pathExists(targetFilePath)) && !overwrite) {
      console.log(pc.yellow(`⚠️  ${displayPath} already exists. Use --overwrite to replace.`));
      continue;
    }

    await fs.ensureDir(path.dirname(targetFilePath));
    await fs.writeFile(targetFilePath, file.content, "utf-8");
    console.log(pc.green(`  ✓ Added ${displayPath}`));
  }
}