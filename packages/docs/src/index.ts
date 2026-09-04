// packages/docs/src/index.ts
export * from "./types.js";
export * from "./config.js";

import type { DocsConfig } from "./types.js";

/**
 * Vite plugin for Nikala Docs.
 * Provides virtual route modules, MDX compilation, and content routing.
 */
export function nikalaDocs(userConfig?: DocsConfig) {
  return {
    name: "vite-plugin-nikala-docs",
    configResolved() {
      // Configuration hook
    },
  };
}
