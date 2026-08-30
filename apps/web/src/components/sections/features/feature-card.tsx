import { JSX } from "solid-js";
import { cn } from "@/lib/cn";

export interface FeatureCardProps {
  icon: JSX.Element;
  title: string;
  badge?: string;
  description: string;
  class?: string;
}

export function FeatureCard(props: FeatureCardProps) {
  return (
    <div
      class={cn(
        "rounded-lg border border-border/80 bg-card p-6 shadow-xs space-y-3.5 text-left transition-all hover:border-primary/50 hover:shadow-md",
        props.class
      )}
    >
      <div class="flex items-center justify-between">
        <div class="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold">
          {props.icon}
        </div>
        {props.badge && (
          <span class="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-muted border border-border text-muted-foreground font-semibold">
            {props.badge}
          </span>
        )}
      </div>

      <div class="space-y-1.5">
        <h3 class="font-bold text-base text-foreground tracking-tight">
          {props.title}
        </h3>
        <p class="text-xs text-muted-foreground leading-relaxed">
          {props.description}
        </p>
      </div>
    </div>
  );
}
