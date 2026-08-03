// src/routes/docs/hooks/create-scroll-position.tsx
import { createSignal } from "solid-js";
import { createScrollPosition } from "@nikala-ui/hooks";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";

const importCode = `import { createScrollPosition } from "@nikala-ui/hooks";`;

const basicUsageCode = `const [containerRef, setContainerRef] = createSignal<HTMLDivElement>();
const { y, isScrolling, direction, isAtTop, isAtBottom, scrollTo } = createScrollPosition({
  target: containerRef,
});

return (
  <div ref={setContainerRef} class="h-48 overflow-auto border rounded-lg p-4">
    <p>Scroll Y: {Math.round(y())}px</p>
    <p>Direction: {direction()}</p>
    <Button onClick={() => scrollTo({ top: 0, behavior: "smooth" })}>Top</Button>
  </div>
);`;

export function ScrollPositionDemo() {
  const [containerRef, setContainerRef] = createSignal<HTMLDivElement>();
  const { y, isScrolling, direction, isAtTop, isAtBottom, scrollTo } = createScrollPosition({
    target: containerRef,
  });

  return (
    <div class="space-y-4 max-w-sm w-full min-h-[160px] flex flex-col items-center justify-center text-center">
      <div
        ref={setContainerRef}
        class="w-full h-44 p-4 rounded-xl border border-border bg-card shadow-xs overflow-y-auto relative"
      >
        <div class="sticky top-0 z-10 bg-popover/95 backdrop-blur-xs p-2 rounded-lg border border-border text-xs font-mono shadow-2xs mb-3">
          <div>Y Offset: <span class="font-bold text-foreground">{Math.round(y())}px</span></div>
          <div>Direction: <span class="font-bold text-emerald-500 uppercase">{direction()}</span></div>
          <div>Scrolling: <span class="font-bold">{isScrolling() ? "Yes" : "No"}</span></div>
        </div>

        <div class="space-y-2 text-left text-xs text-muted-foreground pb-2">
          <p class="p-2.5 rounded bg-muted/40">Item 1 — Start scrolling down...</p>
          <p class="p-2.5 rounded bg-muted/40">Item 2 — Realtime Y offset update</p>
          <p class="p-2.5 rounded bg-muted/40">Item 3 — Dynamic direction tracking (UP / DOWN)</p>
          <p class="p-2.5 rounded bg-muted/40">Item 4 — Active scrolling indicator</p>
          <p class="p-2.5 rounded bg-muted/40">Item 5 — Top & Bottom boundary signals</p>
          <p class="p-2.5 rounded bg-muted/40">Item 6 — Keep scrolling...</p>
          <p class="p-2.5 rounded bg-muted/40">Item 7 — Smooth scroll programmatically</p>
          <p class="p-2.5 rounded bg-muted/40">Item 8 — Reached bottom of scroll container!</p>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          disabled={isAtTop()}
          onClick={() => scrollTo({ top: 0, behavior: "smooth" })}
        >
          Scroll to Top
        </Button>
        <Button
          size="sm"
          variant="outline"
          disabled={isAtBottom()}
          onClick={() => scrollTo({ top: 1000, behavior: "smooth" })}
        >
          Scroll to Bottom
        </Button>
      </div>
    </div>
  );
}

export default function CreateScrollPositionDocPage() {
  return (
    <>
      <Seo
        title="createScrollPosition Primitive"
        description="SolidJS reactive primitive for tracking scroll position, scroll direction, and container bounds."
        path="/docs/hooks/create-scroll-position"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="createScrollPosition"
          badge="primitive"
          description="A reactive primitive for observing window or scrollable container scroll metrics (X/Y offsets, direction, scrolling state, top/bottom bounds)."
        />

        {/* Live Interactive Hero Preview */}
        <ComponentPreview name="create-scroll-position" code={basicUsageCode}>
          <ScrollPositionDemo />
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
            <h3 class="text-lg font-semibold tracking-tight">Track Scroll Position & Direction</h3>
            <p class="text-sm text-muted-foreground">
              Pass a target container ref or leave empty for window to track <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">y()</code>, <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">direction()</code>, and <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">isScrolling()</code> state.
            </p>
            <CodeBlock code={basicUsageCode} lang="tsx" />
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="CreateScrollPositionReturn Accessors & Options"
            items={[
              {
                prop: "x",
                type: "Accessor<number>",
                default: "0",
                description: "Horizontal scroll offset in pixels.",
                required: true,
              },
              {
                prop: "y",
                type: "Accessor<number>",
                default: "0",
                description: "Vertical scroll offset in pixels.",
                required: true,
              },
              {
                prop: "direction",
                type: "Accessor<'up' | 'down' | 'left' | 'right' | 'none'>",
                default: "'none'",
                description: "Current active scroll direction.",
              },
              {
                prop: "isScrolling",
                type: "Accessor<boolean>",
                default: "false",
                description: "Signal accessor indicating whether scroll event is actively occurring.",
              },
              {
                prop: "isAtTop",
                type: "Accessor<boolean>",
                default: "true",
                description: "Signal accessor indicating if target is scrolled to top (y <= 0).",
              },
              {
                prop: "isAtBottom",
                type: "Accessor<boolean>",
                default: "false",
                description: "Signal accessor indicating if target is scrolled to max bottom.",
              },
              {
                prop: "scrollTo",
                type: "(options: ScrollToOptions) => void",
                default: "-",
                description: "Function to programmatically scroll target element.",
              },
            ]}
          />
        </div>

        {/* Footer Navigation */}
        <DocNextSteps
          prev={{ title: "createWindowSize Primitive", href: "/docs/hooks/create-window-size" }}
          next={{ title: "Accordion Component", href: "/docs/components/accordion" }}
        />
      </div>
    </>
  );
}
