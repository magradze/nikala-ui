import { JSX } from "solid-js"

export const Footer: () => JSX.Element = () => {
  return (
    <>
      {/* 5. Footer */}
      <footer class="border-t border-border/40 py-8 text-center text-sm text-muted-foreground bg-background">
        <div class="container max-w-7xl px-4 mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <p>© {new Date().getFullYear()} Nikala UI. Built for SolidJS & Tailwind v4.</p>
            <a
              href="/llms.txt"
              target="_blank"
              class="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-lg border border-primary/30 bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
            >
              LLM Docs (llms.txt)
            </a>
          </div>
          <p class="text-xs">
            Honoring <span class="text-foreground font-medium">Niko Pirosmani</span>. Created with ❤️ by <a href="https://github.com/magradze" target="_blank" class="underline hover:text-foreground">Magradze</a>.
          </p>
        </div>
      </footer>
    </>
  )
}