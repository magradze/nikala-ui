// src/routes/docs/hooks/create-mouse-position.tsx
import { createSignal } from "solid-js";
import { createMousePosition } from "@nikala-ui/hooks";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";

const importCode = `import { createMousePosition } from "@nikala-ui/hooks";`;

const basicUsageCode = `const [cardRef, setCardRef] = createSignal<HTMLDivElement>();
const { x, y, elementX, elementY, isInside } = createMousePosition({
  target: cardRef,
});

return (
  <div ref={setCardRef} class="p-6 border rounded-lg">
    <p>Global X/Y: {Math.round(x())}, {Math.round(y())}</p>
    <p>Element Relative X/Y: {Math.round(elementX())}, {Math.round(elementY())}</p>
    <p>Is Pointer Inside: {isInside() ? "Yes" : "No"}</p>
  </div>
);`;

export function MousePositionDemo() {
  const [cardRef, setCardRef] = createSignal<HTMLDivElement>();
  const { x, y, elementX, elementY, isInside } = createMousePosition({
    target: cardRef,
  });

  return (
    <div class="space-y-4 max-w-sm w-full min-h-[180px] flex flex-col items-center justify-center text-center">
      <div
        ref={setCardRef}
        class={`w-full p-5 rounded-lg border transition-all duration-200 text-xs font-mono space-y-2 relative overflow-hidden ${
          isInside()
            ? "border-emerald-500/50 bg-emerald-500/10 shadow-md"
            : "border-border bg-card text-muted-foreground"
        }`}
      >
        <div class="text-muted-foreground">Global Page X/Y: <span class="text-foreground font-bold">{Math.round(x())}px, {Math.round(y())}px</span></div>
        <div class="text-muted-foreground">Element Relative X/Y: <span class="text-emerald-500 font-bold">{Math.round(elementX())}px, {Math.round(elementY())}px</span></div>
        <div class="text-muted-foreground">Pointer Inside: <span class="font-bold">{isInside() ? "YES" : "NO"}</span></div>
      </div>
      <p class="text-[10px] text-muted-foreground italic">Move mouse cursor over the box above</p>
    </div>
  );
}

export default function CreateMousePositionDocPage() {
  return (
    <>
      <Seo
        title="createMousePosition Primitive"
        description="SolidJS reactive primitive for tracking global and element-relative mouse pointer coordinates."
        path="/docs/hooks/create-mouse-position"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="createMousePosition"
          badge="primitive"
          description="A reactive primitive for monitoring global document mouse position and element-relative X/Y pointer coordinates for hover effects and spotlight animations."
        />

        {/* Live Interactive Hero Preview */}
        <ComponentPreview isHook name="create-mouse-position" code={basicUsageCode}>
          <MousePositionDemo />
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
            <h3 class="text-lg font-semibold tracking-tight">Track Mouse Pointer Coordinates</h3>
            <p class="text-sm text-muted-foreground">
              Pass an element ref accessor to <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">createMousePosition(&#123; target &#125;)</code> to receive element-relative <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">elementX()</code>, <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">elementY()</code>, and <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">isInside()</code> accessors.
            </p>
            <CodeBlock code={basicUsageCode} lang="tsx" />
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="CreateMousePositionReturn Accessors & Options"
            items={[
              {
                prop: "x",
                type: "Accessor<number>",
                default: "0",
                description: "Global document page X mouse coordinate in pixels.",
                required: true,
              },
              {
                prop: "y",
                type: "Accessor<number>",
                default: "0",
                description: "Global document page Y mouse coordinate in pixels.",
                required: true,
              },
              {
                prop: "elementX",
                type: "Accessor<number>",
                default: "0",
                description: "X coordinate relative to target element top-left corner.",
              },
              {
                prop: "elementY",
                type: "Accessor<number>",
                default: "0",
                description: "Y coordinate relative to target element top-left corner.",
              },
              {
                prop: "isInside",
                type: "Accessor<boolean>",
                default: "false",
                description: "Signal accessor indicating whether mouse is currently inside target element bounds.",
              },
            ]}
          />
        </div>

        {/* Footer Navigation */}
        <DocNextSteps
          prev={{ title: "createFocusTrap Primitive", href: "/docs/hooks/create-focus-trap" }}
          next={{ title: "createLongPress Primitive", href: "/docs/hooks/create-long-press" }}
        />
      </div>
    </>
  );
}
