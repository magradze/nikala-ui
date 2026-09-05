// packages/docs/src/themes/default/overlays/search-dialog.tsx
import { For, Show, type Component } from "solid-js";
import { CommandDialog } from "@/components/ui/command";
import { CommandInput } from "@/components/ui/command";
import { CommandList } from "@/components/ui/command";
import { CommandEmpty } from "@/components/ui/command";
import { CommandGroup } from "@/components/ui/command";
import { CommandItem } from "@/components/ui/command";
import { FileText } from "lucide-solid";
import type { DocsSearchDialogProps } from "../../types.js";

export const DocsSearchDialog: Component<DocsSearchDialogProps> = (props) => {
  const handleSelect = (url: string) => {
    props.onOpenChange(false);
    if (props.onSelectPage) {
      props.onSelectPage(url);
    } else if (typeof window !== "undefined") {
      window.location.href = url;
    }
  };

  return (
    <CommandDialog
      open={props.open}
      onOpenChange={props.onOpenChange}
      enableHotkey={true}
    >
      <CommandInput placeholder="Search documentation..." />
      <CommandList>
        <CommandEmpty>No matching documents found.</CommandEmpty>
        <Show when={props.pages && props.pages.length > 0}>
          <CommandGroup heading="Pages">
            <For each={props.pages}>
              {(page) => (
                <CommandItem
                  title={page.title}
                  subtitle={page.url}
                  description={page.description}
                  icon={FileText}
                  onSelect={() => handleSelect(page.url)}
                />
              )}
            </For>
          </CommandGroup>
        </Show>
      </CommandList>
    </CommandDialog>
  );
};
