// src/routes/docs/hooks/create-form.tsx
import { createSignal } from "solid-js";
import { createForm } from "@nikala-ui/hooks";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const importCode = `import { createForm } from "@/hooks/create-form";
import { FormMessage } from "@/components/ui/form-message";`;

const basicUsageCode = `const form = createForm({
  initialValues: { username: "", email: "" },
  validate: (values) => {
    const errors: Record<string, string> = {};
    if (!values.username) errors.username = "Username is required";
    if (!values.email.includes("@")) errors.email = "Valid email is required";
    return errors;
  },
  onSubmit: (values) => {
    alert(\`Submitted: \${JSON.stringify(values)}\`);
  },
});

return (
  <form onSubmit={form.handleSubmit} class="space-y-3">
    <Input
      value={form.values().username}
      onInput={form.handleChange("username")}
      onBlur={form.handleBlur("username")}
      placeholder="Username"
    />
    <FormMessage form={form} name="username" />

    <Button type="submit" disabled={form.isSubmitting()}>Submit</Button>
  </form>
);`;

const validationModesCode = `const form = createForm({
  initialValues: { email: "", marketing: false, topics: [] as string[] },
  validateOn: "blur", // "change" | "blur" | "submit"
  validate: (values) => ({
    ...(!values.email.includes("@") && { email: "Enter a valid email." }),
  }),
});

<Input
  value={form.values().email}
  onInput={form.handleChange("email")}
  onBlur={form.handleBlur("email")}
/>`;

const controlsCode = `<input
  type="checkbox"
  checked={form.values().marketing}
  onInput={form.handleChange("marketing")}
/>`;

const submitErrorCode = `const form = createForm({
  initialValues: { email: "" },
  onSubmit: async (values) => {
    await saveProfile(values); // thrown errors become submitError()
  },
});

<Show when={form.submitError()}>
  <Alert variant="destructive">
    We could not save your changes. Try again.
  </Alert>
</Show>`;

