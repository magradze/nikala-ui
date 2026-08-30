import { A } from "@solidjs/router";
import { Button } from "@/components/ui/button";
import { createClipboard } from "@nikala-ui/hooks";
import { Check, Copy, ArrowRight, Sparkles, CheckCircle2 } from "lucide-solid";

export function CtaBanner() {
  const { copied, copy } = createClipboard({ timeout: 2000 });
  const initCmd = "npx @nikala-ui/cli init";

  return (
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center text-left">
      {/* Left Column: Headline & Value Proposition */}
      <div class="lg:col-span-7 space-y-4">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-primary/30 bg-primary/5 text-primary text-xs font-semibold">
          <Sparkles class="size-3.5" />
          <span>Get Started in Under 60 Seconds</span>
        </div>

        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
          Ready to Build Your Next SolidJS Application?
        </h2>

        <p class="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
          Initialize Nikala UI in your existing SolidStart or Vite project, configure your theme color tokens, and start shipping accessible components with 100% copy-paste code ownership.
        </p>

        <div class="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 text-xs text-muted-foreground">
          <div class="flex items-center gap-1.5">
            <CheckCircle2 class="size-3.5 text-primary" />
            <span>MIT Licensed</span>
          </div>
          <div class="flex items-center gap-1.5">
            <CheckCircle2 class="size-3.5 text-primary" />
            <span>Pure SolidJS Signals</span>
          </div>
          <div class="flex items-center gap-1.5">
            <CheckCircle2 class="size-3.5 text-primary" />
            <span>Zero Runtime Lock-in</span>
          </div>
        </div>
      </div>

      {/* Right Column: Interactive CLI Box & Action Buttons */}
      <div class="lg:col-span-5 space-y-4">
        {/* CLI Command Box */}
        <div class="flex items-center gap-2 bg-zinc-950 dark:bg-zinc-900 border border-border text-zinc-200 px-4 h-12 rounded-lg font-mono text-sm justify-between shadow-xs">
          <div class="flex items-center gap-2 min-w-0">
            <span class="text-zinc-500 select-none font-semibold">$</span>
            <span class="truncate font-medium">{initCmd}</span>
          </div>
          <button
            type="button"
            onClick={() => copy(initCmd)}
            class="shrink-0 ml-2 flex items-center gap-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-600 text-zinc-200 px-3 py-1.5 rounded-md transition-colors cursor-pointer"
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

        {/* Action Buttons */}
        <div class="flex flex-col sm:flex-row items-center gap-3">
          <A href="/docs" class="w-full sm:w-auto flex-1">
            <Button size="lg" class="w-full gap-2 font-semibold h-11 cursor-pointer shadow-md shadow-primary/20 hover:shadow-primary/30">
              Read Documentation
              <ArrowRight class="size-4" />
            </Button>
          </A>

          <A href="/playground" class="w-full sm:w-auto flex-1">
            <Button variant="outline" size="lg" class="w-full font-semibold h-11 cursor-pointer">
              Interactive Playground
            </Button>
          </A>
        </div>
      </div>
    </div>
  );
}
