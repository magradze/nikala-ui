// src/routes/docs/hooks/create-long-press.tsx
import { createSignal } from "solid-js";
import { createLongPress } from "@nikala-ui/hooks";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";

const importCode = `import { createLongPress } from "@/hooks/create-long-press";`;

const basicUsageCode = `const [status, setStatus] = createSignal("Press & Hold for 500ms");

const { isPressed, props } = createLongPress(
  () => {
    setStatus("Long Press Triggered Successfully!");
  },
  {
    threshold: 500,
    onStart: () => setStatus("Holding... Keep pressing!"),
    onCancel: () => setStatus("Released early! Cancelled."),
  }
);

return (
  <Button {...props}>
    {isPressed() ? "Holding..." : status()}
  </Button>
);`;

export function LongPressDemo() {
  const [status, setStatus] = createSignal("Press & Hold for 500ms");

  const { isPressed, props } = createLongPress(
    () => {
      setStatus("🎉 Long Press Triggered!");
    },
    {
      threshold: 500,
      onStart: () => setStatus("Holding... keep pressing!"),
      onCancel: () => setStatus("Released early! Cancelled."),
    }
  );

  return (
    <div class="space-y-4 max-w-sm w-full min-h-[180px] flex flex-col items-center justify-center text-center">
      <Button
        variant={isPressed() ? "destructive" : "default"}
        size="lg"
        class="touch-none select-none transition-all duration-200"
        {...props}
      >
        {isPressed() ? "Holding..." : "Press & Hold Me"}
      </Button>

      <div class="p-3 rounded-lg border border-border bg-card w-full text-xs font-mono text-foreground shadow-xs">
        {status()}
      </div>
    </div>
  );
}

export default function CreateLongPressDocPage() {
  return (
    <>
      <Seo
        title="createLongPress Primitive"
        description="SolidJS reactive primitive for detecting long press / hold touch and pointer interactions."
        path="/docs/hooks/create-long-press"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="createLongPress"
          badge="primitive"
          description="A reactive primitive for detecting long press hold gestures on mouse and touch devices with configurable thresholds and state callbacks."
        />

        {/* Live Interactive Hero Preview */}
        <ComponentPreview isHook name="create-long-press" code={basicUsageCode}>
          <LongPressDemo />
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
            <h3 class="text-lg font-semibold tracking-tight">Detect Hold Gesture</h3>
            <p class="text-sm text-muted-foreground">
              Pass a callback function to <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">createLongPress(handler, &#123; threshold: 500 &#125;)</code> and spread returned <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">props</code> onto target elements.
            </p>
            <CodeBlock code={basicUsageCode} lang="tsx" />
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="CreateLongPressOptions & Return"
            items={[
              {
                prop: "threshold",
                type: "number",
                default: "500",
                description: "Hold duration in milliseconds before long press triggers.",
              },
              {
                prop: "isPressed",
                type: "() => boolean",
                default: "false",
                description: "Signal accessor indicating whether target element is currently being held.",
              },
              {
                prop: "onStart",
                type: "() => void",
                default: "-",
                description: "Callback invoked immediately when user pointer press begins.",
              },
              {
                prop: "onFinish",
                type: "() => void",
                default: "-",
                description: "Callback invoked when long press duration is successfully completed.",
              },
              {
                prop: "onCancel",
                type: "() => void",
                default: "-",
                description: "Callback invoked if pointer is released before threshold duration.",
              },
            ]}
          />
        </div>

        {/* Footer Navigation */}
        <DocNextSteps
          prev={{ title: "createMousePosition Primitive", href: "/docs/hooks/create-mouse-position" }}
          next={{ title: "createHover Primitive", href: "/docs/hooks/create-hover" }}
        />
      </div>
    </>
  );
}
