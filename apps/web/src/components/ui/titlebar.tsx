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
  minimize: () => Promise<void>;
  toggleMaximize: () => Promise<void>;
  close: () => Promise<void>;
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

/* --- 3. Titlebar Root Component --- */
export interface TitlebarProps
  extends JSX.HTMLAttributes<HTMLElement>,
    VariantProps<typeof titlebarVariants> {
  platform?: TitlebarPlatform;
  isMaximized?: boolean;
  onMinimize?: () => void;
  onToggleMaximize?: () => void;
  onClose?: () => void;
  class?: string;
}

export const Titlebar: ParentComponent<TitlebarProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "platform",
    "variant",
    "size",
    "isMaximized",
    "onMinimize",
    "onToggleMaximize",
    "onClose",
    "class",
    "children",
  ]);

  const tauriWin = createTauriWindow({ listenEvents: true });

  const resolvedPlatform = createMemo<"macos" | "windows">(() => {
    if (local.platform === "macos") return "macos";
    if (local.platform === "windows") return "windows";
    const detected = detectPlatform();
    return detected === "macos" ? "macos" : "windows";
  });

  const isMax = () =>
    local.isMaximized !== undefined ? local.isMaximized : tauriWin.isMaximized();

  const handleMinimize = async () => {
    if (local.onMinimize) local.onMinimize();
    else await tauriWin.minimize();
  };

  const handleToggleMaximize = async () => {
    if (local.onToggleMaximize) local.onToggleMaximize();
    else await tauriWin.toggleMaximize();
  };

  const handleClose = async () => {
    if (local.onClose) local.onClose();
    else await tauriWin.close();
  };

  const handleMouseDown = (e: MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).getAttribute?.("data-tauri-drag-region") !== null) {
      tauriWin.startDragging(e);
    }
  };

  const handleDblClick = () => {
    handleToggleMaximize();
  };

  const contextValue: TitlebarContextValue = {
    platform: resolvedPlatform,
    isMaximized: isMax,
    minimize: handleMinimize,
    toggleMaximize: handleToggleMaximize,
    close: handleClose,
  };

  return (
    <TitlebarContext.Provider value={contextValue}>
      <header
        data-tauri-drag-region=""
        data-platform={resolvedPlatform()}
        onMouseDown={handleMouseDown}
        onDblClick={handleDblClick}
        class={cn(
          titlebarVariants({ variant: local.variant, size: local.size }),
          resolvedPlatform() === "macos" ? "flex-row" : "flex-row-reverse",
          local.class
        )}
        {...rest}
      >
        {local.children}
      </header>
    </TitlebarContext.Provider>
  );
};

/* --- 4. TitlebarControls (macOS & Windows Window Buttons) --- */
export interface TitlebarControlsProps extends JSX.HTMLAttributes<HTMLDivElement> {
  platform?: TitlebarPlatform;
  class?: string;
}

