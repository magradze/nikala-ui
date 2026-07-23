import { splitProps, type Component, type JSX } from "solid-js";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

/**
 * Class variance authority configuration for badge styling variants.
 */
export const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 dark:focus:ring-zinc-300",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-zinc-900 text-zinc-50 shadow hover:bg-zinc-900/80 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/80",
        secondary:
          "border-transparent bg-zinc-100 text-zinc-900 hover:bg-zinc-100/80 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800/80",
        destructive:
          "border-transparent bg-red-600 text-zinc-50 shadow hover:bg-red-600/80 dark:bg-red-900 dark:text-zinc-50 dark:hover:bg-red-900/80",
        outline:
          "text-zinc-950 border-zinc-200 dark:border-zinc-800 dark:text-zinc-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * Props interface for the Badge component extending standard HTML div attributes.
 */
export interface BadgeProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  class?: string;
}

/**
 * Nikala UI Badge component built for SolidJS with Tailwind CSS v4 styling.
 */
export const Badge: Component<BadgeProps> = (props) => {
  // Use splitProps to preserve SolidJS reactivity
  const [local, rest] = splitProps(props, ["variant", "class", "children"]);

  return (
    <div class={cn(badgeVariants({ variant: local.variant }), local.class)} {...rest}>
      {local.children}
    </div>
  );
};