import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "label",
  name: "Label",
  props: [
    { name: "children", label: "Label Text", type: "text", default: "Email Address" },
  ],
};

export default function LabelStage(props: StageProps) {
  return (
    <div class="grid w-full max-w-xs gap-1.5">
      <Label for="pg-label-input">{props.values.children || "Email Address"}</Label>
      <Input id="pg-label-input" placeholder="nikala@pirosmani.ge" />
    </div>
  );
}