// src/lib/code-highlighter.ts
import { createHighlighter, type Highlighter } from "shiki";

let highlighterPromise: Promise<Highlighter> | null = null;

/**
 * Singleton Shiki highlighter instance with light & dark themes and core languages.
 */
export async function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["github-dark", "github-light"],
      langs: [
        "typescript",
        "javascript",
        "tsx",
        "jsx",
        "bash",
        "json",
        "css",
        "html",
        "rust",
      ],
    });
  }
  return highlighterPromise;
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

/**
 * Highlights a source code string using Shiki with GitHub Light and Dark themes.
 */
export async function highlightCode(code: string, lang = "tsx"): Promise<string> {
  const targetLang = (lang || "tsx").toLowerCase();

  // Instant synchronous CLI highlighting for bash
  if (targetLang === "bash" || targetLang === "sh" || targetLang === "shell") {
    const cliHighlighted = highlightCliCommand(code);
    if (cliHighlighted !== code) {
      return cliHighlighted;
    }
  }

  try {
    const highlighter = await getHighlighter();
    const resolvedLang =
      targetLang === "sh" || targetLang === "shell"
        ? "bash"
        : targetLang === "ts"
        ? "typescript"
        : targetLang === "js"
        ? "javascript"
        : targetLang;

    return highlighter.codeToHtml(code, {
      lang: resolvedLang,
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      defaultColor: false,
    });
  } catch (e) {
    console.warn(`Shiki failed to highlight code for language "${lang}":`, e);
    return code;
  }
}
