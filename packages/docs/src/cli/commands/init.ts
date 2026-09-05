import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "fs-extra";
import pc from "picocolors";

interface RegistryFile { path: string; content: string; }
interface RegistryItem { type?: string; files?: RegistryFile[]; dependencies?: string[]; }

async function listSourceFiles(dir: string): Promise<string[]> {
  const result: string[] = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) result.push(...await listSourceFiles(fullPath));
    else if (entry.isFile()) result.push(fullPath);
  }
  return result;
}

async function resolveCorePackageRoot(): Promise<string> {
  const entry = fileURLToPath(import.meta.resolve("@nikala-ui/core"));
  return path.resolve(path.dirname(entry), "..");
}

async function copyRegistrySource(root: string): Promise<{ componentFiles: string[]; hookFiles: string[]; dependencies: string[] }> {
  const packageRoot = await resolveCorePackageRoot();
  const registryDir = path.join(packageRoot, "registry");
  const componentsDir = path.join(root, "src/components/ui");
  const hooksDir = path.join(root, "src/hooks");
  const componentFiles: string[] = [];
  const hookFiles: string[] = [];
  const dependencies = new Set<string>();
  for (const filename of (await fs.readdir(registryDir)).filter((name) => name.endsWith(".json") && name !== "index.json").sort()) {
    const item = await fs.readJson(path.join(registryDir, filename)) as RegistryItem;
    for (const dependency of item.dependencies || []) dependencies.add(dependency);
    const targetDir = item.type === "registry:hook" ? hooksDir : item.type === "registry:ui" ? root : undefined;
    if (!targetDir || !item.files) continue;
    for (const file of item.files) {
      const relative = file.path.replace(/^(ui|hooks|providers)[\\/]/, "");
      const destination = file.path.startsWith("providers/")
        ? path.join(root, "src/providers", relative)
        : file.path.startsWith("ui/")
          ? path.join(componentsDir, relative)
          : path.join(hooksDir, relative);
      await fs.outputFile(destination, file.content, "utf-8");
      if (file.path.startsWith("hooks/")) hookFiles.push(relative.replace(/\.(tsx?|jsx?)$/, ""));
      else if (file.path.startsWith("ui/")) componentFiles.push(relative.replace(/\.(tsx?|jsx?)$/, ""));
    }
  }
  const sourceRoot = path.join(packageRoot, "src");
  if (await fs.pathExists(path.join(sourceRoot, "lib/cn.ts"))) await fs.outputFile(path.join(root, "src/lib/cn.ts"), await fs.readFile(path.join(sourceRoot, "lib/cn.ts"), "utf-8"), "utf-8");
  return { componentFiles, hookFiles, dependencies: [...dependencies].sort() };
}

async function writeBarrels(root: string, componentFiles: string[], hookFiles: string[]): Promise<void> {
  const componentExports = componentFiles.sort().map((file) => `export * from "./${file}.js";`).join("\n");
  await fs.outputFile(path.join(root, "src/components/ui/index.ts"), `${componentExports}
export { cn } from "../../lib/cn.js";
export * from "../../providers/theme-provider.jsx";
export * from "../../providers/theme-transitions.js";
export * from "../../providers/theme-script.jsx";
`, "utf-8");
  await fs.outputFile(path.join(root, "src/hooks/index.ts"), `${hookFiles.sort().map((file) => `export * from "./${file}.js";`).join("\n")}
`, "utf-8");
  await fs.outputFile(path.join(root, "src/lib/utils.ts"), `export { cn } from "./cn.js";
`, "utf-8");
}

