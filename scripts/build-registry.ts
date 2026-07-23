import fs from "fs-extra";
import path from "node:path";
import pc from "picocolors";
import type { RegistryIndex, RegistryItem } from "../src/registry/index.js";

/**
 * Static metadata configuration for registered UI components.
 * Extend this map when creating new components to define titles, descriptions, and dependencies.
 */
const COMPONENT_METADATA: Record<
  string,
  {
    title: string;
    description: string;
    dependencies?: string[];
    registryDependencies?: string[];
  }
> = {
  button: {
    title: "Button",
    description: "An interactive button component with variant and size options.",
    dependencies: ["clsx", "tailwind-merge"],
  },
  input: {
    title: "Input",
    description: "A standard text input field with styling variants.",
    dependencies: ["clsx", "tailwind-merge"],
  },
  card: {
    title: "Card",
    description: "A versatile container component with header, content, and footer sections.",
    dependencies: ["clsx", "tailwind-merge"],
  },
};

/**
 * Main build process to transform TSX component files into JSON registry manifests.
 */
async function buildRegistry() {
  const cwd = process.cwd();
  const sourceDir = path.join(cwd, "src", "registry", "components", "ui");
  const outputDir = path.join(cwd, "registry");

  console.log(pc.cyan("📦 Building Nikala UI Component Registry...\n"));

  // Ensure output registry directory exists
  await fs.ensureDir(outputDir);

  // Read all TSX component files from source directory
  if (!(await fs.pathExists(sourceDir))) {
    console.log(pc.yellow(`⚠️  Source directory not found: ${sourceDir}`));
    return;
  }

  const files = await fs.readdir(sourceDir);
  const indexList: RegistryIndex = [];

  for (const filename of files) {
    if (!filename.endsWith(".tsx")) continue;

    const componentName = path.basename(filename, ".tsx");
    const filePath = path.join(sourceDir, filename);
    const content = await fs.readFile(filePath, "utf-8");

    const meta = COMPONENT_METADATA[componentName] || {
      title: componentName.charAt(0).toUpperCase() + componentName.slice(1),
      description: `${componentName} component.`,
      dependencies: ["clsx", "tailwind-merge"],
    };

    // Construct individual component registry item
    const registryItem: RegistryItem = {
      name: componentName,
      title: meta.title,
      description: meta.description,
      type: "registry:ui",
      dependencies: meta.dependencies,
      registryDependencies: meta.registryDependencies,
      files: [
        {
          path: `ui/${filename}`,
          content,
          type: "registry:ui",
        },
      ],
    };

    // Write component JSON manifest
    const outputPath = path.join(outputDir, `${componentName}.json`);
    await fs.writeFile(outputPath, JSON.stringify(registryItem, null, 2));

    // Add metadata entry to the index list
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