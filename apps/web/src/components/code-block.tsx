import {
  createEffect,
  createSignal,
  Show,
  type Component,
} from "solid-js";
import { createClipboard } from "@nikala-ui/hooks";
import { highlightCode } from "@/lib/code-highlighter";
import { Button } from "@/components/ui/button";
import { usePackageManager } from "@/hooks/use-package-manager";
import { PmRunnerSelector } from "@/components/docs/pm-runner-selector";

interface CodeBlockProps {
  code: string | (() => string);
  lang?: string;
  isCli?: boolean;
  showPmSwitcher?: boolean;
  class?: string;
}

export const CodeBlock: Component<CodeBlockProps> = (props) => {
  const { copied, copy } = createClipboard({ timeout: 2000 });
  const [highlighted, setHighlighted] = createSignal("");
  const { formatCommand } = usePackageManager();

  const cleanCode = () => {
    const raw =
      typeof props.code === "function"
        ? (props.code as () => string)()
        : props.code;
    return (raw || "").trim();
  };

  createEffect(() => {
    const codeStr = cleanCode();
    const language = props.lang || "tsx";

    highlightCode(codeStr, language).then((html) => {
      setHighlighted(html);
    });
  });

  const handleCopy = () => {
    copy(cleanCode());
  };

  const shouldShowSwitcher = () =>
    props.showPmSwitcher || props.isCli || props.lang === "bash";

  return (
    <div class={`group relative flex flex-col space-y-1.5 ${props.class || ""}`}>
      {/* PM Switcher Bar (Positioned OUTSIDE and ABOVE the code box) */}
      <Show when={shouldShowSwitcher()}>
        <div class="flex items-center justify-end font-mono">
          <PmRunnerSelector size="sm" />
        </div>
      </Show>

      {/* Main Dark Code Box */}
      <div class="relative rounded-lg border border-border bg-muted/60 text-foreground p-4 font-mono text-sm overflow-x-auto shadow-xs transition-colors">
        {/* Copy Button (INSIDE the code box on top-right on hover) */}
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
          <code class={`language-${props.lang || "tsx"}`} innerHTML={highlighted() || cleanCode()} />
        </pre>
      </div>
    </div>
  );
};