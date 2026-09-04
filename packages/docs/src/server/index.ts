// packages/docs/src/server/index.ts
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer, build, preview, type ViteDevServer } from "vite";
import solidPlugin from "vite-plugin-solid";
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
  // Check both dist/client and src/client for development/installed runs
  const distClient = path.resolve(__dirname, "../client");
  if (fs.existsSync(distClient)) return distClient;
  return path.resolve(__dirname, "../../src/client");
}

export async function createDocsServer(options: DocsServerOptions = {}): Promise<ViteDevServer> {
  const root = options.root ? path.resolve(process.cwd(), options.root) : process.cwd();
  const clientDir = getClientDir();

  const server = await createServer({
    root: clientDir,
    server: {
      port: options.port ?? 3000,
      host: options.host ?? "localhost",
      open: options.open ?? false,
      fs: {
        allow: [root, clientDir, path.resolve(clientDir, "../..")],
      },
    },
    plugins: [
      nikalaDocsPlugin({
        docsDir: options.docsDir ? path.resolve(root, options.docsDir) : undefined,
        config: options.config,
      }),
      solidPlugin({
        extensions: [".tsx", ".jsx"],
      }),
    ],
    optimizeDeps: {
      include: ["solid-js", "solid-js/web", "clsx", "tailwind-merge", "lucide-solid"],
    },
  });

  return server;
}

export async function buildDocs(options: DocsServerOptions = {}): Promise<void> {
  const root = options.root ? path.resolve(process.cwd(), options.root) : process.cwd();
  const clientDir = getClientDir();
  const outDir = options.outDir ? path.resolve(root, options.outDir) : path.resolve(root, "dist");

  await build({
    root: clientDir,
    build: {
      outDir,
      emptyOutDir: true,
    },
    plugins: [
      nikalaDocsPlugin({
        docsDir: options.docsDir ? path.resolve(root, options.docsDir) : undefined,
        config: options.config,
      }),
      solidPlugin({
        extensions: [".tsx", ".jsx"],
      }),
    ],
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
