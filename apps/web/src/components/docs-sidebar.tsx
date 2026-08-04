import { A, useLocation } from "@solidjs/router";
import { type Component, For, createSignal, createEffect } from "solid-js";
import { createScrollIntoView } from "@nikala-ui/hooks";
import {
  DOCS_SIDEBAR_NAVIGATION,
  HOOKS_SIDEBAR_NAVIGATION,
  COMPONENTS_SIDEBAR_NAVIGATION,
} from "@/config/docs";

export const DocsSidebar: Component = () => {
  const location = useLocation();
  const [activeContext, setActiveContext] = createSignal<"hooks" | "components">("components");
  const [activeElement, setActiveElement] = createSignal<HTMLElement | null>(null);

  createEffect(() => {
    if (location.pathname.startsWith("/docs/hooks")) {
      setActiveContext("hooks");
    } else if (location.pathname.startsWith("/docs/components")) {
      setActiveContext("components");
    }
  });

  /* SolidJS Primitive for auto-scrolling active element into view */
  createScrollIntoView(activeElement, {
    behavior: "smooth",
    block: "nearest",
    delay: 50,
  });

  const navigation = () => {
    if (activeContext() === "hooks") {
      return HOOKS_SIDEBAR_NAVIGATION;
    }
    return COMPONENTS_SIDEBAR_NAVIGATION;
  };

  return (
    <aside class="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block overflow-y-auto border-r border-border/40 py-6 pr-4">
      <div class="space-y-6">
        <For each={navigation()}>
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
                        ref={(el) => {
                          if (isActive()) {
                            setActiveElement(el);
                          }
                        }}
                        class={`flex h-8 w-full items-center rounded-md px-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                          isActive()
                            ? "bg-primary text-primary-foreground font-bold shadow-2xs"
                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
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