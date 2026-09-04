// packages/docs/src/components/mdx-components.tsx
import { splitProps, type JSX } from "solid-js";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
  // If code is inside pre, let pre handle styling
  return (
    <code
      class={cn(
        "rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground font-normal border border-border/50",
        local.class
      )}
      {...others}
    >
      {local.children}
    </code>
  );
}

export const defaultMdxComponents = {
  h1: MdxH1,
  h2: MdxH2,
  h3: MdxH3,
  p: MdxP,
  ul: MdxUl,
  ol: MdxOl,
  li: MdxLi,
  a: MdxA,
  blockquote: MdxBlockquote,
  table: MdxTable,
  th: MdxTh,
  td: MdxTd,
  hr: MdxHr,
  code: MdxCode,
};
