import { createSignal } from "solid-js";
import { createForm } from "@nikala-ui/hooks";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Field, FieldLabel } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import { FormMessage } from "@/components/ui/form-message";
import { Input } from "@/components/ui/input";

const importCode = `import { FormMessage } from "@/components/ui/form-message";`;

const usageCode = `const form = createForm({
  initialValues: { email: "" },
  validate: (values) => ({
    ...(!values.email.includes("@") && { email: "Enter a valid email." }),
  }),
});

<Field>
  <FieldLabel for="email">Email address</FieldLabel>
  <Input
    id="email"
    value={form.values().email}
    onInput={form.handleChange("email")}
    onBlur={form.handleBlur("email")}
  />
  <FormMessage form={form} name="email" />
</Field>`;

function FormMessageDemo() {
  const form = createForm({
    initialValues: { email: "invalid-email" },
    validateOn: "blur",
    validate: (values) =>
      values.email.includes("@") ? {} : { email: "Enter a valid email address." },
  });
  form.setFieldError("email", "Enter a valid email address.");
  const [showUntouched, setShowUntouched] = createSignal(true);

  return (
    <Form class="w-full max-w-sm rounded-lg border border-border bg-card p-5">
      <Field>
        <FieldLabel for="message-email">Email address</FieldLabel>
        <Input
          id="message-email"
          value={form.values().email}
          onInput={form.handleChange("email")}
          onBlur={form.handleBlur("email")}
          placeholder="you@example.com"
        />
        <FormMessage
          form={form}
          name="email"
          showUntouched={showUntouched()}
        />
      </Field>
      <label class="flex items-center gap-2 text-xs text-muted-foreground">
        <Checkbox
          checked={showUntouched()}
          onChange={setShowUntouched}
        />
        Show before blur
      </label>
    </Form>
  );
}

export default function FormMessageDocsPage() {
  return (
    <>
      <Seo
        title="Form Message Component"
        description="Validation message helper connected to createForm errors and touched state."
        path="/docs/components/form-message"
      />
      <div class="space-y-10 pb-16">
        <DocPageHeader
          title="Form Message"
          badge="Form helper"
          description="Reads a field's errors and touched state from createForm and renders FieldError only when appropriate."
        />

        <p class="text-sm text-muted-foreground">
          The preview below shows the validation message rendered beneath the email input. Toggle <code class="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">Show before blur</code> to switch between always-visible and touched-only behavior.
        </p>

        <ComponentPreview name="form-message" code={usageCode}>
          <FormMessageDemo />
        </ComponentPreview>

        <div class="space-y-4">
          <DocSectionHeader title="Usage" />
          <CodeBlock code={importCode} lang="tsx" />
          <CodeBlock code={usageCode} lang="tsx" />
        </div>

        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />
          <DocApiTable
            title="FormMessage"
            items={[
              { prop: "form", type: "CreateFormReturn<T>", description: "createForm return object used to read errors and touched state.", required: true },
              { prop: "name", type: "keyof T", description: "Field name whose validation message should be displayed.", required: true },
              { prop: "showUntouched", type: "boolean", default: "false", description: "Show the message before the field has been touched." },
            ]}
          />
        </div>

        <DocNextSteps
          prev={{ title: "Form Component", href: "/docs/components/form" }}
          next={{ title: "Icon Button Component", href: "/docs/components/icon-button" }}
        />
      </div>
    </>
  );
}
