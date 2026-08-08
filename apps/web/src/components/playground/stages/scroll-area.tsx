import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "scroll-area",
  name: "Scroll Area",
  props: [
    {
      name: "orientation",
      label: "Orientation",
      type: "select",
      options: ["vertical", "horizontal", "both"],
      default: "vertical",
    },
  ],
  generateCode: (v) => {
    const oriStr = v.orientation && v.orientation !== "vertical" ? ` orientation="${v.orientation}"` : "";

    if (v.orientation === "horizontal") {
      return `<ScrollArea orientation="horizontal" class="w-96 whitespace-nowrap rounded-md border p-4">
  <div class="flex w-max space-x-4">
    {Array.from({ length: 15 }).map((_, i) => (
      <div class="h-24 w-28 shrink-0 rounded-md border border-border bg-muted/30 flex flex-col items-center justify-center font-medium text-xs gap-1">
        <span>Item #{i + 1}</span>
      </div>
    ))}
  </div>
</ScrollArea>`;
    }

    return `<ScrollArea${oriStr} class="h-72 w-56 rounded-md border p-4">
  <div class="space-y-2">
    <h4 class="text-sm font-medium leading-none">Tags</h4>
    <p class="text-xs text-muted-foreground">List of generated tags</p>
  </div>
  <Separator class="my-4" />
  <div class="space-y-2">
    {Array.from({ length: 30 }).map((_, i) => (
      <div class="text-sm font-mono">v1.0.0-beta.\${i + 1}</div>
    ))}
  </div>
</ScrollArea>`;
  },
};

export default function ScrollAreaStage(props: StageProps) {
  const orientation = () => (props.values.orientation as "vertical" | "horizontal" | "both") || "vertical";

  return (
    <div class="flex items-center justify-center p-6 w-full max-w-full">
      {orientation() === "horizontal" ? (
        <ScrollArea orientation="horizontal" class="w-96 max-w-full whitespace-nowrap rounded-md border p-4">
          <div class="flex w-max space-x-4">
            {Array.from({ length: 15 }).map((_, i) => (
              <div class="h-24 w-28 shrink-0 rounded-md border border-border bg-muted/30 flex flex-col items-center justify-center font-medium text-xs gap-1">
                <span>Item #{i + 1}</span>
                <span class="text-[10px] text-muted-foreground">Card</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      ) : (
        <ScrollArea
          orientation={orientation()}
          class="h-72 w-56 rounded-md border p-4"
        >
          <div class="space-y-2">
            <h4 class="text-sm font-medium leading-none">Tags</h4>
            <p class="text-xs text-muted-foreground">List of generated tags</p>
          </div>
          <Separator class="my-4" />
          <div class="space-y-2">
            {Array.from({ length: 30 }).map((_, i) => (
              <div class="text-sm font-mono text-foreground hover:text-primary transition-colors cursor-pointer">
                v1.0.0-beta.{i + 1}
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
