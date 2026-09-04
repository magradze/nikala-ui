import {
  createContext,
  useContext,
  splitProps,
  Show,
  type JSX,
  type ParentComponent,
} from "solid-js";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { cn } from "@/lib/cn";

export type StepVariant =
  | "default"
  | "primary"
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "secondary"
  | "outline"
  | "destructive"
  | "purple";

function toBadgeVariant(variant?: StepVariant): NonNullable<BadgeProps["variant"]> {
  switch (variant) {
    case "primary":
      return "default";
    case "danger":
      return "destructive";
    case "default":
      return "outline";
    case "info":
      return "info";
    case "success":
      return "success";
    case "warning":
      return "warning";
    case "secondary":
      return "secondary";
    default:
      return "outline";
  }
}
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

export interface StepProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /** Optional custom step number, icon, or label to override automatic CSS counter */
  step?: string | number | JSX.Element;
  /** Optional step title rendered at the top of the step */
  title?: string;
  /** Step color variant */
  variant?: StepVariant;
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
          <Badge
            variant={toBadgeVariant(effectiveVariant())}
            class={cn(
              "absolute -left-[2.875rem] top-0 size-7 p-0 flex items-center justify-center rounded-lg font-mono text-xs font-semibold shadow-2xs select-none",
              !local.step && "[counter-increment:step] before:content-[counter(step)]"
            )}
          >
            <Show when={local.step}>
              {local.step}
            </Show>
          </Badge>

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
        <Badge
          variant={toBadgeVariant(effectiveVariant())}
          class={cn(
            "mb-2.5 size-7 p-0 flex items-center justify-center rounded-lg font-mono text-xs font-semibold shadow-2xs select-none",
            !local.step && "[counter-increment:step] before:content-[counter(step)]"
          )}
        >
          <Show when={local.step}>
            {local.step}
          </Show>
        </Badge>

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
