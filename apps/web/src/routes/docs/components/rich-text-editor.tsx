// src/routes/docs/components/rich-text-editor.tsx
import { createSignal } from "solid-js";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { RichTextEditor } from "@/components/ui/rich-text-editor";

const importCode = `import {
  RichTextEditor,
  EditorToolbar,
  EditorFooter,
  EditorBubbleMenu,
  useRichTextEditor,
} from "@/components/ui/rich-text-editor";`;

const defaultCode = `<RichTextEditor
  value={content()}
  onChange={setContent}
  placeholder="Write your story or type '/' for commands..."
/>`;

const customContent = `<h2>Welcome to Nikala UI Editor 🎨</h2>
<p>A high-performance, full-featured <strong>rich text editor</strong> built natively for SolidJS and Tailwind CSS v4.</p>
<ul data-type="taskList">
  <li data-checked="true" data-type="taskItem"><label><input type="checkbox" checked="checked"><span></span></label><div><p>Fine-grained SolidJS reactivity</p></div></li>
  <li data-checked="true" data-type="taskItem"><label><input type="checkbox" checked="checked"><span></span></label><div><p>Tailwind CSS v4 semantic design tokens</p></div></li>
  <li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>Built-in Markdown and HTML dual view</p></div></li>
</ul>
<blockquote>"Simplicity is the highest goal, achievable when you have overcome all difficulties."</blockquote>
<pre><code>// Copy and paste into your SolidJS app
bunx @nikala-ui/cli add rich-text-editor</code></pre>`;

export default function RichTextEditorDocsPage() {
  const [demoValue, setDemoValue] = createSignal(customContent);

  return (
    <>
      <Seo
        title="Rich Text Editor Component"
        description="A full-featured WYSIWYG rich text editor with toolbar, floating bubble formatting, tables, checklists, and image support built on Tiptap for SolidJS."
        path="/docs/components/rich-text-editor"
      />

      <div class="space-y-10 pb-16">
        <DocPageHeader
          title="Rich Text Editor"
          badge="Tiptap"
          description="A complete WYSIWYG editor system featuring rich text formatting, interactive checklists, data tables, highlighter palettes, bubble menus, and word counters."
        />

        {/* Hero Live Preview */}
        <ComponentPreview name="rich-text-editor" code={defaultCode}>
          <div class="w-full max-w-4xl">
            <RichTextEditor
              value={demoValue()}
              onChange={setDemoValue}
              placeholder="Start writing something wonderful..."
            />
          </div>
        </ComponentPreview>

        {/* Installation */}
        <div class="space-y-4">
          <DocSectionHeader title="Installation" />
          <CodeBlock
            code="bunx @nikala-ui/cli add rich-text-editor"
            lang="bash"
          />
        </div>

        {/* Import */}
        <div class="space-y-4">
          <DocSectionHeader title="Import" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        {/* Features Overview */}
        <div class="space-y-4 pt-4">
          <DocSectionHeader title="Features & Extensions" />
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 rounded-lg border border-border bg-card">
              <h4 class="font-semibold text-sm mb-1 text-foreground">Typography & Marks</h4>
              <p class="text-xs text-muted-foreground">
                H1–H3 headings, Paragraph, Bold, Italic, Underline, Strikethrough, Inline Code, Subscript, Superscript, and 5-color Highlighter palette.
              </p>
            </div>
            <div class="p-4 rounded-lg border border-border bg-card">
              <h4 class="font-semibold text-sm mb-1 text-foreground">Lists & Checklists</h4>
              <p class="text-xs text-muted-foreground">
                Bullet lists, Ordered sequence lists, and interactive Task Checklists with checkbox state synchronization.
              </p>
            </div>
            <div class="p-4 rounded-lg border border-border bg-card">
              <h4 class="font-semibold text-sm mb-1 text-foreground">Data Tables</h4>
              <p class="text-xs text-muted-foreground">
                Insert responsive tables, add/remove rows and columns dynamically with context-aware controls.
              </p>
            </div>
            <div class="p-4 rounded-lg border border-border bg-card">
              <h4 class="font-semibold text-sm mb-1 text-foreground">Links & Media</h4>
              <p class="text-xs text-muted-foreground">
                Hyperlink insertion dialog with removal controls, plus URL and local file upload support for images.
              </p>
            </div>
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />
          <DocApiTable
            title="RichTextEditor"
            items={[
              {
                prop: "value",
                type: "string",
                default: "-",
                description: "HTML content string binding for controlled editor state.",
              },
              {
                prop: "onChange",
                type: "(html: string) => void",
                default: "-",
                description: "Callback invoked whenever editor content changes.",
              },
              {
                prop: "placeholder",
                type: "string",
                default: "'Write something rich...'",
                description: "Ghost placeholder text displayed when editor canvas is empty.",
              },
              {
                prop: "editable",
                type: "boolean",
                default: "true",
                description: "Set to false for read-only view mode.",
              },
              {
                prop: "characterLimit",
                type: "number",
                default: "-",
                description: "Optional maximum character limit constraint.",
              },
              {
                prop: "hideToolbar",
                type: "boolean",
                default: "false",
                description: "Whether to hide the top formatting toolbar.",
              },
              {
                prop: "hideFooter",
                type: "boolean",
                default: "false",
                description: "Whether to hide the bottom status bar with word and character counts.",
              },
              {
                prop: "hideBubbleMenu",
                type: "boolean",
                default: "false",
                description: "Whether to disable the floating selection bubble toolbar.",
              },
            ]}
          />
        </div>

        <DocNextSteps
          prev={{ title: "Rating Component", href: "/docs/components/rating" }}
          next={{ title: "Select Component", href: "/docs/components/select" }}
        />
      </div>
    </>
  );
}
