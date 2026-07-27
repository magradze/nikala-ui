import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";

/* --- Code Snippets --- */
const importCode = `import { Badge } from "@/components/ui/badge";`;

const defaultCode = `<Badge>v0.4.0</Badge>`;

const variantsCode = `<div class="flex flex-wrap items-center gap-3">
  <Badge variant="default">Default</Badge>
  <Badge variant="secondary">Secondary</Badge>
  <Badge variant="destructive">Destructive</Badge>
  <Badge variant="outline">Outline</Badge>
</div>`;

export default function BadgeDocsPage() {
    return (
        <>
            <Seo
                title="Badge Component"
                description="Displays a status indicator or tag badge with multiple variants in SolidJS."
                path="/docs/components/badge"
            />

            <div class="space-y-10 pb-16">
                {/* Page Header */}
                <DocPageHeader
                    title="Badge"
                    badge="cva"
                    description="Displays a small status badge or tag element for labels, version indicators, and status categories."
                />

                {/* Hero Live Preview */}
                <ComponentPreview name="badge" code={defaultCode}>
                    <Badge>v0.5.0</Badge>
                </ComponentPreview>

                {/* Usage & Import */}
                <div class="space-y-4">
                    <DocSectionHeader title="Usage" />
                    <CodeBlock code={importCode} lang="tsx" />
                </div>

                {/* Examples */}
                <div class="space-y-8 pt-4">
                    <DocSectionHeader title="Examples" />

                    {/* Style Variants */}
                    <div class="space-y-3">
                        <h3 class="text-lg font-semibold tracking-tight">Variants</h3>
                        <p class="text-sm text-muted-foreground">
                            Supports <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">default</code>, <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">secondary</code>, <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">destructive</code>, and <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">outline</code> variants.
                        </p>
                        <ComponentPreview name="badge" code={variantsCode}>
                            <div class="flex flex-wrap items-center gap-3">
                                <Badge variant="default">Default</Badge>
                                <Badge variant="secondary">Secondary</Badge>
                                <Badge variant="destructive">Destructive</Badge>
                                <Badge variant="outline">Outline</Badge>
                            </div>
                        </ComponentPreview>
                    </div>
                </div>

                {/* API Reference */}
                <div class="space-y-6 pt-6">
                    <DocSectionHeader title="API Reference" />

                    <DocApiTable
                        title="Badge"
                        items={[
                            {
                                prop: "variant",
                                type: '"default" | "secondary" | "destructive" | "outline"',
                                default: '"default"',
                                description: "Visual style variant of the badge.",
                            },
                        ]}
                    />
                </div>

                {/* Footer Navigation */}
                <DocNextSteps
                    prev={{ title: "Avatar Component", href: "/docs/components/avatar" }}
                    next={{ title: "Banner Component", href: "/docs/components/banner" }}
                />
            </div>
        </>
    );
}