// src/routes/docs/components/radio-group.tsx
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemLabel,
} from "@/components/ui/radio-group";

/* --- Code Snippets --- */
const importCode = `import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemLabel,
} from "@/components/ui/radio-group";`;

const defaultCode = `<RadioGroup defaultValue="comfortable">
  <RadioGroupItem value="default">
    <RadioGroupItemLabel>Default</RadioGroupItemLabel>
  </RadioGroupItem>
  <RadioGroupItem value="comfortable">
    <RadioGroupItemLabel>Comfortable</RadioGroupItemLabel>
  </RadioGroupItem>
  <RadioGroupItem value="compact">
    <RadioGroupItemLabel>Compact</RadioGroupItemLabel>
  </RadioGroupItem>
</RadioGroup>`;

const horizontalCode = `<RadioGroup orientation="horizontal" defaultValue="card">
  <RadioGroupItem value="card">
    <RadioGroupItemLabel>Card Payment</RadioGroupItemLabel>
  </RadioGroupItem>
  <RadioGroupItem value="paypal">
    <RadioGroupItemLabel>PayPal</RadioGroupItemLabel>
  </RadioGroupItem>
  <RadioGroupItem value="apple">
    <RadioGroupItemLabel>Apple Pay</RadioGroupItemLabel>
  </RadioGroupItem>
</RadioGroup>`;

const disabledCode = `<RadioGroup defaultValue="option-1">
  <RadioGroupItem value="option-1">
    <RadioGroupItemLabel>Active Option</RadioGroupItemLabel>
  </RadioGroupItem>
  <RadioGroupItem value="option-2" disabled>
    <RadioGroupItemLabel>Disabled Option</RadioGroupItemLabel>
  </RadioGroupItem>
</RadioGroup>`;

export default function RadioGroupDocsPage() {
  return (
    <>
      <Seo
        title="Radio Group Component"
        description="Accessible radio button group supporting vertical and horizontal orientations built on Kobalte primitives."
        path="/docs/components/radio-group"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="Radio Group"
          badge="Kobalte"
          description="A set of checkable buttons—known as radio buttons—where no more than one button can be checked at a time."
        />

        {/* Hero Live Preview */}
        <ComponentPreview name="radio-group" code={defaultCode}>
          <RadioGroup defaultValue="comfortable">
            <RadioGroupItem value="default">
              <RadioGroupItemLabel>Default</RadioGroupItemLabel>
            </RadioGroupItem>
            <RadioGroupItem value="comfortable">
              <RadioGroupItemLabel>Comfortable</RadioGroupItemLabel>
            </RadioGroupItem>
            <RadioGroupItem value="compact">
              <RadioGroupItemLabel>Compact</RadioGroupItemLabel>
            </RadioGroupItem>
          </RadioGroup>
        </ComponentPreview>

        {/* Usage & Import */}
        <div class="space-y-4">
          <DocSectionHeader title="Usage" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        {/* Examples */}
        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          {/* Horizontal Layout */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Horizontal Orientation</h3>
            <p class="text-sm text-muted-foreground">
              Pass <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">orientation="horizontal"</code> for inline side-by-side radio choices.
            </p>
            <ComponentPreview name="radio-group" code={horizontalCode}>
              <RadioGroup orientation="horizontal" defaultValue="card">
                <RadioGroupItem value="card">
                  <RadioGroupItemLabel>Card Payment</RadioGroupItemLabel>
                </RadioGroupItem>
                <RadioGroupItem value="paypal">
                  <RadioGroupItemLabel>PayPal</RadioGroupItemLabel>
                </RadioGroupItem>
                <RadioGroupItem value="apple">
                  <RadioGroupItemLabel>Apple Pay</RadioGroupItemLabel>
                </RadioGroupItem>
              </RadioGroup>
            </ComponentPreview>
          </div>

          {/* Disabled Items */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Disabled Item</h3>
            <p class="text-sm text-muted-foreground">
              Pass <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">disabled={`{true}`}</code> to disable interaction on a specific item.
            </p>
            <ComponentPreview name="radio-group" code={disabledCode}>
              <RadioGroup defaultValue="option-1">
                <RadioGroupItem value="option-1">
                  <RadioGroupItemLabel>Active Option</RadioGroupItemLabel>
                </RadioGroupItem>
                <RadioGroupItem value="option-2" disabled>
                  <RadioGroupItemLabel>Disabled Option</RadioGroupItemLabel>
                </RadioGroupItem>
              </RadioGroup>
            </ComponentPreview>
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="RadioGroup"
            items={[
              {
                prop: "orientation",
                type: '"vertical" | "horizontal"',
                default: '"vertical"',
                description: "Layout direction of the radio group choices.",
              },
              {
                prop: "value",
                type: "string",
                default: "-",
                description: "Controlled selected item value.",
              },
              {
                prop: "defaultValue",
                type: "string",
                default: "-",
                description: "Initial value for uncontrolled state.",
              },
              {
                prop: "onChange",
                type: "(value: string) => void",
                default: "-",
                description: "Callback function fired when selected item changes.",
              },
            ]}
          />

          <DocApiTable
            title="RadioGroupItem"
            items={[
              {
                prop: "value",
                type: "string",
                required: true,
                description: "Unique string value identifying this item choice.",
              },
              {
                prop: "disabled",
                type: "boolean",
                default: "false",
                description: "Disables interaction and reduces opacity on this radio item.",
              },
            ]}
          />
        </div>

        {/* Footer Navigation */}
        <DocNextSteps
          prev={{ title: "List Component", href: "/docs/components/list" }}
          next={{ title: "Select Component", href: "/docs/components/select" }}
        />
      </div>
    </>
  );
}