import { Show, splitProps, type JSX } from "solid-js";
import type { CreateFormReturn } from "@nikala-ui/hooks";
import { FieldError, type FieldErrorProps } from "./field";

type FormState<T extends Record<string, any>> = Pick<
  CreateFormReturn<T>,
  "errors" | "touched"
>;

export interface FormMessageProps<
  T extends Record<string, any>,
  K extends keyof T,
> extends Omit<FieldErrorProps, "children"> {
  form: FormState<T>;
  name: K;
  /** Show the message even before the field has been touched. */
  showUntouched?: boolean;
}

/** Displays a field's validation error from createForm when it should be visible. */
export function FormMessage<
  T extends Record<string, any>,
  K extends keyof T,
>(props: FormMessageProps<T, K>): JSX.Element {
  const [local, rest] = splitProps(props, ["form", "name", "showUntouched", "class"]);
  const error = () => local.form.errors()[local.name] as string | undefined;
  const touched = () => local.form.touched()[local.name] === true;

  return (
    <Show when={error() && (local.showUntouched || touched())}>
      <FieldError class={local.class} {...rest}>
        {error()}
      </FieldError>
    </Show>
  );
}
