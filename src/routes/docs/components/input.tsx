// src/routes/docs/components/input.tsx
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/* --- Code Snippets --- */
const importCode = `import { Input } from "@/components/ui/input";`;

const defaultCode = `<Input type="email" placeholder="Email" class="max-w-xs" />`;

const withLabelCode = `<div class="grid w-full max-w-sm items-center gap-1.5">
  <Label for="email">Email address</Label>
  <Input type="email" id="email" placeholder="nikala@pirosmani.ge" />
</div>`;

const typesCode = `<div class="flex flex-col gap-4 max-w-sm w-full">
  <div class="grid gap-1.5">
    <Label for="text-demo">Text Input</Label>
    <Input type="text" id="text-demo" placeholder="Niko Pirosmani" />
  </div>

  <div class="grid gap-1.5">
    <Label for="password-demo">Password Input</Label>
    <Input type="password" id="password-demo" value="secretpassword" />
  </div>

  <div class="grid gap-1.5">
    <Label for="file-demo">File Upload Input</Label>
    <Input type="file" id="file-demo" />
  </div>
</div>`;

const disabledCode = `<Input disabled type="email" placeholder="Email" value="disabled@pirosmani.ge" class="max-w-xs" />`;

export default function InputDocsPage() {
  return (
    <>
      <Seo
        title="Input Component"
        description="Reactive text input field with modern focus states built for SolidJS and Tailwind CSS v4."
        path="/docs/components/input"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="Input"
          badge="HTML"
          description="Displays a form input field or a component that looks like an input field with modern focus states."
        />

        {/* Hero Live Preview */}
        <ComponentPreview name="input" code={defaultCode}>
          <Input type="email" placeholder="Email" class="max-w-xs" />
        </ComponentPreview>

        {/* Usage & Import */}
        <div class="space-y-4">
          <DocSectionHeader title="Usage" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        {/* Examples */}
        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          {/* With Label */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">With Label</h3>
            <p class="text-sm text-muted-foreground">
              Combine <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">Input</code> with <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">Label</code> for accessible form fields.
            </p>
            <ComponentPreview name="input" code={withLabelCode}>
              <div class="grid w-full max-w-sm items-center gap-1.5">
                <Label for="email">Email address</Label>
                <Input type="email" id="email" placeholder="nikala@pirosmani.ge" />
              </div>
            </ComponentPreview>
          </div>

          {/* Input Types */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Input Types</h3>
            <p class="text-sm text-muted-foreground">
              Supports standard HTML input types including <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">text</code>, <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">password</code>, and <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">file</code>.
            </p>
            <ComponentPreview name="input" code={typesCode}>
              <div class="flex flex-col gap-4 max-w-sm w-full">
                <div class="grid gap-1.5">
                  <Label for="text-demo">Text Input</Label>
                  <Input type="text" id="text-demo" placeholder="Niko Pirosmani" />
                </div>

                <div class="grid gap-1.5">
                  <Label for="password-demo">Password Input</Label>
                  <Input type="password" id="password-demo" value="secretpassword" />
                </div>

                <div class="grid gap-1.5">
                  <Label for="file-demo">File Upload Input</Label>
                  <Input type="file" id="file-demo" />
                </div>
              </div>
            </ComponentPreview>
          </div>

          {/* Disabled State */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Disabled State</h3>
            <p class="text-sm text-muted-foreground">
              Pass <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">disabled={`{true}`}</code> to prevent user editing.
            </p>
            <ComponentPreview name="input" code={disabledCode}>
              <Input disabled type="email" placeholder="Email" value="disabled@pirosmani.ge" class="max-w-xs" />
            </ComponentPreview>
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="Input"
            items={[
              {
                prop: "type",
                type: "string",
                default: '"text"',
                description: "Standard HTML input type (text, email, password, number, file, etc.).",
              },
              {
                prop: "placeholder",
                type: "string",
                description: "Placeholder text displayed when the input field is empty.",
              },
              {
                prop: "disabled",
                type: "boolean",
                default: "false",
                description: "Disables interaction and reduces opacity.",
              },
            ]}
          />
        </div>

        {/* Footer Navigation */}
        <DocNextSteps
          prev={{ title: "Dropdown Menu", href: "/docs/components/dropdown-menu" }}
          next={{ title: "Label Component", href: "/docs/components/label" }}
        />
      </div>
    </>
  );
}