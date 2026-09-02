import {
  createContext,
  useContext,
  splitProps,
  createSignal,
  createEffect,
  onMount,
  onCleanup,
  Show,
  For,
  type Component,
  type JSX,
  type ParentComponent,
  type Accessor,
} from "solid-js";
import { cva, type VariantProps } from "class-variance-authority";
import { Plus, X, Pin, XCircle, CircleX } from "lucide-solid";
import * as ContextMenuPrimitive from "@kobalte/core/context-menu";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import {
  type CreateDocumentTabsReturn,
  type TabItem,
} from "@/hooks/create-document-tabs";
import { cn } from "@/lib/cn";

/* --- 1. Context & Variants --- */

export type TitlebarTabsVariant = "editor" | "chrome" | "pills";

interface TitlebarTabsContextValue {
  value: Accessor<string | undefined>;
  setValue: (value: string) => void;
  variant: Accessor<TitlebarTabsVariant>;
  manager?: CreateDocumentTabsReturn<any>;
  reorderable?: boolean;
  enableContextMenu?: boolean;
  draggedTabId: Accessor<string | null>;
  dropTargetId: Accessor<string | null>;
  dropPosition: Accessor<"left" | "right" | null>;
  setDragState: (draggedId: string | null, targetId: string | null, position: "left" | "right" | null) => void;
  handleDropReorder: (sourceId: string, targetId: string, position: "left" | "right") => void;
}

const TitlebarTabsContext = createContext<TitlebarTabsContextValue>();

export function useTitlebarTabs() {
  const ctx = useContext(TitlebarTabsContext);
  if (!ctx) {
    throw new Error("useTitlebarTabs must be used within a <TitlebarTabs /> container");
  }
  return ctx;
}

