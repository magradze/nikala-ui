import { For } from "solid-js";
import { PLAYGROUND_COMPONENTS } from "@/config/playground";

interface PlaygroundSidebarProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

export function PlaygroundSidebar(props: PlaygroundSidebarProps) {
  return (
    <aside class="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block overflow-y-auto border-r border-border/40 py-6 pr-4">
      <div class="space-y-6">
        <div class="space-y-2">
          <h4 class="px-2 text-xs font-semibold text-foreground tracking-wider uppercase">
            Components ({PLAYGROUND_COMPONENTS.length})
          </h4>
          <div class="space-y-1">
            <For each={PLAYGROUND_COMPONENTS}>
              {(comp) => {
                const isActive = () => props.selectedId === comp.id;
                return (
                  <button
                    type="button"
                    onClick={() => props.onSelect(comp.id)}
                    class={`flex h-8 w-full items-center rounded-md px-2 text-sm font-medium transition-colors text-left cursor-pointer ${isActive()
                      ? "bg-primary text-primary-foreground font-bold shadow-2xs"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      }`}
                  >
                    {comp.name}
                  </button>
                );
              }}
            </For>
          </div>
        </div>
      </div>
    </aside>
  );
}