import { createSignal, Index } from "solid-js";
import {
  PinInput,
  PinInputInput,
  PinInputLabel,
} from "@/components/ui/pin-input";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "pin-input",
  name: "Pin Input",
  props: [
    { name: "label", label: "Label", type: "text", default: "Verification Code" },
    {
      name: "length",
      label: "Slot Count",
      type: "select",
      options: ["3", "4", "6"],
      default: "6",
    },
    {
      name: "type",
      label: "Input Mode",
      type: "select",
      options: ["numeric", "alphanumeric"],
      default: "numeric",
    },
    { name: "mask", label: "Masked (Password)", type: "boolean", default: false },
    { name: "disabled", label: "Disabled", type: "boolean", default: false },
  ],
  generateCode: (v) => `<PinInput
  value={value()}
  onValueChange={setValue}
  length={${v.length || 6}}
  type="${v.type || "numeric"}"${v.mask ? "\n  mask" : ""}${v.disabled ? "\n  disabled" : ""}
  class="flex-col items-start gap-2"
>
  <PinInputLabel>${v.label || "Verification Code"}</PinInputLabel>
  <div class="flex items-center gap-2">
    <Index each={Array.from({ length: ${v.length || 6} })}>
      {(_, index) => <PinInputInput index={index} />}
    </Index>
  </div>
</PinInput>`,
};

export default function PinInputStage(props: StageProps) {
  const [value, setValue] = createSignal("");

  const slotsCount = () => Number(props.values.length || 6);

  return (
    <div class="flex flex-col items-center justify-center py-6 min-h-40">
      <PinInput
        value={value()}
        onValueChange={setValue}
        length={slotsCount()}
        type={props.values.type || "numeric"}
        mask={props.values.mask}
        disabled={props.values.disabled}
        class="flex-col items-start gap-2"
      >
        <PinInputLabel>{props.values.label || "Verification Code"}</PinInputLabel>
        <div class="flex items-center gap-2">
          <Index each={Array.from({ length: slotsCount() })}>
            {(_, index) => <PinInputInput index={index} />}
          </Index>
        </div>
      </PinInput>
      <p class="text-xs text-muted-foreground font-mono mt-4">
        Current Code: <span class="text-foreground font-bold">{value() || "—"}</span>
      </p>
    </div>
  );
}
