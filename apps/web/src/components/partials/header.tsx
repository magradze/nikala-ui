import { createSignal, For } from "solid-js";
import { A } from "@solidjs/router";
import { COMPONENTS_LIST, DOCUMENTATION_LIST } from "@/config/docs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Banner } from "@/components/ui/banner";
import { Info } from "lucide-solid";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandFooter,
} from "@/components/ui/command";
import { Terminal, Component as ComponentIcon, BookOpen, Search, Palette } from "lucide-solid";
import { MobileNav } from "@/components/partials/mobile-nav";
import { Logo } from "../ui/logo";

export function Header() {
  const [open, setOpen] = createSignal(false);
  return (
    <>
      {/* Global Announcement Banner */}
      <Banner
        variant="warning"
        dismissible={true}
        sticky={false}
        icon={Info}
        storageKey="nikala-under-construction-banner"
        link="https://github.com/nikala-ui/ui"
        linkText="GitHub"
      >
        Website is under active construction. Some pages and components are in preview mode.
      </Banner>


      {/* Main Header Element */}
      <header class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div class="container-full flex h-14 max-w-full items-center justify-between px-4">
          {/* Left: Brand Logo & Title */}
          <div class="flex items-center gap-2">
            <MobileNav />
            <A href="/" class="flex items-center gap-2 font-bold text-lg tracking-tight hover:opacity-90 transition-opacity">
              <Logo class="w-7 h-7 rounded-md" />
              <span class="hidden md:block">Nikala UI</span>
              <Badge variant="outline" class="ml-1 text-[10px] px-1.5 py-0 border-primary/30 text-primary hidden md:block">
                v0.5.0
              </Badge>
            </A>

            {/* Main Navigation */}
            <nav class="hidden md:flex items-center gap-5 text-sm font-medium text-muted-foreground">
              <A href="/docs" class="hover:text-foreground transition-colors">Documentation</A>
              <A href="/docs/components/accordion" class="hover:text-foreground transition-colors">Components</A>
              <A href="/playground" class="hover:text-foreground transition-colors">Playground</A>
            </nav>
          </div>

          {/* Right: Actions */}
          <div class="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setOpen(true)}
              class="flex items-center gap-2"
            >
              <span>Search...</span>
              <kbd class="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-background px-1.5 font-mono text-[10px] font-semibold text-muted-foreground shadow-2xs">
                <span class="text-xs">⌘</span>K
              </kbd>
            </Button>

            {/* Global Command Palette Modal */}
            <CommandDialog open={open()} onOpenChange={setOpen} enableHotkey={true}>
              <CommandInput placeholder="Search documentation, CLI, components..." />

              <CommandList>
                <CommandEmpty />

                {/* Documentation Section */}
                <CommandGroup heading="Documentation">
                  <For each={DOCUMENTATION_LIST}>
                    {(doc) => (
                      <CommandItem
                        title={doc.title}
                        subtitle={doc.subtitle}
                        icon={doc.icon}
                        href={doc.href}
                        shortcut={doc.shortcut}
                        showChevron={true}
                        onSelect={() => setOpen(false)}
                      />
                    )}
                  </For>
                </CommandGroup>

                {/* Components Section */}
                <CommandGroup heading="Components">
                  <For each={COMPONENTS_LIST}>
                    {(comp) => (
                      <CommandItem
                        title={comp.title}
                        subtitle={comp.description}
                        icon={ComponentIcon}
                        href={comp.href}
                        showChevron={true}
                        onSelect={() => setOpen(false)}
                      />
                    )}
                  </For>
                </CommandGroup>
              </CommandList>

              <CommandFooter />
            </CommandDialog>
            {/* GitHub Link */}
            <a
              href="https://github.com/nikala-ui/ui"
              target="_blank"
              rel="noreferrer"
              class="hidden sm:inline-flex"
            >
              <Button variant="outline" size="sm" class="gap-2 h-8 text-xs">
                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </Button>
            </a>

            {/* Theme Toggle */}
            <ThemeToggle mode="max" effect="circular" />
          </div>
        </div>
      </header>
    </>
  );
}