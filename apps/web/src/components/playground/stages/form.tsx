import { Show } from "solid-js";
import { createForm } from "@nikala-ui/hooks";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { FormMessage } from "@/components/ui/form-message";
import { Input } from "@/components/ui/input";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "form",
  name: "Form",
  props: [
    { name: "placeholder", label: "Input Placeholder", type: "text", default: "you@example.com" },
    { name: "buttonText", label: "Button Text", type: "text", default: "Save email" },
    { name: "showError", label: "Show Validation Error", type: "boolean", default: false },
  ],
  generateCode: (v) => `<Form onSubmit={form.handleSubmit} loading={form.isSubmitting()}>
  <Field>
    <FieldLabel for="email">Email address</FieldLabel>
    <Input
      id="email"
      value={form.values().email}
      onInput={form.handleChange("email")}
      onBlur={form.handleBlur("email")}
      placeholder="${v.placeholder || "you@example.com"}"
    />${v.showError ? `
    <FieldError>{form.errors().email}</FieldError>` : ""}
  </Field>
  <Button type="submit">${v.buttonText || "Submit"}</Button>
</Form>`,
};

export default function FormStage(props: StageProps) {
  const form = createForm({
    initialValues: { email: "" },
    validate: (values) =>
      props.values.showError && !values.email.includes("@")
        ? { email: "Enter a valid email address." }
        : {},
    onSubmit: async () => undefined,
  });

  return (
    <Form onSubmit={form.handleSubmit} loading={form.isSubmitting()} class="w-full max-w-sm rounded-lg border border-border bg-card p-5">
      <Field>
        <FieldLabel for="playground-form-email">Email address</FieldLabel>
        <Input
          id="playground-form-email"
          type="email"
          value={form.values().email}
          onInput={form.handleChange("email")}
          onBlur={form.handleBlur("email")}
          aria-invalid={form.touched().email && Boolean(form.errors().email) ? "true" : undefined}
          placeholder={props.values.placeholder}
        />
        <Show when={props.values.showError}>
          <FormMessage form={form} name="email" />
        </Show>
      </Field>
      <Button type="submit">{props.values.buttonText || "Save email"}</Button>
    </Form>
  );
}
