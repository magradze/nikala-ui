// src/routes/docs/hooks/create-resize-observer.tsx
import { createSignal } from "solid-js";
import { createElementSize } from "@nikala-ui/hooks";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";

import { Button } from "@/components/ui/button";

const importCode = `import { createResizeObserver, createElementSize } from "@/hooks/create-resize-observer";`;

const basicUsageCode = `const [containerRef, setContainerRef] = createSignal<HTMLDivElement>();
const { width, height } = createElementSize(containerRef);

return (
  <div ref={setContainerRef} class="p-6 border rounded-lg resize overflow-auto">
    <p>Width: {Math.round(width())}px</p>
    <p>Height: {Math.round(height())}px</p>
  </div>
);`;

export function ResizeObserverDemo() {
  const [containerRef, setContainerRef] = createSignal<HTMLDivElement>();
  const [containerWidth, setContainerWidth] = createSignal<string>("100%");
  const { width, height } = createElementSize(containerRef);

  return (
    <div class="space-y-4 max-w-sm w-full min-h-[180px] flex flex-col items-center justify-center text-center">
      {/* Preset Width Controls */}
      <div class="flex items-center gap-1.5">
        <span class="text-xs text-muted-foreground mr-1">Width Preset:</span>
        <Button
          size="sm"
          variant={containerWidth() === "100%" ? "default" : "outline"}
          class="h-7 text-xs px-2"
          onClick={() => setContainerWidth("100%")}
        >
          100%
        </Button>
        <Button
          size="sm"
          variant={containerWidth() === "75%" ? "default" : "outline"}
          class="h-7 text-xs px-2"
          onClick={() => setContainerWidth("75%")}
        >
          75%
        </Button>
        <Button
          size="sm"
          variant={containerWidth() === "50%" ? "default" : "outline"}
          class="h-7 text-xs px-2"
          onClick={() => setContainerWidth("50%")}
        >
          50%
        </Button>
      </div>

      {/* Resizable Target Element */}
      <div
        ref={setContainerRef}
        style={{ width: containerWidth() }}
        class="p-4 rounded-lg border border-border bg-card shadow-xs transition-all duration-300 min-h-[100px] flex flex-col items-center justify-center"
      >
        <div class="text-xs font-mono space-y-1">
          <div class="text-muted-foreground">Width: <span class="text-emerald-500 font-bold">{Math.round(width())}px</span></div>
          <div class="text-muted-foreground">Height: <span class="text-emerald-500 font-bold">{Math.round(height())}px</span></div>
        </div>
        <p class="text-[10px] text-muted-foreground mt-2 italic">Click preset buttons or resize window</p>
      </div>
    </div>
  );
}

export default function CreateResizeObserverDocPage() {
  return (
    <>
      <Seo
        title="createResizeObserver & createElementSize Primitives"
        description="SolidJS reactive primitives for tracking element width and height dimensions dynamically."
        path="/docs/hooks/create-resize-observer"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="createResizeObserver"
          badge="primitive"
          description="Reactive primitives for monitoring element dimension changes (width, height) using native ResizeObserver API."
        />

        {/* Live Interactive Hero Preview */}
        <ComponentPreview isHook name="create-resize-observer" code={basicUsageCode}>
          <ResizeObserverDemo />
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
            <h3 class="text-lg font-semibold tracking-tight">Track Element Dimensions</h3>
            <p class="text-sm text-muted-foreground">
              Pass an element ref accessor to <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">createElementSize(ref)</code> to receive reactive <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">width()</code> and <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">height()</code> accessors.
            </p>
            <CodeBlock code={basicUsageCode} lang="tsx" />
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="CreateElementSizeReturn & Options"
            items={[
              {
                prop: "width",
                type: "Accessor<number>",
                default: "0",
                description: "Reactive width in pixels accessor.",
                required: true,
              },
              {
                prop: "height",
                type: "Accessor<number>",
                default: "0",
                description: "Reactive height in pixels accessor.",
                required: true,
              },
              {
                prop: "target",
                type: "HTMLElement | Accessor<HTMLElement | undefined>",
                default: "-",
                description: "Target HTML element or ref accessor to observe.",
                required: true,
              },
              {
                prop: "box",
                type: "ResizeObserverBoxOptions",
                default: "content-box",
                description: "Observer box model ('content-box', 'border-box', 'device-pixel-content-box').",
              },
            ]}
          />
        </div>

        {/* Footer Navigation */}
        <DocNextSteps
          prev={{ title: "createTimer Primitive", href: "/docs/hooks/create-timer" }}
          next={{ title: "createWindowSize Primitive", href: "/docs/hooks/create-window-size" }}
        />
      </div>
    </>
  );
}
