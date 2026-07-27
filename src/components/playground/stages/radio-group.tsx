import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemLabel,
} from "@/components/ui/radio-group";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "radio-group",
  name: "Radio Group",
  props: [
    { name: "orientation", label: "Orientation", type: "select", options: ["vertical", "horizontal"], default: "vertical" },
    { name: "defaultValue", label: "Default Value", type: "select", options: ["comfortable", "compact"], default: "comfortable" },
    { name: "disabled", label: "Disabled", type: "boolean", default: false },
  ],
  generateCode: (v) => `<RadioGroup${v.orientation === "horizontal" ? ' orientation="horizontal"' : ''} defaultValue="${v.defaultValue}">
  <RadioGroupItem value="comfortable"${v.disabled ? " disabled" : ""}>
    <RadioGroupItemLabel>Comfortable</RadioGroupItemLabel>
  </RadioGroupItem>
  <RadioGroupItem value="compact"${v.disabled ? " disabled" : ""}>
    <RadioGroupItemLabel>Compact</RadioGroupItemLabel>
  </RadioGroupItem>
</RadioGroup>`,
};

export default function RadioGroupStage(props: StageProps) {
  return (
    <RadioGroup
      orientation={props.values.orientation}
      defaultValue={props.values.defaultValue}
    >
      <RadioGroupItem value="comfortable" disabled={props.values.disabled}>
        <RadioGroupItemLabel>Comfortable</RadioGroupItemLabel>
      </RadioGroupItem>
      <RadioGroupItem value="compact" disabled={props.values.disabled}>
        <RadioGroupItemLabel>Compact</RadioGroupItemLabel>
      </RadioGroupItem>
    </RadioGroup>
  );
}