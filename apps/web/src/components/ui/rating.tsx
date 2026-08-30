import {
  createSignal,
  splitProps,
  For,
  type JSX,
  type Component,
} from "solid-js";
import { cva, type VariantProps } from "class-variance-authority";
import { Star } from "lucide-solid";
import { cn } from "@/lib/cn";

export const ratingVariants = cva(
  "inline-flex items-center select-none transition-colors",
  {
    variants: {
      size: {
        sm: "gap-0.5",
        default: "gap-1",
        lg: "gap-1.5",
      },
      variant: {
        yellow: "text-amber-500 dark:text-amber-400",
        primary: "text-primary",
        destructive: "text-destructive",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "yellow",
    },
  }
);

export const ratingStarVariants = cva(
  "transition-all duration-150 shrink-0",
  {
    variants: {
      size: {
        sm: "size-3.5",
        default: "size-4.5",
        lg: "size-6",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface RatingProps
  extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof ratingVariants> {
  value?: number;
  defaultValue?: number;
  max?: number;
  readOnly?: boolean;
  disabled?: boolean;
  class?: string;
  starClass?: string;
  onChange?: (value: number) => void;
  onHover?: (value: number | null) => void;
}

export const Rating: Component<RatingProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "value",
    "defaultValue",
    "max",
    "readOnly",
    "disabled",
    "size",
    "variant",
    "class",
    "starClass",
    "onChange",
    "onHover",
  ]);

  const [internalValue, setInternalValue] = createSignal(
    local.defaultValue ?? 0
  );
  const [hoverValue, setHoverValue] = createSignal<number | null>(null);

  const currentValue = () =>
    local.value !== undefined ? local.value : internalValue();

  const maxStars = () => local.max ?? 5;
  const isInteractive = () => !local.readOnly && !local.disabled;

  const stars = () => Array.from({ length: maxStars() }, (_, i) => i + 1);

  const handleSelect = (starValue: number) => {
    if (!isInteractive()) return;
    if (local.value === undefined) {
      setInternalValue(starValue);
    }
    local.onChange?.(starValue);
  };

  const handleMouseEnter = (starValue: number) => {
    if (!isInteractive()) return;
    setHoverValue(starValue);
    local.onHover?.(starValue);
  };

  const handleMouseLeave = () => {
    if (!isInteractive()) return;
    setHoverValue(null);
    local.onHover?.(null);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isInteractive()) return;

    const val = currentValue();
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(maxStars(), val + 1);
      handleSelect(next);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      const prev = Math.max(1, val - 1);
      handleSelect(prev);
    } else if (e.key === "Home") {
      e.preventDefault();
      handleSelect(1);
    } else if (e.key === "End") {
      e.preventDefault();
      handleSelect(maxStars());
    }
  };

  return (
    <div
      role={isInteractive() ? "radiogroup" : "img"}
      aria-label={`Rating: ${currentValue()} of ${maxStars()} stars`}
      tabIndex={isInteractive() ? 0 : undefined}
      onKeyDown={handleKeyDown}
      onMouseLeave={handleMouseLeave}
      class={cn(
        ratingVariants({ size: local.size, variant: local.variant }),
        local.disabled && "opacity-50 cursor-not-allowed",
        isInteractive() && "cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md",
        local.class
      )}
      {...rest}
    >
      <For each={stars()}>
        {(star) => {
          const isFilled = () => {
            const active = hoverValue() !== null ? hoverValue()! : currentValue();
            return star <= active;
          };

          return (
            <button
              type="button"
              disabled={local.disabled || local.readOnly}
              tabIndex={-1}
              aria-label={`${star} star${star > 1 ? "s" : ""}`}
              onClick={() => handleSelect(star)}
              onMouseEnter={() => handleMouseEnter(star)}
              class={cn(
                "p-0.5 border-0 bg-transparent transition-transform focus:outline-hidden",
                isInteractive() && "hover:scale-115 active:scale-95 cursor-pointer",
                local.readOnly && "cursor-default",
                local.disabled && "cursor-not-allowed"
              )}
            >
              <Star
                class={cn(
                  ratingStarVariants({ size: local.size }),
                  isFilled()
                    ? "fill-current"
                    : "text-muted-foreground/30 fill-transparent",
                  local.starClass
                )}
              />
            </button>
          );
        }}
      </For>
    </div>
  );
};