export const titlebarTabVariants = cva(
  "group relative inline-flex items-center gap-1.5 px-3 text-xs font-medium select-none cursor-pointer transition-colors shrink-0 max-w-[180px] min-w-[80px]",
  {
    variants: {
      variant: {
        editor:
          "h-full py-1 border-r border-border/40 border-t-2 border-t-transparent hover:bg-muted/40 data-[active=true]:bg-background data-[active=true]:border-t-primary data-[active=true]:text-foreground data-[active=false]:text-muted-foreground",
        chrome:
          "h-[calc(100%-2px)] py-1 rounded-t-lg border-t border-x border-transparent hover:bg-muted/60 data-[active=true]:border-border/70 data-[active=true]:bg-background data-[active=true]:text-foreground data-[active=true]:-mb-px data-[active=true]:shadow-xs data-[active=false]:text-muted-foreground",
        pills:
          "h-7 py-0.5 rounded-md mx-0.5 hover:bg-muted/50 data-[active=true]:bg-primary/10 data-[active=true]:text-primary data-[active=true]:font-semibold data-[active=false]:text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "editor",
    },
  }
);

/* --- 2. TitlebarTabs Root Container --- */

export interface TitlebarTabsProps extends JSX.HTMLAttributes<HTMLElement> {
  /** Reactive tabs manager instance from createDocumentTabs(). */
  manager?: CreateDocumentTabsReturn<any>;
  /** Controlled active tab identifier value (when not using manager). */
  value?: string;
  /** Uncontrolled default active tab identifier value. */
  defaultValue?: string;
  /** Callback triggered when active tab changes. */
  onValueChange?: (value: string) => void;
  /** Callback triggered when the "+" add tab button is clicked. */
  onAddTab?: () => void;
  /** Whether tabs can be reordered via Drag & Drop. Defaults to true when manager is present. */
  reorderable?: boolean;
  /** Whether right-click context menu is enabled on tabs and empty space. Defaults to true. */
  enableContextMenu?: boolean;
  /** Custom render function for the empty tabstrip context menu. */
  renderEmptyContextMenu?: () => JSX.Element;
  /** Visual chrome styling variant. */
  variant?: TitlebarTabsVariant;
  class?: string;
}

export const TitlebarTabs: ParentComponent<TitlebarTabsProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "manager",
    "value",
    "defaultValue",
    "onValueChange",
    "onAddTab",
    "reorderable",
    "enableContextMenu",
    "renderEmptyContextMenu",
    "variant",
    "class",
    "children",
  ]);

  let scrollContainerRef: HTMLDivElement | undefined;

  const [internalValue, setInternalValue] = createSignal(local.defaultValue || local.value);
  const [draggedTabId, setDraggedTabId] = createSignal<string | null>(null);
  const [dropTargetId, setDropTargetId] = createSignal<string | null>(null);
  const [dropPosition, setDropPosition] = createSignal<"left" | "right" | null>(null);

  const activeValue = () => {
    if (local.manager) return local.manager.activeTabId();
    return local.value !== undefined ? local.value : internalValue();
  };

  const variant = () => local.variant || "editor";

  const setValue = (val: string) => {
    if (local.manager) {
      local.manager.setActiveTab(val);
    } else {
      setInternalValue(val);
      local.onValueChange?.(val);
    }
  };

  const setDragState = (
    draggedId: string | null,
    targetId: string | null,
    pos: "left" | "right" | null
  ) => {
    setDraggedTabId(draggedId);
    setDropTargetId(targetId);
    setDropPosition(pos);
  };

  const handleDropReorder = (sourceId: string, targetId: string, pos: "left" | "right") => {
    if (!local.manager) return;
    const list = local.manager.tabs();
    const fromIndex = list.findIndex((t) => t.id === sourceId);
    const targetIndex = list.findIndex((t) => t.id === targetId);
    if (fromIndex === -1 || targetIndex === -1 || fromIndex === targetIndex) return;

    let finalIndex = targetIndex;
    if (fromIndex < targetIndex && pos === "left") {
      finalIndex = targetIndex - 1;
    } else if (fromIndex > targetIndex && pos === "right") {
      finalIndex = targetIndex + 1;
    }

    if (fromIndex !== finalIndex && finalIndex >= 0 && finalIndex < list.length) {
      local.manager.reorderTabs(fromIndex, finalIndex);
    }
  };

  // Mouse wheel horizontal scroll listener (converts vertical wheel deltaY to horizontal scroll)
  onMount(() => {
    if (!scrollContainerRef) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        scrollContainerRef!.scrollLeft += e.deltaY;
      }
    };

    scrollContainerRef.addEventListener("wheel", handleWheel, { passive: false });
    onCleanup(() => {
      scrollContainerRef?.removeEventListener("wheel", handleWheel);
    });
  });

  // Auto-scroll to end when tabs are added
  createEffect(() => {
    if (local.manager?.count() && scrollContainerRef) {
      scrollContainerRef.scrollTo({
        left: scrollContainerRef.scrollWidth,
        behavior: "smooth",
      });
    }
  });

  const contextValue: TitlebarTabsContextValue = {
    value: activeValue,
    setValue,
    variant,
    manager: local.manager,
    reorderable: local.reorderable ?? Boolean(local.manager),
    enableContextMenu: local.enableContextMenu ?? true,
    draggedTabId,
    dropTargetId,
    dropPosition,
    setDragState,
    handleDropReorder,
  };

  const hasEmptyContextMenu = () =>
    (local.enableContextMenu ?? true) &&
    (Boolean(local.onAddTab) || Boolean(local.manager) || Boolean(local.renderEmptyContextMenu));

  const renderNavContent = () => (
    <nav
      aria-label="Window Tabs"
      class={cn(
        "flex flex-1 h-full overflow-hidden z-10 min-w-0 pointer-events-auto [app-region:drag] [-webkit-app-region:drag]",
        variant() === "chrome" ? "items-end" : "items-center",
        local.class
      )}
      {...rest}
    >
      <Show
        when={local.children}
        fallback={
          /* Automatic Declarative Mode: Tab List with Mouse Wheel Scroll + Anchored Add Button */
          <>
            <div
              ref={scrollContainerRef}
              class={cn(
                "flex h-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] gap-0 items-center min-w-0 flex-1 scroll-smooth [app-region:drag] [-webkit-app-region:drag]",
                variant() === "chrome" && "items-end pt-1.5"
              )}
            >
              <Show when={local.manager}>
                <For each={local.manager!.tabs()}>
                  {(tab) => <TitlebarTab tab={tab} />}
                </For>
              </Show>
            </div>

            {/* Anchored Add Tab Button (Always visible outside scroll container) */}
            <Show when={local.onAddTab}>
              <div class={cn("shrink-0 px-1 z-20 flex items-center", variant() === "chrome" ? "mb-1" : "my-auto")}>
                <TitlebarTabAddButton onClick={local.onAddTab} />
              </div>
            </Show>
          </>
        }
      >
        {local.children}
      </Show>
    </nav>
  );

  return (
    <TitlebarTabsContext.Provider value={contextValue}>
      <Show when={hasEmptyContextMenu()} fallback={renderNavContent()}>
        <ContextMenuPrimitive.Root>
          <ContextMenuPrimitive.Trigger
            as="div"
            style={("-webkit-app-region: no-drag; app-region: no-drag; outline: none !important; -webkit-focus-ring-color: transparent !important;") as any}
            class="flex flex-1 h-full min-w-0 outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
          >
            {renderNavContent()}
          </ContextMenuPrimitive.Trigger>
          <ContextMenuPrimitive.Portal>
            <ContextMenuPrimitive.Content
              data-no-drag
              data-tauri-drag-region="false"
              style="-webkit-app-region: no-drag; app-region: no-drag; outline: none !important; -webkit-focus-ring-color: transparent !important;"
              onMouseDown={(e) => e.stopPropagation()}
              onPointerDown={(e) => e.stopPropagation()}
              class={cn(
                "z-50 min-w-[160px] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md",
                "animate-in fade-in-80 slide-in-from-top-1 text-xs pointer-events-auto [app-region:no-drag] [-webkit-app-region:no-drag]",
                "outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
              )}
            >
              <Show
                when={local.renderEmptyContextMenu}
                fallback={
                  <>
                    <Show when={local.onAddTab}>
                      <ContextMenuPrimitive.Item
                        data-no-drag
                        data-tauri-drag-region="false"
                        style="-webkit-app-region: no-drag; app-region: no-drag;"
                        onMouseDown={(e) => e.stopPropagation()}
                        onPointerDown={(e) => e.stopPropagation()}
                        onSelect={() => {
                          setTimeout(() => local.onAddTab?.(), 0);
                        }}
                        class="relative flex cursor-pointer select-none items-center justify-between gap-2 rounded-xs px-2 py-1.5 text-xs outline-none transition-colors hover:bg-accent hover:text-accent-foreground pointer-events-auto [app-region:no-drag] [-webkit-app-region:no-drag]"
                      >
                        <span class="flex items-center gap-2">
                          <Plus class="size-3.5 text-muted-foreground" />
                          New Tab
                        </span>
                        <span class="ml-auto text-[10px] text-muted-foreground font-mono">Ctrl+T</span>
                      </ContextMenuPrimitive.Item>
                    </Show>

                    <Show when={local.manager && local.manager.tabs().length > 0}>
                      <Show when={local.onAddTab}>
                        <ContextMenuPrimitive.Separator class="my-1 h-px bg-border/60" />
                      </Show>
                      <ContextMenuPrimitive.Item
                        data-no-drag
                        data-tauri-drag-region="false"
                        style="-webkit-app-region: no-drag; app-region: no-drag;"
                        onMouseDown={(e) => e.stopPropagation()}
                        onPointerDown={(e) => e.stopPropagation()}
                        onSelect={() => {
                          setTimeout(() => local.manager?.closeAll(), 0);
                        }}
                        class="relative flex cursor-pointer select-none items-center gap-2 rounded-xs px-2 py-1.5 text-xs outline-none transition-colors hover:bg-accent hover:text-accent-foreground pointer-events-auto [app-region:no-drag] [-webkit-app-region:no-drag]"
                      >
                        <CircleX class="size-3.5 text-muted-foreground" />
                        <span>Close All Tabs</span>
                      </ContextMenuPrimitive.Item>
                    </Show>
                  </>
                }
              >
                {local.renderEmptyContextMenu!()}
              </Show>
            </ContextMenuPrimitive.Content>
          </ContextMenuPrimitive.Portal>
        </ContextMenuPrimitive.Root>
      </Show>
    </TitlebarTabsContext.Provider>
  );
};

