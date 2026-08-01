// src/routes/docs/components/separator.tsx
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Separator } from "@/components/ui/separator";

/* --- Code Snippets --- */
const importCode = `import { Separator } from "@/components/ui/separator";`;

const defaultCode = `<div class="max-w-xs space-y-3">
  <div class="space-y-1">
    <h4 class="text-sm font-medium leading-none">Nikala UI</h4>
    <p class="text-xs text-muted-foreground">SolidJS & Tailwind CSS v4 component system.</p>
  </div>
  <Separator />
  <div class="flex h-5 items-center space-x-4 text-xs font-mono">
    <span>Docs</span>
    <Separator orientation="vertical" />
    <span>Components</span>
    <Separator orientation="vertical" />
    <span>Source</span>
  </div>
</div>`;

const verticalCode = `<div class="flex h-5 items-center space-x-4 text-sm font-medium">
  <span>Blog</span>
  <Separator orientation="vertical" />
  <span>Docs</span>
  <Separator orientation="vertical" />
  <span>Source</span>
</div>`;

export default function SeparatorDocsPage() {
  return (
    <>
      <Seo
        title="Separator Component"
        description="Visually or semantically separates content using horizontal or vertical line dividers in SolidJS."
        path="/docs/components/separator"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="Separator"
          badge="HTML"
          description="Visually or semantically separates content using horizontal or vertical line dividers."
        />

        {/* Hero Live Preview */}
        <ComponentPreview name="separator" code={defaultCode}>
          <div class="max-w-xs space-y-3">
            <div class="space-y-1">
              <h4 class="text-sm font-medium leading-none">Nikala UI</h4>
              <p class="text-xs text-muted-foreground">SolidJS & Tailwind CSS v4 component system.</p>
            </div>
            <Separator />
            <div class="flex h-5 items-center space-x-4 text-xs font-mono">
              <span>Docs</span>
              <Separator orientation="vertical" />
              <span>Components</span>
              <Separator orientation="vertical" />
              <span>Source</span>
            </div>
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

          {/* Vertical Orientation */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Vertical Orientation</h3>
            <p class="text-sm text-muted-foreground">
              Pass <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">orientation="vertical"</code> to render a vertical line divider inside flex layouts.
            </p>
            <ComponentPreview name="separator" code={verticalCode}>
              <div class="flex h-5 items-center space-x-4 text-sm font-medium">
                <span>Blog</span>
                <Separator orientation="vertical" />
                <span>Docs</span>
                <Separator orientation="vertical" />
                <span>Source</span>
              </div>
            </ComponentPreview>
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="Separator"
            items={[
              {
                prop: "orientation",
                type: '"horizontal" | "vertical"',
                default: '"horizontal"',
                description: "Line direction orientation.",
              },
              {
                prop: "decorative",
                type: "boolean",
                default: "true",
                description: "Determines if the separator is purely visual or announced to screen readers.",
              },
            ]}
          />
        </div>

        {/* Footer Navigation */}
        <DocNextSteps
          prev={{ title: "Select Component", href: "/docs/components/select" }}
          next={{ title: "Sheet Component", href: "/docs/components/sheet" }}
        />
      </div>
    </>
  );
}