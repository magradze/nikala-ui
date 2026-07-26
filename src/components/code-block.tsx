// src/components/code-block.tsx
import { createResource, createSignal, Show, type Component } from "solid-js";
import { highlightCode } from "@/lib/code-highlighter";
import { Button } from "@/components/ui/button";

interface CodeBlockProps {
  code: string;
  lang?: string;
  class?: string;
}

export const CodeBlock: Component<CodeBlockProps> = (props) => {
  const [copied, setCopied] = createSignal(false);

  const [highlightedCode] = createResource(
    () => ({ code: props.code, lang: props.lang || "tsx" }),
    async ({ code, lang }) => await highlightCode(code, lang)
  );

  const handleCopy = async () => {
    await navigator.clipboard.writeText(props.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div class={`relative group rounded-lg border border-border bg-zinc-200/95 dark:bg-zinc-900/90 text-zinc-100 p-4 font-mono text-sm overflow-x-auto ${props.class || ""}`}>
      {/* Copy Button */}
      <div class="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="outline"
          size="sm"
          class="h-8 px-2 text-xs bg-zinc-800 border-zinc-700 text-zinc-200 hover:bg-zinc-700 hover:text-white"
          onClick={handleCopy}
        >
          {copied() ? (
            <span class="flex items-center gap-1 text-emerald-400">
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </span>
          ) : (
            <span class="flex items-center gap-1">
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 002-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </span>
          )}
        </Button>
      </div>

      {/* Render Highlighting HTML */}
      <Show
        when={!highlightedCode.loading}
        fallback={<pre class="text-zinc-500 font-mono text-xs animate-pulse">Loading code preview...</pre>}
      >
        <div class="overflow-x-auto" innerHTML={highlightedCode() || ""} />
      </Show>
    </div>
  );
};