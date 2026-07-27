// src/routes/docs/components/select.tsx
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

/* --- Code Snippets --- */
const importCode = `import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";`;

const defaultCode = `<Select<string>
  options={["SolidJS", "SolidStart", "Vite", "Tauri", "Electron"]}
  placeholder="Select a framework..."
  itemComponent={(props) => (
    <SelectItem item={props.item}>
      {props.item.rawValue}
    </SelectItem>
  )}
>
  <SelectTrigger class="w-45">
    <SelectValue<string>>
      {(state) => state.selectedOption()}
    </SelectValue>
  </SelectTrigger>
  <SelectContent />
</Select>`;

const disabledCode = `<Select<string>
  disabled={true}
  options={["SolidJS", "Vite"]}
  placeholder="Disabled select..."
  itemComponent={(props) => (
    <SelectItem item={props.item}>
      {props.item.rawValue}
    </SelectItem>
  )}
>
  <SelectTrigger class="w-45">
    <SelectValue<string>>
      {(state) => state.selectedOption()}
    </SelectValue>
  </SelectTrigger>
  <SelectContent />
</Select>`;

export default function SelectDocsPage() {
  return (
    <>
      <Seo
        title="Select Component"
        description="Custom dropdown select menu component built on Kobalte primitives for SolidJS."
        path="/docs/components/select"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="Select"
          badge="Kobalte"
          description="Displays a custom dropdown list of options triggered by an interactive button."
        />

        {/* Hero Live Preview */}
        <ComponentPreview name="select" code={defaultCode}>
          <Select<string>
            options={["SolidJS", "SolidStart", "Vite", "Tauri", "Electron"]}
            placeholder="Select a framework..."
            itemComponent={(props) => (
              <SelectItem item={props.item}>
                {props.item.rawValue}
              </SelectItem>
            )}
          >
            <SelectTrigger class="w-45">
              <SelectValue<string>>
                {(state) => state.selectedOption()}
              </SelectValue>
            </SelectTrigger>
            <SelectContent />
          </Select>
        </ComponentPreview>

        {/* Usage & Import */}
        <div class="space-y-4">
          <DocSectionHeader title="Usage" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        {/* Examples */}
        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          {/* Disabled State */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Disabled State</h3>
            <p class="text-sm text-muted-foreground">
              Pass <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">disabled={`{true}`}</code> to prevent user selection.
            </p>
            <ComponentPreview name="select" code={disabledCode}>
              <Select<string>
                disabled={true}
                options={["SolidJS", "Vite"]}
                placeholder="Disabled select..."
                itemComponent={(props) => (
                  <SelectItem item={props.item}>
                    {props.item.rawValue}
                  </SelectItem>
                )}
              >
                <SelectTrigger class="w-45">
                  <SelectValue<string>>
                    {(state) => state.selectedOption()}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent />
              </Select>
            </ComponentPreview>
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="Select"
            items={[
              {
                prop: "options",
                type: "T[]",
                required: true,
                description: "Array of items or strings to display as dropdown choices.",
              },
              {
                prop: "placeholder",
                type: "string",
                default: "-",
                description: "Placeholder text displayed when no option is selected.",
              },
              {
                prop: "value",
                type: "T",
                default: "-",
                description: "Controlled selected value option.",
              },
              {
                prop: "defaultValue",
                type: "T",
                default: "-",
                description: "Initial value for uncontrolled state.",
              },
              {
                prop: "onChange",
                type: "(value: T) => void",
                default: "-",
                description: "Callback function fired when an option is selected.",
              },
              {
                prop: "disabled",
                type: "boolean",
                default: "false",
                description: "Disables interaction and reduces trigger button opacity.",
              },
            ]}
          />
        </div>

        {/* Footer Navigation */}
        <DocNextSteps
          prev={{ title: "Radio Group", href: "/docs/components/radio-group" }}
          next={{ title: "Separator Component", href: "/docs/components/separator" }}
        />
      </div>
    </>
  );
}