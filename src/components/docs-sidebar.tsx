// src/components/docs-sidebar.tsx
import { A, useLocation } from "@solidjs/router";
import { type Component, For } from "solid-js";
import { DOCS_SIDEBAR_NAVIGATION } from "@/config/docs";

export const DocsSidebar: Component = () => {
  const location = useLocation();

  return (
    <aside class="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block overflow-y-auto border-r border-border/40 py-6 pr-4">
      <div class="space-y-6">
        <For each={DOCS_SIDEBAR_NAVIGATION}>
          {(section) => (
            <div class="space-y-2">
              <h4 class="px-2 text-xs font-semibold text-foreground tracking-wider uppercase">
                {section.title}
              </h4>
              <div class="space-y-1">
                <For each={section.items}>
                  {(item) => {
                    const isActive = () => location.pathname === item.href;
                    return (
                      <A
                        href={item.href}
                        class={`flex h-8 w-full items-center rounded-md px-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                          isActive()
                            ? "bg-accent text-accent-foreground font-semibold"
                            : "text-muted-foreground"
                        }`}
                      >
                        {item.title}
                      </A>
                    );
                  }}
                </For>
              </div>
            </div>
          )}
        </For>
      </div>
    </aside>
  );
};