// src/routes/docs/hooks/create-tiptap-editor.tsx
import { onMount } from "solid-js";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { CodeBlock } from "@/components/code-block";
import { ComponentPreview } from "@/components/component-preview";
import { createTiptapEditor } from "@/hooks/create-tiptap-editor";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bold,
  Italic,
  Underline,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo2,
  Redo2,
} from "lucide-solid";

const importCode = `import { createTiptapEditor } from "@/hooks/create-tiptap-editor";`;

const usageCode = `import { onMount } from "solid-js";
import { createTiptapEditor } from "@/hooks/create-tiptap-editor";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bold, Italic, Underline, Heading2, List, Undo2, Redo2 } from "lucide-solid";

export function CustomEditor() {
  let editorRef: HTMLDivElement | undefined;

  const editor = createTiptapEditor({
    content: "<p>Hello from <strong>createTiptapEditor</strong> hook!</p>",
    placeholder: "Start typing...",
  });

  onMount(() => {
    if (editorRef) editor.mount(editorRef);
  });

  return (
    <div class="space-y-3 w-full max-w-xl">
      {/* Custom Clean Toolbar using Nikala UI Button Primitives */}
      <div class="flex flex-wrap items-center gap-1 p-1 bg-muted/40 rounded-lg border border-border">
        <Button
          variant={editor.isActive("bold") ? "default" : "ghost"}
          size="sm"
          onClick={editor.toggleBold}
          class="h-8 w-8 p-0 cursor-pointer"
        >
          <Bold class="size-4" />
        </Button>
        <Button
          variant={editor.isActive("italic") ? "default" : "ghost"}
          size="sm"
          onClick={editor.toggleItalic}
          class="h-8 w-8 p-0 cursor-pointer"
        >
          <Italic class="size-4" />
        </Button>
        <Button
          variant={editor.isActive("underline") ? "default" : "ghost"}
          size="sm"
          onClick={editor.toggleUnderline}
          class="h-8 w-8 p-0 cursor-pointer"
        >
          <Underline class="size-4" />
        </Button>
        <Button
          variant={editor.isActive("heading", { level: 2 }) ? "default" : "ghost"}
          size="sm"
          onClick={() => editor.setHeading(2)}
          class="h-8 w-8 p-0 cursor-pointer"
        >
          <Heading2 class="size-4" />
        </Button>
        <Button
          variant={editor.isActive("bulletList") ? "default" : "ghost"}
          size="sm"
          onClick={editor.toggleBulletList}
          class="h-8 w-8 p-0 cursor-pointer"
        >
          <List class="size-4" />
        </Button>
        <div class="ml-auto flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={editor.undo}
            disabled={!editor.canUndo()}
            class="h-8 w-8 p-0 cursor-pointer"
          >
            <Undo2 class="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={editor.redo}
            disabled={!editor.canRedo()}
            class="h-8 w-8 p-0 cursor-pointer"
          >
            <Redo2 class="size-4" />
          </Button>
        </div>
      </div>

      {/* Editor Content Area */}
      <div
        ref={editorRef}
        class="min-h-[140px] p-4 rounded-lg border border-border bg-card text-foreground focus:outline-none"
      />

      {/* Stats Counter */}
      <div class="flex items-center gap-2 text-xs text-muted-foreground">
        <Badge variant="outline" class="font-mono">
          {editor.wordCount()} words
        </Badge>
        <Badge variant="outline" class="font-mono">
          {editor.characterCount()} characters
        </Badge>
      </div>
    </div>
  );
}`;

function InteractiveHookDemo() {
  let editorRef: HTMLDivElement | undefined;

  const editor = createTiptapEditor({
    content: "<p>Build your own custom editors using the headless <strong>createTiptapEditor</strong> reactive primitive.</p>",
    placeholder: "Start typing...",
  });

  onMount(() => {
    if (editorRef) editor.mount(editorRef);
  });

  return (
    <div class="space-y-3 w-full max-w-xl text-left">
      <div class="flex flex-wrap items-center gap-1 p-1 bg-muted/40 rounded-lg border border-border">
        <Button
          variant={editor.isActive("bold") ? "default" : "ghost"}
          size="sm"
          onClick={editor.toggleBold}
          class="h-8 w-8 p-0 cursor-pointer"
        >
          <Bold class="size-4" />
        </Button>
        <Button
          variant={editor.isActive("italic") ? "default" : "ghost"}
          size="sm"
          onClick={editor.toggleItalic}
          class="h-8 w-8 p-0 cursor-pointer"
        >
          <Italic class="size-4" />
        </Button>
        <Button
          variant={editor.isActive("underline") ? "default" : "ghost"}
          size="sm"
          onClick={editor.toggleUnderline}
          class="h-8 w-8 p-0 cursor-pointer"
        >
          <Underline class="size-4" />
        </Button>
        <Button
          variant={editor.isActive("heading", { level: 2 }) ? "default" : "ghost"}
          size="sm"
          onClick={() => editor.setHeading(2)}
          class="h-8 w-8 p-0 cursor-pointer"
        >
          <Heading2 class="size-4" />
        </Button>
        <Button
          variant={editor.isActive("bulletList") ? "default" : "ghost"}
          size="sm"
          onClick={editor.toggleBulletList}
          class="h-8 w-8 p-0 cursor-pointer"
        >
          <List class="size-4" />
        </Button>
        <div class="ml-auto flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={editor.undo}
            disabled={!editor.canUndo()}
            class="h-8 w-8 p-0 cursor-pointer"
          >
            <Undo2 class="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={editor.redo}
            disabled={!editor.canRedo()}
            class="h-8 w-8 p-0 cursor-pointer"
          >
            <Redo2 class="size-4" />
          </Button>
        </div>
      </div>

      <div
        ref={editorRef}
        class="min-h-[140px] p-4 rounded-lg border border-border bg-card text-foreground focus:outline-none text-sm"
      />

      <div class="flex items-center gap-2 text-xs text-muted-foreground">
        <Badge variant="outline" class="font-mono">
          {editor.wordCount()} words
        </Badge>
        <Badge variant="outline" class="font-mono">
          {editor.characterCount()} characters
        </Badge>
      </div>
    </div>
  );
}

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

        {/* Live Interactive Preview */}
        <div class="space-y-4">
          <DocSectionHeader title="Preview" />
          <ComponentPreview name="create-tiptap-editor" code={usageCode}>
            <InteractiveHookDemo />
          </ComponentPreview>
        </div>

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
                prop: "text()",
                type: "Accessor<string>",
                default: "''",
                description: "Reactive signal containing the plain text output.",
              },
              {
                prop: "markdown()",
                type: "Accessor<string>",
                default: "''",
                description: "Reactive signal containing the synchronized GitHub Flavored Markdown output.",
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
