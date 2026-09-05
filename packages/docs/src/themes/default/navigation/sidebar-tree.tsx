import { createEffect, createSignal, For, Show, type Component, type JSX } from "solid-js";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  cn,
  sidebarMenuButtonVariants,
  useSidebar,
} from "@nikala-ui/core";
import { ChevronRight, FileText, Folder } from "lucide-solid";
import type { SidebarItem } from "../../../types.js";

export interface SidebarTreeProps {
  tree: SidebarItem[];
  currentUrl?: string;
}

function isActive(item: SidebarItem, currentUrl?: string): boolean {
  return Boolean(item.href && currentUrl && item.href === currentUrl);
}

function containsActive(item: SidebarItem, currentUrl?: string): boolean {
  return isActive(item, currentUrl) || Boolean(item.items?.some((child) => containsActive(child, currentUrl)));
}

function isNew(item: SidebarItem): boolean {
  if (!item.addedAt) return false;
  const timestamp = new Date(item.addedAt).getTime();
  if (!Number.isFinite(timestamp)) return false;
  const ageInDays = (Date.now() - timestamp) / (1000 * 60 * 60 * 24);
  return ageInDays >= 0 && ageInDays <= 14;
}

function containsNew(item: SidebarItem): boolean {
  return isNew(item) || Boolean(item.items?.some(containsNew));
}

export const SidebarTree: Component<SidebarTreeProps> = (props) => {
  const sidebar = useSidebar();

  const renderPage = (item: SidebarItem): JSX.Element => (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton
        href={item.href || "#"}
        isActive={isActive(item, props.currentUrl)}
        class="w-full justify-between"
        onClick={() => sidebar.setOpenMobile(false)}
      >
        <span class="truncate">{item.title}</span>
        <Show when={isNew(item)}>
          <span class="size-1.5 shrink-0 rounded-lg bg-primary" />
        </Show>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );

  const renderNested = (item: SidebarItem): JSX.Element => {
    const [open, setOpen] = createSignal(item.collapsed === false);
    createEffect(() => {
      if (containsActive(item, props.currentUrl)) setOpen(true);
    });

    return (
      <Show when={item.items?.length} fallback={renderPage(item)}>
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
    const [open, setOpen] = createSignal(group.collapsed === false || containsActive(group, props.currentUrl));
    createEffect(() => {
      if (containsActive(group, props.currentUrl)) setOpen(true);
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
                <Show when={containsNew(group)}>
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
              onClick={() => sidebar.setOpenMobile(false)}
              data-sidebar="menu-button"
              data-active={isActive(item, props.currentUrl) ? "true" : "false"}
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
    <>
      <For each={props.tree.filter((item) => !item.items)}>{(item) => renderRootPage(item)}</For>
      <For each={props.tree.filter((item) => Boolean(item.items))}>{(group) => renderCategory(group)}</For>
    </>
  );
};
