import { Status } from "@/components/ui/status";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "status",
  name: "Status",
  props: [
    { name: "variant", label: "Variant", type: "select", options: ["neutral", "success", "warning", "error", "info"], default: "success" },
    { name: "size", label: "Size", type: "select", options: ["sm", "default"], default: "default" },
    { name: "animation", label: "Animation", type: "select", options: ["none", "pulse", "ping"], default: "none" },
    { name: "bordered", label: "Bordered", type: "boolean", default: false },
    { name: "children", label: "Status Label", type: "text", default: "Operational" },
  ],
  generateCode: (v) => `<Status
  variant="${v.variant || "neutral"}"
  size="${v.size || "default"}"
  animation="${v.animation || "none"}"${v.bordered ? "\n  bordered" : ""}
>
  ${v.children || "Status"}
</Status>`,
};

export default function StatusStage(props: StageProps) {
  return (
    <Status
      variant={props.values.variant}
      size={props.values.size}
      animation={props.values.animation}
      bordered={props.values.bordered}
    >
      {props.values.children || "Operational"}
    </Status>
  );
}
