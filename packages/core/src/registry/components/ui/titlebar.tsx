import {
  createContext,
  useContext,
  splitProps,
  createMemo,
  Show,
  type Component,
  type JSX,
  type ParentComponent,
  type Accessor,
} from "solid-js";
import { cva, type VariantProps } from "class-variance-authority";
import { createTauriWindow, type TauriPlatform, detectPlatform } from "@/hooks/create-tauri-window";
import { cn } from "@/lib/cn";

/* --- 1. Context & Types --- */
export type TitlebarPlatform = "macos" | "windows" | "auto";

export interface TitlebarContextValue {
  platform: Accessor<"macos" | "windows">;
  isMaximized: Accessor<boolean>;
  minimize: () => Promise<void> | void;
  toggleMaximize: () => Promise<void> | void;
  close: () => Promise<void> | void;
  destroy?: () => Promise<void> | void;
}

const TitlebarContext = createContext<TitlebarContextValue>();

export function useTitlebar() {
  const context = useContext(TitlebarContext);
  if (!context) {
    throw new Error("useTitlebar must be used within a <Titlebar />");
  }
  return context;
}

/* --- 2. Titlebar Variants --- */
export const titlebarVariants = cva(
  "relative flex w-full select-none items-center justify-between border-b transition-colors shrink-0 sticky top-0 z-50",
  {
    variants: {
      variant: {
        default: "border-border/50 bg-background text-foreground",
        translucent: "border-border/40 bg-background/80 backdrop-blur-md text-foreground",
        floating: "m-2 rounded-lg border border-border bg-card shadow-sm text-card-foreground",
        transparent: "border-transparent bg-transparent text-foreground",
      },
      size: {
        sm: "h-8 text-xs px-2.5",
        default: "h-9 text-xs px-3",
        lg: "h-11 text-sm px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

/* --- 3. Root Titlebar Component --- */
export interface TitlebarProps
  extends JSX.HTMLAttributes<HTMLElement>,
    VariantProps<typeof titlebarVariants> {
  /** Explicit platform style, or 'auto' to detect host OS. */
  platform?: TitlebarPlatform;
  /** Optional controlled maximize state override. */
  isMaximized?: boolean;
  /** Optional minimize callback override. */
  onMinimize?: () => void | Promise<void>;
  /** Optional maximize callback override. */
  onToggleMaximize?: () => void | Promise<void>;
  /** Optional close callback override. */
  onClose?: () => void | Promise<void>;
  /** Whether double-clicking the titlebar toggles window maximize state. Defaults to true. */
  doubleClickToMaximize?: boolean;
}

export const Titlebar: ParentComponent<TitlebarProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "platform",
    "isMaximized",
    "onMinimize",
    "onToggleMaximize",
    "onClose",
    "variant",
    "size",
    "class",
    "children",
    "doubleClickToMaximize",
    "onMouseDown",
    "onDblClick",
  ]);

  const windowCtrl = createTauriWindow();

  const resolvedPlatform = createMemo<"macos" | "windows">(() => {
    if (local.platform && local.platform !== "auto") {
      return local.platform;
    }
    const detected = detectPlatform();
    return detected === "macos" ? "macos" : "windows";
  });

  const isMaximized = () =>
    local.isMaximized !== undefined ? local.isMaximized : windowCtrl.isMaximized();

  const minimize = () => (local.onMinimize ? local.onMinimize() : windowCtrl.minimize());
  const toggleMaximize = () =>
    local.onToggleMaximize ? local.onToggleMaximize() : windowCtrl.toggleMaximize();
  const close = () => (local.onClose ? local.onClose() : windowCtrl.close());
  const destroy = () => windowCtrl.destroy();

  const handleMouseDown: JSX.EventHandlerUnion<HTMLElement, MouseEvent> = (e) => {
    if (e.button === 0) {
      const target = e.target as HTMLElement;
      if (!target.closest("button, a, input, select, textarea, [data-no-drag], [data-tauri-drag-region='false']")) {
        if (e.detail === 2 && local.doubleClickToMaximize !== false) {
          // Double-click detected on mousedown detail - toggles maximize immediately without initiating a drag
          toggleMaximize();
        } else if (e.detail === 1) {
          // Single-click: initiate window drag
          windowCtrl.startDragging(e);
        }
      }
    }
    if (typeof local.onMouseDown === "function") {
      (local.onMouseDown as any)(e);
    }
  };

  let lastDblClickTime = 0;
  const handleDoubleClick: JSX.EventHandlerUnion<HTMLElement, MouseEvent> = (e) => {
    const now = Date.now();
    if (now - lastDblClickTime < 350) {
      return; // Deduplicate rapid triggers
    }
    lastDblClickTime = now;

    if (local.doubleClickToMaximize !== false) {
      // Don't maximize if user double-clicked an interactive control
      const target = e.target as HTMLElement;
      if (!target.closest("button, a, input, select, textarea, [data-no-drag], [data-tauri-drag-region='false']")) {
        toggleMaximize();
      }
    }
    if (typeof local.onDblClick === "function") {
      (local.onDblClick as any)(e);
    }
  };

  const contextValue: TitlebarContextValue = {
    platform: resolvedPlatform,
    isMaximized,
    minimize,
    toggleMaximize,
    close,
    destroy,
  };

  return (
    <TitlebarContext.Provider value={contextValue}>
      <header
        onMouseDown={handleMouseDown}
        onDblClick={handleDoubleClick}
        class={cn(
          titlebarVariants({ variant: local.variant, size: local.size }),
          "select-none cursor-default",
          local.class
        )}
        {...rest}
      >
        {local.children}
      </header>
    </TitlebarContext.Provider>
  );
};

/* --- 4. Subcomponents --- */

/**
 * Traffic light buttons for macOS or Fluent control buttons for Windows.
 */
export interface TitlebarControlsProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /** Optional override platform style. Defaults to Titlebar context or detected OS. */
  platform?: "macos" | "windows";
  /** Optional controlled maximize state override. */
  isMaximized?: boolean;
  /** Optional minimize callback override. */
  onMinimize?: () => void | Promise<void>;
  /** Optional maximize callback override. */
  onToggleMaximize?: () => void | Promise<void>;
  /** Optional close callback override. */
  onClose?: () => void | Promise<void>;
}

