import { fetchRegistryIndex, fetchRegistryItem } from "../registry/index.js";
import fs from "fs-extra";
import path from "node:path";

/**
 * Resolves the target workspace root directory intelligently.
 * Priority:
 * 1. Explicit `workspace_dir` passed by AI/IDE in args
 * 2. IDE/Environment variables (`CURSOR_WORKSPACE_DIR`, `WORKSPACE_DIR`, `INIT_CWD`, `PWD`)
 * 3. Parent directory search starting from `process.cwd()` up to root (`/`) looking for `nikala.config.json` or `package.json`
 */
async function resolveWorkspaceRoot(customWorkspaceDir?: string): Promise<string> {
  if (customWorkspaceDir) {
    const resolved = path.isAbsolute(customWorkspaceDir)
      ? customWorkspaceDir
      : path.resolve(process.cwd(), customWorkspaceDir);
    if (await fs.pathExists(resolved)) {
      return resolved;
    }
  }

  // 1. Check common IDE environment variables
  const envCandidates = [
    process.env.CURSOR_WORKSPACE_DIR,
    process.env.WORKSPACE_DIR,
    process.env.INIT_CWD,
    process.env.PWD,
  ];

  for (const candidate of envCandidates) {
    if (candidate && (await fs.pathExists(candidate))) {
      const hasConfig = await fs.pathExists(path.join(candidate, "nikala.config.json"));
      const hasPkg = await fs.pathExists(path.join(candidate, "package.json"));
      if (hasConfig || hasPkg) {
        return candidate;
      }
    }
  }

  // 2. Traversal up parent directories starting from current working directory
  let currentDir = process.cwd();
  while (currentDir && currentDir !== path.parse(currentDir).root) {
    const hasConfig = await fs.pathExists(path.join(currentDir, "nikala.config.json"));
    const hasPkg = await fs.pathExists(path.join(currentDir, "package.json"));
    
    // Ignore home root itself (/home/username) if it has a dummy package.json
    if ((hasConfig || hasPkg) && currentDir !== "/home/magradze" && currentDir !== "/home/runner") {
      return currentDir;
    }
    
    currentDir = path.dirname(currentDir);
  }

  return process.cwd();
}

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
    const workspaceRoot = await resolveWorkspaceRoot(args?.workspace_dir as string | undefined);
    const item = await fetchRegistryItem(componentName);

    if (!item) {
      return {
        isError: true,
        content: [{ type: "text", text: `Component '${componentName}' not found in Nikala UI registry.` }],
      };
    }

    const createdFiles: string[] = [];

    for (const file of item.files) {
      const relPath = file.path.replace(/^ui\//, "");
      const fullPath = path.resolve(workspaceRoot, targetDir, relPath);
      await fs.ensureDir(path.dirname(fullPath));
      await fs.writeFile(fullPath, file.content, "utf-8");
      createdFiles.push(path.relative(workspaceRoot, fullPath));
    }

    return {
      content: [
        {
          type: "text",
          text: `Successfully installed component '${componentName}' to workspace (${workspaceRoot}):\n${createdFiles.map((f) => `- ${f}`).join("\n")}`,
        },
      ],
    };
  }

  if (name === "install_hook") {
    const hookName = String(args?.name || "");
    const targetDir = String(args?.target_dir || "src/hooks");
    const workspaceRoot = await resolveWorkspaceRoot(args?.workspace_dir as string | undefined);
    const item = await fetchRegistryItem(hookName);

    if (!item) {
      return {
        isError: true,
        content: [{ type: "text", text: `Hook '${hookName}' not found in Nikala UI registry.` }],
      };
    }

    const createdFiles: string[] = [];

    for (const file of item.files) {
      const relPath = file.path.replace(/^hooks\//, "");
      const fullPath = path.resolve(workspaceRoot, targetDir, relPath);
      await fs.ensureDir(path.dirname(fullPath));
      await fs.writeFile(fullPath, file.content, "utf-8");
      createdFiles.push(path.relative(workspaceRoot, fullPath));
    }

    return {
      content: [
        {
          type: "text",
          text: `Successfully installed hook '${hookName}' to workspace (${workspaceRoot}):\n${createdFiles.map((f) => `- ${f}`).join("\n")}`,
        },
      ],
    };
  }

  if (name === "search_docs") {
    const rawQuery = String(args?.query || "").trim().toLowerCase();
    const keywords = rawQuery.split(/\s+/).filter(Boolean);

    if (keywords.length === 0) {
      return {
        content: [{ type: "text", text: JSON.stringify([], null, 2) }],
      };
    }

    const matches = index.filter((item) => {
      const nameStr = item.name.toLowerCase();
      const titleStr = item.title.toLowerCase();
      const descStr = item.description.toLowerCase();

      // Match if ANY of the keywords matches (or if ALL match)
      return keywords.some(
        (kw) => nameStr.includes(kw) || titleStr.includes(kw) || descStr.includes(kw)
      );
    });

    return {
      content: [{ type: "text", text: JSON.stringify(matches, null, 2) }],
    };
  }

  if (name === "validate_project") {
    const workspaceRoot = await resolveWorkspaceRoot(args?.workspace_dir as string | undefined);

    const checks = {
      workspaceRoot,
      configExists: await fs.pathExists(path.join(workspaceRoot, "nikala.config.json")),
      cnHelperExists:
        (await fs.pathExists(path.join(workspaceRoot, "src/lib/cn.ts"))) ||
        (await fs.pathExists(path.join(workspaceRoot, "src/lib/cn.js"))),
      componentsDirExists: await fs.pathExists(path.join(workspaceRoot, "src/components/ui")),
      hooksDirExists: await fs.pathExists(path.join(workspaceRoot, "src/hooks")),
      packageJsonExists: await fs.pathExists(path.join(workspaceRoot, "package.json")),
    };

    const issues: string[] = [];
    if (!checks.configExists) issues.push("Missing 'nikala.config.json' (run 'nikala init')");
    if (!checks.cnHelperExists) issues.push("Missing utility helper 'src/lib/cn.ts'");
    if (!checks.componentsDirExists) issues.push("Missing components directory 'src/components/ui'");

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              status: issues.length === 0 ? "healthy" : "needs_attention",
              checks,
              issues,
            },
            null,
            2
          ),
        },
      ],
    };
  }

  if (name === "inspect_workspace") {
    const workspaceRoot = await resolveWorkspaceRoot(args?.workspace_dir as string | undefined);
    const componentsDir = path.join(workspaceRoot, "src/components/ui");
    const hooksDir = path.join(workspaceRoot, "src/hooks");

    const installedComponents: string[] = [];
    const installedHooks: string[] = [];

    if (await fs.pathExists(componentsDir)) {
      const files = await fs.readdir(componentsDir);
      for (const file of files) {
        if (file.endsWith(".tsx") || file.endsWith(".ts")) {
          installedComponents.push(file.replace(/\.(tsx|ts)$/, ""));
        }
      }
    }

    if (await fs.pathExists(hooksDir)) {
      const files = await fs.readdir(hooksDir);
      for (const file of files) {
        if (file.endsWith(".ts")) {
          installedHooks.push(file.replace(/\.ts$/, ""));
        }
      }
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              workspaceRoot,
              installedComponents,
              installedHooks,
              totalInstalledComponents: installedComponents.length,
              totalInstalledHooks: installedHooks.length,
            },
            null,
            2
          ),
        },
      ],
    };
  }

  throw new Error(`Unknown tool: ${name}`);
}
