import type { Tool } from "@modelcontextprotocol/sdk/types.js";
import { fetchRegistryIndex, fetchRegistryItem } from "../registry/index.js";

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
    name: "search_docs",
    description: "Search Nikala UI components, hooks, and guidelines by query keywords",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Search keyword (e.g., 'modal', 'theme', 'clipboard', 'audio')",
        },
      },
      required: ["query"],
    },
  },
];

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
