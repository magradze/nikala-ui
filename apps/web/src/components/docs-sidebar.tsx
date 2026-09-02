import { A, useLocation } from "@solidjs/router";
import { type Component, For, createSignal, createEffect, onMount, Show } from "solid-js";
import {
  HOOKS_SIDEBAR_NAVIGATION,
  COMPONENTS_SIDEBAR_NAVIGATION,
  BLOCKS_SIDEBAR_NAVIGATION,
  DESKTOP_SIDEBAR_NAVIGATION,
} from "@/config/docs";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-solid";

/**
 * Helper function to determine if a component/hook item is new (added within last 14 days).
 */
export function isItemNew(addedAt?: string): boolean {
  if (!addedAt) return false;
  const itemDate = new Date(addedAt).getTime();
  const now = new Date().getTime();
  const diffDays = (now - itemDate) / (1000 * 3600 * 24);
  return diffDays >= 0 && diffDays <= 14;
}

export const DocsSidebar: Component = () => {
  const location = useLocation();

  const activeContext = () => {
    const p = location.pathname;
    if (p.startsWith("/docs/desktop")) return "desktop";
    if (p.startsWith("/docs/hooks")) return "hooks";
    if (p.startsWith("/blocks")) return "blocks";
    return "components";
  };

  // Only scroll active page item into view ONCE on initial mount / navigation
  onMount(() => {
    setTimeout(() => {
      if (typeof document !== "undefined") {
        const activeLink = document.querySelector<HTMLElement>("aside a[data-active='true']");
        activeLink?.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }, 100);
  });

  const navigation = () => {
    if (activeContext() === "desktop") {
      return DESKTOP_SIDEBAR_NAVIGATION;
    }
    if (activeContext() === "hooks") {
      return HOOKS_SIDEBAR_NAVIGATION;
    }
    if (activeContext() === "blocks") {
      return BLOCKS_SIDEBAR_NAVIGATION;
    }
    return COMPONENTS_SIDEBAR_NAVIGATION;
  };

  return (
    <aside class="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block border-r border-border/40 bg-background">
      <Sidebar collapsible="none" class="h-full w-full border-none bg-transparent">
        <SidebarContent class="py-6 px-1 space-y-3 overflow-x-hidden">
          <For each={navigation()}>
            {(section) => {
              const isGettingStarted = section.title === "Getting Started";
              const hasActiveItem = () => section.items.some((item) => location.pathname === item.href);
              const sectionHasNewItem = () => section.items.some((item) => isItemNew(item.addedAt));

              const [isOpen, setIsOpen] = createSignal(hasActiveItem() || isGettingStarted);

              // Dynamically open category when user navigates via Command palette or direct URL
              createEffect(() => {
                if (hasActiveItem()) {
                  setIsOpen(true);
                }
              });

              if (isGettingStarted) {
                return (
                  <SidebarGroup class="p-0">
                    <SidebarGroupLabel class="px-2 text-xs font-bold text-foreground tracking-wider uppercase select-none">
                      {section.title}
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                      <SidebarMenu class="gap-0.5">
                        <For each={section.items}>
                          {(item) => {
                            const isActive = () => location.pathname === item.href;
                            const isNew = isItemNew(item.addedAt);
                            return (
                              <SidebarMenuItem>
                                <A
                                  href={item.href}
                                  data-active={isActive() ? "true" : "false"}
                                  class={`flex h-8 w-full items-center justify-between rounded-md px-2 text-sm font-medium select-none ${
                                    isActive()
                                      ? "bg-primary text-primary-foreground font-semibold shadow-2xs"
                                      : "bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                  }`}
                                >
                                  <span class="pointer-events-none truncate">{item.title}</span>
                                  <Show when={isNew}>
                                    <span class="size-1.5 rouded-lg bg-primary shrink-0 pointer-events-none" />
                                  </Show>
                                </A>
                              </SidebarMenuItem>
                            );
                          }}
                        </For>
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                );
              }

              return (
                <SidebarGroup class="p-0">
                  <Collapsible open={isOpen()} onOpenChange={setIsOpen} class="space-y-1">
                    <CollapsibleTrigger class="group flex h-8 w-full items-center justify-between rounded-md px-2 text-xs font-semibold text-foreground tracking-wider uppercase hover:bg-accent/50 cursor-pointer select-none">
                      <div class="flex items-center gap-1.5 pointer-events-none truncate">
                        <span>{section.title}</span>
                        <Show when={!isOpen() && sectionHasNewItem()}>
                          <span class="size-1.5 rouded-lg bg-primary shrink-0 pointer-events-none" />
                        </Show>
                      </div>
                      <ChevronRight class="h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 group-data-expanded:rotate-90 pointer-events-none shrink-0" />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarGroupContent class="pt-0.5">
                        <SidebarMenuSub class="ml-3.5 border-l border-border/50 pl-2.5 my-1 gap-0.5">
                          <For each={section.items}>
                            {(item) => {
                              const isActive = () => location.pathname === item.href;
                              const isNew = isItemNew(item.addedAt);
                              return (
                                <SidebarMenuSubItem>
                                  <A
                                    href={item.href}
                                    data-active={isActive() ? "true" : "false"}
                                    class={`flex h-7.5 w-full items-center justify-between rounded-md px-2 text-xs font-medium select-none ${
                                      isActive()
                                        ? "bg-primary text-primary-foreground font-semibold shadow-2xs"
                                        : "bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                    }`}
                                  >
                                    <span class="pointer-events-none truncate">{item.title}</span>
                                    <Show when={isNew}>
                                      <span class="size-1.5 rouded-lg bg-primary shrink-0 pointer-events-none" />
                                    </Show>
                                  </A>
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
};