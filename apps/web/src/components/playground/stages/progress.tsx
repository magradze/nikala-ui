import { Progress } from "@/components/ui/progress";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "progress",
  name: "Progress",
  props: [
    { name: "value", label: "Progress Value", type: "select", options: ["15", "45", "75", "100"], default: "60" },
    { name: "label", label: "Label Text", type: "text", default: "Downloading Assets..." },
    { name: "showLabel", label: "Show Label", type: "boolean", default: true },
  ],
  generateCode: (v) => {
    const valueNum = Number(v.value ?? 60);
    const labelAttr = v.showLabel && v.label ? ` label="${v.label}"` : "";
    return `<Progress value={${valueNum}}${labelAttr} class="w-full max-w-sm" />`;
  },
};

export default function ProgressStage(props: StageProps) {
  const valueNum = () => Number(props.values.value ?? 60);

  return (
    <div class="w-full max-w-sm">
      <Progress
        value={valueNum()}
        label={props.values.showLabel ? props.values.label : undefined}
      />
    </div>
  );
}
