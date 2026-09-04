import {
  splitProps,
  createSignal,
  createMemo,
  Show,
  For,
  type JSX,
} from "solid-js";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  Container,
  Pager,
  PagerLink,
  Callout,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CodeBlock,
  CodeGroup,
  CodeGroupList,
  CodeGroupTrigger,
  CodeGroupContent,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Steps,
  Step,
  FileTree,
  FileTreeFolder,
  FileTreeFile,
  Button,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@nikala-ui/core";
import { Copy, Check } from "lucide-solid";
import { createClipboard } from "@nikala-ui/hooks";

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

export function MdxH1(props: JSX.HTMLAttributes<HTMLHeadingElement>) {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <h1
      class={cn("text-3xl font-bold tracking-tight text-foreground mb-4", local.class)}
      {...others}
    >
      {local.children}
    </h1>
  );
}

export function MdxH2(props: JSX.HTMLAttributes<HTMLHeadingElement>) {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <h2
      class={cn(
        "text-xl font-bold tracking-tight text-foreground mt-8 mb-4 border-b border-border pb-2 group flex items-center justify-between",
        local.class
      )}
      {...others}
    >
      {local.children}
    </h2>
  );
}

export function MdxH3(props: JSX.HTMLAttributes<HTMLHeadingElement>) {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <h3
      class={cn("text-base font-semibold tracking-tight text-foreground mt-6 mb-3", local.class)}
      {...others}
    >
      {local.children}
    </h3>
  );
}

export function MdxP(props: JSX.HTMLAttributes<HTMLParagraphElement>) {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <p
      class={cn("text-sm text-muted-foreground leading-relaxed my-3", local.class)}
      {...others}
    >
      {local.children}
    </p>
  );
}

export function MdxUl(props: JSX.HTMLAttributes<HTMLUListElement>) {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <ul
      class={cn("my-4 ml-6 list-disc [&>li]:mt-1.5 text-sm text-muted-foreground", local.class)}
      {...others}
    >
      {local.children}
    </ul>
  );
}

export function MdxOl(props: JSX.HTMLAttributes<HTMLOListElement>) {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <ol
      class={cn("my-4 ml-6 list-decimal [&>li]:mt-1.5 text-sm text-muted-foreground", local.class)}
      {...others}
    >
      {local.children}
    </ol>
  );
}

export function MdxLi(props: JSX.HTMLAttributes<HTMLLIElement>) {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <li class={cn("leading-relaxed", local.class)} {...others}>
      {local.children}
    </li>
  );
}

export function MdxA(props: JSX.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <a
      class={cn(
        "font-medium text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors",
        local.class
      )}
      {...others}
    >
      {local.children}
    </a>
  );
}

export function MdxBlockquote(props: JSX.HTMLAttributes<HTMLQuoteElement>) {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <blockquote
      class={cn(
        "my-4 border-l-2 border-border pl-4 italic text-sm text-muted-foreground",
        local.class
      )}
      {...others}
    >
      {local.children}
    </blockquote>
  );
}

export function MdxTable(props: JSX.HTMLAttributes<HTMLTableElement>) {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <div class="my-6 w-full overflow-y-auto rounded-lg border border-border">
      <table class={cn("w-full caption-bottom text-sm text-left", local.class)} {...others}>
        {local.children}
      </table>
    </div>
  );
}

export function MdxTh(props: JSX.HTMLAttributes<HTMLTableCellElement>) {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <th
      class={cn(
        "h-9 px-3 text-left align-middle font-medium text-muted-foreground border-b border-border bg-muted/40 text-xs uppercase tracking-wider",
        local.class
      )}
      {...others}
    >
      {local.children}
    </th>
  );
}

export function MdxTd(props: JSX.HTMLAttributes<HTMLTableCellElement>) {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <td
      class={cn("p-3 align-middle text-sm border-b border-border last:border-0", local.class)}
      {...others}
    >
      {local.children}
    </td>
  );
}

export function MdxHr(props: JSX.HTMLAttributes<HTMLHRElement>) {
  const [local, others] = splitProps(props, ["class"]);
  return <hr class={cn("my-8 border-border", local.class)} {...others} />;
}

