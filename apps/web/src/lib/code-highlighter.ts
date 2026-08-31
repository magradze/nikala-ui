// src/lib/code-highlighter.ts
import { isServer } from "solid-js/web";

let prismLoaded = false;
let PrismInstance: any = null;

// Disable Prism auto-highlighting globally to prevent it from clobbering rendered DOM nodes
if (typeof window !== "undefined") {
  (window as any).Prism = (window as any).Prism || {};
  (window as any).Prism.manual = true;
}

/* Singleton Prism loader to prevent race conditions during concurrent code block renders */
async function loadPrism() {
  if (prismLoaded && PrismInstance) {
    return PrismInstance;
  }

  if (typeof window !== "undefined") {
    (window as any).Prism = (window as any).Prism || {};
    (window as any).Prism.manual = true;
  }

  PrismInstance = (await import("prismjs")).default;
  if (PrismInstance) {
    PrismInstance.manual = true;
  }

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

/**
 * Synchronous precision highlighter for CLI bash commands (works seamlessly in SSR & Client).
 */
export function highlightCliCommand(code: string): string {
  const trimmed = code.trim();
  const parts = trimmed.split(/\s+/);

  const isRunner =
    parts[0] === "bunx" ||
    parts[0] === "npx" ||
    parts[0] === "pnpm" ||
    parts[0] === "yarn" ||
    parts[0] === "bun" ||
    parts[0] === "npm" ||
    parts[0] === "cargo";

  if (parts.length >= 2 && isRunner) {
    let runner = parts[0];
    let pkgIndex = 1;

    // Multi-word runners (e.g. pnpm dlx, yarn dlx, bun create, cargo add)
    if ((parts[0] === "pnpm" || parts[0] === "yarn") && parts[1] === "dlx") {
      runner = `${parts[0]} dlx`;
      pkgIndex = 2;
    } else if (parts[0] === "bun" && (parts[1] === "create" || parts[1] === "add" || parts[1] === "run")) {
      runner = `${parts[0]} ${parts[1]}`;
      pkgIndex = 2;
    } else if (parts[0] === "cargo" && (parts[1] === "add" || parts[1] === "install")) {
      runner = `${parts[0]} ${parts[1]}`;
      pkgIndex = 2;
    }

    const pkg = parts[pkgIndex] || "";
    const restTokens = parts.slice(pkgIndex + 1);

    const highlightedRest = restTokens
      .map((token, index) => {
        // Flags (--hook, -h, --all, --overwrite, -y, --template)
        if (token.startsWith("-")) {
          return `<span class="text-amber-500 dark:text-amber-400 font-medium">${token}</span>`;
        }
        // Subcommands (add, init, theme, set, diff, list, rules, validate, check, upgrade, remove)
        if (
          index === 0 &&
          [
            "add",
            "init",
            "theme",
            "set",
            "diff",
            "list",
            "ls",
            "rules",
            "validate",
            "check",
            "upgrade",
            "update",
            "remove",
            "uninstall",
          ].includes(token)
        ) {
          return `<span class="text-sky-500 dark:text-sky-400 font-semibold">${token}</span>`;
        }
        // Target value arguments (component names, hooks, themes, packages)
        return `<span class="text-violet-500 dark:text-violet-400 font-medium">${token}</span>`;
      })
      .join(" ");

    return `<span class="text-emerald-500 dark:text-emerald-400 font-semibold">${runner}</span> <span class="text-primary font-semibold">${pkg}</span>${
      highlightedRest ? " " + highlightedRest : ""
    }`;
  }

  return code;
}

export async function highlightCode(code: string, lang = "tsx") {
  const targetLang = lang.toLowerCase();

  // Instant synchronous CLI highlighting for bash
  if (targetLang === "bash" || targetLang === "sh" || targetLang === "shell") {
    const cliHighlighted = highlightCliCommand(code);
    if (cliHighlighted !== code) {
      return cliHighlighted;
    }
  }

  /* Prevent Prism execution during SSR */
  if (isServer) {
    return code;
  }

  try {
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