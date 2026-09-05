// packages/docs/src/themes/default/Sidebar.tsx
import { createEffect, createSignal, For, Show, splitProps, type Component, type JSX } from "solid-js";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  sidebarMenuButtonVariants,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
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

  const hasNewItem = (item: SidebarItem): boolean =>
    isItemNew(item.addedAt) || Boolean(item.items?.some(hasNewItem));

  const renderPage = (item: SidebarItem): JSX.Element => (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton
        href={item.href || "#"}
        isActive={isItemActive(item.href)}
        class="w-full justify-between"
      >
        <span class="truncate">{item.title}</span>
        <Show when={isItemNew(item.addedAt)}>
          <span class="size-1.5 shrink-0 rounded-lg bg-primary" />
        </Show>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );

  const renderNested = (item: SidebarItem): JSX.Element => {
    const hasChildren = () => Boolean(item.items?.length);
    const [open, setOpen] = createSignal(item.collapsed === false);
    createEffect(() => {
      if (containsActive(item)) setOpen(true);
    });

    return (
      <Show when={hasChildren()} fallback={renderPage(item)}>
        <Collapsible open={open()} onOpenChange={setOpen} class="group/collapsible">
          <SidebarMenuSubItem>
            <CollapsibleTrigger as="div" class="w-full text-left">
              <SidebarMenuSubButton class="w-full justify-between">
                <Folder class="size-3.5 shrink-0" />
                <span class="flex-1 truncate">{item.title}</span>
                <ChevronRight class={cn("size-3.5 shrink-0 transition-transform", open() && "rotate-90")} />
              </SidebarMenuSubButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub class="w-full">
                <For each={item.items}>{(child) => renderNested(child)}</For>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuSubItem>
        </Collapsible>
      </Show>
    );
  };

  const renderCategory = (group: SidebarItem): JSX.Element => {
    const [open, setOpen] = createSignal(group.collapsed === false || containsActive(group));

    createEffect(() => {
      if (containsActive(group)) setOpen(true);
    });

    return (
      <SidebarGroup class="w-full">
        <SidebarGroupContent class="w-full">
          <SidebarMenu>
            <SidebarMenuItem class="w-full flex-col items-stretch">
              <SidebarMenuButton
                type="button"
                class="w-full justify-between font-normal"
                tooltip={group.title}
                aria-expanded={open()}
                onClick={() => setOpen((value) => !value)}
              >
                <Folder class="size-4 shrink-0" />
                <span class="flex-1 truncate group-data-[collapsible=icon]:hidden">{group.title}</span>
                <Show when={hasNewItem(group)}>
                  <span class="size-1.5 shrink-0 rounded-lg bg-primary" />
                </Show>
                <ChevronRight class={cn("ml-auto size-3.5 shrink-0 transition-transform group-data-[collapsible=icon]:hidden", open() && "rotate-90")} />
              </SidebarMenuButton>
              <Show when={open()}>
                <div class="w-full group-data-[collapsible=icon]:hidden">
                  <SidebarMenuSub class="w-full">
                    <For each={group.items}>{(item) => renderNested(item)}</For>
                  </SidebarMenuSub>
                </div>
              </Show>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  };

  const renderRootPage = (item: SidebarItem): JSX.Element => (
    <SidebarGroup class="w-full">
      <SidebarGroupContent class="w-full">
        <SidebarMenu>
          <SidebarMenuItem class="w-full">
            <a
              href={item.href || "#"}
              data-sidebar="menu-button"
              data-active={isItemActive(item.href) ? "true" : "false"}
              class={cn(sidebarMenuButtonVariants({ variant: "default", size: "default" }), "text-sm font-normal")}
            >
              <FileText class="size-4 shrink-0" />
              <span class="truncate">{item.title}</span>
            </a>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

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
        <For each={local.tree.filter((item) => !item.items)}>
          {(item) => renderRootPage(item)}
        </For>
        <For each={local.tree.filter((item) => Boolean(item.items))}>
          {(group) => renderCategory(group)}
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
