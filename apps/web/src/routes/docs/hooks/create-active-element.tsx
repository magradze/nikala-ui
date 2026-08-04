import { createSignal, onMount, Show } from "solid-js";
import { createActiveElement } from "@nikala-ui/hooks";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const importCode = `import { createActiveElement } from "@nikala-ui/hooks";`;

const basicUsageCode = `const { activeElement, hasFocus } = createActiveElement();

return (
  <div>
    <Input placeholder="Click to focus..." />
    <Button>Or focus me</Button>
    <p>Active: {activeElement()?.tagName ?? "none"}</p>
    <p>Has Focus: {hasFocus() ? "Yes" : "No"}</p>
  </div>
);`;

export function ActiveElementDemo() {
  const [mounted, setMounted] = createSignal(false);
  onMount(() => setMounted(true));

  const { activeElement, hasFocus } = createActiveElement();

  const tagName = () => {
    const el = activeElement();
    return el ? el.tagName.toLowerCase() : "none";
  };

  const elementInfo = () => {
    const el = activeElement();
    if (!el) return "";
    const id = (el as HTMLElement).id ? `#${(el as HTMLElement).id}` : "";
    const cls = (el as HTMLElement).className
      ? `.${(el as HTMLElement).className.split(" ")[0]}`
      : "";
    return `${id}${cls}`;
  };

  return (
    <div class="space-y-4 max-w-sm w-full min-h-45 flex flex-col items-center justify-center text-center">
      <div class="w-full p-4 rounded-lg border border-border bg-card shadow-xs space-y-3 text-left">
        <div class="space-y-2">
          <Input id="demo-input-1" placeholder="Focus me (input 1)" class="h-8 text-xs" />
          <Input id="demo-input-2" placeholder="Focus me (input 2)" class="h-8 text-xs" />
          <div class="flex gap-2">
            <Button id="demo-btn-1" size="sm" variant="outline" class="h-7 text-xs flex-1 cursor-pointer">
              Button 1
            </Button>
            <Button id="demo-btn-2" size="sm" variant="secondary" class="h-7 text-xs flex-1 cursor-pointer">
              Button 2
            </Button>
          </div>
        </div>

        <div class="pt-2 border-t border-border space-y-1">
          <Show
            when={mounted()}
            fallback={
              <div class="text-xs font-mono text-muted-foreground">Loading...</div>
            }
          >
            <div class="flex items-center justify-between text-xs font-mono">
              <span class="text-muted-foreground">Has Focus:</span>
              <span class={`font-bold ${hasFocus() ? "text-emerald-500" : "text-muted-foreground"}`}>
                {hasFocus() ? "✅ Yes" : "❌ No"}
              </span>
            </div>
            <div class="flex items-center justify-between text-xs font-mono">
              <span class="text-muted-foreground">Active Element:</span>
              <span class="font-bold text-primary">
                {tagName()}{elementInfo()}
              </span>
            </div>
          </Show>
        </div>
      </div>

      <p class="text-[10px] text-muted-foreground italic">
        Click on inputs and buttons above to see the active element update.
      </p>
    </div>
  );
}

export default function CreateActiveElementDocPage() {
  return (
    <div class="space-y-10 pb-16">
      <Seo
        title="createActiveElement Primitive"
        description="SolidJS reactive primitive for tracking the currently focused DOM element."
        path="/docs/hooks/create-active-element"
      />

      {/* Page Header */}
      <DocPageHeader
        title="createActiveElement"
        badge="primitive"
        description="A reactive primitive that tracks which DOM element currently has focus, providing activeElement and hasFocus accessors."
      />

      {/* Live Interactive Hero Preview */}
      <ComponentPreview name="create-active-element" code={basicUsageCode}>
        <ActiveElementDemo />
      </ComponentPreview>

      {/* Import */}
      <div class="space-y-4">
        <DocSectionHeader title="Import" />
        <CodeBlock code={importCode} lang="tsx" />
      </div>

      {/* Examples Section */}
      <div class="space-y-8 pt-4">
        <DocSectionHeader title="Examples" />

        <div class="space-y-3">
          <h3 class="text-lg font-semibold tracking-tight">Track Focused Element</h3>
          <p class="text-sm text-muted-foreground">
            Use <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">activeElement()</code> to get the currently focused element and <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">hasFocus()</code> to check if anything non-body is focused.
          </p>
          <CodeBlock code={basicUsageCode} lang="tsx" />
        </div>
      </div>

      {/* API Reference */}
      <div class="space-y-6 pt-6">
        <DocSectionHeader title="API Reference" />

        <DocApiTable
          title="CreateActiveElementReturn"
          items={[
            {
              prop: "activeElement",
              type: "Accessor<Element | null>",
              default: "null",
              description: "Signal accessor returning the currently focused DOM element, or null.",
              required: true,
            },
            {
              prop: "hasFocus",
              type: "Accessor<boolean>",
              default: "false",
              description: "Derived accessor returning true if any element (non-body) is focused.",
              required: true,
            },
          ]}
        />
      </div>

      {/* Footer Navigation */}
      <DocNextSteps
        prev={{ title: "createIdle Primitive", href: "/docs/hooks/create-idle" }}
        next={{ title: "createInfiniteScroll Primitive", href: "/docs/hooks/create-infinite-scroll" }}
      />
    </div>
  );
}