async function copyCustomTheme(root: string): Promise<void> {
  const commandDir = path.dirname(fileURLToPath(import.meta.url));
  const sourceCandidates = [path.resolve(commandDir, "../../../src/themes/default"), path.resolve(commandDir, "../../themes/default")];
  const source = sourceCandidates.find((candidate) => fs.existsSync(candidate));
  const target = path.join(root, "src/themes/custom");
  if (!source) {
    await fs.outputFile(path.join(target, "index.ts"), `export { defaultTheme as default } from "@nikala-ui/docs";
`, "utf-8");
    return;
  }
  for (const sourceFile of await listSourceFiles(source)) {
    const basename = path.basename(sourceFile);
    const isSourceFile = /\.(ts|tsx)$/.test(sourceFile);
    const isPublishedThemeFile = /\.jsx$/.test(sourceFile) || basename === "index.js";
    if ((!isSourceFile && !isPublishedThemeFile) || basename !== basename.toLowerCase()) continue;
    const relative = path.relative(source, sourceFile).replace(/\.jsx$/, ".tsx").replace(/index\.js$/, "index.ts");
    const destination = path.join(target, relative);
    let content = await fs.readFile(sourceFile, "utf-8");
    content = content
      .replace(/from "@nikala-ui\/core\/ui\//g, 'from "@/components/ui/')
      .replace(/from "@nikala-ui\/core"/g, 'from "@/components/ui"')
      .replace(/from "@nikala-ui\/hooks"/g, 'from "@/hooks"')
      .replace(/from "\.\.\/\.\.\/\.\.\/navigation\/sidebar-state\.js"/g, 'from "./sidebar-state.js"')
      .replace(/from "\.\.?\/\.\.?\/types\.js"/g, 'from "@nikala-ui/docs"')
      .replace(/from "\.\.\/types\.js"/g, 'from "@nikala-ui/docs"')
      .replace(/\.jsx"/g, '.tsx"');
    await fs.outputFile(destination, content, "utf-8");
  }

  const navigationCandidates = [
    path.resolve(commandDir, "../../../src/navigation/sidebar-state.ts"),
    path.resolve(commandDir, "../../navigation/sidebar-state.js"),
  ];
  const navigationSource = navigationCandidates.find((candidate) => fs.existsSync(candidate));
  if (navigationSource) {
    const navigationContent = (await fs.readFile(navigationSource, "utf-8"))
      .replace(/from "\.\.\/types\.js"/g, 'from "@nikala-ui/docs"');
    await fs.outputFile(path.join(target, "navigation/sidebar-state.ts"), navigationContent, "utf-8");
  }
}

async function writeProjectFiles(root: string, registryDependencies: string[]): Promise<void> {
  const configPath = path.join(root, "nikala.config.ts");
  if (!(await fs.pathExists(configPath))) await fs.outputFile(configPath, `export default {
  title: "My Project Docs",
  description: "Documentation built with Nikala Docs and SolidJS",
  contentDir: "src/content",
  theme: { path: "./src/themes/custom" },
  navigation: { layout: "sidebar", sidebar: { header: true, footer: true, headerSubtitle: "Documentation", footerText: "Documentation" } },
  search: { enabled: true },
};
`, "utf-8");
  const packagePath = path.join(root, "package.json");
  const runningFromWorkspace = !fileURLToPath(import.meta.url).includes(`${path.sep}node_modules${path.sep}`);
  const packageJson = await fs.pathExists(packagePath) ? await fs.readJson(packagePath) : {
    private: true,
    type: "module",
    scripts: { dev: "bunx @nikala-ui/docs dev", build: "bunx @nikala-ui/docs build", preview: "bunx @nikala-ui/docs preview" },
    dependencies: {},
  };
  const localDocsLink = path.join(root, "node_modules/@nikala-ui/docs");
  const hasLocalDocsLink = await fs.pathExists(localDocsLink) && (await fs.lstat(localDocsLink)).isSymbolicLink();
  if (runningFromWorkspace && packageJson.dependencies?.["@nikala-ui/docs"] === "latest") {
    delete packageJson.dependencies["@nikala-ui/docs"];
  }
  packageJson.dependencies = {
    ...packageJson.dependencies,
    ...(hasLocalDocsLink ? { "@nikala-ui/docs": "link:@nikala-ui/docs" } : runningFromWorkspace ? {} : packageJson.dependencies?.["@nikala-ui/docs"] ? {} : { "@nikala-ui/docs": "latest" }),
    ...(packageJson.dependencies?.["solid-js"] ? {} : { "solid-js": "latest" }),
    ...(packageJson.dependencies?.tailwindcss ? {} : { tailwindcss: "latest" }),
    ...Object.fromEntries(registryDependencies
      .filter((dependency) => !packageJson.dependencies?.[dependency])
      .map((dependency) => [dependency, "latest"])),
  };
  await fs.writeJson(packagePath, packageJson, { spaces: 2 });
  await fs.outputFile(path.join(root, "tsconfig.json"), JSON.stringify({
    compilerOptions: { target: "ES2022", module: "ESNext", moduleResolution: "Bundler", jsx: "preserve", jsxImportSource: "solid-js", strict: true, paths: { "@/*": ["./src/*"], "@/components/ui/*": ["./src/components/ui/*"], "@/hooks/*": ["./src/hooks/*"] } },
    include: ["src/**/*", "nikala.config.ts"],
  }, null, 2) + "\n", "utf-8");
  const styleSource = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../client/style.css");
  if (await fs.pathExists(styleSource)) await fs.copyFile(styleSource, path.join(root, "src/app.css"));
}

export async function runInitCommand(targetDir = "."): Promise<void> {
  const root = path.resolve(process.cwd(), targetDir);
  console.log();
  console.log(pc.bold(pc.cyan("  Nikala Docs Engine ")) + pc.dim("v0.11.0"));
  console.log(pc.dim(`  Initializing copy-paste documentation project in ${pc.bold(root)}...`));
  console.log();
  await fs.ensureDir(root);
  const copied = await copyRegistrySource(root);
  await writeBarrels(root, copied.componentFiles, copied.hookFiles);
  await copyCustomTheme(root);
  await writeProjectFiles(root, copied.dependencies);
  const indexPath = path.join(root, "src/content/index.mdx");
  if (!(await fs.pathExists(indexPath))) await fs.outputFile(indexPath, `---
title: Introduction
description: Welcome to your copy-paste documentation site.
order: 1
---

# Introduction

Your Nikala UI components and reactive hooks are owned locally in **src/components/ui** and **src/hooks**.

<Callout type="tip">
  Add documentation pages under **src/content**. Folders become collapsible sidebar categories automatically.
</Callout>
`, "utf-8");
  console.log(`  ${pc.green("✓")} Copied ${copied.componentFiles.length} UI sources and ${copied.hookFiles.length} hook sources`);
  console.log(`  ${pc.green("✓")} Registered ${copied.dependencies.length} component dependencies`);
  console.log(`  ${pc.green("✓")} Created ${pc.cyan("src/content")}, ${pc.cyan("src/themes/custom")}, and local Tailwind tokens`);
  console.log();
  console.log(`  ${pc.bold(pc.green("Success!"))} Run ${pc.cyan("bunx @nikala-ui/docs dev")} to start your docs.`);
  console.log();
}
