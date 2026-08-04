// src/routes/docs/hooks/create-focus-trap.tsx
import { createSignal } from "solid-js";
import { createFocusTrap } from "@nikala-ui/hooks";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const importCode = `import { createFocusTrap } from "@/hooks/create-focus-trap";`;

const basicUsageCode = `const [containerRef, setContainerRef] = createSignal<HTMLDivElement>();
const [active, setActive] = createSignal(false);

createFocusTrap(containerRef, {
  enabled: () => active(),
});

return (
  <div class="space-y-4">
    <Button onClick={() => setActive(!active())}>
      {active() ? "Deactivate Trap" : "Activate Focus Trap"}
    </Button>

    <div ref={setContainerRef} class="p-6 border rounded-lg space-y-3">
      <Input placeholder="First focusable input" />
      <Input placeholder="Second focusable input" />
      <Button variant="secondary">Action Button</Button>
    </div>
  </div>
);`;

export function FocusTrapDemo() {
  const [containerRef, setContainerRef] = createSignal<HTMLDivElement>();
  const [active, setActive] = createSignal(false);

  createFocusTrap(containerRef, {
    enabled: () => active(),
  });

  return (
    <div class="space-y-4 max-w-sm w-full min-h-[180px] flex flex-col items-center justify-center text-center">
      <Button
        variant={active() ? "destructive" : "default"}
        size="sm"
        onClick={() => setActive(!active())}
      >
        {active() ? "Deactivate Focus Trap" : "Activate Focus Trap (Press Tab)"}
      </Button>

      <div
        ref={setContainerRef}
        class={`w-full p-4 rounded-lg border transition-all duration-300 space-y-3 text-left ${
          active()
            ? "border-emerald-500/50 bg-emerald-500/5 shadow-md ring-2 ring-emerald-500/20"
            : "border-border bg-card"
        }`}
      >
        <div class="text-xs font-semibold text-foreground">
          {active() ? "Focus Trap Active (Tab wraps inside box)" : "Focus Trap Inactive"}
        </div>
        <Input placeholder="First Input Element" class="h-8 text-xs" />
        <Input placeholder="Second Input Element" class="h-8 text-xs" />
        <div class="flex justify-end gap-2">
          <Button size="sm" variant="outline" class="h-7 text-xs">
            Cancel
          </Button>
          <Button size="sm" class="h-7 text-xs">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function CreateFocusTrapDocPage() {
  return (
    <>
      <Seo
        title="createFocusTrap Primitive"
        description="SolidJS reactive primitive for trapping keyboard focus inside target container element for accessibility (WCAG)."
        path="/docs/hooks/create-focus-trap"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="createFocusTrap"
          badge="primitive"
          description="A reactive primitive for trapping keyboard focus inside open modals, dialogs, drawers, and popovers to ensure WCAG 2.1 accessibility compliance."
        />

        {/* Live Interactive Hero Preview */}
        <ComponentPreview isHook name="create-focus-trap" code={basicUsageCode}>
          <FocusTrapDemo />
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
            <h3 class="text-lg font-semibold tracking-tight">Trap Focus inside Container</h3>
            <p class="text-sm text-muted-foreground">
              Pass a container ref to <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">createFocusTrap(ref, &#123; enabled &#125;)</code> to constrain <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">Tab</code> and <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">Shift+Tab</code> navigation inside the container.
            </p>
            <CodeBlock code={basicUsageCode} lang="tsx" />
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="CreateFocusTrapOptions & Parameters"
            items={[
              {
                prop: "target",
                type: "HTMLElement | Accessor<HTMLElement | undefined>",
                default: "-",
                description: "Target HTML element or ref accessor to trap focus inside.",
                required: true,
              },
              {
                prop: "enabled",
                type: "boolean | Accessor<boolean>",
                default: "true",
                description: "Whether focus trap navigation is currently active.",
              },
              {
                prop: "returnFocusOnDeactivate",
                type: "boolean",
                default: "true",
                description: "Whether to restore focus to previously active element on trap deactivation.",
              },
            ]}
          />
        </div>

        {/* Footer Navigation */}
        <DocNextSteps
          prev={{ title: "createScrollPosition Primitive", href: "/docs/hooks/create-scroll-position" }}
          next={{ title: "createMousePosition Primitive", href: "/docs/hooks/create-mouse-position" }}
        />
      </div>
    </>
  );
}
