import fs from "fs-extra";
import path from "node:path";
import pc from "picocolors";
import type { RegistryItem } from "../../types/registry.js";

/**
 * Writes registry component files to target workspace directories (ui vs blocks vs hooks).
 *
 * @param cwd - Working directory path of the target project
 * @param item - Registry item manifest containing files
 * @param componentsDir - Target components directory path (src/components/ui)
 * @param overwrite - Whether to overwrite existing files
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
    } else if (file.path.startsWith("blocks/") || file.type === "registry:block") {
      const relativePath = file.path.startsWith("blocks/")
        ? file.path.replace(/^blocks\//, "")
        : file.path;
      // Default blocks destination is src/components/blocks
      const blocksDir = path.resolve(path.dirname(componentsDir), "blocks");
      targetFilePath = path.join(blocksDir, relativePath);
    } else if (file.path.startsWith("hooks/")) {
      const relativePath = file.path.replace(/^hooks\//, "");
      const hooksDir = path.resolve(cwd, "src/hooks");
      targetFilePath = path.join(hooksDir, relativePath);
    } else {
      targetFilePath = path.resolve(cwd, "src", file.path);
    }

    const displayPath = path.relative(cwd, targetFilePath);

    if ((await fs.pathExists(targetFilePath)) && !overwrite) {
      console.log(pc.yellow(`  ⚠️  ${displayPath} already exists. Use --overwrite to replace.`));
      continue;
    }

    await fs.ensureDir(path.dirname(targetFilePath));
    await fs.writeFile(targetFilePath, file.content, "utf-8");
    console.log(pc.green(`  ✓ Added ${displayPath}`));
  }
}