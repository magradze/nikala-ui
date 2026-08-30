import { A } from "@solidjs/router";
import { Button } from "@/components/ui/button";
import { createClipboard } from "@nikala-ui/hooks";
import { Check, Copy, ArrowRight, Sparkles } from "lucide-solid";

export function CtaBanner() {
  const { copied, copy } = createClipboard({ timeout: 2000 });
  const initCmd = "npx @nikala-ui/cli init";

  return (
    <div class="relative overflow-hidden rounded-2xl border border-border/80 bg-linear-to-b from-card/80 to-muted/40 backdrop-blur-xl p-8 sm:p-12 md:p-16 text-center shadow-xl space-y-6">
      {/* Background ambient glow */}
      <div class="absolute -top-24 left-1/2 -translate-x-1/2 size-72 rounded-lg bg-primary/15 blur-3xl pointer-events-none" />

      <div class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-primary/30 bg-primary/5 text-primary text-xs font-semibold">
        <Sparkles class="size-3.5" />
        <span>Get Started in Under 60 Seconds</span>
      </div>

      <div class="space-y-3 max-w-2xl mx-auto">
        <h2 class="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
          Ready to Build Your Next SolidJS Application?
        </h2>
        <p class="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Initialize Nikala UI in your existing SolidStart or Vite project, pick your theme colors, and start shipping components.
        </p>
      </div>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <A href="/docs" class="w-full sm:w-auto">
          <Button size="lg" class="w-full sm:w-auto gap-2 font-semibold h-11 px-8 cursor-pointer shadow-lg shadow-primary/20">
            Read Documentation
            <ArrowRight class="size-4" />
          </Button>
        </A>

        <div class="flex items-center gap-2 bg-zinc-950 dark:bg-zinc-900 border border-border text-zinc-200 px-4 h-11 rounded-lg font-mono text-sm w-full sm:w-auto justify-between shadow-inner">
          <span class="text-zinc-500 select-none">$</span>
          <span class="px-2 select-all text-xs sm:text-sm font-medium">{initCmd}</span>
          <button
            type="button"
            onClick={() => copy(initCmd)}
            class="ml-2 flex items-center gap-1 text-xs bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-600 text-zinc-200 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
            title="Copy command"
          >
            {copied() ? (
              <>
                <Check class="size-3.5 text-emerald-400" />
                <span class="text-emerald-400 font-medium">Copied!</span>
              </>
            ) : (
              <>
                <Copy class="size-3.5 text-zinc-400" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
