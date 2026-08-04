import { fetchRegistryIndex, fetchRegistryItem } from "../registry/index.js";
import fs from "fs-extra";
import path from "node:path";

export async function handleToolCall(name: string, args: Record<string, unknown> | undefined) {
  const index = await fetchRegistryIndex();

  if (name === "list_components") {
    const components = index.filter((item) => item.type !== "registry:hook");
    return {
      content: [{ type: "text", text: JSON.stringify(components, null, 2) }],
    };
  }

  if (name === "list_hooks") {
    const hooks = index.filter((item) => item.type === "registry:hook");
    return {
      content: [{ type: "text", text: JSON.stringify(hooks, null, 2) }],
    };
  }

  if (name === "get_component_code") {
    const componentName = String(args?.name || "");
    const item = await fetchRegistryItem(componentName);

    if (!item) {
      return {
        isError: true,
        content: [{ type: "text", text: `Component '${componentName}' not found in Nikala UI registry.` }],
      };
    }

    return {
      content: [{ type: "text", text: JSON.stringify(item, null, 2) }],
    };
  }

  if (name === "get_hook_code") {
    const hookName = String(args?.name || "");
    const item = await fetchRegistryItem(hookName);

    if (!item) {
      return {
        isError: true,
        content: [{ type: "text", text: `Hook '${hookName}' not found in Nikala UI registry.` }],
      };
    }

    return {
      content: [{ type: "text", text: JSON.stringify(item, null, 2) }],
    };
  }

  if (name === "install_component") {
    const componentName = String(args?.name || "");
    const targetDir = String(args?.target_dir || "src/components/ui");
    const item = await fetchRegistryItem(componentName);

    if (!item) {
      return {
        isError: true,
        content: [{ type: "text", text: `Component '${componentName}' not found in Nikala UI registry.` }],
      };
    }

    const cwd = process.cwd();
    const createdFiles: string[] = [];

    for (const file of item.files) {
      const relPath = file.path.replace(/^ui\//, "");
      const fullPath = path.resolve(cwd, targetDir, relPath);
      await fs.ensureDir(path.dirname(fullPath));
      await fs.writeFile(fullPath, file.content, "utf-8");
      createdFiles.push(path.relative(cwd, fullPath));
    }

    return {
      content: [
        {
          type: "text",
          text: `Successfully installed component '${componentName}' to project:\n${createdFiles.map((f) => `- ${f}`).join("\n")}`,
        },
      ],
    };
  }

  if (name === "install_hook") {
    const hookName = String(args?.name || "");
    const targetDir = String(args?.target_dir || "src/hooks");
    const item = await fetchRegistryItem(hookName);

    if (!item) {
      return {
        isError: true,
        content: [{ type: "text", text: `Hook '${hookName}' not found in Nikala UI registry.` }],
      };
    }

    const cwd = process.cwd();
    const createdFiles: string[] = [];

    for (const file of item.files) {
      const relPath = file.path.replace(/^hooks\//, "");
      const fullPath = path.resolve(cwd, targetDir, relPath);
      await fs.ensureDir(path.dirname(fullPath));
      await fs.writeFile(fullPath, file.content, "utf-8");
      createdFiles.push(path.relative(cwd, fullPath));
    }

    return {
      content: [
        {
          type: "text",
          text: `Successfully installed hook '${hookName}' to project:\n${createdFiles.map((f) => `- ${f}`).join("\n")}`,
        },
      ],
    };
  }

  if (name === "search_docs") {
    const query = String(args?.query || "").toLowerCase();
    const matches = index.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
    );

    return {
      content: [{ type: "text", text: JSON.stringify(matches, null, 2) }],
    };
  }

  throw new Error(`Unknown tool: ${name}`);
}
