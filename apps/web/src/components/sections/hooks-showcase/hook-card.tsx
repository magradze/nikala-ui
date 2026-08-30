import { JSX } from "solid-js";
import { A } from "@solidjs/router";
import { ArrowUpRight } from "lucide-solid";
import { cn } from "@/lib/cn";

export interface HookCardProps {
  hookName: string;
  category: string;
  description: string;
  href: string;
  children: JSX.Element;
  class?: string;
}

export function HookCard(props: HookCardProps) {
  return (
    <div
      class={cn(
        "rounded-lg border border-border/80 bg-card p-5 shadow-xs flex flex-col justify-between space-y-4 text-left transition-all hover:border-primary/50 hover:shadow-md",
        props.class
      )}
    >
      <div class="space-y-2">
        <div class="flex items-center justify-between">
          <div class="space-y-0.5">
            <span class="text-[10px] font-mono uppercase text-muted-foreground tracking-wider font-semibold">
              {props.category}
            </span>
            <h4 class="text-base font-bold text-foreground font-mono">
              {props.hookName}
            </h4>
          </div>
          <A
            href={props.href}
            class="p-1 rounded-md text-muted-foreground hover:text-primary hover:bg-accent/50 transition-colors"
            title={`View ${props.hookName} documentation`}
          >
            <ArrowUpRight class="size-4" />
          </A>
        </div>
        <p class="text-xs text-muted-foreground leading-relaxed">
          {props.description}
        </p>
      </div>

      <div class="p-3.5 rounded-lg border border-border/60 bg-muted/30">
        {props.children}
      </div>

      <div class="pt-1 flex items-center justify-between border-t border-border/40">
        <span class="text-[10px] font-mono text-muted-foreground">@nikala-ui/hooks</span>
        <A
          href={props.href}
          class="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
        >
          Documentation →
        </A>
      </div>
    </div>
  );
}
