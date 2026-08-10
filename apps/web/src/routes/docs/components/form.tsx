import { createSignal, Show } from "solid-js";
import { createForm } from "@nikala-ui/hooks";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const importCode = `import { Form } from "@/components/ui/form";
import { createForm } from "@/hooks/create-form";`;

const usageCode = `const form = createForm({
  initialValues: { email: "" },
  validate: (values) => ({
    ...(!values.email.includes("@") && { email: "Enter a valid email." }),
  }),
  onSubmit: async (values) => {
    await saveProfile(values);
  },
});

<Form onSubmit={form.handleSubmit} loading={form.isSubmitting()}>
  <Field>
    <FieldLabel for="email">Email address</FieldLabel>
    <Input
      id="email"
      value={form.values().email}
      onInput={form.handleChange("email")}
      onBlur={form.handleBlur("email")}
    />
    <FieldError>{form.errors().email}</FieldError>
  </Field>
  <Button type="submit" disabled={form.isSubmitting()}>Save</Button>
</Form>`;

const loginCode = `<Form onSubmit={form.handleSubmit} loading={form.isSubmitting()}>
  <Field>
    <FieldLabel for="login-email">Email address</FieldLabel>
    <Input id="login-email" type="email" placeholder="you@example.com" />
  </Field>
  <Field>
    <FieldLabel for="login-password">Password</FieldLabel>
    <Input id="login-password" type="password" placeholder="Your password" />
  </Field>
  <Button type="submit" class="w-full">Sign in</Button>
</Form>`;

const contactCode = `<Form onSubmit={form.handleSubmit} loading={form.isSubmitting()}>
  <Field>
    <FieldLabel for="contact-name">Name</FieldLabel>
    <Input id="contact-name" placeholder="Niko Pirosmani" />
  </Field>
  <Field>
    <FieldLabel for="contact-message">Message</FieldLabel>
    <Textarea id="contact-message" placeholder="How can we help?" />
  </Field>
  <Button type="submit">Send message</Button>
</Form>`;

function FormDemo() {
  const [submitted, setSubmitted] = createSignal(false);

  const form = createForm({
    initialValues: { email: "" },
    validate: (values) => {
      if (!values.email.trim()) return { email: "Email address is required." };
      if (!values.email.includes("@")) return { email: "Enter a valid email address." };
      return {};
    },
    onSubmit: async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setSubmitted(true);
    },
  });

  return (
    <div class="w-full max-w-sm">
      <Form onSubmit={form.handleSubmit} loading={form.isSubmitting()} class="rounded-lg border border-border bg-card p-5">
        <Field>
          <FieldLabel for="form-email">Email address</FieldLabel>
          <Input
            id="form-email"
            type="email"
            value={form.values().email}
            onInput={form.handleChange("email")}
            onBlur={form.handleBlur("email")}
            aria-invalid={form.touched().email && Boolean(form.errors().email) ? "true" : undefined}
            placeholder="nikala@pirosmani.ge"
          />
          <FieldDescription>We will only use this for account notifications.</FieldDescription>
          <Show when={form.touched().email && form.errors().email}>
            <FieldError>{form.errors().email}</FieldError>
          </Show>
        </Field>
        <div class="flex items-center gap-2">
          <Button type="submit" disabled={form.isSubmitting()}>
            {form.isSubmitting() ? "Saving..." : "Save email"}
          </Button>
          <Button type="button" variant="outline" onClick={() => { form.resetForm(); setSubmitted(false); }}>
            Reset
          </Button>
        </div>
        <Show when={submitted()}>
          <p class="text-sm text-emerald-600 dark:text-emerald-400">Form submitted successfully.</p>
        </Show>
      </Form>
    </div>
  );
}

export default function FormDocsPage() {
  return (
    <>
      <Seo
        title="Form Component"
        description="A semantic form layout wrapper designed to work with the createForm SolidJS reactive primitive."
        path="/docs/components/form"
      />

      <div class="space-y-10 pb-16">
        <DocPageHeader
          title="Form"
          badge="Hook-ready"
          description="A minimal semantic form wrapper that pairs with createForm and the existing Field, Input, and Button components."
        />

        <ComponentPreview name="form" code={usageCode}>
          <FormDemo />
        </ComponentPreview>

        <div class="space-y-4">
          <DocSectionHeader title="Usage" />
          <CodeBlock code={importCode} lang="tsx" />
          <CodeBlock code={usageCode} lang="tsx" />
        </div>

        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Composition" />
          <p class="text-sm text-muted-foreground">
            Form intentionally owns only semantic layout and submission state. Use <code class="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">createForm</code> for values, validation, touched state, and submission, then compose it with <code class="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">Field</code>, <code class="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">Input</code>, and <code class="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">Button</code>.
          </p>
        </div>

        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Login Form</h3>
            <p class="text-sm text-muted-foreground">
              Compose multiple <code class="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">Field</code> components for a standard authentication form.
            </p>
            <ComponentPreview name="form" code={loginCode}>
              <Form class="w-full max-w-sm rounded-lg border border-border bg-card p-5">
                <Field>
                  <FieldLabel for="login-email-preview">Email address</FieldLabel>
                  <Input id="login-email-preview" type="email" placeholder="you@example.com" />
                </Field>
                <Field>
                  <FieldLabel for="login-password-preview">Password</FieldLabel>
                  <Input id="login-password-preview" type="password" placeholder="Your password" />
                </Field>
                <Button type="submit" class="w-full">Sign in</Button>
              </Form>
            </ComponentPreview>
          </div>

          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Contact Form</h3>
            <p class="text-sm text-muted-foreground">
              Use the same layout with larger controls such as <code class="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">Textarea</code> for longer messages.
            </p>
            <ComponentPreview name="form" code={contactCode}>
              <Form class="w-full max-w-sm rounded-lg border border-border bg-card p-5">
                <Field>
                  <FieldLabel for="contact-name-preview">Name</FieldLabel>
                  <Input id="contact-name-preview" placeholder="Niko Pirosmani" />
                </Field>
                <Field>
                  <FieldLabel for="contact-message-preview">Message</FieldLabel>
                  <Textarea id="contact-message-preview" placeholder="How can we help?" />
                </Field>
                <Button type="submit">Send message</Button>
              </Form>
            </ComponentPreview>
          </div>
        </div>

        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />
          <DocApiTable
            title="Form"
            items={[
              {
                prop: "loading",
                type: "boolean",
                default: "false",
                description: "Marks the form as busy with aria-busy while an async submission is running.",
              },
              {
                prop: "onSubmit",
                type: "FormEventHandler<HTMLFormElement>",
                description: "Native submit handler, typically set to createForm(...).handleSubmit.",
              },
              {
                prop: "class",
                type: "string",
                description: "Additional classes for layout and visual styling.",
              },
            ]}
          />
        </div>

        <DocNextSteps
          prev={{ title: "Field Component", href: "/docs/components/field" }}
          next={{ title: "Icon Button Component", href: "/docs/components/icon-button" }}
        />
      </div>
    </>
  );
}
