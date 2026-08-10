import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

const importCode = `import { Spinner } from "@/components/ui/spinner";`;

const defaultCode = `<Spinner />`;

const sizesCode = `<div class="flex items-center gap-4">
  <Spinner size="sm" />
  <Spinner />
  <Spinner size="lg" />
</div>`;

const buttonCode = `<Button disabled>
  <Spinner size="sm" class="text-current" />
  Saving changes...
</Button>`;

export default function SpinnerDocsPage() {
  return (
    <>
      <Seo
        title="Spinner Component"
        description="An accessible animated loading indicator for asynchronous UI states in SolidJS."
        path="/docs/components/spinner"
      />

      <div class="space-y-10 pb-16">
        <DocPageHeader
          title="Spinner"
          badge="Feedback"
          description="A compact animated indicator for loading and asynchronous states."
        />

        <ComponentPreview name="spinner" code={defaultCode}>
          <Spinner />
        </ComponentPreview>

        <div class="space-y-4">
          <DocSectionHeader title="Usage" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Sizes</h3>
            <p class="text-sm text-muted-foreground">
              Use <code class="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">sm</code>, <code class="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">default</code>, or <code class="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">lg</code> to match the surrounding UI.
            </p>
            <ComponentPreview name="spinner" code={sizesCode}>
              <div class="flex items-center gap-4">
                <Spinner size="sm" />
                <Spinner />
                <Spinner size="lg" />
              </div>
            </ComponentPreview>
          </div>

          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Inside a Button</h3>
            <p class="text-sm text-muted-foreground">
              Combine the spinner with a disabled button while an action is being submitted.
            </p>
            <ComponentPreview name="spinner" code={buttonCode}>
              <Button disabled>
                <Spinner size="sm" class="text-current" />
                Saving changes...
              </Button>
            </ComponentPreview>
          </div>
        </div>

        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />
          <DocApiTable
            title="Spinner"
            items={[
              {
                prop: "size",
                type: '"sm" | "default" | "lg"',
                default: '"default"',
                description: "Controls the rendered spinner dimensions.",
              },
              {
                prop: "label",
                type: "string",
                default: '"Loading"',
                description: "Accessible status text announced to screen readers.",
              },
              {
                prop: "class",
                type: "string",
                description: "Additional Tailwind classes for color, spacing, or custom sizing.",
              },
            ]}
          />
        </div>

        <DocNextSteps
          prev={{ title: "Skeleton Component", href: "/docs/components/skeleton" }}
          next={{ title: "Switch Component", href: "/docs/components/switch" }}
        />
      </div>
    </>
  );
}
