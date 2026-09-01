import { Show, splitProps, type Component, type JSX } from "solid-js";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

export const statusVariants = cva(
  "inline-flex items-center gap-2 text-sm font-medium text-foreground",
  {
    variants: {
      variant: {
        neutral: "text-muted-foreground",
        success: "text-emerald-700 dark:text-emerald-400",
        warning: "text-amber-700 dark:text-amber-400",
        error: "text-destructive",
        info: "text-blue-700 dark:text-blue-400",
      },
      size: {
        sm: "text-xs gap-1.5",
        default: "text-sm gap-2",
      },
      bordered: {
        true: "rounded-md border px-2 py-1",
        false: "",
      },
      borderVariant: {
        neutral: "border-muted-foreground/30",
        success: "border-emerald-500/30",
        warning: "border-amber-500/30",
        error: "border-destructive/30",
        info: "border-blue-500/30",
      },
    },
    defaultVariants: {
      variant: "neutral",
      size: "default",
      bordered: false,
      borderVariant: "neutral",
    },
  }
);

export const statusDotVariants = cva("size-2 shrink-0 rounded-lg", {
  variants: {
    variant: {
      neutral: "bg-muted-foreground",
      success: "bg-emerald-500",
      warning: "bg-amber-500",
      error: "bg-destructive",
      info: "bg-blue-500",
    },
    size: {
      sm: "size-1.5",
      default: "size-2",
    },
    animation: {
      none: "",
      pulse: "animate-pulse",
      ping: "",
    },
  },
  defaultVariants: {
    variant: "neutral",
    size: "default",
    animation: "none",
  },
});

export interface StatusProps
  extends JSX.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusVariants> {
  class?: string;
  animation?: "none" | "pulse" | "ping";
}

/** A compact status indicator combining a semantic color dot and label. */
export const Status: Component<StatusProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "variant",
    "size",
    "class",
    "children",
    "animation",
    "bordered",
  ]);

  return (
    <span
      role="status"
      class={cn(
        statusVariants({
          variant: local.variant,
          size: local.size,
          bordered: local.bordered,
          borderVariant: local.variant,
        }),
        local.class
      )}
      {...rest}
    >
      <span class="relative flex shrink-0" aria-hidden="true">
        <Show when={local.animation === "ping"}>
          <span
            class={cn(
              "absolute inline-flex size-full animate-ping rounded-lg opacity-75",
              statusDotVariants({ variant: local.variant, size: local.size })
            )}
          />
        </Show>
        <span
          class={cn(
            statusDotVariants({
              variant: local.variant,
              size: local.size,
              animation: local.animation === "ping" ? "none" : local.animation,
            })
          )}
        />
      </span>
      {local.children}
    </span>
  );
};
