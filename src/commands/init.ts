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
 * Initializes Nikala UI in the target project workspace using standard Tailwind CSS v4 setup.
 * Sets up configurations, installs dependencies, and creates helper utilities.
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

  // 2. Configure Vite alias if vite.config.ts exists
  const viteConfigPath = path.join(cwd, "vite.config.ts");
  if (await fs.pathExists(viteConfigPath)) {
    let viteContent = await fs.readFile(viteConfigPath, "utf-8");

    if (!viteContent.includes('"@"') && !viteContent.includes("'@'")) {
      if (!viteContent.includes('import path from "node:path"') && !viteContent.includes('import path from "path"')) {
        viteContent = `import path from "node:path";\n${viteContent}`;
      }

      if (viteContent.includes("defineConfig({")) {
        viteContent = viteContent.replace(
          "defineConfig({",
          `defineConfig({\n  resolve: {\n    alias: {\n      "@": path.resolve(__dirname, "./src"),\n    },\n  },`
        );
        await fs.writeFile(viteConfigPath, viteContent);
        console.log(pc.green("✓ Configured path alias (@) in vite.config.ts"));
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

      await fs.writeFile(tsconfigPath, JSON.stringify(tsconfig, null, 2));
      console.log(pc.green("✓ Configured path alias (@/*) in tsconfig.json"));
    }
  }

  // 4. Generate cn.ts helper utility
  const cnFilePath = path.join(utilsPath, "cn.ts");
  await fs.writeFile(cnFilePath, cnTemplate);
  console.log(pc.green(`✓ Created ${config.utilsDir}/cn.ts`));

  // 5. Generate nikala.config.json manifest
  await writeConfig(cwd, {
    $schema: "https://nikala.dev/schema.json",
    style: "default",
    css: "src/index.css",
    alias: {
      components: config.componentsDir,
      utils: config.utilsDir,
    },
  });
  console.log(pc.green("✓ Created nikala.config.json"));

  // 6. Generate standard Tailwind CSS v4 index.css file
  const cssPath = path.join(cwd, "src", "index.css");
  const standardTailwindCss = `@import "tailwindcss";\n`;

  await fs.ensureDir(path.dirname(cssPath));
  await fs.writeFile(cssPath, standardTailwindCss);
  console.log(pc.green("✓ Created src/index.css with standard Tailwind CSS v4 setup"));

  console.log(pc.green("\n✅ Nikala UI initialized successfully!"));
  console.log(pc.cyan("Next step: Run `nikala add button` to install your first component."));
}