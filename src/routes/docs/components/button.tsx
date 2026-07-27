// src/routes/docs/components/button.tsx
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Seo } from "@/components/seo";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { DocNextSteps } from "@/components/docs/doc-next-steps";

/* --- Code Snippets for Syntax Highlighting --- */
const importCode = `import { Button } from "@/components/ui/button";`;

const defaultCode = `<Button>Button</Button>`;

const secondaryCode = `<Button variant="secondary">Secondary</Button>`;

const destructiveCode = `<Button variant="destructive">Destructive</Button>`;

const outlineCode = `<Button variant="outline">Outline</Button>`;

const ghostCode = `<Button variant="ghost">Ghost</Button>`;

const linkCode = `<Button variant="link">Link</Button>`;

const iconCode = `<Button variant="outline" size="icon">
  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
  </svg>
</Button>`;

const sizesCode = `<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>`;

const loadingCode = `<Button disabled>
  <svg class="animate-spin mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
  Please wait
</Button>`;

export default function ButtonDocsPage() {
  return (
    <>
    <Seo
        title="Button Component"
        description="Interactive button component with variant and size options for SolidJS and Tailwind CSS v4."
        path="/docs/components/button"
      />
    <div class="space-y-10 pb-16">
      {/* 1. Page Header */}
      <div class="space-y-2">
        <div class="flex items-center gap-2">
          <h1 class="text-3xl font-bold tracking-tight">Button</h1>
          <Badge variant="outline" class="text-xs">cva</Badge>
        </div>
        <p class="text-base text-muted-foreground">
          Displays a button or a component that looks like a button with multiple variants and sizes.
        </p>
      </div>

      {/* 2. Main Hero Preview */}
      <ComponentPreview name="button" code={defaultCode}>
        <Button>Button</Button>
      </ComponentPreview>

      {/* 3. Installation & Usage */}
      <div class="space-y-4">
        <h2 class="text-xl font-semibold tracking-tight border-b border-border/50 pb-2">
          Usage
        </h2>
        <CodeBlock code={importCode} lang="tsx" />
      </div>

      {/* 4. Individual Examples & Variants */}
      <div class="space-y-8 pt-4">
        <h2 class="text-2xl font-bold tracking-tight border-b border-border/50 pb-2">
          Examples
        </h2>

        {/* Secondary Variant */}
        <div class="space-y-3">
          <h3 class="text-lg font-semibold tracking-tight">Secondary</h3>
          <p class="text-sm text-muted-foreground">Used for secondary actions that require less emphasis.</p>
          <ComponentPreview name="button" code={secondaryCode}>
            <Button variant="secondary">Secondary</Button>
          </ComponentPreview>
        </div>

        {/* Destructive Variant */}
        <div class="space-y-3">
          <h3 class="text-lg font-semibold tracking-tight">Destructive</h3>
          <p class="text-sm text-muted-foreground">Used for actions that delete or destroy data.</p>
          <ComponentPreview name="button" code={destructiveCode}>
            <Button variant="destructive">Destructive</Button>
          </ComponentPreview>
        </div>

        {/* Outline Variant */}
        <div class="space-y-3">
          <h3 class="text-lg font-semibold tracking-tight">Outline</h3>
          <p class="text-sm text-muted-foreground">Inverted button with subtle border for secondary choices.</p>
          <ComponentPreview name="button" code={outlineCode}>
            <Button variant="outline">Outline</Button>
          </ComponentPreview>
        </div>

        {/* Ghost Variant */}
        <div class="space-y-3">
          <h3 class="text-lg font-semibold tracking-tight">Ghost</h3>
          <p class="text-sm text-muted-foreground">Minimal button without background for clean UI contexts.</p>
          <ComponentPreview name="button" code={ghostCode}>
            <Button variant="ghost">Ghost</Button>
          </ComponentPreview>
        </div>

        {/* Link Variant */}
        <div class="space-y-3">
          <h3 class="text-lg font-semibold tracking-tight">Link</h3>
          <p class="text-sm text-muted-foreground">Renders as an inline text link with hover underline.</p>
          <ComponentPreview name="button" code={linkCode}>
            <Button variant="link">Link</Button>
          </ComponentPreview>
        </div>

        {/* Icon Size Variant */}
        <div class="space-y-3">
          <h3 class="text-lg font-semibold tracking-tight">Icon</h3>
          <p class="text-sm text-muted-foreground">Square button tailored specifically for SVG icons.</p>
          <ComponentPreview name="button" code={iconCode}>
            <Button variant="outline" size="icon">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </Button>
          </ComponentPreview>
        </div>

        {/* Sizes */}
        <div class="space-y-3">
          <h3 class="text-lg font-semibold tracking-tight">Sizes</h3>
          <p class="text-sm text-muted-foreground">Supports sm, default, and lg dimensions.</p>
          <ComponentPreview name="button" code={sizesCode}>
            <div class="flex flex-wrap items-center gap-4">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
          </ComponentPreview>
        </div>

        {/* Loading / Disabled State */}
        <div class="space-y-3">
          <h3 class="text-lg font-semibold tracking-tight">Loading</h3>
          <p class="text-sm text-muted-foreground">Disabled state with animated spinner indicator.</p>
          <ComponentPreview name="button" code={loadingCode}>
            <Button disabled>
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Please wait
            </Button>
          </ComponentPreview>
        </div>
      </div>

        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="Button"
            items={[
              {
                prop: "variant",
                type: '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"',
                default: '"default"',
                description: "Visual style variant of the button.",
              },
              {
                prop: "size",
                type: '"default" | "sm" | "lg" | "icon"',
                default: '"default"',
                description: "Predefined sizing dimensions of the button.",
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

        <DocNextSteps
          prev={{ title: "Breadcrumb Component", href: "/docs/components/breadcrumb" }}
          next={{ title: "Card Component", href: "/docs/components/card" }}
        />
    </div>
    </>
  );
}