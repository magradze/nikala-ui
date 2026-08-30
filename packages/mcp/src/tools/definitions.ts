import type { Tool } from "@modelcontextprotocol/sdk/types.js";

export const MCP_TOOLS: Tool[] = [
  {
    name: "list_components",
    description: "List all available Nikala UI components from the official registry",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "list_hooks",
    description: "List all available Nikala UI reactive primitives / hooks from the official registry",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "get_component_code",
    description: "Fetch the complete source code TSX manifest for a specific Nikala UI component",
    inputSchema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "Unique component name (e.g. 'button', 'dialog', 'progress', 'theme-manager')",
        },
      },
      required: ["name"],
    },
  },
  {
    name: "get_hook_code",
    description: "Fetch the complete reactive TS primitive source code for a specific Nikala UI hook",
    inputSchema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "Unique hook name (e.g. 'create-clipboard', 'create-audio', 'create-websocket')",
        },
      },
      required: ["name"],
    },
  },
  {
    name: "install_component",
    description: "Automatically writes a Nikala UI component source TSX files directly to the developer's project directory (src/components/ui/)",
    inputSchema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "Unique component name to install (e.g. 'button', 'card', 'dialog')",
        },
        workspace_dir: {
          type: "string",
          description: "Absolute or relative path to the target project workspace root (e.g. '/path/to/project')",
        },
        target_dir: {
          type: "string",
          description: "Target directory path relative to project root (defaults to 'src/components/ui')",
        },
      },
      required: ["name"],
    },
  },
  {
    name: "install_hook",
    description: "Automatically writes a Nikala UI reactive primitive TS file directly to the developer's project directory (src/hooks/)",
    inputSchema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "Unique hook name to install (e.g. 'create-clipboard', 'create-audio')",
        },
        workspace_dir: {
          type: "string",
          description: "Absolute or relative path to the target project workspace root (e.g. '/path/to/project')",
        },
        target_dir: {
          type: "string",
          description: "Target directory path relative to project root (defaults to 'src/hooks')",
        },
      },
      required: ["name"],
    },
  },
  {
    name: "search_docs",
    description: "Search Nikala UI components, hooks, and guidelines by keywords (supports multi-word fuzzy search)",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Search keywords (e.g., 'modal dialog', 'audio player', 'theme mode')",
        },
      },
      required: ["query"],
    },
  },
  {
    name: "validate_project",
    description: "Inspect local project for Nikala UI setup health (nikala.config.json, cn.ts helper, path aliases, runtime dependencies)",
    inputSchema: {
      type: "object",
      properties: {
        workspace_dir: {
          type: "string",
          description: "Absolute or relative path to the target project workspace root",
        },
      },
    },
  },
  {
    name: "inspect_workspace",
    description: "Inspect local project to list which Nikala UI components (src/components/ui/) and hooks (src/hooks/) are ALREADY installed",
    inputSchema: {
      type: "object",
      properties: {
        workspace_dir: {
          type: "string",
          description: "Absolute or relative path to the target project workspace root",
        },
      },
    },
  },
  {
    name: "generate_ai_rules",
    description: "Generate or update AI assistant engineering rules (.cursor/rules/nikala.mdc, .cursorrules, AGENTS.md) in the target workspace",
    inputSchema: {
      type: "object",
      properties: {
        workspace_dir: {
          type: "string",
          description: "Absolute or relative path to the target project workspace root",
        },
      },
    },
  },
  {
    name: "get_theme_css",
    description: "Generate Tailwind CSS v4 @theme CSS configuration tokens for any primary accent color and base gray palette",
    inputSchema: {
      type: "object",
      properties: {
        primary_color: {
          type: "string",
          description: "Primary brand accent color (e.g. 'amber', 'wine', 'emerald', 'violet', 'rose', 'blue', 'cyan', 'zinc')",
        },
        base_palette: {
          type: "string",
          description: "Base gray palette (e.g. 'zinc', 'slate', 'gray', 'neutral', 'stone')",
        },
      },
    },
  },
  {
    name: "diff_component",
    description: "Compare locally installed component or hook against the latest official registry manifest and view code diffs",
    inputSchema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "Unique component or hook name to compare (e.g. 'button', 'sidebar', 'dialog', 'create-clipboard')",
        },
        workspace_dir: {
          type: "string",
          description: "Absolute or relative path to the target project workspace root",
        },
      },
      required: ["name"],
    },
  },
];
