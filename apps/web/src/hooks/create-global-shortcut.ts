import { onMount, onCleanup } from "solid-js";
import { isTauriEnvironment } from "./create-tauri-window";

export interface CreateGlobalShortcutOptions {
  /** Shortcut key combination, e.g. 'CommandOrControl+Shift+P' or 'Alt+Space'. */
  shortcut: string | string[];
  /** Handler invoked when global shortcut is triggered. */
  onTrigger: (shortcut: string) => void;
  /** Automatically register shortcut on mount. Defaults to true. */
  autoRegister?: boolean;
}

export interface CreateGlobalShortcutReturn {
  /** Register the configured global shortcut with Tauri / Browser. */
  register: () => Promise<boolean>;
  /** Unregister the shortcut. */
  unregister: () => Promise<void>;
  /** Indicates whether the shortcut is currently registered. */
  isRegistered: () => boolean;
}

/**
 * SolidJS reactive primitive for registering native OS global hotkeys via Tauri v2 global shortcut plugin,
 * with automatic fallback to browser DOM keyboard listeners.
 */
export function createGlobalShortcut(
  options: CreateGlobalShortcutOptions
): CreateGlobalShortcutReturn {
  let registered = false;
  const shortcuts = Array.isArray(options.shortcut) ? options.shortcut : [options.shortcut];

  const getTauriShortcutPlugin = async () => {
    if (typeof window === "undefined") return null;
    try {
      if ((window as any).__TAURI__?.globalShortcut) {
        return (window as any).__TAURI__.globalShortcut;
      }
      // Variable prevents Vite dev server from static module resolution
      const moduleName = "@tauri-apps/plugin-global-shortcut";
      // @ts-ignore - Optional runtime dependency in Tauri apps
      const plugin = await import(/* @vite-ignore */ moduleName).catch(() => null);
      return plugin;
    } catch {
      return null;
    }
  };

  const normalizeKey = (k: string) => {
    const key = k.toLowerCase().trim();
    if (key === " " || key === "space" || key === "spacebar") return "space";
    if (key === "esc" || key === "escape") return "escape";
    if (key === "return" || key === "enter") return "enter";
    return key;
  };

  const handleBrowserKeydown = (e: KeyboardEvent) => {
    const eventKey = normalizeKey(e.key);
    const eventCode = normalizeKey(e.code.replace(/^Key|^Digit/, ""));

    for (const keyCombo of shortcuts) {
      const parts = keyCombo.toLowerCase().split("+");
      const hasCtrlOrCmd = parts.includes("commandorcontrol") || parts.includes("ctrl") || parts.includes("cmd");
      const hasShift = parts.includes("shift");
      const hasAlt = parts.includes("alt");
      const mainKey = parts.find((p) => !["commandorcontrol", "ctrl", "cmd", "shift", "alt"].includes(p));

      const ctrlMatch = hasCtrlOrCmd ? e.ctrlKey || e.metaKey : !e.ctrlKey && !e.metaKey;
      const shiftMatch = hasShift ? e.shiftKey : !e.shiftKey;
      const altMatch = hasAlt ? e.altKey : !e.altKey;
      const keyMatch = mainKey
        ? eventKey === normalizeKey(mainKey) || eventCode === normalizeKey(mainKey)
        : false;

      if (ctrlMatch && shiftMatch && altMatch && keyMatch) {
        e.preventDefault();
        options.onTrigger(keyCombo);
        break;
      }
    }
  };

  const register = async (): Promise<boolean> => {
    if (typeof window === "undefined") return false;

    if (isTauriEnvironment()) {
      const plugin = await getTauriShortcutPlugin();
      if (plugin?.register) {
        try {
          for (const s of shortcuts) {
            await plugin.register(s, () => options.onTrigger(s));
          }
          registered = true;
          return true;
        } catch {
          // Fallback to web listener
        }
      }
    }

    window.addEventListener("keydown", handleBrowserKeydown);
    registered = true;
    return true;
  };

  const unregister = async (): Promise<void> => {
    if (typeof window === "undefined") return;

    if (isTauriEnvironment()) {
      const plugin = await getTauriShortcutPlugin();
      if (plugin?.unregister) {
        try {
          for (const s of shortcuts) {
            await plugin.unregister(s);
          }
        } catch {
          // Handled
        }
      }
    }

    window.removeEventListener("keydown", handleBrowserKeydown);
    registered = false;
  };

  onMount(() => {
    if (options.autoRegister !== false) {
      register();
    }
  });

  onCleanup(() => {
    unregister();
  });

  return {
    register,
    unregister,
    isRegistered: () => registered,
  };
}
