import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { fetchRegistryIndex, fetchRegistryItem } from "./registry.js";

export function createNikalaMcpServer() {
  const server = new Server(
    {
      name: "nikala-ui-mcp",
      version: "0.9.3",
    },
    {
      capabilities: {
        tools: {},
        resources: {},
      },
    }
  );

  /* --- List Available MCP Tools --- */
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: [
        {
          name: "list_components",
          description: "List all 27 available Nikala UI components (Accordion, Button, Dialog, Progress, etc.)",
          inputSchema: {
            type: "object",
            properties: {},
          },
        },
        {
          name: "list_hooks",
          description: "List all 40 available Nikala UI reactive primitives / hooks (createAudio, createClipboard, createWebSocket, etc.)",
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
      ],
    };
  });

  /* --- Execute MCP Tools --- */
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    const index = await fetchRegistryIndex();

    if (name === "list_components") {
      const components = index.filter((item) => item.type !== "registry:hook");
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(components, null, 2),
          },
        ],
      };
    }

    if (name === "list_hooks") {
      const hooks = index.filter((item) => item.type === "registry:hook");
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(hooks, null, 2),
          },
        ],
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
  });

  /* --- List Available Resources --- */
  server.setRequestHandler(ListResourcesRequestSchema, async () => {
    return {
      resources: [
        {
          uri: "nikala://rules/solidjs",
          name: "SolidJS Reactivity Guidelines",
          description: "Strict engineering rules for props splitting, fine-grained signals, and children memoization in SolidJS",
          mimeType: "text/plain",
        },
        {
          uri: "nikala://rules/theming",
          name: "Tailwind CSS v4 Design Tokens",
          description: "Semantic color tokens, anti-FOUC ThemeScript usage, and max rounded-lg border radius rule",
          mimeType: "text/plain",
        },
      ],
    };
  });

  /* --- Read Resources --- */
  server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    const { uri } = request.params;

    if (uri === "nikala://rules/solidjs") {
      return {
        contents: [
          {
            uri,
            mimeType: "text/plain",
            text: `Nikala UI SolidJS Rules:
1. Props Splitting: NEVER destructure props directly. ALWAYS use splitProps(props, ["variant", "class"]).
2. Children Memoization: ALWAYS wrap props.children with children(() => props.children) when rendering dynamic child nodes in tabs or conditional branches.
3. Hook Imports: Copy-paste hooks locally to src/hooks/ and import via alias: import { createClipboard } from "@/hooks/create-clipboard".
`,
          },
        ],
      };
    }

    if (uri === "nikala://rules/theming") {
      return {
        contents: [
          {
            uri,
            mimeType: "text/plain",
            text: `Nikala UI Theming & Styling Rules:
1. Max Border Radius: NEVER use rounded-xl, 2xl, or 3xl for containers or cards. The max allowed radius is rounded-lg.
2. Anti-FOUC ThemeScript: ALWAYS place <ThemeScript storageKey="..." /> synchronously in root head before ThemeProvider.
3. Tailwind v4 Tokens: Use semantic tokens like bg-background, text-foreground, bg-card, border-border, bg-primary.
`,
          },
        ],
      };
    }

    throw new Error(`Resource not found: ${uri}`);
  });

  return server;
}

export async function runStdioServer() {
  const server = createNikalaMcpServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Nikala UI MCP Server running on stdio");
}
