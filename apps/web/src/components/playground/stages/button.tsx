import { Button } from "@/components/ui/button";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "button",
  name: "Button",
  props: [
    { name: "children", label: "Button Text", type: "text", default: "Click me" },
    { name: "variant", label: "Variant", type: "select", options: ["default", "secondary", "destructive", "outline", "ghost", "link"], default: "default" },
    { name: "size", label: "Size", type: "select", options: ["default", "sm", "lg", "icon"], default: "default" },
    { name: "disabled", label: "Disabled", type: "boolean", default: false },
  ],
};

export default function ButtonStage(props: StageProps) {
  return (
    <Button
      variant={props.values.variant}
      size={props.values.size}
      disabled={props.values.disabled}
    >
      {props.values.children || "Click me"}
    </Button>
  );
}