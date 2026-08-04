import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { createNikalaMcpServer } from "@nikala-ui/mcp/server";

const transports = new Map<string, SSEServerTransport>();

export async function GET(event: { request: Request }) {
  const url = new URL(event.request.url);

  // Endpoint for SSE stream connection
  if (url.pathname === "/api/mcp/sse") {
    const transport = new SSEServerTransport("/api/mcp/messages", event.request.signal as any);
    const server = createNikalaMcpServer();

    transports.set(transport.sessionId, transport);
    await server.connect(transport);

    return transport.response;
  }

  return new Response("Nikala UI MCP SSE Endpoint", { status: 200 });
}

export async function POST(event: { request: Request }) {
  const url = new URL(event.request.url);

  if (url.pathname === "/api/mcp/messages") {
    const sessionId = url.searchParams.get("sessionId");
    if (!sessionId) {
      return new Response("Missing sessionId query parameter", { status: 400 });
    }

    const transport = transports.get(sessionId);
    if (!transport) {
      return new Response("Session not found", { status: 444 });
    }

    await transport.handlePostMessage(event.request);
    return new Response("Accepted", { status: 202 });
  }

  return new Response("Not Found", { status: 404 });
}
