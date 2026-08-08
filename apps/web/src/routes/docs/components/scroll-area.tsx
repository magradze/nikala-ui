import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

/* --- Code Snippets --- */
const importCode = `import { ScrollArea } from "@/components/ui/scroll-area";`;

const defaultCode = `<ScrollArea class="h-72 w-48 rounded-md border p-4">
  <div class="space-y-2">
    <h4 class="text-sm font-medium leading-none">Tags</h4>
    <p class="text-xs text-muted-foreground">List of generated tags</p>
  </div>
  <Separator class="my-4" />
  <div class="space-y-1">
    {Array.from({ length: 50 }).map((_, i) => (
      <div class="text-sm">v1.0.0-beta.\${i + 1}</div>
    ))}
  </div>
</ScrollArea>`;

const horizontalCode = `<ScrollArea orientation="horizontal" class="w-96 whitespace-nowrap rounded-md border p-4">
  <div class="flex w-max space-x-4">
    {Array.from({ length: 20 }).map((_, i) => (
      <div class="h-24 w-24 shrink-0 rounded-md border border-border bg-muted/40 flex items-center justify-center font-medium text-xs">
        Card \${i + 1}
      </div>
    ))}
  </div>
</ScrollArea>`;

export default function ScrollAreaDocsPage() {
  return (
    <>
      <Seo
        title="Scroll Area Component"
        description="Augments native scroll functionality with custom styled scrollbars, built using createScrollPosition and createElementSize hooks in SolidJS."
        path="/docs/components/scroll-area"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="Scroll Area"
          badge="Nikala Primitives"
          description="Augments native browser scrolling with responsive custom scrollbar thumbs, reactive scroll tracking, and horizontal/vertical direction support."
        />

        {/* Hero Live Preview */}
        <ComponentPreview name="scroll-area" code={defaultCode}>
          <ScrollArea class="h-72 w-48 rounded-md border p-4">
            <div class="space-y-2">
              <h4 class="text-sm font-medium leading-none">Tags</h4>
              <p class="text-xs text-muted-foreground">List of generated tags</p>
            </div>
            <Separator class="my-4" />
            <div class="space-y-2">
              {Array.from({ length: 30 }).map((_, i) => (
                <div class="text-sm text-foreground hover:text-primary transition-colors cursor-pointer">
                  v1.0.0-beta.{i + 1}
                </div>
              ))}
            </div>
          </ScrollArea>
        </ComponentPreview>

        {/* Usage & Import */}
        <div class="space-y-4">
          <DocSectionHeader title="Usage" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        {/* Examples */}
        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          {/* Horizontal Scrolling */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Horizontal Scrolling</h3>
            <p class="text-sm text-muted-foreground">
              Pass <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">orientation="horizontal"</code> to enable custom horizontal scrollbars for wide content rows.
            </p>
            <ComponentPreview name="scroll-area" code={horizontalCode}>
              <ScrollArea orientation="horizontal" class="w-96 max-w-full whitespace-nowrap rounded-md border p-4">
                <div class="flex w-max space-x-4">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <div class="h-24 w-28 shrink-0 rounded-md border border-border bg-muted/30 flex flex-col items-center justify-center font-medium text-xs gap-1">
                      <span>Item #{i + 1}</span>
                      <span class="text-[10px] text-muted-foreground">Preview Card</span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </ComponentPreview>
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="ScrollArea Props"
            items={[
              {
                prop: "orientation",
                type: "'vertical' | 'horizontal' | 'both'",
                default: "'vertical'",
                description: "Direction axis for rendering custom scrollbar tracks.",
              },
              {
                prop: "class",
                type: "string",
                default: "-",
                description: "Additional CSS class names attached to root wrapper.",
              },
            ]}
          />
        </div>

        {/* Footer Navigation */}
        <DocNextSteps
          prev={{ title: "Resizable", href: "/docs/components/resizable" }}
          next={{ title: "Separator", href: "/docs/components/separator" }}
        />
      </div>
    </>
  );
}
