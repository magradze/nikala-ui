import { Toggle, ToggleGroup } from "@/components/ui/toggle";
import { Bold, Italic, Underline } from "lucide-solid";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "toggle",
  name: "Toggle",
  props: [
    {
      name: "variant",
      label: "Variant",
      type: "select",
      options: ["default", "outline"],
      default: "default",
    },
    {
      name: "size",
      label: "Size",
      type: "select",
      options: ["sm", "default", "lg"],
      default: "default",
    },
    {
      name: "disabled",
      label: "Disabled",
      type: "boolean",
      default: false,
    },
  ],
  generateCode: (v) => {
    const variantStr = v.variant && v.variant !== "default" ? ` variant="${v.variant}"` : "";
    const sizeStr = v.size && v.size !== "default" ? ` size="${v.size}"` : "";
    const disabledStr = v.disabled ? " disabled" : "";

    return `<Toggle${variantStr}${sizeStr}${disabledStr} aria-label="Toggle italic">
  <Italic class="h-4 w-4" />
</Toggle>`;
  },
};

export default function ToggleStage(props: StageProps) {
  return (
    <div class="flex flex-col items-center justify-center p-6 space-y-4">
      <Toggle
        variant={props.values.variant || "default"}
        size={props.values.size || "default"}
        disabled={props.values.disabled || false}
        aria-label="Toggle italic"
      >
        <Italic class="h-4 w-4" />
      </Toggle>

      <ToggleGroup>
        <Toggle
          variant={props.values.variant || "default"}
          size={props.values.size || "default"}
          disabled={props.values.disabled || false}
          aria-label="Toggle bold"
        >
          <Bold class="h-4 w-4" />
        </Toggle>
        <Toggle
          variant={props.values.variant || "default"}
          size={props.values.size || "default"}
          disabled={props.values.disabled || false}
          aria-label="Toggle italic"
        >
          <Italic class="h-4 w-4" />
        </Toggle>
        <Toggle
          variant={props.values.variant || "default"}
          size={props.values.size || "default"}
          disabled={props.values.disabled || false}
          aria-label="Toggle underline"
        >
          <Underline class="h-4 w-4" />
        </Toggle>
      </ToggleGroup>
    </div>
  );
}
