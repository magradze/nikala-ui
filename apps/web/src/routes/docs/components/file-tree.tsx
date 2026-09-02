import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { FileTree, FileTreeFolder, FileTreeFile } from "@/components/ui/file-tree";
import { Box, Sparkles, Terminal, FileCode2, Settings } from "lucide-solid";

/* --- Code Snippets --- */
const importCode = `import { FileTree, FileTreeFolder, FileTreeFile } from "@/components/ui/file-tree";`;

const defaultCode = `<FileTree>
  <FileTreeFolder name="src" defaultOpen={true}>
    <FileTreeFolder name="components" defaultOpen={true}>
      <FileTreeFolder name="ui" defaultOpen={true}>
        <FileTreeFile name="button.tsx" />
        <FileTreeFile name="card.tsx" />
        <FileTreeFile name="dialog.tsx" />
      </FileTreeFolder>
      <FileTreeFile name="navbar.tsx" />
    </FileTreeFolder>
    <FileTreeFolder name="routes">
      <FileTreeFile name="index.tsx" />
      <FileTreeFile name="about.tsx" />
    </FileTreeFolder>
    <FileTreeFile name="app.tsx" />
    <FileTreeFile name="app.css" />
  </FileTreeFolder>
  <FileTreeFile name="package.json" />
  <FileTreeFile name="tsconfig.json" />
  <FileTreeFile name="README.md" />
</FileTree>`;

const customIconsCode = `<FileTree>
  <FileTreeFolder
    name="packages"
    defaultOpen={true}
    icon={<Box class="size-3.5 text-purple-500" />}
  >
    <FileTreeFolder
      name="core"
      defaultOpen={true}
      icon={<Sparkles class="size-3.5 text-amber-500" />}
    >
      <FileTreeFile
        name="index.ts"
        icon={<FileCode2 class="size-3.5 text-sky-500" />}
      />
    </FileTreeFolder>
    <FileTreeFolder
      name="cli"
      icon={<Terminal class="size-3.5 text-emerald-500" />}
    >
      <FileTreeFile name="bin.ts" />
    </FileTreeFolder>
  </FileTreeFolder>
  <FileTreeFile
    name="turbo.json"
    icon={<Settings class="size-3.5 text-rose-500" />}
  />
</FileTree>`;

export default function FileTreeDocsPage() {
  return (
    <>
      <Seo
        title="File Tree Component"
        description="Hierarchical directory file tree with collapsible folders and file icons built on Collapsible primitives."
        path="/docs/components/file-tree"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="File Tree"
          badge="compound"
          description="A structured directory explorer component for illustrating project architectures, file structures, and file systems in documentation."
        />

        {/* Hero Live Preview */}
        <ComponentPreview name="file-tree" code={defaultCode}>
          <div class="w-full max-w-sm">
            <FileTree>
              <FileTreeFolder name="src" defaultOpen={true}>
                <FileTreeFolder name="components" defaultOpen={true}>
                  <FileTreeFolder name="ui" defaultOpen={true}>
                    <FileTreeFile name="button.tsx" />
                    <FileTreeFile name="card.tsx" />
                    <FileTreeFile name="dialog.tsx" />
                  </FileTreeFolder>
                  <FileTreeFile name="navbar.tsx" />
                </FileTreeFolder>
                <FileTreeFolder name="routes">
                  <FileTreeFile name="index.tsx" />
                  <FileTreeFile name="about.tsx" />
                </FileTreeFolder>
                <FileTreeFile name="app.tsx" />
                <FileTreeFile name="app.css" />
              </FileTreeFolder>
              <FileTreeFile name="package.json" />
              <FileTreeFile name="tsconfig.json" />
              <FileTreeFile name="README.md" />
            </FileTree>
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

          {/* Custom Icons Example */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Custom Node Icons</h3>
            <p class="text-sm text-muted-foreground">
              Pass any Lucide or custom icon component via the <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">icon</code> prop on both folders and files.
            </p>
            <ComponentPreview name="file-tree" code={customIconsCode}>
              <div class="w-full max-w-sm">
                <FileTree>
                  <FileTreeFolder
                    name="packages"
                    defaultOpen={true}
                    icon={<Box class="size-3.5 text-purple-500" />}
                  >
                    <FileTreeFolder
                      name="core"
                      defaultOpen={true}
                      icon={<Sparkles class="size-3.5 text-amber-500" />}
                    >
                      <FileTreeFile
                        name="index.ts"
                        icon={<FileCode2 class="size-3.5 text-sky-500" />}
                      />
                    </FileTreeFolder>
                    <FileTreeFolder
                      name="cli"
                      icon={<Terminal class="size-3.5 text-emerald-500" />}
                    >
                      <FileTreeFile name="bin.ts" />
                    </FileTreeFolder>
                  </FileTreeFolder>
                  <FileTreeFile
                    name="turbo.json"
                    icon={<Settings class="size-3.5 text-rose-500" />}
                  />
                </FileTree>
              </div>
            </ComponentPreview>
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />
          <DocApiTable
            title="FileTreeFolder"
            items={[
              {
                prop: "name",
                type: "string",
                default: "undefined",
                description: "Name of the folder displayed in the hierarchy.",
                required: true,
              },
              {
                prop: "defaultOpen",
                type: "boolean",
                default: "true",
                description: "Initial expanded/collapsed state (uncontrolled).",
              },
              {
                prop: "open",
                type: "boolean",
                default: "undefined",
                description: "Controlled open state of the folder.",
              },
              {
                prop: "onOpenChange",
                type: "(open: boolean) => void",
                default: "undefined",
                description: "Callback fired when the folder is toggled open or closed.",
              },
              {
                prop: "icon",
                type: "JSX.Element",
                default: "<Folder /> / <FolderOpen />",
                description: "Custom folder icon override.",
              },
            ]}
          />
          <DocApiTable
            title="FileTreeFile"
            items={[
              {
                prop: "name",
                type: "string",
                default: "undefined",
                description: "Name of the file.",
                required: true,
              },
              {
                prop: "icon",
                type: "JSX.Element",
                default: "Auto by file extension",
                description: "Custom file icon override (defaults to Code/JSON/Text icons).",
              },
            ]}
          />
        </div>

        {/* Next Steps */}
        <DocNextSteps
          prev={{ title: "Empty", href: "/docs/components/empty" }}
          next={{ title: "Kbd", href: "/docs/components/kbd" }}
        />
      </div>
    </>
  );
}
