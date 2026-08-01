import { DocApiTableProps } from "@/types";
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
      {/* Header Badge */}
      <Show when={local.title}>
        <div class="flex items-center gap-2">
          <h3 class="text-base font-semibold tracking-tight text-foreground">
            {local.title}
          </h3>
          <span class="inline-flex items-center rounded-md border border-border px-1.5 py-0.5 text-[10px] font-mono font-medium text-muted-foreground select-none">
            Props
          </span>
        </div>
      </Show>

      <Show when={local.description}>
        <p class="text-xs text-muted-foreground">{local.description}</p>
      </Show>

      {/* Responsive Props Table */}
      <div class="w-full overflow-x-auto rounded-lg border border-border bg-card/50 shadow-2xs">
        <table class="w-full text-left text-xs">
          <thead class="border-b border-border/60 bg-muted/40 font-mono text-[11px] uppercase tracking-wider text-muted-foreground select-none">
            <tr>
              <th class="px-4 py-2.5 font-semibold">Prop</th>
              <th class="px-4 py-2.5 font-semibold">Type</th>
              <th class="px-4 py-2.5 font-semibold">Default</th>
              <th class="px-4 py-2.5 font-semibold">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border/40 font-mono text-xs">
            <For each={local.items}>
              {(item) => (
                <tr class="hover:bg-muted/20 transition-colors">
                  <td class="px-4 py-3 font-semibold text-primary">
                    <span class="inline-flex items-center gap-1">
                      {item.prop}
                      <Show when={item.required}>
                        <span class="text-rose-500 font-bold">*</span>
                      </Show>
                    </span>
                  </td>
                  <td class="px-4 py-3 text-muted-foreground">
                    <code class="bg-muted px-1.5 py-0.5 rounded text-[11px] text-foreground font-mono">
                      {item.type}
                    </code>
                  </td>
                  <td class="px-4 py-3 text-muted-foreground">
                    <Show
                      when={item.default}
                      fallback={<span class="text-muted-foreground/40">-</span>}
                    >
                      <code class="bg-muted/60 px-1 py-0.5 rounded text-[11px] font-mono">
                        {item.default}
                      </code>
                    </Show>
                  </td>
                  <td class="px-4 py-3 font-sans text-muted-foreground leading-relaxed font-normal">
                    {item.description}
                  </td>
                </tr>
              )}
            </For>
          </tbody>
        </table>
      </div>
    </div>
  );
};