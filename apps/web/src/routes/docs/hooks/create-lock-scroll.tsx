// src/routes/docs/hooks/create-lock-scroll.tsx
import { createSignal } from "solid-js";
import { createLockScroll } from "@nikala-ui/hooks";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";

const importCode = `import { createLockScroll } from "@nikala-ui/hooks";`;

const basicUsageCode = `const [locked, setLocked] = createSignal(false);

createLockScroll({
  enabled: () => locked(),
});

return (
  <Button onClick={() => setLocked(!locked())}>
    {locked() ? "Unlock Scroll" : "Lock Scroll"}
  </Button>
);`;

export function LockScrollDemo() {
  const [locked, setLocked] = createSignal(false);

  createLockScroll({
    enabled: () => locked(),
  });

  return (
    <div class="space-y-4 max-w-sm w-full min-h-[160px] flex flex-col items-center justify-center text-center">
      <Button
        variant={locked() ? "destructive" : "default"}
        onClick={() => setLocked(!locked())}
      >
        {locked() ? "Unlock Body Scroll" : "Lock Body Scroll"}
      </Button>
      <p class="text-xs text-muted-foreground">
        {locked()
          ? "Body scroll is locked (overflow: hidden)."
          : "Body scroll is active and free."}
      </p>
    </div>
  );
}

export default function CreateLockScrollDocPage() {
  return (
    <>
      <Seo
        title="createLockScroll Primitive"
        description="SolidJS reactive primitive for locking body or container scrolling when overlays are active."
        path="/docs/hooks/create-lock-scroll"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="createLockScroll"
          badge="primitive"
          description="A reactive primitive for locking scroll on document.body or custom target elements when modals, sheets, or mobile navigation drawers are active."
        />

        {/* Live Interactive Hero Preview */}
        <ComponentPreview name="create-lock-scroll" code={basicUsageCode}>
          <LockScrollDemo />
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
            <h3 class="text-lg font-semibold tracking-tight">Basic Usage</h3>
            <p class="text-sm text-muted-foreground">
              Pass a getter function for <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">enabled</code> to dynamically toggle scroll locking.
            </p>
            <CodeBlock code={basicUsageCode} lang="tsx" />
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="CreateLockScrollOptions & Return"
            items={[
              {
                prop: "enabled",
                type: "boolean | Accessor<boolean>",
                default: "true",
                description: "Whether scroll locking is currently active.",
              },
              {
                prop: "target",
                type: "HTMLElement | Accessor<HTMLElement | undefined>",
                default: "document.body",
                description: "Target element to apply scroll lock to.",
              },
              {
                prop: "isLocked",
                type: "Accessor<boolean>",
                default: "false",
                description: "Signal accessor indicating if scroll is currently locked.",
              },
              {
                prop: "setLocked",
                type: "(locked: boolean) => void",
                default: "-",
                description: "Function to programmatically toggle scroll lock.",
              },
            ]}
          />
        </div>

        {/* Footer Navigation */}
        <DocNextSteps
          prev={{ title: "createKeybindings Primitive", href: "/docs/hooks/create-keybindings" }}
          next={{ title: "Accordion Component", href: "/docs/components/accordion" }}
        />
      </div>
    </>
  );
}
