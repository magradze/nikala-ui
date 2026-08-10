import { splitProps, type Component, type JSX } from "solid-js";
import { cn } from "@/lib/cn";

export interface FormProps extends JSX.FormHTMLAttributes<HTMLFormElement> {
  /** Indicates that the form is currently processing a submission. */
  loading?: boolean;
  class?: string;
}

/** A semantic form layout wrapper designed to work with the createForm hook. */
export const Form: Component<FormProps> = (props) => {
  const [local, rest] = splitProps(props, ["loading", "class"]);

  return (
    <form
      aria-busy={local.loading ? "true" : undefined}
      class={cn("w-full space-y-5", local.class)}
      {...rest}
    />
  );
};
