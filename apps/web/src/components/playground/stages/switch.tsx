import { createSignal, createEffect } from "solid-js";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "switch",
  name: "Switch",
  props: [
    { name: "label", label: "Label Text", type: "text", default: "Enable Push Alerts" },
    { name: "checked", label: "Checked State", type: "boolean", default: true },
    { name: "disabled", label: "Disabled", type: "boolean", default: false },
  ],
  generateCode: (v) => `<div class="flex items-center space-x-2">
  <Switch id="sw"${v.checked ? " defaultChecked" : ""}${v.disabled ? " disabled" : ""} />
  <Label for="sw">${v.label || "Enable Push Alerts"}</Label>
</div>`,
};

export default function SwitchStage(props: StageProps) {
  const [checked, setChecked] = createSignal(Boolean(props.values.checked));

  createEffect(() => {
    setChecked(Boolean(props.values.checked));
  });

  return (
    <div class="flex items-center space-x-2">
      <Switch
        id="pg-switch-stage"
        checked={checked()}
        onChange={(v) => setChecked(v)}
        disabled={props.values.disabled}
      />
      <Label for="pg-switch-stage" class="cursor-pointer">
        {props.values.label || "Enable Push Alerts"}
      </Label>
    </div>
  );
}