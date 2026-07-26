import { isServer } from "solid-js/web";

export async function highlightCode(code: string, lang = "tsx") {
  /* Prevent Prism execution during SSR to avoid server-side hydration crashes */
  if (isServer) {
    return code;
  }

  /* Dynamically load Prism only in the browser environment */
  const Prism = (await import("prismjs")).default;
  await import("prismjs/components/prism-clike");
  await import("prismjs/components/prism-javascript");
  await import("prismjs/components/prism-typescript");
  await import("prismjs/components/prism-jsx");
  await import("prismjs/components/prism-tsx");
  await import("prismjs/components/prism-bash");
  await import("prismjs/components/prism-json");
  await import("prismjs/components/prism-css");

  const grammar =
    Prism.languages[lang] || Prism.languages.tsx || Prism.languages.markup;
  return Prism.highlight(code, grammar, lang);
}