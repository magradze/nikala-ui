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
    const targetLang = lang.toLowerCase();

    /* Custom precision highlighter for CLI bash commands */
    if (targetLang === "bash") {
      const trimmed = code.trim();
      const parts = trimmed.split(/\s+/);
      if (
        parts.length >= 2 &&
        (parts[0] === "bunx" ||
          parts[0] === "npx" ||
          parts[0] === "pnpm" ||
          parts[0] === "yarn")
      ) {
        const runner = parts[0]; // e.g. bunx / npx
        const pkg = parts[1]; // e.g. @nikala-ui/cli
        const restTokens = parts.slice(2);

        const highlightedRest = restTokens
          .map((token, index) => {
            // Flags like --all, --overwrite, -y, --hook
            if (token.startsWith("-")) {
              return `<span class="text-muted-foreground opacity-80">${token}</span>`;
            }
            // First subcommand after CLI name like add, init, theme, list
            if (
              index === 0 &&
              ["add", "init", "theme", "set", "diff", "list", "check"].includes(
                token
              )
            ) {
              return `<span class="text-sky-500 dark:text-sky-400 font-medium">${token}</span>`;
            }
            // Target value arguments (component names, themes, etc.)
            return `<span class="text-foreground">${token}</span>`;
          })
          .join(" ");

        return `<span class="text-emerald-500 font-semibold">${runner}</span> <span class="text-primary font-semibold">${pkg}</span>${
          highlightedRest ? " " + highlightedRest : ""
        }`;
      }
    }

    const Prism = await loadPrism();

    /* Resolve grammar with fallback cascade for TSX/JSON/CSS */
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