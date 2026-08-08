import { NumberInput } from "@/components/ui/number-input";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "number-input",
  name: "Number Input",
  props: [
    {
      name: "allowNegative",
      label: "Allow Negative",
      type: "boolean",
      default: false,
    },
    {
      name: "minValue",
      label: "Min Value",
      type: "number",
      default: 0,
    },
    {
      name: "maxValue",
      label: "Max Value",
      type: "number",
      default: 100,
    },
    {
      name: "step",
      label: "Step",
      type: "number",
      default: 1,
    },
    {
      name: "disabled",
      label: "Disabled",
      type: "boolean",
      default: false,
    },
  ],
  generateCode: (v) => {
    const negStr = v.allowNegative ? " allowNegative" : "";
    const minStr = v.minValue !== undefined && v.minValue !== 0 ? ` minValue={${v.minValue}}` : "";
    const maxStr = v.maxValue !== undefined && v.maxValue !== 100 ? ` maxValue={${v.maxValue}}` : "";
    const stepStr = v.step !== undefined && v.step !== 1 ? ` step={${v.step}}` : "";
    const disabledStr = v.disabled ? " disabled" : "";

    return `<NumberInput defaultValue={10}${negStr}${minStr}${maxStr}${stepStr}${disabledStr} />`;
  },
};

export default function NumberInputStage(props: StageProps) {
  return (
    <div class="flex items-center justify-center p-6 w-full max-w-xs">
      <NumberInput
        defaultValue={10}
        allowNegative={props.values.allowNegative || false}
        minValue={props.values.minValue ?? (props.values.allowNegative ? -50 : 0)}
        maxValue={props.values.maxValue ?? 100}
        step={props.values.step ?? 1}
        disabled={props.values.disabled || false}
      />
    </div>
  );
}
