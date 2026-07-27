// src/routes/docs/components/accordion.tsx
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { DocApiTable } from "@/components/docs/doc-api-table";

/* --- Code Snippets --- */
const importCode = `import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";`;

const defaultCode = `<Accordion collapsible defaultValue="item-1" class="max-w-md">
  <AccordionItem value="item-1">
    <AccordionTrigger>Is Nikala UI free to use?</AccordionTrigger>
    <AccordionContent>
      Yes, Nikala UI is 100% open-source MIT licensed for personal and commercial projects.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Does it support Tailwind CSS v4?</AccordionTrigger>
    <AccordionContent>
      Yes! Nikala UI is designed specifically around Tailwind v4's CSS-first theme architecture.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionTrigger>How does reactivity work?</AccordionTrigger>
    <AccordionContent>
      Components use SolidJS's native splitProps and Kobalte accessible primitives for fine-grained reactivity.
    </AccordionContent>
  </AccordionItem>
</Accordion>`;

const multipleCode = `<Accordion type="multiple" defaultValue={["item-1", "item-2"]} class="max-w-md">
  <AccordionItem value="item-1">
    <AccordionTrigger>Can I open multiple sections at once?</AccordionTrigger>
    <AccordionContent>
      Yes, set type="multiple" on the root Accordion component to allow expanding multiple panels simultaneously.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Is it fully accessible?</AccordionTrigger>
    <AccordionContent>
      Yes, built on Kobalte primitives with full ARIA roles and keyboard arrow navigation.
    </AccordionContent>
  </AccordionItem>
</Accordion>`;

const disabledCode = `<Accordion collapsible class="max-w-md">
  <AccordionItem value="item-1">
    <AccordionTrigger>Active Section</AccordionTrigger>
    <AccordionContent>
      This accordion section is fully interactive.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2" disabled={true}>
    <AccordionTrigger>Disabled Section</AccordionTrigger>
    <AccordionContent>
      This panel is disabled and cannot be expanded.
    </AccordionContent>
  </AccordionItem>
</Accordion>`;

export default function AccordionDocsPage() {
  return (
    <>
      <Seo
        title="Accordion Component"
        description="Vertically stacked collapsible content sections supporting single and multiple modes built on Kobalte primitives."
        path="/docs/components/accordion"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="Accordion"
          badge="Kobalte"
          description="A vertically stacked set of interactive headings that each reveal a section of content."
        />

        {/* Hero Live Preview */}
        <ComponentPreview name="accordion" code={defaultCode}>
          <div class="w-full max-w-md">
            <Accordion collapsible defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is Nikala UI free to use?</AccordionTrigger>
                <AccordionContent>
                  Yes, Nikala UI is 100% open-source MIT licensed for personal and commercial projects.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Does it support Tailwind CSS v4?</AccordionTrigger>
                <AccordionContent>
                  Yes! Nikala UI is designed specifically around Tailwind v4's CSS-first theme architecture.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>How does reactivity work?</AccordionTrigger>
                <AccordionContent>
                  Components use SolidJS's native splitProps and Kobalte accessible primitives for fine-grained reactivity.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
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

          {/* Multiple Expansion */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Multiple Mode</h3>
            <p class="text-sm text-muted-foreground">
              Pass <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">type="multiple"</code> to allow expanding multiple panels at the same time.
            </p>
            <ComponentPreview name="accordion" code={multipleCode}>
              <div class="w-full max-w-md">
                <Accordion type="multiple" defaultValue={["item-1", "item-2"]}>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Can I open multiple sections at once?</AccordionTrigger>
                    <AccordionContent>
                      Yes, set type="multiple" on the root Accordion component to allow expanding multiple panels simultaneously.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Is it fully accessible?</AccordionTrigger>
                    <AccordionContent>
                      Yes, built on Kobalte primitives with full ARIA roles and keyboard arrow navigation.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </ComponentPreview>
          </div>

          {/* Disabled State */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Disabled Item</h3>
            <p class="text-sm text-muted-foreground">
              Pass <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">disabled={`{true}`}</code> to an <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">AccordionItem</code> to prevent user interaction.
            </p>
            <ComponentPreview name="accordion" code={disabledCode}>
              <div class="w-full max-w-md">
                <Accordion collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Active Section</AccordionTrigger>
                    <AccordionContent>
                      This accordion section is fully interactive.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2" disabled={true}>
                    <AccordionTrigger>Disabled Section</AccordionTrigger>
                    <AccordionContent>
                      This panel is disabled and cannot be expanded.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </ComponentPreview>
          </div>
        </div>


        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          {/* Accordion Root Props */}
          <DocApiTable
            title="Accordion (Root)"
            items={[
              {
                prop: "type",
                type: '"single" | "multiple"',
                default: '"single"',
                description: "Expansion mode. Determines if one or many panels can open simultaneously.",
              },
              {
                prop: "collapsible",
                type: "boolean",
                default: "false",
                description: "Allows closing all items in single expansion mode.",
              },
              {
                prop: "value",
                type: "string | string[]",
                default: "-",
                description: "Controlled open item value(s).",
              },
              {
                prop: "defaultValue",
                type: "string | string[]",
                default: "-",
                description: "Initial open item value(s) for uncontrolled state.",
              },
              {
                prop: "disabled",
                type: "boolean",
                default: "false",
                description: "Disables interaction for the entire accordion.",
              },
            ]}
          />

          {/* AccordionItem Props */}
          <DocApiTable
            title="AccordionItem"
            items={[
              {
                prop: "value",
                type: "string",
                required: true,
                description: "Unique string value identifying this accordion item.",
              },
              {
                prop: "disabled",
                type: "boolean",
                default: "false",
                description: "Disables interaction for this specific panel item.",
              },
            ]}
          />
        </div>

        {/* Footer Navigation */}
        <DocNextSteps
          prev={{ title: "Theming", href: "/docs/theming" }}
          next={{ title: "Alert Component", href: "/docs/components/alert" }}
        />
      </div>
    </>
  );
}