// packages/docs/src/core/content-scanner.ts
import path from "node:path";
import fs from "fs-extra";
import matter from "gray-matter";
import type { Frontmatter, PageData, TocItem } from "../types.js";

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function extractToc(content: string): TocItem[] {
  const headings: TocItem[] = [];
  const lines = content.split("\n");
  let inCodeBlock = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }

    if (inCodeBlock) continue;

    // Match H2 and H3 headings: ## Title or ### Title
    const match = trimmed.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      let text = match[2].trim();

      // Clean inline markdown links, bold, code wrappers
      text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
      text = text.replace(/[*_`]/g, "");

      const id = slugify(text);
      if (id) {
        headings.push({
          id,
          text,
          depth: level,
        });
      }
    }
  }

  return headings;
}

export function extractTitle(content: string, fallback: string): string {
  const lines = content.split("\n");
  let inCodeBlock = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const match = trimmed.match(/^#\s+(.+)$/);
    if (match) {
      return match[1].trim().replace(/[*_`]/g, "");
    }
  }

  return fallback;
}

export function filePathToUrl(relativeFilePath: string): string {
  let cleanPath = relativeFilePath.replace(/\\/g, "/");
  cleanPath = cleanPath.replace(/\.(mdx?)$/, "");

  if (cleanPath === "index" || cleanPath === "") {
    return "/";
  }

  if (cleanPath.endsWith("/index")) {
    cleanPath = cleanPath.slice(0, -6);
  }

  return cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`;
}

export function formatTitleFromFilename(filename: string): string {
  const base = path.basename(filename, path.extname(filename));
  if (base === "index") return "Overview";
  return base
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function parseMdxFile(filePath: string, contentDir: string): Promise<PageData> {
  const raw = await fs.readFile(filePath, "utf-8");
  const parsed = matter(raw);
  const frontmatter = (parsed.data || {}) as Frontmatter;
  const relativePath = path.relative(contentDir, filePath);
  const url = filePathToUrl(relativePath);
  const fallbackTitle = formatTitleFromFilename(filePath);
  const title = frontmatter.title || extractTitle(parsed.content, fallbackTitle);
  const toc = extractToc(parsed.content);

  return {
    slug: url === "/" ? "index" : url.slice(1).replace(/\//g, "-"),
    url,
    filePath,
    frontmatter,
    toc,
    title,
    description: frontmatter.description,
  };
}

export async function scanContent(contentDir: string): Promise<PageData[]> {
  if (!(await fs.pathExists(contentDir))) {
    return [];
  }

  const results: PageData[] = [];

  async function walk(dir: string) {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (entry.isFile() && /\.(md|mdx)$/.test(entry.name)) {
        const page = await parseMdxFile(fullPath, contentDir);
        results.push(page);
      }
    }
  }

  await walk(contentDir);

  // Sort by URL depth and alphabetical order
  return results.sort((a, b) => {
    if (a.url === "/") return -1;
    if (b.url === "/") return 1;
    return a.url.localeCompare(b.url);
  });
}
