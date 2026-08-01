import { Input } from "@/components/ui/input";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "input",
  name: "Input",
  props: [
    { name: "placeholder", label: "Placeholder", type: "text", default: "Type your email..." },
    { name: "type", label: "Input Type", type: "select", options: ["text", "email", "password", "number", "file"], default: "text" },
    { name: "disabled", label: "Disabled", type: "boolean", default: false },
  ],
};

export default function InputStage(props: StageProps) {
  return (
    <Input
      type={props.values.type}
      placeholder={props.values.placeholder}
      disabled={props.values.disabled}
      class="w-full max-w-xs"
    />
  );
}