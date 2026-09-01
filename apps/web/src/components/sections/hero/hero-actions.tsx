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

      <div class="flex items-center gap-2 bg-card border border-border text-foreground px-3.5 h-10 rounded-lg font-mono text-xs justify-between shadow-xs">
        <span class="text-muted-foreground select-none font-semibold">$</span>
        <span class="px-1 select-all font-medium">{cliInitCmd}</span>
        <button
          type="button"
          onClick={() => copy(cliInitCmd)}
          class="ml-2 flex items-center gap-1 text-[11px] bg-muted hover:bg-muted/80 active:bg-muted/60 text-foreground border border-border/70 px-2 py-1 rounded-md transition-colors cursor-pointer"
          title="Copy command to clipboard"
        >
          {copied() ? (
            <>
              <Check class="size-3 text-emerald-500" />
              <span class="text-emerald-500 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy class="size-3 text-muted-foreground" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
