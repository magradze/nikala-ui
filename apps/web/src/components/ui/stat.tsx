import {
  splitProps,
  type JSX,
  type ParentComponent,
} from "solid-js";
import { cva, type VariantProps } from "class-variance-authority";
import { TrendingUp, TrendingDown, Minus } from "lucide-solid";
import { cn } from "@/lib/cn";

/* --- 1. Stat Group (Container Grid) --- */
export interface StatGroupProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
  columns?: 1 | 2 | 3 | 4 | 5;
}

export const StatGroup: ParentComponent<StatGroupProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "columns", "children"]);

  const columnClass = () => {
    switch (local.columns) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-1 sm:grid-cols-2";
      case 3:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
      case 5:
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5";
      case 4:
      default:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
    }
  };

  return (
    <div
      class={cn("grid gap-4 sm:gap-5 w-full", columnClass(), local.class)}
      {...rest}
    >
      {local.children}
    </div>
  );
};

/* --- 2. Stat Root Card --- */
export const statVariants = cva(
  "relative flex flex-col justify-between rounded-lg transition-all duration-200",
  {
    variants: {
      variant: {
        default: "border border-border bg-card text-card-foreground p-4 sm:p-5 shadow-2xs space-y-2",
        flat: "bg-muted/40 text-foreground p-4 sm:p-5 space-y-2",
        bordered: "border-2 border-border bg-background text-foreground p-4 sm:p-5 space-y-2",
        ghost: "bg-transparent text-foreground p-2 space-y-1",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface StatProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statVariants> {
  class?: string;
}

export const Stat: ParentComponent<StatProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "variant", "children"]);

  return (
    <div
      class={cn(statVariants({ variant: local.variant }), local.class)}
      {...rest}
    >
      {local.children}
    </div>
  );
};

/* --- 3. Stat Header (Top Row) --- */
export interface StatHeaderProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

export const StatHeader: ParentComponent<StatHeaderProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <div
      class={cn("flex items-center justify-between gap-2", local.class)}
      {...rest}
    >
      {local.children}
    </div>
  );
};

/* --- 4. Stat Label / Title --- */
export interface StatLabelProps extends JSX.HTMLAttributes<HTMLParagraphElement> {
  class?: string;
}

export const StatLabel: ParentComponent<StatLabelProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <p
      class={cn(
        "text-xs sm:text-sm font-medium text-muted-foreground leading-tight tracking-tight",
        local.class
      )}
      {...rest}
    >
      {local.children}
    </p>
  );
};

/* --- 5. Stat Icon Wrapper --- */
export interface StatIconProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

export const StatIcon: ParentComponent<StatIconProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <div
      class={cn(
        "flex size-4 sm:size-4.5 shrink-0 items-center justify-center text-muted-foreground",
        local.class
      )}
      {...rest}
    >
      {local.children}
    </div>
  );
};

/* --- 6. Stat Value (Big Number) --- */
export interface StatValueProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

export const StatValue: ParentComponent<StatValueProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <div
      class={cn(
        "text-2xl sm:text-3xl font-bold tracking-tight text-foreground flex items-baseline gap-1 my-0.5",
        local.class
      )}
      {...rest}
    >
      {local.children}
    </div>
  );
};

/* --- 7. Stat Unit / Currency (Prefix or Suffix) --- */
export interface StatUnitProps extends JSX.HTMLAttributes<HTMLSpanElement> {
  class?: string;
}

export const StatUnit: ParentComponent<StatUnitProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <span
      class={cn("text-lg sm:text-xl font-semibold text-muted-foreground self-baseline", local.class)}
      {...rest}
    >
      {local.children}
    </span>
  );
};

/* --- 8. Stat Trend (Growth / Decline Indicator - No Background) --- */
export const statTrendVariants = cva(
  "inline-flex items-center gap-1 text-xs font-semibold select-none shrink-0 tracking-tight",
  {
    variants: {
      type: {
        up: "text-emerald-600 dark:text-emerald-400",
        down: "text-red-600 dark:text-red-400",
        neutral: "text-muted-foreground",
      },
    },
    defaultVariants: {
      type: "up",
    },
  }
);

export interface StatTrendProps
  extends JSX.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statTrendVariants> {
  class?: string;
  hideIcon?: boolean;
}

export const StatTrend: ParentComponent<StatTrendProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "type", "hideIcon", "children"]);

  const Icon = () => {
    if (local.hideIcon) return null;
    if (local.type === "down") return <TrendingDown class="size-3.5 stroke-[2.5]" />;
    if (local.type === "neutral") return <Minus class="size-3.5 stroke-[2.5]" />;
    return <TrendingUp class="size-3.5 stroke-[2.5]" />;
  };

  return (
    <span
      class={cn(statTrendVariants({ type: local.type }), local.class)}
      {...rest}
    >
      <Icon />
      <span>{local.children}</span>
    </span>
  );
};

/* --- 9. Stat Help Text / Bottom Row (Between Alignment) --- */
export interface StatHelpTextProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

export const StatHelpText: ParentComponent<StatHelpTextProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <div
      class={cn(
        "flex items-center justify-between gap-2 text-xs text-muted-foreground pt-1",
        local.class
      )}
      {...rest}
    >
      {local.children}
    </div>
  );
};
