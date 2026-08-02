import { For, splitProps, type Component, type JSX } from "solid-js";
import { usePackageManager, type PackageManager } from "@/hooks/use-package-manager";
import { cn } from "@/lib/cn";

export interface PmRunnerSelectorProps extends JSX.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md";
  class?: string;
}

/**
 * Reusable Package Manager runner selector component (bunx, npx, pnpm, yarn).
 */
export const PmRunnerSelector: Component<PmRunnerSelectorProps> = (props) => {
  const [local, rest] = splitProps(props, ["size", "class"]);
  const { activePm, setPm } = usePackageManager();

  const pmList: PackageManager[] = ["bunx", "npx", "pnpm", "yarn"];

  const containerSize = () => (local.size === "md" ? "text-xs p-1" : "text-[11px] p-0.5");
  const buttonSize = () => (local.size === "md" ? "px-2.5 py-1 text-xs" : "px-1.5 py-0.5 text-[11px]");

  return (
    <div
      class={cn(
        "inline-flex items-center rounded-md border border-border/50 bg-muted/40 font-mono select-none",
        containerSize(),
        local.class
      )}
      {...rest}
    >
      <For each={pmList}>
        {(pm) => (
          <button
            type="button"
            onClick={() => setPm(pm)}
            class={cn(
              "rounded-xs transition-colors cursor-pointer font-mono",
              buttonSize(),
              activePm() === pm
                ? "bg-primary text-primary-foreground font-bold shadow-2xs"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {pm}
          </button>
        )}
      </For>
    </div>
  );
};