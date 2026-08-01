import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "sheet",
  name: "Sheet / Drawer",
  props: [
    { name: "title", label: "Title", type: "text", default: "Edit Settings" },
    { name: "description", label: "Description", type: "text", default: "Make changes to your project settings here." },
    { name: "side", label: "Slide Edge", type: "select", options: ["right", "left", "top", "bottom"], default: "right" },
    { name: "blur", label: "Backdrop Blur", type: "boolean", default: true },
    { name: "showCloseButton", label: "Show Close (X) Button", type: "boolean", default: true },
  ],
  generateCode: (v) => `<Sheet>
  <SheetTrigger as={Button} variant="outline">Open Sheet (${v.side})</SheetTrigger>
  <SheetContent side="${v.side}"${v.blur === false ? " blur={false}" : ""}${v.showCloseButton === false ? " showCloseButton={false}" : ""}>
    <SheetHeader>
      <SheetTitle>${v.title || "Edit Settings"}</SheetTitle>
      <SheetDescription>${v.description || ""}</SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>`,
};

export default function SheetStage(props: StageProps) {
  return (
    <Sheet>
      <SheetTrigger as={Button} variant="outline">
        Open Sheet ({props.values.side})
      </SheetTrigger>
      <SheetContent
        side={props.values.side}
        blur={props.values.blur}
        showCloseButton={props.values.showCloseButton}
      >
        <SheetHeader>
          <SheetTitle>{props.values.title}</SheetTitle>
          <SheetDescription>{props.values.description}</SheetDescription>
        </SheetHeader>
        <div class="py-4 text-xs text-muted-foreground">
          Sliding drawer body panel.
        </div>
        <SheetFooter>
          <SheetClose as={Button} size="sm">Close</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}