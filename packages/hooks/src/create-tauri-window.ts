import { createSignal, onMount, onCleanup, type Accessor } from "solid-js";

export type TauriPlatform = "macos" | "windows" | "linux" | "web";

export interface CreateTauriWindowOptions {
  /** Initial fallback platform if not detected automatically. */
  defaultPlatform?: TauriPlatform;
  /** Listen to window resize and focus events. Defaults to true. */
  listenEvents?: boolean;
}

export interface CreateTauriWindowReturn {
  /** Signal indicating whether the application is running inside a Tauri runtime. */
  isTauri: Accessor<boolean>;
  /** Detected host platform ('macos' | 'windows' | 'linux' | 'web'). */
  platform: Accessor<TauriPlatform>;
  /** Signal indicating whether the window is currently maximized. */
  isMaximized: Accessor<boolean>;
  /** Signal indicating whether the window is currently minimized. */
  isMinimized: Accessor<boolean>;
  /** Signal indicating whether the window is currently in fullscreen mode. */
  isFullscreen: Accessor<boolean>;
  /** Signal indicating whether the window is currently focused. */
  isFocused: Accessor<boolean>;
  /** Minimize the application window. */
  minimize: () => Promise<void>;
  /** Maximize the application window. */
  maximize: () => Promise<void>;
  /** Unmaximize the application window. */
  unmaximize: () => Promise<void>;
  /** Toggle between maximized and normal window states. */
  toggleMaximize: () => Promise<void>;
  /** Close the application window. */
  close: () => Promise<void>;
  /** Toggle fullscreen state. */
  setFullscreen: (fullscreen: boolean) => Promise<void>;
  /** Start dragging the window. Can be bound to mousedown event or custom titlebar headers. */
  startDragging: (e?: MouseEvent) => Promise<void>;
}

/**
 * Helper to detect current operating system in browser or Tauri environments.
 */
export function detectPlatform(): TauriPlatform {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return "web";
  }

  const userAgent = navigator.userAgent.toLowerCase();
  const platform = (navigator as any).userAgentData?.platform?.toLowerCase() || navigator.platform?.toLowerCase() || "";

  if (platform.includes("mac") || userAgent.includes("macintosh") || userAgent.includes("mac os x")) {
    return "macos";
  }
  if (platform.includes("win") || userAgent.includes("windows")) {
    return "windows";
  }
  if (platform.includes("linux") || userAgent.includes("linux")) {
    return "linux";
  }

  return "web";
}

/**
 * Checks whether the current environment is running inside Tauri v1 or v2.
 */
export function isTauriEnvironment(): boolean {
  if (typeof window === "undefined") return false;
  return (
    "__TAURI_INTERNALS__" in window ||
    "__TAURI__" in window ||
    "__TAURI_PATTERN__" in window ||
    Boolean((window as any).__TAURI_METADATA__)
  );
}

/**
 * SolidJS reactive primitive for controlling and observing Tauri desktop window states.
 * Provides seamless fallbacks for web environments and interactive previews.
 */