export const TitlebarControls: Component<TitlebarControlsProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "platform",
    "class",
    "style",
    "isMaximized",
    "onMinimize",
    "onToggleMaximize",
    "onClose",
  ]);
  const ctx = useContext(TitlebarContext);
  let fallbackCtrl: ReturnType<typeof createTauriWindow> | null = null;
  if (!ctx) {
    fallbackCtrl = createTauriWindow();
  }

  const activePlatform = createMemo<"macos" | "windows">(() => {
    if (local.platform) return local.platform;
    if (ctx?.platform) return ctx.platform();
    const detected = detectPlatform();
    return detected === "macos" ? "macos" : "windows";
  });

  const isMaximized = () => {
    if (local.isMaximized !== undefined) return local.isMaximized;
    if (ctx?.isMaximized) return ctx.isMaximized();
    return fallbackCtrl ? fallbackCtrl.isMaximized() : false;
  };

  const handleMinimize = (e: MouseEvent) => {
    e.stopPropagation();
    if (local.onMinimize) return local.onMinimize();
    if (ctx?.minimize) return ctx.minimize();
    return fallbackCtrl?.minimize();
  };

  const handleToggleMaximize = (e: MouseEvent) => {
    e.stopPropagation();
    if (local.onToggleMaximize) return local.onToggleMaximize();
    if (ctx?.toggleMaximize) return ctx.toggleMaximize();
    return fallbackCtrl?.toggleMaximize();
  };

  const handleClose = (e: MouseEvent) => {
    e.stopPropagation();
    if (local.onClose) return local.onClose();
    if (ctx?.close) return ctx.close();
    return fallbackCtrl?.close();
  };

  return (
    <div
      data-no-drag
      data-tauri-drag-region="false"
      style={("-webkit-app-region: no-drag; app-region: no-drag;" + (typeof local.style === "string" ? ` ${local.style}` : "")) as any}
      class={cn(
        "flex items-center z-10 self-stretch shrink-0 pointer-events-auto [app-region:no-drag] [-webkit-app-region:no-drag]",
        activePlatform() === "macos"
          ? "gap-2 px-1 order-first"
          : "gap-0 -mr-3 h-full order-last ml-auto",
        local.class
      )}
      {...rest}
    >
      <Show
        when={activePlatform() === "macos"}
        fallback={
          /* Windows 11 Fluent Window Controls */
          <div class="flex items-center h-full self-stretch">
            {/* Minimize */}
            <button
              type="button"
              onClick={handleMinimize}
              class="inline-flex h-full w-11 items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
              aria-label="Minimize Window"
            >
              <svg class="h-3 w-3" fill="none" viewBox="0 0 12 12">
                <path stroke="currentColor" stroke-width="1" d="M1.5 6h9" />
              </svg>
            </button>

            {/* Maximize / Restore */}
            <button
              type="button"
              onClick={handleToggleMaximize}
              class="inline-flex h-full w-11 items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
              aria-label={isMaximized() ? "Restore Window" : "Maximize Window"}
            >
              <Show
                when={isMaximized()}
                fallback={
                  <svg class="h-3 w-3" fill="none" viewBox="0 0 12 12">
                    <rect width="8" height="8" x="2" y="2" stroke="currentColor" stroke-width="1" rx="0.5" />
                  </svg>
                }
              >
                <svg class="h-3 w-3" fill="none" viewBox="0 0 12 12">
                  <path stroke="currentColor" stroke-width="1" d="M3.5 3.5v-1.5h6v6h-1.5M2 4.5h6v6h-6z" />
                </svg>
              </Show>
            </button>

            {/* Close */}
            <button
              type="button"
              onClick={handleClose}
              class="inline-flex h-full w-11 items-center justify-center text-muted-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors cursor-pointer"
              aria-label="Close Window"
            >
              <svg class="h-3 w-3" fill="none" viewBox="0 0 12 12">
                <path stroke="currentColor" stroke-width="1" d="M2.5 2.5l7 7M9.5 2.5l-7 7" />
              </svg>
            </button>
          </div>
        }
      >
        {/* macOS Traffic Lights */}
        <div class="group/traffic flex items-center gap-2">
          {/* Close */}
          <button
            type="button"
            onClick={handleClose}
            class="flex size-3 items-center justify-center rouded-lg bg-[#ff5f57] border border-[#e0443e] cursor-pointer"
            aria-label="Close Window"
          >
            <svg
              class="size-1.5 text-[#4c0000] opacity-0 group-hover/traffic:opacity-100 transition-opacity"
              viewBox="0 0 6 6"
              fill="none"
              stroke="currentColor"
              stroke-width="1.2"
            >
              <path d="M1 1l4 4M5 1L1 5" />
            </svg>
          </button>

          {/* Minimize */}
          <button
            type="button"
            onClick={handleMinimize}
            class="flex size-3 items-center justify-center rouded-lg bg-[#febc2e] border border-[#d89e24] cursor-pointer"
            aria-label="Minimize Window"
          >
            <svg
              class="size-1.5 text-[#5c3e00] opacity-0 group-hover/traffic:opacity-100 transition-opacity"
              viewBox="0 0 6 6"
              fill="none"
              stroke="currentColor"
              stroke-width="1.2"
            >
              <path d="M1 3h4" />
            </svg>
          </button>

          {/* Maximize */}
          <button
            type="button"
            onClick={handleToggleMaximize}
            class="flex size-3 items-center justify-center rouded-lg bg-[#28c840] border border-[#1aab29] cursor-pointer"
            aria-label="Maximize Window"
          >
            <svg
              class="size-1.5 text-[#003d07] opacity-0 group-hover/traffic:opacity-100 transition-opacity"
              viewBox="0 0 6 6"
              fill="none"
              stroke="currentColor"
              stroke-width="1.2"
            >
              <path d="M1 4.5l3.5-3.5M4.5 1h-3M4.5 1v3" />
            </svg>
          </button>
        </div>
      </Show>
    </div>
  );
};

