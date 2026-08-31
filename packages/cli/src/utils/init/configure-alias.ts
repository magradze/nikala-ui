import fs from "fs-extra";
import path from "node:path";
import pc from "picocolors";
import { readTsConfig } from "../file.js";

/**
 * Configures Vite / SolidStart config aliases (@) and tsconfig.json path mappings (@/*).
 */
export async function configureAliases(cwd: string): Promise<void> {
  const viteConfigPath = path.join(cwd, "vite.config.ts");
  const appConfigPath = path.join(cwd, "app.config.ts");
  const targetConfigPath = (await fs.pathExists(appConfigPath)) ? appConfigPath : viteConfigPath;

  if (await fs.pathExists(targetConfigPath)) {
    let configContent = await fs.readFile(targetConfigPath, "utf-8");
    let modified = false;

    // 1. Inject Tailwind CSS v4 Vite plugin if missing
    if (!configContent.includes("@tailwindcss/vite")) {
      configContent = `import tailwindcss from "@tailwindcss/vite";\n${configContent}`;

      if (configContent.includes("plugins: [")) {
        configContent = configContent.replace("plugins: [", "plugins: [\n    tailwindcss(), ");
        modified = true;
      } else {
        const defineConfigRegex = /(defineConfig\s*\(\s*(?:async\s*)?(?:\([^)]*\)\s*=>\s*)?\{)/;
        if (defineConfigRegex.test(configContent)) {
          configContent = configContent.replace(
            defineConfigRegex,
            "$1\n  plugins: [tailwindcss()],"
          );
          modified = true;
        }
      }
    }

    // 2. Inject path alias (@ -> ./src)
    if (!configContent.includes('"@"') && !configContent.includes("'@'")) {
      if (!configContent.includes('import path from "node:path"') && !configContent.includes('import path from "path"')) {
        configContent = `import path from "node:path";\n${configContent}`;
      }

      const defineConfigRegex = /(defineConfig\s*\(\s*(?:async\s*)?(?:\([^)]*\)\s*=>\s*)?\{)/;
      if (defineConfigRegex.test(configContent)) {
        configContent = configContent.replace(
          defineConfigRegex,
          `$1\n  resolve: {\n    alias: {\n      "@": path.resolve(process.cwd(), "./src"),\n    },\n  },`
        );
        modified = true;
      }
    }

    if (modified) {
      await fs.writeFile(targetConfigPath, configContent, "utf-8");
      console.log(pc.green(`✓ Configured Tailwind CSS v4 plugin and path alias in ${path.basename(targetConfigPath)}`));
    }
  }

  // 3. Configure tsconfig.json path mappings (@/* -> ./src/*)
  const tsconfigPath = path.join(cwd, "tsconfig.json");
  if (await fs.pathExists(tsconfigPath)) {
    const tsconfig = await readTsConfig(cwd);
    if (tsconfig) {
      tsconfig.compilerOptions = tsconfig.compilerOptions || {};
      tsconfig.compilerOptions.paths = tsconfig.compilerOptions.paths || {};

      // Correct path mapping with leading relative dot ./src/*
      tsconfig.compilerOptions.paths["@/*"] = ["./src/*"];

      await fs.writeFile(tsconfigPath, JSON.stringify(tsconfig, null, 2), "utf-8");
      console.log(pc.green("✓ Configured path alias (@/*) in tsconfig.json"));
    }
  }
}