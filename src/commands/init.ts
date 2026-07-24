import fs from "fs-extra";
import path from "node:path";
import prompts from "prompts";
import pc from "picocolors";
import { cnTemplate } from "../utils/cn.js";
import { writeConfig, readTsConfig } from "../utils/file.js";
import { installDependencies } from "../utils/pkg.js";

interface InitOptions {
  defaults?: boolean;
}

/**
 * Generates robust Tailwind CSS v4 theme setup with semantic color tokens, base layer defaults, and color schemes.
 */
function generateThemeCss(baseColor: string = "zinc", primaryColor: string = "wine"): string {
  const basePalettes: Record<
    string,
    {
      lightBg: string;
      lightFg: string;
      darkBg: string;
      darkFg: string;
      lightMuted: string;
      lightMutedFg: string;
      darkMuted: string;
      darkMutedFg: string;
      lightBorder: string;
      darkBorder: string;
      lightRing: string;
      darkRing: string;
    }
  > = {
    zinc: {
      lightBg: "#ffffff",
      lightFg: "#09090b",
      darkBg: "#09090b",
      darkFg: "#fafafa",
      lightMuted: "#f4f4f5",
      lightMutedFg: "#71717a",
      darkMuted: "#27272a",
      darkMutedFg: "#a1a1aa",
      lightBorder: "#e4e4e7",
      darkBorder: "#27272a",
      lightRing: "#18181b",
      darkRing: "#d4d4d8",
    },
    slate: {
      lightBg: "#ffffff",
      lightFg: "#020617",
      darkBg: "#020617",
      darkFg: "#f8fafc",
      lightMuted: "#f1f5f9",
      lightMutedFg: "#64748b",
      darkMuted: "#1e293b",
      darkMutedFg: "#94a3b8",
      lightBorder: "#e2e8f0",
      darkBorder: "#1e293b",
      lightRing: "#0f172a",
      darkRing: "#cbd5e1",
    },
    gray: {
      lightBg: "#ffffff",
      lightFg: "#030712",
      darkBg: "#030712",
      darkFg: "#f9fafb",
      lightMuted: "#f3f4f6",
      lightMutedFg: "#6b7280",
      darkMuted: "#1f2937",
      darkMutedFg: "#9ca3af",
      lightBorder: "#e5e7eb",
      darkBorder: "#1f2937",
      lightRing: "#111827",
      darkRing: "#d1d5db",
    },
    neutral: {
      lightBg: "#ffffff",
      lightFg: "#0a0a0a",
      darkBg: "#0a0a0a",
      darkFg: "#fafafa",
      lightMuted: "#f5f5f5",
      lightMutedFg: "#737373",
      darkMuted: "#262626",
      darkMutedFg: "#a3a3a3",
      lightBorder: "#e5e5e5",
      darkBorder: "#262626",
      lightRing: "#171717",
      darkRing: "#d4d4d4",
    },
    stone: {
      lightBg: "#ffffff",
      lightFg: "#0c0a09",
      darkBg: "#0c0a09",
      darkFg: "#fafaf9",
      lightMuted: "#f5f5f4",
      lightMutedFg: "#78716c",
      darkMuted: "#292524",
      darkMutedFg: "#a8a29e",
      lightBorder: "#e7e5e4",
      darkBorder: "#292524",
      lightRing: "#1c1917",
      darkRing: "#d6d3d1",
    },
  };

  const primaryMap: Record<string, { light: string; dark: string; lightFg: string; darkFg: string }> = {
    wine: { light: "#722f37", dark: "#9e3b47", lightFg: "#ffffff", darkFg: "#ffffff" },
    violet: { light: "#7c3aed", dark: "#8b5cf6", lightFg: "#ffffff", darkFg: "#ffffff" },
    sky: { light: "#0284c7", dark: "#38bdf8", lightFg: "#ffffff", darkFg: "#0f172a" },
    emerald: { light: "#059669", dark: "#34d399", lightFg: "#ffffff", darkFg: "#052e16" },
    rose: { light: "#e11d48", dark: "#fb7185", lightFg: "#ffffff", darkFg: "#ffffff" },
    amber: { light: "#d97706", dark: "#fbbf24", lightFg: "#ffffff", darkFg: "#111827" },
    zinc: { light: "#18181b", dark: "#fafafa", lightFg: "#fafafa", darkFg: "#18181b" },
  };

  const base = basePalettes[baseColor] || basePalettes.zinc;
  const primary = primaryMap[primaryColor] || primaryMap.wine;

  return `@import "tailwindcss";

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --radius-lg: var(--radius);
  --radius-md: calc(var(--radius) - 2px);
  --radius-sm: calc(var(--radius) - 4px);
}

:root {
  color-scheme: light;
  --background: ${base.lightBg};
  --foreground: ${base.lightFg};
  --card: ${base.lightBg};
  --card-foreground: ${base.lightFg};
  --popover: ${base.lightBg};
  --popover-foreground: ${base.lightFg};
  --primary: ${primary.light};
  --primary-foreground: ${primary.lightFg};
  --secondary: ${base.lightMuted};
  --secondary-foreground: ${base.lightFg};
  --muted: ${base.lightMuted};
  --muted-foreground: ${base.lightMutedFg};
  --accent: ${base.lightMuted};
  --accent-foreground: ${base.lightFg};
  --destructive: #ef4444;
  --destructive-foreground: #ffffff;
  --border: ${base.lightBorder};
  --input: ${base.lightBorder};
  --ring: ${base.lightRing};
  --radius: 0.5rem;
}

.dark {
  color-scheme: dark;
  --background: ${base.darkBg};
  --foreground: ${base.darkFg};
  --card: ${base.darkBg};
  --card-foreground: ${base.darkFg};
  --popover: ${base.darkBg};
  --popover-foreground: ${base.darkFg};
  --primary: ${primary.dark};
  --primary-foreground: ${primary.darkFg};
  --secondary: ${base.darkMuted};
  --secondary-foreground: ${base.darkFg};
  --muted: ${base.darkMuted};
  --muted-foreground: ${base.darkMutedFg};
  --accent: ${base.darkMuted};
  --accent-foreground: ${base.darkFg};
  --destructive: #7f1d1d;
  --destructive-foreground: #ffffff;
  --border: ${base.darkBorder};
  --input: ${base.darkBorder};
  --ring: ${base.darkRing};
  --radius: 0.5rem;
}

@layer base {
  * {
    border-color: var(--border);
  }
  body {
    background-color: var(--background);
    color: var(--foreground);
  }
}
`;
}

