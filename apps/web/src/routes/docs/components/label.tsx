// src/routes/docs/components/label.tsx
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

/* --- Code Snippets --- */
const importCode = `import { Label } from "@/components/ui/label";`;

const defaultCode = `<div class="flex items-center space-x-2">
  <Checkbox id="terms-demo" />
  <Label for="terms-demo" class="cursor-pointer">
    Accept terms and conditions
  </Label>
</div>`;

const inputCode = `<div class="grid w-full max-w-sm items-center gap-1.5">
  <Label for="email-input">Email Address</Label>
  <Input type="email" id="email-input" placeholder="nikala@pirosmani.ge" />
</div>`;

const peerDisabledCode = `<div class="flex flex-col gap-4 max-w-sm w-full">
  <div class="flex items-center space-x-2">
    <Checkbox id="check-disabled" disabled />
    <Label for="check-disabled">Disabled Checkbox Label</Label>
  </div>

  <div class="grid gap-1.5">
    <Label for="input-disabled">Disabled Input Label</Label>
    <Input id="input-disabled" disabled placeholder="Disabled input field" />
  </div>
</div>`;

export default function LabelDocsPage() {
  return (
    <>
      <Seo
        title="Label Component"
        description="Accessible caption label for form controls and inputs built for SolidJS and Tailwind CSS v4."
        path="/docs/components/label"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="Label"
          badge="cva"
          description="Renders an accessible caption label associated with form controls, text inputs, and checkboxes."
        />

        {/* Hero Live Preview */}
        <ComponentPreview name="label" code={defaultCode}>
          <div class="flex items-center space-x-2">
            <Checkbox id="terms-demo" />
            <Label for="terms-demo" class="cursor-pointer">
              Accept terms and conditions
            </Label>
          </div>
        </ComponentPreview>

        {/* Usage & Import */}
        <div class="space-y-4">
          <DocSectionHeader title="Usage" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        {/* Examples */}
        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          {/* With Input */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">With Input Field</h3>
            <p class="text-sm text-muted-foreground">
              Connect <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">Label</code> to an input via <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">for</code> and matching <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">id</code>.
            </p>
            <ComponentPreview name="label" code={inputCode}>
              <div class="grid w-full max-w-sm items-center gap-1.5">
                <Label for="email-input">Email Address</Label>
                <Input type="email" id="email-input" placeholder="nikala@pirosmani.ge" />
              </div>
            </ComponentPreview>
          </div>

          {/* Peer Disabled Styling */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Disabled Peer States</h3>
            <p class="text-sm text-muted-foreground">
              Automatically reduces label opacity when associated with a disabled form control via <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">peer-disabled</code> styles.
            </p>
            <ComponentPreview name="label" code={peerDisabledCode}>
              <div class="flex flex-col gap-4 max-w-sm w-full">
                <div class="flex items-center space-x-2">
                  <Checkbox id="check-disabled" disabled />
                  <Label for="check-disabled">Disabled Checkbox Label</Label>
                </div>

                <div class="grid gap-1.5">
                  <Label for="input-disabled">Disabled Input Label</Label>
                  <Input id="input-disabled" disabled placeholder="Disabled input field" />
                </div>
              </div>
            </ComponentPreview>
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="Label"
            items={[
              {
                prop: "for",
                type: "string",
                description: "Associates the label with a form control id for screen readers and focus targeting.",
              },
              {
                prop: "children",
                type: "JSX.Element",
                description: "Text content or elements displayed inside the label.",
              },
            ]}
          />
        </div>

        {/* Footer Navigation */}
        <DocNextSteps
          prev={{ title: "Kbd Component", href: "/docs/components/kbd" }}
          next={{ title: "List Component", href: "/docs/components/list" }}
        />
      </div>
    </>
  );
}