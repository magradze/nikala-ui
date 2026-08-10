import { splitProps, type Component, type JSX } from "solid-js";
import { cn } from "@/lib/cn";

export interface EmptyProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

/** A centered layout for empty collections, search results, and initial states. */
export const Empty: Component<EmptyProps> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      class={cn(
        "flex min-h-64 w-full flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card/30 p-6 text-center",
        local.class
      )}
      {...rest}
    />
  );
};

export interface EmptyIconProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

export const EmptyIcon: Component<EmptyIconProps> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      aria-hidden="true"
      class={cn(
        "mb-4 flex size-12 items-center justify-center rounded-lg bg-muted text-muted-foreground [&_svg]:size-6",
        local.class
      )}
      {...rest}
    />
  );
};

export interface EmptyTitleProps extends JSX.HTMLAttributes<HTMLHeadingElement> {
  class?: string;
}

export const EmptyTitle: Component<EmptyTitleProps> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <h3
      class={cn("text-lg font-semibold tracking-tight text-foreground", local.class)}
      {...rest}
    />
  );
};

export interface EmptyDescriptionProps
  extends JSX.HTMLAttributes<HTMLParagraphElement> {
  class?: string;
}

export const EmptyDescription: Component<EmptyDescriptionProps> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <p
      class={cn("mt-1 max-w-sm text-sm text-muted-foreground", local.class)}
      {...rest}
    />
  );
};

export interface EmptyActionProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

export const EmptyAction: Component<EmptyActionProps> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div class={cn("mt-5 flex items-center gap-2", local.class)} {...rest} />
  );
};