/**
 * Initializes Nikala UI in the target project workspace.
 * Sets up theme selection, Tailwind v4 variables, path aliases, and utilities.
 *
 * @param options - CLI flags (e.g., --defaults)
 */
export async function init(options: InitOptions) {
  const cwd = process.cwd();
  console.log(pc.cyan("🎨 Initializing Nikala UI...\n"));

  // Prompt user for directory preferences and color themes
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

  // 1. Detect missing runtime & Tailwind v4 dependencies
  const userPkgPath = path.join(cwd, "package.json");
  const requiredDeps = ["clsx", "tailwind-merge", "class-variance-authority"];

  if (await fs.pathExists(userPkgPath)) {
    try {
      const userPkg = await fs.readJson(userPkgPath);
      const installed = { ...userPkg.dependencies, ...userPkg.devDependencies };

      if (!installed["tailwindcss"]) {
        requiredDeps.push("tailwindcss");
      }
      if (!installed["@tailwindcss/vite"]) {
        requiredDeps.push("@tailwindcss/vite");
      }
    } catch {
      requiredDeps.push("tailwindcss", "@tailwindcss/vite");
    }
  } else {
    requiredDeps.push("tailwindcss", "@tailwindcss/vite");
  }

  console.log(pc.yellow("\n📦 Installing required runtime & Tailwind CSS dependencies..."));
  await installDependencies(requiredDeps, cwd);

  // 2. Configure Vite / SolidStart config with @tailwindcss/vite plugin and @ alias
  const viteConfigPath = path.join(cwd, "vite.config.ts");
  const appConfigPath = path.join(cwd, "app.config.ts");
  const targetConfigPath = (await fs.pathExists(appConfigPath)) ? appConfigPath : viteConfigPath;

  if (await fs.pathExists(targetConfigPath)) {
    let configContent = await fs.readFile(targetConfigPath, "utf-8");
    let modified = false;

    if (!configContent.includes("@tailwindcss/vite")) {
      configContent = `import tailwindcss from "@tailwindcss/vite";\n${configContent}`;

      if (configContent.includes("plugins: [")) {
        configContent = configContent.replace("plugins: [", "plugins: [\n    tailwindcss(), ");
      } else if (configContent.includes("defineConfig({")) {
        configContent = configContent.replace(
          "defineConfig({",
          "defineConfig({\n  plugins: [tailwindcss()],"
        );
      }
      modified = true;
    }

    if (!configContent.includes('"@"') && !configContent.includes("'@'")) {
      if (!configContent.includes('import path from "node:path"') && !configContent.includes('import path from "path"')) {
        configContent = `import path from "node:path";\n${configContent}`;
      }

      if (configContent.includes("defineConfig({")) {
        configContent = configContent.replace(
          "defineConfig({",
          `defineConfig({\n  resolve: {\n    alias: {\n      "@": path.resolve(__dirname, "./src"),\n    },\n  },`
        );
      }
      modified = true;
    }

    if (modified) {
      await fs.writeFile(targetConfigPath, configContent, "utf-8");
      console.log(pc.green(`✓ Configured Tailwind CSS v4 plugin and path alias in ${path.basename(targetConfigPath)}`));
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

  // 5. Smart CSS file resolution and dynamic theme generation
  let cssPathRelative = "src/index.css";

  if (await fs.pathExists(path.join(cwd, "src", "app.css"))) {
    cssPathRelative = "src/app.css";
  } else if (await fs.pathExists(path.join(cwd, "src", "index.css"))) {
    cssPathRelative = "src/index.css";
  } else {
    const isSolidStart =
      (await fs.pathExists(path.join(cwd, "src", "app.tsx"))) ||
      (await fs.pathExists(path.join(cwd, "app.config.ts")));

    if (isSolidStart) {
      cssPathRelative = "src/app.css";
    }
  }

  const cssPath = path.join(cwd, cssPathRelative);
  const generatedCss = generateThemeCss(config.baseColor, config.primaryColor);

  await fs.ensureDir(path.dirname(cssPath));
  await fs.writeFile(cssPath, generatedCss, "utf-8");
  console.log(pc.green(`✓ Generated Tailwind CSS v4 theme setup in ${cssPathRelative}`));

  // 6. Inject CSS import statement into project's main entry point
  const entryCandidates = [
    path.join(cwd, "src", "app.tsx"),
    path.join(cwd, "src", "app.jsx"),
    path.join(cwd, "src", "entry-client.tsx"),
    path.join(cwd, "src", "index.tsx"),
    path.join(cwd, "src", "index.jsx"),
    path.join(cwd, "src", "index.ts"),
    path.join(cwd, "src", "main.tsx"),
    path.join(cwd, "src", "main.ts"),
  ];

  let targetEntryPath: string | null = null;
  for (const candidate of entryCandidates) {
    if (await fs.pathExists(candidate)) {
      targetEntryPath = candidate;
      break;
    }
  }

  if (targetEntryPath) {
    let entryContent = await fs.readFile(targetEntryPath, "utf-8");
    const cssFileName = path.basename(cssPathRelative);
    const cssImportStatement = `import "./${cssFileName}";`;

    if (!entryContent.includes(cssFileName)) {
      entryContent = `${cssImportStatement}\n${entryContent}`;
      await fs.writeFile(targetEntryPath, entryContent, "utf-8");
      console.log(
        pc.green(`✓ Injected ${cssImportStatement} into ${path.relative(cwd, targetEntryPath)}`)
      );
    }
  }

  // 7. Generate nikala.config.json manifest with theme choices
  await writeConfig(cwd, {
    $schema: "https://nikala.dev/schema.json",
    style: "default",
    baseColor: config.baseColor || "zinc",
    primaryColor: config.primaryColor || "wine",
    css: cssPathRelative,
    alias: {
      components: config.componentsDir,
      utils: config.utilsDir,
    },
  });
  console.log(pc.green("✓ Created nikala.config.json"));

  console.log(pc.green("\n✅ Nikala UI initialized successfully with custom theme!"));
  console.log(pc.cyan("Next step: Run `nikala add button` to install your first component."));
}