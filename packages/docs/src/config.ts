// packages/docs/src/config.ts
import path from "node:path";
import fs from "fs-extra";
import type { DocsConfig } from "./types.js";

export const DEFAULT_DOCS_CONFIG: Required<Pick<DocsConfig, "title" | "description" | "contentDir" | "sidebar">> & DocsConfig = {
  title: "Nikala Docs",
  description: "Documentation built with Nikala UI",
  contentDir: "content",
  sidebar: "auto",
  theme: {
    accentColor: "wine",
    grayColor: "zinc",
    defaultMode: "system",
  },
  shiki: {
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
    langs: [
      "typescript",
      "javascript",
      "tsx",
      "jsx",
      "bash",
      "json",
      "css",
      "html",
    ],
  },
  search: {
    enabled: true,
    provider: "local",
  },
};

export function defineDocsConfig(config: DocsConfig): DocsConfig {
  return config;
}

const CONFIG_FILENAMES = [
  "nikala.config.ts",
  "nikala.config.js",
  "nikala.docs.config.ts",
  "nikala.docs.config.js",
  "nikala.docs.config.mjs",
  "docs.config.ts",
  "docs.config.js",
  "docs.config.mjs",
];

export const loadConfig = resolveDocsConfig;

export async function resolveDocsConfig(cwd: string = process.cwd()): Promise<DocsConfig> {
  for (const filename of CONFIG_FILENAMES) {
    const fullPath = path.join(cwd, filename);
    if (await fs.pathExists(fullPath)) {
      try {
        const mod = await import(fullPath);
        const userConfig: DocsConfig = mod.default || mod.config || {};
        return {
          ...DEFAULT_DOCS_CONFIG,
          ...userConfig,
          theme: {
            ...DEFAULT_DOCS_CONFIG.theme,
            ...userConfig.theme,
          },
          shiki: {
            ...DEFAULT_DOCS_CONFIG.shiki,
            ...userConfig.shiki,
            themes: {
              ...DEFAULT_DOCS_CONFIG.shiki?.themes,
              ...userConfig.shiki?.themes,
            },
          },
          search: {
            ...DEFAULT_DOCS_CONFIG.search,
            ...userConfig.search,
          },
        };
      } catch (error) {
        console.warn(`[nikala-docs] Failed to load config from ${filename}:`, error);
      }
    }
  }

  return DEFAULT_DOCS_CONFIG;
}
