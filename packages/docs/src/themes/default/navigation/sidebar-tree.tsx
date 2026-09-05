import { createEffect, createSignal, For, Show, type Component, type JSX } from "solid-js";
import { Collapsible } from "@/components/ui/collapsible";
import { CollapsibleContent } from "@/components/ui/collapsible";
import { CollapsibleTrigger } from "@/components/ui/collapsible";
import { SidebarGroup } from "@/components/ui/sidebar";
import { SidebarGroupContent } from "@/components/ui/sidebar";
import { SidebarMenu } from "@/components/ui/sidebar";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { SidebarMenuItem } from "@/components/ui/sidebar";
import { SidebarMenuSub } from "@/components/ui/sidebar";
import { SidebarMenuSubButton } from "@/components/ui/sidebar";
import { SidebarMenuSubItem } from "@/components/ui/sidebar";
import { sidebarMenuButtonVariants } from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/cn";
import { ChevronRight, FileText, Folder } from "lucide-solid";
import type { SidebarItem } from "../../../types.js";
import {
  containsActiveSidebarItem,
  containsNewSidebarItem,
  isSidebarItemActive,
  isSidebarItemNew,
} from "../../../navigation/sidebar-state.js";

export interface SidebarTreeProps {
  tree: SidebarItem[];
  currentUrl?: string;
}

export const SidebarTree: Component<SidebarTreeProps> = (props) => {
  const sidebar = useSidebar();

  const renderPage = (item: SidebarItem): JSX.Element => (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton
        href={item.href || "#"}
        isActive={isSidebarItemActive(item, props.currentUrl)}
        aria-current={isSidebarItemActive(item, props.currentUrl) ? "page" : undefined}
        class="w-full justify-between"
        onClick={() => sidebar.setOpenMobile(false)}
      >
        <span class="truncate">{item.title}</span>
        <Show when={isSidebarItemNew(item)}>
          <span class="size-1.5 shrink-0 rounded-lg bg-primary" />
        </Show>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );

  const renderNested = (item: SidebarItem): JSX.Element => {
    const [open, setOpen] = createSignal(item.collapsed === false);
    createEffect(() => {
      if (containsActiveSidebarItem(item, props.currentUrl)) setOpen(true);
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
    const [open, setOpen] = createSignal(group.collapsed === false || containsActiveSidebarItem(group, props.currentUrl));
    createEffect(() => {
      if (containsActiveSidebarItem(group, props.currentUrl)) setOpen(true);
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
                <Show when={containsNewSidebarItem(group)}>
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
              data-active={isSidebarItemActive(item, props.currentUrl) ? "true" : "false"}
              aria-current={isSidebarItemActive(item, props.currentUrl) ? "page" : undefined}
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
