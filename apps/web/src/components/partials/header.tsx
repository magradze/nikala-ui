import { createSignal, For, Show } from "solid-js";
import { useLocation } from "@solidjs/router";
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
  const isHooksActive = () => location.pathname.startsWith("/docs/hooks");
  const isBlocksActive = () => location.pathname.startsWith("/blocks");
  const isMcpActive = () => location.pathname.startsWith("/docs/mcp");
  const isPlaygroundActive = () => location.pathname.startsWith("/playground");

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

      {/* Main Navbar Header */}
      <Navbar
        isSticky={true}
        variant="default"
        maxWidth="full"
        class="sticky top-0 z-50 supports-backdrop-filter:bg-background/60"
      >
        <NavbarContainer class="container-full max-w-full px-4">
          {/* Left: Mobile Nav Drawer Toggle & Brand Logo */}
          <div class="flex items-center gap-3 lg:gap-5 shrink-0">
            <MobileNav />
            <NavbarBrand href="/">
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

          {/* Center: Clean Direct Navigation Links */}
          <NavbarContent justify="start" class="hidden md:flex ml-3 gap-1">
            <NavbarItem isActive={isDocsActive()}>
              <NavbarLink
                href="/docs"
                isActive={isDocsActive()}
              >
                Documentation
              </NavbarLink>
            </NavbarItem>

            <NavbarItem isActive={isComponentsActive()}>
              <NavbarLink
                href="/docs/components/accordion"
                isActive={isComponentsActive()}
              >
                Components
              </NavbarLink>
            </NavbarItem>

            <NavbarItem isActive={isBlocksActive()}>
              <NavbarLink
                href="/blocks"
                isActive={isBlocksActive()}
                class="flex items-center gap-1.5"
              >
                Blocks
              </NavbarLink>
            </NavbarItem>

            <NavbarItem isActive={isHooksActive()}>
              <NavbarLink
                href="/docs/hooks/create-controllable-signal"
                isActive={isHooksActive()}
              >
                Hooks
              </NavbarLink>
            </NavbarItem>

            <NavbarItem isActive={isMcpActive()}>
              <NavbarLink
                href="/docs/mcp"
                isActive={isMcpActive()}
              >
                MCP
              </NavbarLink>
            </NavbarItem>

            <NavbarItem isActive={isPlaygroundActive()}>
              <NavbarLink
                href="/playground"
                isActive={isPlaygroundActive()}
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
