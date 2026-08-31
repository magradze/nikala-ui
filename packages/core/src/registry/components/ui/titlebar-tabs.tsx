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
import { Plus, X, Pin } from "lucide-solid";
import { Button } from "./button";
import { Tooltip, TooltipTrigger, TooltipContent } from "./tooltip";
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
    "variant",
    "class",
    "children",
  ]);

  let scrollContainerRef: HTMLDivElement | undefined;

  const [internalValue, setInternalValue] = createSignal(local.defaultValue || local.value);

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
  };

  return (
    <TitlebarTabsContext.Provider value={contextValue}>
      <nav
        aria-label="Window Tabs"
        data-no-drag
        data-tauri-drag-region="false"
        style={"-webkit-app-region: no-drag; app-region: no-drag;" as any}
        class={cn(
          "flex flex-1 h-full overflow-hidden z-10 min-w-0 pointer-events-auto [app-region:no-drag] [-webkit-app-region:no-drag]",
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
                  "flex h-full overflow-x-auto no-scrollbar gap-0 items-center min-w-0 flex-1 scroll-smooth",
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
      data-no-drag
      class={cn(
        "flex h-full overflow-x-auto no-scrollbar gap-0 items-center min-w-0 flex-1 scroll-smooth",
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

export interface TitlebarTabProps extends Omit<JSX.HTMLAttributes<HTMLButtonElement>, "onClose"> {
  /** Tab data object from createDocumentTabs(). Automatically wires all properties. */
  tab?: TabItem<any>;
  value?: string;
  isDirty?: boolean;
  isPinned?: boolean;
  closable?: boolean;
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
    "onClose",
    "class",
    "children",
    "onClick",
  ]);

  const ctx = useTitlebarTabs();
  let buttonRef: HTMLButtonElement | undefined;

  const tabId = () => local.tab?.id || local.value || "";
  const isPinned = () => local.tab?.isPinned ?? local.isPinned ?? false;
  const isDirty = () => local.tab?.isDirty ?? local.isDirty ?? false;
  const closable = () => local.tab?.closable ?? local.closable ?? true;
  const title = () => local.tab?.title || "";
  const IconComp = () => local.tab?.icon;

  const isActive = () => ctx.value() === tabId();

  // Scroll active tab into view when selected
  createEffect(() => {
    if (isActive() && buttonRef) {
      buttonRef.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }
  });

  const handleClick = (e: MouseEvent) => {
    ctx.setValue(tabId());
    if (typeof local.onClick === "function") {
      (local.onClick as any)(e);
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

  return (
    <Button
      ref={buttonRef}
      variant="ghost"
      data-no-drag
      data-active={isActive() ? "true" : "false"}
      onClick={handleClick}
      class={cn(
        titlebarTabVariants({ variant: ctx.variant() }),
        isPinned() && "min-w-fit px-2 max-w-fit",
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
            class="size-4 p-0 rounded-xs text-muted-foreground hover:bg-muted hover:text-foreground shrink-0 ml-0.5 cursor-pointer"
          >
            <Show
              when={isDirty()}
              fallback={<X class="size-3 opacity-60 hover:opacity-100" />}
            >
              <span class="size-1.5 rounded-full bg-primary group-hover:hidden" />
              <X class="size-3 hidden group-hover:block" />
            </Show>
          </TooltipTrigger>
          <TooltipContent class="text-[10px] py-1 px-2">
            Close tab (Ctrl+W)
          </TooltipContent>
        </Tooltip>
      </Show>
    </Button>
  );
};

/* --- 5. TitlebarTabAddButton using Nikala UI Button & Tooltip --- */

export interface TitlebarTabAddButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  class?: string;
}

export const TitlebarTabAddButton: Component<TitlebarTabAddButtonProps> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <Tooltip>
      <TooltipTrigger
        as={Button}
        variant="ghost"
        size="icon"
        data-no-drag
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
  );
};
