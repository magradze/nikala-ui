import { For, createSignal, createEffect, onMount, Show } from "solid-js";
import { COMPONENT_SECTIONS } from "@/config/docs";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-solid";
import { isItemNew } from "@/components/docs-sidebar";

interface PlaygroundSidebarProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

export function PlaygroundSidebar(props: PlaygroundSidebarProps) {
  // Only scroll selected component into view ONCE on initial load
  onMount(() => {
    setTimeout(() => {
      if (typeof document !== "undefined") {
        const activeBtn = document.querySelector<HTMLElement>("aside button[data-active='true']");
        activeBtn?.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }, 100);
  });

  return (
    <aside class="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block border-r border-border/40 bg-background">
      <Sidebar collapsible="none" class="h-full w-full border-none bg-transparent">
        <SidebarContent class="py-6 px-1 space-y-3 overflow-x-hidden">
          <For each={COMPONENT_SECTIONS}>
            {(section) => {
              const sectionItems = () =>
                section.items.map((item) => ({
                  ...item,
                  id: item.href.replace("/docs/components/", ""),
                }));

              const hasActiveItem = () =>
                sectionItems().some((item) => item.id === props.selectedId);

              const sectionHasNewItem = () =>
                section.items.some((item) => isItemNew(item.addedAt));

              const [isOpen, setIsOpen] = createSignal(hasActiveItem());

              // Automatically open section when the selected item changes
              createEffect(() => {
                if (hasActiveItem()) {
                  setIsOpen(true);
                }
              });

              return (
                <SidebarGroup class="p-0">
                  <Collapsible open={isOpen()} onOpenChange={setIsOpen} class="space-y-1">
                    <CollapsibleTrigger class="group flex h-8 w-full items-center justify-between rounded-md px-2 text-xs font-semibold text-foreground tracking-wider uppercase hover:bg-accent/50 cursor-pointer select-none">
                      <div class="flex items-center gap-1.5 pointer-events-none truncate">
                        <span>{section.title}</span>
                        <Show when={!isOpen() && sectionHasNewItem()}>
                          <span class="size-1.5 rounded-full bg-primary shrink-0 pointer-events-none" />
                        </Show>
                      </div>
                      <ChevronRight class="h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 group-data-expanded:rotate-90 pointer-events-none shrink-0" />
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <SidebarGroupContent class="pt-0.5">
                        <SidebarMenuSub class="ml-3.5 border-l border-border/50 pl-2.5 my-1 gap-0.5">
                          <For each={sectionItems()}>
                            {(item) => {
                              const isActive = () => props.selectedId === item.id;
                              const isNew = isItemNew(item.addedAt);

                              return (
                                <SidebarMenuSubItem>
                                  <button
                                    type="button"
                                    data-active={isActive() ? "true" : "false"}
                                    onClick={() => props.onSelect(item.id)}
                                    class={`flex h-7.5 w-full items-center justify-between rounded-md px-2 text-xs font-medium text-left cursor-pointer select-none ${
                                      isActive()
                                        ? "bg-primary text-primary-foreground font-semibold shadow-2xs"
                                        : "bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                    }`}
                                  >
                                    <span class="pointer-events-none truncate">{item.title}</span>
                                    <Show when={isNew}>
                                      <span class="size-1.5 rounded-full bg-primary shrink-0 pointer-events-none" />
                                    </Show>
                                  </button>
                                </SidebarMenuSubItem>
                              );
                            }}
                          </For>
                        </SidebarMenuSub>
                      </SidebarGroupContent>
                    </CollapsibleContent>
                  </Collapsible>
                </SidebarGroup>
              );
            }}
          </For>
        </SidebarContent>
      </Sidebar>
    </aside>
  );
}