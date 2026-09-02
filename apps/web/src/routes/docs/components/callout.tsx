import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Callout, CalloutTitle, CalloutDescription } from "@/components/ui/callout";
import { Sparkles, Terminal } from "lucide-solid";

/* --- Code Snippets --- */
const importCode = `import { Callout, CalloutTitle, CalloutDescription } from "@/components/ui/callout";`;

const defaultCode = `<Callout title="Heads up!">
  Nikala UI is a lightweight, copy-paste component system built natively for Tailwind CSS v4 and SolidJS.
</Callout>`;

const variantsCode = `<div class="flex flex-col gap-4 w-full">
  <Callout variant="note" title="Note">
    This is a standard informational note highlighting general context.
  </Callout>

  <Callout variant="info" title="Important Information">
    Always wrap dynamic children with SolidJS's native <code>children()</code> memoization helper.
  </Callout>

  <Callout variant="tip" title="Pro Tip">
    Use <code>bunx @nikala-ui/cli add &lt;component&gt;</code> to install components directly into your codebase.
  </Callout>

  <Callout variant="warning" title="Deprecation Warning">
    Avoid direct prop destructuring in SolidJS to preserve fine-grained reactivity tracking.
  </Callout>

  <Callout variant="danger" title="Breaking Change">
    The maximum allowed border radius across Nikala UI is <code>rounded-lg</code>.
  </Callout>
</div>`;

const customIconCode = `<Callout
  icon={Sparkles}
  variant="tip"
  title="AI Automation"
>
  You can integrate Nikala UI with Model Context Protocol (MCP) servers for Cursor, Claude Code, and Antigravity.
</Callout>`;

const compoundCode = `<Callout variant="info">
  <CalloutTitle>Compound Composition</CalloutTitle>
  <CalloutDescription>
    You can also use Callout with explicit sub-components for advanced customized layouts.
  </CalloutDescription>
</Callout>`;

export default function CalloutDocsPage() {
  return (
    <>
      <Seo
        title="Callout Component"
        description="Semantic callout and alert block with status color variants, automatic icons, and titles for documentation and notices."
        path="/docs/components/callout"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="Callout"
          badge="ui"
          description="Displays a semantic callout notification block for documentation, articles, and notices with automatic status icons and theme variants."
        />

        {/* Hero Live Preview */}
        <ComponentPreview name="callout" code={defaultCode}>
          <div class="w-full max-w-xl">
            <Callout title="Heads up!">
              Nikala UI is a lightweight, copy-paste component system built natively for Tailwind CSS v4 and SolidJS.
            </Callout>
          </div>
        </ComponentPreview>

        {/* Usage & Import */}
        <div class="space-y-4">
          <DocSectionHeader title="Usage" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        {/* Examples */}
        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          {/* Status Variants */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Variants</h3>
            <p class="text-sm text-muted-foreground">
              Supports <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">note</code>, <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">info</code>, <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">tip</code>, <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">warning</code>, <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">danger</code>, and <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">success</code> styles.
            </p>
            <ComponentPreview name="callout" code={variantsCode}>
              <div class="flex flex-col gap-4 w-full max-w-xl">
                <Callout variant="note" title="Note">
                  This is a standard informational note highlighting general context.
                </Callout>

                <Callout variant="info" title="Important Information">
                  Always wrap dynamic children with SolidJS's native <code class="bg-muted/60 px-1 py-0.5 rounded text-xs font-mono">children()</code> memoization helper.
                </Callout>

                <Callout variant="tip" title="Pro Tip">
                  Use <code class="bg-muted/60 px-1 py-0.5 rounded text-xs font-mono">bunx @nikala-ui/cli add &lt;component&gt;</code> to install components directly.
                </Callout>

                <Callout variant="warning" title="Deprecation Warning">
                  Avoid direct prop destructuring in SolidJS to preserve fine-grained reactivity tracking.
                </Callout>

                <Callout variant="danger" title="Breaking Change">
                  The maximum allowed border radius across Nikala UI is <code class="bg-muted/60 px-1 py-0.5 rounded text-xs font-mono">rounded-lg</code>.
                </Callout>
              </div>
            </ComponentPreview>
          </div>

          {/* Custom Icon */}
          <div class="space-y-3 pt-6">
            <h3 class="text-lg font-semibold tracking-tight">Custom Icon</h3>
            <p class="text-sm text-muted-foreground">
              Pass any Lucide or custom icon component to override the default variant icon.
            </p>
            <ComponentPreview name="callout" code={customIconCode}>
              <div class="w-full max-w-xl">
                <Callout
                  icon={Sparkles}
                  variant="tip"
                  title="AI Automation"
                >
                  You can integrate Nikala UI with Model Context Protocol (MCP) servers for Cursor, Claude Code, and Antigravity.
                </Callout>
              </div>
            </ComponentPreview>
          </div>

          {/* Compound Composition */}
          <div class="space-y-3 pt-6">
            <h3 class="text-lg font-semibold tracking-tight">Compound Composition</h3>
            <p class="text-sm text-muted-foreground">
              Compose custom layouts with <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">&lt;CalloutTitle&gt;</code> and <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">&lt;CalloutDescription&gt;</code>.
            </p>
            <ComponentPreview name="callout" code={compoundCode}>
              <div class="w-full max-w-xl">
                <Callout variant="info">
                  <CalloutTitle>Compound Composition</CalloutTitle>
                  <CalloutDescription>
                    You can also use Callout with explicit sub-components for advanced customized layouts.
                  </CalloutDescription>
                </Callout>
              </div>
            </ComponentPreview>
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />
          <DocApiTable
            title="Callout"
            items={[
              {
                prop: "variant",
                type: '"note" | "info" | "tip" | "warning" | "danger" | "success"',
                default: '"note"',
                description: "Visual status style and theme variant for the callout container.",
              },
              {
                prop: "title",
                type: "string",
                default: "undefined",
                description: "Optional heading title text rendered at the top of the callout.",
              },
              {
                prop: "icon",
                type: "Component<{ class?: string }> | false",
                default: "variant default",
                description: "Custom icon component or false to disable the leading icon.",
              },
            ]}
          />
        </div>

        {/* Next Steps */}
        <DocNextSteps
          prev={{ title: "Button Group", href: "/docs/components/button-group" }}
          next={{ title: "Card", href: "/docs/components/card" }}
        />
      </div>
    </>
  );
}