/**
 * Title text container. Placed naturally in JSX flow by default, or centered with align="center".
 */
export interface TitlebarTitleProps extends JSX.HTMLAttributes<HTMLDivElement> {
  align?: "center" | "start";
}

export const TitlebarTitle: ParentComponent<TitlebarTitleProps> = (props) => {
  const [local, rest] = splitProps(props, ["align", "class", "children"]);

  const isCentered = () => local.align === "center";

  return (
    <div
      class={cn(
        "flex items-center gap-2 font-medium truncate text-xs text-foreground",
        isCentered()
          ? "absolute left-1/2 -translate-x-1/2 pointer-events-none text-center justify-center max-w-[calc(100%-160px)]"
          : "shrink-0",
        local.class
      )}
      {...rest}
    >
      {local.children}
    </div>
  );
};

/**
 * App icon slot within Titlebar.
 */
export const TitlebarIcon: ParentComponent<JSX.HTMLAttributes<HTMLDivElement>> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <div
      data-no-drag
      data-tauri-drag-region="false"
      class={cn(
        "flex shrink-0 items-center justify-center size-4 text-muted-foreground pointer-events-auto [app-region:no-drag] [-webkit-app-region:no-drag]",
        local.class
      )}
      {...rest}
    >
      {local.children}
    </div>
  );
};

/**
 * Action buttons container (Search, Settings, ThemeToggle, Navigation) placed in the titlebar.
 * Supports start, end, center, or natural flow alignment.
 */
export interface TitlebarActionsProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /** Alignment of the actions container within the titlebar. Defaults to 'end'. */
  align?: "start" | "end" | "center" | "none";
}

export const TitlebarActions: ParentComponent<TitlebarActionsProps> = (props) => {
  const [local, rest] = splitProps(props, ["align", "class", "children", "style"]);

  const alignClass = () => {
    switch (local.align) {
      case "start":
        return "mr-auto";
      case "center":
        return "mx-auto";
      case "none":
        return "";
      case "end":
      default:
        return "ml-auto";
    }
  };

  return (
    <div
      data-no-drag
      data-tauri-drag-region="false"
      style={("-webkit-app-region: no-drag; app-region: no-drag;" + (typeof local.style === "string" ? ` ${local.style}` : "")) as any}
      class={cn(
        "flex items-center gap-1 shrink-0 z-10 px-1 pointer-events-auto [app-region:no-drag] [-webkit-app-region:no-drag]",
        alignClass(),
        local.class
      )}
      {...rest}
    >
      {local.children}
    </div>
  );
};

/* --- 6. Re-export TitlebarTabs Suite --- */
export * from "./titlebar-tabs";

