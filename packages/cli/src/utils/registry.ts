import fs from "fs-extra";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { RegistryIndex, RegistryItem } from "../types/registry.js";

/** Official remote registry CDN URL hosted on GitHub main branch */
export const OFFICIAL_REGISTRY_URL =
  "https://raw.githubusercontent.com/nikala-ui/ui/main/packages/core/registry";

/**
 * Resolves the absolute path to the local fallback registry directory inside the Nikala UI package.
 */
function getLocalRegistryDirectory(): string {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // 1. Monorepo development path (packages/core/registry)
  const monorepoCorePath = path.resolve(__dirname, "../../../core/registry");
  if (fs.existsSync(monorepoCorePath)) {
    return monorepoCorePath;
  }

  return path.resolve(__dirname, "../../registry");
}

/**
 * Reads and parses the central registry index manifest.
 * Prioritizes local monorepo registry during development, and falls back to remote CDN for end-users.
 *
 * @param customRegistryUrl - Optional custom registry base URL to fetch index from
 * @returns The list of available registry items or null if not found.
 */
export async function getRegistryIndex(customRegistryUrl?: string): Promise<RegistryIndex | null> {
  const baseUrl = customRegistryUrl || OFFICIAL_REGISTRY_URL;

  // 1. Prioritize local monorepo registry if present
  if (!customRegistryUrl) {
    const localDir = getLocalRegistryDirectory();
    const indexPath = path.join(localDir, "index.json");

    if (await fs.pathExists(indexPath)) {
      try {
        const content = await fs.readFile(indexPath, "utf-8");
        return JSON.parse(content) as RegistryIndex;
      } catch {
        // Fallback to online CDN
      }
    }
  }

  // 2. Fetch online manifest from remote CDN with cache-busting
  try {
    const cacheBuster = Date.now();
    const response = await fetch(`${baseUrl}/index.json?t=${cacheBuster}`, {
      headers: { "Cache-Control": "no-cache, no-store" },
    });
    if (response.ok) {
      const data = (await response.json()) as RegistryIndex;
      if (Array.isArray(data)) return data;
    }
  } catch {
    // Fallback to local files if offline or network error occurs
  }

  return null;
}

/**
 * Fetches a component manifest from a remote HTTP(S) URL with cache-busting.
 */
export async function fetchRemoteRegistryItem(url: string): Promise<RegistryItem | null> {
  try {
    const cacheBuster = Date.now();
    const fetchUrl = url.includes("?") ? `${url}&t=${cacheBuster}` : `${url}?t=${cacheBuster}`;
    const response = await fetch(fetchUrl, {
      headers: { "Cache-Control": "no-cache, no-store" },
    });
    if (!response.ok) return null;

    const data = (await response.json()) as RegistryItem;
    if (!data.name || !data.files || !Array.isArray(data.files)) return null;

    return data;
  } catch {
    return null;
  }
}

/**
 * Fetches the manifest for a component by name, namespace, or remote URL.
 * Checks local package manifest first (for monorepo dev & offline), then custom registries from config, and finally official remote GitHub CDN.
 *
 * @param nameOrUrl - Component identifier (e.g. "button", "@acme/hero-01", "https://...")
 * @param customRegistries - Optional dictionary of custom namespace registries from nikala.config.json
 */
export async function getRegistryItem(
  nameOrUrl: string,
  customRegistries?: Record<string, string>
): Promise<RegistryItem | null> {
  // 1. Direct HTTP(S) URL
  if (nameOrUrl.startsWith("http://") || nameOrUrl.startsWith("https://")) {
    return fetchRemoteRegistryItem(nameOrUrl);
  }

  // 2. Custom 3rd-party namespace registry (e.g. "@acme/hero-01")
  if (nameOrUrl.startsWith("@") && nameOrUrl.includes("/")) {
    const [namespace, ...rest] = nameOrUrl.split("/");
    const itemName = rest.join("/");
    const registryBaseUrl = customRegistries?.[namespace];

    if (registryBaseUrl) {
      const cleanBase = registryBaseUrl.replace(/\/$/, "");
      const remoteUrl = `${cleanBase}/${itemName}.json`;
      return fetchRemoteRegistryItem(remoteUrl);
    }
  }

  // 3. Local package / Monorepo registry file
  const localDir = getLocalRegistryDirectory();
  const itemPath = path.join(localDir, `${nameOrUrl}.json`);

  if (await fs.pathExists(itemPath)) {
    try {
      const content = await fs.readFile(itemPath, "utf-8");
      return JSON.parse(content) as RegistryItem;
    } catch {
      // Fallback to online CDN
    }
  }

  // 4. Official GitHub CDN registry
  const remoteUrl = `${OFFICIAL_REGISTRY_URL}/${nameOrUrl}.json`;
  return fetchRemoteRegistryItem(remoteUrl);
}

/**
 * Recursively resolves all required internal registry dependencies for a set of component names or URLs.
 */
export async function resolveRegistryDependencies(
  namesOrUrls: string[],
  customRegistries?: Record<string, string>
): Promise<string[]> {
  const resolved = new Set<string>();
  const queue = [...namesOrUrls];

  while (queue.length > 0) {
    const current = queue.shift();
    if (!current || resolved.has(current)) continue;

    const item = await getRegistryItem(current, customRegistries);
    if (!item) continue;

    resolved.add(current);

    if (item.registryDependencies && item.registryDependencies.length > 0) {
      for (const dep of item.registryDependencies) {
        if (!resolved.has(dep)) {
          queue.push(dep);
        }
      }
    }
  }

  return Array.from(resolved);
}