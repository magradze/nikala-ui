// src/lib/code-highlighter.ts
import Prism from "prismjs";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";
import "prismjs/components/prism-css";

export async function highlightCode(code: string, lang = "tsx") {
  const grammar =
    Prism.languages[lang] || Prism.languages.tsx || Prism.languages.markup;
  return Prism.highlight(code, grammar, lang);
}