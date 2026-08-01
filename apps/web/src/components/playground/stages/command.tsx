import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandFooter,
} from "@/components/ui/command";
import { Show } from "solid-js";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "command",
  name: "Command",
  props: [
    { name: "placeholder", label: "Search Placeholder", type: "text", default: "Type a command or search..." },
    { name: "showFooter", label: "Show Footer Bar", type: "boolean", default: true },
  ],
  generateCode: (v) => `<Command class="border border-border">
  <CommandInput placeholder="${v.placeholder || "Type a command..."}" />
  <CommandList>
    <CommandEmpty />
    <CommandGroup heading="Suggestions">
      <CommandItem title="Calendar" subtitle="Schedule events" />
      <CommandItem title="Calculator" subtitle="Compute math" />
    </CommandGroup>
  </CommandList>${v.showFooter ? `\n  <CommandFooter />` : ""}
</Command>`,
};

export default function CommandStage(props: StageProps) {
  return (
    <div class="w-full max-w-sm">
      <Command class="border border-border shadow-md">
        <CommandInput placeholder={props.values.placeholder} />
        <CommandList>
          <CommandEmpty />
          <CommandGroup heading="Suggestions">
            <CommandItem title="Calendar" subtitle="Schedule events" />
            <CommandItem title="Search Emoji" subtitle="Insert icons" />
            <CommandItem title="Calculator" subtitle="Compute math" />
          </CommandGroup>
        </CommandList>
        <Show when={props.values.showFooter}>
          <CommandFooter />
        </Show>
      </Command>
    </div>
  );
}