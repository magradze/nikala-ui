import { Component } from "solid-js";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-solid";

export default function Hero01() {
  return (
    <section class="w-full py-12 md:py-24 lg:py-32 flex flex-col items-center justify-center text-center">
      <Badge variant="secondary" class="mb-4">
        Nikala UI Blocks
      </Badge>
      <h1 class="text-4xl font-bold tracking-tight sm:text-6xl text-foreground max-w-3xl">
        Build faster with copy-paste SolidJS blocks
      </h1>
      <p class="mt-6 text-lg text-muted-foreground max-w-2xl">
        Pre-designed, fully responsive marketing and application blocks built natively for Tailwind CSS v4.
      </p>
      <div class="mt-8 flex items-center gap-4">
        <Button size="lg">
          Get Started <ArrowRight class="ml-2 size-4" />
        </Button>
        <Button variant="outline" size="lg">
          Documentation
        </Button>
      </div>
    </section>
  );
}
