import { fetchRegistryIndex, fetchRegistryItem } from "../registry/index.js";
import fs from "fs-extra";
import path from "node:path";
import os from "node:os";

/**
 * Resolves the target workspace root directory intelligently.
 * Priority:
 * 1. Explicit `workspace_dir` passed by AI/IDE in args
 * 2. `process.cwd()` if it contains nikala.config.json or package.json (and is not user home)
 * 3. IDE/Environment variables (`CURSOR_WORKSPACE_DIR`, `WORKSPACE_DIR`, `INIT_CWD`, `PWD`)
 * 4. Parent directory search starting from `process.cwd()` up to system root (`/`)
 */
async function resolveWorkspaceRoot(customWorkspaceDir?: string): Promise<string> {
  const userHome = os.homedir();

  if (customWorkspaceDir) {
    const resolved = path.isAbsolute(customWorkspaceDir)
      ? customWorkspaceDir
      : path.resolve(process.cwd(), customWorkspaceDir);
    if (await fs.pathExists(resolved)) {
      return resolved;
    }
  }

  // 1. Check current working directory directly
  const cwd = process.cwd();
  if (cwd !== userHome) {
    const hasConfig = await fs.pathExists(path.join(cwd, "nikala.config.json"));
    const hasPkg = await fs.pathExists(path.join(cwd, "package.json"));
    if (hasConfig || hasPkg) {
      return cwd;
    }
  }

  // 2. Check common IDE environment variables
  const envCandidates = [
    process.env.CURSOR_WORKSPACE_DIR,
    process.env.WORKSPACE_DIR,
    process.env.INIT_CWD,
    process.env.PWD,
  ];

  for (const candidate of envCandidates) {
    if (candidate && candidate !== userHome && (await fs.pathExists(candidate))) {
      const hasConfig = await fs.pathExists(path.join(candidate, "nikala.config.json"));
      const hasPkg = await fs.pathExists(path.join(candidate, "package.json"));
      if (hasConfig || hasPkg) {
        return candidate;
      }
    }
  }

  // 3. Traversal up parent directories starting from current working directory
  let currentDir = cwd;
  while (currentDir && currentDir !== path.parse(currentDir).root) {
    if (currentDir !== userHome) {
      const hasConfig = await fs.pathExists(path.join(currentDir, "nikala.config.json"));
      const hasPkg = await fs.pathExists(path.join(currentDir, "package.json"));
      if (hasConfig || hasPkg) {
        return currentDir;
      }
    }
    currentDir = path.dirname(currentDir);
  }

  return cwd;
}

const cursorRuleContent = `---
description: Nikala UI & SolidJS Reactivity Development Rules
globs: **/*.{ts,tsx,js,jsx}
alwaysApply: true
---

# Nikala UI & SolidJS Engineering Guidelines

> Nikala UI is a copy-paste component system and reactive primitives suite for SolidJS built natively for Tailwind CSS v4.

## 1. Strict SolidJS Reactivity Rules

1. **NEVER Destructure Props Directly**:
   - \`const { variant, class: className } = props;\` -> ❌ **FORBIDDEN** (breaks SolidJS fine-grained signal tracking).
   - \`const [local, others] = splitProps(props, ["variant", "class"]);\` -> ✅ **REQUIRED**.

2. **Children Inspection & Tab Hydration**:
   - ALWAYS wrap \`props.children\` with SolidJS's native \`children(() => props.children)\` memoization helper when inspecting, iterating, or rendering dynamic JSX child nodes inside containers or conditional branches.

3. **SSR Safety Guards**:
   - Always include \`typeof window !== "undefined"\` and \`typeof document !== "undefined"\` guards inside browser event listeners or DOM access logic to prevent SSR hydration crashes in SolidStart environments.

4. **Anti-FOUC Theme Script**:
   - When using \`ThemeProvider\`, ALWAYS place \`<ThemeScript storageKey="nikala-theme" />\` synchronously inside \`<head>\` or root HTML before \`<ThemeProvider>\` to eliminate flash of unstyled content during SSR.

## 2. Tailwind CSS v4 Native Design Tokens

- All components must use semantic design tokens defined in modern \`@import "tailwindcss";\` setups (\`bg-background\`, \`text-foreground\`, \`bg-card\`, \`border-border\`, \`bg-primary\`, etc.).
- Avoid hardcoded arbitrary color values; prefer semantic design tokens.

## 3. Pure Copy-Paste Primitives Ownership

- UI components are placed in \`src/components/ui/\` (or configured alias).
- Reactive hooks are placed in \`src/hooks/\` and imported locally:
  \`import { createClipboard } from "@/hooks/create-clipboard";\`
`;

