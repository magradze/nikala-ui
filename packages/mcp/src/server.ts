import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { MCP_TOOLS, handleToolCall } from "./tools/index.js";
import { SOLIDJS_RULES, THEMING_RULES } from "./resources/index.js";
import { handleGetPrompt } from "./prompts/index.js";

/**
 * Creates and configures the Nikala UI MCP Server instance.
 */
export function createNikalaMcpServer() {
  const server = new McpServer({
    name: "nikala-ui-mcp",
    version: "0.12.2",
  });

  /* --- Register Tools via high-level API --- */
  for (const tool of MCP_TOOLS) {
    const toolName = tool.name;
    const toolDesc = tool.description || "";

    // Build zod shape from JSON Schema properties
    const props = (tool.inputSchema as any)?.properties || {};
    const required: string[] = (tool.inputSchema as any)?.required || [];
    const zodShape: Record<string, z.ZodTypeAny> = {};

    for (const [key, schema] of Object.entries(props)) {
      const s = schema as any;
      let field: z.ZodTypeAny = z.string().describe(s.description || "");
      if (!required.includes(key)) {
        field = field.optional();
      }
      zodShape[key] = field;
    }

    server.tool(toolName, toolDesc, zodShape, async (args) => {
      const result = await handleToolCall(toolName, args as Record<string, unknown>);
      return result as any;
    });
  }

  /* --- Register Resources via high-level API --- */
  server.resource(
    "solidjs-rules",
    "nikala://rules/solidjs",
    { description: "Strict engineering rules for props splitting, fine-grained signals, and children memoization in SolidJS", mimeType: "text/plain" },
    async (uri) => ({
      contents: [{ uri: uri.href, mimeType: "text/plain", text: SOLIDJS_RULES }],
    })
  );

  server.resource(
    "theming-rules",
    "nikala://rules/theming",
    { description: "Semantic color tokens, anti-FOUC ThemeScript usage, and max rounded-lg border radius rule", mimeType: "text/plain" },
    async (uri) => ({
      contents: [{ uri: uri.href, mimeType: "text/plain", text: THEMING_RULES }],
    })
  );

  /* --- Register Prompts via high-level API --- */
  server.prompt(
    "create_form_page",
    "Generate a fully accessible SolidJS form page using Nikala UI components",
    { form_name: z.string().describe("Name of the form (e.g. 'LoginForm', 'ContactForm')") },
    async (args) => {
      return handleGetPrompt("create_form_page", args as Record<string, string>) as any;
    }
  );

  server.prompt(
    "setup_theme_provider",
    "Generate root layout setup with ThemeProvider, ThemeToggle, and Anti-FOUC ThemeScript for SolidStart",
    async () => {
      return handleGetPrompt("setup_theme_provider", undefined) as any;
    }
  );

  server.prompt(
    "create_audio_player",
    "Generate a custom media player UI using Nikala UI Progress, Button, Badge and createAudio primitive",
    async () => {
      return handleGetPrompt("create_audio_player", undefined) as any;
    }
  );

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
