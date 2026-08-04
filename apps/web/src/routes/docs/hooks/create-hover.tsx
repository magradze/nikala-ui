// src/routes/docs/hooks/create-hover.tsx
import { createHover } from "@nikala-ui/hooks";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";

const importCode = `import { createHover } from "@nikala-ui/hooks";`;

const basicUsageCode = `const { isHovered, props } = createHover({
  delayEnter: 200,
  delayLeave: 200,
});

return (
  <div {...props} class="p-6 border rounded-lg">
    {isHovered() ? "Hovered!" : "Hover over me"}
  </div>
);`;

export function HoverDemo() {
  const { isHovered, props } = createHover({
    delayEnter: 200,
    delayLeave: 200,
  });

  return (
    <div class="space-y-4 max-w-sm w-full min-h-[180px] flex flex-col items-center justify-center text-center">
      <div
        {...props}
        class={`w-full p-6 rounded-lg border transition-all duration-300 text-xs font-mono space-y-1 cursor-pointer select-none ${
          isHovered()
            ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-500 font-bold shadow-md scale-102"
            : "border-border bg-card text-muted-foreground"
        }`}
      >
        <div>{isHovered() ? "✨ Element Hovered! (200ms delay active)" : "Hover mouse over this card"}</div>
      </div>
      <p class="text-[10px] text-muted-foreground italic">200ms enter & leave debounced hover delay</p>
    </div>
  );
}

export default function CreateHoverDocPage() {
  return (
    <>
      <Seo
        title="createHover Primitive"
        description="SolidJS reactive primitive for tracking element hover state with entrance and exit delays."
        path="/docs/hooks/create-hover"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="createHover"
          badge="primitive"
          description="A reactive primitive for monitoring element pointer hover interactions with optional debounced entrance and exit delay parameters."
        />

        {/* Live Interactive Hero Preview */}
        <ComponentPreview isHook name="create-hover" code={basicUsageCode}>
          <HoverDemo />
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
            <h3 class="text-lg font-semibold tracking-tight">Track Delayed Hover State</h3>
            <p class="text-sm text-muted-foreground">
              Pass delay options to <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">createHover(&#123; delayEnter: 200, delayLeave: 200 &#125;)</code> and spread returned <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">props</code> onto target elements.
            </p>
            <CodeBlock code={basicUsageCode} lang="tsx" />
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="CreateHoverOptions & Return"
            items={[
              {
                prop: "delayEnter",
                type: "number",
                default: "0",
                description: "Delay in milliseconds before setting hover state to true.",
              },
              {
                prop: "delayLeave",
                type: "number",
                default: "0",
                description: "Delay in milliseconds before setting hover state to false.",
              },
              {
                prop: "isHovered",
                type: "Accessor<boolean>",
                default: "false",
                description: "Signal accessor indicating whether target element is hovered.",
                required: true,
              },
              {
                prop: "onHoverStart",
                type: "() => void",
                default: "-",
                description: "Callback fired when hover state transitions to true.",
              },
              {
                prop: "onHoverEnd",
                type: "() => void",
                default: "-",
                description: "Callback fired when hover state transitions to false.",
              },
            ]}
          />
        </div>

        {/* Footer Navigation */}
        <DocNextSteps
          prev={{ title: "createLongPress Primitive", href: "/docs/hooks/create-long-press" }}
          next={{ title: "createLocalStorage Primitive", href: "/docs/hooks/create-storage" }}
        />
      </div>
    </>
  );
}
