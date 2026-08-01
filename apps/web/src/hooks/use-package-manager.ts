import { createSignal, onMount } from "solid-js";

export type PackageManager = "bunx" | "npx" | "pnpm" | "yarn";

const STORAGE_KEY = "nikala-pm-runner";

/* Default strictly to "bunx" initially for 100% SSR hydration parity */
export const [activePm, setActivePmSignal] = createSignal<PackageManager>("bunx");

let isStorageSynced = false;

/**
 * Setter for updating active package manager runner and persisting choice to localStorage.
 */
export const setPm = (pm: PackageManager) => {
  setActivePmSignal(pm);
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, pm);
    } catch (e) {
      /* Fallback for restricted storage environments */
    }
  }
};

/**
 * Safely reads saved preference from localStorage once post-hydration.
 */
export const syncPmFromStorage = () => {
  if (isStorageSynced || typeof window === "undefined") return;
  isStorageSynced = true;
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as PackageManager;
    if (saved === "bunx" || saved === "npx" || saved === "pnpm" || saved === "yarn") {
      setActivePmSignal(saved);
    }
  } catch (e) {
    /* Fallback for restricted storage environments */
  }
};

/**
 * Returns package manager CLI runner prefix string.
 */
export function getRunnerPrefix(pm: PackageManager = activePm()): string {
  switch (pm) {
    case "npx":
      return "npx @nikala-ui/cli";
    case "pnpm":
      return "pnpm dlx @nikala-ui/cli";
    case "yarn":
      return "yarn dlx @nikala-ui/cli";
    default:
      return "bunx @nikala-ui/cli";
  }
}

/**
 * Formats full CLI command with active package manager runner prefix.
 */
export function formatCommand(args: string, pm: PackageManager = activePm()): string {
  return `${getRunnerPrefix(pm)} ${args}`;
}

/**
 * Custom hook providing reactive package manager state and CLI formatting utilities.
 */
export function usePackageManager() {
  onMount(() => {
    syncPmFromStorage();
  });

  return {
    activePm,
    setPm,
    getRunnerPrefix,
    formatCommand,
  };
}