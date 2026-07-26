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

  /* Asynchronously highlight code */
  const [highlightedCode] = createResource(
    () => ({ code: props.code.trim(), lang: props.lang || "tsx" }),
    async ({ code, lang }) => await highlightCode(code, lang)
  );

  const handleCopy = async () => {
    await navigator.clipboard.writeText(props.code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      class={`relative group rounded-lg border border-border bg-muted/60 text-foreground p-4 font-mono text-sm overflow-x-auto shadow-xs transition-colors ${props.class || ""
        }`}
    >
      {/* Copy Button */}
      <div class="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <Button
          variant="outline"
          size="sm"
          class="h-7 px-2 text-xs bg-background/80 border-border text-foreground hover:bg-accent shadow-xs"
          onClick={handleCopy}
        >
          <Show
            when={copied()}
            fallback={
              <span class="flex items-center gap-1">
                <svg
                  class="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 002-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Copy
              </span>
            }
          >
            <span class="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
              <svg
                class="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Copied!
            </span>
          </Show>
        </Button>
      </div>

      {/* Render Syntax Highlighting */}
      <Show
        when={!highlightedCode.loading}
        fallback={
          <pre class="text-muted-foreground font-mono text-xs animate-pulse">
            Loading code preview...
          </pre>
        }
      >
        <pre class="font-mono text-sm leading-relaxed whitespace-pre overflow-x-auto">
          <code innerHTML={highlightedCode() || ""} />
        </pre>
      </Show>
    </div>
  );
};