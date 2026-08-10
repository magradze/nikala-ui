import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

const importCode = `import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";`;

const defaultCode = `<Field class="max-w-sm">
  <FieldLabel for="email">Email address</FieldLabel>
  <Input id="email" type="email" placeholder="nikala@pirosmani.ge" />
  <FieldDescription>We will only use this for account notifications.</FieldDescription>
</Field>`;

const errorCode = `<Field class="max-w-sm">
  <FieldLabel for="username">Username</FieldLabel>
  <Input id="username" aria-invalid="true" value="niko pirosmani" />
  <FieldError>Username can only contain letters, numbers, and underscores.</FieldError>
</Field>`;

export default function FieldDocsPage() {
  return (
    <>
      <Seo
        title="Field Component"
        description="A consistent form field layout for labels, controls, descriptions, and validation errors."
        path="/docs/components/field"
      />

      <div class="space-y-10 pb-16">
        <DocPageHeader
          title="Field"
          badge="Form"
          description="Provides a consistent, accessible layout for form labels, controls, helper text, and validation messages."
        />

        <ComponentPreview name="field" code={defaultCode}>
          <Field class="w-full max-w-sm">
            <FieldLabel for="field-email">Email address</FieldLabel>
            <Input id="field-email" type="email" placeholder="nikala@pirosmani.ge" />
            <FieldDescription>
              We will only use this for account notifications.
            </FieldDescription>
          </Field>
        </ComponentPreview>

        <div class="space-y-4">
          <DocSectionHeader title="Usage" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Validation Error" />
          <p class="text-sm text-muted-foreground">
            Pair <code class="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">FieldError</code> with the control&apos;s <code class="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">aria-invalid</code> state.
          </p>
          <ComponentPreview name="field" code={errorCode}>
            <Field class="w-full max-w-sm">
              <FieldLabel for="field-username">Username</FieldLabel>
              <Input id="field-username" aria-invalid="true" value="niko pirosmani" />
              <FieldError>
                Username can only contain letters, numbers, and underscores.
              </FieldError>
            </Field>
          </ComponentPreview>
        </div>

        <DocNextSteps
          prev={{ title: "Input Component", href: "/docs/components/input" }}
          next={{ title: "Input Group", href: "/docs/components/input-group" }}
        />
      </div>
    </>
  );
}
