import {
  createEffect,
  createSignal,
  createMemo,
  splitProps,
  For,
  Show,
  type Component,
} from "solid-js";
import { Check, Copy } from "lucide-solid";
import { createClipboard } from "@nikala-ui/hooks";
import { highlightCode, highlightCliCommand } from "@/lib/code-highlighter";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { usePackageManager, transformCommandForPm, type PackageManager } from "@/hooks/use-package-manager";
import { cn } from "@/lib/cn";

interface CodeBlockProps {
  code: string | (() => string);
  lang?: string;
  isCli?: boolean;
  showPmSwitcher?: boolean;
  managers?: string[];
  filename?: string;
  class?: string;
}

export const CodeBlock: Component<CodeBlockProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "code",
    "lang",
    "isCli",
    "showPmSwitcher",
    "managers",
    "filename",
    "class",
  ]);

  const { copied, copy } = createClipboard({ timeout: 2000 });
  const { activePm, setPm } = usePackageManager();

  const defaultManagers = ["bunx", "npx", "pnpm", "yarn"];
  const managersList = () => local.managers || defaultManagers;

  const cleanCode = createMemo(() => {
    const raw =
      typeof local.code === "function"
        ? (local.code as () => string)()
        : local.code;
    const trimmed = (raw || "").trim();

    if (local.isCli) {
      return transformCommandForPm(trimmed, activePm());
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

  const hasHeader = () =>
    Boolean(shouldShowSwitcher() || local.filename || local.lang);

  return (
    <div
      class={cn(
        "group relative my-4 w-full overflow-hidden rounded-lg border border-border bg-muted/40 font-mono text-sm shadow-2xs",
        local.class
      )}
      {...rest}
    >
      {/* Header Bar */}
      <Show when={hasHeader()}>
        <div class="flex h-9 items-center justify-between border-b border-border/70 bg-muted/70 px-3.5 text-xs text-muted-foreground select-none">
          <div class="flex items-center gap-2">
            <Show when={shouldShowSwitcher()}>
              <div class="inline-flex items-center gap-0.5 rounded-md border border-border/50 bg-background/60 p-0.5 font-mono select-none">
                <For each={managersList()}>
                  {(pm) => (
                    <button
                      type="button"
                      onClick={() => setPm(pm as PackageManager)}
                      class={cn(
                        "rounded-xs px-2 py-0.5 text-[11px] font-mono transition-colors cursor-pointer",
                        activePm() === pm
                          ? "bg-primary text-primary-foreground font-semibold shadow-2xs"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {pm}
                    </button>
                  )}
                </For>
              </div>
            </Show>

            <Show when={local.filename}>
              <span class="font-medium text-foreground tracking-tight">{local.filename}</span>
            </Show>

            <Show when={local.lang && !shouldShowSwitcher() && !local.filename}>
              <span class="uppercase tracking-wider text-[11px] font-semibold opacity-70">
                {local.lang}
              </span>
            </Show>
          </div>

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
        </div>
      </Show>

      {/* Floating Copy Button (if no header bar is present) */}
      <Show when={!hasHeader()}>
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

      {/* Code Content */}
      <div class="overflow-x-auto p-4 text-[13px] leading-relaxed [scrollbar-width:thin]">
        <div
          class="font-mono text-sm leading-relaxed overflow-x-auto [&>pre]:!bg-transparent [&>pre]:!p-0 [&>pre]:!m-0 [&>pre]:!border-none"
          innerHTML={highlightedHtml()}
        />
      </div>
    </div>
  );
};