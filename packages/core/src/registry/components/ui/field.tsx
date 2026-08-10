import { splitProps, type Component, type JSX } from "solid-js";
import { cn } from "@/lib/cn";
import { Label, type LabelProps } from "./label";

export interface FieldProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

/** A consistent layout wrapper for labels, controls, descriptions, and errors. */
export const Field: Component<FieldProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <div class={cn("grid w-full gap-1.5", local.class)} {...rest}>
      {local.children}
    </div>
  );
};

export interface FieldLabelProps extends LabelProps {
  class?: string;
  children?: JSX.Element;
}

export const FieldLabel: Component<FieldLabelProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <Label class={cn("text-sm font-medium", local.class)} {...rest}>
      {local.children}
    </Label>
  );
};

export interface FieldDescriptionProps
  extends JSX.HTMLAttributes<HTMLParagraphElement> {
  class?: string;
}

export const FieldDescription: Component<FieldDescriptionProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <p class={cn("text-sm text-muted-foreground", local.class)} {...rest}>
      {local.children}
    </p>
  );
};

export interface FieldErrorProps
  extends JSX.HTMLAttributes<HTMLParagraphElement> {
  class?: string;
}

export const FieldError: Component<FieldErrorProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <p
      role="alert"
      class={cn("text-sm font-medium text-destructive", local.class)}
      {...rest}
    >
      {local.children}
    </p>
  );
};
