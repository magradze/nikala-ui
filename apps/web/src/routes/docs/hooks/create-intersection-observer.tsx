import { createSignal } from "solid-js";
import { createInView } from "@nikala-ui/hooks";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";

const importCode = `import { createIntersectionObserver, createInView } from "@nikala-ui/hooks";`;

const basicUsageCode = `const [cardRef, setCardRef] = createSignal<HTMLDivElement>();
const isInView = createInView(cardRef, { threshold: 0.5 });

return (
  <div ref={setCardRef} class="p-6 border rounded-lg">
    {isInView() ? "Element is Visible in Viewport!" : "Scroll to see element"}
  </div>
);`;

export function IntersectionObserverDemo() {
  const [cardRef, setCardRef] = createSignal<HTMLDivElement>();
  const isInView = createInView(cardRef, { threshold: 0.5 });

  return (
    <div class="space-y-4 max-w-sm w-full min-h-[160px] flex flex-col items-center justify-center text-center">
      <div
        ref={setCardRef}
        class={`w-full p-4 rounded-lg border transition-all duration-300 ${
          isInView()
            ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-500 font-bold shadow-md"
            : "border-border bg-card text-muted-foreground"
        }`}
      >
        <div class="text-xs font-mono">
          {isInView() ? "Target In Viewport (Visible)" : "Target Out of Viewport"}
        </div>
      </div>
    </div>
  );
}

export default function CreateIntersectionObserverDocPage() {
  return (
    <>
      <Seo
        title="createIntersectionObserver & createInView Primitives"
        description="SolidJS reactive primitives for observing element visibility and viewport intersection status."
        path="/docs/hooks/create-intersection-observer"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="createIntersectionObserver"
          badge="primitive"
          description="Reactive primitives for monitoring element visibility, viewport intersections, and triggering scroll animations or lazy loading."
        />

        {/* Live Interactive Hero Preview */}
        <ComponentPreview isHook name="create-intersection-observer" code={basicUsageCode}>
          <IntersectionObserverDemo />
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
            <h3 class="text-lg font-semibold tracking-tight">Detect Element Viewport Visibility</h3>
            <p class="text-sm text-muted-foreground">
              Pass an element ref accessor to <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">createInView(ref)</code> to receive a reactive boolean signal indicating when the element enters the viewport.
            </p>
            <CodeBlock code={basicUsageCode} lang="tsx" />
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="CreateIntersectionObserverOptions & Parameters"
            items={[
              {
                prop: "target",
                type: "HTMLElement | Accessor<HTMLElement | undefined>",
                default: "-",
                description: "Target HTML element or ref accessor to observe.",
                required: true,
              },
              {
                prop: "threshold",
                type: "number | number[]",
                default: "0",
                description: "Ratio of target visibility required to trigger intersection callback.",
              },
              {
                prop: "rootMargin",
                type: "string",
                default: "0px",
                description: "Margin around root element (e.g. '10px 20px 30px 40px').",
              },
              {
                prop: "enabled",
                type: "boolean | Accessor<boolean>",
                default: "true",
                description: "Whether the IntersectionObserver is currently active.",
              },
            ]}
          />
        </div>

        {/* Footer Navigation */}
        <DocNextSteps
          prev={{ title: "createDebounce Primitive", href: "/docs/hooks/create-debounce" }}
          next={{ title: "createTimer Primitive", href: "/docs/hooks/create-timer" }}
        />
      </div>
    </>
  );
}
