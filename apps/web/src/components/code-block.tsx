import {
  createEffect,
  createSignal,
  createMemo,
  splitProps,
  Show,
  type Component,
} from "solid-js";
import { createClipboard } from "@nikala-ui/hooks";
import { highlightCode, highlightCliCommand } from "@/lib/code-highlighter";
import { Button } from "@/components/ui/button";
import { usePackageManager, getRunnerPrefix } from "@/hooks/use-package-manager";
import { PmRunnerSelector } from "@/components/docs/pm-runner-selector";

interface CodeBlockProps {
  code: string | (() => string);
  lang?: string;
  isCli?: boolean;
  showPmSwitcher?: boolean;
  class?: string;
}

export const CodeBlock: Component<CodeBlockProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "code",
    "lang",
    "isCli",
    "showPmSwitcher",
    "class",
  ]);

  const { copied, copy } = createClipboard({ timeout: 2000 });
  const { activePm } = usePackageManager();

  const cleanCode = createMemo(() => {
    const raw =
      typeof local.code === "function"
        ? (local.code as () => string)()
        : local.code;
    const trimmed = (raw || "").trim();

    if (local.isCli) {
      const prefixMatch = trimmed.match(/^(bunx|npx|pnpm dlx|yarn dlx)\s+@nikala-ui\/cli\s*(.*)$/);
      if (prefixMatch) {
        const args = prefixMatch[2];
        return `${getRunnerPrefix(activePm())}${args ? " " + args : ""}`;
      }
    }

    return trimmed;
  });

  const isBashCli = createMemo(() => {
    const language = (local.lang || "tsx").toLowerCase();
    return language === "bash" || language === "sh" || language === "shell" || Boolean(local.isCli);
  });

  const [asyncHighlighted, setAsyncHighlighted] = createSignal("");

  createEffect(() => {
    if (!isBashCli()) {
      highlightCode(cleanCode(), local.lang || "tsx").then((html) => {
        setAsyncHighlighted(html);
      });
    }
  });

  const highlightedHtml = createMemo(() => {
    const codeStr = cleanCode();
    if (isBashCli()) {
      return highlightCliCommand(codeStr);
    }
    return asyncHighlighted() || codeStr;
  });

  const handleCopy = () => {
    copy(cleanCode());
  };

  const shouldShowSwitcher = () =>
    Boolean(local.showPmSwitcher || local.isCli);

  return (
    <div class={`group relative flex flex-col space-y-1.5 ${local.class || ""}`} {...rest}>
      {/* PM Switcher Bar */}
      <Show when={shouldShowSwitcher()}>
        <div class="flex items-center justify-end font-mono">
          <PmRunnerSelector size="sm" />
        </div>
      </Show>

      {/* Main Code Box */}
      <div class="relative rounded-lg border border-border/40 bg-card/40 text-foreground p-4 font-mono text-sm overflow-x-auto shadow-xs transition-colors">
        {/* Copy Button */}
        <div class="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <Button
            variant="outline"
            size="sm"
            class="h-7 px-2 text-xs bg-background/80 border-border text-foreground hover:bg-accent shadow-xs cursor-pointer"
            onClick={handleCopy}
          >
            <Show
              when={copied()}
              fallback={
                <span class="flex items-center gap-1">
                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 002-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy
                </span>
              }
            >
              <span class="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Copied!
              </span>
            </Show>
          </Button>
        </div>

        {/* Code Content */}
        <pre class="font-mono text-sm leading-relaxed whitespace-pre overflow-x-auto">
          <code
            class={`language-${local.lang || "tsx"}`}
            innerHTML={highlightedHtml()}
          />
        </pre>
      </div>
    </div>
  );
};