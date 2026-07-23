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

  // Navigates up from `dist/utils` or `src/utils` to the package root `registry` directory
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
 * Fetches the manifest for a specific registry component by name.
 *
 * @param name - The name of the component (e.g., "button")
 * @returns The registry item manifest or null if the component does not exist.
 */
export async function getRegistryItem(name: string): Promise<RegistryItem | null> {
  const registryDir = getRegistryDirectory();
  const itemPath = path.join(registryDir, `${name}.json`);

  if (!(await fs.pathExists(itemPath))) {
    return null;
  }

  try {
    const content = await fs.readFile(itemPath, "utf-8");
    return JSON.parse(content) as RegistryItem;
  } catch (error) {
    console.error(`Failed to parse registry item "${name}":`, error);
    return null;
  }
}

/**
 * Recursively resolves all required internal registry dependencies for a set of component names.
 *
 * @param names - Initial array of component names requested by the user
 * @returns An ordered set of all required component names including nested dependencies
 */
export async function resolveRegistryDependencies(names: string[]): Promise<string[]> {
  const resolved = new Set<string>();
  const queue = [...names];

  while (queue.length > 0) {
    const currentName = queue.shift();
    if (!currentName || resolved.has(currentName)) continue;

    const item = await getRegistryItem(currentName);
    if (!item) continue;

    resolved.add(currentName);

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