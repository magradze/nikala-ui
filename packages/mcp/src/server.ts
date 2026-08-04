import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { MCP_TOOLS, handleToolCall } from "./tools/index.js";
import { RESOURCE_LIST, SOLIDJS_RULES, THEMING_RULES } from "./resources/index.js";

/**
 * Creates and configures the Nikala UI MCP Server instance.
 */
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
    return { tools: MCP_TOOLS };
  });

  /* --- Execute MCP Tools --- */
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    return handleToolCall(name, args as Record<string, unknown> | undefined);
  });

  /* --- List Available Resources --- */
  server.setRequestHandler(ListResourcesRequestSchema, async () => {
    return { resources: RESOURCE_LIST };
  });

  /* --- Read Resources --- */
  server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    const { uri } = request.params;

    if (uri === "nikala://rules/solidjs") {
      return {
        contents: [{ uri, mimeType: "text/plain", text: SOLIDJS_RULES }],
      };
    }

    if (uri === "nikala://rules/theming") {
      return {
        contents: [{ uri, mimeType: "text/plain", text: THEMING_RULES }],
      };
    }

    throw new Error(`Resource not found: ${uri}`);
  });

  return server;
}

/**
 * Runs the MCP server over Stdio transport.
 */
export async function runStdioServer() {
  const server = createNikalaMcpServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("[Nikala MCP] Server running on stdio");
}
