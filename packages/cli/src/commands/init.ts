import fs from "fs-extra";
import path from "node:path";
import prompts from "prompts";
import pc from "picocolors";
import { cnTemplate } from "../utils/cn.js";
import { writeConfig } from "../utils/file.js";
import { installDependencies } from "../utils/pkg.js";
import { configureAliases } from "../utils/init/configure-alias.js";
import { setupCssTheme } from "../utils/init/setup-css.js";

interface InitOptions {
  defaults?: boolean;
}

/**
 * Initializes Nikala UI workspace configuration and sets up design tokens.
 */
export async function init(options: InitOptions) {
  const cwd = process.cwd();
  console.log(pc.cyan("🎨 Initializing Nikala UI...\n"));

  const config = options.defaults
    ? {
        componentsDir: "src/components/ui",
        utilsDir: "src/lib",
      baseColor: "zinc",
      primaryColor: "wine",
      }
    : await prompts([
        {
          type: "text",
          name: "componentsDir",
          message: "Components directory path",
          initial: "src/components/ui",
        },
        {
          type: "text",
          name: "utilsDir",
          message: "Utility functions directory path",
          initial: "src/lib",
        },
      {
        type: "select",
        name: "baseColor",
        message: "Select base gray palette",
        choices: [
          { title: "Zinc (Modern cool gray)", value: "zinc" },
          { title: "Slate (Slightly blue gray)", value: "slate" },
          { title: "Gray (Neutral gray)", value: "gray" },
          { title: "Neutral (Warm gray)", value: "neutral" },
          { title: "Stone (Earth gray)", value: "stone" },
        ],
        initial: 0,
      },
      {
        type: "select",
        name: "primaryColor",
        message: "Select primary brand accent color",
        choices: [
          { title: "Wine (Pirosmani Red)", value: "wine" },
          { title: "Violet (Deep Purple)", value: "violet" },
          { title: "Sky (Vibrant Blue)", value: "sky" },
          { title: "Emerald (Rich Green)", value: "emerald" },
          { title: "Rose (Vivid Pink)", value: "rose" },
          { title: "Amber (Warm Gold)", value: "amber" },
          { title: "Zinc (Monochrome)", value: "zinc" },
        ],
        initial: 0,
      },
      ]);

  if (!config.componentsDir || !config.utilsDir) {
    console.log(pc.yellow("\n❌ Initialization cancelled."));
    process.exit(0);
  }

  const componentsPath = path.resolve(cwd, config.componentsDir);
  const utilsPath = path.resolve(cwd, config.utilsDir);

  await fs.ensureDir(componentsPath);
  await fs.ensureDir(utilsPath);

  // 1. Install required packages
  const userPkgPath = path.join(cwd, "package.json");
  const requiredDeps = ["clsx", "tailwind-merge", "class-variance-authority"];

  if (await fs.pathExists(userPkgPath)) {
    try {
      const userPkg = await fs.readJson(userPkgPath);
      const installed = { ...userPkg.dependencies, ...userPkg.devDependencies };
      if (!installed["tailwindcss"]) requiredDeps.push("tailwindcss");
      if (!installed["@tailwindcss/vite"]) requiredDeps.push("@tailwindcss/vite");
    } catch {
      requiredDeps.push("tailwindcss", "@tailwindcss/vite");
    }
  } else {
    requiredDeps.push("tailwindcss", "@tailwindcss/vite");
  }

  console.log(pc.yellow("\n📦 Installing required runtime & Tailwind CSS dependencies..."));
  await installDependencies(requiredDeps, cwd);

  // 2. Configure path aliases
  await configureAliases(cwd);

  // 3. Generate cn.ts helper
  const cnFilePath = path.join(utilsPath, "cn.ts");
  await fs.writeFile(cnFilePath, cnTemplate, "utf-8");
  console.log(pc.green(`✓ Created ${config.utilsDir}/cn.ts`));

  // 4. Setup CSS theme and entry imports
  const cssPathRelative = await setupCssTheme(cwd, config.baseColor, config.primaryColor);

  // 5. Generate nikala.config.json
  await writeConfig(cwd, {
    $schema: "https://nikala.dev/schema.json",
    style: "default",
    baseColor: config.baseColor || "zinc",
    primaryColor: config.primaryColor || "wine",
    css: cssPathRelative,
    alias: {
      components: config.componentsDir,
      utils: config.utilsDir,
      hooks: "src/hooks",
    },
  });
  console.log(pc.green("✓ Created nikala.config.json"));

  console.log(pc.green("\n✅ Nikala UI initialized successfully with custom theme!"));
}