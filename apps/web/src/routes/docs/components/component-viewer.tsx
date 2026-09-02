import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { ComponentViewer } from "@/components/ui/component-viewer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

/* --- Code Snippets --- */
const importCode = `import { ComponentViewer } from "@/components/ui/component-viewer";`;

const defaultCode = `<ComponentViewer
  name="card"
  title="Interactive Card"
  command="bunx @nikala-ui/cli add card"
  lang="tsx"
  code={\`<Card class="w-full max-w-sm">
  <CardHeader>
    <CardTitle>Welcome to Nikala UI</CardTitle>
    <CardDescription>Tailwind CSS v4 & SolidJS components.</CardDescription>
  </CardHeader>
  <CardContent>
    <p class="text-sm text-muted-foreground">Fine-grained reactivity with zero virtual DOM overhead.</p>
  </CardContent>
  <CardFooter>
    <Button class="w-full">Explore</Button>
  </CardFooter>
</Card>\`}
>
  <Card class="w-full max-w-sm">
    <CardHeader>
      <CardTitle>Welcome to Nikala UI</CardTitle>
      <CardDescription>Tailwind CSS v4 & SolidJS components.</CardDescription>
    </CardHeader>
    <CardContent>
      <p class="text-sm text-muted-foreground">Fine-grained reactivity with zero virtual DOM overhead.</p>
    </CardContent>
    <CardFooter>
      <Button class="w-full">Explore</Button>
    </CardFooter>
  </Card>
</ComponentViewer>`;

const badgeExampleCode = `<ComponentViewer
  name="badge-group"
  title="Status Badges"
  align="center"
  lang="tsx"
  code={\`<div class="flex items-center gap-2">
  <Badge variant="default">Active</Badge>
  <Badge variant="success">Online</Badge>
  <Badge variant="info">Beta</Badge>
</div>\`}
>
  <div class="flex items-center gap-2">
    <Badge variant="default">Active</Badge>
    <Badge variant="success">Online</Badge>
    <Badge variant="info">Beta</Badge>
  </div>
</ComponentViewer>`;

export default function ComponentViewerDocsPage() {
  return (
    <>
      <Seo
        title="Component Viewer Component"
        description="Advanced interactive component playground with responsive screen size emulation, background grid patterns, fullscreen expand, AI prompts, and syntax highlighting."
        path="/docs/components/component-viewer"
      />

      <div class="space-y-10 pb-16">
        {/* 1. Page Header */}
        <DocPageHeader
          title="Component Viewer"
          badge="compound"
          description="An advanced component playground and inspector container with responsive viewport emulation (Desktop/Tablet/Mobile), canvas dot grids, fullscreen expansion, AI prompts, and syntax-highlighted code tabs."
        />

        {/* 2. Main Live Preview */}
        <ComponentPreview name="component-viewer" code={defaultCode}>
          <div class="w-full">
            <ComponentViewer
              name="card"
              title="Interactive Card"
              command="bunx @nikala-ui/cli add card"
              lang="tsx"
              code={`<Card class="w-full max-w-sm">
  <CardHeader>
    <CardTitle>Welcome to Nikala UI</CardTitle>
    <CardDescription>Tailwind CSS v4 & SolidJS components.</CardDescription>
  </CardHeader>
  <CardContent>
    <p class="text-sm text-muted-foreground">Fine-grained reactivity with zero virtual DOM overhead.</p>
  </CardContent>
  <CardFooter>
    <Button class="w-full">Explore</Button>
  </CardFooter>
</Card>`}
            >
              <Card class="w-full max-w-sm">
                <CardHeader>
                  <CardTitle>Welcome to Nikala UI</CardTitle>
                  <CardDescription>Tailwind CSS v4 & SolidJS components.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p class="text-sm text-muted-foreground">Fine-grained reactivity with zero virtual DOM overhead.</p>
                </CardContent>
                <CardFooter>
                  <Button class="w-full">Explore</Button>
                </CardFooter>
              </Card>
            </ComponentViewer>
          </div>
        </ComponentPreview>

        {/* 3. Installation & Usage */}
        <div class="space-y-4">
          <DocSectionHeader title="Usage" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        {/* 4. Examples */}
        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          {/* Simple Inline Example */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Status Badges with Grid & Viewports</h3>
            <p class="text-sm text-muted-foreground">
              A compact component preview with viewport switching, grid toggle, and reset canvas controls without CLI command.
            </p>
            <ComponentPreview name="component-viewer" code={badgeExampleCode}>
              <div class="w-full">
                <ComponentViewer
                  name="badge-group"
                  title="Status Badges"
                  align="center"
                  lang="tsx"
                  code={`<div class="flex items-center gap-2">
  <Badge variant="default">Active</Badge>
  <Badge variant="success">Online</Badge>
  <Badge variant="info">Beta</Badge>
</div>`}
                >
                  <div class="flex items-center gap-2">
                    <Badge variant="default">Active</Badge>
                    <Badge variant="success">Online</Badge>
                    <Badge variant="info">Beta</Badge>
                  </div>
                </ComponentViewer>
              </div>
            </ComponentPreview>
          </div>
        </div>

        {/* 5. API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />
          <DocApiTable
            title="ComponentViewer"
            items={[
              {
                prop: "code",
                type: "string",
                default: "undefined",
                description: "Raw source code displayed in the Code tab and copied to clipboard.",
                required: true,
              },
              {
                prop: "lang",
                type: "string",
                default: '"tsx"',
                description: "Syntax highlighting language passed to the code block parser.",
              },
              {
                prop: "command",
                type: "string",
                default: "undefined",
                description: "Optional CLI installation command to display in the header copy button.",
              },
              {
                prop: "name",
                type: "string",
                default: "undefined",
                description: "Component file name identifier for tab headers and code snippets.",
              },
              {
                prop: "title",
                type: "string",
                default: "undefined",
                description: "Title label displayed in the top left toolbar.",
              },
              {
                prop: "defaultViewport",
                type: '"desktop" | "tablet" | "mobile"',
                default: '"desktop"',
                description: "Initial responsive viewport frame mode.",
              },
              {
                prop: "responsive",
                type: "boolean",
                default: "true",
                description: "Enables Desktop (100%), Tablet (768px), and Mobile (375px) viewport switcher.",
              },
              {
                prop: "showGridToggle",
                type: "boolean",
                default: "true",
                description: "Displays a toggle button for the canvas dot matrix background grid.",
              },
              {
                prop: "reRenderable",
                type: "boolean",
                default: "true",
                description: "Displays a reset canvas button to re-trigger component mounting.",
              },
              {
                prop: "align",
                type: '"center" | "start" | "end"',
                default: '"center"',
                description: "Alignment of the preview canvas child elements.",
              },
              {
                prop: "allowOverflow",
                type: "boolean",
                default: "false",
                description: "Allows floating elements (popovers, dropdowns, tooltips) to extend outside canvas bounds.",
              },
            ]}
          />
        </div>

        {/* 6. Next Steps */}
        <DocNextSteps
          prev={{ title: "Code Group", href: "/docs/components/code-group" }}
          next={{ title: "Empty", href: "/docs/components/empty" }}
        />
      </div>
    </>
  );
}
