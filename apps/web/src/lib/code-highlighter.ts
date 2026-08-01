// src/lib/code-highlighter.ts
import { isServer } from "solid-js/web";

let prismLoaded = false;
let PrismInstance: any = null;

/* Singleton Prism loader to prevent race conditions during concurrent code block renders */
async function loadPrism() {
  if (prismLoaded && PrismInstance) {
    return PrismInstance;
  }

  PrismInstance = (await import("prismjs")).default;

  // @ts-ignore
  await import("prismjs/components/prism-clike");
  // @ts-ignore
  await import("prismjs/components/prism-javascript");
  // @ts-ignore
  await import("prismjs/components/prism-typescript");
  // @ts-ignore
  await import("prismjs/components/prism-jsx");
  // @ts-ignore
  await import("prismjs/components/prism-tsx");
  // @ts-ignore
  await import("prismjs/components/prism-bash");
  // @ts-ignore
  await import("prismjs/components/prism-json");
  // @ts-ignore
  await import("prismjs/components/prism-css");

  prismLoaded = true;
  return PrismInstance;
}

export async function highlightCode(code: string, lang = "tsx") {
  /* Prevent Prism execution during SSR */
  if (isServer) {
    return code;
  }

  try {
    const Prism = await loadPrism();
    const targetLang = lang.toLowerCase();

/* Resolve grammar with fallback cascade */
    const grammar =
      Prism.languages[targetLang] ||
      Prism.languages.tsx ||
      Prism.languages.jsx ||
      Prism.languages.javascript ||
      Prism.languages.markup;

    if (!grammar) {
      return code;
    }

    return Prism.highlight(code, grammar, targetLang);
  } catch (e) {
    return code;
  }
}