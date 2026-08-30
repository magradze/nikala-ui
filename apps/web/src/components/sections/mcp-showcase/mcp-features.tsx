import { A } from "@solidjs/router";
import { Button } from "@/components/ui/button";
import { Bot, Terminal, Cpu, ArrowRight } from "lucide-solid";

export function McpFeatures() {
  return (
    <div class="space-y-6 text-left">
      <div class="space-y-3">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-primary/30 bg-primary/5 text-primary text-xs font-semibold">
          <Bot class="size-3.5" />
          <span>AI-Native Component System</span>
        </div>
        <h3 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          Built for AI Pair Programming
        </h3>
        <p class="text-sm text-muted-foreground leading-relaxed">
          Nikala UI ships with a first-class Model Context Protocol (MCP) server. Your AI agents (Cursor, Windsurf, Claude Code, Antigravity) can inspect, install, and validate components autonomously without manual copy-pasting.
        </p>
      </div>

      <div class="space-y-3 pt-2">
        <div class="flex items-start gap-3">
          <div class="p-2 rounded-lg bg-primary/10 text-primary shrink-0 mt-0.5">
            <Terminal class="size-4" />
          </div>
          <div>
            <h4 class="text-sm font-bold text-foreground">Callable MCP Tools</h4>
            <p class="text-xs text-muted-foreground">
              Supports <code class="font-mono text-primary text-[11px]">list_components</code>, <code class="font-mono text-primary text-[11px]">install_component</code>, and <code class="font-mono text-primary text-[11px]">validate_project</code>.
            </p>
          </div>
        </div>

        <div class="flex items-start gap-3">
          <div class="p-2 rounded-lg bg-primary/10 text-primary shrink-0 mt-0.5">
            <Cpu class="size-4" />
          </div>
          <div>
            <h4 class="text-sm font-bold text-foreground">Stdio & Remote SSE Streaming</h4>
            <p class="text-xs text-muted-foreground">
              Run locally via <code class="font-mono text-primary text-[11px]">npx @nikala-ui/mcp</code> or connect remotely to <code class="font-mono text-primary text-[11px]">nikala.dev/api/mcp/sse</code>.
            </p>
          </div>
        </div>
      </div>

      <div class="pt-2">
        <A href="/docs/mcp">
          <Button class="gap-2 text-xs font-semibold cursor-pointer">
            Read MCP Integration Guide
            <ArrowRight class="size-3.5" />
          </Button>
        </A>
      </div>
    </div>
  );
}
