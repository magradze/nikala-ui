// packages/docs/src/server/plugin.ts
import path from "node:path";
import type { Plugin, ViteDevServer } from "vite";
import { scanContent } from "../core/content-scanner.js";
import { buildSidebarTree } from "../core/route-tree.js";
import { compileMdx } from "../mdx/compiler.js";
import { loadConfig } from "../config.js";
import type { DocsConfig, PageData } from "../types.js";

export interface NikalaDocsPluginOptions {
  docsDir?: string;
  configFile?: string;
  config?: DocsConfig;
}

const VIRTUAL_CONFIG_ID = "virtual:nikala-docs-config";
const RESOLVED_CONFIG_ID = "\0" + VIRTUAL_CONFIG_ID;

const VIRTUAL_TREE_ID = "virtual:nikala-docs-tree";
const RESOLVED_TREE_ID = "\0" + VIRTUAL_TREE_ID;

const VIRTUAL_ROUTES_ID = "virtual:nikala-docs-routes";
const RESOLVED_ROUTES_ID = "\0" + VIRTUAL_ROUTES_ID;

export function nikalaDocsPlugin(options: NikalaDocsPluginOptions = {}): Plugin {
  let rootDir = process.cwd();
  let docsDir = options.docsDir ? path.resolve(rootDir, options.docsDir) : path.resolve(rootDir, "docs");
  let resolvedConfig: DocsConfig = options.config || { title: "Nikala Docs" };
  let cachedPages: PageData[] = [];

  return {
    name: "vite-plugin-nikala-docs",
    enforce: "pre",

    async configResolved(viteConfig) {
      rootDir = viteConfig.root || process.cwd();
      if (!options.docsDir) {
        // Automatically check 'docs' or 'content' directories
        const fs = await import("fs-extra");
        if (await fs.pathExists(path.resolve(rootDir, "docs"))) {
          docsDir = path.resolve(rootDir, "docs");
        } else if (await fs.pathExists(path.resolve(rootDir, "content"))) {
          docsDir = path.resolve(rootDir, "content");
        } else {
          docsDir = rootDir;
        }
      } else {
        docsDir = path.resolve(rootDir, options.docsDir);
      }

      if (!options.config) {
        resolvedConfig = await loadConfig(rootDir);
      }
    },

    resolveId(id) {
      if (id === VIRTUAL_CONFIG_ID) return RESOLVED_CONFIG_ID;
      if (id === VIRTUAL_TREE_ID) return RESOLVED_TREE_ID;
      if (id === VIRTUAL_ROUTES_ID) return RESOLVED_ROUTES_ID;
      return null;
    },

    async load(id) {
      if (id === RESOLVED_CONFIG_ID) {
        return `export default ${JSON.stringify(resolvedConfig)};`;
      }

      if (id === RESOLVED_TREE_ID) {
        cachedPages = await scanContent(docsDir);
        const tree = buildSidebarTree(cachedPages);
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

      return null;
    },

    async transform(code, id) {
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
