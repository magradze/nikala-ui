import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "tooltip",
  name: "Tooltip",
  props: [
    {
      name: "content",
      label: "Tooltip Text",
      type: "text",
      default: "Add to library",
    },
    {
      name: "placement",
      label: "Placement",
      type: "select",
      options: ["top", "bottom", "left", "right"],
      default: "top",
    },
    {
      name: "triggerText",
      label: "Trigger Button Text",
      type: "text",
      default: "Hover Me",
    },
  ],
  generateCode: (v) => {
    const placementAttr = v.placement && v.placement !== "top" ? ` placement="${v.placement}"` : "";

    return `<Tooltip${placementAttr}>
  <TooltipTrigger as={Button} variant="outline">
    ${v.triggerText || "Hover Me"}
  </TooltipTrigger>
  <TooltipContent>
    ${v.content || "Add to library"}
  </TooltipContent>
</Tooltip>`;
  },
};

export default function TooltipStage(props: StageProps) {
  return (
    <div class="flex items-center justify-center p-12">
      <Tooltip placement={(props.values.placement as any) || "top"}>
        <TooltipTrigger as={Button} variant="outline">
          {(props.values.triggerText as string) || "Hover Me"}
        </TooltipTrigger>
        <TooltipContent>
          {(props.values.content as string) || "Add to library"}
        </TooltipContent>
      </Tooltip>
    </div>
  );
}