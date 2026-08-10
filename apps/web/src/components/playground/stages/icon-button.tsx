import { Menu } from "lucide-solid";
import { IconButton } from "@/components/ui/icon-button";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "icon-button",
  name: "Icon Button",
  props: [
    { name: "variant", label: "Variant", type: "select", options: ["default", "secondary", "destructive", "outline", "ghost", "link"], default: "default" },
    { name: "size", label: "Size", type: "select", options: ["sm", "default", "lg"], default: "default" },
    { name: "label", label: "Accessible Label", type: "text", default: "Open menu" },
    { name: "disabled", label: "Disabled", type: "boolean", default: false },
  ],
  generateCode: (v) => `<IconButton
  label="${v.label || "Icon action"}"
  variant="${v.variant || "default"}"
  size="${v.size || "default"}"${v.disabled ? "\n  disabled" : ""}
>
  <Menu />
</IconButton>`,
};

export default function IconButtonStage(props: StageProps) {
  return (
    <IconButton
      label={props.values.label || "Open menu"}
      variant={props.values.variant}
      size={props.values.size}
      disabled={props.values.disabled}
    >
      <Menu />
    </IconButton>
  );
}
