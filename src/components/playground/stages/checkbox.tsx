import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "checkbox",
  name: "Checkbox",
  props: [
    { name: "label", label: "Label Text", type: "text", default: "Accept terms and conditions" },
    { name: "checked", label: "Checked State", type: "boolean", default: true },
    { name: "disabled", label: "Disabled", type: "boolean", default: false },
  ],
  generateCode: (v) => `<div class="flex items-center space-x-2">
  <Checkbox id="terms"${v.checked ? " defaultChecked" : ""}${v.disabled ? " disabled" : ""} />
  <Label for="terms">${v.label || "Accept terms and conditions"}</Label>
</div>`,
};

export default function CheckboxStage(props: StageProps) {
  return (
    <div class="flex items-center space-x-2">
      <Checkbox
        id="pg-checkbox-stage"
        checked={Boolean(props.values.checked)}
        disabled={props.values.disabled}
      />
      <Label for="pg-checkbox-stage" class="cursor-pointer">
        {props.values.label || "Accept terms and conditions"}
      </Label>
    </div>
  );
}