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
  /** Close the application window or exit process if main window. */
  close: () => Promise<void>;
  /** Forcefully destroy/close the application window. */
  destroy: () => Promise<void>;
  /** Toggle fullscreen state. */
  setFullscreen: (fullscreen: boolean) => Promise<void>;
  /** Start dragging the window. Can be bound to mousedown event or custom titlebar headers. */
  startDragging: (e?: MouseEvent) => Promise<void>;
}

/**
 * Helper to detect current operating system in browser or desktop environments.
 */
export function detectPlatform(): TauriPlatform {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return "web";
  }

  const userAgent = navigator.userAgent.toLowerCase();
  const platform =
    (navigator as any).userAgentData?.platform?.toLowerCase() ||
    navigator.platform?.toLowerCase() ||
    "";

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
  const win = window as any;
  return Boolean(
    win.__TAURI_INTERNALS__ ||
    win.__TAURI__ ||
    win.__TAURI_PATTERN__ ||
    win.__TAURI_METADATA__ ||
    win.__TAURI_IPC__ ||
    win.__TAURI_WINDOW__
  );
}

/**
 * Checks whether the current environment is running inside Electron.
 */
export function isElectronEnvironment(): boolean {
  if (typeof window === "undefined") return false;
  const win = window as any;
  return Boolean(
    win.electron ||
    win.electronAPI ||
    win.ipcRenderer ||
    win.process?.versions?.electron ||
    (typeof navigator !== "undefined" && navigator.userAgent?.toLowerCase().includes("electron"))
  );
}

/**
 * Direct low-level IPC invocation across Tauri v2 (__TAURI_INTERNALS__) and Tauri v1.
 */
async function invokeTauri(
  v2Cmd: string,
  v2Args?: Record<string, any>,
  v1CmdType?: string,
  v1Data?: any
): Promise<any> {
  if (typeof window === "undefined") return undefined;
  const win = window as any;

  // 1. Try Tauri v2 direct IPC via injected __TAURI_INTERNALS__ or core.invoke
  const invokeV2 = win.__TAURI_INTERNALS__?.invoke || win.__TAURI__?.core?.invoke;
  if (typeof invokeV2 === "function") {
    try {
      return await invokeV2(`plugin:window|${v2Cmd}`, v2Args || {});
    } catch {
      // Fallback to secondary invoke mechanisms
    }
  }

  // 2. Try Tauri v1 / generic invoke
  const invokeV1 = win.__TAURI__?.invoke || win.__TAURI_INVOKE__;
  if (typeof invokeV1 === "function") {
    try {
      if (v1CmdType) {
        return await invokeV1("tauri", {
          __tauriModule: "Window",
          message: {
            cmd: "manage",
            data: {
              cmd: {
                type: v1CmdType,
                ...(v1Data !== undefined ? { data: v1Data } : {}),
              },
            },
          },
        });
      }
      return await invokeV1(v2Cmd, v2Args);
    } catch {
      // Fallback
    }
  }

  return undefined;
}

/**
 * Helper to send Electron IPC messages if running in an Electron shell.
 */
function sendElectronMessage(channel: string, ...args: any[]): boolean {
  if (typeof window === "undefined") return false;
  const win = window as any;

  try {
    if (win.electronAPI && typeof win.electronAPI[channel] === "function") {
      win.electronAPI[channel](...args);
      return true;
    }
    if (win.electron?.ipcRenderer?.send) {
      win.electron.ipcRenderer.send(channel, ...args);
      return true;
    }
    if (win.ipcRenderer?.send) {
      win.ipcRenderer.send(channel, ...args);
      return true;
    }
    if (typeof win.require === "function") {
      const electron = win.require("electron");
      if (electron?.ipcRenderer?.send) {
        electron.ipcRenderer.send(channel, ...args);
        return true;
      }
    }
  } catch {
    // Ignored
  }
  return false;
}

