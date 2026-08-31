import { createSignal, onMount, type Accessor } from "solid-js";
import { isTauriEnvironment } from "./create-tauri-window";

export type UpdaterStatus =
  | "idle"
  | "checking"
  | "available"
  | "up-to-date"
  | "downloading"
  | "downloaded"
  | "error";

export interface UpdateManifestInfo {
  version: string;
  currentVersion?: string;
  date?: string;
  body?: string;
}

export interface UpdateProgressInfo {
  downloaded: number;
  total: number;
  percentage: number;
}

export interface CreateAppUpdaterOptions {
  /** Automatically check for updates on mount. Defaults to false. */
  autoCheck?: boolean;
  /** Current application version fallback if not detected. */
  currentVersion?: string;
  /** Callback fired when an update is available. */
  onUpdateAvailable?: (info: UpdateManifestInfo) => void;
  /** Callback fired when download finishes. */
  onDownloadFinished?: () => void;
  /** Callback fired on update check or download error. */
  onError?: (error: Error | string) => void;
}

export interface CreateAppUpdaterReturn {
  /** Current lifecycle status of the updater. */
  status: Accessor<UpdaterStatus>;
  /** Update metadata (new version, release notes, release date). */
  updateInfo: Accessor<UpdateManifestInfo | null>;
  /** Download progress (bytes downloaded, total bytes, percentage). */
  progress: Accessor<UpdateProgressInfo>;
  /** Error message if an operation failed. */
  error: Accessor<string | null>;
  /** Whether an update is currently being checked or downloaded. */
  isLoading: Accessor<boolean>;
  /** Check update endpoint for a new release. */
  checkForUpdates: () => Promise<boolean>;
  /** Download and install the available update. */
  downloadAndInstall: () => Promise<void>;
  /** Restart application to apply the downloaded update. */
  relaunch: () => Promise<void>;
  /** Dismiss current update prompt or clear error state. */
  dismiss: () => void;
  /** Simulate an update cycle in web / playground preview environments. */
  simulateUpdate: (mockInfo?: Partial<UpdateManifestInfo>) => void;
}

/**
 * SolidJS reactive primitive for controlling and observing Tauri v2 application updates.
 * Integrates with @tauri-apps/plugin-updater with full web simulation support.
 */
