// packages/docs/src/themes/default/Sidebar.tsx
import { createEffect, createSignal, For, Show, splitProps, type Component } from "solid-js";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  sidebarMenuButtonVariants,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarSeparator,
  Badge,
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  cn,
} from "@nikala-ui/core";
import { BookOpen, ChevronRight, FileText, Folder } from "lucide-solid";
import type { DocsSidebarProps } from "../types.js";
import type { SidebarItem } from "../../types.js";

export const DocsSidebar: Component<DocsSidebarProps> = (props) => {
  const [local, rest] = splitProps(props, ["tree", "currentUrl", "title", "logo", "headerSubtitle", "footerText", "showHeader", "showFooter", "class"]);
  const brandText = () => local.logo?.text || local.title || "Nikala Docs";

  const isItemActive = (url?: string) => {
    if (!url || !local.currentUrl) return false;
    return local.currentUrl === url;
  };

  const isItemNew = (addedAt?: string) => {
    if (!addedAt) return false;
    const timestamp = new Date(addedAt).getTime();
    if (!Number.isFinite(timestamp)) return false;
    const ageInDays = (Date.now() - timestamp) / (1000 * 60 * 60 * 24);
    return ageInDays >= 0 && ageInDays <= 14;
  };

  const containsActive = (item: SidebarItem): boolean =>
    isItemActive(item.href) || Boolean(item.items?.some(containsActive));

  return (
    <Sidebar
      collapsible="icon"
      class={cn(
        "sticky top-0 z-30 h-screen shrink-0 rounded-none border-y-0 border-l-0 border-r border-border bg-card shadow-sm",
        local.class
      )}
      {...rest}
    >
      <Show when={local.showHeader !== false}>
        <SidebarHeader class="p-3">
          <SidebarMenuButton size="lg" class="w-full justify-between">
            <div class="flex items-center gap-2.5 overflow-hidden">
              <div class="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-2xs">
                <BookOpen class="size-4" />
              </div>
              <div class="flex min-w-0 flex-col gap-0.5 leading-none group-data-[collapsible=icon]:hidden">
                <span class="truncate text-xs font-bold">{brandText()}</span>
                <span class="truncate text-[10px] text-muted-foreground">{local.headerSubtitle}</span>
              </div>
            </div>
          </SidebarMenuButton>
        </SidebarHeader>
      </Show>

      <SidebarContent class="h-full overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <For each={local.tree}>
          {(group, groupIndex) => {
            const [isOpen, setIsOpen] = createSignal(group.collapsed !== true);
            const hasNewItem = () => Boolean(group.items?.some((item) => isItemNew(item.addedAt) || item.items?.some((child) => isItemNew(child.addedAt))));
            createEffect(() => {
              if (containsActive(group)) setIsOpen(true);
            });

            return (
              <>
                <Show when={groupIndex() > 0}>
                  <SidebarSeparator />
                </Show>
                <SidebarGroup>
                <Show when={group.title && group.items && group.items.length > 0}>
                    <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
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
                                  data-sidebar="menu-button"
                                  data-active={isItemActive(item.href) ? "true" : "false"}
                                  class={cn(
                                    sidebarMenuButtonVariants({ variant: "default", size: "default" }),
                                    "text-sm font-normal"
                                  )}
                                >
                                  <FileText class="size-4 shrink-0" />
                                  <span class="truncate">{item.title}</span>
                                  <Show when={isItemNew(item.addedAt)}>
                                    <span class="size-1.5 rounded-lg bg-primary shrink-0" />
                                  </Show>
                                  <Show when={item.badge}>
                                    <Badge variant="outline" class="ml-auto text-[10px] py-0 px-1.5 font-normal uppercase">
                                      {item.badge}
                                    </Badge>
                                  </Show>
                                </a>
                              </SidebarMenuItem>
                            }
                          >
                            <Collapsible open={isOpen()} onOpenChange={setIsOpen} class="group/collapsible">
                              <SidebarMenuItem>
                                <CollapsibleTrigger as="div" class="w-full text-left">
                                  <SidebarMenuButton class="w-full justify-between font-normal" tooltip={item.title}>
                                    <Folder class="size-4 shrink-0" />
                                    <span class="flex-1 truncate group-data-[collapsible=icon]:hidden">{item.title}</span>
                                    <Show when={!isOpen() && hasNewItem()}>
                                      <span class="size-1.5 rounded-lg bg-primary shrink-0" />
                                    </Show>
                                    <ChevronRight class="ml-auto size-3.5 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[expanded]/collapsible:rotate-90 group-data-[collapsible=icon]:hidden" />
                                  </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                  <SidebarMenuSub>
                                    <For each={item.items}>
                                      {(subItem) => (
                                        <SidebarMenuSubItem>
                                          <SidebarMenuSubButton
                                            href={subItem.href || "#"}
                                            isActive={isItemActive(subItem.href)}
                                            class="justify-between"
                                          >
                                            <span class="truncate">{subItem.title}</span>
                                            <Show when={isItemNew(subItem.addedAt)}>
                                              <span class="size-1.5 rounded-lg bg-primary shrink-0" />
                                            </Show>
                                            <Show when={subItem.badge}>
                                              <Badge variant="outline" class="ml-auto text-[9px] py-0 px-1 font-normal uppercase">
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
              </>
            );
          }}
        </For>
      </SidebarContent>

      <Show when={local.showFooter !== false}>
        <SidebarFooter class="p-2">
          <SidebarMenuButton size="lg" class="w-full justify-start">
            <div class="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/15 text-xs font-bold text-primary">
              N
            </div>
            <div class="flex min-w-0 flex-col gap-0.5 leading-none group-data-[collapsible=icon]:hidden">
              <span class="truncate text-xs font-semibold">{brandText()}</span>
              <span class="truncate text-[10px] text-muted-foreground">{local.footerText}</span>
            </div>
          </SidebarMenuButton>
        </SidebarFooter>
      </Show>
    </Sidebar>
  );
};
