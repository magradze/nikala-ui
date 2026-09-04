// packages/docs/src/themes/default/Sidebar.tsx
import { For, Show, splitProps, type Component } from "solid-js";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  sidebarMenuButtonVariants,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  ScrollArea,
  Badge,
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  cn,
} from "@nikala-ui/core";
import { ChevronRight } from "lucide-solid";
import type { DocsSidebarProps } from "../types.js";
import type { SidebarItem } from "../../types.js";

export const DocsSidebar: Component<DocsSidebarProps> = (props) => {
  const [local, rest] = splitProps(props, ["tree", "currentUrl", "class"]);

  const isItemActive = (url?: string) => {
    if (!url || !local.currentUrl) return false;
    return local.currentUrl === url;
  };

  return (
    <Sidebar
      collapsible="offcanvas"
      class={cn(
        "sticky top-14 z-30 h-[calc(100vh-3.5rem)] shrink-0 border-r border-border/60 bg-background",
        local.class
      )}
      {...rest}
    >
      <SidebarContent class="p-2 h-full overflow-hidden">
        <ScrollArea class="h-full">
          <For each={local.tree}>
            {(group) => (
              <SidebarGroup class="py-2">
                <Show when={group.title && group.items && group.items.length > 0}>
                  <SidebarGroupLabel class="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-2 mb-1">
                    {group.title}
                  </SidebarGroupLabel>
                </Show>

                <SidebarGroupContent>
                  <SidebarMenu>
                    <For each={group.items || [group]}>
                      {(item: SidebarItem) => {
                        const hasChildren = () => item.items && item.items.length > 0;

                        return (
                          <Show
                            when={hasChildren()}
                            fallback={
                              <SidebarMenuItem>
                                <a
                                  href={item.href || "#"}
                                  data-active={isItemActive(item.href) ? "true" : "false"}
                                  class={sidebarMenuButtonVariants({ variant: "default" }) + " text-sm font-normal transition-colors"}
                                >
                                  <span class="truncate">{item.title}</span>
                                  <Show when={item.badge}>
                                    <Badge
                                      variant="outline"
                                      class="ml-auto text-[10px] py-0 px-1.5 font-normal uppercase"
                                    >
                                      {item.badge}
                                    </Badge>
                                  </Show>
                                </a>
                              </SidebarMenuItem>
                            }
                          >
                            <Collapsible defaultOpen={true} class="group/collapsible">
                              <SidebarMenuItem>
                                <CollapsibleTrigger
                                  class={sidebarMenuButtonVariants({ variant: "default" }) + " text-sm font-normal"}
                                >
                                  <span class="truncate">{item.title}</span>
                                  <ChevronRight class="ml-auto size-3.5 transition-transform duration-200 group-data-[expanded]/collapsible:rotate-90" />
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                  <SidebarMenuSub>
                                    <For each={item.items}>
                                      {(subItem) => (
                                        <SidebarMenuSubItem>
                                          <SidebarMenuSubButton
                                            href={subItem.href || "#"}
                                            isActive={isItemActive(subItem.href)}
                                            class="text-xs"
                                          >
                                            <span class="truncate">{subItem.title}</span>
                                            <Show when={subItem.badge}>
                                              <Badge
                                                variant="outline"
                                                class="ml-auto text-[9px] py-0 px-1 font-normal uppercase"
                                              >
                                                {subItem.badge}
                                              </Badge>
                                            </Show>
                                          </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                      )}
                                    </For>
                                  </SidebarMenuSub>
                                </CollapsibleContent>
                              </SidebarMenuItem>
                            </Collapsible>
                          </Show>
                        );
                      }}
                    </For>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )}
          </For>
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
};
