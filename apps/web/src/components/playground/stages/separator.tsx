import { Separator } from "@/components/ui/separator";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "separator",
  name: "Separator",
  props: [
    {
      name: "orientation",
      label: "Orientation",
      type: "select",
      options: ["horizontal", "vertical"],
      default: "horizontal",
    },
  ],
  generateCode: (v) =>
    `<Separator orientation="${v.orientation || "horizontal"}" />`,
};

export default function SeparatorStage(props: StageProps) {
  const isVertical = () => props.values.orientation === "vertical";

  return (
    <div
      class={`flex items-center justify-center p-4 w-full max-w-xs ${
        isVertical()
          ? "h-16 flex-row space-x-4 items-center"
          : "flex-col space-y-4"
      }`}
    >
      <div class="space-y-0.5 text-center">
        <h4 class="text-sm font-medium leading-none">Nikala UI</h4>
        <p class="text-[11px] text-muted-foreground">SolidJS & Tailwind v4</p>
      </div>

      <Separator
        orientation={props.values.orientation || "horizontal"}
        class={isVertical() ? "h-12 w-px" : "w-full h-px"}
      />

      <div class="flex items-center space-x-2 text-xs font-mono text-muted-foreground">
        <span>Source</span>
      </div>
    </div>
  );
}