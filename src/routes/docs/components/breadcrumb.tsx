// src/routes/docs/components/breadcrumb.tsx
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
    BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb";

/* --- Code Snippets --- */
const importCode = `import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb";`;

const defaultCode = `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/docs">Documentation</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`;

const customSeparatorCode = `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator>/</BreadcrumbSeparator>
    <BreadcrumbItem>
      <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator>/</BreadcrumbSeparator>
    <BreadcrumbItem>
      <BreadcrumbPage>Components</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`;

const ellipsisCode = `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbEllipsis />
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/docs/components/button">Components</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`;

export default function BreadcrumbDocsPage() {
    return (
        <>
            <Seo
                title="Breadcrumb Component"
                description="Displays the path to the current resource using a hierarchy of accessible links."
                path="/docs/components/breadcrumb"
            />

            <div class="space-y-10 pb-16">
                {/* Page Header */}
                <DocPageHeader
                    title="Breadcrumb"
                    badge="Compound"
                    description="Displays the path to the current resource using a hierarchy of accessible links and separators."
                />

                {/* Hero Live Preview */}
                <ComponentPreview name="breadcrumb" code={defaultCode}>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/docs">Documentation</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </ComponentPreview>

                {/* Usage & Import */}
                <div class="space-y-4">
                    <DocSectionHeader title="Usage" />
                    <CodeBlock code={importCode} lang="tsx" />
                </div>

                {/* Examples */}
                <div class="space-y-8 pt-4">
                    <DocSectionHeader title="Examples" />

                    {/* Custom Separator */}
                    <div class="space-y-3">
                        <h3 class="text-lg font-semibold tracking-tight">Custom Separator</h3>
                        <p class="text-sm text-muted-foreground">
                            Pass custom characters or text slashes inside <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">BreadcrumbSeparator</code>.
                        </p>
                        <ComponentPreview name="breadcrumb" code={customSeparatorCode}>
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator>/</BreadcrumbSeparator>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator>/</BreadcrumbSeparator>
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>Components</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </ComponentPreview>
                    </div>

                    {/* Ellipsis Truncation */}
                    <div class="space-y-3">
                        <h3 class="text-lg font-semibold tracking-tight">Ellipsis Truncation</h3>
                        <p class="text-sm text-muted-foreground">
                            Use <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">BreadcrumbEllipsis</code> to represent collapsed intermediate path items.
                        </p>
                        <ComponentPreview name="breadcrumb" code={ellipsisCode}>
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbEllipsis />
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="/docs/components/button">Components</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </ComponentPreview>
                    </div>
                </div>

                {/* API Reference */}
                <div class="space-y-6 pt-6">
                    <DocSectionHeader title="API Reference" />

                    <DocApiTable
                        title="BreadcrumbLink"
                        items={[
                            {
                                prop: "href",
                                type: "string",
                                description: "Target URL destination for the breadcrumb link.",
                            },
                        ]}
                    />

                    <DocApiTable
                        title="BreadcrumbPage"
                        items={[
                            {
                                prop: "children",
                                type: "JSX.Element",
                                description: "Current active page label (rendered as non-clickable aria-current span).",
                            },
                        ]}
                    />

                    <DocApiTable
                        title="BreadcrumbSeparator"
                        items={[
                            {
                                prop: "children",
                                type: "JSX.Element",
                                default: "Chevron Icon",
                                description: "Custom character, text slash, or icon rendered between path links.",
                            },
                        ]}
                    />
                </div>

                {/* Footer Navigation */}
                <DocNextSteps
                    prev={{ title: "Banner Component", href: "/docs/components/banner" }}
                    next={{ title: "Button Component", href: "/docs/components/button" }}
                />
            </div>
        </>
    );
}