import { A, useLocation } from "@solidjs/router";
import { type Component, For, createSignal, createEffect } from "solid-js";
import { createScrollIntoView } from "@nikala-ui/hooks";
import {
  HOOKS_SIDEBAR_NAVIGATION,
  COMPONENTS_SIDEBAR_NAVIGATION,
} from "@/config/docs";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-solid";

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
    <aside class="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block overflow-y-auto border-r border-border/40 py-6 px-2 bg-background">
      <nav aria-label="Documentation Navigation" class="space-y-4">
        <For each={navigation()}>
          {(section) => {
            const isGettingStarted = section.title === "Getting Started";
            const hasActiveItem = () => section.items.some((item) => location.pathname === item.href);

            const [isOpen, setIsOpen] = createSignal(hasActiveItem());

            // Dynamically open category when user navigates via Command palette or direct URL
            createEffect(() => {
              if (hasActiveItem()) {
                setIsOpen(true);
              }
            });

            if (isGettingStarted) {
              return (
                <div class="space-y-1">
                  <h4 class="px-2 py-1 text-xs font-bold text-foreground tracking-wider uppercase">
                    {section.title}
                  </h4>
                  <div class="space-y-0.5">
                    <For each={section.items}>
                      {(item) => {
                        const isActive = () => location.pathname === item.href;
                        return (
                          <A
                            href={item.href}
                            ref={(el) => {
                              if (typeof window !== "undefined" && isActive()) {
                                setActiveElement(el);
                              }
                            }}
                            class={`flex h-8 w-full items-center rounded-md px-2 text-sm font-medium transition-colors ${
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
              );
            }

            return (
              <Collapsible open={isOpen()} onOpenChange={setIsOpen} class="space-y-1">
                <CollapsibleTrigger class="group flex h-8 w-full items-center justify-between rounded-md px-2 text-xs font-semibold text-foreground tracking-wider uppercase hover:bg-accent/50 transition-colors">
                  <span>{section.title}</span>
                  <ChevronRight class="h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 group-data-[expanded]:rotate-90" />
                </CollapsibleTrigger>
                <CollapsibleContent class="space-y-0.5 pl-1 pt-1">
                  <For each={section.items}>
                    {(item) => {
                      const isActive = () => location.pathname === item.href;
                      return (
                        <A
                          href={item.href}
                          ref={(el) => {
                            if (typeof window !== "undefined" && isActive()) {
                              setActiveElement(el);
                            }
                          }}
                          class={`flex h-8 w-full items-center rounded-md px-2 text-sm font-medium transition-colors ${
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
                </CollapsibleContent>
              </Collapsible>
            );
          }}
        </For>
      </nav>
    </aside>
  );
};