import {
  splitProps,
  type Component,
  type JSX,
  type ParentComponent,
  useContext,
} from "solid-js";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

/* --- 1. Bubble Variants --- */
export const bubbleVariants = cva(
  "relative max-w-full rounded-lg transition-colors break-words text-left select-text",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-2xs",
        muted: "bg-muted text-foreground border border-border/50 shadow-2xs",
        outline: "border border-border bg-background text-foreground shadow-2xs",
        ghost: "bg-transparent text-foreground",
      },
      size: {
        sm: "px-3 py-1.5 text-xs",
        default: "px-4 py-2.5 text-sm",
        lg: "px-5 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

/* --- 2. BubbleGroup --- */
export interface BubbleGroupProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

export const BubbleGroup: ParentComponent<BubbleGroupProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <div
      class={cn("flex flex-col gap-1 w-full", local.class)}
      {...rest}
    >
      {local.children}
    </div>
  );
};

/* --- 3. Bubble --- */
export interface BubbleProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bubbleVariants> {
  class?: string;
}

export const Bubble: ParentComponent<BubbleProps> = (props) => {
  const [local, rest] = splitProps(props, ["variant", "size", "class", "children"]);

  return (
    <div
      class={cn(
        bubbleVariants({
          variant: local.variant,
          size: local.size,
        }),
        local.class
      )}
      {...rest}
    >
      {local.children}
    </div>
  );
};

/* --- 4. BubbleContent --- */
export interface BubbleContentProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

export const BubbleContent: ParentComponent<BubbleContentProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <div
      class={cn("leading-relaxed", local.class)}
      {...rest}
    >
      {local.children}
    </div>
  );
};

/* --- 5. BubbleReactions --- */
export interface BubbleReactionsProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

export const BubbleReactions: ParentComponent<BubbleReactionsProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <div
      class={cn("flex items-center gap-1.5 pt-2 mt-2 border-t border-border/30 z-10 flex-wrap", local.class)}
      {...rest}
    >
      {local.children}
    </div>
  );
};

/* --- 6. BubbleReaction --- */
export interface BubbleReactionProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  count?: number;
  class?: string;
}

export const BubbleReaction: ParentComponent<BubbleReactionProps> = (props) => {
  const [local, rest] = splitProps(props, ["active", "count", "class", "children"]);

  return (
    <button
      type="button"
      data-active={local.active ? "true" : "false"}
      class={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-border/70 bg-background/80 px-2 py-1 text-xs text-foreground shadow-2xs transition-all hover:bg-accent hover:border-primary/40 cursor-pointer select-none",
        local.active && "border-primary/40 bg-primary/10 text-primary font-medium",
        local.class
      )}
      {...rest}
    >
      <span class="text-xs leading-none">{local.children}</span>
      {local.count !== undefined && (
        <span class="text-[11px] font-mono leading-none text-muted-foreground">{local.count}</span>
      )}
    </button>
  );
};