export function FormDemo() {
  const [submittedData, setSubmittedData] = createSignal<string | null>(null);

  const form = createForm({
    initialValues: { username: "", email: "" },
    validate: (values) => {
      const errors: Record<string, string> = {};
      if (!values.username.trim()) errors.username = "Username is required";
      else if (values.username.length < 3) errors.username = "At least 3 characters required";

      if (!values.email.trim()) errors.email = "Email address is required";
      else if (!values.email.includes("@")) errors.email = "Invalid email address format";

      return errors;
    },
    onSubmit: async (values) => {
      setSubmittedData(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div class="space-y-4 max-w-sm w-full min-h-[180px] flex flex-col items-center justify-center text-center">
      <form onSubmit={form.handleSubmit} class="w-full p-4 rounded-lg border border-border bg-card shadow-xs space-y-3 text-left">
        <div class="space-y-1">
          <label class="text-xs font-medium text-foreground">Username:</label>
          <Input
            value={form.values().username}
            onInput={form.handleChange("username")}
            onBlur={form.handleBlur("username")}
            placeholder="e.g. niko_pirosmani"
            class="h-8 text-xs"
          />
          {form.touched().username && form.errors().username && (
            <p class="text-[10px] text-destructive font-mono pt-0.5">{form.errors().username}</p>
          )}
        </div>

        <div class="space-y-1">
          <label class="text-xs font-medium text-foreground">Email Address:</label>
          <Input
            value={form.values().email}
            onInput={form.handleChange("email")}
            onBlur={form.handleBlur("email")}
            placeholder="e.g. niko@nikala.dev"
            class="h-8 text-xs"
          />
          {form.touched().email && form.errors().email && (
            <p class="text-[10px] text-destructive font-mono pt-0.5">{form.errors().email}</p>
          )}
        </div>

        <div class="flex items-center gap-2 pt-2">
          <Button size="sm" type="submit" disabled={form.isSubmitting()} class="h-7 text-xs flex-1">
            Submit Form
          </Button>
          <Button size="sm" type="button" variant="outline" onClick={form.resetForm} class="h-7 text-xs">
            Reset
          </Button>
        </div>
      </form>

      {submittedData() && (
        <div class="w-full p-3 rounded-lg border border-emerald-500/50 bg-emerald-500/10 text-left text-xs font-mono">
          <div class="text-emerald-500 font-bold mb-1">Form Submitted Payload:</div>
          <pre class="text-[11px] text-foreground overflow-x-auto">{submittedData()}</pre>
        </div>
      )}
    </div>
  );
}

export default function CreateFormDocPage() {
  return (
    <div class="space-y-10 pb-16">
      <Seo
        title="createForm Primitive"
        description="SolidJS reactive primitive for form state management, field validation, errors, and submission."
        path="/docs/hooks/create-form"
      />

      {/* Page Header */}
      <DocPageHeader
        title="createForm"
        badge="primitive"
        description="A reactive primitive for managing form inputs, validation rules, field touch states, error messages, and async submission handling."
      />

      {/* Live Interactive Hero Preview */}
      <ComponentPreview isHook name="create-form" code={basicUsageCode}>
        <FormDemo />
      </ComponentPreview>

      {/* Import */}
      <div class="space-y-4">
        <DocSectionHeader title="Import" />
        <CodeBlock code={importCode} lang="tsx" />
      </div>

      {/* Examples Section */}
        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

        {/* Basic Usage */}
        <div class="space-y-3">
          <h3 class="text-lg font-semibold tracking-tight">Form State & Validation</h3>
          <p class="text-sm text-muted-foreground">
            Pass initial values and validation rules to <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">createForm(&#123; initialValues, validate, onSubmit &#125;)</code>.
          </p>
          <CodeBlock code={basicUsageCode} lang="tsx" />
        </div>

        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Validation & Controls" />

          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Validation Timing</h3>
            <p class="text-sm text-muted-foreground">
              Use <code class="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">validateOn</code> to validate on every change, only after blur, or only on submit. The default is <code class="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">change</code> for backwards compatibility.
            </p>
            <CodeBlock code={validationModesCode} lang="tsx" />
          </div>

          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Checkboxes and Selects</h3>
            <p class="text-sm text-muted-foreground">
              <code class="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">handleChange</code> reads boolean values from checkbox/radio inputs and an array of values from multi-select controls.
            </p>
            <CodeBlock code={controlsCode} lang="tsx" />
          </div>

          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Submission Errors</h3>
            <p class="text-sm text-muted-foreground">
              Exceptions thrown by an async <code class="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">onSubmit</code> handler are exposed through <code class="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">submitError()</code>.
            </p>
            <CodeBlock code={submitErrorCode} lang="tsx" />
          </div>
        </div>
      </div>

      {/* API Reference */}
      <div class="space-y-6 pt-6">
        <DocSectionHeader title="API Reference" />

        <DocApiTable
          title="CreateFormReturn & Options"
          items={[
            {
              prop: "values",
              type: "Accessor<T>",
              default: "-",
              description: "Signal accessor returning current form values object.",
              required: true,
            },
            {
              prop: "errors",
              type: "Accessor<FormErrors<T>>",
              default: "{}",
              description: "Signal accessor returning active validation error messages.",
              required: true,
            },
            {
              prop: "touched",
              type: "Accessor<FormTouched<T>>",
              default: "{}",
              description: "Signal accessor indicating which fields have been blurred or interacted with.",
            },
            {
              prop: "isDirty",
              type: "Accessor<boolean>",
              default: "false",
              description: "Signal accessor indicating whether current form values differ from initial values.",
            },
            {
              prop: "isValid",
              type: "Accessor<boolean>",
              default: "true",
              description: "Signal accessor indicating whether zero validation errors are present.",
            },
            {
              prop: "validateOn",
              type: '"change" | "blur" | "submit"',
              default: '"change"',
              description: "Controls which interaction triggers validation.",
            },
            {
              prop: "submitError",
              type: "Accessor<unknown>",
              default: "undefined",
              description: "Contains an exception thrown by onSubmit so the UI can display a submission error.",
            },
            {
              prop: "handleSubmit",
              type: "(e?: Event) => void",
              default: "-",
              description: "Form submit handler function to validate fields and call onSubmit.",
            },
            {
              prop: "resetForm",
              type: "() => void",
              default: "-",
              description: "Function to reset form values, errors, and touched states.",
            },
          ]}
        />
      </div>

      {/* Footer Navigation */}
      <DocNextSteps
        prev={{ title: "createColorMode Primitive", href: "/docs/hooks/create-color-mode" }}
        next={{ title: "createInputMask Primitive", href: "/docs/hooks/create-input-mask" }}
      />
    </div>
  );
}
