import { splitProps, type Component, type JSX } from "solid-js";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export interface IconButtonProps
  extends Omit<ButtonProps, "size" | "children"> {
  /** Accessible label for the icon-only button. */
  label: string;
  size?: "sm" | "default" | "lg";
  children?: JSX.Element;
}

/** An accessible square button intended for a single icon action. */
export const IconButton: Component<IconButtonProps> = (props) => {
  const [local, rest] = splitProps(props, ["label", "size", "class", "children"]);

  return (
    <Button
      size="icon"
      aria-label={local.label}
      class={cn(
        {
          "size-8": local.size === "sm",
          "size-9": !local.size || local.size === "default",
          "size-10": local.size === "lg",
        },
        local.class
      )}
      {...rest}
    >
      {local.children}
    </Button>
  );
};
