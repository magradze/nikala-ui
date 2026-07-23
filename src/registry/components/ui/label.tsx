import { splitProps, type Component, type JSX } from "solid-js";
import { cn } from "@/lib/cn";

export interface LabelProps extends JSX.LabelHTMLAttributes<HTMLLabelElement> {
  class?: string;
}

/**
 * Nikala UI Label component for form control captions built for SolidJS with Tailwind CSS v4 styling.
 */
export const Label: Component<LabelProps> = (props) => {
  // Use splitProps to preserve SolidJS reactivity
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <label
      class={cn(
        "text-sm font-medium leading-none select-none text-zinc-950 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-zinc-50",
        local.class
      )}
      {...rest}
    />
  );
};