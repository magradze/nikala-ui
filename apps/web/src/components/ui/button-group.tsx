import { splitProps, type Component, type JSX } from "solid-js";
import { cn } from "@/lib/cn";

export interface ButtonGroupProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /** Controls whether grouped buttons are arranged in a row or column. */
  orientation?: "horizontal" | "vertical";
  class?: string;
}

/**
 * Groups adjacent buttons into a connected control with shared borders and radii.
 *
 * ButtonGroup is intentionally presentational. Use Button for individual actions
 * and compose the group with the same reactive state as the surrounding feature.
 */
export const ButtonGroup: Component<ButtonGroupProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "orientation",
    "class",
    "children",
  ]);

  const orientation = () => local.orientation ?? "horizontal";

  return (
    <div
      role="group"
      data-orientation={orientation()}
      class={cn(
        "isolate inline-flex",
        orientation() === "horizontal"
          ? "flex-row [&>button:not(:first-child)]:-ml-px [&>button:not(:first-child)]:rounded-l-none [&>button:not(:last-child)]:rounded-r-none"
          : "flex-col [&>button:not(:first-child)]:-mt-px [&>button:not(:first-child)]:rounded-t-none [&>button:not(:last-child)]:rounded-b-none",
        "[&>button:focus-visible]:z-10",
        local.class
      )}
      {...rest}
    >
      {local.children}
    </div>
  );
};
