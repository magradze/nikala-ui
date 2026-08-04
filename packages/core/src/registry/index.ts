// src/registry/index.ts

/**
 * Represents a single file within a component registry item.
 */
export interface RegistryFile {
  /** The target relative path where the file will be placed in the user's project (e.g., "ui/button.tsx") */
  path: string;
  /** The full raw text content of the file */
  content: string;
  /** The category type of the file */
  type: "registry:ui" | "registry:util" | "registry:hook";
}

/**
 * Represents the complete manifest structure for a single Nikala UI component.
 */
export interface RegistryItem {
  /** The unique identifier name of the component (e.g., "button") */
  name: string;
  /** Display title for CLI prompts and documentation */
  title: string;
  /** Short summary describing the component */
  description: string;
  /** Component category type */
  type: "registry:ui" | "registry:util" | "registry:hook";
  /** Required NPM dependencies to be installed automatically (e.g., ["clsx", "tailwind-merge"]) */
  dependencies?: string[];
  /** Internal Nikala UI component dependencies required by this component (e.g., ["button"]) */
  registryDependencies?: string[];
  /** Array of code files comprising this component */
  files: RegistryFile[];
}

/**
 * Lightweight metadata structure used for the central registry index list.
 */
export interface RegistryIndexItem {
  name: string;
  title: string;
  description: string;
  type: "registry:ui" | "registry:util" | "registry:hook";
  dependencies?: string[];
  registryDependencies?: string[];
}

/**
 * Type alias for the central registry index manifest.
 */
export type RegistryIndex = RegistryIndexItem[];