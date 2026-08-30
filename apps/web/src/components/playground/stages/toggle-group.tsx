import { createSignal } from "solid-js";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Bold,
  Italic,
  Underline,
} from "lucide-solid";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "toggle-group",
  name: "Toggle Group",
  props: [
    {
      name: "type",
      label: "Type",
      type: "select",
      options: ["single", "multiple"],
      default: "single",
    },
    {
      name: "variant",
      label: "Variant",
      type: "select",
      options: ["default", "outline"],
      default: "outline",
    },
    {
      name: "size",
      label: "Size",
      type: "select",
      options: ["sm", "default", "lg"],
      default: "default",
    },
    {
      name: "orientation",
      label: "Orientation",
      type: "select",
      options: ["horizontal", "vertical"],
      default: "horizontal",
    },
    {
      name: "disabled",
      label: "Disabled",
      type: "boolean",
      default: false,
    },
  ],
  generateCode: (v) => {
    const typeStr = v.type && v.type !== "single" ? ` type="${v.type}"` : ` type="single"`;
    const variantStr = v.variant && v.variant !== "default" ? ` variant="${v.variant}"` : "";
    const sizeStr = v.size && v.size !== "default" ? ` size="${v.size}"` : "";
    const orientationStr = v.orientation && v.orientation !== "horizontal" ? ` orientation="${v.orientation}"` : "";
    const disabledStr = v.disabled ? " disabled" : "";

    if (v.type === "multiple") {
      return `<ToggleGroup${typeStr}${variantStr}${sizeStr}${orientationStr}${disabledStr} defaultValue={["bold", "italic"]}>
  <ToggleGroupItem value="bold" aria-label="Toggle Bold">
    <Bold class="size-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="italic" aria-label="Toggle Italic">
    <Italic class="size-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="underline" aria-label="Toggle Underline">
    <Underline class="size-4" />
  </ToggleGroupItem>
</ToggleGroup>`;
    }

    return `<ToggleGroup${typeStr}${variantStr}${sizeStr}${orientationStr}${disabledStr} defaultValue="center">
  <ToggleGroupItem value="left" aria-label="Align Left">
    <AlignLeft class="size-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="center" aria-label="Align Center">
    <AlignCenter class="size-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="right" aria-label="Align Right">
    <AlignRight class="size-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="justify" aria-label="Align Justify">
    <AlignJustify class="size-4" />
  </ToggleGroupItem>
</ToggleGroup>`;
  },
};

export default function ToggleGroupStage(props: StageProps) {
  const [singleValue, setSingleValue] = createSignal<string>("center");
  const [multiValue, setMultiValue] = createSignal<string[]>(["bold", "italic"]);

  return (
    <div class="flex flex-col items-center justify-center p-6 space-y-4">
      {props.values.type === "multiple" ? (
        <ToggleGroup
          type="multiple"
          value={multiValue()}
          onChange={(val) => setMultiValue(val)}
          variant={props.values.variant || "outline"}
          size={props.values.size || "default"}
          orientation={props.values.orientation || "horizontal"}
          disabled={props.values.disabled || false}
        >
          <ToggleGroupItem value="bold" aria-label="Toggle Bold">
            <Bold class="size-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle Italic">
            <Italic class="size-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Toggle Underline">
            <Underline class="size-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      ) : (
        <ToggleGroup
          type="single"
          value={singleValue()}
          onChange={(val) => setSingleValue(val || "center")}
          variant={props.values.variant || "outline"}
          size={props.values.size || "default"}
          orientation={props.values.orientation || "horizontal"}
          disabled={props.values.disabled || false}
        >
          <ToggleGroupItem value="left" aria-label="Align Left">
            <AlignLeft class="size-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align Center">
            <AlignCenter class="size-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align Right">
            <AlignRight class="size-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="justify" aria-label="Align Justify">
            <AlignJustify class="size-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      )}

      <div class="text-xs text-muted-foreground font-mono">
        Active: {props.values.type === "multiple" ? JSON.stringify(multiValue()) : `"${singleValue()}"`}
      </div>
    </div>
  );
}
