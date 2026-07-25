import fs from "fs-extra";
import path from "node:path";
import prompts from "prompts";
import pc from "picocolors";
import { readConfig, writeConfig } from "../utils/file.js";
import { generateThemeCss, BASE_PALETTES, PRIMARY_COLORS } from "../utils/theme.js";

/**
 * Command handler for `nikala theme` and `nikala theme set`.
 * Supports both interactive prompts and positional arguments (e.g. `nikala theme set sky slate`).
 */
export async function themeCommand(primaryArg?: string, baseArg?: string) {
  const cwd = process.cwd();
  const config = await readConfig(cwd);

  if (!config) {
    console.log(pc.red("❌ nikala.config.json not found! Run `nikala init` first."));
    process.exit(1);
  }

  let selectedPrimary = primaryArg || config.primaryColor || "wine";
  let selectedBase = baseArg || config.baseColor || "zinc";

  // If no arguments provided, launch interactive prompts
  if (!primaryArg) {
    console.log(pc.cyan("🎨 Customize Nikala UI Theme\n"));

    const response = await prompts([
      {
        type: "select",
        name: "primaryColor",
        message: "Select primary brand accent color",
        choices: Object.keys(PRIMARY_COLORS).map((key) => ({
          title: key.charAt(0).toUpperCase() + key.slice(1),
          value: key,
        })),
        initial: Object.keys(PRIMARY_COLORS).indexOf(selectedPrimary),
      },
      {
        type: "select",
        name: "baseColor",
        message: "Select base gray palette",
        choices: Object.keys(BASE_PALETTES).map((key) => ({
          title: key.charAt(0).toUpperCase() + key.slice(1),
          value: key,
        })),
        initial: Object.keys(BASE_PALETTES).indexOf(selectedBase),
      },
    ]);

    if (!response.primaryColor || !response.baseColor) {
      console.log(pc.yellow("\n❌ Theme update cancelled."));
      return;
    }

    selectedPrimary = response.primaryColor;
    selectedBase = response.baseColor;
  }

  const cssPathRelative = config.css || "src/index.css";
  const cssPath = path.resolve(cwd, cssPathRelative);

  const generatedCss = generateThemeCss(selectedBase, selectedPrimary);

  await fs.ensureDir(path.dirname(cssPath));
  await fs.writeFile(cssPath, generatedCss, "utf-8");

  await writeConfig(cwd, {
    ...config,
    baseColor: selectedBase,
    primaryColor: selectedPrimary,
  });

  console.log(
    pc.green(
      `\n✅ Theme updated successfully! Primary: ${pc.bold(selectedPrimary)}, Base: ${pc.bold(selectedBase)}`
    )
  );
  console.log(pc.white(`Updated ${cssPathRelative}`));
}