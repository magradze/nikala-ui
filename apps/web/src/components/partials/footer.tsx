import { JSX } from "solid-js"

export const Footer: () => JSX.Element = () => {
  return (
    <>
      {/* 5. Footer */}
      <footer class="border-t border-border/40 py-8 text-center text-sm text-muted-foreground bg-background">
        <div class="container max-w-7xl px-4 mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Nikala UI. Built for SolidJS & Tailwind v4.</p>
          <p class="text-xs">
            Honoring <span class="text-foreground font-medium">Niko Pirosmani</span>. Created with ❤️ by <a href="https://github.com/magradze" target="_blank" class="underline hover:text-foreground">Magradze</a>.
          </p>
        </div>
      </footer>
    </>
  )
}