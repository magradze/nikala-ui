import { Badge } from "@/components/ui/badge";
import { Bot, CheckCircle2 } from "lucide-solid";

export function McpChat() {
  return (
    <div class="rounded-lg border border-border bg-card text-foreground p-5 md:p-6 shadow-lg font-mono text-xs space-y-4 text-left">
      {/* Terminal Titlebar */}
      <div class="flex items-center justify-between border-b border-border pb-3">
        <div class="flex items-center gap-2">
          <div class="flex gap-1.5">
            <span class="size-2.5 rounded-lg bg-red-500/80" />
            <span class="size-2.5 rounded-lg bg-yellow-500/80" />
            <span class="size-2.5 rounded-lg bg-green-500/80" />
          </div>
          <span class="text-muted-foreground text-[11px] font-sans font-medium pl-2">
            Nikala UI MCP Server • Cursor / Claude / Antigravity
          </span>
        </div>
        <Badge variant="outline" class="border-emerald-500/40 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 text-[10px] py-0">
          Connected (Stdio/SSE)
        </Badge>
      </div>

      {/* Chat / Tool Execution Stream */}
      <div class="space-y-3.5">
        {/* User Prompt */}
        <div class="flex items-start gap-2.5 bg-muted/40 p-3 rounded-lg border border-border/80">
          <div class="size-5 rounded bg-primary/20 text-primary flex items-center justify-center font-bold text-[10px] shrink-0 font-sans">
            U
          </div>
          <div class="space-y-1">
            <p class="text-foreground">
              "Add an interactive Table and Order Tracking Timeline for my SolidStart store with Tailwind v4."
            </p>
          </div>
        </div>

        {/* AI Agent & MCP Tool Call */}
        <div class="flex items-start gap-2.5 bg-muted/30 p-3 rounded-lg border border-border/60">
          <Bot class="size-5 text-primary shrink-0 mt-0.5" />
          <div class="space-y-2 w-full min-w-0">
            <div class="flex items-center gap-2">
              <span class="text-primary font-bold">Nikala UI MCP Agent</span>
              <span class="text-[10px] text-muted-foreground font-sans">Running Tool: install_component</span>
            </div>

            {/* Tool Output Log */}
            <div class="p-2.5 rounded bg-card border border-border space-y-1 text-[11px]">
              <div class="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 class="size-3.5" />
                <span>Installed: src/components/ui/table.tsx</span>
              </div>
              <div class="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 class="size-3.5" />
                <span>Installed: src/components/ui/timeline.tsx</span>
              </div>
              <div class="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 class="size-3.5" />
                <span>Verified: fine-grained SolidJS signal splitProps</span>
              </div>
            </div>

            <p class="text-muted-foreground text-[11px] font-sans pt-1">
              ✨ Both components are installed directly into your codebase with complete copy-paste ownership and TypeScript types.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
