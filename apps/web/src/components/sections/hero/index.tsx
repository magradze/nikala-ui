import { HeroBadge } from "./hero-badge";
import { HeroHeading } from "./hero-heading";
import { HeroActions } from "./hero-actions";
import { HeroThemePicker } from "./hero-theme-picker";
import { HeroBentoGrid } from "./hero-bento-grid";
import { CheckCircle2 } from "lucide-solid";

export function Hero() {
  return (
    <section class="relative overflow-hidden py-12 md:py-20 lg:py-24 border-b border-border/40">
      {/* Subtle CSS Grid Pattern Background */}
      <div class="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-size-[32px_32px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div class="container max-w-7xl px-4 mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Typography, Actions & Theme Controls */}
          <div class="lg:col-span-6 flex flex-col items-start text-left space-y-6">
            {/* 1. Version Badge */}
            <HeroBadge />

            {/* 2. Headline & Subtitle */}
            <HeroHeading />

            {/* 3. Theme Color Switcher */}
            <HeroThemePicker />

            {/* 4. Action Buttons & Quick CLI Box */}
            <HeroActions />

            {/* 5. Quick Value Highlights */}
            <div class="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs text-muted-foreground">
              <div class="flex items-center gap-1.5">
                <CheckCircle2 class="size-3.5 text-primary" />
                <span>Zero Virtual DOM Overhead</span>
              </div>
              <div class="flex items-center gap-1.5">
                <CheckCircle2 class="size-3.5 text-primary" />
                <span>100% Copy-Paste Ownership</span>
              </div>
              <div class="flex items-center gap-1.5">
                <CheckCircle2 class="size-3.5 text-primary" />
                <span>Tailwind CSS v4 Native</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Components Grid */}
          <div class="lg:col-span-6 w-full">
            <HeroBentoGrid />
          </div>
        </div>
      </div>
    </section>
  );
}

export * from "./hero-badge";
export * from "./hero-heading";
export * from "./hero-actions";
export * from "./hero-theme-picker";
export * from "./hero-bento-grid";
