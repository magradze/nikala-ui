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
import { createTauriWindow, type TauriPlatform, detectPlatform } from "@nikala-ui/hooks";
import { cn } from "@/lib/cn";

/* --- 1. Context & Types --- */
export type TitlebarPlatform = "macos" | "windows" | "auto";

interface TitlebarContextValue {
  platform: Accessor<"macos" | "windows">;
  isMaximized: Accessor<boolean>;
  minimize: () => Promise<void> | void;
  toggleMaximize: () => Promise<void> | void;
  close: () => Promise<void> | void;
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
  "relative flex w-full select-none items-center justify-between border-b transition-colors",
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

  const handleDoubleClick: JSX.EventHandlerUnion<HTMLElement, MouseEvent> = (e) => {
    if (local.doubleClickToMaximize !== false) {
      // Don't maximize if user double-clicked an interactive button
      const target = e.target as HTMLElement;
      if (!target.closest("button") && !target.closest("[data-no-drag]")) {
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
  };

  return (
    <TitlebarContext.Provider value={contextValue}>
      <header
        data-tauri-drag-region
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
  /** Optional override platform style. Defaults to Titlebar context. */
  platform?: "macos" | "windows";
}

export const TitlebarControls: Component<TitlebarControlsProps> = (props) => {
  const [local, rest] = splitProps(props, ["platform", "class"]);
  const ctx = useTitlebar();
  const activePlatform = () => local.platform || ctx.platform();

  return (
    <div
      data-no-drag
      class={cn(
        "flex items-center z-10",
        activePlatform() === "macos" ? "gap-2" : "gap-0 -mr-3 h-full ml-auto",
        local.class
      )}
      {...rest}
    >
      <Show
        when={activePlatform() === "macos"}
        fallback={
          /* Windows 11 Fluent Window Controls */
          <div class="flex items-center h-full">
            {/* Minimize */}
            <button
              type="button"
              onClick={() => ctx.minimize()}
              class="inline-flex h-9 w-11 items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
              aria-label="Minimize Window"
            >
              <svg class="h-3 w-3" fill="none" viewBox="0 0 12 12">
                <path stroke="currentColor" stroke-width="1" d="M1.5 6h9" />
              </svg>
            </button>

            {/* Maximize / Restore */}
            <button
              type="button"
              onClick={() => ctx.toggleMaximize()}
              class="inline-flex h-9 w-11 items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
              aria-label={ctx.isMaximized() ? "Restore Window" : "Maximize Window"}
            >
              <Show
                when={ctx.isMaximized()}
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
              onClick={() => ctx.close()}
              class="inline-flex h-9 w-11 items-center justify-center text-muted-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors cursor-pointer"
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
            onClick={() => ctx.close()}
            class="relative inline-flex size-3 items-center justify-center rounded-full bg-[#ff5f56] border border-[#e0443e] active:brightness-90 transition-all cursor-pointer"
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
            onClick={() => ctx.minimize()}
            class="relative inline-flex size-3 items-center justify-center rounded-full bg-[#ffbd2e] border border-[#dea123] active:brightness-90 transition-all cursor-pointer"
            aria-label="Minimize Window"
          >
            <svg
              class="size-1.5 text-[#543b00] opacity-0 group-hover/traffic:opacity-100 transition-opacity"
              viewBox="0 0 6 6"
              fill="none"
              stroke="currentColor"
              stroke-width="1.2"
            >
              <path d="M0.5 3h5" />
            </svg>
          </button>

          {/* Maximize / Fullscreen */}
          <button
            type="button"
            onClick={() => ctx.toggleMaximize()}
            class="relative inline-flex size-3 items-center justify-center rounded-full bg-[#27c93f] border border-[#1aab29] active:brightness-90 transition-all cursor-pointer"
            aria-label="Maximize Window"
          >
            <svg
              class="size-1.5 text-[#003d07] opacity-0 group-hover/traffic:opacity-100 transition-opacity"
              viewBox="0 0 6 6"
              fill="none"
              stroke="currentColor"
              stroke-width="1"
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
 * Centered or aligned title text container.
 */
export interface TitlebarTitleProps extends JSX.HTMLAttributes<HTMLDivElement> {
  align?: "center" | "start";
}

export const TitlebarTitle: ParentComponent<TitlebarTitleProps> = (props) => {
  const [local, rest] = splitProps(props, ["align", "class", "children"]);
  const ctx = useTitlebar();

  const alignmentClass = () => {
    if (local.align) {
      return local.align === "center" ? "justify-center text-center" : "justify-start text-left";
    }
    return ctx.platform() === "macos" ? "justify-center text-center" : "justify-start text-left";
  };

  return (
    <div
      data-tauri-drag-region
      class={cn(
        "flex flex-1 items-center gap-2 font-medium truncate pointer-events-none",
        alignmentClass(),
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
      class={cn("flex shrink-0 items-center justify-center size-4 text-muted-foreground", local.class)}
      {...rest}
    >
      {local.children}
    </div>
  );
};

/**
 * Action buttons container (Search, Settings, Menu) placed in the titlebar.
 */
export const TitlebarActions: ParentComponent<JSX.HTMLAttributes<HTMLDivElement>> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <div
      data-no-drag
      class={cn("flex items-center gap-1 shrink-0 z-10", local.class)}
      {...rest}
    >
      {local.children}
    </div>
  );
};

/* --- 6. Re-export TitlebarTabs Suite --- */
export * from "./titlebar-tabs";
