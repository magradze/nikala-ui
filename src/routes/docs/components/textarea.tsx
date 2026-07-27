// src/routes/docs/components/textarea.tsx
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

/* --- Code Snippets --- */
const importCode = `import { Textarea } from "@/components/ui/textarea";`;

const defaultCode = `<Textarea placeholder="Type your message here..." class="max-w-sm" />`;

const labelCode = `<div class="grid w-full max-w-sm gap-1.5">
  <Label for="message-input">Your Message</Label>
  <Textarea id="message-input" placeholder="Type your feedback..." />
  <p class="text-xs text-muted-foreground">
    Your message will be sent to the Nikala UI maintainers.
  </p>
</div>`;

const maxLengthCode = `<div class="grid w-full max-w-sm gap-1.5">
  <Label for="bio-input">Short Bio</Label>
  <Textarea
    id="bio-input"
    placeholder="Tell us a little bit about yourself..."
    maxLength={120}
  />
</div>`;

const showCountCode = `<div class="grid w-full max-w-sm gap-1.5">
  <Label for="unlimited-input">Feedback Note</Label>
  <Textarea
    id="unlimited-input"
    placeholder="Type a description..."
    showCount={true}
  />
</div>`;

const disabledCode = `<Textarea disabled placeholder="Type your message here..." class="max-w-sm" />`;

export default function TextareaDocsPage() {
  return (
    <>
      <Seo
        title="Textarea Component"
        description="Multi-line text area field with character limit counters and modern focus styling for SolidJS."
        path="/docs/components/textarea"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="Textarea"
          badge="HTML"
          description="Displays a multi-line text input field with optional character counters, length limits, and focus styling."
        />

        {/* Hero Live Preview */}
        <ComponentPreview name="textarea" code={defaultCode}>
          <div class="w-full max-w-sm">
            <Textarea placeholder="Type your message here..." class="max-w-sm" />
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

          {/* With Label */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">With Label & Description</h3>
            <p class="text-sm text-muted-foreground">
              Combine <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">Textarea</code> with <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">Label</code> for accessible form fields.
            </p>
            <ComponentPreview name="textarea" code={labelCode}>
              <div class="grid w-full max-w-sm gap-1.5">
                <Label for="message-input">Your Message</Label>
                <Textarea id="message-input" placeholder="Type your feedback..." />
                <p class="text-xs text-muted-foreground">
                  Your message will be sent to the Nikala UI maintainers.
                </p>
              </div>
            </ComponentPreview>
          </div>

          {/* Character Limit */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Character Limit Counter</h3>
            <p class="text-sm text-muted-foreground">
              Pass <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">maxLength={`{120}`}</code> to enforce a maximum character length and render a live counter badge (<code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">0 / 120</code>).
            </p>
            <ComponentPreview name="textarea" code={maxLengthCode}>
              <div class="grid w-full max-w-sm gap-1.5">
                <Label for="bio-input">Short Bio</Label>
                <Textarea
                  id="bio-input"
                  placeholder="Tell us a little bit about yourself..."
                  maxLength={120}
                />
              </div>
            </ComponentPreview>
          </div>

          {/* Show Count Without Limit */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Character Count Display</h3>
            <p class="text-sm text-muted-foreground">
              Pass <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">showCount={`{true}`}</code> to display typed character count without imposing a maximum limit.
            </p>
            <ComponentPreview name="textarea" code={showCountCode}>
              <div class="grid w-full max-w-sm gap-1.5">
                <Label for="unlimited-input">Feedback Note</Label>
                <Textarea
                  id="unlimited-input"
                  placeholder="Type a description..."
                  showCount={true}
                />
              </div>
            </ComponentPreview>
          </div>

          {/* Disabled State */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Disabled State</h3>
            <p class="text-sm text-muted-foreground">
              Pass <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">disabled={`{true}`}</code> to prevent user editing.
            </p>
            <ComponentPreview name="textarea" code={disabledCode}>
              <div class="w-full max-w-sm">
                <Textarea disabled placeholder="Type your message here..." class="max-w-sm" />
              </div>
            </ComponentPreview>
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="Textarea"
            items={[
              {
                prop: "placeholder",
                type: "string",
                default: "-",
                description: "Placeholder text displayed when the area is empty.",
              },
              {
                prop: "maxLength",
                type: "number",
                default: "-",
                description: "Maximum allowed character length. Automatically renders character limit counter.",
              },
              {
                prop: "showCount",
                type: "boolean",
                default: "false",
                description: "Displays live character counter badge at the bottom-right.",
              },
              {
                prop: "value",
                type: "string",
                default: "-",
                description: "Controlled text value string.",
              },
              {
                prop: "defaultValue",
                type: "string | number",
                default: "-",
                description: "Initial text value for uncontrolled state.",
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
          prev={{ title: "Tabs Component", href: "/docs/components/tabs" }}
          next={{ title: "Theme Manager", href: "/docs/components/theme-manager" }}
        />
      </div>
    </>
  );
}