export const TitlebarControls: Component<TitlebarControlsProps> = (props) => {
  const [local, rest] = splitProps(props, ["platform", "class"]);
  const { platform, isMaximized, minimize, toggleMaximize, close } = useTitlebar();

  const currentPlatform = () => {
    if (local.platform === "macos") return "macos";
    if (local.platform === "windows") return "windows";
    return platform();
  };

  return (
    <div
      data-tauri-drag-region={false}
      class={cn(
        "flex items-center shrink-0 z-10",
        currentPlatform() === "macos" ? "gap-2 pr-2" : "gap-0 -mr-3 h-full",
        local.class
      )}
      {...rest}
    >
      {/* --- macOS Traffic Lights --- */}
      <Show when={currentPlatform() === "macos"}>
        {/* Close button (Red) */}
        <button
          type="button"
          aria-label="Close Window"
          onClick={(e) => {
            e.stopPropagation();
            close();
          }}
          class="group/btn relative size-3 rounded-full bg-[#ff5f56] border border-[#e0443e] flex items-center justify-center cursor-pointer transition-transform active:scale-95"
        >
          <svg class="size-2 opacity-0 group-hover/btn:opacity-100 text-[#4c0002] transition-opacity" viewBox="0 0 6 6" fill="currentColor">
            <path d="M0.85 0.15L3 2.3 5.15 0.15a.5.5 0 01.7.7L3.7 3l2.15 2.15a.5.5 0 01-.7.7L3 3.7 0.85 5.85a.5.5 0 01-.7-.7L2.3 3 0.15 0.85a.5.5 0 01.7-.7z" />
          </svg>
        </button>

        {/* Minimize button (Amber) */}
        <button
          type="button"
          aria-label="Minimize Window"
          onClick={(e) => {
            e.stopPropagation();
            minimize();
          }}
          class="group/btn relative size-3 rounded-full bg-[#ffbd2e] border border-[#dea123] flex items-center justify-center cursor-pointer transition-transform active:scale-95"
        >
          <svg class="size-2 opacity-0 group-hover/btn:opacity-100 text-[#543b00] transition-opacity" viewBox="0 0 6 6" fill="currentColor">
            <path d="M0.5 2.5h5a.5.5 0 010 1h-5a.5.5 0 010-1z" />
          </svg>
        </button>

        {/* Maximize / Fullscreen button (Green) */}
        <button
          type="button"
          aria-label="Maximize Window"
          onClick={(e) => {
            e.stopPropagation();
            toggleMaximize();
          }}
          class="group/btn relative size-3 rounded-full bg-[#27c93f] border border-[#1aab29] flex items-center justify-center cursor-pointer transition-transform active:scale-95"
        >
          <svg class="size-2 opacity-0 group-hover/btn:opacity-100 text-[#004d0b] transition-opacity" viewBox="0 0 6 6" fill="currentColor">
            <path d="M0.5 0.5h2v1H1.5v1h-1v-2zm5 5h-2v-1h1v-1h1v2z" />
          </svg>
        </button>
      </Show>

      {/* --- Windows 11 Fluent Controls --- */}
      <Show when={currentPlatform() === "windows"}>
        {/* Minimize Button */}
        <button
          type="button"
          aria-label="Minimize"
          onClick={(e) => {
            e.stopPropagation();
            minimize();
          }}
          class="inline-flex h-full w-11 items-center justify-center text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-colors cursor-pointer"
        >
          <svg class="size-3" viewBox="0 0 10 1" fill="currentColor">
            <rect width="10" height="1" />
          </svg>
        </button>

        {/* Maximize / Restore Button */}
        <button
          type="button"
          aria-label="Maximize"
          onClick={(e) => {
            e.stopPropagation();
            toggleMaximize();
          }}
          class="inline-flex h-full w-11 items-center justify-center text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-colors cursor-pointer"
        >
          <Show
            when={isMaximized()}
            fallback={
              <svg class="size-2.5" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1">
                <rect x="0.5" y="0.5" width="9" height="9" />
              </svg>
            }
          >
            <svg class="size-2.5" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1">
              <path d="M2.5 0.5h7v7h-1v-6h-6v-1z" />
              <rect x="0.5" y="2.5" width="7" height="7" />
            </svg>
          </Show>
        </button>

        {/* Close Button (Hover red) */}
        <button
          type="button"
          aria-label="Close"
          onClick={(e) => {
            e.stopPropagation();
            close();
          }}
          class="inline-flex h-full w-11 items-center justify-center text-muted-foreground hover:bg-[#e81123] hover:text-white transition-colors cursor-pointer"
        >
          <svg class="size-3" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1">
            <path d="M1 1l8 8M9 1L1 9" />
          </svg>
        </button>
      </Show>
    </div>
  );
};

/* --- 5. TitlebarTitle --- */
export interface TitlebarTitleProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

export const TitlebarTitle: ParentComponent<TitlebarTitleProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <div
      data-tauri-drag-region=""
      class={cn(
        "flex flex-1 items-center gap-2 overflow-hidden px-2 font-medium tracking-tight truncate pointer-events-none",
        local.class
      )}
      {...rest}
    >
      {local.children}
    </div>
  );
};

/* --- 6. TitlebarIcon --- */
export interface TitlebarIconProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

export const TitlebarIcon: ParentComponent<TitlebarIconProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <div
      data-tauri-drag-region=""
      class={cn("flex size-4 items-center justify-center shrink-0 mr-1.5", local.class)}
      {...rest}
    >
      {local.children}
    </div>
  );
};

/* --- 7. TitlebarActions --- */
export interface TitlebarActionsProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

export const TitlebarActions: ParentComponent<TitlebarActionsProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <div
      data-tauri-drag-region={false}
      class={cn("flex items-center gap-1.5 shrink-0 z-10", local.class)}
      {...rest}
    >
      {local.children}
    </div>
  );
};
