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
 * Transforms any CLI command (runner, create, or add) to match the selected package manager.
 */
export function transformCommandForPm(command: string, pm: PackageManager = activePm()): string {
  const trimmed = command.trim();

  // 1. "bun create" / "npm create" / "pnpm create" / "yarn create"
  const createMatch = trimmed.match(/^(bun|npm|npx|pnpm|yarn)\s+create\s+(.*)$/);
  if (createMatch) {
    const args = createMatch[2];
    const basePm = pm === "bunx" ? "bun" : pm === "npx" ? "npm" : pm === "pnpm" ? "pnpm" : "yarn";
    return `${basePm} create ${args}`;
  }

  // 2. "bun add" / "npm install" / "pnpm add" / "yarn add"
  const addMatch = trimmed.match(/^(bun\s+add|npm\s+i|npm\s+install|pnpm\s+add|yarn\s+add)\s+(.*)$/);
  if (addMatch) {
    const args = addMatch[2];
    switch (pm) {
      case "npx":
        return `npm i ${args}`;
      case "pnpm":
        return `pnpm add ${args}`;
      case "yarn":
        return `yarn add ${args}`;
      default:
        return `bun add ${args}`;
    }
  }

  // 3. CLI runner: bunx <pkg> / npx <pkg> / pnpm dlx <pkg> / yarn dlx <pkg>
  const runnerMatch = trimmed.match(/^(bunx|npx|pnpm\s+dlx|yarn\s+dlx)\s+([^\s]+)\s*(.*)$/);
  if (runnerMatch) {
    const pkg = runnerMatch[2];
    const args = runnerMatch[3];
    const prefix =
      pm === "npx"
        ? `npx ${pkg}`
        : pm === "pnpm"
        ? `pnpm dlx ${pkg}`
        : pm === "yarn"
        ? `yarn dlx ${pkg}`
        : `bunx ${pkg}`;
    return `${prefix}${args ? " " + args : ""}`;
  }

  return trimmed;
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
    transformCommandForPm,
  };
}