import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
} from "@/components/ui/context-menu";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "context-menu",
  name: "Context Menu",
  props: [],
  generateCode: () => `<ContextMenu>
  <ContextMenuTrigger class="flex h-36 w-full max-w-sm items-center justify-center rounded-md border border-dashed border-border text-sm font-medium text-muted-foreground select-none">
    Right click here
  </ContextMenuTrigger>
  <ContextMenuContent class="w-64">
    <ContextMenuItem>
      Back <ContextMenuShortcut>⌘[</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuItem disabled>
      Forward <ContextMenuShortcut>⌘]</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuItem>
      Reload <ContextMenuShortcut>⌘R</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuCheckboxItem checked>
      Show Bookmarks Bar <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
    </ContextMenuCheckboxItem>
  </ContextMenuContent>
</ContextMenu>`,
};

export default function ContextMenuStage(_props: StageProps) {
  return (
    <div class="flex items-center justify-center p-6 w-full">
      <ContextMenu>
        <ContextMenuTrigger class="flex h-36 w-full max-w-sm items-center justify-center rounded-md border border-dashed border-border text-sm font-medium text-muted-foreground select-none bg-muted/30 hover:bg-muted/50 transition-colors cursor-context-menu">
          Right-click inside this container
        </ContextMenuTrigger>
        <ContextMenuContent class="w-64">
          <ContextMenuItem>
            Back <ContextMenuShortcut>⌘[</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem disabled>
            Forward <ContextMenuShortcut>⌘]</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Reload <ContextMenuShortcut>⌘R</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuCheckboxItem checked>
            Show Bookmarks Bar <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
          </ContextMenuCheckboxItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
}
