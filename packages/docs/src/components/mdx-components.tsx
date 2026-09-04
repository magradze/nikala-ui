import { splitProps, type JSX } from "solid-js";
import { Plus } from "lucide-solid";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  Badge,
  Button,
  Callout,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CodeBlock,
  CodeGroup,
  CodeGroupContent,
  CodeGroupList,
  CodeGroupTrigger,
  Container,
  ComponentViewer,
  FileTree,
  FileTreeFile,
  FileTreeFolder,
  ApiTable,
  Pager,
  PagerLink,
  PackageManagerTabs,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Step,
  Steps,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@nikala-ui/core";

const cn = (...values: unknown[]) => twMerge(clsx(values));
type HtmlProps<T extends HTMLElement> = JSX.HTMLAttributes<T>;

// Native elements are kept for Markdown semantics and accessibility. Structured
// documentation UI is delegated to Nikala primitives below.
export function MdxH1(props: HtmlProps<HTMLHeadingElement>) {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return <h1 class={cn("text-3xl font-bold tracking-tight text-foreground mb-4", local.class)} {...rest}>{local.children}</h1>;
}
export function MdxH2(props: HtmlProps<HTMLHeadingElement>) {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return <h2 class={cn("text-xl font-bold tracking-tight text-foreground mt-8 mb-4 border-b border-border pb-2 group flex items-center justify-between", local.class)} {...rest}>{local.children}</h2>;
}
export function MdxH3(props: HtmlProps<HTMLHeadingElement>) {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return <h3 class={cn("text-base font-semibold tracking-tight text-foreground mt-6 mb-3", local.class)} {...rest}>{local.children}</h3>;
}
export function MdxH4(props: HtmlProps<HTMLHeadingElement>) {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return <h4 class={cn("text-base font-semibold tracking-tight text-foreground mt-4 mb-2", local.class)} {...rest}>{local.children}</h4>;
}
export function MdxH5(props: HtmlProps<HTMLHeadingElement>) {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return <h5 class={cn("text-sm font-semibold tracking-tight text-foreground mt-3 mb-1", local.class)} {...rest}>{local.children}</h5>;
}
export function MdxH6(props: HtmlProps<HTMLHeadingElement>) {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return <h6 class={cn("text-xs font-semibold tracking-tight text-muted-foreground mt-2 mb-1", local.class)} {...rest}>{local.children}</h6>;
}
export function MdxP(props: HtmlProps<HTMLParagraphElement>) {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return <p class={cn("text-sm text-muted-foreground leading-relaxed my-3", local.class)} {...rest}>{local.children}</p>;
}
export function MdxUl(props: HtmlProps<HTMLUListElement>) {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return <ul class={cn("my-4 ml-6 list-disc [&>li]:mt-1.5 text-sm text-muted-foreground", local.class)} {...rest}>{local.children}</ul>;
}
export function MdxOl(props: HtmlProps<HTMLOListElement>) {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return <ol class={cn("my-4 ml-6 list-decimal [&>li]:mt-1.5 text-sm text-muted-foreground", local.class)} {...rest}>{local.children}</ol>;
}
export function MdxLi(props: HtmlProps<HTMLLIElement>) {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return <li class={cn("leading-relaxed", local.class)} {...rest}>{local.children}</li>;
}
export function MdxA(props: JSX.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return <a class={cn("font-medium text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors", local.class)} {...rest}>{local.children}</a>;
}
export function MdxBlockquote(props: HtmlProps<HTMLQuoteElement>) {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return <blockquote class={cn("my-4 border-l-2 border-border pl-4 italic text-sm text-muted-foreground", local.class)} {...rest}>{local.children}</blockquote>;
}

export function MdxTable(props: HtmlProps<HTMLTableElement>) {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return <Table class={cn("my-6 w-full text-left", local.class)} {...rest}>{local.children}</Table>;
}
export function MdxThead(props: HtmlProps<HTMLTableSectionElement>) {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return <TableHeader class={cn("[&_tr]:border-b border-border", local.class)} {...rest}>{local.children}</TableHeader>;
}
export function MdxTbody(props: HtmlProps<HTMLTableSectionElement>) {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return <TableBody class={cn("[&_tr:last-child]:border-0", local.class)} {...rest}>{local.children}</TableBody>;
}
export function MdxTr(props: HtmlProps<HTMLTableRowElement>) {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return <TableRow class={cn("border-b border-border transition-colors hover:bg-muted/50", local.class)} {...rest}>{local.children}</TableRow>;
}
export function MdxTh(props: HtmlProps<HTMLTableCellElement>) {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return <TableHead class={cn("h-9 px-3 text-left align-middle font-medium text-muted-foreground border-b border-border bg-muted/40 text-xs uppercase tracking-wider", local.class)} {...rest}>{local.children}</TableHead>;
}
export function MdxTd(props: HtmlProps<HTMLTableCellElement>) {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return <TableCell class={cn("p-3 align-middle text-sm border-b border-border last:border-0", local.class)} {...rest}>{local.children}</TableCell>;
}
export function MdxHr(props: JSX.HTMLAttributes<HTMLHRElement>) {
  const [local, rest] = splitProps(props, ["class"]);
  return <hr class={cn("my-8 border-border", local.class)} {...rest} />;
}
export function MdxCode(props: HtmlProps<HTMLElement>) {
  const [local, rest] = splitProps(props, ["class", "children"]);
  const inline = () => !String(local.class || "").includes("language-") && !String(local.class || "").includes("shiki");
  return <code class={cn(inline() ? "rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground font-normal border border-border/50" : "font-mono text-xs", local.class)} {...rest}>{local.children}</code>;
}

