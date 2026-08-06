import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";
import { Show } from "solid-js";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "input-group",
  name: "Input Group",
  props: [
    { name: "prefix", label: "Prefix Text", type: "text", default: "https://" },
    { name: "placeholder", label: "Placeholder", type: "text", default: "nikala.dev" },
    { name: "showSuffix", label: "Show Suffix Addon", type: "boolean", default: true },
    { name: "suffixText", label: "Suffix Text", type: "text", default: ".com" },
  ],
};

export default function InputGroupStage(props: StageProps) {
  return (
    <InputGroup class="w-full max-w-xs">
      <Show when={props.values.prefix}>
        <InputGroupAddon align="inline-start" class="text-xs font-mono">
          {props.values.prefix}
        </InputGroupAddon>
      </Show>

      <InputGroupInput placeholder={props.values.placeholder} />

      <Show when={props.values.showSuffix && props.values.suffixText}>
        <InputGroupAddon align="inline-end" class="text-xs font-mono">
          {props.values.suffixText}
        </InputGroupAddon>
      </Show>
    </InputGroup>
  );
}