// packages/docs/src/index.ts
export * from "./types.js";
export * from "./config.js";
export * from "./core/content-scanner.js";
export * from "./core/route-tree.js";
export * from "./mdx/compiler.js";
export * from "./mdx/highlighter.js";
export * from "./components/mdx-components.js";
export * from "./themes/index.js";
export * from "./server/index.js";

import { nikalaDocsPlugin } from "./server/plugin.js";
export const nikalaDocs = nikalaDocsPlugin;
