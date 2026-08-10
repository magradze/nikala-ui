import { Spinner } from "@/components/ui/spinner";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "spinner",
  name: "Spinner",
  props: [
    { name: "size", label: "Size", type: "select", options: ["sm", "default", "lg"], default: "default" },
    { name: "label", label: "Accessible Label", type: "text", default: "Loading" },
  ],
  generateCode: (v) => `<Spinner size="${v.size || "default"}" label="${v.label || "Loading"}" />`,
};

export default function SpinnerStage(props: StageProps) {
  return <Spinner size={props.values.size} label={props.values.label} />;
}
