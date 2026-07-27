import { splitProps, type Component, type JSX } from "solid-js";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

export const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground select-none"
);

export interface LabelProps
  extends JSX.LabelHTMLAttributes<HTMLLabelElement>,
  VariantProps<typeof labelVariants> {
  class?: string;
}

/**
 * Nikala UI Label component for form controls built for SolidJS with Tailwind CSS v4 styling.
 */
export const Label: Component<LabelProps> = (props) => {
  /* Use splitProps to preserve SolidJS signal reactivity */
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <label
      class={cn(labelVariants(), local.class)}
      {...rest}
    >
      {local.children}
    </label>
  );
};