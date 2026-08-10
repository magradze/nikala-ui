import { Show } from "solid-js";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "field",
  name: "Field",
  props: [
    { name: "label", label: "Label Text", type: "text", default: "Email address" },
    { name: "placeholder", label: "Placeholder", type: "text", default: "nikala@pirosmani.ge" },
    { name: "description", label: "Description", type: "text", default: "We will only use this for account notifications." },
    { name: "showError", label: "Show Validation Error", type: "boolean", default: false },
    { name: "error", label: "Error Text", type: "text", default: "Please enter a valid email address." },
  ],
  generateCode: (v) => `<Field class="max-w-sm">
  <FieldLabel for="email">${v.label || "Email address"}</FieldLabel>
  <Input id="email" placeholder="${v.placeholder || "Enter a value"}"${v.showError ? ' aria-invalid="true"' : ""} />
  <FieldDescription>${v.description || "Helper text"}</FieldDescription>${v.showError ? `
  <FieldError>${v.error || "Invalid value."}</FieldError>` : ""}
</Field>`,
};

export default function FieldStage(props: StageProps) {
  return (
    <Field class="w-full max-w-sm">
      <FieldLabel for="pg-field-input">{props.values.label || "Email address"}</FieldLabel>
      <Input
        id="pg-field-input"
        placeholder={props.values.placeholder}
        aria-invalid={props.values.showError ? "true" : undefined}
      />
      <FieldDescription>{props.values.description}</FieldDescription>
      <Show when={props.values.showError}>
        <FieldError>{props.values.error}</FieldError>
      </Show>
    </Field>
  );
}
