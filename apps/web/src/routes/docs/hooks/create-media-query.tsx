// src/routes/docs/hooks/create-media-query.tsx
import { createMediaQuery, createBreakpoint } from "@nikala-ui/hooks";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";

const importCode = `import { createMediaQuery, createBreakpoint } from "@nikala-ui/hooks";`;

const basicUsageCode = `const isDesktop = createMediaQuery("(min-width: 1024px)");
const { active, isMobile, isTablet } = createBreakpoint();

return (
  <div>
    <p>Active Breakpoint: {active()}</p>
    <p>Is Desktop: {isDesktop() ? "Yes" : "No"}</p>
  </div>
);`;

export function MediaQueryDemo() {
  const isDesktop = createMediaQuery("(min-width: 1024px)");
  const { active, isMobile, isTablet } = createBreakpoint();

  return (
    <div class="space-y-4 max-w-sm w-full min-h-[160px] flex flex-col items-center justify-center text-center">
      <div class="flex items-center gap-2">
        <span class="text-xs text-muted-foreground">Active Breakpoint:</span>
        <Badge variant="outline" class="font-mono text-xs uppercase px-2 py-0.5 border-primary/30 text-primary">
          {active()}
        </Badge>
      </div>

      <div class="grid grid-cols-3 gap-2 w-full text-xs font-mono">
        <div class={`p-2.5 rounded-lg border ${isMobile() ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-500 font-bold" : "border-border bg-card text-muted-foreground"}`}>
          Mobile
        </div>
        <div class={`p-2.5 rounded-lg border ${isTablet() ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-500 font-bold" : "border-border bg-card text-muted-foreground"}`}>
          Tablet
        </div>
        <div class={`p-2.5 rounded-lg border ${isDesktop() ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-500 font-bold" : "border-border bg-card text-muted-foreground"}`}>
          Desktop
        </div>
      </div>
    </div>
  );
}

export default function CreateMediaQueryDocPage() {
  return (
    <>
      <Seo
        title="createMediaQuery & createBreakpoint Primitives"
        description="SolidJS reactive primitives for tracking CSS media queries and responsive Tailwind breakpoints."
        path="/docs/hooks/create-media-query"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="createMediaQuery"
          badge="primitive"
          description="Reactive primitives for listening to CSS media queries and automatically tracking responsive Tailwind design breakpoints (sm, md, lg, xl, 2xl)."
        />

        {/* Live Interactive Hero Preview */}
        <ComponentPreview isHook name="create-media-query" code={basicUsageCode}>
          <MediaQueryDemo />
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
            <h3 class="text-lg font-semibold tracking-tight">Media Query & Breakpoint</h3>
            <p class="text-sm text-muted-foreground">
              Pass any standard CSS media query string to <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">createMediaQuery</code> or use <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">createBreakpoint()</code> for automatic Tailwind breakpoint accessors.
            </p>
            <CodeBlock code={basicUsageCode} lang="tsx" />
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="CreateBreakpointReturn Accessors"
            items={[
              {
                prop: "active",
                type: "Accessor<string>",
                default: "xs",
                description: "Signal accessor returning current active breakpoint key ('xs', 'sm', 'md', 'lg', 'xl', '2xl').",
                required: true,
              },
              {
                prop: "isMobile",
                type: "Accessor<boolean>",
                default: "false",
                description: "Signal accessor indicating if screen width is below md (<768px).",
              },
              {
                prop: "isTablet",
                type: "Accessor<boolean>",
                default: "false",
                description: "Signal accessor indicating if screen width is between md and lg (768px - 1024px).",
              },
              {
                prop: "isDesktop",
                type: "Accessor<boolean>",
                default: "false",
                description: "Signal accessor indicating if screen width is lg or above (>=1024px).",
              },
            ]}
          />
        </div>

        {/* Footer Navigation */}
        <DocNextSteps
          prev={{ title: "createDisclosure Primitive", href: "/docs/hooks/create-disclosure" }}
          next={{ title: "createDebounce Primitive", href: "/docs/hooks/create-debounce" }}
        />
      </div>
    </>
  );
}
