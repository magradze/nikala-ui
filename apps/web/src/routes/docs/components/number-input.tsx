import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { NumberInput } from "@/components/ui/number-input";
import { Label } from "@/components/ui/label";
import { createSignal } from "solid-js";

/* --- Code Snippets --- */
const importCode = `import { NumberInput } from "@/components/ui/number-input";`;

const defaultCode = `<NumberInput defaultValue={10} minValue={0} maxValue={100} />`;

const negativeCode = `<NumberInput defaultValue={-5} allowNegative minValue={-50} maxValue={50} />`;

const stepCode = `<NumberInput defaultValue={50} step={5} minValue={0} maxValue={100} />`;

const disabledCode = `<NumberInput defaultValue={15} disabled />`;

export default function NumberInputDocsPage() {
  const [val, setVal] = createSignal(5);
  const [negativeVal, setNegativeVal] = createSignal(-10);

  return (
    <>
      <Seo
        title="Number Input Component"
        description="A numeric stepper input component supporting negative values, long-press auto-repeat, min/max bounds, and keyboard navigation."
        path="/docs/components/number-input"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="Number Input"
          badge="Kobalte"
          description="A numeric stepper input control supporting negative values, continuous long-press auto-repeat, min/max boundaries, and custom step intervals."
        />

        {/* Hero Live Preview */}
        <ComponentPreview name="number-input" code={defaultCode}>
          <div class="flex flex-col space-y-2">
            <Label for="quantity">Quantity</Label>
            <NumberInput
              id="quantity"
              value={val()}
              onValueChange={setVal}
              minValue={0}
              maxValue={20}
            />
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

          {/* Negative Values Support */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Negative Values Support</h3>
            <p class="text-sm text-muted-foreground">
              Pass <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">allowNegative</code> to allow negative values down to <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">minValue</code> (or <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">-Infinity</code>). Long-press on increment/decrement triggers for fast auto-repeat.
            </p>
            <ComponentPreview name="number-input" code={negativeCode}>
              <div class="flex flex-col space-y-2">
                <Label for="negative-demo">Temperature Adjustment (°C)</Label>
                <NumberInput
                  id="negative-demo"
                  value={negativeVal()}
                  onValueChange={setNegativeVal}
                  allowNegative
                  minValue={-50}
                  maxValue={50}
                />
              </div>
            </ComponentPreview>
          </div>

          {/* Custom Step */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Custom Step (Interval of 5)</h3>
            <p class="text-sm text-muted-foreground">
              Pass <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">step={5}</code> to increment or decrement in steps of 5.
            </p>
            <ComponentPreview name="number-input" code={stepCode}>
              <NumberInput defaultValue={50} step={5} minValue={0} maxValue={100} />
            </ComponentPreview>
          </div>

          {/* Disabled State */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Disabled State</h3>
            <p class="text-sm text-muted-foreground">
              Pass <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">disabled</code> to prevent user interactions.
            </p>
            <ComponentPreview name="number-input" code={disabledCode}>
              <NumberInput defaultValue={15} disabled />
            </ComponentPreview>
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="NumberInput Props"
            items={[
              {
                prop: "value",
                type: "number",
                default: "-",
                description: "Controlled numeric value.",
              },
              {
                prop: "defaultValue",
                type: "number",
                default: "-",
                description: "Uncontrolled default value.",
              },
              {
                prop: "onValueChange",
                type: "(value: number) => void",
                default: "-",
                description: "Callback fired when numeric value changes.",
              },
              {
                prop: "allowNegative",
                type: "boolean",
                default: "false",
                description: "Allows negative numbers below zero down to minValue.",
              },
              {
                prop: "minValue",
                type: "number",
                default: "0 (or -Infinity if allowNegative)",
                description: "Minimum allowable numeric value boundary.",
              },
              {
                prop: "maxValue",
                type: "number",
                default: "Infinity",
                description: "Maximum allowable numeric value boundary.",
              },
              {
                prop: "step",
                type: "number",
                default: "1",
                description: "Step amount for increment and decrement triggers.",
              },
              {
                prop: "disabled",
                type: "boolean",
                default: "false",
                description: "Whether the field is disabled.",
              },
            ]}
          />
        </div>

        {/* Footer Navigation */}
        <DocNextSteps
          prev={{ title: "Input Group", href: "/docs/components/input-group" }}
          next={{ title: "Pin Input", href: "/docs/components/pin-input" }}
        />
      </div>
    </>
  );
}
