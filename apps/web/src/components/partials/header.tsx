import { createSignal, For, Show } from "solid-js";
import { A, useLocation } from "@solidjs/router";
import { COMPONENTS_LIST, DOCUMENTATION_LIST, HOOKS_LIST } from "@/config/docs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Banner } from "@/components/ui/banner";
import {
  Navbar,
  NavbarContainer,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarLink,
  NavbarActions,
} from "@/components/ui/navbar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandFooter,
} from "@/components/ui/command";
import {
  Info,
  Webhook,
  Component as ComponentIcon,
  Search,
  ChevronDown,
  BookOpen,
  Boxes,
  Zap,
  Layers,
} from "lucide-solid";
import { MobileNav } from "@/components/partials/mobile-nav";
import { Logo } from "../ui/logo";
import { GithubButton } from "@/components/partials/github-button";

export function Header() {
  const [open, setOpen] = createSignal(false);
  const location = useLocation();

  const isDocsActive = () =>
    location.pathname === "/docs" ||
    location.pathname.startsWith("/docs/cli") ||
    location.pathname.startsWith("/docs/theming") ||
    location.pathname.startsWith("/docs/rules");

  const isComponentsActive = () => location.pathname.startsWith("/docs/components");
  const isBlocksActive = () => location.pathname.startsWith("/blocks");
  const isHooksActive = () => location.pathname.startsWith("/docs/hooks");
  const isDesktopActive = () => location.pathname.startsWith("/docs/desktop");
  const isMcpActive = () => location.pathname.startsWith("/docs/mcp");
  const isPlaygroundActive = () => location.pathname.startsWith("/playground");

  return (
    <>
      {/* Main Navbar Header */}
      <Navbar
        isSticky={true}
        variant="default"
        maxWidth={location.pathname === "/" ? "xl" : "full"}
        class="sticky top-0 z-50 supports-backdrop-filter:bg-background/60"
      >
        <NavbarContainer class={location.pathname === "/" ? "px-4" : "container-full max-w-full px-4"}>
          {/* Left: Mobile Nav Drawer Toggle & Brand Logo */}
          <div class="flex items-center gap-3 lg:gap-5 shrink-0">
            <MobileNav />
            <NavbarBrand as={A} href="/">
              <Logo class="w-7 h-7 rounded-md" />
              <span class="hidden sm:inline-block font-bold text-base tracking-tight">Nikala UI</span>
              <Badge
                variant="outline"
                class="ml-1 text-[10px] px-1.5 py-0 border-primary/30 text-primary hidden md:inline-flex"
              >
                v0.11.0
              </Badge>
            </NavbarBrand>
          </div>

          {/* Center: Clean 4-Item Direct & Dropdown Navigation */}
          <NavbarContent justify="start" class="hidden lg:flex ml-3 gap-1">
            {/* 1. Documentation Dropdown */}
            <DropdownMenu placement="bottom-start">
              <DropdownMenuTrigger
                class="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer text-muted-foreground hover:text-foreground hover:bg-muted/50 data-[state=open]:text-foreground data-[state=open]:bg-muted/50"
                classList={{
                  "text-foreground font-semibold bg-muted/40": isDocsActive() || isComponentsActive() || isHooksActive() || isBlocksActive(),
                }}
              >
                <span>Documentation</span>
                <ChevronDown class="size-3 text-muted-foreground transition-transform duration-200" />
              </DropdownMenuTrigger>
              <DropdownMenuContent class="w-72 p-2 space-y-1 bg-popover/95 backdrop-blur-md border-border/80 shadow-xl rounded-xl">
                <A href="/docs" class="flex items-start gap-2.5 p-2 rounded-lg hover:bg-muted/60 transition-colors group">
                  <div class="size-7 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <BookOpen class="size-3.5" />
                  </div>
                  <div class="space-y-0.5">
                    <div class="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                      General Documentation
                    </div>
                    <p class="text-[11px] text-muted-foreground leading-tight">
                      Architecture, CLI commands, theming, and AI setup.
                    </p>
                  </div>
                </A>

                <A href="/docs/components/accordion" class="flex items-start gap-2.5 p-2 rounded-lg hover:bg-muted/60 transition-colors group">
                  <div class="size-7 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <Boxes class="size-3.5" />
                  </div>
                  <div class="space-y-0.5">
                    <div class="flex items-center gap-1.5">
                      <span class="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                        Components
                      </span>
                      <Badge variant="outline" class="text-[9px] px-1 py-0 border-primary/30 text-primary">69</Badge>
                    </div>
                    <p class="text-[11px] text-muted-foreground leading-tight">
                      Kobalte UI components built for Tailwind CSS v4.
                    </p>
                  </div>
                </A>

                <A href="/docs/hooks/create-controllable-signal" class="flex items-start gap-2.5 p-2 rounded-lg hover:bg-muted/60 transition-colors group">
                  <div class="size-7 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <Zap class="size-3.5 text-amber-500" />
                  </div>
                  <div class="space-y-0.5">
                    <div class="flex items-center gap-1.5">
                      <span class="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                        Hooks & Primitives
                      </span>
                      <Badge variant="outline" class="text-[9px] px-1 py-0 border-amber-500/30 text-amber-500">47</Badge>
                    </div>
                    <p class="text-[11px] text-muted-foreground leading-tight">
                      Fine-grained reactive signals and DOM primitives.
                    </p>
                  </div>
                </A>

                <A href="/blocks" class="flex items-start gap-2.5 p-2 rounded-lg hover:bg-muted/60 transition-colors group">
                  <div class="size-7 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <Layers class="size-3.5 text-sky-500" />
                  </div>
                  <div class="space-y-0.5">
                    <div class="flex items-center gap-1.5">
                      <span class="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                        Application Blocks
                      </span>
                      <Badge variant="secondary" class="text-[9px] px-1 py-0 font-mono">New</Badge>
                    </div>
                    <p class="text-[11px] text-muted-foreground leading-tight">
                      Ready-to-use dashboards, auth, and complex UI layouts.
                    </p>
                  </div>
                </A>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* 2. Desktop (Tauri v2) */}
            <NavbarItem isActive={isDesktopActive()}>
              <NavbarLink
                as={A}
                href="/docs/desktop"
                isActive={isDesktopActive()}
                class="flex items-center gap-1.5 text-xs"
              >
                Desktop
                <Badge variant="outline" class="text-[9px] px-1 py-0 border-primary/30 text-primary font-mono">Tauri</Badge>
              </NavbarLink>
            </NavbarItem>

            {/* 3. MCP */}
            <NavbarItem isActive={isMcpActive()}>
              <NavbarLink
                as={A}
                href="/docs/mcp"
                isActive={isMcpActive()}
                class="text-xs"
              >
                MCP Server
              </NavbarLink>
            </NavbarItem>

            {/* 4. Playground */}
            <NavbarItem isActive={isPlaygroundActive()}>
              <NavbarLink
                as={A}
                href="/playground"
                isActive={isPlaygroundActive()}
                class="text-xs"
              >
                Playground
              </NavbarLink>
            </NavbarItem>
          </NavbarContent>

          {/* Right: Actions */}
          <NavbarActions>
            {/* Search Command Palette Trigger */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setOpen(true)}
              aria-label="Search documentation"
              class="flex items-center gap-2 h-8 px-2.5 text-xs text-muted-foreground hover:text-foreground cursor-pointer border-border/60"
            >
              <Search class="size-3.5" />
              <span class="hidden sm:inline-block">Search...</span>
              <Kbd size="sm" class="hidden sm:inline-flex">⌘K</Kbd>
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
          </NavbarActions>
        </NavbarContainer>
      </Navbar>
    </>
  );
}
