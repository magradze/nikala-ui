// src/routes/docs/components/toggle-group.tsx
import { createSignal, For, Show } from "solid-js";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  LayoutGrid,
  List,
  Columns3,
} from "lucide-solid";

/* --- Code Snippets --- */
const importCode = `import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";`;

const defaultCode = `const [alignment, setAlignment] = createSignal<string>("left");

return (
  <div class="flex flex-col items-center gap-3">
    <ToggleGroup
      type="single"
      value={alignment()}
      onChange={(val) => setAlignment(val || "left")}
      variant="outline"
    >
      <ToggleGroupItem value="left" aria-label="Align Left">
        <AlignLeft class="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align Center">
        <AlignCenter class="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align Right">
        <AlignRight class="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="justify" aria-label="Align Justify">
        <AlignJustify class="size-4" />
      </ToggleGroupItem>
    </ToggleGroup>

    <p class="text-xs text-muted-foreground">
      Selected Alignment: <span class="font-semibold text-foreground">{alignment()}</span>
    </p>
  </div>
);`;

const multipleCode = `const [formats, setFormats] = createSignal<string[]>(["bold", "italic"]);

return (
  <div class="flex flex-col items-center gap-4">
    <ToggleGroup
      type="multiple"
      value={formats()}
      onChange={(val) => setFormats(val)}
      variant="outline"
    >
      <ToggleGroupItem value="bold" aria-label="Toggle Bold">
        <Bold class="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle Italic">
        <Italic class="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle Underline">
        <Underline class="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="strikethrough" aria-label="Toggle Strikethrough">
        <Strikethrough class="size-4" />
      </ToggleGroupItem>
    </ToggleGroup>

    {/* Live Preview Text */}
    <div
      class="rounded-md border border-border bg-card p-4 text-center text-sm transition-all"
      classList={{
        "font-bold": formats().includes("bold"),
        "italic": formats().includes("italic"),
        "underline": formats().includes("underline"),
        "line-through": formats().includes("strikethrough"),
      }}
    >
      Fine-grained SolidJS Reactivity in Action
    </div>
  </div>
);`;

const sizesCode = `<div class="flex flex-col items-center gap-3">
  {/* Small */}
  <ToggleGroup type="single" defaultValue="grid" size="sm" variant="outline">
    <ToggleGroupItem value="grid"><LayoutGrid class="size-3.5" /></ToggleGroupItem>
    <ToggleGroupItem value="list"><List class="size-3.5" /></ToggleGroupItem>
    <ToggleGroupItem value="columns"><Columns3 class="size-3.5" /></ToggleGroupItem>
  </ToggleGroup>

  {/* Default */}
  <ToggleGroup type="single" defaultValue="grid" size="default" variant="outline">
    <ToggleGroupItem value="grid"><LayoutGrid class="size-4" /></ToggleGroupItem>
    <ToggleGroupItem value="list"><List class="size-4" /></ToggleGroupItem>
    <ToggleGroupItem value="columns"><Columns3 class="size-4" /></ToggleGroupItem>
  </ToggleGroup>

  {/* Large */}
  <ToggleGroup type="single" defaultValue="grid" size="lg" variant="outline">
    <ToggleGroupItem value="grid"><LayoutGrid class="size-5" /></ToggleGroupItem>
    <ToggleGroupItem value="list"><List class="size-5" /></ToggleGroupItem>
    <ToggleGroupItem value="columns"><Columns3 class="size-5" /></ToggleGroupItem>
  </ToggleGroup>
</div>`;

export function ToggleGroupHeroDemo() {
  const [alignment, setAlignment] = createSignal<string>("left");

  return (
    <div class="flex flex-col items-center gap-3">
      <ToggleGroup
        type="single"
        value={alignment()}
        onChange={(val) => setAlignment(val || "left")}
        variant="outline"
      >
        <ToggleGroupItem value="left" aria-label="Align Left">
          <AlignLeft class="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align Center">
          <AlignCenter class="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Align Right">
          <AlignRight class="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="justify" aria-label="Align Justify">
          <AlignJustify class="size-4" />
        </ToggleGroupItem>
      </ToggleGroup>

      <p class="text-xs text-muted-foreground">
        Active: <span class="font-mono font-medium text-foreground">{alignment()}</span>
      </p>
    </div>
  );
}

export function ToggleGroupMultipleDemo() {
  const [formats, setFormats] = createSignal<string[]>(["bold", "italic"]);

  return (
    <div class="flex flex-col items-center gap-4 w-full max-w-sm">
      <ToggleGroup
        type="multiple"
        value={formats()}
        onChange={(val) => setFormats(val)}
        variant="outline"
      >
        <ToggleGroupItem value="bold" aria-label="Toggle Bold">
          <Bold class="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle Italic">
          <Italic class="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle Underline">
          <Underline class="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="strikethrough" aria-label="Toggle Strikethrough">
          <Strikethrough class="size-4" />
        </ToggleGroupItem>
      </ToggleGroup>

      <div
        class="w-full rounded-lg border border-border bg-card p-4 text-center text-sm transition-all"
        classList={{
          "font-bold": formats().includes("bold"),
          italic: formats().includes("italic"),
          underline: formats().includes("underline"),
          "line-through": formats().includes("strikethrough"),
        }}
      >
        Fine-grained SolidJS Reactivity in Action
      </div>
    </div>
  );
}

