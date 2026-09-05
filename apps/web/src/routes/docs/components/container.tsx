// src/routes/docs/components/container.tsx
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Container } from "@/components/ui/container";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Layers, Zap, ShieldCheck, ArrowRight } from "lucide-solid";

/* --- Code Snippets --- */
const importCode = `import { Container } from "@/components/ui/container";`;

const heroCode = `<Container size="2xl" class="py-12 px-4 sm:px-6 lg:px-8 text-center space-y-4 bg-muted/20 border border-border rounded-lg">
  <Badge variant="outline" class="text-xs">Nikala Design System</Badge>
  <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
    Fluid Layout Primitives for SolidJS
  </h1>
  <p class="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
    The Container primitive aligns and bounds horizontal viewport widths across mobile, tablet, and widescreen monitors with responsive gutter tokens.
  </p>
  <div class="flex items-center justify-center gap-3 pt-2">
    <Button size="sm">Get Started</Button>
    <Button variant="outline" size="sm">Components</Button>
  </div>
</Container>`;

const sizesCode = `<div class="space-y-3 w-full">
  <Container size="sm" class="rounded-lg border border-border bg-card p-3 text-center text-xs font-mono text-muted-foreground">
    size="sm" (max-w-screen-sm: 640px)
  </Container>
  <Container size="md" class="rounded-lg border border-border bg-card p-3 text-center text-xs font-mono text-muted-foreground">
    size="md" (max-w-screen-md: 768px)
  </Container>
  <Container size="lg" class="rounded-lg border border-border bg-card p-3 text-center text-xs font-mono text-muted-foreground">
    size="lg" (max-w-screen-lg: 1024px)
  </Container>
  <Container size="xl" class="rounded-lg border border-border bg-card p-3 text-center text-xs font-mono text-muted-foreground">
    size="xl" (max-w-screen-xl: 1280px)
  </Container>
  <Container size="2xl" class="rounded-lg border border-border bg-card p-3 text-center text-xs font-mono text-muted-foreground">
    size="2xl" (max-w-screen-2xl: 1536px)
  </Container>
</div>`;

const gridCode = `<Container size="xl" class="p-0">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <Card>
      <CardHeader class="pb-2">
        <Zap class="size-5 text-primary mb-1" />
        <CardTitle class="text-base">Fine-Grained Reactivity</CardTitle>
        <CardDescription class="text-xs">Zero Virtual DOM overhead with direct reactive signal bindings.</CardDescription>
      </CardHeader>
    </Card>

    <Card>
      <CardHeader class="pb-2">
        <Layers class="size-5 text-primary mb-1" />
        <CardTitle class="text-base">Tailwind CSS v4</CardTitle>
        <CardDescription class="text-xs">Native CSS custom property tokens and zero legacy config files.</CardDescription>
      </CardHeader>
    </Card>

    <Card>
      <CardHeader class="pb-2">
        <ShieldCheck class="size-5 text-primary mb-1" />
        <CardTitle class="text-base">SSR Safe Hydration</CardTitle>
        <CardDescription class="text-xs">Full SolidStart and Vinxi server-rendering hydration safety guards.</CardDescription>
      </CardHeader>
    </Card>
  </div>
</Container>`;

const articleCode = `<Container as="article" size="md" class="space-y-4 py-4">
  <div class="space-y-2">
    <Badge variant="secondary" class="text-[10px]">Architecture</Badge>
    <h2 class="text-xl font-bold tracking-tight text-foreground">
      Why Fine-Grained Signals Outperform Virtual DOM
    </h2>
    <p class="text-xs text-muted-foreground">September 4, 2026 • 6 min read</p>
  </div>
  <p class="text-xs text-muted-foreground leading-relaxed">
    SolidJS eliminates reconciliation diff algorithms entirely by tracking dependencies directly at the DOM node level. The Container primitive automatically optimizes layout margins for maximum readability.
  </p>
</Container>`;

