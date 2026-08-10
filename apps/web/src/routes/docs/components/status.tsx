import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Status } from "@/components/ui/status";

const importCode = `import { Status } from "@/components/ui/status";`;

const defaultCode = `<Status variant="success">Operational</Status>`;

const variantsCode = `<div class="flex flex-wrap items-center gap-4">
  <Status variant="success">Operational</Status>
  <Status variant="warning">Pending</Status>
  <Status variant="error">Offline</Status>
  <Status variant="info">In progress</Status>
  <Status variant="neutral">Draft</Status>
</div>`;

const sizesCode = `<div class="flex items-center gap-4">
  <Status size="sm" variant="success">Online</Status>
  <Status variant="success">Online</Status>
</div>`;

const animatedCode = `<div class="flex flex-wrap items-center gap-4">
  <Status variant="success" animation="pulse">Syncing</Status>
  <Status variant="info" animation="ping">Deploying</Status>
  <Status variant="warning" bordered>Needs attention</Status>
</div>`;

export default function StatusDocsPage() {
  return (
    <>
      <Seo
        title="Status Component"
        description="A compact semantic status indicator with a color dot and label for SolidJS."
        path="/docs/components/status"
      />

      <div class="space-y-10 pb-16">
        <DocPageHeader
          title="Status"
          badge="Feedback"
          description="Displays a compact status dot and label for communicating availability, progress, and state."
        />

        <ComponentPreview name="status" code={defaultCode}>
          <Status variant="success">Operational</Status>
        </ComponentPreview>

        <div class="space-y-4">
          <DocSectionHeader title="Usage" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Variants</h3>
            <p class="text-sm text-muted-foreground">
              Choose the semantic variant that best represents the current state.
            </p>
            <ComponentPreview name="status" code={variantsCode}>
              <div class="flex flex-wrap items-center gap-4">
                <Status variant="success">Operational</Status>
                <Status variant="warning">Pending</Status>
                <Status variant="error">Offline</Status>
                <Status variant="info">In progress</Status>
                <Status variant="neutral">Draft</Status>
              </div>
            </ComponentPreview>
          </div>

          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Sizes</h3>
            <p class="text-sm text-muted-foreground">
              Use the small size for dense tables and metadata rows.
            </p>
            <ComponentPreview name="status" code={sizesCode}>
              <div class="flex items-center gap-4">
                <Status size="sm" variant="success">Online</Status>
                <Status variant="success">Online</Status>
              </div>
            </ComponentPreview>
          </div>

          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Animation and Border</h3>
            <p class="text-sm text-muted-foreground">
              Animation is off by default. Enable <code class="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">pulse</code> or <code class="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">ping</code> for active states, and use <code class="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">bordered</code> to add a subtle variant-colored border.
            </p>
            <ComponentPreview name="status" code={animatedCode}>
              <div class="flex flex-wrap items-center gap-4">
                <Status variant="success" animation="pulse">Syncing</Status>
                <Status variant="info" animation="ping">Deploying</Status>
                <Status variant="warning" bordered>Needs attention</Status>
              </div>
            </ComponentPreview>
          </div>
        </div>

        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />
          <DocApiTable
            title="Status"
            items={[
              {
                prop: "variant",
                type: '"neutral" | "success" | "warning" | "error" | "info"',
                default: '"neutral"',
                description: "Semantic color used for the status dot and label.",
              },
              {
                prop: "size",
                type: '"sm" | "default"',
                default: '"default"',
                description: "Controls the text, dot, and gap size.",
              },
              {
                prop: "animation",
                type: '"none" | "pulse" | "ping"',
                default: '"none"',
                description: "Optional animation applied to the status dot.",
              },
              {
                prop: "bordered",
                type: "boolean",
                default: "false",
                description: "Adds a subtle border using the selected status variant color.",
              },
              {
                prop: "children",
                type: "JSX.Element",
                description: "Visible status label content.",
              },
            ]}
          />
        </div>

        <DocNextSteps
          prev={{ title: "Skeleton Component", href: "/docs/components/skeleton" }}
          next={{ title: "Spinner Component", href: "/docs/components/spinner" }}
        />
      </div>
    </>
  );
}
