// packages/docs/src/mdx/compiler.ts
import { compile } from "@mdx-js/mdx";
import matter from "gray-matter";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { extractToc } from "../core/content-scanner.js";
import type { Frontmatter, TocItem } from "../types.js";
import { rehypeShiki } from "./rehype-shiki.js";

export interface CompileMdxResult {
  code: string;
  frontmatter: Frontmatter;
  toc: TocItem[];
}

export interface CompileMdxOptions {
  filePath?: string;
  development?: boolean;
  shiki?: import("../types.js").ShikiConfig;
}

export async function compileMdx(
  rawContent: string,
  options: CompileMdxOptions = {}
): Promise<CompileMdxResult> {
  const parsed = matter(rawContent);
  const frontmatter = (parsed.data || {}) as Frontmatter;
  const toc = extractToc(parsed.content);

  const compiled = await compile(parsed.content, {
    jsx: true,
    jsxImportSource: "solid-js",
    development: options.development ?? false,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: ["heading-anchor"],
          },
        },
      ],
      [rehypeShiki, options.shiki],
    ],
  });

  return {
    code: String(compiled),
    frontmatter,
    toc,
  };
}
