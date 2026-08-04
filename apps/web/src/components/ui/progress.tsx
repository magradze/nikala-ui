import { splitProps, Show, type Component, type JSX } from "solid-js";
import { Progress as KobalteProgress } from "@kobalte/core/progress";
import { cn } from "@/lib/cn";

export interface ProgressProps
  extends Omit<
    JSX.HTMLAttributes<HTMLDivElement>,
    "value" | "aria-valuenow" | "aria-valuemin" | "aria-valuemax"
  > {
  /** The current numeric progress value. */
  value?: number;
  /** Minimum progress value. Defaults to 0. */
  minValue?: number;
  /** Maximum progress value. Defaults to 100. */
  maxValue?: number;
  /** Label text for accessibility and screen readers. */
  getValueLabel?: (params: { value: number; max: number }) => string;
  /** Custom label element to display above or beside progress bar. */
  label?: JSX.Element;
  /** Optional custom class for root container. */
  class?: string;
  /** Optional custom class for indicator fill bar. */
  indicatorClass?: string;
}

/**
 * Nikala UI Progress component for showing task completion status or media timeline positions.
 */
export const Progress: Component<ProgressProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "value",
    "minValue",
    "maxValue",
    "getValueLabel",
    "label",
    "class",
    "indicatorClass",
  ]);

  return (
    <KobalteProgress
      value={local.value ?? 0}
      minValue={local.minValue ?? 0}
      maxValue={local.maxValue ?? 100}
      getValueLabel={local.getValueLabel}
      class={cn("flex w-full flex-col gap-1.5", local.class)}
      {...rest}
    >
      <Show when={local.label}>
        <div class="flex justify-between text-xs font-medium text-muted-foreground">
          <KobalteProgress.Label>{local.label}</KobalteProgress.Label>
          <KobalteProgress.ValueLabel class="font-mono text-foreground" />
        </div>
      </Show>

      <KobalteProgress.Track class="relative h-2 w-full overflow-hidden rounded-lg bg-primary/20">
        <KobalteProgress.Fill
          class={cn(
            "h-full w-(--kb-progress-fill-width) bg-primary transition-all duration-300 ease-in-out",
            local.indicatorClass
          )}
        />
      </KobalteProgress.Track>
    </KobalteProgress>
  );
};