export default function ToggleGroupDocsPage() {
  return (
    <>
      <Seo
        title="Toggle Group Component"
        description="A set of two-state buttons that can be toggled on or off with single or multiple selection support."
        path="/docs/components/toggle-group"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="Toggle Group"
          badge="compound"
          description="A set of two-state buttons that can be toggled on or off with single or multiple selection modes, size variants, and full keyboard navigation."
        />

        {/* Hero Live Preview */}
        <ComponentPreview name="toggle-group" code={defaultCode}>
          <ToggleGroupHeroDemo />
        </ComponentPreview>

        {/* Usage & Import */}
        <div class="space-y-4">
          <DocSectionHeader title="Usage" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        {/* Examples */}
        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          {/* Multiple Selection */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Multiple Selection (Toolbar)</h3>
            <p class="text-sm text-muted-foreground">
              Configure <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">type="multiple"</code> to allow selecting multiple options concurrently.
            </p>
            <ComponentPreview name="toggle-group" code={multipleCode}>
              <ToggleGroupMultipleDemo />
            </ComponentPreview>
          </div>

          {/* Sizes */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Sizes</h3>
            <p class="text-sm text-muted-foreground">
              Use the <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">size</code> prop (<code class="font-mono text-xs">sm</code>, <code class="font-mono text-xs">default</code>, <code class="font-mono text-xs">lg</code>) to adjust padding and height.
            </p>
            <ComponentPreview name="toggle-group" code={sizesCode}>
              <div class="flex flex-col items-center gap-3">
                <ToggleGroup type="single" defaultValue="grid" size="sm" variant="outline">
                  <ToggleGroupItem value="grid"><LayoutGrid class="size-3.5" /></ToggleGroupItem>
                  <ToggleGroupItem value="list"><List class="size-3.5" /></ToggleGroupItem>
                  <ToggleGroupItem value="columns"><Columns3 class="size-3.5" /></ToggleGroupItem>
                </ToggleGroup>
                <ToggleGroup type="single" defaultValue="grid" size="default" variant="outline">
                  <ToggleGroupItem value="grid"><LayoutGrid class="size-4" /></ToggleGroupItem>
                  <ToggleGroupItem value="list"><List class="size-4" /></ToggleGroupItem>
                  <ToggleGroupItem value="columns"><Columns3 class="size-4" /></ToggleGroupItem>
                </ToggleGroup>
                <ToggleGroup type="single" defaultValue="grid" size="lg" variant="outline">
                  <ToggleGroupItem value="grid"><LayoutGrid class="size-5" /></ToggleGroupItem>
                  <ToggleGroupItem value="list"><List class="size-5" /></ToggleGroupItem>
                  <ToggleGroupItem value="columns"><Columns3 class="size-5" /></ToggleGroupItem>
                </ToggleGroup>
              </div>
            </ComponentPreview>
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="ToggleGroup Props"
            items={[
              {
                prop: "type",
                type: "'single' | 'multiple'",
                default: "'single'",
                description: "Selection mode allowing one or multiple active items.",
              },
              {
                prop: "value",
                type: "string | string[]",
                default: "-",
                description: "Controlled selection state (string for single, string array for multiple).",
              },
              {
                prop: "defaultValue",
                type: "string | string[]",
                default: "-",
                description: "Uncontrolled initial selection value.",
              },
              {
                prop: "onChange",
                type: "(value: string | string[]) => void",
                default: "-",
                description: "Callback fired when selection state changes.",
              },
              {
                prop: "variant",
                type: "'default' | 'outline'",
                default: "'default'",
                description: "Visual appearance style passed down to child toggle items.",
              },
              {
                prop: "size",
                type: "'default' | 'sm' | 'lg'",
                default: "'default'",
                description: "Size dimensions passed down to child toggle items.",
              },
              {
                prop: "orientation",
                type: "'horizontal' | 'vertical'",
                default: "'horizontal'",
                description: "Layout direction of the toggle group items.",
              },
              {
                prop: "disabled",
                type: "boolean",
                default: "false",
                description: "Whether all toggle items in the group are disabled.",
              },
            ]}
          />

          <DocApiTable
            title="ToggleGroupItem Props"
            items={[
              {
                prop: "value",
                type: "string",
                default: "-",
                description: "Unique string value identifying this item within the group.",
              },
              {
                prop: "variant",
                type: "'default' | 'outline'",
                default: "Inherited",
                description: "Visual style override for this specific item.",
              },
              {
                prop: "size",
                type: "'default' | 'sm' | 'lg'",
                default: "Inherited",
                description: "Size dimensions override for this specific item.",
              },
              {
                prop: "disabled",
                type: "boolean",
                default: "false",
                description: "Whether this individual item is disabled.",
              },
            ]}
          />
        </div>

        {/* Footer Navigation */}
        <DocNextSteps
          prev={{ title: "Toggle Component", href: "/docs/components/toggle" }}
          next={{ title: "Tooltip Component", href: "/docs/components/tooltip" }}
        />
      </div>
    </>
  );
}
