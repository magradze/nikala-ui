import { JSX } from "solid-js"
import { Palette, Wrench, Zap } from "lucide-solid";
import { Card } from "../ui/card";

export const Features: () => JSX.Element = () => {
  return (
    <>
      {/* 4. Features Section */}
      <section class="py-16 md:py-24">
        <div class="container max-w-7xl px-4 mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card class="p-6 rounded-lg border border-border/60 bg-card space-y-3">
              <div class="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold">
                <Zap />
              </div>
              <h3 class="font-bold text-lg">SolidJS Reactive First</h3>
              <p class="text-sm text-muted-foreground leading-relaxed">
                Built with `splitProps` and fine-grained signal tracking. Never breaks reactive primitives or component updates.
              </p>
            </Card>

            {/* Feature 2 */}
            <Card class="p-6 rounded-lg border border-border/60 bg-card space-y-3">
              <div class="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold">
                <Palette />
              </div>
              <h3 class="font-bold text-lg">Tailwind CSS v4 Native</h3>
              <p class="text-sm text-muted-foreground leading-relaxed">
                Designed around CSS-first `@import "tailwindcss";` setups with semantic variables, `--primary` accents, and dark mode.
              </p>
            </Card>

            {/* Feature 3 */}
            <Card class="p-6 rounded-lg border border-border/60 bg-card space-y-3">
              <div class="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold">
                <Wrench />
              </div>
              <h3 class="font-bold text-lg">Smart CLI & Full Ownership</h3>
              <p class="text-sm text-muted-foreground leading-relaxed">
                The `nikala` CLI writes clean TypeScript directly to your workspace. You own 100% of the UI source code.
              </p>
            </Card>
          </div>
        </div>
      </section></>
  )
}