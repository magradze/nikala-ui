import { DocApiTableProps } from "@/types";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { For, Show, splitProps, type Component, type JSX } from "solid-js";

export const DocApiTable: Component<DocApiTableProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "title",
    "description",
    "items",
    "class",
  ]);

  return (
    <div class={`space-y-3 ${local.class || ""}`} {...rest}>
      {/* Header */}
      <Show when={local.title}>
        <SectionHeading
          variant="compact"
          title={local.title!}
          badge="Props"
          description={local.description}
        />
      </Show>

      {/* Props Table */}
      <div class="w-full overflow-x-auto rounded-lg border border-border bg-card/50 shadow-2xs">
        <Table class="text-xs">
          <TableHeader class="bg-muted/40 font-mono text-[11px] uppercase tracking-wider text-muted-foreground select-none">
            <TableRow class="hover:bg-transparent">
              <TableHead class="h-9 px-4 font-semibold">Prop</TableHead>
              <TableHead class="h-9 px-4 font-semibold">Type</TableHead>
              <TableHead class="h-9 px-4 font-semibold">Default</TableHead>
              <TableHead class="h-9 px-4 font-semibold">Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody class="font-mono text-xs">
            <For each={local.items}>
              {(item) => (
                <TableRow class="transition-colors hover:bg-muted/20">
                  <TableCell class="px-4 py-3 font-semibold text-primary">
                    <span class="inline-flex items-center gap-1">
                      {item.prop}
                      <Show when={item.required}>
                        <span class="text-rose-500 font-bold">*</span>
                      </Show>
                    </span>
                  </TableCell>
                  <TableCell class="px-4 py-3 text-muted-foreground">
                    <code class="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[11px] text-foreground">
                      {item.type}
                    </code>
                  </TableCell>
                  <TableCell class="px-4 py-3 text-muted-foreground">
                    <Show
                      when={item.default}
                      fallback={<span class="text-muted-foreground/40 font-mono">-</span>}
                    >
                      <code class="rounded-md bg-muted/60 px-1 py-0.5 font-mono text-[11px]">
                        {item.default}
                      </code>
                    </Show>
                  </TableCell>
                  <TableCell class="px-4 py-3 font-sans font-normal leading-relaxed text-muted-foreground">
                    {item.description}
                  </TableCell>
                </TableRow>
              )}
            </For>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};