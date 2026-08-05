import { List, ListGroup, ListHeader, ListItem } from "@/components/ui/list";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "list",
  name: "List",
  props: [
    { name: "header", label: "Header Title", type: "text", default: "Navigation" },
    { name: "hoverVariant", label: "Hover Variant", type: "select", options: ["default", "primary", "accent", "muted"], default: "default" },
    { name: "showChevron", label: "Show Chevron", type: "boolean", default: true },
    { name: "showShortcut", label: "Show Shortcuts", type: "boolean", default: true },
  ],
  generateCode: (v) => `<List class="max-w-xs border border-border rounded-lg p-1 bg-card/30">
  <ListGroup>
    <ListHeader title="${v.header || "Navigation"}" />
    <ListItem
      title="Getting Started"
      subtitle="Architecture philosophy"${v.hoverVariant !== "default" ? `\n      hoverVariant="${v.hoverVariant}"` : ""}${v.showShortcut ? `\n      shortcut="⌘1"` : ""}${v.showChevron ? `\n      showChevron={true}` : ""}
    />
    <ListItem
      title="CLI Reference"
      subtitle="Terminal commands"${v.hoverVariant !== "default" ? `\n      hoverVariant="${v.hoverVariant}"` : ""}${v.showShortcut ? `\n      shortcut="⌘2"` : ""}${v.showChevron ? `\n      showChevron={true}` : ""}
    />
  </ListGroup>
</List>`,
};

export default function ListStage(props: StageProps) {
  return (
    <List class="w-full max-w-xs border border-border rounded-lg p-1 bg-card/30">
      <ListGroup>
        <ListHeader title={props.values.header || "Navigation"} />
        <ListItem
          title="Getting Started"
          subtitle="Architecture philosophy"
          hoverVariant={props.values.hoverVariant}
          shortcut={props.values.showShortcut ? "⌘1" : undefined}
          showChevron={props.values.showChevron}
        />
        <ListItem
          title="CLI Reference"
          subtitle="Terminal commands"
          hoverVariant={props.values.hoverVariant}
          shortcut={props.values.showShortcut ? "⌘2" : undefined}
          showChevron={props.values.showChevron}
        />
      </ListGroup>
    </List>
  );
}