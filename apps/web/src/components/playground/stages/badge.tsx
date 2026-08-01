import { Badge } from "@/components/ui/badge";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "badge",
  name: "Badge",
  props: [
    { name: "children", label: "Badge Label", type: "text", default: "v0.5.0" },
    { name: "variant", label: "Variant", type: "select", options: ["default", "secondary", "destructive", "outline"], default: "default" },
  ],
};

export default function BadgeStage(props: StageProps) {
  return (
    <Badge variant={props.values.variant}>
      {props.values.children || "Badge"}
    </Badge>
  );
}