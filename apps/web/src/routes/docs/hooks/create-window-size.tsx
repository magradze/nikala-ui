// src/routes/docs/hooks/create-window-size.tsx
import { createWindowSize } from "@nikala-ui/hooks";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";

const importCode = `import { createWindowSize } from "@nikala-ui/hooks";`;

const basicUsageCode = `const { width, height } = createWindowSize();

return (
  <div>
    <p>Window Width: {width()}px</p>
    <p>Window Height: {height()}px</p>
  </div>
);`;

export function WindowSizeDemo() {
  const { width, height } = createWindowSize();

  return (
    <div class="space-y-4 max-w-sm w-full min-h-[160px] flex flex-col items-center justify-center text-center">
      <div class="w-full p-4 rounded-xl border border-border bg-card shadow-xs text-xs font-mono space-y-1">
        <div class="text-muted-foreground">Viewport Width: <span class="text-emerald-500 font-bold">{width()}px</span></div>
        <div class="text-muted-foreground">Viewport Height: <span class="text-emerald-500 font-bold">{height()}px</span></div>
      </div>
      <p class="text-[10px] text-muted-foreground italic">Resize browser window to test reactivity</p>
    </div>
  );
}

export default function CreateWindowSizeDocPage() {
  return (
    <>
      <Seo
        title="createWindowSize Primitive"
        description="SolidJS reactive primitive for tracking window viewport inner width and height."
        path="/docs/hooks/create-window-size"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="createWindowSize"
          badge="primitive"
          description="A reactive primitive for listening to browser window resize events and tracking viewport dimensions (innerWidth and innerHeight)."
        />

        {/* Live Interactive Hero Preview */}
        <ComponentPreview name="create-window-size" code={basicUsageCode}>
          <WindowSizeDemo />
        </ComponentPreview>

        {/* Import */}
        <div class="space-y-4">
          <DocSectionHeader title="Import" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        {/* Examples Section */}
        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          {/* Basic Usage */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Track Viewport Dimensions</h3>
            <p class="text-sm text-muted-foreground">
              Call <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">createWindowSize()</code> to receive reactive <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">width()</code> and <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">height()</code> accessors.
            </p>
            <CodeBlock code={basicUsageCode} lang="tsx" />
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="CreateWindowSizeReturn Accessors"
            items={[
              {
                prop: "width",
                type: "Accessor<number>",
                default: "0",
                description: "Reactive window inner width in pixels accessor.",
                required: true,
              },
              {
                prop: "height",
                type: "Accessor<number>",
                default: "0",
                description: "Reactive window inner height in pixels accessor.",
                required: true,
              },
            ]}
          />
        </div>

        {/* Footer Navigation */}
        <DocNextSteps
          prev={{ title: "createResizeObserver Primitive", href: "/docs/hooks/create-resize-observer" }}
          next={{ title: "Accordion Component", href: "/docs/components/accordion" }}
        />
      </div>
    </>
  );
}
