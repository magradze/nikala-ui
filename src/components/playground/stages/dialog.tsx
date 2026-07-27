import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "dialog",
  name: "Dialog",
  props: [
    { name: "title", label: "Title", type: "text", default: "Edit Profile" },
    { name: "description", label: "Description", type: "text", default: "Make changes to your profile here." },
    { name: "blur", label: "Backdrop Blur", type: "boolean", default: true },
    { name: "showCloseButton", label: "Show Close (X) Button", type: "boolean", default: true },
    { name: "closeOnOutsideClick", label: "Close On Outside Click", type: "boolean", default: true },
  ],
  generateCode: (v) => {
    const propsList: string[] = [];
    if (v.blur === false) propsList.push("blur={false}");
    if (v.showCloseButton === false) propsList.push("showCloseButton={false}");
    if (v.closeOnOutsideClick === false) propsList.push("closeOnOutsideClick={false}");
    const propsStr = propsList.length > 0 ? ` ${propsList.join(" ")}` : "";

    return `<Dialog>
  <DialogTrigger as={Button} variant="outline">Open Dialog</DialogTrigger>
  <DialogContent${propsStr}>
    <DialogHeader>
      <DialogTitle>${v.title || "Edit Profile"}</DialogTitle>
      <DialogDescription>${v.description || ""}</DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>`;
  },
};

export default function DialogStage(props: StageProps) {
  return (
    <Dialog>
      <DialogTrigger as={Button} variant="outline">
        Open Modal Dialog
      </DialogTrigger>
      <DialogContent
        blur={props.values.blur}
        showCloseButton={props.values.showCloseButton}
        closeOnOutsideClick={props.values.closeOnOutsideClick}
      >
        <DialogHeader>
          <DialogTitle>{props.values.title}</DialogTitle>
          <DialogDescription>{props.values.description}</DialogDescription>
        </DialogHeader>
        <div class="py-2 text-xs text-muted-foreground">
          Dialog modal body content.
        </div>
        <DialogFooter>
          <DialogClose as={Button} variant="outline" size="sm">
            Close
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}