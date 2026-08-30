import { Component } from "solid-js";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles } from "lucide-solid";

export const Hero01: Component = () => {
  return (
    <section class="w-full py-16 md:py-24 lg:py-28 flex flex-col items-center justify-center text-center bg-card/40 border border-border rounded-lg px-4 sm:px-8">
      <Badge variant="secondary" class="mb-5 gap-1.5 px-3 py-1 text-xs">
        <Sparkles class="size-3.5 text-primary" />
        <span>Nikala UI Blocks Suite</span>
      </Badge>

      <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground max-w-3xl leading-tight">
        Build faster with copy-paste SolidJS blocks
      </h1>

      <p class="mt-5 text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
        Pre-designed, fully responsive marketing and application blocks built natively for Tailwind CSS v4 and fine-grained reactivity.
      </p>

      <div class="mt-8 flex flex-wrap items-center justify-center gap-3.5">
        <Button size="lg" class="gap-2">
          Get Started <ArrowRight class="size-4" />
        </Button>
        <Button variant="outline" size="lg">
          Browse Catalog
        </Button>
      </div>
    </section>
  );
};

export default Hero01;