export function MdxCode(props: JSX.HTMLAttributes<HTMLElement>) {
  const [local, others] = splitProps(props, ["class", "children"]);
  const isInline = () => {
    const cls = local.class || "";
    return !cls.includes("language-") && !cls.includes("shiki");
  };

  return (
    <code
      class={cn(
        isInline()
          ? "rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground font-normal border border-border/50"
          : "font-mono text-xs",
        local.class
      )}
      {...others}
    >
      {local.children}
    </code>
  );
}

export function MdxH4(props: JSX.HTMLAttributes<HTMLHeadingElement>) {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <h4
      class={cn("text-base font-semibold tracking-tight text-foreground mt-4 mb-2", local.class)}
      {...others}
    >
      {local.children}
    </h4>
  );
}

export function MdxH5(props: JSX.HTMLAttributes<HTMLHeadingElement>) {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <h5
      class={cn("text-sm font-semibold tracking-tight text-foreground mt-3 mb-1", local.class)}
      {...others}
    >
      {local.children}
    </h5>
  );
}

export function MdxH6(props: JSX.HTMLAttributes<HTMLHeadingElement>) {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <h6
      class={cn("text-xs font-semibold tracking-tight text-muted-foreground mt-2 mb-1", local.class)}
      {...others}
    >
      {local.children}
    </h6>
  );
}

export function MdxStrong(props: JSX.HTMLAttributes<HTMLElement>) {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <strong class={cn("font-semibold text-foreground", local.class)} {...others}>
      {local.children}
    </strong>
  );
}

export function MdxEm(props: JSX.HTMLAttributes<HTMLElement>) {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <em class={cn("italic", local.class)} {...others}>
      {local.children}
    </em>
  );
}

export function MdxDel(props: JSX.HTMLAttributes<HTMLModElement>) {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <del class={cn("line-through opacity-70", local.class)} {...others}>
      {local.children}
    </del>
  );
}

type PmKind = "install" | "runner" | "none";

function detectPmKind(code: string, lang?: string): PmKind {
  const l = (lang || "").toLowerCase();
  if (l && l !== "bash" && l !== "sh" && l !== "shell" && l !== "zsh") {
    return "none";
  }
  const trimmed = code.trim();
  if (/^(?:bun|npm|pnpm|yarn)\s+(?:install|i|add)(?:\s+.*)?$/.test(trimmed)) {
    return "install";
  }
  if (/^(?:bunx|npx|pnpm dlx|yarn dlx)\s+/.test(trimmed)) {
    return "runner";
  }
  return "none";
}

function transformInstall(cmd: string, pm: "bun" | "pnpm" | "npm" | "yarn"): string {
  const trimmed = cmd.trim();
  const isBare = /^(?:bun|npm|pnpm|yarn)\s+(?:install|i)$/.test(trimmed);
  if (isBare) {
    if (pm === "npm") return "npm install";
    if (pm === "pnpm") return "pnpm install";
    if (pm === "yarn") return "yarn install";
    return "bun install";
  }
  const match = trimmed.match(/^(?:bun|npm|pnpm|yarn)\s+(?:add|install|i)\s+(.+)$/);
  const pkg = match ? match[1] : "";
  if (pm === "npm") return `npm install ${pkg}`.trim();
  if (pm === "pnpm") return `pnpm add ${pkg}`.trim();
  if (pm === "yarn") return `yarn add ${pkg}`.trim();
  return `bun add ${pkg}`.trim();
}