export default function ContainerDocsPage() {
  return (
    <>
      <Seo
        title="Container Component"
        description="A responsive layout container constraining maximum width with semantic padding tokens."
        path="/docs/components/container"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="Container"
          badge="Layout Primitive"
          description="A responsive layout container constraining maximum width with semantic padding tokens and polymorphic HTML tag support."
        />

        {/* Hero Live Preview */}
        <ComponentPreview name="container" code={heroCode}>
          <div class="w-full py-4">
            <Container size="2xl" class="py-10 px-4 sm:px-6 lg:px-8 text-center space-y-4 bg-muted/20 border border-border rounded-lg">
              <Badge variant="outline" class="text-xs">Nikala Design System</Badge>
              <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Fluid Layout Primitives for SolidJS
              </h1>
              <p class="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
                The Container primitive aligns and bounds horizontal viewport widths across mobile, tablet, and widescreen monitors with responsive gutter tokens.
              </p>
              <div class="flex items-center justify-center gap-3 pt-2">
                <Button size="sm">Get Started</Button>
                <Button variant="outline" size="sm">Components</Button>
              </div>
            </Container>
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

          {/* Size Variants */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Size Variants</h3>
            <p class="text-sm text-muted-foreground">
              Constrain layout boundaries using standard screen breakpoints: <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">sm</code>, <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">md</code>, <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">lg</code>, <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">xl</code>, or <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">2xl</code>.
            </p>
            <ComponentPreview name="container" code={sizesCode}>
              <div class="space-y-3 w-full py-2">
                <Container size="sm" class="rounded-lg border border-border bg-card p-3 text-center text-xs font-mono text-muted-foreground shadow-2xs">
                  size="sm" (max-w-screen-sm: 640px)
                </Container>
                <Container size="md" class="rounded-lg border border-border bg-card p-3 text-center text-xs font-mono text-muted-foreground shadow-2xs">
                  size="md" (max-w-screen-md: 768px)
                </Container>
                <Container size="lg" class="rounded-lg border border-border bg-card p-3 text-center text-xs font-mono text-muted-foreground shadow-2xs">
                  size="lg" (max-w-screen-lg: 1024px)
                </Container>
                <Container size="xl" class="rounded-lg border border-border bg-card p-3 text-center text-xs font-mono text-muted-foreground shadow-2xs">
                  size="xl" (max-w-screen-xl: 1280px)
                </Container>
                <Container size="2xl" class="rounded-lg border border-border bg-card p-3 text-center text-xs font-mono text-muted-foreground shadow-2xs">
                  size="2xl" (max-w-screen-2xl: 1536px)
                </Container>
              </div>
            </ComponentPreview>
          </div>

          {/* Feature Grid inside Container */}
          <div class="space-y-3 pt-6">
            <h3 class="text-lg font-semibold tracking-tight">Responsive Grid Layout</h3>
            <p class="text-sm text-muted-foreground">
              Wrap multi-column feature or card grids inside an <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">xl</code> container for clean marketing sections.
            </p>
            <ComponentPreview name="container" code={gridCode}>
              <div class="w-full py-2">
                <Container size="xl" class="p-0">
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader class="pb-2">
                        <Zap class="size-5 text-primary mb-1" />
                        <CardTitle class="text-base">Fine-Grained Reactivity</CardTitle>
                        <CardDescription class="text-xs">Zero Virtual DOM overhead with direct reactive signal bindings.</CardDescription>
                      </CardHeader>
                    </Card>

                    <Card>
                      <CardHeader class="pb-2">
                        <Layers class="size-5 text-primary mb-1" />
                        <CardTitle class="text-base">Tailwind CSS v4</CardTitle>
                        <CardDescription class="text-xs">Native CSS custom property tokens and zero legacy config files.</CardDescription>
                      </CardHeader>
                    </Card>

                    <Card>
                      <CardHeader class="pb-2">
                        <ShieldCheck class="size-5 text-primary mb-1" />
                        <CardTitle class="text-base">SSR Safe Hydration</CardTitle>
                        <CardDescription class="text-xs">Full SolidStart and Vinxi server-rendering hydration safety guards.</CardDescription>
                      </CardHeader>
                    </Card>
                  </div>
                </Container>
              </div>
            </ComponentPreview>
          </div>

          {/* Article / Reading Layout */}
          <div class="space-y-3 pt-6">
            <h3 class="text-lg font-semibold tracking-tight">Article & Reading Typography</h3>
            <p class="text-sm text-muted-foreground">
              Use <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">size="md"</code> with <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">as="article"</code> for accessible documentation guides and blog essays.
            </p>
            <ComponentPreview name="container" code={articleCode}>
              <div class="w-full py-2">
                <Container as="article" size="md" class="space-y-3 p-4 rounded-lg border border-border bg-card shadow-2xs">
                  <div class="space-y-1.5">
                    <Badge variant="secondary" class="text-[10px]">Architecture</Badge>
                    <h2 class="text-lg font-bold tracking-tight text-foreground">
                      Why Fine-Grained Signals Outperform Virtual DOM
                    </h2>
                    <p class="text-xs text-muted-foreground">September 4, 2026 • 6 min read</p>
                  </div>
                  <p class="text-xs text-muted-foreground leading-relaxed">
                    SolidJS eliminates reconciliation diff algorithms entirely by tracking dependencies directly at the DOM node level. The Container primitive automatically optimizes layout margins for maximum readability.
                  </p>
                </Container>
              </div>
            </ComponentPreview>
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="Container"
            description="Polymorphic layout container providing standardized width constraints and gutter padding."
            items={[
              {
                prop: "size",
                type: '"sm" | "md" | "lg" | "xl" | "2xl" | "full"',
                default: '"2xl"',
                description: "Maximum horizontal boundary breakpoint (sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px, full: 100%).",
              },
              {
                prop: "as",
                type: "ValidComponent",
                default: '"div"',
                description: "Underlying HTML element or Solid component tag (e.g. 'main', 'section', 'article', 'header').",
              },
              {
                prop: "class",
                type: "string",
                default: "undefined",
                description: "Optional additional CSS classes for spacing or background styling.",
              },
              {
                prop: "children",
                type: "JSX.Element",
                default: "undefined",
                description: "Child nodes rendered inside the container wrapper.",
              },
            ]}
          />
        </div>

        {/* Footer Navigation */}
        <DocNextSteps
          prev={{ title: "Command", href: "/docs/components/command" }}
          next={{ title: "Footer", href: "/docs/components/footer" }}
        />
      </div>
    </>
  );
}
