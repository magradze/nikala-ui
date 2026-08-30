import { A } from "@solidjs/router";
import { Button } from "@/components/ui/button";
import { createClipboard } from "@nikala-ui/hooks";
import { Check, Copy, ArrowRight } from "lucide-solid";

export function HeroActions() {
  const { copied, copy } = createClipboard({ timeout: 2000 });
  const cliInitCmd = "npx @nikala-ui/cli init";

  return (
    <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full pt-1">
      <A href="/docs/components/button">
        <Button
          size="lg"
          class="w-full sm:w-auto gap-2 text-sm h-10 px-6 font-semibold shadow-md shadow-primary/20 hover:shadow-primary/30 transition-all cursor-pointer"
        >
          Explore Components
          <ArrowRight class="size-4" />
        </Button>
      </A>

      <div class="flex items-center gap-2 bg-zinc-950 dark:bg-zinc-900 border border-border text-zinc-200 px-3.5 h-10 rounded-lg font-mono text-xs justify-between shadow-inner">
        <span class="text-zinc-500 select-none font-semibold">$</span>
        <span class="px-1 select-all font-medium">{cliInitCmd}</span>
        <button
          type="button"
          onClick={() => copy(cliInitCmd)}
          class="ml-2 flex items-center gap-1 text-[11px] bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-600 text-zinc-200 px-2 py-1 rounded-md transition-colors cursor-pointer"
          title="Copy command to clipboard"
        >
          {copied() ? (
            <>
              <Check class="size-3 text-emerald-400" />
              <span class="text-emerald-400 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy class="size-3 text-zinc-400" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
