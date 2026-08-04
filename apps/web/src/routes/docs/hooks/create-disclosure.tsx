// src/routes/docs/hooks/create-disclosure.tsx
import { createDisclosure } from "@nikala-ui/hooks";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";

const importCode = `import { createDisclosure } from "@nikala-ui/hooks";`;

const basicUsageCode = `const { isOpen, open, close, toggle } = createDisclosure({
  defaultIsOpen: false,
  onOpen: () => console.log("Opened!"),
  onClose: () => console.log("Closed!"),
});

return (
  <div class="space-y-4">
    <div class="flex gap-2">
      <Button onClick={toggle}>Toggle Panel</Button>
      <Button variant="outline" onClick={open}>Open</Button>
      <Button variant="outline" onClick={close}>Close</Button>
    </div>

    {isOpen() && (
      <div class="p-4 border rounded-lg bg-card">
        Disclosure Panel Content
      </div>
    )}
  </div>
);`;

export function DisclosureDemo() {
  const { isOpen, open, close, toggle } = createDisclosure({
    defaultIsOpen: false,
  });

  return (
    <div class="space-y-4 max-w-sm w-full min-h-[160px] flex flex-col items-center justify-center text-center">
      <div class="flex items-center gap-2">
        <Button variant="default" size="sm" onClick={toggle}>
          Toggle
        </Button>
        <Button variant="outline" size="sm" onClick={open}>
          Open
        </Button>
        <Button variant="outline" size="sm" onClick={close}>
          Close
        </Button>
      </div>

      {isOpen() && (
        <div class="w-full p-4 rounded-lg border border-border bg-card shadow-sm text-xs font-mono animate-in fade-in-80">
          Disclosure state is <span class="text-emerald-500 font-bold">OPEN</span>
        </div>
      )}
    </div>
  );
}

export default function CreateDisclosureDocPage() {
  return (
    <>
      <Seo
        title="createDisclosure Primitive"
        description="SolidJS reactive primitive for managing boolean open/close disclosure state with helper controls."
        path="/docs/hooks/create-disclosure"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="createDisclosure"
          badge="primitive"
          description="A reactive primitive for managing boolean disclosure state (collapsibles, modals, drawers, tooltips) with built-in open, close, and toggle handlers."
        />

        {/* Live Interactive Hero Preview */}
        <ComponentPreview isHook name="create-disclosure" code={basicUsageCode}>
          <DisclosureDemo />
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
              Use <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">open</code>, <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">close</code>, and <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">toggle</code> helper functions to control state without manual signal setters.
            </p>
            <CodeBlock code={basicUsageCode} lang="tsx" />
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="CreateDisclosureOptions & Return"
            items={[
              {
                prop: "defaultIsOpen",
                type: "boolean",
                default: "false",
                description: "Initial uncontrolled open state.",
              },
              {
                prop: "isOpen",
                type: "boolean | Accessor<boolean>",
                default: "false",
                description: "Controlled open state accessor or signal getter.",
              },
              {
                prop: "open",
                type: "() => void",
                default: "-",
                description: "Function to transition state to open (true).",
                required: true,
              },
              {
                prop: "close",
                type: "() => void",
                default: "-",
                description: "Function to transition state to closed (false).",
                required: true,
              },
              {
                prop: "toggle",
                type: "() => void",
                default: "-",
                description: "Function to invert current open state.",
                required: true,
              },
              {
                prop: "onOpen",
                type: "() => void",
                default: "-",
                description: "Callback invoked when state transitions to open.",
              },
              {
                prop: "onClose",
                type: "() => void",
                default: "-",
                description: "Callback invoked when state transitions to closed.",
              },
            ]}
          />
        </div>

        {/* Footer Navigation */}
        <DocNextSteps
          prev={{ title: "createLockScroll Primitive", href: "/docs/hooks/create-lock-scroll" }}
          next={{ title: "createMediaQuery Primitive", href: "/docs/hooks/create-media-query" }}
        />
      </div>
    </>
  );
}
