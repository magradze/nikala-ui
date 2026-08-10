import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { CodeBlock } from "@/components/code-block";
import { ComponentPreview } from "@/components/component-preview";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { Seo } from "@/components/seo";

const importCode = `import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";`;

const defaultCode = `<ButtonGroup aria-label="Document actions">
  <Button variant="default">Copy</Button>
  <Button variant="default">Share</Button>
  <Button variant="default">Export</Button>
</ButtonGroup>`;

const verticalCode = `<ButtonGroup orientation="vertical" aria-label="View options">
  <Button variant="default">List</Button>
  <Button variant="default">Grid</Button>
  <Button variant="default">Calendar</Button>
</ButtonGroup>`;

const variantsCode = `<ButtonGroup aria-label="File actions">
  <Button>Save</Button>
  <Button variant="secondary">Save as...</Button>
  <Button variant="default">Cancel</Button>
</ButtonGroup>`;

export default function ButtonGroupDocsPage() {
  return (
    <>
      <Seo
        title="Button Group Component"
        description="Groups related buttons into a connected horizontal or vertical control for SolidJS and Tailwind CSS v4."
        path="/docs/components/button-group"
      />

      <div class="space-y-10 pb-16">
        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <h1 class="text-3xl font-bold tracking-tight">Button Group</h1>
            <Badge variant="default" class="text-xs">atom</Badge>
          </div>
          <p class="text-base text-muted-foreground">
            Groups related buttons into a connected control while preserving each
            Button's variants, states, and accessibility attributes.
          </p>
        </div>

        <ComponentPreview name="button-group" code={defaultCode}>
          <ButtonGroup aria-label="Document actions">
            <Button variant="default">Copy</Button>
            <Button variant="default">Share</Button>
            <Button variant="default">Export</Button>
          </ButtonGroup>
        </ComponentPreview>

        <div class="space-y-4">
          <h2 class="text-xl font-semibold tracking-tight border-b border-border/50 pb-2">
            Usage
          </h2>
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        <div class="space-y-8 pt-4">
          <h2 class="text-2xl font-bold tracking-tight border-b border-border/50 pb-2">
            Examples
          </h2>

          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Vertical</h3>
            <p class="text-sm text-muted-foreground">
              Use <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">orientation="vertical"</code> for stacked actions.
            </p>
            <ComponentPreview name="button-group" code={verticalCode}>
              <ButtonGroup orientation="vertical" aria-label="View options">
                <Button variant="secondary">List</Button>
                <Button variant="secondary">Grid</Button>
                <Button variant="secondary">Calendar</Button>
              </ButtonGroup>
            </ComponentPreview>
          </div>

          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Mixed variants</h3>
            <p class="text-sm text-muted-foreground">
              Each child remains a regular Button, so variants and disabled states can be mixed.
            </p>
            <ComponentPreview name="button-group" code={variantsCode}>
              <ButtonGroup aria-label="File actions">
                <Button>Save</Button>
                <Button variant="secondary">Save as...</Button>
                <Button variant="outline">Cancel</Button>
              </ButtonGroup>
            </ComponentPreview>
          </div>
        </div>

        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />
          <DocApiTable
            title="ButtonGroup"
            items={[
              {
                prop: "orientation",
                type: '"horizontal" | "vertical"',
                default: '"horizontal"',
                description: "Controls whether child buttons are arranged in a row or column.",
              },
              {
                prop: "class",
                type: "string",
                default: "-",
                description: "Additional classes merged onto the group wrapper.",
              },
              {
                prop: "aria-label",
                type: "string",
                default: "-",
                description: "Accessible label describing the purpose of the button group.",
              },
            ]}
          />
        </div>

        <DocNextSteps
          prev={{ title: "Button Component", href: "/docs/components/button" }}
          next={{ title: "Card Component", href: "/docs/components/card" }}
        />
      </div>
    </>
  );
}
