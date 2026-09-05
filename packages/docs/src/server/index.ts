// packages/docs/src/server/index.ts
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer, build, preview, type ViteDevServer, type InlineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs-extra";
import { nikalaDocsPlugin } from "./plugin.js";
import type { DocsConfig } from "../types.js";

export interface DocsServerOptions {
  root?: string;
  docsDir?: string;
  port?: number;
  host?: string | boolean;
  open?: boolean;
  config?: DocsConfig;
  outDir?: string;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function getClientDir(): string {
  const distClient = path.resolve(__dirname, "../client");
  if (fs.existsSync(distClient)) return distClient;
  return path.resolve(__dirname, "../../src/client");
}

function getSolidJsDir(): string {
  try {
    const entry = fileURLToPath(import.meta.resolve("solid-js"));
    return path.dirname(path.dirname(entry));
  } catch {
    return "";
  }
}

function getCoreSrcDir(): string {
  try {
    const entry = fileURLToPath(import.meta.resolve("@nikala-ui/core"));
    return path.dirname(entry);
  } catch {
    return path.resolve(__dirname, "../../../core/src");
  }
}

function getHooksSrcDir(): string {
  try {
    const entry = fileURLToPath(import.meta.resolve("@nikala-ui/hooks"));
    return path.dirname(entry);
  } catch {
    return path.resolve(__dirname, "../../../hooks/src");
  }
}

function getSharedConfig(options: DocsServerOptions, isDev = false): InlineConfig {
  const root = options.root ? path.resolve(process.cwd(), options.root) : process.cwd();
  const clientDir = getClientDir();
  const solidJsDir = getSolidJsDir();
  const coreSrc = getCoreSrcDir();
  const hooksSrc = getHooksSrcDir();

  const aliases: any[] = [];
  if (solidJsDir) {
    aliases.push(
      { find: "solid-js/web", replacement: path.join(solidJsDir, isDev ? "web/dist/dev.js" : "web/dist/web.js") },
      { find: "solid-js/store", replacement: path.join(solidJsDir, isDev ? "store/dist/dev.js" : "store/dist/store.js") },
      { find: "solid-js/html", replacement: path.join(solidJsDir, "html/dist/html.js") },
      { find: "solid-js/h", replacement: path.join(solidJsDir, "h/dist/h.js") },
      { find: "solid-js", replacement: path.join(solidJsDir, isDev ? "dist/dev.js" : "dist/solid.js") }
    );
  }

  if (coreSrc) {
    aliases.push(
      { find: "@/components/ui", replacement: path.join(coreSrc, "registry/components/ui") },
      { find: "@/lib", replacement: path.join(coreSrc, "lib") },
      { find: "@/providers", replacement: path.join(coreSrc, "registry/providers") },
      { find: "@nikala-ui/core", replacement: path.join(coreSrc, "index.ts") }
    );
  }

  if (hooksSrc) {
    aliases.push(
      { find: "@/hooks", replacement: hooksSrc },
      { find: "@nikala-ui/hooks", replacement: path.join(hooksSrc, "index.ts") }
    );
  }

  return {
    root: clientDir,
    resolve: {
      alias: aliases,
      dedupe: ["solid-js", "solid-js/web", "solid-js/store"],
      conditions: isDev ? ["development", "browser"] : ["production", "browser"],
    },
    optimizeDeps: {
      exclude: ["shiki"],
    },
    plugins: [
      nikalaDocsPlugin({
        docsDir: options.docsDir ? path.resolve(root, options.docsDir) : undefined,
        configRoot: root,
        config: options.config,
      }),
      tailwindcss(),
      solidPlugin({
        extensions: [".tsx", ".jsx", ".mdx", ".md"],
      }),
    ],
  };
}

export async function createDocsServer(options: DocsServerOptions = {}): Promise<ViteDevServer> {
  const root = options.root ? path.resolve(process.cwd(), options.root) : process.cwd();
  const clientDir = getClientDir();
  const coreSrc = getCoreSrcDir();
  const hooksSrc = getHooksSrcDir();
  const solidJsDir = getSolidJsDir();
  const workspaceRoot = path.resolve(coreSrc, "../../..");
  const shared = getSharedConfig(options, true);

  const server = await createServer({
    ...shared,
    server: {
      port: options.port ?? 3000,
      host: options.host ?? "localhost",
      open: options.open ?? false,
      fs: {
        allow: [
          root,
          clientDir,
          path.resolve(clientDir, "../.."),
          path.resolve(coreSrc, "../.."),
          path.resolve(hooksSrc, "../.."),
          workspaceRoot,
          path.join(workspaceRoot, "node_modules"),
          ...(solidJsDir ? [solidJsDir, path.resolve(solidJsDir, ".."), path.resolve(solidJsDir, "../..")] : []),
        ],
      },
    },
  });

  return server;
}

export async function buildDocs(options: DocsServerOptions = {}): Promise<void> {
  const root = options.root ? path.resolve(process.cwd(), options.root) : process.cwd();
  const outDir = options.outDir ? path.resolve(root, options.outDir) : path.resolve(root, "dist");
  const shared = getSharedConfig(options, false);

  await build({
    ...shared,
    build: {
      outDir,
      emptyOutDir: true,
    },
  });
}

export async function previewDocs(options: DocsServerOptions = {}): Promise<void> {
  const root = options.root ? path.resolve(process.cwd(), options.root) : process.cwd();
  const outDir = options.outDir ? path.resolve(root, options.outDir) : path.resolve(root, "dist");

  const previewServer = await preview({
    root,
    build: {
      outDir,
    },
    preview: {
      port: options.port ?? 4173,
      host: options.host ?? "localhost",
      open: options.open ?? false,
    },
  });

  previewServer.printUrls();
}

export * from "./plugin.js";
