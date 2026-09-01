import { createSignal } from "solid-js";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "rich-text-editor",
  name: "Rich Text Editor",
  props: [
    { name: "placeholder", label: "Placeholder", type: "text", default: "Write something rich..." },
    { name: "hideToolbar", label: "Hide Toolbar", type: "boolean", default: false },
    { name: "hideFooter", label: "Hide Footer Bar", type: "boolean", default: false },
    { name: "editable", label: "Editable Mode", type: "boolean", default: true },
  ],
  generateCode: (v) => {
    const hideToolbar = v.hideToolbar ? `\n  hideToolbar={true}` : "";
    const hideFooter = v.hideFooter ? `\n  hideFooter={true}` : "";
    const editable = v.editable === false ? `\n  editable={false}` : "";
    return `const [content, setContent] = createSignal("<p>Start typing...</p>");

<RichTextEditor
  value={content()}
  onChange={setContent}
  placeholder="${v.placeholder || "Write something..."}"${hideToolbar}${hideFooter}${editable}
/>`;
  },
};

export default function RichTextEditorStage(props: StageProps) {
  const [value, setValue] = createSignal(
    "<h2>Welcome to Nikala UI Editor 🎨</h2><p>Experience fast, fine-grained WYSIWYG editing for <strong>SolidJS</strong>.</p>"
  );

  return (
    <div class="w-full max-w-xl">
      <RichTextEditor
        value={value()}
        onChange={setValue}
        placeholder={props.values.placeholder}
        hideToolbar={props.values.hideToolbar}
        hideFooter={props.values.hideFooter}
        editable={props.values.editable}
      />
    </div>
  );
}
