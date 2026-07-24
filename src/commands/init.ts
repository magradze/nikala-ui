import fs from "fs-extra";
import path from "node:path";
import { execSync } from "node:child_process";
import prompts from "prompts";
import pc from "picocolors";
import { cnTemplate } from "../utils/cn.js";
import { writeConfig, readTsConfig } from "../utils/file.js";

interface InitOptions {
  defaults?: boolean;
}

/**
 * Initializes Nikala UI in the target project workspace.
 * Automatically detects framework type (Vite SPA vs SolidStart) and configures CSS/aliases.
 *
 * @param options - CLI flags (e.g., --defaults)
 */
export async function init(options: InitOptions) {
  const cwd = process.cwd();
  console.log(pc.cyan("🎨 Initializing Nikala UI...\n"));

  // Prompt user for directory preferences or fallback to defaults
  const config = options.defaults
    ? {
        componentsDir: "src/components/ui",
        utilsDir: "src/lib",
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
      ]);

  if (!config.componentsDir || !config.utilsDir) {
    console.log(pc.yellow("\n❌ Initialization cancelled."));
    process.exit(0);
  }

  const componentsPath = path.resolve(cwd, config.componentsDir);
  const utilsPath = path.resolve(cwd, config.utilsDir);

  await fs.ensureDir(componentsPath);
  await fs.ensureDir(utilsPath);

  // 1. Install required runtime dependencies
  console.log(pc.yellow("\n📦 Installing required dependencies..."));
  try {
    execSync("bun add clsx tailwind-merge class-variance-authority", {
      cwd,
      stdio: "inherit",
    });
  } catch {
    console.log(pc.red("❌ Failed to install dependencies automatically. Install manually:"));
    console.log(pc.white("  bun add clsx tailwind-merge class-variance-authority"));
  }

  // 2. Configure Vite / SolidStart alias if vite.config.ts or app.config.ts exists
  const viteConfigPath = path.join(cwd, "vite.config.ts");
  const appConfigPath = path.join(cwd, "app.config.ts");
  const targetConfigPath = (await fs.pathExists(appConfigPath)) ? appConfigPath : viteConfigPath;

  if (await fs.pathExists(targetConfigPath)) {
    let viteContent = await fs.readFile(targetConfigPath, "utf-8");

    if (!viteContent.includes('"@"') && !viteContent.includes("'@'")) {
      if (!viteContent.includes('import path from "node:path"') && !viteContent.includes('import path from "path"')) {
        viteContent = `import path from "node:path";\n${viteContent}`;
      }

      if (viteContent.includes("defineConfig({")) {
        viteContent = viteContent.replace(
          "defineConfig({",
          `defineConfig({\n  resolve: {\n    alias: {\n      "@": path.resolve(__dirname, "./src"),\n    },\n  },`
        );
        await fs.writeFile(targetConfigPath, viteContent, "utf-8");
        console.log(pc.green(`✓ Configured path alias (@) in ${path.basename(targetConfigPath)}`));
      }
    }
  }

  // 3. Configure TypeScript paths in tsconfig.json
  const tsconfigPath = path.join(cwd, "tsconfig.json");
  if (await fs.pathExists(tsconfigPath)) {
    const tsconfig = await readTsConfig(cwd);
    if (tsconfig) {
      tsconfig.compilerOptions = tsconfig.compilerOptions || {};
      tsconfig.compilerOptions.baseUrl = ".";
      tsconfig.compilerOptions.paths = tsconfig.compilerOptions.paths || {};
      tsconfig.compilerOptions.paths["@/*"] = ["src/*"];

      await fs.writeFile(tsconfigPath, JSON.stringify(tsconfig, null, 2), "utf-8");
      console.log(pc.green("✓ Configured path alias (@/*) in tsconfig.json"));
    }
  }

  // 4. Generate cn.ts helper utility
  const cnFilePath = path.join(utilsPath, "cn.ts");
  await fs.writeFile(cnFilePath, cnTemplate, "utf-8");
  console.log(pc.green(`✓ Created ${config.utilsDir}/cn.ts`));

  // 5. Smart CSS file resolution (SolidStart app.css vs Vite index.css)
  let cssPathRelative = "src/index.css";

  if (await fs.pathExists(path.join(cwd, "src", "app.css"))) {
    cssPathRelative = "src/app.css";
  } else if (await fs.pathExists(path.join(cwd, "src", "index.css"))) {
    cssPathRelative = "src/index.css";
  } else {
    // Check if running inside a SolidStart project structure
    const isSolidStart =
      (await fs.pathExists(path.join(cwd, "src", "app.tsx"))) ||
      (await fs.pathExists(path.join(cwd, "app.config.ts")));

    if (isSolidStart) {
      cssPathRelative = "src/app.css";
    }
  }

  const cssPath = path.join(cwd, cssPathRelative);
  const standardTailwindCss = `@import "tailwindcss";\n`;

  await fs.ensureDir(path.dirname(cssPath));

  if (await fs.pathExists(cssPath)) {
    let existingCss = await fs.readFile(cssPath, "utf-8");
    if (!existingCss.includes('@import "tailwindcss"') && !existingCss.includes("@import 'tailwindcss'")) {
      existingCss = `${standardTailwindCss}\n${existingCss}`;
      await fs.writeFile(cssPath, existingCss, "utf-8");
      console.log(pc.green(`✓ Configured Tailwind CSS v4 setup in ${cssPathRelative}`));
    }
  } else {
    await fs.writeFile(cssPath, standardTailwindCss, "utf-8");
    console.log(pc.green(`✓ Created ${cssPathRelative} with standard Tailwind CSS v4 setup`));
  }

  // 6. Generate nikala.config.json manifest with detected CSS file
  await writeConfig(cwd, {
    $schema: "https://nikala.dev/schema.json",
    style: "default",
    css: cssPathRelative,
    alias: {
      components: config.componentsDir,
      utils: config.utilsDir,
    },
  });
  console.log(pc.green("✓ Created nikala.config.json"));

  console.log(pc.green("\n✅ Nikala UI initialized successfully!"));
  console.log(pc.cyan("Next step: Run `nikala add button` to install your first component."));
}