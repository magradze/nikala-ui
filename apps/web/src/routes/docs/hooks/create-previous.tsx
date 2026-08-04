// src/routes/docs/hooks/create-previous.tsx
import { createSignal } from "solid-js";
import { createPrevious } from "@nikala-ui/hooks";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";

const importCode = `import { createPrevious } from "@nikala-ui/hooks";`;

const basicUsageCode = `const [count, setCount] = createSignal(0);
const previousCount = createPrevious(count);

return (
  <div>
    <p>Current Count: {count()}</p>
    <p>Previous Count: {previousCount() ?? "None"}</p>
    <Button onClick={() => setCount(count() + 1)}>Increment</Button>
  </div>
);`;

export function PreviousDemo() {
  const [count, setCount] = createSignal(0);
  const previousCount = createPrevious(count);

  return (
    <div class="space-y-4 max-w-sm w-full min-h-[180px] flex flex-col items-center justify-center text-center">
      <div class="w-full p-4 rounded-lg border border-border bg-card shadow-xs space-y-2 text-xs font-mono">
        <div>Current Value: <span class="font-bold text-emerald-500 text-sm">{count()}</span></div>
        <div>Previous Value: <span class="font-bold text-muted-foreground">{previousCount() ?? "undefined"}</span></div>
      </div>

      <div class="flex items-center gap-2">
        <Button size="sm" onClick={() => setCount((c) => c + 1)} class="h-7 text-xs">
          Increment (+1)
        </Button>
        <Button size="sm" variant="outline" onClick={() => setCount((c) => Math.max(0, c - 1))} class="h-7 text-xs">
          Decrement (-1)
        </Button>
      </div>
    </div>
  );
}

export default function CreatePreviousDocPage() {
  return (
    <>
      <Seo
        title="createPrevious Primitive"
        description="SolidJS reactive primitive for tracking previous value of a signal accessor."
        path="/docs/hooks/create-previous"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="createPrevious"
          badge="primitive"
          description="A reactive primitive for tracking the prior value of a reactive signal accessor across state updates."
        />

        {/* Live Interactive Hero Preview */}
        <ComponentPreview name="create-previous" code={basicUsageCode}>
          <PreviousDemo />
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
            <h3 class="text-lg font-semibold tracking-tight">Track Prior Signal State</h3>
            <p class="text-sm text-muted-foreground">
              Pass a reactive signal accessor to <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">createPrevious(signal)</code> to receive an accessor for its previous value.
            </p>
            <CodeBlock code={basicUsageCode} lang="tsx" />
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="CreatePrevious Parameters & Return"
            items={[
              {
                prop: "source",
                type: "Accessor<T>",
                default: "-",
                description: "Target reactive signal accessor to observe.",
                required: true,
              },
              {
                prop: "previous",
                type: "Accessor<T | undefined>",
                default: "undefined",
                description: "Signal accessor returning previous value before last reactivity update.",
                required: true,
              },
            ]}
          />
        </div>

        {/* Footer Navigation */}
        <DocNextSteps
          prev={{ title: "createStorage Primitive", href: "/docs/hooks/create-storage" }}
          next={{ title: "Accordion Component", href: "/docs/components/accordion" }}
        />
      </div>
    </>
  );
}
