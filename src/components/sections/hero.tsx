import { createSignal, JSX } from "solid-js";
import { A } from "@solidjs/router";
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export const Hero: () => JSX.Element = () => {
    const [copied, setCopied] = createSignal(false);
    const cliInitCmd = "npx nikala init";
  
    const copyInitCommand = async () => {
      await navigator.clipboard.writeText(cliInitCmd);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    
  return (
    <>
      {/* 2. Hero Section */}
      <section class="relative overflow-hidden py-20 md:py-32 border-b border-border/40">
        {/* Subtle Background Glow */}
        <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-150 h-87.5 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

        <div class="container max-w-7xl px-4 mx-auto flex flex-col items-center text-center space-y-8">
          {/* Version Badge */}
          <A href="/docs" class="inline-flex items-center gap-2">
            <Badge variant="outline" class="px-3 py-1 text-xs rounded-lg border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer">
              <span class="w-2 h-2 rounded-lg bg-primary animate-pulse mr-1" />
              Nikala UI v0.4.0 is now live for Tailwind v4
            </Badge>
          </A>

          {/* Main Title */}
          <h1 class="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight max-w-4xl leading-[1.1]">
            Copy-Paste UI Components for <span class="text-primary">SolidJS</span> & <span class="text-primary">Tailwind v4</span>
          </h1>

          {/* Description */}
          <p class="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Honoring Georgian painter Niko Pirosmani (Nikala). Fine-grained reactivity, full code ownership, smart CLI, and native CSS-first configuration.
          </p>

          {/* Call to Actions & CLI Copy */}
          <div class="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-2">
            <A href="/docs/components/button" class="w-full sm:w-auto">
              <Button size="lg" class="w-full sm:w-auto gap-2 text-base h-11 px-8 font-semibold shadow-lg shadow-primary/25">
                Explore Components
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Button>
            </A>

            {/* Terminal Quick Init Command */}
            <div class="flex items-center gap-2 bg-zinc-950 dark:bg-zinc-900 border border-border text-zinc-200 px-4 h-11 rounded-md font-mono text-sm w-full sm:w-auto justify-between shadow-inner">
              <span class="text-zinc-400 select-none">$</span>
              <span class="px-2">{cliInitCmd}</span>
              <button
                onClick={copyInitCommand}
                class="ml-2 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-2.5 py-1 rounded transition-colors"
              >
                {copied() ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}