/**
 * SolidJS reactive primitive for controlling and observing desktop window states.
 * Supports Tauri v2, Tauri v1, Electron, and browser preview environments.
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
    const win = window as any;
    try {
      if (win.__TAURI__?.window?.getCurrentWindow) {
        return win.__TAURI__.window.getCurrentWindow();
      }
      if (win.__TAURI__?.window?.appWindow) {
        return win.__TAURI__.window.appWindow;
      }
      if (win.__TAURI_WINDOW__?.getCurrentWindow) {
        return win.__TAURI_WINDOW__.getCurrentWindow();
      }
      if (win.__TAURI_WINDOW__?.appWindow) {
        return win.__TAURI_WINDOW__.appWindow;
      }
      // Dynamic import if bundled by user's build setup
      const moduleName = "@tauri-apps/api/window";
      // @ts-ignore - Optional runtime dependency in Tauri apps
      const tauriApi = await import(/* @vite-ignore */ moduleName).catch(() => null);
      if (tauriApi?.getCurrentWindow) {
        return tauriApi.getCurrentWindow();
      }
      if (tauriApi?.appWindow) {
        return tauriApi.appWindow;
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
          typeof tauriWin.isMaximized === "function" ? tauriWin.isMaximized() : false,
          typeof tauriWin.isMinimized === "function" ? tauriWin.isMinimized() : false,
          typeof tauriWin.isFullscreen === "function" ? tauriWin.isFullscreen() : false,
          typeof tauriWin.isFocused === "function" ? tauriWin.isFocused() : true,
        ]);
        setIsMaximized(Boolean(max));
        setIsMinimized(Boolean(min));
        setIsFullscreen(Boolean(full));
        setIsFocused(Boolean(foc));
        return;
      } catch {
        // Fallback gracefully
      }
    }

    if (isTauriEnvironment()) {
      setIsTauri(true);
      try {
        const max = await invokeTauri("is_maximized", {}, "isMaximized");
        if (typeof max === "boolean") setIsMaximized(max);
        const min = await invokeTauri("is_minimized", {}, "isMinimized");
        if (typeof min === "boolean") setIsMinimized(min);
        const full = await invokeTauri("is_fullscreen", {}, "isFullscreen");
        if (typeof full === "boolean") setIsFullscreen(full);
        const foc = await invokeTauri("is_focused", {}, "isFocused");
        if (typeof foc === "boolean") setIsFocused(foc);
        return;
      } catch {
        // Fallback
      }
    }

    if (!isElectronEnvironment()) {
      setIsTauri(false);
    }
    if (typeof document !== "undefined") {
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
      const handleResize = () => {
        updateWindowStates();
      };

      window.addEventListener("focus", handleWindowFocus);
      window.addEventListener("blur", handleWindowBlur);
      window.addEventListener("resize", handleResize);
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
        window.removeEventListener("resize", handleResize);
        document.removeEventListener("fullscreenchange", handleFullscreenChange);
        if (unlistenResize) unlistenResize();
        if (unlistenFocus) unlistenFocus();
      });
    }
  });

  const minimize = async (): Promise<void> => {
    let executed = false;
    const tauriWin = await getTauriWindow();
    if (tauriWin?.minimize) {
      try {
        await tauriWin.minimize();
        executed = true;
      } catch {}
    }
    if (!executed && isTauriEnvironment()) {
      try {
        await invokeTauri("minimize", {}, "minimize");
        executed = true;
      } catch {}
    }
    if (!executed && isElectronEnvironment()) {
      executed =
        sendElectronMessage("window-minimize") ||
        sendElectronMessage("minimize") ||
        sendElectronMessage("windowMinimize");
    }

    setIsMinimized(true);
    setIsMaximized(false);
  };

  const maximize = async (): Promise<void> => {
    let executed = false;
    const tauriWin = await getTauriWindow();
    if (tauriWin?.maximize) {
      try {
        await tauriWin.maximize();
        executed = true;
      } catch {}
    }
    if (!executed && isTauriEnvironment()) {
      try {
        await invokeTauri("maximize", {}, "maximize");
        executed = true;
      } catch {}
    }
    if (!executed && isElectronEnvironment()) {
      executed =
        sendElectronMessage("window-maximize") ||
        sendElectronMessage("maximize") ||
        sendElectronMessage("windowMaximize");
    }

    setIsMaximized(true);
    setIsMinimized(false);
  };

  const unmaximize = async (): Promise<void> => {
    let executed = false;
    const tauriWin = await getTauriWindow();
    if (tauriWin?.unmaximize) {
      try {
        await tauriWin.unmaximize();
        executed = true;
      } catch {}
    }
    if (!executed && isTauriEnvironment()) {
      try {
        await invokeTauri("unmaximize", {}, "unmaximize");
        executed = true;
      } catch {}
    }
    if (!executed && isElectronEnvironment()) {
      executed =
        sendElectronMessage("window-unmaximize") ||
        sendElectronMessage("unmaximize") ||
        sendElectronMessage("windowRestore") ||
        sendElectronMessage("restore");
    }

    setIsMaximized(false);
  };

  const toggleMaximize = async (): Promise<void> => {
    let executed = false;
    const tauriWin = await getTauriWindow();
    if (tauriWin?.toggleMaximize) {
      try {
        await tauriWin.toggleMaximize();
        executed = true;
      } catch {}
    } else if (tauriWin?.isMaximized && tauriWin?.unmaximize && tauriWin?.maximize) {
      try {
        const isMax = await tauriWin.isMaximized();
        if (isMax) {
          await tauriWin.unmaximize();
        } else {
          await tauriWin.maximize();
        }
        executed = true;
      } catch {}
    }

    if (!executed && isTauriEnvironment()) {
      try {
        await invokeTauri("toggle_maximize", {}, "toggleMaximize");
        executed = true;
      } catch {}
    }

    if (!executed && isElectronEnvironment()) {
      executed =
        sendElectronMessage("window-toggle-maximize") ||
        sendElectronMessage("toggle-maximize") ||
        sendElectronMessage("toggleMaximize");
    }

    setIsMaximized((prev) => !prev);
    setIsMinimized(false);
  };

  const close = async (): Promise<void> => {
    let closed = false;
    const win = typeof window !== "undefined" ? (window as any) : null;
    const tauriWin = await getTauriWindow();

    // 1. Try Tauri Window API close
    if (tauriWin?.close) {
      try {
        await tauriWin.close();
        closed = true;
      } catch {}
    }

    // 2. Try Tauri IPC window close
    if (!closed && isTauriEnvironment()) {
      try {
        await invokeTauri("close", {}, "close");
        closed = true;
      } catch {}
    }

    // 3. Try Tauri destroy fallback if close did not succeed
    if (!closed && tauriWin?.destroy) {
      try {
        await tauriWin.destroy();
        closed = true;
      } catch {}
    }
    if (!closed && isTauriEnvironment()) {
      try {
        await invokeTauri("destroy", {}, "destroy");
        closed = true;
      } catch {}
    }

    // 4. Try Tauri process exit if in Tauri environment
    if (!closed && isTauriEnvironment()) {
      try {
        const invokeProcess = win?.__TAURI_INTERNALS__?.invoke || win?.__TAURI__?.core?.invoke;
        if (typeof invokeProcess === "function") {
          await invokeProcess("plugin:process|exit", { code: 0 });
          closed = true;
        } else if (win?.__TAURI__?.process?.exit) {
          await win.__TAURI__.process.exit(0);
          closed = true;
        }
      } catch {}
    }

    // 5. Try Electron window close / app quit
    if (!closed && isElectronEnvironment()) {
      closed =
        sendElectronMessage("window-close") ||
        sendElectronMessage("close") ||
        sendElectronMessage("app-close") ||
        sendElectronMessage("quit");
    }

    // 6. Browser fallback & custom event dispatch
    if (typeof window !== "undefined") {
      try {
        window.dispatchEvent(new CustomEvent("nikala:window-close"));
      } catch {}

      try {
        window.close();
      } catch {}
    }
  };

  const destroy = async (): Promise<void> => {
    const tauriWin = await getTauriWindow();
    if (tauriWin?.destroy) {
      try {
        await tauriWin.destroy();
        return;
      } catch {}
    }
    if (isTauriEnvironment()) {
      try {
        await invokeTauri("destroy", {}, "destroy");
        return;
      } catch {}
    }
    await close();
  };

  const setFullscreen = async (fullscreen: boolean): Promise<void> => {
    let executed = false;
    const tauriWin = await getTauriWindow();
    if (tauriWin?.setFullscreen) {
      try {
        await tauriWin.setFullscreen(fullscreen);
        executed = true;
      } catch {}
    }
    if (!executed && isTauriEnvironment()) {
      try {
        await invokeTauri("set_fullscreen", { value: fullscreen }, "setFullscreen", fullscreen);
        executed = true;
      } catch {}
    }
    if (!executed && isElectronEnvironment()) {
      executed =
        sendElectronMessage("window-set-fullscreen", fullscreen) ||
        sendElectronMessage("set-fullscreen", fullscreen);
    }

    if (typeof document !== "undefined") {
      if (fullscreen && document.documentElement.requestFullscreen) {
        try {
          await document.documentElement.requestFullscreen();
        } catch {}
      } else if (!fullscreen && document.fullscreenElement && document.exitFullscreen) {
        try {
          await document.exitFullscreen();
        } catch {}
      }
    }

    setIsFullscreen(fullscreen);
  };

  const startDragging = async (e?: MouseEvent): Promise<void> => {
    if (e && e.button !== 0) return; // Only primary mouse button starts drag
    let dragged = false;
    const tauriWin = await getTauriWindow();
    if (tauriWin?.startDragging) {
      try {
        await tauriWin.startDragging();
        dragged = true;
      } catch {}
    }
    if (!dragged && isTauriEnvironment()) {
      try {
        await invokeTauri("start_dragging", {}, "startDragging");
        dragged = true;
      } catch {}
    }
    if (!dragged && isElectronEnvironment()) {
      sendElectronMessage("window-drag");
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
    destroy,
    setFullscreen,
    startDragging,
  };
}
