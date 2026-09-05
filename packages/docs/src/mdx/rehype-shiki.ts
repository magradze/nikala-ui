// packages/docs/src/mdx/rehype-shiki.ts
import type { BundledTheme } from "shiki";
import type { ShikiConfig } from "../types.js";
import { ensureLanguage, ensureTheme, getDocsHighlighter } from "./highlighter.js";

export function rehypeShiki(config?: ShikiConfig) {
  return async (tree: any) => {
    const highlighter = await getDocsHighlighter(config);

    const lightTheme = config?.themes?.light
      ? await ensureTheme(highlighter, config.themes.light)
      : ("github-light" as BundledTheme);

    const darkTheme = config?.themes?.dark
      ? await ensureTheme(highlighter, config.themes.dark)
      : ("github-dark" as BundledTheme);

    const tasks: Promise<void>[] = [];

    function visit(node: any, parent: any, index: number) {
      if (node && node.type === "element" && node.tagName === "pre") {
        const codeNode = node.children?.find(
          (child: any) => child.type === "element" && child.tagName === "code"
        );

        if (codeNode) {
          const className = (codeNode.properties?.className as string[]) || [];
          const langClass = className.find((c: string) => c.startsWith("language-"));
          const rawLang = langClass ? langClass.replace("language-", "") : "text";

          // Extract text content from code children
          let codeText = "";
          for (const child of codeNode.children || []) {
            if (child.type === "text") {
              codeText += child.value;
            }
          }

          tasks.push(
            (async () => {
              try {
                // Dynamically ensure language is loaded on-demand
                const targetLang = await ensureLanguage(highlighter, rawLang);

                const hast = highlighter.codeToHast(codeText.trimEnd(), {
                  lang: targetLang,
                  themes: {
                    light: lightTheme,
                    dark: darkTheme,
                  },
                  defaultColor: false,
                });

                if (hast.children?.[0] && parent && typeof index === "number") {
                  const highlightedPre = hast.children[0] as any;
                  // Preserve or merge existing classes
                  const existingClass = (highlightedPre.properties?.className as string[]) || [];
                  highlightedPre.properties = highlightedPre.properties || {};
                  highlightedPre.properties.className = [
                    ...existingClass,
                    "nikala-code-block",
                    "font-mono",
                    "text-xs",
                  ];

                  // Store raw code in data attribute for copy actions
                  highlightedPre.properties["data-code"] = codeText.trimEnd();
                  highlightedPre.properties["data-lang"] = targetLang;

                  // Add class to code element so MdxCode knows it is inside pre
                  const codeEl = highlightedPre.children?.find(
                    (child: any) => child.type === "element" && child.tagName === "code"
                  );
                  if (codeEl) {
                    const codeClass = (codeEl.properties?.className as string[]) || [];
                    codeEl.properties = codeEl.properties || {};
                    codeEl.properties.className = [
                      ...codeClass,
                      "shiki-code",
                      `language-${targetLang}`,
                    ];
                  }

                  parent.children[index] = highlightedPre;
                }
              } catch (err) {
                // Fallback to unhighlighted code on error
                console.warn(`[nikala-docs] Shiki highlighting failed for lang: ${rawLang}`, err);
              }
            })()
          );
        }
      }

      if (node.children && Array.isArray(node.children)) {
        for (let i = 0; i < node.children.length; i++) {
          visit(node.children[i], node, i);
        }
      }
    }

    visit(tree, null, -1);
    await Promise.all(tasks);
  };
}
