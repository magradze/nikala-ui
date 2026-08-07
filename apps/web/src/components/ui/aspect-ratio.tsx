import { splitProps, type Component, type JSX } from "solid-js";
import { cn } from "@/lib/cn";

export interface AspectRatioProps extends JSX.HTMLAttributes<HTMLDivElement> {
  ratio?: number;
  class?: string;
  children?: JSX.Element;
}

/**
 * Nikala UI AspectRatio Component.
 * Displays content within a specific aspect ratio (e.g. 16/9, 4/3, 1/1) using CSS aspect-ratio.
 */
export const AspectRatio: Component<AspectRatioProps> = (props) => {
  const [local, rest] = splitProps(props, ["ratio", "class", "children", "style"]);

  const computedRatio = () => (local.ratio !== undefined ? local.ratio : 16 / 9);

  return (
    <div
      class={cn("relative w-full overflow-hidden", local.class)}
      style={{
        "aspect-ratio": `${computedRatio()}`,
        ...(typeof local.style === "object" ? local.style : {}),
      }}
      {...rest}
    >
      {local.children}
    </div>
  );
};
