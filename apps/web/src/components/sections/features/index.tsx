import { FeaturesGrid } from "./features-grid";

export function Features() {
  return (
    <section class="py-16 md:py-24 border-b border-border/40">
      <div class="container max-w-7xl px-4 mx-auto space-y-12">
        <div class="text-center space-y-3 max-w-2xl mx-auto">
          <h2 class="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Why Choose Nikala UI?
          </h2>
          <p class="text-sm sm:text-base text-muted-foreground">
            A comprehensive design system engineered specifically for SolidJS without compromising on ergonomics or performance.
          </p>
        </div>

        <FeaturesGrid />
      </div>
    </section>
  );
}

export * from "./feature-card";
export * from "./features-grid";
