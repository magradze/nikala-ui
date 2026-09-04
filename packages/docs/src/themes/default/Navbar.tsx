// packages/docs/src/themes/default/Navbar.tsx
import { Show, splitProps, type Component } from "solid-js";
import {
  Navbar,
  NavbarContainer,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  buttonVariants,
  Badge,
  Kbd,
  SidebarTrigger,
  ThemeToggle,
} from "@nikala-ui/core";
import { Search } from "lucide-solid";
import type { DocsNavbarProps } from "../types.js";

export const DocsNavbar: Component<DocsNavbarProps> = (props) => {
  const [local, rest] = splitProps(props, ["config", "onOpenSearch", "class"]);

  const title = () => local.config.title || "Nikala Docs";
  const logoText = () => local.config.logo?.text || title();
  const logoHref = () => local.config.logo?.href || "/";
  const repoUrl = () => local.config.repository?.url;

  return (
    <Navbar
      variant="default"
      maxWidth="full"
      isSticky={true}
      class={local.class}
      {...rest}
    >
      <NavbarContainer class="h-14 px-4 sm:px-6" >
        <NavbarContent justify="start" class="gap-3">
          <SidebarTrigger class="md:hidden" />
          <NavbarBrand href={logoHref()} class="text-base font-bold tracking-tight">
            <Show when={local.config.logo?.image}>
              {(img) => <img src={img()} alt={logoText()} class="size-6 object-contain" />}
            </Show>
            <span>{logoText()}</span>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent justify="end" class="gap-2">
          {/* Search Trigger Button */}
          <Show when={local.config.search?.enabled !== false && local.onOpenSearch}>
            <NavbarItem>
              <Button
                variant="outline"
                size="sm"
                onClick={() => local.onOpenSearch?.()}
                class="hidden sm:inline-flex text-muted-foreground w-48 sm:w-64 justify-between h-8 text-xs font-normal"
              >
                <span class="inline-flex items-center gap-2">
                  <Search class="size-3.5" />
                  <span>Search docs...</span>
                </span>
                <Kbd size="sm">⌘K</Kbd>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => local.onOpenSearch?.()}
                class="sm:hidden p-2"
                aria-label="Search docs"
              >
                <Search class="size-4" />
              </Button>
            </NavbarItem>
          </Show>

          {/* GitHub Repository Link */}
          <Show when={repoUrl()}>
            {(url) => (
              <NavbarItem>
                <a
                  href={url()}
                  target="_blank"
                  rel="noreferrer"
                  class={buttonVariants({ variant: "ghost", size: "sm" }) + " h-8 px-2 text-xs"}
                >
                  GitHub
                </a>
              </NavbarItem>
            )}
          </Show>

          {/* Theme Toggle */}
          <NavbarItem>
            <ThemeToggle />
          </NavbarItem>
        </NavbarContent>
      </NavbarContainer>
    </Navbar>
  );
};
