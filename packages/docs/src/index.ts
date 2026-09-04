// packages/docs/src/index.ts
export * from "./types.js";
export * from "./config.js";
export * from "./core/content-scanner.js";
export * from "./core/route-tree.js";
export * from "./mdx/compiler.js";
export * from "./mdx/highlighter.js";
export * from "./components/mdx-components.js";
export * from "./themes/index.js";

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
