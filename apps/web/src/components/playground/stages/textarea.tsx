import { Textarea } from "@/components/ui/textarea";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "textarea",
  name: "Textarea",
  props: [
    { name: "placeholder", label: "Placeholder", type: "text", default: "Type your bio here..." },
    { name: "hasLimit", label: "Enable Character Limit", type: "boolean", default: false },
    { name: "maxLength", label: "Character Limit", type: "number", default: 120 },
    { name: "showCount", label: "Show Count Badge", type: "boolean", default: true },
    { name: "disabled", label: "Disabled", type: "boolean", default: false },
  ],
  generateCode: (v) => {
    const limitAttr = v.hasLimit && v.maxLength ? `\n  maxLength={${v.maxLength}}` : "";
    const countAttr = v.showCount ? `\n  showCount={true}` : "";
    const disableAttr = v.disabled ? `\n  disabled={true}` : "";
    return `<Textarea
  placeholder="${v.placeholder || "Type here..."}"${limitAttr}${countAttr}${disableAttr}
/>`;
  },
};

export default function TextareaStage(props: StageProps) {
  return (
    <div class="w-full max-w-xs">
      <Textarea
        placeholder={props.values.placeholder}
        maxLength={props.values.hasLimit ? props.values.maxLength : undefined}
        showCount={props.values.showCount}
        disabled={props.values.disabled}
      />
    </div>
  );
}