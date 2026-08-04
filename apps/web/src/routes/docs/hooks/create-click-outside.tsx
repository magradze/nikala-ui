// src/routes/docs/hooks/create-click-outside.tsx
import { createSignal } from "solid-js";
import { createClickOutside } from "@nikala-ui/hooks";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";

/* --- Code Snippets --- */
const importCode = `import { createClickOutside } from "@nikala-ui/hooks";`;

const basicUsageCode = `const [open, setOpen] = createSignal(false);
let containerRef: HTMLDivElement | undefined;
let buttonRef: HTMLButtonElement | undefined;

createClickOutside({
  target: () => containerRef,
  ignore: () => buttonRef,
  enabled: () => open(),
  onInteractOutside: () => setOpen(false),
});

return (
  <div class="relative">
    <Button ref={buttonRef} onClick={() => setOpen(!open())}>
      Toggle Card
    </Button>

    <Show when={open()}>
      <div ref={containerRef} class="absolute mt-2 p-4 bg-popover border rounded-lg shadow-md">
        Click outside this card to dismiss.
      </div>
    </Show>
  </div>
);`;

const multipleTargetsCode = `let cardOneRef: HTMLDivElement | undefined;
let cardTwoRef: HTMLDivElement | undefined;

createClickOutside({
  target: [() => cardOneRef, () => cardTwoRef],
  onInteractOutside: (e) => {
    console.log("Clicked outside both cards!", e);
  },
});`;

export function ClickOutsideDemo() {
  const [isOpen, setIsOpen] = createSignal(false);
  let cardRef: HTMLDivElement | undefined;
  let triggerRef: HTMLButtonElement | undefined;

  createClickOutside({
    target: () => cardRef,
    ignore: () => triggerRef,
    enabled: () => isOpen(),
    onInteractOutside: () => setIsOpen(false),
  });

  return (
    <div class="space-y-4 max-w-sm w-full min-h-[160px] flex flex-col items-center justify-center">
      <Button
        ref={triggerRef}
        variant={isOpen() ? "secondary" : "default"}
        onClick={() => setIsOpen(!isOpen())}
      >
        {isOpen() ? "Close Floating Card" : "Open Floating Card"}
      </Button>

      {isOpen() && (
        <div
          ref={cardRef}
          class="w-full p-4 rounded-lg border border-border bg-card shadow-lg animate-in fade-in-80 zoom-in-95 space-y-2 text-center"
        >
          <div class="text-xs font-semibold text-foreground">Floating Panel Active</div>
          <p class="text-xs text-muted-foreground">
            Click anywhere outside this panel to automatically close it.
          </p>
        </div>
      )}
    </div>
  );
}

export default function CreateClickOutsideDocPage() {
  return (
    <>
      <Seo
        title="createClickOutside Primitive"
        description="SolidJS reactive primitive for detecting user interactions outside target elements."
        path="/docs/hooks/create-click-outside"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="createClickOutside"
          badge="primitive"
          description="A reactive primitive for detecting pointer and touch interactions outside target container elements."
        />

        {/* Live Interactive Hero Preview */}
        <ComponentPreview name="create-click-outside" code={basicUsageCode}>
          <ClickOutsideDemo />
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
            <h3 class="text-lg font-semibold tracking-tight">Basic Usage with Element Ref</h3>
            <p class="text-sm text-muted-foreground">
              Pass a container <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">target</code> ref and optional <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">ignore</code> trigger element to prevent immediate re-triggering.
            </p>
            <CodeBlock code={basicUsageCode} lang="tsx" />
          </div>

          {/* Multiple Targets */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Multiple Target Containers</h3>
            <p class="text-sm text-muted-foreground">
              Pass an array of element accessors to <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">target</code> to treat multiple elements as a unified inside area.
            </p>
            <CodeBlock code={multipleTargetsCode} lang="tsx" />
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="CreateClickOutsideOptions"
            items={[
              {
                prop: "target",
                type: "HTMLElement | Accessor<HTMLElement | undefined> | (HTMLElement | Accessor<HTMLElement | undefined>)[]",
                default: "-",
                description: "Target HTML element or array of accessors to detect outside clicks for.",
                required: true,
              },
              {
                prop: "onInteractOutside",
                type: "(event: MouseEvent | PointerEvent | TouchEvent) => void",
                default: "-",
                description: "Callback fired when a user interacts outside the target elements.",
                required: true,
              },
              {
                prop: "enabled",
                type: "boolean | Accessor<boolean>",
                default: "true",
                description: "Whether the outside click listener is active.",
              },
              {
                prop: "ignore",
                type: "HTMLElement | Accessor<HTMLElement | undefined> | (HTMLElement | Accessor<HTMLElement | undefined>)[]",
                default: "-",
                description: "Element(s) to ignore when checking for outside clicks (e.g. trigger buttons).",
              },
            ]}
          />
        </div>

        {/* Footer Navigation */}
        <DocNextSteps
          prev={{ title: "createControllableSignal Primitive", href: "/docs/hooks/create-controllable-signal" }}
          next={{ title: "createClipboard Primitive", href: "/docs/hooks/create-clipboard" }}
        />
      </div>
    </>
  );
}
