import { splitProps, type Component, type JSX } from "solid-js";
import { cn } from "@/lib/cn";

export interface TextareaProps extends JSX.TextareaHTMLAttributes<HTMLTextAreaElement> {
  class?: string;
}

/**
 * Nikala UI Textarea component built for SolidJS with Tailwind CSS v4 styling.
 */
export const Textarea: Component<TextareaProps> = (props) => {
  // Use splitProps to preserve SolidJS reactivity
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <textarea
      class={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        local.class
      )}
      {...rest}
    />
  );
};