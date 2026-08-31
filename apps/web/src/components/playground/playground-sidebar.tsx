import { For, createSignal, createEffect, Show } from "solid-js";
import { COMPONENT_SECTIONS } from "@/config/docs";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-solid";
import { isItemNew } from "@/components/docs-sidebar";
import { createScrollIntoView } from "@nikala-ui/hooks";

interface PlaygroundSidebarProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

export function PlaygroundSidebar(props: PlaygroundSidebarProps) {
  const [activeElement, setActiveElement] = createSignal<HTMLElement | null>(null);

  /* SolidJS Primitive for auto-scrolling active selected component into view */
  createScrollIntoView(activeElement, {
    behavior: "smooth",
    block: "nearest",
    delay: 50,
  });

  return (
    <aside class="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block border-r border-border/40 bg-background">
      <Sidebar collapsible="none" class="h-full w-full border-none bg-transparent">
        <SidebarContent class="py-6 px-1 space-y-3">
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
                    <CollapsibleTrigger class="group flex h-8 w-full items-center justify-between rounded-md px-2 text-xs font-semibold text-foreground tracking-wider uppercase hover:bg-accent/50 transition-colors cursor-pointer">
                      <div class="flex items-center gap-1.5">
                        <span>{section.title}</span>
                        <Show when={!isOpen() && sectionHasNewItem()}>
                          <span class="relative flex h-1.5 w-1.5">
                            <span class="animate-ping absolute inline-flex h-full w-full rounded-lg bg-primary opacity-75"></span>
                            <span class="relative inline-flex rounded-lg h-1.5 w-1.5 bg-primary"></span>
                          </span>
                        </Show>
                      </div>
                      <ChevronRight class="h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 group-data-expanded:rotate-90" />
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <SidebarGroupContent class="pt-0.5">
                        <SidebarMenu class="gap-0.5">
                          <For each={sectionItems()}>
                            {(item) => {
                              const isActive = () => props.selectedId === item.id;
                              const isNew = isItemNew(item.addedAt);

                              return (
                                <SidebarMenuItem>
                                  <button
                                    type="button"
                                    ref={(el) => {
                                      if (typeof window !== "undefined" && isActive()) {
                                        setActiveElement(el);
                                      }
                                    }}
                                    onClick={() => props.onSelect(item.id)}
                                    class={`flex h-8 w-full items-center justify-between rounded-md px-2 text-sm font-medium transition-colors duration-100 ease-out text-left cursor-pointer select-none ${
                                      isActive()
                                        ? "bg-primary text-primary-foreground font-bold shadow-2xs"
                                        : "bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                    }`}
                                  >
                                    <span>{item.title}</span>
                                    <Show when={isNew}>
                                      <span class="relative flex h-2 w-2">
                                        <span class="animate-ping absolute inline-flex h-full w-full rounded-lg bg-primary opacity-75"></span>
                                        <span class="relative inline-flex rounded-lg h-2 w-2 bg-primary"></span>
                                      </span>
                                    </Show>
                                  </button>
                                </SidebarMenuItem>
                              );
                            }}
                          </For>
                        </SidebarMenu>
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