/* --- 3. TitlebarTabList --- */

export interface TitlebarTabListProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

export const TitlebarTabList: ParentComponent<TitlebarTabListProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  const ctx = useTitlebarTabs();
  let listRef: HTMLDivElement | undefined;

  onMount(() => {
    if (!listRef) return;
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        listRef!.scrollLeft += e.deltaY;
      }
    };
    listRef.addEventListener("wheel", handleWheel, { passive: false });
    onCleanup(() => listRef?.removeEventListener("wheel", handleWheel));
  });

  return (
    <div
      ref={listRef}
      class={cn(
        "flex h-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] gap-0 items-center min-w-0 flex-1 scroll-smooth [app-region:drag] [-webkit-app-region:drag]",
        ctx.variant() === "chrome" && "items-end pt-1.5",
        local.class
      )}
      {...rest}
    >
      {local.children}
    </div>
  );
};

/* --- 4. TitlebarTab Individual Item --- */

export interface TitlebarTabProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "onClose"> {
  /** Tab data object from createDocumentTabs(). Automatically wires all properties. */
  tab?: TabItem<any>;
  value?: string;
  isDirty?: boolean;
  isPinned?: boolean;
  closable?: boolean;
  reorderable?: boolean;
  /** Whether right-click context menu is enabled on this tab. Defaults to true. */
  enableContextMenu?: boolean;
  /** Custom render function for context menu content. */
  renderContextMenu?: (tab: TabItem<any>) => JSX.Element;
  onClose?: (e: MouseEvent) => void;
  class?: string;
}

