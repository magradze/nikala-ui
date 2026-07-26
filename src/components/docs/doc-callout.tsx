// src/components/docs/doc-callout.tsx
import { splitProps, type Component, type JSX } from "solid-js";
import { Dynamic } from "solid-js/web";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

export const calloutVariants = cva(
  "p-5 rounded-xl border space-y-1.5 text-sm leading-relaxed",
  {
    variants: {
      variant: {
        info: "border-sky-500/30 bg-sky-500/10 text-sky-900 dark:text-sky-200",
        warning: "border-amber-500/30 bg-amber-500/10 text-amber-900 dark:text-amber-200",
        pirosmani: "border-primary/30 bg-primary/5 text-foreground",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
);

interface DocCalloutProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof calloutVariants> {
  title?: string;
  icon?: Component<{ class?: string }>;
}

export const DocCallout: Component<DocCalloutProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "variant",
    "title",
    "icon",
    "class",
    "children",
  ]);

  return (
    <div
      class={cn(calloutVariants({ variant: local.variant }), local.class)}
      {...rest}
    >
      {local.title && (
        <h4 class="font-bold flex items-center gap-2 text-base">
          {local.icon && (
            <span class="inline-flex shrink-0 items-center justify-center">
              <Dynamic component={local.icon} class="h-5 w-5 current-color" />
            </span>
          )}
          {local.title}
        </h4>
      )}
      <div class="text-sm text-muted-foreground">{local.children}</div>
    </div>
  );
};