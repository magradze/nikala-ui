import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Show } from "solid-js";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "dropdown-menu",
  name: "Dropdown Menu",
  props: [
    { name: "label", label: "Header Label", type: "text", default: "My Account" },
    {
      name: "placement",
      label: "Placement Position",
      type: "select",
      options: [
        "bottom-end",
        "bottom-start",
        "bottom",
        "top-end",
        "top-start",
        "top",
        "left-end",
        "right-end",
      ],
      default: "bottom-end",
    },
    { name: "showShortcut", label: "Show Shortcuts", type: "boolean", default: true },
    { name: "showSubmenu", label: "Show Submenu", type: "boolean", default: true },
    { name: "showDestructive", label: "Show Destructive Item", type: "boolean", default: true },
  ],
  generateCode: (v) => `<DropdownMenu${v.placement !== "bottom-end" ? ` placement="${v.placement}"` : ""}>
  <DropdownMenuTrigger as={Button} variant="outline">Open Menu</DropdownMenuTrigger>
  <DropdownMenuContent class="w-56">
    <DropdownMenuLabel>${v.label || "My Account"}</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      <span>Profile</span>${v.showShortcut ? `\n      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>` : ""}
    </DropdownMenuItem>${v.showSubmenu ? `\n    <DropdownMenuSub>\n      <DropdownMenuSubTrigger>Invite Users</DropdownMenuSubTrigger>\n      <DropdownMenuSubContent>\n        <DropdownMenuItem>Via Email</DropdownMenuItem>\n      </DropdownMenuSubContent>\n    </DropdownMenuSub>` : ""}${v.showDestructive ? `\n    <DropdownMenuSeparator />\n    <DropdownMenuItem variant="destructive">\n      <span>Log out</span>${v.showShortcut ? `\n      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>` : ""}\n    </DropdownMenuItem>` : ""}
  </DropdownMenuContent>
</DropdownMenu>`,
};

export default function DropdownMenuStage(props: StageProps) {
  return (
    <DropdownMenu placement={props.values.placement || "bottom-end"}>
      <DropdownMenuTrigger as={Button} variant="outline">
        Open Menu ({props.values.placement || "bottom-end"})
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-56">
        <Show when={props.values.label}>
          <DropdownMenuLabel>{props.values.label}</DropdownMenuLabel>
          <DropdownMenuSeparator />
        </Show>

        <DropdownMenuItem>
          <span>Profile</span>
          <Show when={props.values.showShortcut}>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </Show>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <span>Settings</span>
          <Show when={props.values.showShortcut}>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </Show>
        </DropdownMenuItem>

        <Show when={props.values.showSubmenu}>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span>Invite Users</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent class="w-40">
              <DropdownMenuItem>Via Email</DropdownMenuItem>
              <DropdownMenuItem>Via Link</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </Show>

        <Show when={props.values.showDestructive}>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            <span>Log out</span>
            <Show when={props.values.showShortcut}>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </Show>
          </DropdownMenuItem>
        </Show>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}