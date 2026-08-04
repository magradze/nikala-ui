export interface RegistryIndexItem {
  name: string;
  title: string;
  description: string;
  type: "registry:ui" | "registry:util" | "registry:hook";
  dependencies?: string[];
  registryDependencies?: string[];
}

export interface RegistryFile {
  path: string;
  content: string;
  type: "registry:ui" | "registry:util" | "registry:hook";
}

export interface RegistryItem {
  name: string;
  title: string;
  description: string;
  type: "registry:ui" | "registry:util" | "registry:hook";
  dependencies?: string[];
  registryDependencies?: string[];
  files: RegistryFile[];
}

export const OFFICIAL_REGISTRY_URL =
  "https://raw.githubusercontent.com/nikala-ui/ui/main/packages/core/registry";

export async function fetchRegistryIndex(): Promise<RegistryIndexItem[]> {
  try {
    const cacheBuster = Date.now();
    const res = await fetch(`${OFFICIAL_REGISTRY_URL}/index.json?t=${cacheBuster}`);
    if (res.ok) {
      return (await res.json()) as RegistryIndexItem[];
    }
  } catch (err) {
    console.error("[Nikala MCP] Failed to fetch registry index:", err);
  }
  return [];
}

export async function fetchRegistryItem(name: string): Promise<RegistryItem | null> {
  try {
    const cacheBuster = Date.now();
    const res = await fetch(`${OFFICIAL_REGISTRY_URL}/${name}.json?t=${cacheBuster}`);
    if (res.ok) {
      return (await res.json()) as RegistryItem;
    }
  } catch (err) {
    console.error(`[Nikala MCP] Failed to fetch registry item ${name}:`, err);
  }
  return null;
}
