import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { AspectRatio } from "@/components/ui/aspect-ratio";

/* --- Code Snippets --- */
const importCode = `import { AspectRatio } from "@/components/ui/aspect-ratio";`;

const defaultCode = `<div class="w-full max-w-sm">
  <AspectRatio ratio={16 / 9} class="bg-muted rounded-lg border border-border">
    <img
      src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
      alt="Photo by Drew Beamer"
      class="h-full w-full object-cover"
    />
  </AspectRatio>
</div>`;

const ratio4x3Code = `<div class="w-full max-w-sm">
  <AspectRatio ratio={4 / 3} class="bg-muted rounded-lg border border-border">
    <img
      src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=800&dpr=2&q=80"
      alt="Landscape Photo"
      class="h-full w-full object-cover"
    />
  </AspectRatio>
</div>`;

const ratio1x1Code = `<div class="w-72">
  <AspectRatio ratio={1 / 1} class="bg-muted rounded-lg border border-border flex items-center justify-center p-4">
    <div class="flex flex-col items-center justify-center text-center space-y-2">
      <div class="h-12 w-12 rounded-lg bg-primary/20 text-primary flex items-center justify-center font-bold text-lg">
        1:1
      </div>
      <span class="text-sm font-semibold">Square Aspect Ratio</span>
      <p class="text-xs text-muted-foreground">Perfect for avatars, album art, or cards.</p>
    </div>
  </AspectRatio>
</div>`;

export default function AspectRatioDocsPage() {
  return (
    <>
      <Seo
        title="Aspect Ratio Component"
        description="Displays content within a specific aspect ratio using CSS aspect-ratio in SolidJS."
        path="/docs/components/aspect-ratio"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="Aspect Ratio"
          badge="HTML"
          description="Displays content within a specific aspect ratio (e.g. 16:9, 4:3, 1:1) while preventing layout shifts."
        />

        {/* Hero Live Preview */}
        <ComponentPreview name="aspect-ratio" code={defaultCode}>
          <div class="w-full max-w-sm">
            <AspectRatio ratio={16 / 9} class="bg-muted rounded-lg border border-border">
              <img
                src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                alt="Photo by Drew Beamer"
                class="h-full w-full object-cover"
              />
            </AspectRatio>
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

          {/* 4:3 Ratio */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">4:3 Aspect Ratio</h3>
            <p class="text-sm text-muted-foreground">
              Pass <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">ratio={`{4 / 3}`}</code> for traditional photography aspect ratio.
            </p>
            <ComponentPreview name="aspect-ratio" code={ratio4x3Code}>
              <div class="w-full max-w-sm">
                <AspectRatio ratio={4 / 3} class="bg-muted rounded-lg border border-border">
                  <img
                    src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=800&dpr=2&q=80"
                    alt="Landscape Photo"
                    class="h-full w-full object-cover"
                  />
                </AspectRatio>
              </div>
            </ComponentPreview>
          </div>

          {/* 1:1 Square Ratio */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">1:1 Square Ratio</h3>
            <p class="text-sm text-muted-foreground">
              Pass <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">ratio={`{1 / 1}`}</code> for square elements like album art, avatars, or grid items.
            </p>
            <ComponentPreview name="aspect-ratio" code={ratio1x1Code}>
              <div class="w-72">
                <AspectRatio ratio={1 / 1} class="bg-muted rounded-lg border border-border flex items-center justify-center p-4">
                  <div class="flex flex-col items-center justify-center text-center space-y-2">
                    <div class="h-12 w-12 rounded-lg bg-primary/20 text-primary flex items-center justify-center font-bold text-lg">
                      1:1
                    </div>
                    <span class="text-sm font-semibold">Square Aspect Ratio</span>
                    <p class="text-xs text-muted-foreground">Perfect for avatars, album art, or cards.</p>
                  </div>
                </AspectRatio>
              </div>
            </ComponentPreview>
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="Aspect Ratio Props"
            items={[
              {
                prop: "ratio",
                type: "number",
                default: "16 / 9",
                description: "Desired aspect ratio width divided by height (e.g. 16/9, 4/3, 1).",
              },
              {
                prop: "class",
                type: "string",
                default: "-",
                description: "Additional CSS classes to apply to the container.",
              },
            ]}
          />
        </div>

        {/* Footer Navigation */}
        <DocNextSteps
          prev={{ title: "Accordion", href: "/docs/components/accordion" }}
          next={{ title: "Avatar", href: "/docs/components/avatar" }}
        />
      </div>
    </>
  );
}