export function createTauriWindow(
  options: CreateTauriWindowOptions = {}
): CreateTauriWindowReturn {
  const [isTauri, setIsTauri] = createSignal<boolean>(false);
  const [platform, setPlatform] = createSignal<TauriPlatform>(options.defaultPlatform || "web");
  const [isMaximized, setIsMaximized] = createSignal<boolean>(false);
  const [isMinimized, setIsMinimized] = createSignal<boolean>(false);
  const [isFullscreen, setIsFullscreen] = createSignal<boolean>(false);
  const [isFocused, setIsFocused] = createSignal<boolean>(true);

  let unlistenResize: (() => void) | null = null;
  let unlistenFocus: (() => void) | null = null;

  // Retrieve Tauri Window instance safely
  const getTauriWindow = async () => {
    if (typeof window === "undefined") return null;
    try {
      if ((window as any).__TAURI__?.window?.getCurrentWindow) {
        return (window as any).__TAURI__.window.getCurrentWindow();
      }
      if ((window as any).__TAURI__?.window?.appWindow) {
        return (window as any).__TAURI__.window.appWindow;
      }
      // Variable prevents Vite dev server from static module resolution
      const moduleName = "@tauri-apps/api/window";
      // @ts-ignore - Optional runtime dependency in Tauri apps
      const tauriApi = await import(/* @vite-ignore */ moduleName).catch(() => null);
      if (tauriApi?.getCurrentWindow) {
        return tauriApi.getCurrentWindow();
      }
    } catch {
      // Running in standard web mode
    }
    return null;
  };

  const updateWindowStates = async () => {
    if (typeof window === "undefined") return;

    const tauriWin = await getTauriWindow();
    if (tauriWin) {
      setIsTauri(true);
      try {
        const [max, min, full, foc] = await Promise.all([
          tauriWin.isMaximized ? tauriWin.isMaximized() : false,
          tauriWin.isMinimized ? tauriWin.isMinimized() : false,
          tauriWin.isFullscreen ? tauriWin.isFullscreen() : false,
          tauriWin.isFocused ? tauriWin.isFocused() : true,
        ]);
        setIsMaximized(Boolean(max));
        setIsMinimized(Boolean(min));
        setIsFullscreen(Boolean(full));
        setIsFocused(Boolean(foc));
      } catch {
        // Fallback gracefully
      }
    } else {
      setIsTauri(false);
      setIsFullscreen(Boolean(document.fullscreenElement));
    }
  };

  onMount(async () => {
    if (typeof window === "undefined") return;

    setPlatform(detectPlatform());
    setIsTauri(isTauriEnvironment());
    await updateWindowStates();

    if (options.listenEvents !== false) {
      const handleWindowFocus = () => setIsFocused(true);
      const handleWindowBlur = () => setIsFocused(false);
      const handleFullscreenChange = () => setIsFullscreen(Boolean(document.fullscreenElement));

      window.addEventListener("focus", handleWindowFocus);
      window.addEventListener("blur", handleWindowBlur);
      document.addEventListener("fullscreenchange", handleFullscreenChange);

      const tauriWin = await getTauriWindow();
      if (tauriWin?.onResized) {
        try {
          unlistenResize = await tauriWin.onResized(() => updateWindowStates());
          unlistenFocus = await tauriWin.onFocusChanged(({ payload }: { payload: boolean }) => {
            setIsFocused(payload);
          });
        } catch {
          // Ignored in non-tauri contexts
        }
      }

      onCleanup(() => {
        window.removeEventListener("focus", handleWindowFocus);
        window.removeEventListener("blur", handleWindowBlur);
        document.removeEventListener("fullscreenchange", handleFullscreenChange);
        if (unlistenResize) unlistenResize();
        if (unlistenFocus) unlistenFocus();
      });
    }
  });

  const minimize = async (): Promise<void> => {
    const tauriWin = await getTauriWindow();
    if (tauriWin?.minimize) {
      await tauriWin.minimize();
      setIsMinimized(true);
    } else {
      setIsMinimized((prev) => !prev);
      if (!isMinimized()) {
        setIsMaximized(false);
      }
    }
  };

  const maximize = async (): Promise<void> => {
    const tauriWin = await getTauriWindow();
    if (tauriWin?.maximize) {
      await tauriWin.maximize();
      setIsMaximized(true);
      setIsMinimized(false);
    } else {
      setIsMaximized(true);
      setIsMinimized(false);
    }
  };

  const unmaximize = async (): Promise<void> => {
    const tauriWin = await getTauriWindow();
    if (tauriWin?.unmaximize) {
      await tauriWin.unmaximize();
      setIsMaximized(false);
    } else {
      setIsMaximized(false);
    }
  };

  const toggleMaximize = async (): Promise<void> => {
    const tauriWin = await getTauriWindow();
    if (tauriWin?.toggleMaximize) {
      await tauriWin.toggleMaximize();
      setIsMaximized((prev) => !prev);
      setIsMinimized(false);
    } else {
      setIsMaximized((prev) => !prev);
      setIsMinimized(false);
    }
  };

  const close = async (): Promise<void> => {
    const tauriWin = await getTauriWindow();
    if (tauriWin?.close) {
      await tauriWin.close();
    } else if (typeof window !== "undefined") {
      window.close();
    }
  };

  const setFullscreen = async (fullscreen: boolean): Promise<void> => {
    const tauriWin = await getTauriWindow();
    if (tauriWin?.setFullscreen) {
      await tauriWin.setFullscreen(fullscreen);
      setIsFullscreen(fullscreen);
    } else if (typeof document !== "undefined") {
      if (fullscreen && document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      } else if (!fullscreen && document.fullscreenElement && document.exitFullscreen) {
        await document.exitFullscreen();
      }
      setIsFullscreen(fullscreen);
    }
  };

  const startDragging = async (e?: MouseEvent): Promise<void> => {
    if (e && e.button !== 0) return; // Only primary mouse button starts drag
    const tauriWin = await getTauriWindow();
    if (tauriWin?.startDragging) {
      await tauriWin.startDragging();
    }
  };

  return {
    isTauri,
    platform,
    isMaximized,
    isMinimized,
    isFullscreen,
    isFocused,
    minimize,
    maximize,
    unmaximize,
    toggleMaximize,
    close,
    setFullscreen,
    startDragging,
  };
}
