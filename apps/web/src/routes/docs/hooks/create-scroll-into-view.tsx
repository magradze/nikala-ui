import { createScrollIntoView } from "@nikala-ui/hooks";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";
import { createSignal, onMount, Show, For } from "solid-js";

const importCode = `import { createScrollIntoView } from "@nikala-ui/hooks";`;

const basicUsageCode = `const [targetRef, setTargetRef] = createSignal<HTMLElement | null>(null);

createScrollIntoView(targetRef, {
  behavior: "smooth",
  block: "center",
});

return (
  <div class="h-40 overflow-y-auto border p-4 space-y-20">
    <p>Top Container Content</p>
    <div ref={setTargetRef} class="bg-primary text-primary-foreground p-3 rounded">
      Target Element Scrolled Into View!
    </div>
    <p>Bottom Container Content</p>
  </div>
);`;

export function ScrollIntoViewDemo() {
  const [mounted, setMounted] = createSignal(false);
  onMount(() => setMounted(true));

  const [targetIndex, setTargetIndex] = createSignal(0);
  const itemRefs: HTMLElement[] = [];

  const activeElement = () => itemRefs[targetIndex()];

  createScrollIntoView(activeElement, {
    behavior: "smooth",
    block: "center",
  });

  const items = Array.from({ length: 15 }, (_, i) => `Item #${i + 1}`);

  return (
    <Show when={mounted()} fallback={<div class="p-4 text-xs font-mono text-muted-foreground">Loading ScrollIntoView...</div>}>
      <div class="w-full max-w-sm p-5 rounded-lg border border-border bg-card space-y-4 shadow-sm">
        <div class="flex items-center justify-between">
          <span class="text-xs font-mono text-muted-foreground">ScrollIntoView Primitive</span>
          <span class="text-[11px] font-mono text-primary font-semibold">Active: Item #{targetIndex() + 1}</span>
        </div>

        <div class="grid grid-cols-3 gap-1.5">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setTargetIndex(0)}
          >
            First (#1)
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setTargetIndex(7)}
          >
            Middle (#8)
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setTargetIndex(14)}
          >
            Last (#15)
          </Button>
        </div>

        <div class="h-48 overflow-y-auto rounded-lg border border-border/50 bg-muted/30 p-2 space-y-1.5">
          <For each={items}>
            {(item, idx) => (
              <div
                ref={(el) => {
                  itemRefs[idx()] = el;
                }}
                class={`p-2.5 rounded-md text-xs font-mono transition-colors ${
                  idx() === targetIndex()
                    ? "bg-primary text-primary-foreground font-bold shadow-xs"
                    : "bg-background text-foreground border border-border/40"
                }`}
              >
                {item}
              </div>
            )}
          </For>
        </div>
      </div>
    </Show>
  );
}

export default function CreateScrollIntoViewDocPage() {
  return (
    <>
      <Seo
        title="createScrollIntoView Primitive"
        description="SolidJS reactive primitive for scrolling a target element into view smooth or auto behavior."
        path="/docs/hooks/create-scroll-into-view"
      />

      <div class="space-y-10 pb-16">
        <DocPageHeader
          title="createScrollIntoView"
          badge="primitive"
          description="Reactive primitive for smoothly scrolling target elements or refs into view inside scrollable containers or window viewports."
        />

        <ComponentPreview isHook name="create-scroll-into-view" code={basicUsageCode}>
          <ScrollIntoViewDemo />
        </ComponentPreview>

        <div class="space-y-4">
          <DocSectionHeader title="Import" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Auto-scrolling Active Element</h3>
            <p class="text-sm text-muted-foreground">
              Pass an element ref or signal accessor to <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">createScrollIntoView(targetRef, options)</code>.
            </p>
            <CodeBlock code={basicUsageCode} lang="tsx" />
          </div>
        </div>

        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="CreateScrollIntoViewOptions"
            items={[
              {
                prop: "behavior",
                type: "'smooth' | 'instant' | 'auto'",
                default: "'smooth'",
                description: "Scroll animation transition behavior.",
              },
              {
                prop: "block",
                type: "'start' | 'center' | 'end' | 'nearest'",
                default: "'nearest'",
                description: "Vertical alignment position inside container viewport.",
              },
              {
                prop: "inline",
                type: "'start' | 'center' | 'end' | 'nearest'",
                default: "'nearest'",
                description: "Horizontal alignment position inside container viewport.",
              },
              {
                prop: "enabled",
                type: "boolean | Accessor<boolean>",
                default: "true",
                description: "Whether scrollIntoView execution is enabled.",
              },
              {
                prop: "delay",
                type: "number",
                default: "0",
                description: "Delay in milliseconds before executing scrollIntoView animation.",
              },
            ]}
          />
        </div>

        <DocNextSteps
          prev={{ title: "createEventSource Primitive", href: "/docs/hooks/create-event-source" }}
          next={{ title: "createOrientation Primitive", href: "/docs/hooks/create-orientation" }}
        />
      </div>
    </>
  );
}
