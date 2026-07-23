import fs from "fs-extra";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { RegistryIndex, RegistryItem } from "../registry/index.js";

/**
 * Resolves the absolute path to the local registry directory inside the Nikala UI package.
 * Uses `import.meta.url` to ensure correct resolution even when linked via `bun link`.
 */
function getRegistryDirectory(): string {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  return path.resolve(__dirname, "../../registry");
}

/**
 * Reads and parses the central registry index manifest (registry/index.json).
 *
 * @returns The list of available registry items or null if not found.
 */
export async function getRegistryIndex(): Promise<RegistryIndex | null> {
  const registryDir = getRegistryDirectory();
  const indexPath = path.join(registryDir, "index.json");

  if (!(await fs.pathExists(indexPath))) {
    return null;
  }

  try {
    const content = await fs.readFile(indexPath, "utf-8");
    return JSON.parse(content) as RegistryIndex;
  } catch (error) {
    console.error("Failed to parse registry index:", error);
    return null;
  }
}

/**
 * Fetches a component manifest from a remote HTTP(S) URL.
 *
 * @param url - Full HTTP(S) URL pointing to a JSON registry manifest
 * @returns The registry item manifest or null if fetching fails
 */
export async function fetchRemoteRegistryItem(url: string): Promise<RegistryItem | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Failed to fetch remote component from ${url}: Status ${response.status}`);
      return null;
    }

    const data = (await response.json()) as RegistryItem;

    // Validate essential manifest properties
    if (!data.name || !data.files || !Array.isArray(data.files)) {
      console.error(`Invalid remote registry manifest structure at ${url}`);
      return null;
    }

    return data;
  } catch (error) {
    console.error(`Error fetching remote registry item from ${url}:`, error);
    return null;
  }
}

/**
 * Fetches the manifest for a specific component by local name or remote URL.
 *
 * @param nameOrUrl - The component name (e.g., "button") or full HTTP(S) URL
 * @returns The registry item manifest or null if the component does not exist
 */
export async function getRegistryItem(nameOrUrl: string): Promise<RegistryItem | null> {
  // If the parameter is an HTTP/HTTPS URL, fetch from remote server
  if (nameOrUrl.startsWith("http://") || nameOrUrl.startsWith("https://")) {
    return fetchRemoteRegistryItem(nameOrUrl);
  }

  const registryDir = getRegistryDirectory();
  const itemPath = path.join(registryDir, `${nameOrUrl}.json`);

  if (!(await fs.pathExists(itemPath))) {
    return null;
  }

  try {
    const content = await fs.readFile(itemPath, "utf-8");
    return JSON.parse(content) as RegistryItem;
  } catch (error) {
    console.error(`Failed to parse registry item "${nameOrUrl}":`, error);
    return null;
  }
}

/**
 * Recursively resolves all required internal registry dependencies for a set of component names or URLs.
 *
 * @param namesOrUrls - Initial array of component names or remote URLs
 * @returns An ordered set of all required component names or URLs including nested dependencies
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