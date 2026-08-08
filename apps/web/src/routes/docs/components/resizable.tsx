import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import {
  ResizableGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";

/* --- Code Snippets --- */
const importCode = `import {
  ResizableGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";`;

const defaultCode = `<ResizableGroup orientation="horizontal" class="h-56 max-w-md rounded-lg border">
  <ResizablePanel id="panel-1" initialSize={30} class="flex items-center justify-center p-6 bg-muted/20">
    <span class="font-medium text-sm">Panel One</span>
  </ResizablePanel>
  <ResizableHandle handleIndex={0} withHandle />
  <ResizablePanel id="panel-2" initialSize={70} class="flex items-center justify-center p-6 bg-muted/40">
    <span class="font-medium text-sm">Panel Two</span>
  </ResizablePanel>
</ResizableGroup>`;

const verticalCode = `<ResizableGroup orientation="vertical" class="h-64 max-w-md rounded-lg border">
  <ResizablePanel id="top" initialSize={50} class="flex items-center justify-center p-6 bg-muted/20">
    <span class="font-medium text-sm">Top Panel</span>
  </ResizablePanel>
  <ResizableHandle handleIndex={0} withHandle />
  <ResizablePanel id="bottom" initialSize={50} class="flex items-center justify-center p-6 bg-muted/40">
    <span class="font-medium text-sm">Bottom Panel</span>
  </ResizablePanel>
</ResizableGroup>`;

export default function ResizableDocsPage() {
  return (
    <>
      <Seo
        title="Resizable Component"
        description="Accessible resizable panel groups with interactive drag handles, vertical and horizontal orientation, built for SolidJS."
        path="/docs/components/resizable"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="Resizable"
          badge="Nikala Primitives"
          description="Accessible resizable panel layout component supporting drag-to-resize handles, horizontal/vertical orientations, and reactive element size observation."
        />

        {/* Hero Live Preview */}
        <ComponentPreview name="resizable" code={defaultCode}>
          <ResizableGroup orientation="horizontal" class="h-56 max-w-md rounded-lg border">
            <ResizablePanel id="panel-1" initialSize={30} class="flex items-center justify-center p-6 bg-muted/20">
              <span class="font-medium text-sm">Sidebar (30%)</span>
            </ResizablePanel>
            <ResizableHandle handleIndex={0} withHandle />
            <ResizablePanel id="panel-2" initialSize={70} class="flex items-center justify-center p-6 bg-muted/40">
              <span class="font-medium text-sm">Content (70%)</span>
            </ResizablePanel>
          </ResizableGroup>
        </ComponentPreview>

        {/* Usage & Import */}
        <div class="space-y-4">
          <DocSectionHeader title="Usage" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        {/* Examples */}
        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          {/* Vertical Layout */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Vertical Layout</h3>
            <p class="text-sm text-muted-foreground">
              Set <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">orientation="vertical"</code> to create top-and-bottom resizable panel splits.
            </p>
            <ComponentPreview name="resizable" code={verticalCode}>
              <ResizableGroup orientation="vertical" class="h-64 max-w-md rounded-lg border">
                <ResizablePanel id="top" initialSize={50} class="flex items-center justify-center p-6 bg-muted/20">
                  <span class="font-medium text-sm">Top Panel (50%)</span>
                </ResizablePanel>
                <ResizableHandle handleIndex={0} withHandle />
                <ResizablePanel id="bottom" initialSize={50} class="flex items-center justify-center p-6 bg-muted/40">
                  <span class="font-medium text-sm">Bottom Panel (50%)</span>
                </ResizablePanel>
              </ResizableGroup>
            </ComponentPreview>
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="Resizable Component API"
            items={[
              {
                prop: "ResizableGroup",
                type: "Component",
                default: "-",
                description: "Container component for managing panel layout and drag calculations.",
              },
              {
                prop: "orientation",
                type: "'horizontal' | 'vertical'",
                default: "'horizontal'",
                description: "Direction layout split for resizable panels.",
              },
              {
                prop: "ResizablePanel",
                type: "Component",
                default: "-",
                description: "Individual resizable panel wrapper.",
              },
              {
                prop: "id",
                type: "string",
                default: "-",
                description: "Unique identifier for registering panel state.",
              },
              {
                prop: "initialSize",
                type: "number",
                default: "50",
                description: "Initial percentage width/height split size.",
              },
              {
                prop: "ResizableHandle",
                type: "Component",
                default: "-",
                description: "Interactive separator handle used for dragging between panels.",
              },
              {
                prop: "withHandle",
                type: "boolean",
                default: "false",
                description: "Renders a visual grip indicator icon inside handle.",
              },
            ]}
          />
        </div>

        {/* Footer Navigation */}
        <DocNextSteps
          prev={{ title: "Context Menu", href: "/docs/components/context-menu" }}
          next={{ title: "Tabs", href: "/docs/components/tabs" }}
        />
      </div>
    </>
  );
}
