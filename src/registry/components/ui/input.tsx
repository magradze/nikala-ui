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
        "flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-zinc-950 placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-zinc-800 dark:file:text-zinc-50 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300",
        local.class
      )}
      {...rest}
    />
  );
};