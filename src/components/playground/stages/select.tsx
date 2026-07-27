import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "select",
  name: "Select",
  props: [
    { name: "placeholder", label: "Placeholder", type: "text", default: "Select a framework..." },
    { name: "disabled", label: "Disabled", type: "boolean", default: false },
  ],
  generateCode: (v) => `<Select<string>
  options={["SolidJS", "SolidStart", "Vite", "Tauri"]}${v.disabled ? " disabled={true}" : ""}
  placeholder="${v.placeholder || "Select a framework..."}"
  itemComponent={(props) => (
    <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
  )}
>
  <SelectTrigger class="w-45">
    <SelectValue<string>>{(s) => s.selectedOption()}</SelectValue>
  </SelectTrigger>
  <SelectContent />
</Select>`,
};

export default function SelectStage(props: StageProps) {
  return (
    <Select<string>
      disabled={props.values.disabled}
      options={["SolidJS", "SolidStart", "Vite", "Tauri"]}
      placeholder={props.values.placeholder}
      itemComponent={(p) => <SelectItem item={p.item}>{p.item.rawValue}</SelectItem>}
    >
      <SelectTrigger class="w-45">
        <SelectValue<string>>{(s) => s.selectedOption()}</SelectValue>
      </SelectTrigger>
      <SelectContent />
    </Select>
  );
}