// src/routes/docs/components/pager.tsx
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Pager, PagerLink } from "@/components/ui/pager";

/* --- Code Snippets --- */
const importCode = `import { Pager, PagerLink } from "@/components/ui/pager";`;

const defaultCode = `<Pager
  prev={{ title: "Pagination", href: "/docs/components/pagination" }}
  next={{ title: "Separator", href: "/docs/components/separator" }}
/>`;

const nextOnlyCode = `<Pager
  next={{ title: "Installation & Setup", href: "/docs/getting-started/installation" }}
/>`;

const prevOnlyCode = `<Pager
  prev={{ title: "Theming & Customization", href: "/docs/getting-started/theming" }}
/>`;

const composableCode = `<Pager>
  <PagerLink
    type="prev"
    title="Architecture Overview"
    href="/docs/architecture"
  />
  <PagerLink
    type="next"
    title="CLI Tool Reference"
    href="/docs/cli"
  />
</Pager>`;

const courseCode = `<Pager class="mt-0 pt-0 border-t-0">
  <PagerLink
    type="prev"
    title="Chapter 1: Fine-Grained Reactivity"
    href="#"
  />
  <PagerLink
    type="next"
    title="Chapter 3: SSR & Hydration Boundaries"
    href="#"
  />
</Pager>`;

export default function PagerDocsPage() {
  return (
    <>
      <Seo
        title="Pager Component"
        description="Previous and next article navigation links with card previews for documentation and blog layouts."
        path="/docs/components/pager"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="Pager"
          badge="Compound"
          description="Previous and next article navigation links with card previews for documentation and blog layouts, built on Nikala UI Card primitives."
        />

        {/* Hero Live Preview */}
        <ComponentPreview name="pager" code={defaultCode}>
          <div class="w-full max-w-2xl">
            <Pager
              prev={{ title: "Pagination", href: "/docs/components/pagination" }}
              next={{ title: "Separator", href: "/docs/components/separator" }}
            />
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

          {/* Initial Guide Step (Next Only) */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Initial Step (Next Only)</h3>
            <p class="text-sm text-muted-foreground">
              When starting an introductory guide or onboarding flow, pass only the <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">next</code> prop. The card automatically positions itself on the right column.
            </p>
            <ComponentPreview name="pager" code={nextOnlyCode}>
              <div class="w-full max-w-2xl">
                <Pager
                  next={{ title: "Installation & Setup", href: "/docs/getting-started/installation" }}
                />
              </div>
            </ComponentPreview>
          </div>

          {/* Terminal Step (Previous Only) */}
          <div class="space-y-3 pt-6">
            <h3 class="text-lg font-semibold tracking-tight">Final Step (Previous Only)</h3>
            <p class="text-sm text-muted-foreground">
              At the conclusion of a sequence, supply only the <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">prev</code> item to navigate backwards.
            </p>
            <ComponentPreview name="pager" code={prevOnlyCode}>
              <div class="w-full max-w-2xl">
                <Pager
                  prev={{ title: "Theming & Customization", href: "/docs/getting-started/theming" }}
                />
              </div>
            </ComponentPreview>
          </div>

          {/* Composable Subcomponents */}
          <div class="space-y-3 pt-6">
            <h3 class="text-lg font-semibold tracking-tight">Composable Subcomponents</h3>
            <p class="text-sm text-muted-foreground">
              Compose custom navigation layouts manually with <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">&lt;PagerLink /&gt;</code> elements inside <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">&lt;Pager /&gt;</code>.
            </p>
            <ComponentPreview name="pager" code={composableCode}>
              <div class="w-full max-w-2xl">
                <Pager>
                  <PagerLink
                    type="prev"
                    title="Architecture Overview"
                    href="/docs/architecture"
                  />
                  <PagerLink
                    type="next"
                    title="CLI Tool Reference"
                    href="/docs/cli"
                  />
                </Pager>
              </div>
            </ComponentPreview>
          </div>

          {/* Chapter / Course Navigation */}
          <div class="space-y-3 pt-6">
            <h3 class="text-lg font-semibold tracking-tight">Course & Chapter Navigation</h3>
            <p class="text-sm text-muted-foreground">
              Override border and spacing utilities using <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">class</code> for embedded curriculum and lesson walkthroughs.
            </p>
            <ComponentPreview name="pager" code={courseCode}>
              <div class="w-full max-w-2xl">
                <Pager class="mt-0 pt-0 border-t-0">
                  <PagerLink
                    type="prev"
                    title="Chapter 1: Fine-Grained Reactivity"
                    href="#"
                  />
                  <PagerLink
                    type="next"
                    title="Chapter 3: SSR & Hydration Boundaries"
                    href="#"
                  />
                </Pager>
              </div>
            </ComponentPreview>
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="Pager"
            description="Container grid rendering sequential previous and next navigation cards."
            items={[
              {
                prop: "prev",
                type: "{ title: string; href: string } | null",
                default: "undefined",
                description: "Previous documentation article destination containing title and target href.",
              },
              {
                prop: "next",
                type: "{ title: string; href: string } | null",
                default: "undefined",
                description: "Next documentation article destination containing title and target href.",
              },
              {
                prop: "class",
                type: "string",
                default: "undefined",
                description: "Optional additional CSS classes to style or override the grid container.",
              },
              {
                prop: "children",
                type: "JSX.Element",
                default: "undefined",
                description: "Custom child nodes or PagerLink components to render instead of prev/next props.",
              },
            ]}
          />

          <DocApiTable
            title="PagerLink"
            description="Individual directional navigation card built on Nikala UI Card primitive."
            items={[
              {
                prop: "type",
                type: '"prev" | "next"',
                default: "required",
                description: "Directional navigation orientation. Sets chevron icon and grid alignment.",
              },
              {
                prop: "title",
                type: "string",
                default: "required",
                description: "Article title displayed in the card header.",
              },
              {
                prop: "href",
                type: "string",
                default: "required",
                description: "Target destination URL for the link anchor.",
              },
              {
                prop: "class",
                type: "string",
                default: "undefined",
                description: "Optional additional CSS classes for the anchor wrapper.",
              },
            ]}
          />
        </div>

        {/* Footer Navigation */}
        <DocNextSteps
          prev={{ title: "Pagination", href: "/docs/components/pagination" }}
          next={{ title: "Separator", href: "/docs/components/separator" }}
        />
      </div>
    </>
  );
}
