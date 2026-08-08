import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Toggle, ToggleGroup } from "@/components/ui/toggle";
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from "lucide-solid";
import { createSignal } from "solid-js";

/* --- Code Snippets --- */
const importCode = `import { Toggle, ToggleGroup } from "@/components/ui/toggle";`;

const defaultCode = `<Toggle aria-label="Toggle italic">
  <Italic class="h-4 w-4" />
</Toggle>`;

const outlineCode = `<Toggle variant="outline" aria-label="Toggle italic">
  <Italic class="h-4 w-4" />
</Toggle>`;

const groupCode = `<ToggleGroup>
  <Toggle aria-label="Toggle bold">
    <Bold class="h-4 w-4" />
  </Toggle>
  <Toggle aria-label="Toggle italic">
    <Italic class="h-4 w-4" />
  </Toggle>
  <Toggle aria-label="Toggle underline">
    <Underline class="h-4 w-4" />
  </Toggle>
</ToggleGroup>`;

export default function ToggleDocsPage() {
  const [isBold, setIsBold] = createSignal(false);

  return (
    <>
      <Seo
        title="Toggle & Toggle Group Component"
        description="A two-state button component that can be toggled on or off, built on Kobalte primitives in SolidJS."
        path="/docs/components/toggle"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="Toggle"
          badge="Kobalte"
          description="A two-state interactive button that can be toggled on or off, individually or in grouped layouts."
        />

        {/* Hero Live Preview */}
        <ComponentPreview name="toggle" code={defaultCode}>
          <div class="flex items-center gap-4">
            <Toggle
              pressed={isBold()}
              onPressedChange={setIsBold}
              aria-label="Toggle italic"
            >
              <Italic class="h-4 w-4" />
            </Toggle>
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

          {/* Outline Variant */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Outline Variant</h3>
            <p class="text-sm text-muted-foreground">
              Pass <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">variant="outline"</code> for a bordered toggle button.
            </p>
            <ComponentPreview name="toggle" code={outlineCode}>
              <Toggle variant="outline" aria-label="Toggle italic">
                <Italic class="h-4 w-4" />
              </Toggle>
            </ComponentPreview>
          </div>

          {/* Toggle Group */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Toggle Group</h3>
            <p class="text-sm text-muted-foreground">
              Wrap multiple <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">Toggle</code> components in a <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">ToggleGroup</code> wrapper.
            </p>
            <ComponentPreview name="toggle" code={groupCode}>
              <ToggleGroup>
                <Toggle aria-label="Toggle bold">
                  <Bold class="h-4 w-4" />
                </Toggle>
                <Toggle aria-label="Toggle italic">
                  <Italic class="h-4 w-4" />
                </Toggle>
                <Toggle aria-label="Toggle underline">
                  <Underline class="h-4 w-4" />
                </Toggle>
              </ToggleGroup>
            </ComponentPreview>
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="Toggle Props"
            items={[
              {
                prop: "variant",
                type: '"default" | "outline"',
                default: '"default"',
                description: "Visual style variant of the toggle button.",
              },
              {
                prop: "size",
                type: '"default" | "sm" | "lg"',
                default: '"default"',
                description: "Size variant of the toggle button.",
              },
              {
                prop: "pressed",
                type: "boolean",
                default: "false",
                description: "Controlled pressed state of the toggle.",
              },
              {
                prop: "onPressedChange",
                type: "(pressed: boolean) => void",
                default: "-",
                description: "Callback fired when the pressed state changes.",
              },
              {
                prop: "disabled",
                type: "boolean",
                default: "false",
                description: "Whether the toggle button is disabled.",
              },
            ]}
          />
        </div>

        {/* Footer Navigation */}
        <DocNextSteps
          prev={{ title: "Tabs", href: "/docs/components/tabs" }}
          next={{ title: "Tooltip", href: "/docs/components/tooltip" }}
        />
      </div>
    </>
  );
}
