// src/routes/docs/hooks/create-tiptap-editor.tsx
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { CodeBlock } from "@/components/code-block";

const importCode = `import { createTiptapEditor } from "@/hooks/create-tiptap-editor";`;

const usageCode = `let editorRef: HTMLDivElement | undefined;

const editor = createTiptapEditor({
  content: "<p>Hello from <strong>createTiptapEditor</strong>!</p>",
  placeholder: "Start typing...",
  onUpdate: ({ html }) => {
    console.log("Updated HTML:", html);
  },
});

onMount(() => {
  if (editorRef) editor.mount(editorRef);
});

return (
  <div class="space-y-3">
    <div class="flex items-center gap-1">
      <button onClick={editor.toggleBold}>Bold</button>
      <button onClick={editor.toggleItalic}>Italic</button>
    </div>
    <div ref={editorRef} class="p-3 border rounded-lg" />
  </div>
);`;

export default function CreateTiptapEditorDocsPage() {
  return (
    <>
      <Seo
        title="createTiptapEditor Primitive"
        description="SolidJS reactive primitive for managing Tiptap rich text editor instances, signals, and formatting commands."
        path="/docs/hooks/create-tiptap-editor"
      />

      <div class="space-y-10 pb-16">
        <DocPageHeader
          title="createTiptapEditor"
          badge="Hook"
          description="Fine-grained reactive SolidJS primitive for managing Tiptap rich text editor instances, signals, and formatting commands."
        />

        {/* Installation */}
        <div class="space-y-4">
          <DocSectionHeader title="Installation" />
          <CodeBlock
            code="bunx @nikala-ui/cli add -h create-tiptap-editor"
            lang="bash"
          />
        </div>

        {/* Import */}
        <div class="space-y-4">
          <DocSectionHeader title="Import" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        {/* Usage Example */}
        <div class="space-y-4">
          <DocSectionHeader title="Usage" />
          <CodeBlock code={usageCode} lang="tsx" />
        </div>

        {/* Hook API */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />
          <DocApiTable
            title="createTiptapEditor Return Values"
            items={[
              {
                prop: "editor()",
                type: "Accessor<Editor | null>",
                default: "-",
                description: "The underlying raw Tiptap Editor instance.",
              },
              {
                prop: "html()",
                type: "Accessor<string>",
                default: "''",
                description: "Reactive signal containing the current HTML output.",
              },
              {
                prop: "wordCount()",
                type: "Accessor<number>",
                default: "0",
                description: "Reactive signal counting total words in the document.",
              },
              {
                prop: "characterCount()",
                type: "Accessor<number>",
                default: "0",
                description: "Reactive signal counting total characters.",
              },
              {
                prop: "canUndo() / canRedo()",
                type: "Accessor<boolean>",
                default: "false",
                description: "Signals indicating if undo or redo operations are currently available.",
              },
              {
                prop: "isActive(name, attrs?)",
                type: "(name: string, attrs?) => boolean",
                default: "-",
                description: "Reactive helper to check if a mark, node, or attribute is active at cursor.",
              },
              {
                prop: "toggleBold(), toggleItalic()...",
                type: "() => void",
                default: "-",
                description: "Direct formatting actions that chain and execute editor commands.",
              },
            ]}
          />
        </div>

        <DocNextSteps
          prev={{ title: "createDocumentTabs", href: "/docs/desktop/create-document-tabs" }}
          next={{ title: "Rich Text Editor Component", href: "/docs/components/rich-text-editor" }}
        />
      </div>
    </>
  );
}
