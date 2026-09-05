// packages/docs/src/server/index.ts
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer, build, preview, type ViteDevServer, type InlineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs-extra";
import matter from "gray-matter";
import { nikalaDocsPlugin } from "./plugin.js";
import type { DocsConfig } from "../types.js";
import { loadConfig } from "../config.js";
import { scanContent } from "../core/content-scanner.js";

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
      { find: /^@nikala-ui\/core\/ui\/(.*)$/, replacement: path.join(coreSrc, "registry/components/ui/$1") },
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

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderInlineMarkdown(value: string): string {
  const withoutComponents = value
    .replace(/<\/?[A-Z][A-Za-z0-9.]*(?:\s[^>]*)?>/g, "")
    .replace(/<\/?[a-z][^>]*>/g, "");
  return escapeHtml(withoutComponents)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

async function renderStaticPage(filePath: string): Promise<string> {
  const source = matter(await fs.readFile(filePath, "utf-8")).content;
  const lines = source.split(/\r?\n/);
  const output: string[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];
  let code: string[] | undefined;
  let codeLanguage = "";

  const flushParagraph = () => {
    if (paragraph.length) {
      output.push(`<p>${renderInlineMarkdown(paragraph.join(" "))}</p>`);
      paragraph = [];
    }
  };
  const flushList = () => {
    if (list.length) {
      output.push(`<ul>${list.map((item) => `<li>${renderInlineMarkdown(item)}</li>`).join("")}</ul>`);
      list = [];
    }
  };

  for (const line of lines) {
    const fence = line.match(/^\s*```(.*)$/);
    if (fence) {
      flushParagraph();
      flushList();
      if (code) {
        output.push(`<pre><code class="language-${escapeHtml(codeLanguage)}">${escapeHtml(code.join("\n"))}</code></pre>`);
        code = undefined;
        codeLanguage = "";
      } else {
        code = [];
        codeLanguage = fence[1].trim();
      }
      continue;
    }
    if (code) {
      code.push(line);
      continue;
    }

    const heading = line.match(/^\s*(#{1,6})\s+(.+?)\s*#*\s*$/);
    if (heading) {
      flushParagraph();
      flushList();
      const text = heading[2].replace(/[*_`]/g, "");
      const id = text.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
      output.push(`<h${heading[1].length} id="${escapeHtml(id)}"><a href="#${escapeHtml(id)}">${renderInlineMarkdown(text)}</a></h${heading[1].length}>`);
      continue;
    }

    const item = line.match(/^\s*[-*]\s+(.+)$/);
    if (item) {
      flushParagraph();
      list.push(item[1]);
      continue;
    }
    if (!line.trim()) {
      flushParagraph();
      flushList();
      continue;
    }
    paragraph.push(line.trim());
  }

  flushParagraph();
  flushList();
  return output.join("\n");
}

async function prerenderDocs(options: DocsServerOptions, outDir: string, template: string): Promise<void> {
  const root = options.root ? path.resolve(process.cwd(), options.root) : process.cwd();
  const config = options.config || await loadConfig(root);
  const contentDir = path.resolve(root, options.docsDir || config.contentDir || "docs");
  const pages = await scanContent(contentDir);
  if (!pages.length) return;

  for (const page of pages) {
    const content = `<article><h1>${escapeHtml(page.title)}</h1>${page.description ? `<p>${escapeHtml(page.description)}</p>` : ""}${await renderStaticPage(page.filePath)}</article>`;

    const title = escapeHtml(page.title === "Overview" ? (config.title || page.title) : `${page.title} | ${config.title || "Documentation"}`);
    const description = escapeHtml(page.description || config.description || "");
    const canonical = config.siteUrl
      ? `<link rel="canonical" href="${escapeHtml(`${config.siteUrl.replace(/\/$/, "")}${page.url === "/" ? "/" : page.url}`)}">`
      : "";
    const metadata = `<title>${title}</title>${description ? `<meta name="description" content="${description}">` : ""}${canonical}`;
    const html = template
      .replace(/<title>[^<]*<\/title>/i, metadata)
      .replace('<div id="root"></div>', `<div id="root" data-prerendered>${content}</div>`);
    const outputPath = page.url === "/" ? path.join(outDir, "index.html") : path.join(outDir, page.url.slice(1), "index.html");
    await fs.ensureDir(path.dirname(outputPath));
    await fs.writeFile(outputPath, html);
  }

  if (config.siteUrl) {
    const base = config.siteUrl.replace(/\/$/, "");
    const urls = pages.map((page) => `<url><loc>${escapeHtml(`${base}${page.url === "/" ? "/" : page.url}`)}</loc></url>`).join("");
    await fs.writeFile(path.join(outDir, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`);
    await fs.writeFile(path.join(outDir, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`);
  }
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

  const templatePath = path.join(outDir, "index.html");
  const template = await fs.readFile(templatePath, "utf-8");
  await prerenderDocs(options, outDir, template);
}

export async function previewDocs(options: DocsServerOptions = {}): Promise<void> {
  const root = options.root ? path.resolve(process.cwd(), options.root) : process.cwd();
  const outDir = options.outDir ? path.resolve(root, options.outDir) : path.resolve(root, "dist");

  const previewServer = await preview({
    root,
    appType: "mpa",
    build: {
      outDir,
    },
    preview: {
      port: options.port ?? 4173,
      host: options.host ?? "localhost",
      open: options.open ?? false,
    },
  });

  // Vite's MPA preview serves nested index.html files, but extensionless
  // routes need a trailing slash before the directory index can be resolved.
  const routeRedirectMiddleware = (req: any, res: any, next: any) => {
    const requestUrl = req.url || "/";
    const [pathname, query = ""] = requestUrl.split("?", 2);
    if (pathname === "/" || pathname.endsWith("/") || path.extname(pathname)) {
      next();
      return;
    }

    let decodedPath: string;
    try {
      decodedPath = decodeURIComponent(pathname);
    } catch {
      next();
      return;
    }

    const candidate = path.resolve(outDir, `.${decodedPath}`, "index.html");
    const insideOutput = candidate === outDir || candidate.startsWith(`${outDir}${path.sep}`);
    if (insideOutput && fs.existsSync(candidate)) {
      res.statusCode = 308;
      res.setHeader("Location", `${pathname}/${query ? `?${query}` : ""}`);
      res.end();
      return;
    }

    next();
  };

  const middlewareStack = (previewServer.middlewares as any).stack;
  if (Array.isArray(middlewareStack)) {
    middlewareStack.unshift({ route: "", handle: routeRedirectMiddleware });
  } else {
    previewServer.middlewares.use(routeRedirectMiddleware);
  }

  previewServer.printUrls();
}

export * from "./plugin.js";
