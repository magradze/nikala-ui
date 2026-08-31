import { createSignal, createEffect, For, Show } from "solid-js";
import { A, useLocation, useSearchParams } from "@solidjs/router";
import {
  Menu,
  BookOpen,
  Terminal,
  Palette,
  Bot,
  Sparkles,
  Boxes,
  Layers,
  Zap,
  AppWindow,
  ChevronRight,
} from "lucide-solid";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import {
  COMPONENTS_SIDEBAR_NAVIGATION,
  HOOKS_SIDEBAR_NAVIGATION,
  BLOCKS_SIDEBAR_NAVIGATION,
  DESKTOP_SIDEBAR_NAVIGATION,
  COMPONENT_SECTIONS,
  COMPONENTS_LIST,
  HOOKS_LIST,
} from "@/config/docs";
import { PLAYGROUND_COMPONENTS } from "@/config/playground";
import { isItemNew } from "@/components/docs-sidebar";

export function MobileNav() {
  const [open, setOpen] = createSignal(false);
  const location = useLocation();
  const [searchParams] = useSearchParams<{ c?: string }>();

  const closeNav = () => {
    setOpen(false);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
      document.body.style.pointerEvents = "";
    }
  };

  const [activeContext, setActiveContext] = createSignal<"components" | "hooks" | "playground" | "blocks" | "desktop">("components");

  createEffect(() => {
    if (location.pathname.startsWith("/docs/desktop")) {
      setActiveContext("desktop");
    } else if (location.pathname.startsWith("/playground")) {
      setActiveContext("playground");
    } else if (location.pathname.startsWith("/docs/hooks")) {
      setActiveContext("hooks");
    } else if (location.pathname.startsWith("/blocks")) {
      setActiveContext("blocks");
    } else {
      setActiveContext("components");
    }
  });

  const mainLinks = [
    {
      title: "Documentation",
      href: "/docs",
      icon: BookOpen,
      badge: null,
      isActive: () => location.pathname === "/docs",
      onClick: closeNav,
    },
    {
      title: "Components",
      href: "/docs/components/accordion",
      icon: Boxes,
      badge: String(COMPONENTS_LIST.length),
      isActive: () => activeContext() === "components" && location.pathname.startsWith("/docs/components"),
      onClick: () => {
        setActiveContext("components");
        closeNav();
      },
    },
    {
      title: "Blocks",
      href: "/blocks",
      icon: Layers,
      badge: "New",
      isActive: () => activeContext() === "blocks" && location.pathname.startsWith("/blocks"),
      onClick: () => {
        setActiveContext("blocks");
        closeNav();
      },
    },
    {
      title: "Hooks / Primitives",
      href: "/docs/hooks/create-controllable-signal",
      icon: Zap,
      badge: String(HOOKS_LIST.length),
      isActive: () => activeContext() === "hooks" && location.pathname.startsWith("/docs/hooks"),
      onClick: () => {
        setActiveContext("hooks");
        closeNav();
      },
    },
    {
      title: "Desktop (Tauri v2)",
      href: "/docs/desktop",
      icon: AppWindow,
      badge: "Tauri",
      isActive: () => activeContext() === "desktop" && location.pathname.startsWith("/docs/desktop"),
      onClick: () => {
        setActiveContext("desktop");
        closeNav();
      },
    },
    {
      title: "Playground",
      href: "/playground",
      icon: Sparkles,
      badge: "Live",
      isActive: () => location.pathname.startsWith("/playground"),
      onClick: () => {
        setActiveContext("playground");
        closeNav();
      },
    },
    {
      title: "MCP Server",
      href: "/docs/mcp",
      icon: Bot,
      badge: "AI",
      isActive: () => location.pathname.startsWith("/docs/mcp"),
      onClick: closeNav,
    },
    {
      title: "Theming Guide",
      href: "/docs/theming",
      icon: Palette,
      badge: null,
      isActive: () => location.pathname.startsWith("/docs/theming"),
      onClick: closeNav,
    },
    {
      title: "CLI Reference",
      href: "/docs/cli",
      icon: Terminal,
      badge: null,
      isActive: () => location.pathname.startsWith("/docs/cli"),
      onClick: closeNav,
    },
  ];

  return (
    <Sheet open={open()} onOpenChange={setOpen}>
      <SheetTrigger
        as={Button}
        variant="ghost"
        size="sm"
        class="md:hidden h-9 w-9 p-0 text-muted-foreground hover:text-foreground cursor-pointer"
        aria-label="Toggle mobile navigation menu"
      >
        <Menu class="w-5 h-5" />
      </SheetTrigger>

      <SheetContent side="left" class="w-80 sm:w-90 bg-background overflow-y-auto">
        {/* Header */}
        <SheetHeader class="text-left pb-3 border-b border-border/50">
          <SheetTitle class="flex items-center gap-2">
            <span class="inline-flex items-center justify-center w-7 h-7 rounded-md bg-primary text-primary-foreground font-extrabold text-sm shadow-2xs">
              N
            </span>
            <span class="font-bold text-base tracking-tight">Nikala UI</span>
            <Badge variant="outline" class="text-[10px] px-1.5 py-0 border-primary/30 text-primary ml-auto font-mono">
              v0.11.0
            </Badge>
          </SheetTitle>
        </SheetHeader>

        {/* Scrollable Navigation Tree Content */}
        <div class="space-y-6 pt-2 pb-24">
          {/* 1. Main Explore Links */}
          <div class="space-y-1">
            <h4 class="px-2 text-[11px] font-bold text-muted-foreground tracking-wider uppercase">
              Explore
            </h4>
            <div class="space-y-0.5">
              <For each={mainLinks}>
                {(link) => {
                  const IconComp = link.icon;
                  return (
                    <A
                      href={link.href}
                      onClick={link.onClick}
                      class={`flex h-9 w-full items-center justify-between rounded-md px-2.5 text-sm font-medium transition-colors ${
                        link.isActive()
                          ? "bg-primary text-primary-foreground font-bold shadow-2xs"
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      <div class="flex items-center gap-2.5">
                        <IconComp class="size-4 shrink-0" />
                        <span>{link.title}</span>
                      </div>
                      <Show when={link.badge}>
                        <Badge
                          variant={link.isActive() ? "secondary" : "outline"}
                          class={`text-[10px] px-1.5 py-0 font-medium ${
                            link.isActive()
                              ? "bg-primary-foreground/20 text-primary-foreground border-none font-bold"
                              : "border-border text-muted-foreground font-mono"
                          }`}
                        >
                          {link.badge}
                        </Badge>
                      </Show>
                    </A>
                  );
                }}
              </For>
            </div>
          </div>

          <Separator class="bg-border/60" />

          {/* 2. Dynamic Active Context (Desktop vs Playground vs Hooks vs UI Components) */}
          <Show
            when={activeContext() === "playground"}
            fallback={
              <div class="space-y-2">
                <div class="flex items-center justify-between px-2">
                  <span class="text-[11px] font-bold text-muted-foreground tracking-wider uppercase">
                    {activeContext() === "desktop"
                      ? "Desktop (Tauri v2)"
                      : activeContext() === "hooks"
                      ? "Reactive Hooks"
                      : activeContext() === "blocks"
                      ? "Blocks"
                      : "UI Components"}
                  </span>
                  <Badge variant="secondary" class="text-[10px] px-1.5 py-0 font-mono">
                    {activeContext() === "desktop"
                      ? "Tauri"
                      : activeContext() === "hooks"
                      ? HOOKS_LIST.length
                      : activeContext() === "blocks"
                      ? 2
                      : COMPONENTS_LIST.length}
                  </Badge>
                </div>

                <div class="space-y-1">
                  <For
                    each={(
                      activeContext() === "desktop"
                        ? DESKTOP_SIDEBAR_NAVIGATION
                        : activeContext() === "hooks"
                        ? HOOKS_SIDEBAR_NAVIGATION.filter((s) => s.title !== "Getting Started")
                        : activeContext() === "blocks"
                        ? BLOCKS_SIDEBAR_NAVIGATION
                        : COMPONENTS_SIDEBAR_NAVIGATION.filter((s) => s.title !== "Getting Started")
                    )}
                  >
                    {(section) => {
                      const hasActiveItem = () => section.items.some((item) => location.pathname === item.href);
                      const sectionHasNewItem = () => section.items.some((item) => isItemNew(item.addedAt));
                      const [isOpen, setIsOpen] = createSignal(hasActiveItem() || activeContext() === "desktop");

                      createEffect(() => {
                        if (hasActiveItem()) {
                          setIsOpen(true);
                        }
                      });

                      return (
                        <Collapsible open={isOpen()} onOpenChange={setIsOpen} class="space-y-1">
                          <CollapsibleTrigger class="group flex h-8 w-full items-center justify-between rounded-md px-2 text-xs font-semibold text-foreground tracking-wider uppercase hover:bg-muted/70 transition-colors cursor-pointer">
                            <div class="flex items-center gap-1.5">
                              <span>{section.title}</span>
                              <Show when={!isOpen() && sectionHasNewItem()}>
                                <span class="size-1.5 rounded-full bg-primary shrink-0" />
                              </Show>
                            </div>
                            <ChevronRight class="size-3.5 text-muted-foreground transition-transform duration-200 group-data-expanded:rotate-90" />
                          </CollapsibleTrigger>

                          <CollapsibleContent class="pt-0.5 pl-2 space-y-0.5 border-l border-border/40 ml-3">
                            <For each={section.items}>
                              {(item) => {
                                const isActive = () => location.pathname === item.href;
                                const isNew = isItemNew(item.addedAt);
                                return (
                                  <A
                                    href={item.href}
                                    onClick={closeNav}
                                    class={`flex h-8 w-full items-center justify-between rounded-md px-2 text-xs font-medium transition-colors ${
                                      isActive()
                                        ? "bg-primary text-primary-foreground font-bold shadow-2xs"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                    }`}
                                  >
                                    <span class="truncate">{item.title}</span>
                                    <Show when={isNew}>
                                      <span class="size-1.5 rounded-full bg-primary shrink-0" />
                                    </Show>
                                  </A>
                                );
                              }}
                            </For>
                          </CollapsibleContent>
                        </Collapsible>
                      );
                    }}
                  </For>
                </div>
              </div>
            }
          >
            {/* Playground Components Context */}
            <div class="space-y-2">
              <div class="flex items-center justify-between px-2">
                <span class="text-[11px] font-bold text-muted-foreground tracking-wider uppercase">
                  Playground Stages
                </span>
                <Badge variant="secondary" class="text-[10px] px-1.5 py-0 font-mono">
                  {PLAYGROUND_COMPONENTS.length}
                </Badge>
              </div>

              <div class="space-y-1">
                <For each={COMPONENT_SECTIONS}>
                  {(section) => {
                    const sectionItems = () =>
                      section.items.map((item) => ({
                        ...item,
                        id: item.href.replace("/docs/components/", ""),
                      }));

                    const hasActiveItem = () =>
                      sectionItems().some(
                        (item) => (searchParams.c ? searchParams.c === item.id : item.id === PLAYGROUND_COMPONENTS[0].id)
                      );
                    const sectionHasNewItem = () => section.items.some((item) => isItemNew(item.addedAt));
                    const [isOpen, setIsOpen] = createSignal(hasActiveItem());

                    createEffect(() => {
                      if (hasActiveItem()) {
                        setIsOpen(true);
                      }
                    });

                    return (
                      <Collapsible open={isOpen()} onOpenChange={setIsOpen} class="space-y-1">
                        <CollapsibleTrigger class="group flex h-8 w-full items-center justify-between rounded-md px-2 text-xs font-semibold text-foreground tracking-wider uppercase hover:bg-muted/70 transition-colors cursor-pointer">
                          <div class="flex items-center gap-1.5">
                            <span>{section.title}</span>
                            <Show when={!isOpen() && sectionHasNewItem()}>
                              <span class="size-1.5 rounded-full bg-primary shrink-0" />
                            </Show>
                          </div>
                          <ChevronRight class="size-3.5 text-muted-foreground transition-transform duration-200 group-data-expanded:rotate-90" />
                        </CollapsibleTrigger>

                        <CollapsibleContent class="pt-0.5 pl-2 space-y-0.5 border-l border-border/40 ml-3">
                          <For each={sectionItems()}>
                            {(item) => {
                              const isActive = () =>
                                searchParams.c
                                  ? searchParams.c === item.id
                                  : item.id === PLAYGROUND_COMPONENTS[0].id;
                              const isNew = isItemNew(item.addedAt);

                              return (
                                <A
                                  href={`/playground?c=${item.id}`}
                                  onClick={closeNav}
                                  class={`flex h-8 w-full items-center justify-between rounded-md px-2 text-xs font-medium transition-colors ${
                                    isActive()
                                      ? "bg-primary text-primary-foreground font-bold shadow-2xs"
                                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                  }`}
                                >
                                  <span class="truncate">{item.title}</span>
                                  <Show when={isNew}>
                                    <span class="size-1.5 rounded-full bg-primary shrink-0" />
                                  </Show>
                                </A>
                              );
                            }}
                          </For>
                        </CollapsibleContent>
                      </Collapsible>
                    );
                  }}
                </For>
              </div>
            </div>
          </Show>
        </div>
      </SheetContent>
    </Sheet>
  );
}
