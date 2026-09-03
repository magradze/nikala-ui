import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { SectionHeading } from "@/components/ui/section-heading";

/* --- Code Snippets --- */
const importCode = `import { SectionHeading } from "@/components/ui/section-heading";`;

const pageCode = `<SectionHeading
  variant="page"
  title="Button"
  badge="ui"
  description="A versatile interactive button component with multiple variants and sizes."
/>`;

const sectionCode = `<SectionHeading
  variant="section"
  title="ButtonProps"
  badge="Props"
  description="Configuration options for the Button component."
/>`;

const noBadgeCode = `<SectionHeading
  variant="section"
  title="Installation"
  description="Follow these steps to add the component to your project."
/>`;

const badgeVariantCode = `<SectionHeading
  variant="page"
  title="Dialog"
  badge="New"
  badgeVariant="default"
  description="A modal dialog component with overlay and focus trapping."
/>`;

export default function SectionHeadingDocsPage() {
  return (
    <>
      <Seo
        title="Section Heading Component"
        description="Reusable heading block with title, optional badge, and description. Supports page and section layout variants."
        path="/docs/components/section-heading"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="Section Heading"
          badge="ui"
          description="A reusable heading block with title, optional badge, and description. Use variant='page' for top-level headers and variant='section' for sub-section headers."
        />

        {/* Hero Live Preview */}
        <ComponentPreview name="section-heading" code={pageCode}>
          <div class="w-full max-w-xl">
            <SectionHeading
              variant="page"
              title="Button"
              badge="ui"
              description="A versatile interactive button component with multiple variants and sizes."
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

          {/* Page Variant */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Page Variant</h3>
            <p class="text-sm text-muted-foreground">
              Large heading with <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">h1</code> tag for top-level page headers.
            </p>
            <ComponentPreview name="section-heading" code={pageCode}>
              <div class="w-full max-w-xl">
                <SectionHeading
                  variant="page"
                  title="Button"
                  badge="ui"
                  description="A versatile interactive button component with multiple variants and sizes."
                />
              </div>
            </ComponentPreview>
          </div>

          {/* Section Variant */}
          <div class="space-y-3 pt-6">
            <h3 class="text-lg font-semibold tracking-tight">Section Variant</h3>
            <p class="text-sm text-muted-foreground">
              Compact heading with <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">h3</code> tag for sub-sections like API reference tables.
            </p>
            <ComponentPreview name="section-heading" code={sectionCode}>
              <div class="w-full max-w-xl">
                <SectionHeading
                  variant="section"
                  title="ButtonProps"
                  badge="Props"
                  description="Configuration options for the Button component."
                />
              </div>
            </ComponentPreview>
          </div>

          {/* Without Badge */}
          <div class="space-y-3 pt-6">
            <h3 class="text-lg font-semibold tracking-tight">Without Badge</h3>
            <p class="text-sm text-muted-foreground">
              Badge is optional — omit it for simple headings without a label.
            </p>
            <ComponentPreview name="section-heading" code={noBadgeCode}>
              <div class="w-full max-w-xl">
                <SectionHeading
                  variant="section"
                  title="Installation"
                  description="Follow these steps to add the component to your project."
                />
              </div>
            </ComponentPreview>
          </div>

          {/* Badge Variant */}
          <div class="space-y-3 pt-6">
            <h3 class="text-lg font-semibold tracking-tight">Badge Variant</h3>
            <p class="text-sm text-muted-foreground">
              Use <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">badgeVariant</code> to change the badge style.
            </p>
            <ComponentPreview name="section-heading" code={badgeVariantCode}>
              <div class="w-full max-w-xl">
                <SectionHeading
                  variant="page"
                  title="Dialog"
                  badge="New"
                  badgeVariant="default"
                  description="A modal dialog component with overlay and focus trapping."
                />
              </div>
            </ComponentPreview>
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />
          <DocApiTable
            title="SectionHeading"
            items={[
              {
                prop: "variant",
                type: '"page" | "section"',
                default: '"section"',
                description: "Layout variant. 'page' renders h1 with large text, 'section' renders h3 with compact text.",
              },
              {
                prop: "title",
                type: "string",
                description: "Heading text content.",
                required: true,
              },
              {
                prop: "badge",
                type: "string",
                description: "Optional badge label displayed next to the title.",
              },
              {
                prop: "badgeVariant",
                type: '"default" | "secondary" | "outline" | "destructive"',
                default: '"outline"',
                description: "Visual style variant for the badge.",
              },
              {
                prop: "description",
                type: "string",
                description: "Optional subtitle or explanatory note below the heading.",
              },
            ]}
          />
        </div>

        {/* Next Steps */}
        <DocNextSteps
          prev={{ title: "Scroll Area", href: "/docs/components/scroll-area" }}
          next={{ title: "Skeleton", href: "/docs/components/skeleton" }}
        />
      </div>
    </>
  );
}
