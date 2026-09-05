import { createSignal, splitProps, type Component } from "solid-js";
import { Collapsible, CollapsibleContent, CollapsibleTrigger, cn } from "@nikala-ui/core";
import { ChevronDown } from "lucide-solid";
import { DocsTableOfContents } from "../content/table-of-contents.jsx";
import type { DocsTableOfContentsProps } from "../../types.js";

export const DocsMobileTableOfContents: Component<DocsTableOfContentsProps> = (props) => {
  const [local, rest] = splitProps(props, ["items", "title", "class"]);
  const [open, setOpen] = createSignal(false);
  const title = () => local.title ?? "On this page";

  return (
    <Collapsible open={open()} onOpenChange={setOpen} class={cn("xl:hidden rounded-md border border-border bg-card", local.class)}>
      <CollapsibleTrigger
        type="button"
        aria-label={title()}
        class="flex min-h-10 items-center justify-between px-3 py-2 text-sm font-medium text-foreground"
      >
        <span>{title()}</span>
        <ChevronDown class={cn("size-4 text-muted-foreground transition-transform", open() && "rotate-180")} />
      </CollapsibleTrigger>
      <CollapsibleContent class="border-t border-border px-3 py-2">
        <DocsTableOfContents items={local.items} title={title()} class="max-h-56 overflow-y-auto" {...rest} />
      </CollapsibleContent>
    </Collapsible>
  );
};
