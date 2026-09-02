import {
  createContext,
  useContext,
  splitProps,
  Show,
  type JSX,
  type ParentComponent,
} from "solid-js";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

export const stepBadgeVariants = cva(
  "flex size-7 items-center justify-center rounded-lg border font-mono text-xs font-semibold shadow-2xs select-none transition-colors",
  {
    variants: {
      variant: {
        default: "border-border/80 bg-background text-foreground",
        primary: "border-primary bg-primary text-primary-foreground shadow-xs",
        info: "border-sky-500/40 bg-background text-sky-600 dark:text-sky-400",
        success: "border-emerald-500/40 bg-background text-emerald-600 dark:text-emerald-400",
        warning: "border-amber-500/40 bg-background text-amber-600 dark:text-amber-400",
        danger: "border-rose-500/40 bg-background text-rose-600 dark:text-rose-400",
        purple: "border-purple-500/40 bg-background text-purple-600 dark:text-purple-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type StepVariant = NonNullable<VariantProps<typeof stepBadgeVariants>["variant"]>;
export type StepOrientation = "horizontal" | "vertical";

interface StepsContextValue {
  variant?: StepVariant;
  orientation?: () => StepOrientation;
}

const StepsContext = createContext<StepsContextValue>();

export interface StepsProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /** Layout orientation: vertical (default) or horizontal */
  orientation?: StepOrientation;
  /** Default color variant for all steps in this container */
  variant?: StepVariant;
  class?: string;
}

/**
 * Multi-step instruction and stepper container supporting vertical and horizontal layouts.
 */
export const Steps: ParentComponent<StepsProps> = (props) => {
  const [local, rest] = splitProps(props, ["orientation", "variant", "class", "children"]);

  const orientation = () => local.orientation || "vertical";

  return (
    <StepsContext.Provider value={{ variant: local.variant, orientation }}>
      <div
        class={cn(
          "relative my-6 [counter-reset:step]",
          orientation() === "horizontal"
            ? "flex flex-row items-start justify-between w-full"
            : "ml-4 border-l border-border/80 pl-8 space-y-8",
          local.class
        )}
        {...rest}
      >
        {/* Single continuous horizontal rail in parent container */}
        <Show when={orientation() === "horizontal"}>
          <div class="absolute left-8 right-8 top-3.5 h-0.5 bg-border/80 z-0" />
        </Show>

        {local.children}
      </div>
    </StepsContext.Provider>
  );
};

export interface StepProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stepBadgeVariants> {
  /** Optional custom step number, icon, or label to override automatic CSS counter */
  step?: string | number | JSX.Element;
  /** Optional step title rendered at the top of the step */
  title?: string;
  class?: string;
}

export const Step: ParentComponent<StepProps> = (props) => {
  const [local, rest] = splitProps(props, ["step", "title", "variant", "class", "children"]);
  const context = useContext(StepsContext);

  const effectiveVariant = () => local.variant || context?.variant || "default";
  const isHorizontal = () => context?.orientation?.() === "horizontal";

  return (
    <Show
      when={isHorizontal()}
      fallback={
        <div class={cn("relative", local.class)} {...rest}>
          {/* Numbered Step Badge with geometric center on left vertical border line */}
          <div
            class={cn(
              stepBadgeVariants({ variant: effectiveVariant() }),
              "absolute -left-[2.875rem] top-0",
              "[counter-increment:step] before:content-[counter(step)]"
            )}
          >
            <Show when={local.step}>
              <span class="absolute inset-0 flex items-center justify-center rounded-lg font-mono text-xs font-semibold">
                {local.step}
              </span>
            </Show>
          </div>

          {/* Step Title Header */}
          <Show when={local.title}>
            <h4 class="font-semibold text-base tracking-tight text-foreground mb-2">
              {local.title}
            </h4>
          </Show>

          {/* Step Body Content */}
          <div class="text-sm leading-relaxed text-muted-foreground space-y-3">
            {local.children}
          </div>
        </div>
      }
    >
      <div class={cn("flex-1 flex flex-col items-center text-center relative z-10 px-2", local.class)} {...rest}>
        {/* Step Badge sitting on top of continuous parent rail */}
        <div
          class={cn(
            stepBadgeVariants({ variant: effectiveVariant() }),
            "mb-2.5 [counter-increment:step] before:content-[counter(step)]"
          )}
        >
          <Show when={local.step}>
            <span class="absolute inset-0 flex items-center justify-center rounded-lg font-mono text-xs font-semibold">
              {local.step}
            </span>
          </Show>
        </div>

        {/* Step Title Header */}
        <Show when={local.title}>
          <h4 class="font-semibold text-sm tracking-tight text-foreground mb-1">
            {local.title}
          </h4>
        </Show>

        {/* Step Body Content */}
        <div class="text-xs leading-relaxed text-muted-foreground">
          {local.children}
        </div>
      </div>
    </Show>
  );
};

export interface StepTitleProps extends JSX.HTMLAttributes<HTMLHeadingElement> {
  class?: string;
}

export const StepTitle: ParentComponent<StepTitleProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <h4
      class={cn("font-semibold text-base tracking-tight text-foreground mb-2", local.class)}
      {...rest}
    >
      {local.children}
    </h4>
  );
};

export interface StepDescriptionProps extends JSX.HTMLAttributes<HTMLParagraphElement> {
  class?: string;
}

export const StepDescription: ParentComponent<StepDescriptionProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <div class={cn("text-sm leading-relaxed text-muted-foreground", local.class)} {...rest}>
      {local.children}
    </div>
  );
};
