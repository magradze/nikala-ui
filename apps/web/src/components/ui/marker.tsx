import {
  splitProps,
  type Component,
  type JSX,
  type ParentComponent,
  Show,
} from "solid-js";
import { cn } from "@/lib/cn";

/* --- 1. Marker Root --- */
export interface MarkerProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

export const Marker: ParentComponent<MarkerProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <div
      role="status"
      class={cn("flex w-full items-center justify-center my-3 text-center select-none", local.class)}
      {...rest}
    >
      {local.children}
    </div>
  );
};

/* --- 2. MarkerContent --- */
export interface MarkerContentProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

export const MarkerContent: ParentComponent<MarkerContentProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <div
      class={cn(
        "inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-muted/40 px-3 py-1 text-xs text-muted-foreground shadow-2xs backdrop-blur-xs",
        local.class
      )}
      {...rest}
    >
      {local.children}
    </div>
  );
};

/* --- 3. MarkerDate (Date Divider) --- */
export interface MarkerDateProps extends JSX.HTMLAttributes<HTMLDivElement> {
  date?: string;
  class?: string;
}

export const MarkerDate: ParentComponent<MarkerDateProps> = (props) => {
  const [local, rest] = splitProps(props, ["date", "class", "children"]);

  return (
    <div
      class={cn("relative flex w-full items-center justify-center my-4", local.class)}
      {...rest}
    >
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-border/50" />
      </div>
      <div class="relative flex items-center gap-1 bg-background px-3 py-0.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground rounded-md border border-border/40">
        {local.children || local.date}
      </div>
    </div>
  );
};

/* --- 4. MarkerTyping (Live Typing Indicator) --- */
export interface MarkerTypingProps extends JSX.HTMLAttributes<HTMLDivElement> {
  name?: string;
  class?: string;
}

export const MarkerTyping: Component<MarkerTypingProps> = (props) => {
  const [local, rest] = splitProps(props, ["name", "class"]);

  return (
    <div
      role="status"
      aria-label={`${local.name || "Someone"} is typing`}
      class={cn("flex w-full items-center gap-2 text-xs text-muted-foreground my-2", local.class)}
      {...rest}
    >
      <Show when={local.name}>
        <span class="font-medium text-foreground">{local.name}</span> is typing
      </Show>

      {/* 3 Animated Bouncing Dots */}
      <span class="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-muted/60 border border-border/40">
        <span class="size-1.5 rounded-lg bg-foreground/60 animate-bounce [animation-delay:-0.3s]" />
        <span class="size-1.5 rounded-lg bg-foreground/60 animate-bounce [animation-delay:-0.15s]" />
        <span class="size-1.5 rounded-lg bg-foreground/60 animate-bounce" />
      </span>
    </div>
  );
};