const rootAgentsRuleContent = `# Nikala UI & SolidJS Development Guidelines

> Nikala UI is a copy-paste component system and reactive primitives suite for SolidJS built natively for Tailwind CSS v4.

## 1. Strict SolidJS Reactivity Rules

1. **NEVER Destructure Props Directly**:
   - \`const { variant, class: className } = props;\` -> ❌ **FORBIDDEN** (breaks SolidJS fine-grained signal tracking).
   - \`const [local, others] = splitProps(props, ["variant", "class"]);\` -> ✅ **REQUIRED**.

2. **Children Inspection & Tab Hydration**:
   - ALWAYS wrap \`props.children\` with SolidJS's native \`children(() => props.children)\` memoization helper when inspecting, iterating, or rendering dynamic JSX child nodes.

3. **SSR Safety Guards**:
   - Always include \`typeof window !== "undefined"\` and \`typeof document !== "undefined"\` guards inside browser event listeners or DOM access logic.

4. **Anti-FOUC Theme Script**:
   - When using \`ThemeProvider\`, ALWAYS place \`<ThemeScript storageKey="nikala-theme" />\` synchronously inside \`<head>\` or root HTML before \`<ThemeProvider>\`.

## 2. Tailwind CSS v4 Native Design Tokens

- All components must use semantic design tokens (\`bg-background\`, \`text-foreground\`, \`bg-card\`, \`border-border\`, \`bg-primary\`, etc.).

## 3. Pure Copy-Paste Primitives Ownership

- UI components live in \`src/components/ui/\`.
- Reactive hooks live in \`src/hooks/\` and are imported locally:
  \`import { createClipboard } from "@/hooks/create-clipboard";\`
`;