function transformRunner(cmd: string, pm: "bunx" | "npx" | "pnpm" | "yarn"): string {
  const trimmed = cmd.trim();
  const runners = ["bunx", "npx", "pnpm dlx", "pnpm", "yarn dlx", "yarn"];
  let base = trimmed;
  for (const r of runners) {
    if (trimmed.startsWith(r)) {
      base = trimmed.slice(r.length).trim();
      break;
    }
  }
  switch (pm) {
    case "bunx":
      return `bunx ${base}`;
    case "npx":
      return `npx ${base}`;
    case "pnpm":
      return `pnpm dlx ${base}`;
    case "yarn":
      return `yarn dlx ${base}`;
    default:
      return `${pm} ${base}`;
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function highlightCli(code: string): string {
  const lines = code.trim().split("\n");
  return lines
    .map((line) => {
      const trimmed = line.trim();
      if (!trimmed) return "";
      if (trimmed.startsWith("#")) {
        return `<span class="text-muted-foreground/70 italic">${escapeHtml(line)}</span>`;
      }

      let prefix = "";
      let cmdLine = line;
      const promptMatch = line.match(/^(\s*[$>]\s+)(.*)$/);
      if (promptMatch) {
        prefix = `<span class="text-muted-foreground/50 select-none">${escapeHtml(promptMatch[1])}</span>`;
        cmdLine = promptMatch[2];
      }

      const tokens = cmdLine.split(/(\s+|&&|\|\||\||;)/).filter(Boolean);
      let isFirstWordAfterBoundary = true;

      const highlightedTokens = tokens.map((part) => {
        if (/^\s+$/.test(part)) return part;

        if (["&&", "||", "|", ";"].includes(part)) {
          isFirstWordAfterBoundary = true;
          return `<span class="text-amber-400/80 font-bold">${escapeHtml(part)}</span>`;
        }

        if (part.startsWith("#")) {
          return `<span class="text-muted-foreground/70 italic">${escapeHtml(part)}</span>`;
        }

        if (part.startsWith("-")) {
          return `<span class="text-purple-400 dark:text-purple-300">${escapeHtml(part)}</span>`;
        }

        if (
          part.startsWith("@") ||
          part.startsWith("./") ||
          part.startsWith("../") ||
          part.startsWith("/") ||
          part.startsWith("~/")
        ) {
          return `<span class="text-emerald-400 dark:text-emerald-300 font-medium">${escapeHtml(part)}</span>`;
        }

        if (
          (part.startsWith('"') && part.endsWith('"')) ||
          (part.startsWith("'") && part.endsWith("'"))
        ) {
          return `<span class="text-emerald-400 dark:text-emerald-300">${escapeHtml(part)}</span>`;
        }

        if (isFirstWordAfterBoundary) {
          isFirstWordAfterBoundary = false;
          return `<span class="text-amber-500 dark:text-amber-400 font-bold">${escapeHtml(part)}</span>`;
        }

        const commonVerbs = [
          "app", "build", "run", "install", "i", "add", "remove", "rm", "init", "create",
          "dev", "test", "start", "push", "pull", "commit", "checkout", "branch", "merge",
          "clone", "status", "diff", "config", "release", "generate", "gen", "migrate",
          "serve", "exec", "login", "logout", "publish", "format", "fmt", "lint", "check",
          "package", "deploy", "clean", "update", "upgrade"
        ];
        if (commonVerbs.includes(part.toLowerCase())) {
          return `<span class="text-sky-500 dark:text-sky-400 font-medium">${escapeHtml(part)}</span>`;
        }

        return `<span class="text-foreground/90">${escapeHtml(part)}</span>`;
      });

      return prefix + highlightedTokens.join("");
    })
    .join("\n");
}

export function MdxPre(props: any) {
  const [local, others] = splitProps(props, [
    "class",
    "className",
    "children",
    "data-code",
    "data-lang",
  ]);

  let preRef: HTMLPreElement | undefined;

  const rawCode = () => {
    if (local["data-code"]) return local["data-code"] as string;
    return preRef?.textContent || "";
  };

  const lang = () => (local["data-lang"] as string) || "";
  const pmKind = () => detectPmKind(rawCode(), lang());
  const isBash = () => {
    const l = (lang() || "").toLowerCase();
    return l === "bash" || l === "sh" || l === "shell" || l === "zsh";
  };
  const shouldUseCliHighlight = () => isBash() || pmKind() !== "none";
  const preClass = () => local.class || local.className || "";

  const [activeInstallPm, setActiveInstallPm] = createSignal<"bun" | "pnpm" | "npm" | "yarn">("bun");
  const [activeRunnerPm, setActiveRunnerPm] = createSignal<"bunx" | "npx" | "pnpm" | "yarn">("bunx");

  const activeCode = createMemo(() => {
    const raw = rawCode().trim();
    const kind = pmKind();
    if (kind === "install") {
      return transformInstall(raw, activeInstallPm());
    }
    if (kind === "runner") {
      return transformRunner(raw, activeRunnerPm());
    }
    return raw;
  });

  const clipboard = createClipboard();

  const handleCopy = async () => {
    const text = activeCode() || rawCode();
    if (text) {
      await clipboard.copy(text);
    }
  };

  const hasHeader = () => pmKind() !== "none" || Boolean(lang());

  return (
    <div class="group relative my-4 w-full overflow-hidden rounded-lg border border-border bg-muted/40 font-mono text-sm shadow-2xs">
      {/* Header Bar */}
      <Show when={hasHeader()}>
        <div class="flex h-9 items-center justify-between border-b border-border/70 bg-muted/70 px-3.5 text-xs text-muted-foreground select-none">
          <div class="flex items-center gap-2">
            {/* Install PM Tabs */}
            <Show when={pmKind() === "install"}>
              <Tabs
                value={activeInstallPm()}
                onChange={(val) => setActiveInstallPm(val as any)}
                class="w-auto flex-none"
              >
                <TabsList class="w-auto inline-flex h-auto bg-background/60 p-0.5 border border-border/50 gap-0.5 rounded-md font-mono">
                  <For each={["bun", "pnpm", "npm", "yarn"] as const}>
                    {(pm) => (
                      <TabsTrigger
                        value={pm}
                        class="rounded-xs px-2 py-0.5 text-[11px] font-mono transition-colors cursor-pointer data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:font-semibold data-[state=active]:shadow-2xs"
                      >
                        {pm}
                      </TabsTrigger>
                    )}
                  </For>
                </TabsList>
              </Tabs>
            </Show>

            {/* Runner PM Tabs */}
            <Show when={pmKind() === "runner"}>
              <Tabs
                value={activeRunnerPm()}
                onChange={(val) => setActiveRunnerPm(val as any)}
                class="w-auto flex-none"
              >
                <TabsList class="w-auto inline-flex h-auto bg-background/60 p-0.5 border border-border/50 gap-0.5 rounded-md font-mono">
                  <For each={["bunx", "npx", "pnpm", "yarn"] as const}>
                    {(pm) => (
                      <TabsTrigger
                        value={pm}
                        class="rounded-xs px-2 py-0.5 text-[11px] font-mono transition-colors cursor-pointer data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:font-semibold data-[state=active]:shadow-2xs"
                      >
                        {pm}
                      </TabsTrigger>
                    )}
                  </For>
                </TabsList>
              </Tabs>
            </Show>

            {/* Language Badge */}
            <Show when={pmKind() === "none" && lang()}>
              <Badge variant="outline" class="uppercase text-[10px] px-1.5 py-0 h-4 font-mono font-semibold">
                {lang()}
              </Badge>
            </Show>
          </div>

          {/* Copy Button */}
          <Tooltip>
            <TooltipTrigger
              as={Button}
              variant="ghost"
              size="icon"
              onClick={handleCopy}
              aria-label={clipboard.copied() ? "Copied code" : "Copy code"}
              class="size-6 p-0 rounded-xs text-muted-foreground hover:bg-background hover:text-foreground cursor-pointer"
            >
              <Show when={clipboard.copied()} fallback={<Copy class="size-3.5" />}>
                <Check class="size-3.5 text-emerald-500 dark:text-emerald-400" />
              </Show>
            </TooltipTrigger>
            <TooltipContent class="text-[10px] py-1 px-2">
              {clipboard.copied() ? "Copied!" : "Copy code"}
            </TooltipContent>
          </Tooltip>
        </div>
      </Show>

      {/* Floating Copy Button if no header */}
      <Show when={!hasHeader()}>
        <div class="absolute right-2.5 top-2.5 z-10 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
          <Tooltip>
            <TooltipTrigger
              as={Button}
              variant="outline"
              size="icon"
              onClick={handleCopy}
              aria-label={clipboard.copied() ? "Copied code" : "Copy code"}
              class="size-7 rounded-md border-border/80 bg-background/90 text-muted-foreground backdrop-blur-xs hover:bg-muted hover:text-foreground cursor-pointer shadow-2xs"
            >
              <Show when={clipboard.copied()} fallback={<Copy class="size-3.5" />}>
                <Check class="size-3.5 text-emerald-500 dark:text-emerald-400" />
              </Show>
            </TooltipTrigger>
            <TooltipContent class="text-[10px] py-1 px-2">
              {clipboard.copied() ? "Copied!" : "Copy code"}
            </TooltipContent>
          </Tooltip>
        </div>
      </Show>

      {/* Code Container */}
      <div class="overflow-x-auto p-4 text-[13px] leading-relaxed [scrollbar-width:thin]">
        <Show
          when={shouldUseCliHighlight()}
          fallback={
            <pre
              ref={preRef}
              data-lang={lang()}
              data-code={rawCode()}
              class={cn(
                "font-mono text-xs overflow-x-auto bg-transparent p-0 m-0 border-none",
                preClass()
              )}
              {...others}
            >
              {local.children}
            </pre>
          }
        >
          <div
            class="font-mono text-xs leading-relaxed whitespace-pre"
            innerHTML={highlightCli(activeCode() || rawCode())}
          />
        </Show>
      </div>
    </div>
  );
}

export function MdxImg(props: JSX.ImgHTMLAttributes<HTMLImageElement>) {
  const [local, others] = splitProps(props, ["class"]);
  return <img class={cn("rounded-lg border border-border max-w-full my-4", local.class)} {...others} />;
}

export function MdxThead(props: JSX.HTMLAttributes<HTMLTableSectionElement>) {
  const [local, others] = splitProps(props, ["class", "children"]);
  return <thead class={cn("[&_tr]:border-b", local.class)} {...others}>{local.children}</thead>;
}

export function MdxTbody(props: JSX.HTMLAttributes<HTMLTableSectionElement>) {
  const [local, others] = splitProps(props, ["class", "children"]);
  return <tbody class={cn("[&_tr:last-child]:border-0", local.class)} {...others}>{local.children}</tbody>;
}

export function MdxTr(props: JSX.HTMLAttributes<HTMLTableRowElement>) {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <tr class={cn("border-b border-border transition-colors hover:bg-muted/50", local.class)} {...others}>
      {local.children}
    </tr>
  );
}

export function MdxSup(props: JSX.HTMLAttributes<HTMLElement>) {
  const [local, others] = splitProps(props, ["class", "children"]);
  return <sup class={cn("text-xs", local.class)} {...others}>{local.children}</sup>;
}

export function MdxSub(props: JSX.HTMLAttributes<HTMLElement>) {
  const [local, others] = splitProps(props, ["class", "children"]);
  return <sub class={cn("text-xs", local.class)} {...others}>{local.children}</sub>;
}

export function MdxSpan(props: JSX.HTMLAttributes<HTMLSpanElement>) {
  const [local, others] = splitProps(props, ["children"]);
  return <span {...others}>{local.children}</span>;
}

export function MdxDiv(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const [local, others] = splitProps(props, ["children"]);
  return <div {...others}>{local.children}</div>;
}

export function MdxSection(props: JSX.HTMLAttributes<HTMLElement>) {
  const [local, others] = splitProps(props, ["children"]);
  return <section {...others}>{local.children}</section>;
}

export const defaultMdxComponents = {
  h1: MdxH1,
  h2: MdxH2,
  h3: MdxH3,
  h4: MdxH4,
  h5: MdxH5,
  h6: MdxH6,
  p: MdxP,
  ul: MdxUl,
  ol: MdxOl,
  li: MdxLi,
  a: MdxA,
  blockquote: MdxBlockquote,
  table: MdxTable,
  thead: MdxThead,
  tbody: MdxTbody,
  tr: MdxTr,
  th: MdxTh,
  td: MdxTd,
  hr: MdxHr,
  code: MdxCode,
  pre: MdxPre,
  span: MdxSpan,
  div: MdxDiv,
  section: MdxSection,
  strong: MdxStrong,
  b: MdxStrong,
  em: MdxEm,
  i: MdxEm,
  del: MdxDel,
  s: MdxDel,
  img: MdxImg,
  sup: MdxSup,
  sub: MdxSub,
  // Nikala UI Components
  Container,
  Pager,
  PagerLink,
  Callout,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CodeBlock,
  CodeGroup,
  CodeGroupList,
  CodeGroupTrigger,
  CodeGroupContent,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Steps,
  Step,
  FileTree,
  FileTreeFolder,
  FileTreeFile,
};
