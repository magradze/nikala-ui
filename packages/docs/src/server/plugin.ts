import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "fs-extra";
import type { Plugin, ViteDevServer } from "vite";
import { scanContent, scanContentDirectories } from "../core/content-scanner.js";
import { buildSidebarTree } from "../core/route-tree.js";
import { compileMdx } from "../mdx/compiler.js";
import { loadConfig } from "../config.js";
import type { DocsConfig, PageData } from "../types.js";

export interface NikalaDocsPluginOptions {
  docsDir?: string;
  configRoot?: string;
  configFile?: string;
  config?: DocsConfig;
}

const VIRTUAL_CONFIG_ID = "virtual:nikala-docs-config";
const RESOLVED_CONFIG_ID = "\0" + VIRTUAL_CONFIG_ID;

const VIRTUAL_TREE_ID = "virtual:nikala-docs-tree";
const RESOLVED_TREE_ID = "\0" + VIRTUAL_TREE_ID;

const VIRTUAL_ROUTES_ID = "virtual:nikala-docs-routes";
const RESOLVED_ROUTES_ID = "\0" + VIRTUAL_ROUTES_ID;

const VIRTUAL_THEME_ID = "virtual:nikala-docs-theme";
const RESOLVED_THEME_ID = "\0" + VIRTUAL_THEME_ID;

const VIRTUAL_SHIKI_ID = "virtual:nikala-docs-shiki-stub";
const RESOLVED_SHIKI_ID = "\0" + VIRTUAL_SHIKI_ID;