function computeDiff(localStr: string, remoteStr: string) {
  const localLines = localStr.split(/\r?\n/);
  const remoteLines = remoteStr.split(/\r?\n/);

  if (localStr.trim() === remoteStr.trim()) {
    return { isIdentical: true, additions: 0, deletions: 0, differences: [] };
  }

  const differences: string[] = [];
  let additions = 0;
  let deletions = 0;

  const maxLines = Math.max(localLines.length, remoteLines.length);
  for (let i = 0; i < maxLines; i++) {
    const loc = localLines[i];
    const rem = remoteLines[i];

    if (loc !== rem) {
      if (loc !== undefined && rem !== undefined) {
        differences.push(`L${i + 1}: - ${loc}`);
        differences.push(`L${i + 1}: + ${rem}`);
        deletions++;
        additions++;
      } else if (loc !== undefined) {
        differences.push(`L${i + 1}: - ${loc}`);
        deletions++;
      } else if (rem !== undefined) {
        differences.push(`L${i + 1}: + ${rem}`);
        additions++;
      }
    }
  }

  return {
    isIdentical: false,
    additions,
    deletions,
    differences: differences.slice(0, 50), // Limit diff preview to 50 lines
  };
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
    const item = await fetchRegistryItem(componentName);

    if (!item) {
      return {
        isError: true,
        content: [{ type: "text", text: `Component '${componentName}' not found in Nikala UI registry.` }],
      };
    }

    const workspaceRoot = await resolveWorkspaceRoot(args?.workspace_dir as string | undefined);
    const targetDirRelative = String(args?.target_dir || "src/components/ui");
    const targetDir = path.resolve(workspaceRoot, targetDirRelative);

    await fs.ensureDir(targetDir);

    const writtenFiles: string[] = [];
    for (const file of item.files) {
      const fileName = path.basename(file.path);
      const filePath = path.join(targetDir, fileName);
      await fs.writeFile(filePath, file.content, "utf-8");
      writtenFiles.push(filePath);
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              status: "success",
              component: componentName,
              workspaceRoot,
              installedFiles: writtenFiles,
              dependencies: item.dependencies || [],
              registryDependencies: item.registryDependencies || [],
            },
            null,
            2
          ),
        },
      ],
    };
  }

  if (name === "install_hook") {
    const hookName = String(args?.name || "");
    const item = await fetchRegistryItem(hookName);

    if (!item) {
      return {
        isError: true,
        content: [{ type: "text", text: `Hook '${hookName}' not found in Nikala UI registry.` }],
      };
    }

    const workspaceRoot = await resolveWorkspaceRoot(args?.workspace_dir as string | undefined);
    const targetDirRelative = String(args?.target_dir || "src/hooks");
    const targetDir = path.resolve(workspaceRoot, targetDirRelative);

    await fs.ensureDir(targetDir);

    const writtenFiles: string[] = [];
    for (const file of item.files) {
      const fileName = path.basename(file.path);
      const filePath = path.join(targetDir, fileName);
      await fs.writeFile(filePath, file.content, "utf-8");
      writtenFiles.push(filePath);
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              status: "success",
              hook: hookName,
              workspaceRoot,
              installedFiles: writtenFiles,
              dependencies: item.dependencies || [],
              registryDependencies: item.registryDependencies || [],
            },
            null,
            2
          ),
        },
      ],
    };
  }

  if (name === "search_docs") {
    const rawQuery = String(args?.query || "").trim().toLowerCase();
    if (!rawQuery) {
      return {
        content: [{ type: "text", text: JSON.stringify([], null, 2) }],
      };
    }

    const keywords = rawQuery.split(/\s+/).filter(Boolean);

    const matches = index.filter((item) => {
      const nameStr = item.name.toLowerCase();
      const titleStr = (item.title || "").toLowerCase();
      const descStr = (item.description || "").toLowerCase();

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

  if (name === "generate_ai_rules") {
    const workspaceRoot = await resolveWorkspaceRoot(args?.workspace_dir as string | undefined);
    const cursorRulesDir = path.join(workspaceRoot, ".cursor", "rules");
    await fs.ensureDir(cursorRulesDir);

    const mdcPath = path.join(cursorRulesDir, "nikala.mdc");
    await fs.writeFile(mdcPath, cursorRuleContent.trim() + "\n", "utf-8");

    const cursorRulesPath = path.join(workspaceRoot, ".cursorrules");
    await fs.writeFile(cursorRulesPath, rootAgentsRuleContent.trim() + "\n", "utf-8");

    const agentsPath = path.join(workspaceRoot, "AGENTS.md");
    if (!(await fs.pathExists(agentsPath))) {
      await fs.writeFile(agentsPath, rootAgentsRuleContent.trim() + "\n", "utf-8");
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              status: "success",
              message: "AI assistant engineering rules generated successfully",
              workspaceRoot,
              filesCreated: [mdcPath, cursorRulesPath, agentsPath],
            },
            null,
            2
          ),
        },
      ],
    };
  }

  if (name === "get_theme_css") {
    const primary = String(args?.primary_color || "amber").toLowerCase();
    const base = String(args?.base_palette || "zinc").toLowerCase();

    const sampleThemeCss = `@import "tailwindcss";

@layer base {
  :root {
    --background: oklch(1 0 0);
    --foreground: oklch(0.145 0 0);
    --card: oklch(1 0 0);
    --card-foreground: oklch(0.145 0 0);
    --popover: oklch(1 0 0);
    --popover-foreground: oklch(0.145 0 0);
    --primary: var(--color-${primary}-600, oklch(0.666 0.179 58.318));
    --primary-foreground: oklch(0.985 0 0);
    --secondary: oklch(0.97 0 0);
    --secondary-foreground: oklch(0.205 0 0);
    --muted: oklch(0.97 0 0);
    --muted-foreground: oklch(0.556 0 0);
    --accent: oklch(0.97 0 0);
    --accent-foreground: oklch(0.205 0 0);
    --destructive: oklch(0.577 0.245 27.325);
    --destructive-foreground: oklch(0.985 0 0);
    --border: oklch(0.922 0 0);
    --input: oklch(0.922 0 0);
    --ring: oklch(0.708 0 0);
    --radius: 0.5rem;
  }

  .dark {
    --background: oklch(0.145 0 0);
    --foreground: oklch(0.985 0 0);
    --card: oklch(0.205 0 0);
    --card-foreground: oklch(0.985 0 0);
    --popover: oklch(0.269 0 0);
    --popover-foreground: oklch(0.985 0 0);
    --primary: var(--color-${primary}-500, oklch(0.769 0.188 70.08));
    --primary-foreground: oklch(0.145 0 0);
    --secondary: oklch(0.269 0 0);
    --secondary-foreground: oklch(0.985 0 0);
    --muted: oklch(0.269 0 0);
    --muted-foreground: oklch(0.708 0 0);
    --accent: oklch(0.371 0 0);
    --accent-foreground: oklch(0.985 0 0);
    --destructive: oklch(0.396 0.141 25.723);
    --destructive-foreground: oklch(0.985 0 0);
    --border: oklch(0.275 0 0);
    --input: oklch(0.325 0 0);
    --ring: oklch(0.556 0 0);
  }
}`;

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              primaryColor: primary,
              basePalette: base,
              css: sampleThemeCss,
            },
            null,
            2
          ),
        },
      ],
    };
  }

  if (name === "diff_component") {
    const componentName = String(args?.name || "");
    const item = await fetchRegistryItem(componentName);

    if (!item) {
      return {
        isError: true,
        content: [{ type: "text", text: `Component or hook '${componentName}' not found in registry.` }],
      };
    }

    const workspaceRoot = await resolveWorkspaceRoot(args?.workspace_dir as string | undefined);
    const isHook = item.type === "registry:hook";
    const localFilePath = isHook
      ? path.join(workspaceRoot, "src", "hooks", `${componentName}.ts`)
      : path.join(workspaceRoot, "src", "components", "ui", `${componentName}.tsx`);

    if (!(await fs.pathExists(localFilePath))) {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                name: componentName,
                status: "missing_local",
                localPath: localFilePath,
                message: `File '${localFilePath}' does not exist locally. Run install_${isHook ? "hook" : "component"} first.`,
              },
              null,
              2
            ),
          },
        ],
      };
    }

    const localContent = await fs.readFile(localFilePath, "utf-8");
    const remoteFile = item.files[0];
    const remoteContent = remoteFile ? remoteFile.content : "";

    const diffResult = computeDiff(localContent, remoteContent);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              name: componentName,
              type: item.type,
              status: diffResult.isIdentical ? "identical" : "modified",
              localPath: localFilePath,
              differences: diffResult.differences,
              additions: diffResult.additions,
              deletions: diffResult.deletions,
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