export function createAppUpdater(
  options: CreateAppUpdaterOptions = {}
): CreateAppUpdaterReturn {
  const [status, setStatus] = createSignal<UpdaterStatus>("idle");
  const [updateInfo, setUpdateInfo] = createSignal<UpdateManifestInfo | null>(null);
  const [progress, setProgress] = createSignal<UpdateProgressInfo>({
    downloaded: 0,
    total: 0,
    percentage: 0,
  });
  const [error, setError] = createSignal<string | null>(null);

  let activeTauriUpdate: any = null;
  let simulatedTimer: any = null;

  const getTauriUpdaterPlugin = async () => {
    if (typeof window === "undefined") return null;
    try {
      if ((window as any).__TAURI__?.updater) {
        return (window as any).__TAURI__.updater;
      }
      const moduleName = "@tauri-apps/plugin-updater";
      // @ts-ignore - Optional runtime dependency in Tauri apps
      const plugin = await import(/* @vite-ignore */ moduleName).catch(() => null);
      return plugin;
    } catch {
      return null;
    }
  };

  const getTauriProcessPlugin = async () => {
    if (typeof window === "undefined") return null;
    try {
      if ((window as any).__TAURI__?.process) {
        return (window as any).__TAURI__.process;
      }
      const moduleName = "@tauri-apps/plugin-process";
      // @ts-ignore - Optional runtime dependency in Tauri apps
      const plugin = await import(/* @vite-ignore */ moduleName).catch(() => null);
      return plugin;
    } catch {
      return null;
    }
  };

  const checkForUpdates = async (): Promise<boolean> => {
    setStatus("checking");
    setError(null);

    if (isTauriEnvironment()) {
      try {
        const updaterPlugin = await getTauriUpdaterPlugin();
        if (updaterPlugin?.check) {
          const update = await updaterPlugin.check();
          if (update?.available) {
            activeTauriUpdate = update;
            const info: UpdateManifestInfo = {
              version: update.version,
              currentVersion: update.currentVersion || options.currentVersion || "v1.0.0",
              date: update.date,
              body: update.body || "Bug fixes and performance enhancements.",
            };
            setUpdateInfo(info);
            setStatus("available");
            options.onUpdateAvailable?.(info);
            return true;
          } else {
            setStatus("up-to-date");
            return false;
          }
        }
      } catch (err: any) {
        const errMsg = err?.message || String(err);
        setError(errMsg);
        setStatus("error");
        options.onError?.(errMsg);
        return false;
      }
    }

    // In web preview / non-tauri mode, simulate checking
    await new Promise((resolve) => setTimeout(resolve, 800));
    setStatus("up-to-date");
    return false;
  };

  const downloadAndInstall = async (): Promise<void> => {
    if (status() !== "available" && status() !== "error") return;
    setStatus("downloading");
    setError(null);
    setProgress({ downloaded: 0, total: 100, percentage: 0 });

    if (isTauriEnvironment() && activeTauriUpdate?.downloadAndInstall) {
      try {
        let downloadedBytes = 0;
        let contentLength = 0;

        await activeTauriUpdate.downloadAndInstall((event: any) => {
          if (event.event === "Started") {
            contentLength = event.data?.contentLength || 100;
          } else if (event.event === "Progress") {
            downloadedBytes += event.data?.chunkLength || 0;
            const pct = contentLength > 0 ? Math.min(100, Math.round((downloadedBytes / contentLength) * 100)) : 50;
            setProgress({
              downloaded: downloadedBytes,
              total: contentLength,
              percentage: pct,
            });
          } else if (event.event === "Finished") {
            setProgress({
              downloaded: contentLength,
              total: contentLength,
              percentage: 100,
            });
          }
        });

        setStatus("downloaded");
        options.onDownloadFinished?.();
        return;
      } catch (err: any) {
        const errMsg = err?.message || String(err);
        setError(errMsg);
        setStatus("error");
        options.onError?.(errMsg);
        return;
      }
    }

    // Web simulation mode with smooth progress step
    let currentPct = 0;
    simulatedTimer = setInterval(() => {
      currentPct += 15;
      if (currentPct >= 100) {
        clearInterval(simulatedTimer);
        setProgress({ downloaded: 45.8 * 1024 * 1024, total: 45.8 * 1024 * 1024, percentage: 100 });
        setStatus("downloaded");
        options.onDownloadFinished?.();
      } else {
        const downloaded = (45.8 * 1024 * 1024 * currentPct) / 100;
        setProgress({ downloaded, total: 45.8 * 1024 * 1024, percentage: currentPct });
      }
    }, 250);
  };

  const relaunch = async (): Promise<void> => {
    if (isTauriEnvironment()) {
      try {
        const processPlugin = await getTauriProcessPlugin();
        if (processPlugin?.relaunch) {
          await processPlugin.relaunch();
          return;
        }
      } catch {
        // Fallback
      }
    }

    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  const dismiss = (): void => {
    if (simulatedTimer) clearInterval(simulatedTimer);
    setStatus("idle");
    setError(null);
  };

  const simulateUpdate = (mockInfo?: Partial<UpdateManifestInfo>): void => {
    if (simulatedTimer) clearInterval(simulatedTimer);
    const info: UpdateManifestInfo = {
      version: mockInfo?.version || "v1.2.0",
      currentVersion: mockInfo?.currentVersion || options.currentVersion || "v1.0.0",
      date: mockInfo?.date || new Date().toISOString().split("T")[0],
      body:
        mockInfo?.body ||
        "### What's New in v1.2.0\n- Added native Window Titlebar tabs\n- Enhanced Tauri v2 capability security\n- Optimized SolidJS signal reactivity\n- Fixed titlebar drag region jitter on Linux",
    };
    setUpdateInfo(info);
    setStatus("available");
    setError(null);
    setProgress({ downloaded: 0, total: 100, percentage: 0 });
    options.onUpdateAvailable?.(info);
  };

  onMount(() => {
    if (options.autoCheck) {
      checkForUpdates();
    }
  });

  const isLoading = () => status() === "checking" || status() === "downloading";

  return {
    status,
    updateInfo,
    progress,
    error,
    isLoading,
    checkForUpdates,
    downloadAndInstall,
    relaunch,
    dismiss,
    simulateUpdate,
  };
}
