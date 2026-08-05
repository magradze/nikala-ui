import { splitProps, type Component, type JSX } from "solid-js";
import { cn } from "@/lib/cn";

/**
 * Props interface for the Input component extending standard HTML input attributes.
 */
export interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  class?: string;
}

/**
 * Nikala UI Input component built for SolidJS with Tailwind CSS v4 styling.
 */
export const Input: Component<InputProps> = (props) => {
  // Use splitProps to preserve SolidJS reactivity for destructured props
  const [local, rest] = splitProps(props, ["class", "type"]);

  return (
    <input
      type={local.type || "text"}
      class={cn(
        "flex h-9 w-full rounded-md border border-input bg-muted px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        local.class
      )}
      {...rest}
    />
  );
};