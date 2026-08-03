import { Popover, PopoverTrigger, PopoverContent, PopoverTitle, PopoverDescription, PopoverCloseButton, PopoverArrow } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "popover",
  name: "Popover",
  props: [
    { name: "title", label: "Title", type: "text", default: "Dimensions" },
    {
      name: "description",
      label: "Description",
      type: "text",
      default: "Set the width and max-height for the layer.",
    },
    {
      name: "placement",
      label: "Placement",
      type: "select",
      options: ["bottom", "top", "left", "right", "bottom-start", "bottom-end", "top-start", "top-end"],
      default: "bottom",
    },
    { name: "showArrow", label: "Show Arrow", type: "boolean", default: true },
  ],
  generateCode: (v) => {
    const placementAttr = v.placement && v.placement !== "bottom" ? ` placement="${v.placement}"` : "";
    const arrowCode = v.showArrow ? `\n    <PopoverArrow />` : "";

    return `<Popover${placementAttr}>
  <PopoverTrigger as={Button} variant="outline">
    Open Popover
  </PopoverTrigger>
  <PopoverContent class="w-80">${arrowCode}
    <PopoverCloseButton />
    <div class="grid gap-4">
      <div class="space-y-2">
        <PopoverTitle>${v.title || "Dimensions"}</PopoverTitle>
        <PopoverDescription>
          ${v.description || "Set the width and max-height for the layer."}
        </PopoverDescription>
      </div>
      <div class="grid gap-2">
        <div class="grid grid-cols-3 items-center gap-4">
          <Label for="width">Width</Label>
          <Input id="width" value="100%" class="col-span-2 h-8" />
        </div>
      </div>
    </div>
  </PopoverContent>
</Popover>`;
  },
};

export default function PopoverStage(props: StageProps) {
  return (
    <div class="flex items-center justify-center p-12">
      <Popover placement={(props.values.placement as any) || "bottom"}>
        <PopoverTrigger as={Button} variant="outline">
          Open Popover
        </PopoverTrigger>
        <PopoverContent class="w-80">
          {props.values.showArrow && <PopoverArrow />}
          <PopoverCloseButton />
          <div class="grid gap-4">
            <div class="space-y-2">
              <PopoverTitle>{(props.values.title as string) || "Dimensions"}</PopoverTitle>
              <PopoverDescription>
                {(props.values.description as string) || "Set the width and max-height for the layer."}
              </PopoverDescription>
            </div>
            <div class="grid gap-2">
              <div class="grid grid-cols-3 items-center gap-4">
                <Label for="stage-width">Width</Label>
                <Input id="stage-width" value="100%" class="col-span-2 h-8" />
              </div>
              <div class="grid grid-cols-3 items-center gap-4">
                <Label for="stage-height">Height</Label>
                <Input id="stage-height" value="25px" class="col-span-2 h-8" />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}