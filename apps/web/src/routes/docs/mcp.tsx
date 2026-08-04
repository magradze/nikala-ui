import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Bot, Cpu, Globe, Server, Terminal, Zap } from "lucide-solid";

const stdioConfigCode = `{
  "mcpServers": {
    "nikala-ui": {
      "command": "npx",
      "args": ["-y", "@nikala-ui/mcp"]
    }
  }
}`;

const sseEndpointCode = `// Remote SSE Connection Endpoint
URL: https://nikala.magradze.dev/api/mcp/sse
Messages: https://nikala.magradze.dev/api/mcp/messages`;

export default function McpDocsPage() {
  return (
    <>
      <Seo
        title="MCP Server (Model Context Protocol)"
        description="Connect AI coding assistants directly to Nikala UI components, primitives, and SolidJS reactivity guidelines."
        path="/docs/mcp"
      />

      <div class="space-y-10 pb-16">
        <DocPageHeader
          title="MCP Server Protocol"
          badge="@nikala-ui/mcp"
          description="Model Context Protocol (MCP) integration server that connects AI coding assistants directly to the Nikala UI registry for zero-error component generation."
        />

        {/* 1. Feature Highlights */}
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card variant="outline" class="bg-card/50">
            <CardHeader class="pb-2">
              <div class="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-2">
                <Cpu class="w-4 h-4" />
              </div>
              <CardTitle class="text-base">Real-time Component Code</CardTitle>
              <CardDescription>
                AI models fetch up-to-date SolidJS TSX code manifests directly from the official registry.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card variant="outline" class="bg-card/50">
            <CardHeader class="pb-2">
              <div class="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-2">
                <Zap class="w-4 h-4" />
              </div>
              <CardTitle class="text-base">40 Reactive Primitives</CardTitle>
              <CardDescription>
                Provides instant access to primitive hooks like createAudio, createClipboard, and createWebSocket.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card variant="outline" class="bg-card/50">
            <CardHeader class="pb-2">
              <div class="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-2">
                <Bot class="w-4 h-4" />
              </div>
              <CardTitle class="text-base">SolidJS & Tailwind Rules</CardTitle>
              <CardDescription>
                Exposes strict props-splitting, fine-grained reactivity, and anti-FOUC rules to AI models.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* 2. Configuration & Transports */}
        <DocSectionHeader
          title="Configuration & Setup"
          subtitle="Support for both Stdio local execution and remote HTTP/SSE transports"
        />

        <div class="space-y-6">
          <div class="p-4 rounded-lg border border-border/60 bg-muted/20 space-y-3">
            <div class="flex items-center gap-2">
              <Terminal class="w-4 h-4 text-primary" />
              <h3 class="font-semibold text-sm">Option 1: Stdio Transport (Cursor / Antigravity / Claude)</h3>
              <Badge variant="outline" class="text-[10px] text-primary border-primary/30">Recommended</Badge>
            </div>
            <p class="text-xs text-muted-foreground">
              Add `@nikala-ui/mcp` to your IDE's MCP configuration file (`mcp.json` or Claude Desktop config):
            </p>
            <CodeBlock code={stdioConfigCode} language="json" filename="mcp.json" showCopy={true} />
          </div>

          <div class="p-4 rounded-lg border border-border/60 bg-muted/20 space-y-3">
            <div class="flex items-center gap-2">
              <Globe class="w-4 h-4 text-primary" />
              <h3 class="font-semibold text-sm">Option 2: Remote SSE Transport (HTTP)</h3>
            </div>
            <p class="text-xs text-muted-foreground">
              For web-based AI tools or assistants supporting Server-Sent Events (SSE) remote MCP connections:
            </p>
            <CodeBlock code={sseEndpointCode} language="ts" filename="SSE Endpoints" showCopy={true} />
          </div>
        </div>

        {/* 3. Available MCP Tools */}
        <DocSectionHeader
          title="MCP Tools Reference"
          subtitle="Callable tools registered on the Nikala UI MCP server"
        />

        <div class="border rounded-lg overflow-hidden border-border/60">
          <table class="w-full text-left text-sm">
            <thead class="bg-muted/40 border-b border-border/60 text-xs font-semibold uppercase text-muted-foreground">
              <tr>
                <th class="px-4 py-3">Tool Name</th>
                <th class="px-4 py-3">Description</th>
                <th class="px-4 py-3">Example Input</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border/40 font-mono text-xs">
              <tr>
                <td class="px-4 py-3 font-semibold text-primary">list_components</td>
                <td class="px-4 py-3 font-sans text-muted-foreground">Returns metadata list of all 27 available UI components</td>
                <td class="px-4 py-3 text-muted-foreground">{}</td>
              </tr>
              <tr>
                <td class="px-4 py-3 font-semibold text-primary">list_hooks</td>
                <td class="px-4 py-3 font-sans text-muted-foreground">Returns metadata list of all 40 reactive primitives</td>
                <td class="px-4 py-3 text-muted-foreground">{}</td>
              </tr>
              <tr>
                <td class="px-4 py-3 font-semibold text-primary">get_component_code</td>
                <td class="px-4 py-3 font-sans text-muted-foreground">Fetches complete TSX component source code manifest</td>
                <td class="px-4 py-3 text-muted-foreground">{`{ "name": "dialog" }`}</td>
              </tr>
              <tr>
                <td class="px-4 py-3 font-semibold text-primary">get_hook_code</td>
                <td class="px-4 py-3 font-sans text-muted-foreground">Fetches complete reactive TS primitive source code</td>
                <td class="px-4 py-3 text-muted-foreground">{`{ "name": "create-clipboard" }`}</td>
              </tr>
              <tr>
                <td class="px-4 py-3 font-semibold text-primary">search_docs</td>
                <td class="px-4 py-3 font-sans text-muted-foreground">Searches components, hooks, and guidelines by keywords</td>
                <td class="px-4 py-3 text-muted-foreground">{`{ "query": "audio" }`}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 4. MCP Engineering Resources */}
        <DocSectionHeader
          title="Engineering Rule Resources"
          subtitle="Pre-loaded guidelines automatically served to AI models"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 rounded-lg border border-border/60 bg-background space-y-2">
            <h4 class="font-semibold text-sm text-foreground flex items-center gap-2">
              <Badge variant="outline" class="text-[10px]">nikala://rules/solidjs</Badge>
              SolidJS Reactivity
            </h4>
            <p class="text-xs text-muted-foreground">
              Enforces strict rules for <code class="text-primary font-mono">splitProps(props, [...])</code>, fine-grained signal access, and memoized <code class="text-primary font-mono">children()</code> inspection.
            </p>
          </div>

          <div class="p-4 rounded-lg border border-border/60 bg-background space-y-2">
            <h4 class="font-semibold text-sm text-foreground flex items-center gap-2">
              <Badge variant="outline" class="text-[10px]">nikala://rules/theming</Badge>
              Tailwind v4 Design Tokens
            </h4>
            <p class="text-xs text-muted-foreground">
              Enforces native Tailwind v4 CSS theme variables, anti-FOUC ThemeScript placement, and maximum <code class="text-primary font-mono">rounded-lg</code> container radius.
            </p>
          </div>
        </div>

        {/* Footer Navigation */}
        <DocNextSteps
          prev={{ title: "Theming Guide", href: "/docs/theming" }}
          next={{ title: "Accordion Component", href: "/docs/components/accordion" }}
        />
      </div>
    </>
  );
}
