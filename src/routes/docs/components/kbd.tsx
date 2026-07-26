// src/routes/docs/components/kbd.tsx
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Button } from "@/components/ui/button";

/* --- Code Snippets --- */
const importCode = `import { Kbd, KbdGroup } from "@/components/ui/kbd";`;

const defaultCode = `<KbdGroup>
  <Kbd>⌘</Kbd>
  <Kbd>K</Kbd>
</KbdGroup>`;

const variantsCode = `<div class="flex items-center gap-4">
  <Kbd variant="default">Ctrl + C</Kbd>
  <Kbd variant="outline">⌘ + Shift + P</Kbd>
</div>`;

const sizesCode = `<div class="flex items-center gap-4">
  <Kbd size="sm">Small ⌘K</Kbd>
  <Kbd size="md">Default ⌘K</Kbd>
  <Kbd size="lg">Large ⌘K</Kbd>
</div>`;

const groupCode = `<KbdGroup>
  <Kbd>Ctrl</Kbd>
  <Kbd>Alt</Kbd>
  <Kbd>Delete</Kbd>
</KbdGroup>`;

const inButtonCode = `<Button variant="outline" size="sm" class="gap-2">
  <span>Search documentation...</span>
  <KbdGroup>
    <Kbd size="sm">⌘</Kbd>
    <Kbd size="sm">K</Kbd>
  </KbdGroup>
</Button>`;

export default function KbdDocsPage() {
  return (
    <>
      <Seo
        title="Kbd Component"
        description="Keyboard key and shortcut group indicators for displaying hotkeys in SolidJS applications."
        path="/docs/components/kbd"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="Kbd (Keyboard Key)"
          badge="cva"
          description="Used to display keyboard shortcuts, hotkeys, and command keys in documentation, search inputs, and action buttons."
        />

        {/* Hero Live Preview */}
        <ComponentPreview name="kbd" code={defaultCode}>
          <KbdGroup>
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
        </ComponentPreview>

        {/* Usage & Import */}
        <div class="space-y-4">
          <DocSectionHeader title="Usage" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        {/* Examples */}
        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          {/* Variants */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Variants</h3>
            <p class="text-sm text-muted-foreground">
              Supports <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">default</code> (filled) and <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">outline</code> styles.
            </p>
            <ComponentPreview name="kbd" code={variantsCode}>
              <div class="flex flex-wrap items-center gap-4">
                <Kbd variant="default">Ctrl + C</Kbd>
                <Kbd variant="outline">⌘ + Shift + P</Kbd>
              </div>
            </ComponentPreview>
          </div>

          {/* Sizes */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Sizes</h3>
            <p class="text-sm text-muted-foreground">
              Available in <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">sm</code>, <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">md</code>, and <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">lg</code> dimensions.
            </p>
            <ComponentPreview name="kbd" code={sizesCode}>
              <div class="flex flex-wrap items-center gap-4">
                <Kbd size="sm">Small ⌘K</Kbd>
                <Kbd size="md">Default ⌘K</Kbd>
                <Kbd size="lg">Large ⌘K</Kbd>
              </div>
            </ComponentPreview>
          </div>

          {/* Key Groups */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Keyboard Key Groups</h3>
            <p class="text-sm text-muted-foreground">
              Wrap multiple key badges with <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">KbdGroup</code> to display shortcut combinations.
            </p>
            <ComponentPreview name="kbd" code={groupCode}>
              <KbdGroup>
                <Kbd>Ctrl</Kbd>
                <Kbd>Alt</Kbd>
                <Kbd>Delete</Kbd>
              </KbdGroup>
            </ComponentPreview>
          </div>

          {/* Inside Buttons */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Inside Interactive Buttons</h3>
            <p class="text-sm text-muted-foreground">
              Embed keyboard badges inside trigger buttons or search triggers.
            </p>
            <ComponentPreview name="kbd" code={inButtonCode}>
              <Button variant="outline" size="sm" class="gap-2">
                <span>Search documentation...</span>
                <KbdGroup>
                  <Kbd size="sm">⌘</Kbd>
                  <Kbd size="sm">K</Kbd>
                </KbdGroup>
              </Button>
            </ComponentPreview>
          </div>
        </div>

        {/* Footer Navigation */}
        <DocNextSteps
          prev={{ title: "List Component", href: "/docs/components/list" }}
          next={{ title: "Input Group", href: "/docs/components/input-group" }}
        />
      </div>
    </>
  );
}