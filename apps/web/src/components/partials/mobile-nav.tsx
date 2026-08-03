import { createSignal, For } from "solid-js";
import { A, useLocation } from "@solidjs/router";
import { createLockScroll } from "@nikala-ui/hooks";
import { Menu } from "lucide-solid";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DOCS_SIDEBAR_NAVIGATION } from "@/config/docs";

export function MobileNav() {
  const [open, setOpen] = createSignal(false);
  const location = useLocation();

  createLockScroll({
    enabled: () => open(),
  });

  return (
    <Sheet open={open()} onOpenChange={setOpen}>
      <SheetTrigger
        as={Button}
        variant="ghost"
        size="sm"
        class="md:hidden h-9 w-9 p-0 text-muted-foreground hover:text-foreground"
        aria-label="Toggle mobile navigation menu"
      >
        <Menu class="w-5 h-5" />
      </SheetTrigger>

      <SheetContent side="left" class="w-75 sm:w-87.5 p-6 overflow-y-auto">
        <SheetHeader class="text-left pb-4 border-b border-border/50">
          <SheetTitle class="flex items-center gap-2">
            <span class="inline-flex items-center justify-center w-7 h-7 rounded-md bg-primary text-primary-foreground font-extrabold text-sm shadow-2xs">
              N
            </span>
            <span class="font-bold text-lg tracking-tight">Nikala UI</span>
            <Badge variant="outline" class="text-[10px] px-1.5 py-0 border-primary/30 text-primary">
              v0.5.0
            </Badge>
          </SheetTitle>
        </SheetHeader>

        {/* Navigation Links Tree */}
        <div class="space-y-6 pt-6">
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
                          onClick={() => setOpen(false)}
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
      </SheetContent>
    </Sheet>
  );
}