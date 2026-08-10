import { Show } from "solid-js";
import { FolderOpen, Plus } from "lucide-solid";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyAction,
  EmptyDescription,
  EmptyIcon,
  EmptyTitle,
} from "@/components/ui/empty";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "empty",
  name: "Empty",
  props: [
    { name: "title", label: "Title", type: "text", default: "No projects yet" },
    { name: "description", label: "Description", type: "text", default: "Create your first project to get started." },
    { name: "showAction", label: "Show Action", type: "boolean", default: true },
    { name: "actionText", label: "Action Text", type: "text", default: "Create project" },
  ],
  generateCode: (v) => `<Empty>
  <EmptyIcon>
    <FolderOpen />
  </EmptyIcon>
  <EmptyTitle>${v.title || "No content"}</EmptyTitle>
  <EmptyDescription>${v.description || "There is nothing here yet."}</EmptyDescription>${v.showAction ? `
  <EmptyAction>
    <Button>
      <Plus />
      ${v.actionText || "Create"}
    </Button>
  </EmptyAction>` : ""}
</Empty>`,
};

export default function EmptyStage(props: StageProps) {
  return (
    <Empty>
      <EmptyIcon>
        <FolderOpen />
      </EmptyIcon>
      <EmptyTitle>{props.values.title || "No projects yet"}</EmptyTitle>
      <EmptyDescription>
        {props.values.description || "Create your first project to get started."}
      </EmptyDescription>
      <Show when={props.values.showAction}>
        <EmptyAction>
          <Button>
            <Plus />
            {props.values.actionText || "Create project"}
          </Button>
        </EmptyAction>
      </Show>
    </Empty>
  );
}
