// src/routes/docs/components/skeleton.tsx
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Skeleton } from "@/components/ui/skeleton";

/* --- Code Snippets --- */
const importCode = `import { Skeleton } from "@/components/ui/skeleton";`;

const defaultCode = `<div class="flex items-center space-x-4">
  <Skeleton class="h-12 w-12 rounded-full" />
  <div class="space-y-2">
    <Skeleton class="h-4 w-50" />
    <Skeleton class="h-4 w-37.5" />
  </div>
</div>`;

const cardSkeletonCode = `<div class="flex flex-col space-y-3 max-w-xs w-full p-4 border border-border rounded-lg bg-card">
  <Skeleton class="h-31.25 w-full rounded-lg" />
  <div class="space-y-2">
    <Skeleton class="h-4 w-62.5" />
    <Skeleton class="h-4 w-50" />
  </div>
</div>`;

export default function SkeletonDocsPage() {
  return (
    <>
      <Seo
        title="Skeleton Component"
        description="Animated pulse loading placeholder for rendering content loading states in SolidJS."
        path="/docs/components/skeleton"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="Skeleton"
          badge="HTML"
          description="Used to show a pulse animated placeholder while content, user profiles, or dashboard cards are loading."
        />

        {/* Hero Live Preview */}
        <ComponentPreview name="skeleton" code={defaultCode}>
          <div class="flex items-center space-x-4">
            <Skeleton class="h-12 w-12 rounded-lg" />
            <div class="space-y-2">
              <Skeleton class="h-4 w-50" />
              <Skeleton class="h-4 w-37.5" />
            </div>
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

          {/* Card Skeleton */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Card Placeholder</h3>
            <p class="text-sm text-muted-foreground">
              Combine multiple <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">Skeleton</code> components to structure full layout placeholders.
            </p>
            <ComponentPreview name="skeleton" code={cardSkeletonCode}>
              <div class="flex flex-col space-y-3 max-w-xs w-full p-4 border border-border rounded-lg bg-card shadow-xs">
                <Skeleton class="h-31.25 w-full rounded-lg" />
                <div class="space-y-2">
                  <Skeleton class="h-4 w-50" />
                  <Skeleton class="h-4 w-37.5" />
                </div>
              </div>
            </ComponentPreview>
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="Skeleton"
            items={[
              {
                prop: "class",
                type: "string",
                description: "Tailwind CSS dimension and shape classes (e.g. h-12 w-12 rounded-full).",
              },
            ]}
          />
        </div>

        {/* Footer Navigation */}
        <DocNextSteps
          prev={{ title: "Sheet Component", href: "/docs/components/sheet" }}
          next={{ title: "Switch Component", href: "/docs/components/switch" }}
        />
      </div>
    </>
  );
}