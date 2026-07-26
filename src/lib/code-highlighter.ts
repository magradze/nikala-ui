// src/lib/code-highlighter.ts
import { codeToHtml } from "shiki";

export async function highlightCode(code: string, lang = "tsx") {
  const html = await codeToHtml(code, {
    lang,
    themes: {
      light: "github-light",
      dark: "github-dark-default",
    },
    defaultColor: false,
  });

  return html;
}