export function nikalaDocsPlugin(options: NikalaDocsPluginOptions = {}): Plugin {
  // Vite's root is the docs engine client directory. It is not the user's
  // project root, so content/config paths must always resolve from configRoot.
  let rootDir = path.resolve(options.configRoot || process.cwd());
  let docsDir = options.docsDir ? path.resolve(rootDir, options.docsDir) : path.resolve(rootDir, "docs");
  let resolvedConfig: DocsConfig = options.config || { title: "Nikala Docs" };
  let cachedPages: PageData[] = [];

  return {
    name: "vite-plugin-nikala-docs",
    enforce: "pre",

    async configResolved(viteConfig) {
      // Keep Vite's internal root separate from the consuming project's root.
      // Otherwise `contentDir: "src/content"` resolves under packages/docs.
      rootDir = path.resolve(options.configRoot || process.cwd());
      if (!options.docsDir) {
        // The config is authoritative for new projects; keep legacy auto-detection.
        const fs = await import("fs-extra");
        if (!options.config) {
          resolvedConfig = await loadConfig(options.configRoot || rootDir);
        }
        if (resolvedConfig.contentDir) {
          docsDir = path.resolve(rootDir, resolvedConfig.contentDir);
        } else if (await fs.pathExists(path.resolve(rootDir, "docs"))) {
          docsDir = path.resolve(rootDir, "docs");
        } else if (await fs.pathExists(path.resolve(rootDir, "content"))) {
          docsDir = path.resolve(rootDir, "content");
        } else {
          docsDir = rootDir;
        }
      } else {
        docsDir = path.resolve(rootDir, options.docsDir);
      }

    },

    resolveId(id, importer) {
      if (id === "shiki" || id.startsWith("shiki/")) {
        if (importer && (importer.includes("/mdx/") || importer.includes("\\mdx\\"))) {
          return null;
        }
        return RESOLVED_SHIKI_ID;
      }
      if (id === VIRTUAL_CONFIG_ID) return RESOLVED_CONFIG_ID;
      if (id === VIRTUAL_TREE_ID) return RESOLVED_TREE_ID;
      if (id === VIRTUAL_ROUTES_ID) return RESOLVED_ROUTES_ID;
      if (id === VIRTUAL_THEME_ID) return RESOLVED_THEME_ID;
      return null;
    },

    async load(id) {
      if (id === RESOLVED_SHIKI_ID) {
        return `
export const createHighlighter = async () => null;
export const bundledLanguages = {};
export const bundledThemes = {};
export default { createHighlighter, bundledLanguages, bundledThemes };
`;
      }

      if (id === RESOLVED_CONFIG_ID) {
        return `export default ${JSON.stringify(resolvedConfig)};`;
      }

      if (id === RESOLVED_TREE_ID) {
        cachedPages = await scanContent(docsDir);
        const directories = await scanContentDirectories(docsDir);
        const tree = buildSidebarTree(cachedPages, directories);
        return `
export const pages = ${JSON.stringify(cachedPages)};
export const tree = ${JSON.stringify(tree)};
export default { pages, tree };
`;
      }

      if (id === RESOLVED_ROUTES_ID) {
        cachedPages = await scanContent(docsDir);
        const routeEntries = cachedPages.map((page) => {
          // Normalize file path for ESM import
          const escapedPath = JSON.stringify(page.filePath);
          const escapedUrl = JSON.stringify(page.url);
          return `  ${escapedUrl}: () => import(${escapedPath})`;
        });

        return `
export const routes = {
${routeEntries.join(",\n")}
};
export default routes;
`;
      }

      if (id === RESOLVED_THEME_ID) {
        const configuredPath = resolvedConfig.theme?.path;
        if (!configuredPath) {
          const defaultEntry = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../themes/default/index.js");
          return `import defaultTheme from ${JSON.stringify(defaultEntry)}; export const theme = defaultTheme; export default theme;`;
        }

        const requestedPath = path.resolve(options.configRoot || rootDir, configuredPath);
        const candidates = [
          requestedPath,
          path.join(requestedPath, "index.ts"),
          path.join(requestedPath, "index.tsx"),
          path.join(requestedPath, "index.js"),
          path.join(requestedPath, "index.jsx"),
        ];
        const themeEntry = candidates.find((candidate) => fs.existsSync(candidate));
        if (!themeEntry) throw new Error(`[nikala-docs] Theme path does not exist: ${requestedPath}`);
        return `import configuredTheme from ${JSON.stringify(themeEntry)}; export const theme = configuredTheme.default || configuredTheme; export default theme;`;
      }

      return null;
    },

    async transform(code, id) {
      // Inject Tailwind v4 @source directives into style.css
      if (id.endsWith("style.css")) {
        const sources: string[] = [];
        try {
          const coreEntry = fileURLToPath(import.meta.resolve("@nikala-ui/core"));
          sources.push(path.dirname(coreEntry));
        } catch {
          sources.push(path.resolve(rootDir, "../core/src"));
        }

        const themesDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../themes");
        if (fs.existsSync(themesDir)) {
          sources.push(themesDir);
        }

        if (docsDir && fs.existsSync(docsDir)) {
          sources.push(docsDir);
        }

        const sourceDirectives = sources
          .filter(Boolean)
          .map((src) => `@source "${src}";`)
          .join("\n");

        return {
          code: `@import "tailwindcss";\n${sourceDirectives}\n${code.replace('@import "tailwindcss";', "")}`,
          map: null,
        };
      }

      // Compile Markdown / MDX files to SolidJS JSX
      if (/\.(md|mdx)$/.test(id)) {
        const result = await compileMdx(code, {
          filePath: id,
          development: process.env.NODE_ENV !== "production",
          shiki: resolvedConfig.shiki,
        });

        return {
          code: result.code,
          map: null,
        };
      }
      return null;
    },

    configureServer(server: ViteDevServer) {
      const invalidateVirtualModules = () => {
        const modTree = server.moduleGraph.getModuleById(RESOLVED_TREE_ID);
        const modRoutes = server.moduleGraph.getModuleById(RESOLVED_ROUTES_ID);
        if (modTree) server.moduleGraph.invalidateModule(modTree);
        if (modRoutes) server.moduleGraph.invalidateModule(modRoutes);
        server.ws.send({ type: "full-reload" });
      };

      // Watch content directory for file additions or removals
      server.watcher.on("add", (file) => {
        if (/\.(md|mdx)$/.test(file)) {
          invalidateVirtualModules();
        }
      });

      server.watcher.on("unlink", (file) => {
        if (/\.(md|mdx)$/.test(file)) {
          invalidateVirtualModules();
        }
      });
    },
  };
}
