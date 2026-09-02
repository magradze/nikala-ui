import {
  splitProps,
  createSignal,
  Show,
  type JSX,
  type ParentComponent,
} from "solid-js";
import { Check, Copy } from "lucide-solid";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { cn } from "@/lib/cn";

export interface CodeBlockProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /** The raw source code text to display and copy */
  code?: string;
  /** File name to display in the header bar (e.g. "App.tsx", "main.rs") */
  filename?: string;
  /** Programming language badge (e.g. "tsx", "rust", "bash") */
  language?: string;
  /** Whether the copy button is enabled. Defaults to true. */
  copyable?: boolean;
  class?: string;
}

export const CodeBlock: ParentComponent<CodeBlockProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "id",
    "code",
    "filename",
    "language",
    "copyable",
    "class",
    "children",
  ]);

  const [copied, setCopied] = createSignal(false);

  const copyable = () => local.copyable ?? true;

  const handleCopy = async () => {
    let textToCopy = local.code;
    if (!textToCopy && typeof window !== "undefined") {
      const target = document.querySelector(`[data-code-block-id="${local.id}"]`);
      if (target) textToCopy = target.textContent || "";
    }

    if (!textToCopy) return;

    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy code to clipboard", err);
    }
  };

  const hasHeader = () => Boolean(local.filename || local.language);

  return (
    <div
      class={cn(
        "group relative my-4 w-full overflow-hidden rounded-lg border border-border bg-muted/40 font-mono text-sm shadow-2xs",
        local.class
      )}
      {...rest}
    >
      {/* Code Header Bar (if filename or language is provided) */}
      <Show when={hasHeader()}>
        <div class="flex h-9 items-center justify-between border-b border-border/70 bg-muted/70 px-3.5 text-xs text-muted-foreground select-none">
          <div class="flex items-center gap-2">
            <Show when={local.filename}>
              <span class="font-medium text-foreground tracking-tight">{local.filename}</span>
            </Show>
            <Show when={local.language}>
              <Badge variant="outline" class="uppercase text-[10px] px-1.5 py-0 h-4 font-mono font-semibold">
                {local.language}
              </Badge>
            </Show>
          </div>

          <Show when={copyable() && local.code}>
            <Tooltip>
              <TooltipTrigger
                as={Button}
                variant="ghost"
                size="icon"
                onClick={handleCopy}
                aria-label={copied() ? "Copied code" : "Copy code"}
                class="size-6 p-0 rounded-xs text-muted-foreground hover:bg-background hover:text-foreground cursor-pointer"
              >
                <Show when={copied()} fallback={<Copy class="size-3.5" />}>
                  <Check class="size-3.5 text-emerald-500 dark:text-emerald-400" />
                </Show>
              </TooltipTrigger>
              <TooltipContent class="text-[10px] py-1 px-2">
                {copied() ? "Copied!" : "Copy code"}
              </TooltipContent>
            </Tooltip>
          </Show>
        </div>
      </Show>

      {/* Floating Copy Button (if no header bar is present) */}
      <Show when={!hasHeader() && copyable() && local.code}>
        <div class="absolute right-2.5 top-2.5 z-10 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
          <Tooltip>
            <TooltipTrigger
              as={Button}
              variant="outline"
              size="icon"
              onClick={handleCopy}
              aria-label={copied() ? "Copied code" : "Copy code"}
              class="size-7 rounded-md border-border/80 bg-background/90 text-muted-foreground backdrop-blur-xs hover:bg-muted hover:text-foreground cursor-pointer shadow-2xs"
            >
              <Show when={copied()} fallback={<Copy class="size-3.5" />}>
                <Check class="size-3.5 text-emerald-500 dark:text-emerald-400" />
              </Show>
            </TooltipTrigger>
            <TooltipContent class="text-[10px] py-1 px-2">
              {copied() ? "Copied!" : "Copy code"}
            </TooltipContent>
          </Tooltip>
        </div>
      </Show>

      {/* Code Container */}
      <div class="overflow-x-auto p-4 text-[13px] leading-relaxed [scrollbar-width:thin]">
        <Show when={local.children} fallback={<pre><code>{local.code}</code></pre>}>
          {local.children}
        </Show>
      </div>
    </div>
  );
};
