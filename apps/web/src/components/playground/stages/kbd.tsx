import { Kbd } from "@/components/ui/kbd";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "kbd",
  name: "Kbd",
  props: [
    { name: "children", label: "Key Label", type: "text", default: "⌘K" },
    { name: "variant", label: "Variant", type: "select", options: ["default", "outline"], default: "default" },
    { name: "size", label: "Size", type: "select", options: ["sm", "md", "lg"], default: "md" },
  ],
};

export default function KbdStage(props: StageProps) {
  return (
    <Kbd variant={props.values.variant} size={props.values.size}>
      {props.values.children || "⌘K"}
    </Kbd>
  );
}