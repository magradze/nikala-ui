import { A, useLocation } from "@solidjs/router";
import { type Component, For } from "solid-js";

interface NavItem {
  title: string;
  href: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navigation: NavSection[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "CLI Reference", href: "/docs/cli" },
      { title: "Theming", href: "/docs/theming" },
    ],
  },
  {
    title: "Components",
    items: [
      { title: "Accordion", href: "/docs/components/accordion" },
      { title: "Alert", href: "/docs/components/alert" },
      { title: "Avatar", href: "/docs/components/avatar" },
      { title: "Banner", href: "/docs/components/banner" },
      { title: "Badge", href: "/docs/components/badge" },
      { title: "Breadcrumb", href: "/docs/components/breadcrumb" },
      { title: "Button", href: "/docs/components/button" },
      { title: "Card", href: "/docs/components/card" },
      { title: "Checkbox", href: "/docs/components/checkbox" },
      { title: "Command", href: "/docs/components/command" },
      { title: "Dialog", href: "/docs/components/dialog" },
      { title: "Dropdown Menu", href: "/docs/components/dropdown-menu" },
      { title: "Input", href: "/docs/components/input" },
      { title: "Input Group", href: "/docs/components/input-group" },
      { title: "Kbd", href: "/docs/components/kbd" },
      { title: "Label", href: "/docs/components/label" },
      { title: "List", href: "/docs/components/list" },
      { title: "Radio Group", href: "/docs/components/radio-group" },
      { title: "Select", href: "/docs/components/select" },
      { title: "Separator", href: "/docs/components/separator" },
      { title: "Sheet", href: "/docs/components/sheet" },
      { title: "Skeleton", href: "/docs/components/skeleton" },
      { title: "Switch", href: "/docs/components/switch" },
      { title: "Tabs", href: "/docs/components/tabs" },
      { title: "Textarea", href: "/docs/components/textarea" },
      { title: "Theme Manager", href: "/docs/components/theme-manager" },
    ],
  },
];

export const DocsSidebar: Component = () => {
  const location = useLocation();

  return (
    <aside class="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block overflow-y-auto border-r border-border/40 py-6 pr-4">
      <div class="space-y-6">
        <For each={navigation}>
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