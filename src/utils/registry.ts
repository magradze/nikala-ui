import fs from "fs-extra";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { RegistryIndex, RegistryItem } from "../registry/index.js";

/** Official remote registry CDN URL hosted on GitHub main branch */
export const OFFICIAL_REGISTRY_URL =
  "https://raw.githubusercontent.com/magradze/nikala-ui/main/registry";

/**
 * Resolves the absolute path to the local fallback registry directory inside the Nikala UI package.
 */
function getLocalRegistryDirectory(): string {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  return path.resolve(__dirname, "../../registry");
}

/**
 * Reads and parses the central registry index manifest.
 * Attempts remote fetch from GitHub Raw CDN first, falling back to local package files if offline.
 *
 * @returns The list of available registry items or null if not found.
 */
export async function getRegistryIndex(): Promise<RegistryIndex | null> {
  // 1. Attempt fetching online manifest from GitHub Raw CDN
  try {
    const response = await fetch(`${OFFICIAL_REGISTRY_URL}/index.json`);
    if (response.ok) {
      const data = (await response.json()) as RegistryIndex;
      if (Array.isArray(data)) return data;
    }
  } catch {
  // Fallback to local files if offline or network error occurs
  }

  // 2. Local package fallback
  const localDir = getLocalRegistryDirectory();
  const indexPath = path.join(localDir, "index.json");

  if (await fs.pathExists(indexPath)) {
    try {
      const content = await fs.readFile(indexPath, "utf-8");
      return JSON.parse(content) as RegistryIndex;
    } catch {
      return null;
    }
  }

  return null;
}

/**
 * Fetches a component manifest from a remote HTTP(S) URL.
 */
export async function fetchRemoteRegistryItem(url: string): Promise<RegistryItem | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;

    const data = (await response.json()) as RegistryItem;
    if (!data.name || !data.files || !Array.isArray(data.files)) return null;

    return data;
  } catch {
    return null;
  }
}

/**
 * Fetches the manifest for a component by name or remote URL.
 * Checks official remote GitHub registry first, then falls back to local package manifest if offline.
 *
 * @param nameOrUrl - Component identifier or full HTTP(S) URL
 */
export async function getRegistryItem(nameOrUrl: string): Promise<RegistryItem | null> {
  if (nameOrUrl.startsWith("http://") || nameOrUrl.startsWith("https://")) {
    return fetchRemoteRegistryItem(nameOrUrl);
  }

  // 1. Attempt fetching online component manifest from official GitHub CDN
  const remoteUrl = `${OFFICIAL_REGISTRY_URL}/${nameOrUrl}.json`;
  const remoteItem = await fetchRemoteRegistryItem(remoteUrl);
  if (remoteItem) return remoteItem;

  // 2. Fallback to local package files if offline or unreleased
  const localDir = getLocalRegistryDirectory();
  const itemPath = path.join(localDir, `${nameOrUrl}.json`);

  if (await fs.pathExists(itemPath)) {
    try {
      const content = await fs.readFile(itemPath, "utf-8");
      return JSON.parse(content) as RegistryItem;
    } catch {
      return null;
    }
  }

  return null;
}

/**
 * Recursively resolves all required internal registry dependencies for a set of component names or URLs.
 */
export async function resolveRegistryDependencies(namesOrUrls: string[]): Promise<string[]> {
  const resolved = new Set<string>();
  const queue = [...namesOrUrls];

  while (queue.length > 0) {
    const current = queue.shift();
    if (!current || resolved.has(current)) continue;

    const item = await getRegistryItem(current);
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