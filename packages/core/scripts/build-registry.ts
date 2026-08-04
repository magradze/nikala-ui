import fs from "fs-extra";
import path from "node:path";
import pc from "picocolors";
import type { RegistryIndex, RegistryItem } from "../src/registry/index.js";
import { COMPONENT_METADATA } from "../src/registry/metadata.js";

/**
 * Main build process to transform TSX component files into JSON registry manifests.
 */
async function buildRegistry() {
  const cwd = process.cwd();
  const sourceDir = path.join(cwd, "src", "registry", "components", "ui");
  const providerDir = path.join(cwd, "src", "registry", "providers");
  const outputDir = path.join(cwd, "registry");

  console.log(pc.cyan("📦 Building Nikala UI Component Registry...\n"));

  await fs.ensureDir(outputDir);

  if (!(await fs.pathExists(sourceDir))) {
    console.log(pc.yellow(`⚠️  Source directory not found: ${sourceDir}`));
    return;
  }

  const files = await fs.readdir(sourceDir);
  const indexList: RegistryIndex = [];

  for (const filename of files) {
    if (!filename.endsWith(".tsx")) continue;

    let componentName = path.basename(filename, ".tsx");
    const filePath = path.join(sourceDir, filename);
    const content = await fs.readFile(filePath, "utf-8");

    if (componentName === "theme-toggle") {
      componentName = "theme-manager";
    }

    const meta = COMPONENT_METADATA[componentName] || {
      title: componentName.charAt(0).toUpperCase() + componentName.slice(1),
      description: `${componentName} component.`,
      dependencies: ["clsx", "tailwind-merge"],
    };

    const registryFiles = [
      {
        path: `ui/${filename}`,
        content,
        type: "registry:ui" as const,
      },
    ];

    // Include theme-provider.tsx, theme-script.tsx, and theme-transitions.ts if building theme-manager
    if (componentName === "theme-manager") {
      const scriptPath = path.join(providerDir, "theme-script.tsx");
      const transitionsPath = path.join(providerDir, "theme-transitions.ts");
      const providerPath = path.join(providerDir, "theme-provider.tsx");

      if (await fs.pathExists(scriptPath)) {
        const scriptContent = await fs.readFile(scriptPath, "utf-8");
        registryFiles.unshift({
          path: "providers/theme-script.tsx",
          content: scriptContent,
          type: "registry:ui" as const,
        });
      }

      if (await fs.pathExists(transitionsPath)) {
        const transitionContent = await fs.readFile(transitionsPath, "utf-8");
        registryFiles.unshift({
          path: "providers/theme-transitions.ts",
          content: transitionContent,
          type: "registry:ui" as const,
        });
      }

      if (await fs.pathExists(providerPath)) {
        const providerContent = await fs.readFile(providerPath, "utf-8");
        registryFiles.unshift({
          path: "providers/theme-provider.tsx",
          content: providerContent,
          type: "registry:ui" as const,
        });
      }
    }

    // Construct individual component registry item
    const registryItem: RegistryItem = {
      name: componentName,
      title: meta.title,
      description: meta.description,
      type: "registry:ui",
      dependencies: meta.dependencies,
      registryDependencies: meta.registryDependencies,
      files: registryFiles,
    };

    // Write component JSON manifest
    const outputPath = path.join(outputDir, `${componentName}.json`);
    await fs.writeFile(outputPath, JSON.stringify(registryItem, null, 2));

    // Add metadata entry to central index list
    indexList.push({
      name: componentName,
      title: meta.title,
      description: meta.description,
      type: "registry:ui",
      dependencies: meta.dependencies,
      registryDependencies: meta.registryDependencies,
    });

    console.log(pc.green(`  ✓ Generated registry/${componentName}.json`));
  }

  // Generate hook registry items
  const { HOOK_METADATA } = await import("../src/registry/metadata.js");
  for (const [hookName, meta] of Object.entries(HOOK_METADATA)) {
    const registryItem: RegistryItem = {
      name: hookName,
      title: meta.title,
      description: meta.description,
      type: "registry:hook",
      dependencies: meta.dependencies,
      files: [],
    };

    const outputPath = path.join(outputDir, `${hookName}.json`);
    await fs.writeFile(outputPath, JSON.stringify(registryItem, null, 2));

    indexList.push({
      name: hookName,
      title: meta.title,
      description: meta.description,
      type: "registry:hook",
      dependencies: meta.dependencies,
    });

    console.log(pc.green(`  ✓ Generated registry/${hookName}.json`));
  }

  // Write central registry/index.json
  const indexPath = path.join(outputDir, "index.json");
  await fs.writeFile(indexPath, JSON.stringify(indexList, null, 2));

  console.log(pc.green("\n  ✓ Generated registry/index.json"));
  console.log(pc.cyan("\n✅ Registry build complete!"));
}

buildRegistry().catch((err) => {
  console.error(pc.red("❌ Error building registry:"), err);
  process.exit(1);
});