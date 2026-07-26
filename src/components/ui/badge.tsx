import { splitProps, type Component, type JSX } from "solid-js";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

/**
 * Class variance authority configuration for badge styling variants.
 */
export const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline:
          "text-foreground border-border",
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