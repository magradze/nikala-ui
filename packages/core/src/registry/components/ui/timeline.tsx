import {
  createContext,
  useContext,
  splitProps,
  type Component,
  type JSX,
  type Accessor,
} from "solid-js";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

/* --- Timeline Context --- */
interface TimelineContextValue {
  orientation: Accessor<"vertical" | "horizontal">;
  align: Accessor<"left" | "right" | "alternate">;
  size: Accessor<"sm" | "default" | "lg">;
}

const TimelineContext = createContext<TimelineContextValue>();

export interface TimelineProps extends JSX.HTMLAttributes<HTMLOListElement> {
  /** Layout orientation of the timeline */
  orientation?: "vertical" | "horizontal";
  /** Alignment of content relative to the timeline line */
  align?: "left" | "right" | "alternate";
  /** Sizing of dots and spacing */
  size?: "sm" | "default" | "lg";
  class?: string;
  children?: JSX.Element;
}

/**
 * Root container for chronological timeline event sequences.
 */
export const Timeline: Component<TimelineProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "orientation",
    "align",
    "size",
    "class",
    "children",
  ]);

  const orientation = () => local.orientation ?? "vertical";
  const align = () => local.align ?? "left";
  const size = () => local.size ?? "default";

  const contextValue: TimelineContextValue = {
    orientation,
    align,
    size,
  };

  return (
    <TimelineContext.Provider value={contextValue}>
      <ol
        role="list"
        data-orientation={orientation()}
        data-align={align()}
        class={cn(
          "relative flex",
          orientation() === "vertical"
            ? "flex-col w-full"
            : "flex-row w-full items-start",
          local.class
        )}
        {...rest}
      >
        {local.children}
      </ol>
    </TimelineContext.Provider>
  );
};

/* --- Timeline Item --- */
export interface TimelineItemProps extends JSX.HTMLAttributes<HTMLLIElement> {
  class?: string;
  children?: JSX.Element;
}

/**
 * Individual event row container in the timeline.
 */
export const TimelineItem: Component<TimelineItemProps> = (props) => {
  const context = useContext(TimelineContext);
  const [local, rest] = splitProps(props, ["class", "children"]);

  const isVertical = () => !context || context.orientation() === "vertical";
  const align = () => context?.align() ?? "left";

  return (
    <li
      class={cn(
        "group relative flex",
        isVertical()
          ? "min-h-[3.5rem] w-full items-start"
          : "flex-1 min-w-0 flex-col items-start",
        isVertical() && align() === "right" && "flex-row-reverse",
        isVertical() && align() === "alternate" && "[&:nth-child(even)]:flex-row-reverse",
        local.class
      )}
      {...rest}
    >
      {local.children}
    </li>
  );
};

/* --- Timeline Separator (Dot + Connector wrapper) --- */
export interface TimelineSeparatorProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

export const TimelineSeparator: Component<TimelineSeparatorProps> = (props) => {
  const context = useContext(TimelineContext);
  const [local, rest] = splitProps(props, ["class", "children"]);

  const isVertical = () => !context || context.orientation() === "vertical";

  return (
    <div
      aria-hidden="true"
      class={cn(
        "flex shrink-0 relative",
        isVertical()
          ? "flex-col items-center self-stretch"
          : "flex-row items-center w-full",
        local.class
      )}
      {...rest}
    >
      {local.children}
    </div>
  );
};

/* --- Timeline Point / Dot --- */
export const timelinePointVariants = cva(
  "relative z-10 flex shrink-0 items-center justify-center rounded-full font-medium transition-all shadow-xs",
  {
    variants: {
      variant: {
        default: "border-2 bg-background",
        solid: "text-primary-foreground",
        subtle: "bg-muted text-muted-foreground",
        outline: "border-2 border-border bg-card text-foreground",
      },
      status: {
        default: "border-border text-foreground bg-card",
        primary: "border-primary bg-primary text-primary-foreground",
        success: "border-emerald-500 bg-emerald-500 text-white dark:border-emerald-400 dark:bg-emerald-400",
        warning: "border-amber-500 bg-amber-500 text-white dark:border-amber-400 dark:bg-amber-400",
        destructive: "border-destructive bg-destructive text-destructive-foreground",
        muted: "border-border/60 bg-muted text-muted-foreground",
      },
      size: {
        sm: "size-5 text-[10px] [&_svg]:size-3",
        default: "size-8 text-xs [&_svg]:size-4",
        lg: "size-10 text-sm [&_svg]:size-5",
      },
    },
    defaultVariants: {
      variant: "default",
      status: "default",
      size: "default",
    },
  }
);

