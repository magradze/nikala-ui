import { createSignal, For, Show } from "solid-js";
import { A } from "@solidjs/router";
import { COMPONENTS_LIST, DOCUMENTATION_LIST, HOOKS_LIST } from "@/config/docs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Banner } from "@/components/ui/banner";
import { Info, Webhook } from "lucide-solid";
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
import { GithubButton } from "@/components/partials/github-button";

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
                v0.10.0
              </Badge>
            </A>

            {/* Main Navigation */}
            <nav class="hidden md:flex items-center gap-5 text-sm font-medium text-muted-foreground">
              <A href="/docs" class="hover:text-foreground transition-colors">Documentation</A>
              <A href="/docs/components/accordion" class="hover:text-foreground transition-colors">Components</A>
              <A href="/docs/hooks/create-controllable-signal" class="hover:text-foreground transition-colors">Hooks</A>
              <A href="/docs/mcp" class="hover:text-foreground transition-colors">MCP Server</A>
              <A href="/playground" class="hover:text-foreground transition-colors">Playground</A>
            </nav>
          </div>

          {/* Right: Actions */}
          <div class="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setOpen(true)}
              aria-label="Search documentation"
              class="flex items-center gap-2"
            >
              <span>Search...</span>
              <kbd class="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-background px-1.5 font-mono text-[10px] font-semibold text-muted-foreground shadow-2xs">
                <span class="text-xs">⌘</span>K
              </kbd>
            </Button>

            {/* Global Command Palette Modal */}
            <CommandDialog open={open()} onOpenChange={setOpen} enableHotkey={true}>
              {({ search }) => {
                const query = () => search().toLowerCase().trim();

                const filteredDocs = () =>
                  DOCUMENTATION_LIST.filter(
                    (doc) =>
                      !query() ||
                      doc.title.toLowerCase().includes(query()) ||
                      doc.subtitle.toLowerCase().includes(query())
                  );

                const filteredHooks = () =>
                  HOOKS_LIST.filter(
                    (hook) =>
                      !query() ||
                      hook.title.toLowerCase().includes(query()) ||
                      hook.description.toLowerCase().includes(query()) ||
                      hook.name.toLowerCase().includes(query())
                  );

                const filteredComponents = () =>
                  COMPONENTS_LIST.filter(
                    (comp) =>
                      !query() ||
                      comp.title.toLowerCase().includes(query()) ||
                      comp.description.toLowerCase().includes(query()) ||
                      comp.name.toLowerCase().includes(query())
                  );

                const hasAnyResults = () =>
                  filteredDocs().length > 0 ||
                  filteredHooks().length > 0 ||
                  filteredComponents().length > 0;

                return (
                  <>
                    <CommandInput placeholder="Search documentation, CLI, hooks, components..." />

                    <CommandList>
                      <Show when={query().length > 0 && !hasAnyResults()}>
                        <CommandEmpty />
                      </Show>

                      {/* Documentation Section */}
                      <Show when={filteredDocs().length > 0}>
                        <CommandGroup heading="Documentation">
                          <For each={filteredDocs()}>
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
                      </Show>

                      {/* Hooks Section */}
                      <Show when={filteredHooks().length > 0}>
                        <CommandGroup heading="Hooks & Primitives">
                          <For each={filteredHooks()}>
                            {(hook) => (
                              <CommandItem
                                title={hook.title}
                                subtitle={hook.description}
                                icon={Webhook}
                                href={hook.href}
                                showChevron={true}
                                onSelect={() => setOpen(false)}
                              />
                            )}
                          </For>
                        </CommandGroup>
                      </Show>

                      {/* Components Section */}
                      <Show when={filteredComponents().length > 0}>
                        <CommandGroup heading="Components">
                          <For each={filteredComponents()}>
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
                      </Show>
                    </CommandList>

                    <CommandFooter />
                  </>
                );
              }}
            </CommandDialog>
            {/* GitHub Link */}
            <GithubButton repo="nikala-ui/ui" class="hidden sm:inline-flex" />

            {/* Theme Toggle */}
            <ThemeToggle mode="max" effect="circular" />
          </div>
        </div>
      </header>
    </>
  );
}