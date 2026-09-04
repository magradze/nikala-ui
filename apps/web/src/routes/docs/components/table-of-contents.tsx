import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { TableOfContents } from "@/components/ui/table-of-contents";

/* --- Code Snippets --- */
const importCode = `import { TableOfContents } from "@/components/ui/table-of-contents";`;

const defaultCode = `<TableOfContents
  title="On this page"
  items={[
    { id: "overview", text: "Overview", depth: 2 },
    { id: "installation", text: "Installation", depth: 2 },
    { id: "package-managers", text: "Package Managers", depth: 3 },
    { id: "configuration", text: "Configuration", depth: 2 },
    { id: "tailwind-setup", text: "Tailwind Setup", depth: 3 },
    { id: "api-reference", text: "API Reference", depth: 2 },
  ]}
/>`;

const sampleItems = [
  { id: "overview", text: "Overview", depth: 2 },
  { id: "installation", text: "Installation", depth: 2 },
  { id: "package-managers", text: "Package Managers", depth: 3 },
  { id: "configuration", text: "Configuration", depth: 2 },
  { id: "tailwind-setup", text: "Tailwind Setup", depth: 3 },
  { id: "api-reference", text: "API Reference", depth: 2 },
];

export default function TableOfContentsDocsPage() {
  return (
    <>
      <Seo
        title="Table of Contents Component"
        description="An accessible heading navigation tree with ScrollSpy tracking and smooth scrolling, composed of ScrollArea and List."
        path="/docs/components/table-of-contents"
      />

      <div class="space-y-10 pb-16">
        <DocPageHeader
          title="Table of Contents"
          badge="ui"
          description="An accessible heading navigation tree with ScrollSpy tracking and smooth scrolling, composed purely of Nikala UI primitives (ScrollArea and List)."
        />

        {/* --- Interactive Preview --- */}
        <DocSectionHeader
          title="Preview"
          description="Interactive Table of Contents with active heading indicators and depth indents."
        />

        <ComponentPreview name="table-of-contents" code={defaultCode}>
          <div class="w-full max-w-xs rounded-lg border border-border bg-card p-2">
            <TableOfContents
              title="On this page"
              items={sampleItems}
              activeId="installation"
            />
          </div>
        </ComponentPreview>

        {/* --- Installation --- */}
        <DocSectionHeader
          title="Installation"
          description="Add the Table of Contents component to your project."
        />

        <CodeBlock
          code="bunx @nikala-ui/cli add table-of-contents"
          lang="bash"
        />

        {/* --- Import --- */}
        <DocSectionHeader
          title="Import"
          description="Import the component in your layout or page."
        />

        <CodeBlock
          code={importCode}
          lang="typescript"
        />

        {/* --- Usage Example --- */}
        <DocSectionHeader
          title="Usage"
          description="Pass extracted headings with depth (2 for H2, 3 for H3) to automatically build the TOC."
        />

        <CodeBlock
          code={defaultCode}
          lang="tsx"
          filename="docs-layout.tsx"
        />

        {/* --- API Reference --- */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />
          <DocApiTable
            title="TableOfContents"
            items={[
              {
                prop: "items",
                type: "TocItem[]",
                default: "[]",
                description: "Array of heading entries with id, text, and depth (2 or 3).",
                required: true,
              },
              {
                prop: "title",
                type: "string | false",
                default: '"On this page"',
                description: "Header title displayed at the top of the TOC, or false to hide.",
              },
              {
                prop: "activeId",
                type: "string",
                default: '""',
                description: "Manually control the currently active heading ID.",
              },
              {
                prop: "onItemClick",
                type: "(id: string) => void",
                description: "Callback invoked when a heading link is clicked.",
              },
              {
                prop: "class",
                type: "string",
                description: "Additional CSS classes applied to the outer ScrollArea container.",
              },
            ]}
          />
        </div>

        <DocNextSteps
          prev={{
            title: "Steps",
            href: "/docs/components/steps",
          }}
          next={{
            title: "Tabs",
            href: "/docs/components/tabs",
          }}
        />
      </div>
    </>
  );
}