export interface TimelinePointProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelinePointVariants> {
  class?: string;
  children?: JSX.Element;
}

/**
 * Status indicator node or icon container in the timeline separator.
 */
export const TimelinePoint: Component<TimelinePointProps> = (props) => {
  const context = useContext(TimelineContext);
  const [local, rest] = splitProps(props, [
    "variant",
    "status",
    "size",
    "class",
    "children",
  ]);

  const size = () => local.size || context?.size() || "default";

  return (
    <div
      class={cn(
        timelinePointVariants({
          variant: local.variant,
          status: local.status,
          size: size(),
        }),
        local.class
      )}
      {...rest}
    >
      {local.children}
    </div>
  );
};

/* --- Timeline Connector (Line track) --- */
export interface TimelineConnectorProps extends JSX.HTMLAttributes<HTMLDivElement> {
  dashed?: boolean;
  class?: string;
}

/**
 * Line track connecting sequential timeline items.
 */
export const TimelineConnector: Component<TimelineConnectorProps> = (props) => {
  const context = useContext(TimelineContext);
  const [local, rest] = splitProps(props, ["dashed", "class"]);

  const isVertical = () => !context || context.orientation() === "vertical";

  return (
    <div
      aria-hidden="true"
      class={cn(
        "transition-colors group-last:hidden",
        isVertical()
          ? "w-0.5 flex-1 min-h-6 my-1 bg-border"
          : "h-0.5 flex-1 min-w-4 mx-2 bg-border",
        local.dashed && (
          isVertical()
            ? "border-l-2 border-dashed border-border bg-transparent w-0"
            : "border-t-2 border-dashed border-border bg-transparent h-0"
        ),
        local.class
      )}
      {...rest}
    />
  );
};

/* --- Timeline Content (Event Details) --- */
export interface TimelineContentProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

/**
 * Primary container holding the description, title, and body for a timeline event.
 */
export const TimelineContent: Component<TimelineContentProps> = (props) => {
  const context = useContext(TimelineContext);
  const [local, rest] = splitProps(props, ["class"]);

  const isVertical = () => !context || context.orientation() === "vertical";
  const align = () => context?.align() ?? "left";

  return (
    <div
      class={cn(
        "flex flex-col",
        isVertical() ? "flex-1 pb-6 pt-0.5" : "pt-2 pr-2 text-left",
        isVertical() && align() === "left" && "text-left pl-3.5 pr-0",
        isVertical() && align() === "right" && "text-right pr-3.5 pl-0",
        isVertical() && align() === "alternate" && "text-left pl-3.5 group-even:text-right group-even:pr-3.5 group-even:pl-0",
        local.class
      )}
      {...rest}
    />
  );
};

/* --- Timeline Opposite Content --- */
export interface TimelineOppositeContentProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

/**
 * Content placed on the opposite side of the timeline separator (e.g. timestamps in alternate layouts).
 */
export const TimelineOppositeContent: Component<TimelineOppositeContentProps> = (props) => {
  const context = useContext(TimelineContext);
  const [local, rest] = splitProps(props, ["class"]);

  const isVertical = () => !context || context.orientation() === "vertical";
  const align = () => context?.align() ?? "left";

  return (
    <div
      class={cn(
        "flex flex-col text-xs text-muted-foreground",
        align() !== "alternate" && "hidden",
        isVertical()
          ? "flex-1 pb-6 pt-1 text-right pr-3.5 group-even:text-left group-even:pl-3.5 group-even:pr-0"
          : "pb-1 pr-2",
        local.class
      )}
      {...rest}
    />
  );
};

/* --- Timeline Title --- */
export interface TimelineTitleProps extends JSX.HTMLAttributes<HTMLHeadingElement> {
  class?: string;
}

export const TimelineTitle: Component<TimelineTitleProps> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <h4
      class={cn("text-sm font-semibold tracking-tight text-foreground", local.class)}
      {...rest}
    />
  );
};

/* --- Timeline Description --- */
export interface TimelineDescriptionProps extends JSX.HTMLAttributes<HTMLParagraphElement> {
  class?: string;
}

export const TimelineDescription: Component<TimelineDescriptionProps> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <p
      class={cn("mt-1 text-sm text-muted-foreground", local.class)}
      {...rest}
    />
  );
};

/* --- Timeline Time --- */
export interface TimelineTimeProps extends JSX.HTMLAttributes<HTMLTimeElement> {
  class?: string;
}

export const TimelineTime: Component<TimelineTimeProps> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <time
      class={cn("text-xs font-medium text-muted-foreground/80", local.class)}
      {...rest}
    />
  );
};