function isPackageCommand(code: string, language: string) {
  return /^(bash|sh|shell|zsh)$/i.test(language) && !code.includes("\n") && /^(bun|npm|pnpm|yarn|bunx|npx)\s+/.test(code.trim());
}

/** Preserve Shiki's server-rendered children while using Nikala's code chrome. */
export function MdxPre(props: any) {
  const [local, rest] = splitProps(props, ["class", "className", "children", "data-code", "data-lang"]);
  const code = String(local["data-code"] || "").trim();
  const language = String(local["data-lang"] || "text");
  if (isPackageCommand(code, language)) return <PackageManagerTabs command={code} />;

  return (
    <CodeBlock code={code} language={language} class={cn(local.class || local.className)} {...rest}>
      {local.children}
    </CodeBlock>
  );
}

export function MdxImg(props: JSX.ImgHTMLAttributes<HTMLImageElement>) {
  const [local, rest] = splitProps(props, ["class"]);
  return <img class={cn("my-4 max-w-full rounded-lg border border-border", local.class)} {...rest} />;
}
export function MdxSup(props: HtmlProps<HTMLElement>) { const [local, rest] = splitProps(props, ["class", "children"]); return <sup class={cn("text-xs", local.class)} {...rest}>{local.children}</sup>; }
export function MdxSub(props: HtmlProps<HTMLElement>) { const [local, rest] = splitProps(props, ["class", "children"]); return <sub class={cn("text-xs", local.class)} {...rest}>{local.children}</sub>; }
export function MdxSpan(props: HtmlProps<HTMLSpanElement>) { const [local, rest] = splitProps(props, ["children"]); return <span {...rest}>{local.children}</span>; }
export function MdxDiv(props: HtmlProps<HTMLDivElement>) { const [local, rest] = splitProps(props, ["children"]); return <div {...rest}>{local.children}</div>; }
export function MdxSection(props: HtmlProps<HTMLElement>) { const [local, rest] = splitProps(props, ["children"]); return <section {...rest}>{local.children}</section>; }

export const defaultMdxComponents = {
  h1: MdxH1, h2: MdxH2, h3: MdxH3, h4: MdxH4, h5: MdxH5, h6: MdxH6,
  p: MdxP, ul: MdxUl, ol: MdxOl, li: MdxLi, a: MdxA, blockquote: MdxBlockquote,
  table: MdxTable, thead: MdxThead, tbody: MdxTbody, tr: MdxTr, th: MdxTh, td: MdxTd,
  hr: MdxHr, code: MdxCode, pre: MdxPre, span: MdxSpan, div: MdxDiv, section: MdxSection,
  strong: (props: HtmlProps<HTMLElement>) => <strong {...props} class="font-semibold text-foreground" />,
  b: (props: HtmlProps<HTMLElement>) => <strong {...props} class="font-semibold text-foreground" />,
  em: (props: HtmlProps<HTMLElement>) => <em {...props} class="italic" />,
  i: (props: HtmlProps<HTMLElement>) => <em {...props} class="italic" />,
  del: (props: HtmlProps<HTMLModElement>) => <del {...props} class="line-through opacity-70" />,
  s: (props: HtmlProps<HTMLModElement>) => <del {...props} class="line-through opacity-70" />,
  img: MdxImg, sup: MdxSup, sub: MdxSub,
  Container, Pager, PagerLink, Callout, Badge, Button, Plus, ComponentViewer, ApiTable,
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
  CodeBlock, CodeGroup, CodeGroupList, CodeGroupTrigger, CodeGroupContent,
  Tabs, TabsList, TabsTrigger, TabsContent, PackageManagerTabs,
  Steps, Step, FileTree, FileTreeFolder, FileTreeFile,
};
