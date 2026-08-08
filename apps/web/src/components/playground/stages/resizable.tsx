import {
  ResizableGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "resizable",
  name: "Resizable",
  props: [
    {
      name: "orientation",
      label: "Orientation",
      type: "select",
      options: ["horizontal", "vertical"],
      default: "horizontal",
    },
    {
      name: "withHandle",
      label: "With Handle",
      type: "boolean",
      default: true,
    },
  ],
  generateCode: (v) => {
    const oriStr = v.orientation === "vertical" ? ' orientation="vertical"' : "";
    const handleStr = v.withHandle ? " withHandle" : "";

    return `<ResizableGroup${oriStr} class="h-56 max-w-md rounded-lg border">
  <ResizablePanel id="panel-1" initialSize={30} class="flex items-center justify-center p-6 bg-muted/20">
    <span class="font-medium text-sm">Panel One</span>
  </ResizablePanel>
  <ResizableHandle handleIndex={0}${handleStr} />
  <ResizablePanel id="panel-2" initialSize={70} class="flex items-center justify-center p-6 bg-muted/40">
    <span class="font-medium text-sm">Panel Two</span>
  </ResizablePanel>
</ResizableGroup>`;
  },
};

export default function ResizableStage(props: StageProps) {
  const orientation = () => (props.values.orientation as "horizontal" | "vertical") || "horizontal";
  const withHandle = () => props.values.withHandle !== false;

  return (
    <div class="flex items-center justify-center p-6 w-full">
      <ResizableGroup
        orientation={orientation()}
        class="h-56 w-full max-w-md rounded-lg border"
      >
        <ResizablePanel id="panel-1" initialSize={35} class="flex items-center justify-center p-6 bg-muted/20">
          <span class="font-medium text-sm">Panel 1 (35%)</span>
        </ResizablePanel>
        <ResizableHandle handleIndex={0} withHandle={withHandle()} />
        <ResizablePanel id="panel-2" initialSize={65} class="flex items-center justify-center p-6 bg-muted/40">
          <span class="font-medium text-sm">Panel 2 (65%)</span>
        </ResizablePanel>
      </ResizableGroup>
    </div>
  );
}