export const TitlebarTab: ParentComponent<TitlebarTabProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "tab",
    "value",
    "isDirty",
    "isPinned",
    "closable",
    "reorderable",
    "enableContextMenu",
    "renderContextMenu",
    "onClose",
    "class",
    "style",
    "children",
    "onClick",
    "onKeyDown",
    "onDragStart",
    "onDragOver",
    "onDragLeave",
    "onDragEnd",
    "onDrop",
  ]);

  const ctx = useTitlebarTabs();
  let tabRef: HTMLDivElement | undefined;

  const tabId = () => local.tab?.id || local.value || "";
  const isPinned = () => local.tab?.isPinned ?? local.isPinned ?? false;
  const isDirty = () => local.tab?.isDirty ?? local.isDirty ?? false;
  const closable = () => local.tab?.closable ?? local.closable ?? true;
  const title = () => local.tab?.title || "";
  const IconComp = () => local.tab?.icon;

  const isActive = () => ctx.value() === tabId();
  const isDragging = () => ctx.draggedTabId() === tabId();
  const isDropTarget = () => ctx.dropTargetId() === tabId() && ctx.draggedTabId() !== tabId();
  const dropPosition = () => (isDropTarget() ? ctx.dropPosition() : null);

  const canDrag = () => !isPinned() && (local.reorderable ?? ctx.reorderable ?? true);
  const hasContextMenu = () =>
    (local.enableContextMenu ?? ctx.enableContextMenu ?? true) &&
    (Boolean(ctx.manager) || Boolean(local.renderContextMenu));

  // Scroll active tab horizontally inside its tablist container
  createEffect(() => {
    if (typeof window !== "undefined" && isActive() && tabRef && tabRef.parentElement) {
      try {
        const container = tabRef.parentElement;
        const tabLeft = tabRef.offsetLeft;
        const tabRight = tabLeft + tabRef.offsetWidth;
        const containerLeft = container.scrollLeft;
        const containerRight = containerLeft + container.clientWidth;

        if (tabLeft < containerLeft) {
          container.scrollTo({ left: tabLeft, behavior: "smooth" });
        } else if (tabRight > containerRight) {
          container.scrollTo({ left: tabRight - container.clientWidth, behavior: "smooth" });
        }
      } catch {
        // Safe fallback
      }
    }
  });

  const handleClick = (e: MouseEvent) => {
    ctx.setValue(tabId());
    if (typeof local.onClick === "function") {
      (local.onClick as any)(e);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      ctx.setValue(tabId());
    }
    if (typeof (local as any).onKeyDown === "function") {
      ((local as any).onKeyDown)(e);
    }
  };

  const handleClose = (e: MouseEvent) => {
    e.stopPropagation();
    if (local.onClose) {
      local.onClose(e);
    } else if (ctx.manager) {
      ctx.manager.closeTab(tabId());
    }
  };

  const handleDragStart: JSX.EventHandlerUnion<HTMLDivElement, DragEvent> = (e) => {
    if (!canDrag()) {
      e.preventDefault();
      return;
    }
    if (e.dataTransfer) {
      e.dataTransfer.setData("text/plain", tabId());
      e.dataTransfer.effectAllowed = "move";
    }
    ctx.setDragState(tabId(), null, null);
    if (typeof local.onDragStart === "function") {
      (local.onDragStart as any)(e);
    }
  };

  const handleDragOver: JSX.EventHandlerUnion<HTMLDivElement, DragEvent> = (e) => {
    const currentDragged = ctx.draggedTabId();
    if (!currentDragged || currentDragged === tabId() || isPinned()) return;

    e.preventDefault();
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = "move";
    }

    if (tabRef) {
      const rect = tabRef.getBoundingClientRect();
      const midpoint = rect.left + rect.width / 2;
      const pos: "left" | "right" = e.clientX < midpoint ? "left" : "right";
      ctx.setDragState(currentDragged, tabId(), pos);
    }

    if (typeof local.onDragOver === "function") {
      (local.onDragOver as any)(e);
    }
  };

  const handleDragLeave: JSX.EventHandlerUnion<HTMLDivElement, DragEvent> = (e) => {
    if (tabRef && !tabRef.contains(e.relatedTarget as Node)) {
      if (ctx.dropTargetId() === tabId()) {
        ctx.setDragState(ctx.draggedTabId(), null, null);
      }
    }
    if (typeof local.onDragLeave === "function") {
      (local.onDragLeave as any)(e);
    }
  };

  const handleDragEnd: JSX.EventHandlerUnion<HTMLDivElement, DragEvent> = (e) => {
    ctx.setDragState(null, null, null);
    if (typeof local.onDragEnd === "function") {
      (local.onDragEnd as any)(e);
    }
  };

  const handleDrop: JSX.EventHandlerUnion<HTMLDivElement, DragEvent> = (e) => {
    e.preventDefault();
    const sourceId = e.dataTransfer?.getData("text/plain") || ctx.draggedTabId();
    const pos = ctx.dropPosition();
    if (sourceId && pos && sourceId !== tabId()) {
      ctx.handleDropReorder(sourceId, tabId(), pos);
    }
    ctx.setDragState(null, null, null);
    if (typeof local.onDrop === "function") {
      (local.onDrop as any)(e);
    }
  };

  const renderTabElement = () => (
    <div
      ref={tabRef}
      role="tab"
      tabindex="0"
      aria-selected={isActive()}
      draggable={canDrag()}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDragEnd={handleDragEnd}
      onDrop={handleDrop}
      data-no-drag
      data-tauri-drag-region="false"
      style={("-webkit-app-region: no-drag; app-region: no-drag;" + (typeof local.style === "string" ? ` ${local.style}` : "")) as any}
      data-active={isActive() ? "true" : "false"}
      data-dragging={isDragging() ? "true" : undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      class={cn(
        titlebarTabVariants({ variant: ctx.variant() }),
        isPinned() && "min-w-fit px-2 max-w-fit",
        isDragging() && "opacity-40 scale-95",
        dropPosition() === "left" &&
        "before:absolute before:left-0 before:top-1 before:bottom-1 before:w-0.5 before:bg-primary before:z-30 before:rouded-lg",
        dropPosition() === "right" &&
        "after:absolute after:right-0 after:top-1 after:bottom-1 after:w-0.5 after:bg-primary after:z-30 after:rouded-lg",
        "cursor-pointer outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 [app-region:no-drag] [-webkit-app-region:no-drag] pointer-events-auto transition-all duration-150",
        local.class
      )}
      {...rest}
    >
      {/* Tab Icon & Title Slot */}
      <span class="flex items-center gap-1.5 truncate flex-1 pointer-events-none">
        <Show when={IconComp()}>
          {(() => {
            const Comp = IconComp()!;
            return <Comp class="size-3.5 shrink-0 text-primary" />;
          })()}
        </Show>
        <Show when={local.children} fallback={<span class="truncate">{title()}</span>}>
          {local.children}
        </Show>
      </span>

      {/* Pinned Tab Badge */}
      <Show when={isPinned()}>
        <Pin class="size-2.5 text-muted-foreground rotate-45 shrink-0" />
      </Show>

      {/* Close Button / Dirty Dot Indicator using Nikala UI Button */}
      <Show when={!isPinned() && closable()}>
        <Tooltip>
          <TooltipTrigger
            as={Button}
            variant="ghost"
            size="icon"
            onClick={handleClose}
            aria-label={`Close ${tabId()} tab`}
            class="size-4 p-0 rounded-xs text-muted-foreground hover:bg-muted hover:text-foreground shrink-0 ml-0.5 cursor-pointer outline-none ring-0 focus:ring-0 focus-visible:ring-0"
          >
            <Show
              when={isDirty()}
              fallback={<X class="size-3 opacity-60 hover:opacity-100" />}
            >
              <span class="size-1.5 rouded-lg bg-primary group-hover:hidden" />
              <X class="size-3 hidden group-hover:block" />
            </Show>
          </TooltipTrigger>
          <TooltipContent class="text-[10px] py-1 px-2">
            Close tab (Ctrl+W)
          </TooltipContent>
        </Tooltip>
      </Show>
    </div>
  );

  return (
    <Show when={hasContextMenu()} fallback={renderTabElement()}>
      <ContextMenuPrimitive.Root>
        <ContextMenuPrimitive.Trigger
          as="div"
          data-no-drag
          data-tauri-drag-region="false"
          style={("-webkit-app-region: no-drag; app-region: no-drag; outline: none !important; -webkit-focus-ring-color: transparent !important;" + (typeof local.style === "string" ? ` ${local.style}` : "")) as any}
          class="h-full flex items-center shrink-0 pointer-events-auto [app-region:no-drag] [-webkit-app-region:no-drag] outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
        >
          {renderTabElement()}
        </ContextMenuPrimitive.Trigger>
        <ContextMenuPrimitive.Portal>
          <ContextMenuPrimitive.Content
            data-no-drag
            data-tauri-drag-region="false"
            style="-webkit-app-region: no-drag; app-region: no-drag; outline: none !important; -webkit-focus-ring-color: transparent !important;"
            onMouseDown={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            class={cn(
              "z-50 min-w-[170px] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md",
              "animate-in fade-in-80 slide-in-from-top-1 text-xs pointer-events-auto [app-region:no-drag] [-webkit-app-region:no-drag]",
              "outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
            )}
          >
            <Show
              when={local.renderContextMenu}
              fallback={
                <>
                  <Show when={ctx.manager}>
                    <ContextMenuPrimitive.Item
                      data-no-drag
                      data-tauri-drag-region="false"
                      style="-webkit-app-region: no-drag; app-region: no-drag;"
                      onMouseDown={(e) => e.stopPropagation()}
                      onPointerDown={(e) => e.stopPropagation()}
                      onSelect={() => {
                        setTimeout(() => ctx.manager?.togglePin(tabId()), 0);
                      }}
                      class="relative flex cursor-pointer select-none items-center gap-2 rounded-xs px-2 py-1.5 text-xs outline-none transition-colors hover:bg-accent hover:text-accent-foreground pointer-events-auto [app-region:no-drag] [-webkit-app-region:no-drag]"
                    >
                      <Pin class="size-3.5 text-muted-foreground" />
                      <span>{isPinned() ? "Unpin Tab" : "Pin Tab"}</span>
                    </ContextMenuPrimitive.Item>
                    <ContextMenuPrimitive.Separator class="my-1 h-px bg-border/60" />
                  </Show>

                  <ContextMenuPrimitive.Item
                    data-no-drag
                    data-tauri-drag-region="false"
                    style="-webkit-app-region: no-drag; app-region: no-drag;"
                    onMouseDown={(e) => e.stopPropagation()}
                    onPointerDown={(e) => e.stopPropagation()}
                    disabled={isPinned() || !closable()}
                    onSelect={() => {
                      setTimeout(() => {
                        if (local.onClose) local.onClose(new MouseEvent("click"));
                        else ctx.manager?.closeTab(tabId());
                      }, 0);
                    }}
                    class="relative flex cursor-pointer select-none items-center justify-between gap-2 rounded-xs px-2 py-1.5 text-xs outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 pointer-events-auto [app-region:no-drag] [-webkit-app-region:no-drag]"
                  >
                    <span class="flex items-center gap-2">
                      <X class="size-3.5 text-muted-foreground" />
                      Close Tab
                    </span>
                    <span class="ml-auto text-[10px] text-muted-foreground font-mono">Ctrl+W</span>
                  </ContextMenuPrimitive.Item>

                  <Show when={ctx.manager && ctx.manager.tabs().length > 1}>
                    <ContextMenuPrimitive.Item
                      data-no-drag
                      data-tauri-drag-region="false"
                      style="-webkit-app-region: no-drag; app-region: no-drag;"
                      onMouseDown={(e) => e.stopPropagation()}
                      onPointerDown={(e) => e.stopPropagation()}
                      onSelect={() => {
                        setTimeout(() => ctx.manager?.closeOthers(tabId()), 0);
                      }}
                      class="relative flex cursor-pointer select-none items-center gap-2 rounded-xs px-2 py-1.5 text-xs outline-none transition-colors hover:bg-accent hover:text-accent-foreground pointer-events-auto [app-region:no-drag] [-webkit-app-region:no-drag]"
                    >
                      <CircleX class="size-3.5 text-muted-foreground" />
                      Close Other Tabs
                    </ContextMenuPrimitive.Item>
                    <ContextMenuPrimitive.Item
                      data-no-drag
                      data-tauri-drag-region="false"
                      style="-webkit-app-region: no-drag; app-region: no-drag;"
                      onMouseDown={(e) => e.stopPropagation()}
                      onPointerDown={(e) => e.stopPropagation()}
                      onSelect={() => {
                        setTimeout(() => ctx.manager?.closeAll(), 0);
                      }}
                      class="relative flex cursor-pointer select-none items-center gap-2 rounded-xs px-2 py-1.5 text-xs outline-none transition-colors hover:bg-accent hover:text-accent-foreground pointer-events-auto [app-region:no-drag] [-webkit-app-region:no-drag]"
                    >
                      <CircleX class="size-3.5 text-muted-foreground" />
                      <span>Close All Tabs</span>
                    </ContextMenuPrimitive.Item>
                  </Show>
                </>
              }
            >
              {local.renderContextMenu!(local.tab || { id: tabId(), title: title() })}
            </Show>
          </ContextMenuPrimitive.Content>
        </ContextMenuPrimitive.Portal>
      </ContextMenuPrimitive.Root>
    </Show>
  );
};

/* --- 5. TitlebarTabAddButton using Nikala UI Button & Tooltip --- */

export interface TitlebarTabAddButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  class?: string;
}

export const TitlebarTabAddButton: Component<TitlebarTabAddButtonProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "style"]);

  return (
    <div
      data-no-drag
      data-tauri-drag-region="false"
      style={("-webkit-app-region: no-drag; app-region: no-drag;" + (typeof local.style === "string" ? ` ${local.style}` : "")) as any}
      class="shrink-0 flex items-center z-20 pointer-events-auto [app-region:no-drag] [-webkit-app-region:no-drag]"
    >
      <Tooltip>
        <TooltipTrigger
          as={Button}
          variant="ghost"
          size="icon"
          data-no-drag
          data-tauri-drag-region="false"
          aria-label="Add new tab"
          class={cn(
            "size-6 rounded-md text-muted-foreground hover:bg-muted/80 hover:text-foreground cursor-pointer shrink-0",
            local.class
          )}
          {...rest}
        >
          <Plus class="size-3.5" />
        </TooltipTrigger>
        <TooltipContent class="text-[10px] py-1 px-2">
          New tab (Ctrl+T)
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

