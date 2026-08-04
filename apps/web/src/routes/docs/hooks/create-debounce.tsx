// src/routes/docs/hooks/create-debounce.tsx
import { createSignal } from "solid-js";
import { createDebounce, createThrottle } from "@nikala-ui/hooks";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Input } from "@/components/ui/input";

const importCode = `import { createDebounce, createThrottle } from "@nikala-ui/hooks";`;

const basicUsageCode = `const [debouncedQuery, setDebouncedQuery] = createSignal("");

const handleInput = createDebounce((val: string) => {
  setDebouncedQuery(val);
}, 400);

return (
  <Input
    placeholder="Type rapidly to test debouncing..."
    onInput={(e) => handleInput(e.currentTarget.value)}
  />
);`;

export function DebounceDemo() {
  const [debouncedText, setDebouncedText] = createSignal("");
  const [rawText, setRawText] = createSignal("");

  const handleDebouncedInput = createDebounce((val: string) => {
    setDebouncedText(val);
  }, 500);

  const onInput = (e: InputEvent & { currentTarget: HTMLInputElement }) => {
    const val = e.currentTarget.value;
    setRawText(val);
    handleDebouncedInput(val);
  };

  return (
    <div class="space-y-4 max-w-sm w-full min-h-[160px] flex flex-col items-center justify-center">
      <Input
        placeholder="Type to test 500ms debounce..."
        value={rawText()}
        onInput={onInput}
      />

      <div class="w-full space-y-1 text-xs font-mono p-3 rounded-lg border border-border bg-card">
        <div class="text-muted-foreground">Raw Input: <span class="text-foreground">{rawText() || "—"}</span></div>
        <div class="text-muted-foreground">Debounced Output (500ms): <span class="text-emerald-500 font-bold">{debouncedText() || "—"}</span></div>
      </div>
    </div>
  );
}

export default function CreateDebounceDocPage() {
  return (
    <>
      <Seo
        title="createDebounce & createThrottle Primitives"
        description="SolidJS reactive primitives for debouncing and throttling rate-limited function execution."
        path="/docs/hooks/create-debounce"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="createDebounce"
          badge="primitive"
          description="Reactive primitives for debouncing and throttling function execution, ideal for search inputs, resize events, and API rate limiting."
        />

        {/* Live Interactive Hero Preview */}
        <ComponentPreview name="create-debounce" code={basicUsageCode}>
          <DebounceDemo />
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
            <h3 class="text-lg font-semibold tracking-tight">Debounced Search Input</h3>
            <p class="text-sm text-muted-foreground">
              Wrap event handler functions in <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">createDebounce(fn, delayMs)</code> to delay execution until typing pauses.
            </p>
            <CodeBlock code={basicUsageCode} lang="tsx" />
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="createDebounce & createThrottle Signature"
            items={[
              {
                prop: "fn",
                type: "(...args: any[]) => any",
                default: "-",
                description: "Target function to debounce or throttle.",
                required: true,
              },
              {
                prop: "delay",
                type: "number | Accessor<number>",
                default: "-",
                description: "Delay or interval in milliseconds.",
                required: true,
              },
              {
                prop: "clear",
                type: "() => void",
                default: "-",
                description: "Function attached to returned wrapper to cancel pending timer.",
              },
            ]}
          />
        </div>

        {/* Footer Navigation */}
        <DocNextSteps
          prev={{ title: "createMediaQuery Primitive", href: "/docs/hooks/create-media-query" }}
          next={{ title: "createIntersectionObserver Primitive", href: "/docs/hooks/create-intersection-observer" }}
        />
      </div>
    </>
  );
}
