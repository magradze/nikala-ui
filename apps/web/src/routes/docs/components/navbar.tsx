import { createSignal } from "solid-js";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import {
  Navbar,
  NavbarContainer,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarLink,
  NavbarActions,
  NavbarMobileToggle,
  NavbarMobileMenu,
  NavbarMobileLink,
} from "@/components/ui/navbar";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Sparkles,
  Bell,
  ArrowRight,
  BookOpen,
  Layers,
  Zap,
  Shield,
  ChevronRight,
  User,
  Settings,
  LogOut,
  SlidersHorizontal,
} from "lucide-solid";

/* --- Code Snippets --- */
const importCode = `import {
  Navbar,
  NavbarContainer,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarLink,
  NavbarActions,
  NavbarMobileToggle,
  NavbarMobileMenu,
  NavbarMobileLink,
} from "@/components/ui/navbar";`;

const defaultCode = `<Navbar isSticky={false} class="rounded-lg border border-border bg-card shadow-xs">
  <NavbarContainer>
    {/* Left: Brand Logo & Mobile Hamburger */}
    <div class="flex items-center gap-2">
      <NavbarMobileToggle />
      <NavbarBrand href="#">
        <div class="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-xs shadow-2xs">
          N
        </div>
        <span class="font-bold text-sm tracking-tight">Nikala UI</span>
      </NavbarBrand>
    </div>

    {/* Center: Desktop Navigation Links */}
    <NavbarContent justify="center">
      <NavbarItem isActive>
        <NavbarLink href="#" isActive>Home</NavbarLink>
      </NavbarItem>
      <NavbarItem>
        <NavbarLink href="#">Features</NavbarLink>
      </NavbarItem>
      <NavbarItem>
        <NavbarLink href="#">Pricing</NavbarLink>
      </NavbarItem>
      <NavbarItem>
        <NavbarLink href="#">Documentation</NavbarLink>
      </NavbarItem>
    </NavbarContent>

    {/* Right: Actions */}
    <NavbarActions>
      <Button variant="ghost" size="sm" class="hidden sm:inline-flex">
        Sign In
      </Button>
      <Button size="sm" class="h-8 gap-1.5">
        <span>Get Started</span>
        <ArrowRight class="size-3.5" />
      </Button>
    </NavbarActions>
  </NavbarContainer>

  {/* Mobile Menu Dropdown */}
  <NavbarMobileMenu>
    <NavbarMobileLink href="#" isActive>Home</NavbarMobileLink>
    <NavbarMobileLink href="#">Features</NavbarMobileLink>
    <NavbarMobileLink href="#">Pricing</NavbarMobileLink>
    <NavbarMobileLink href="#">Documentation</NavbarMobileLink>
    <div class="pt-2 mt-1 border-t border-border/60 flex flex-col gap-2">
      <Button variant="outline" size="sm" class="w-full justify-center">Sign In</Button>
      <Button size="sm" class="w-full justify-center">Get Started</Button>
    </div>
  </NavbarMobileMenu>
</Navbar>`;

const megaMenuCode = `<Navbar isSticky={false} class="rounded-lg border border-border bg-card shadow-xs">
  <NavbarContainer>
    <div class="flex items-center gap-2">
      <NavbarMobileToggle />
      <NavbarBrand href="#">
        <div class="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-xs shadow-2xs">
          ✦
        </div>
        <span class="font-bold text-sm tracking-tight">Studio</span>
      </NavbarBrand>
    </div>

    {/* Center: Nested NavigationMenu with Flyouts */}
    <NavbarContent justify="center">
      <NavigationMenu>
        <NavigationMenuList>
          {/* Mega-Menu Dropdown */}
          <NavigationMenuItem value="resources">
            <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
            <NavigationMenuContent class="w-[360px] sm:w-[420px] p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <NavigationMenuLink href="/docs/components/button">
                <div class="font-semibold text-xs text-foreground flex items-center gap-1.5">
                  <Zap class="size-3.5 text-primary" />
                  <span>UI Primitives</span>
                </div>
                <p class="text-[11px] text-muted-foreground mt-0.5">
                  60 accessible SolidJS components.
                </p>
              </NavigationMenuLink>

              <NavigationMenuLink href="/docs/hooks">
                <div class="font-semibold text-xs text-foreground flex items-center gap-1.5">
                  <Sparkles class="size-3.5 text-primary" />
                  <span>Reactive Hooks</span>
                </div>
                <p class="text-[11px] text-muted-foreground mt-0.5">
                  43 fine-grained reactive primitives.
                </p>
              </NavigationMenuLink>

              <NavigationMenuLink href="/docs/theming">
                <div class="font-semibold text-xs text-foreground flex items-center gap-1.5">
                  <Layers class="size-3.5 text-primary" />
                  <span>Theming Engine</span>
                </div>
                <p class="text-[11px] text-muted-foreground mt-0.5">
                  Tailwind CSS v4 token system.
                </p>
              </NavigationMenuLink>

              <NavigationMenuLink href="/docs/mcp">
                <div class="font-semibold text-xs text-foreground flex items-center gap-1.5">
                  <Shield class="size-3.5 text-primary" />
                  <span>MCP Server</span>
                </div>
                <p class="text-[11px] text-muted-foreground mt-0.5">
                  AI tools for Cursor & Claude.
                </p>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Simple Dropdown */}
          <NavigationMenuItem value="docs">
            <NavigationMenuTrigger>Docs</NavigationMenuTrigger>
            <NavigationMenuContent class="w-[280px] p-3 space-y-1">
              <NavigationMenuLink href="/docs">
                <div class="font-semibold text-xs text-foreground flex items-center gap-1.5">
                  <BookOpen class="size-3.5 text-primary" />
                  <span>Introduction</span>
                </div>
                <p class="text-[11px] text-muted-foreground mt-0.5">
                  Quick start guide and setup.
                </p>
              </NavigationMenuLink>
              <NavigationMenuLink href="/docs/cli">
                <div class="font-semibold text-xs text-foreground flex items-center gap-1.5">
                  <SlidersHorizontal class="size-3.5 text-primary" />
                  <span>CLI Reference</span>
                </div>
                <p class="text-[11px] text-muted-foreground mt-0.5">
                  Command flags and options.
                </p>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              href="#pricing"
              class="h-9 px-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground rounded-md inline-flex items-center transition-colors"
            >
              Pricing
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </NavbarContent>

    <NavbarActions>
      <Button variant="ghost" size="sm" class="hidden sm:inline-flex">Sign In</Button>
      <Button size="sm" class="h-8">Get Started</Button>
    </NavbarActions>
  </NavbarContainer>

  {/* Mobile Menu with Section Links */}
  <NavbarMobileMenu>
    <div class="space-y-1">
      <NavbarMobileLink href="#" isActive>
        <span class="flex items-center gap-2">
          <Zap class="size-4 text-primary" />
          <span>UI Primitives</span>
        </span>
        <ChevronRight class="size-3.5 opacity-50" />
      </NavbarMobileLink>
      <NavbarMobileLink href="#">
        <span class="flex items-center gap-2">
          <Sparkles class="size-4 text-primary" />
          <span>Reactive Hooks</span>
        </span>
        <ChevronRight class="size-3.5 opacity-50" />
      </NavbarMobileLink>
      <NavbarMobileLink href="#">
        <span class="flex items-center gap-2">
          <Layers class="size-4 text-primary" />
          <span>Theming Engine</span>
        </span>
        <ChevronRight class="size-3.5 opacity-50" />
      </NavbarMobileLink>
      <NavbarMobileLink href="#">
        <span class="flex items-center gap-2">
          <BookOpen class="size-4 text-primary" />
          <span>Documentation</span>
        </span>
        <ChevronRight class="size-3.5 opacity-50" />
      </NavbarMobileLink>
    </div>
    <div class="pt-3 mt-2 border-t border-border/60 flex flex-col gap-2">
      <Button variant="outline" size="sm" class="w-full justify-center">Sign In</Button>
      <Button size="sm" class="w-full justify-center">Get Started</Button>
    </div>
  </NavbarMobileMenu>
</Navbar>`;

const floatingCode = `<Navbar variant="floating" isSticky={false}>
  <NavbarContainer>
    <div class="flex items-center gap-2">
      <NavbarMobileToggle />
      <NavbarBrand href="#">
        <span class="font-bold text-sm tracking-tight">Acme.co</span>
      </NavbarBrand>
    </div>

    <NavbarContent justify="center">
      <NavbarLink href="#" isActive>Overview</NavbarLink>
      <NavbarLink href="#">Features</NavbarLink>
      <NavbarLink href="#">Integrations</NavbarLink>
      <NavbarLink href="#">Pricing</NavbarLink>
    </NavbarContent>

    <NavbarActions>
      <Button size="sm" class="h-8 gap-1.5">
        <span>Try Free</span>
        <Sparkles class="size-3.5" />
      </Button>
    </NavbarActions>
  </NavbarContainer>

  <NavbarMobileMenu>
    <NavbarMobileLink href="#" isActive>Overview</NavbarMobileLink>
    <NavbarMobileLink href="#">Features</NavbarMobileLink>
    <NavbarMobileLink href="#">Integrations</NavbarMobileLink>
    <NavbarMobileLink href="#">Pricing</NavbarMobileLink>
  </NavbarMobileMenu>
</Navbar>`;

const appHeaderCode = `<Navbar isSticky={false} class="rounded-lg border border-border bg-card shadow-xs">
  <NavbarContainer>
    <div class="flex items-center gap-2.5">
      <NavbarMobileToggle />
      <NavbarBrand href="#">
        <span class="font-extrabold text-base tracking-tight bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Dashboard
        </span>
        <Badge variant="outline" class="text-[10px] hidden sm:inline-flex">v2.4</Badge>
      </NavbarBrand>
    </div>

    <NavbarContent justify="start" class="hidden lg:flex max-w-xs ml-4">
      <div class="relative w-full">
        <Search class="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
        <Input placeholder="Search records..." class="h-8 pl-8 text-xs bg-muted/30 w-full" />
      </div>
    </NavbarContent>

    <NavbarActions>
      <Button variant="ghost" size="sm" class="size-8 p-0">
        <Bell class="size-4" />
      </Button>

      {/* User Profile Dropdown */}
      <DropdownMenu placement="bottom-end">
        <DropdownMenuTrigger class="focus:outline-hidden">
          <div class="flex size-8 items-center justify-center rounded-lg bg-primary/20 text-primary font-semibold text-xs border border-primary/30 cursor-pointer">
            JD
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-48">
          <DropdownMenuLabel>John Doe</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User class="size-3.5 mr-2 text-muted-foreground" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings class="size-3.5 mr-2 text-muted-foreground" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem class="text-destructive">
            <LogOut class="size-3.5 mr-2" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </NavbarActions>
  </NavbarContainer>

  <NavbarMobileMenu>
    <div class="pb-2">
      <Input placeholder="Search records..." class="h-9 text-xs w-full" />
    </div>
    <NavbarMobileLink href="#" isActive>Dashboard</NavbarMobileLink>
    <NavbarMobileLink href="#">Projects</NavbarMobileLink>
    <NavbarMobileLink href="#">Team</NavbarMobileLink>
    <NavbarMobileLink href="#">Settings</NavbarMobileLink>
  </NavbarMobileMenu>
</Navbar>`;

export default function NavbarDocPage() {
  const [activeTab, setActiveTab] = createSignal("home");

  return (
    <>
      <Seo
        title="Navbar Component — SolidJS Tailwind v4"
        description="A responsive, accessible, and composable navigation header component with floating, bordered, sticky, and mobile drawer variants for SolidJS."
        path="/docs/components/navbar"
      />

      <div class="space-y-10 pb-16">
        <DocPageHeader
          title="Navbar"
          badge="Layout"
          description="A responsive, accessible, and composable top navigation header suite supporting nested dropdown flyouts, floating card containers, and mobile navigation drawers."
        />

        {/* Hero Interactive Preview */}
        <ComponentPreview name="navbar" code={defaultCode}>
          <div class="w-full max-w-4xl">
            <Navbar isSticky={false} class="rounded-lg border border-border bg-card shadow-xs">
              <NavbarContainer>
                {/* Left: Brand Logo & Mobile Hamburger */}
                <div class="flex items-center gap-2">
                  <NavbarMobileToggle />
                  <NavbarBrand href="#default">
                    <div class="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-xs shadow-2xs">
                      N
                    </div>
                    <span class="font-bold text-sm tracking-tight">Nikala UI</span>
                  </NavbarBrand>
                </div>

                {/* Center: Desktop Navigation Links */}
                <NavbarContent justify="center">
                  <NavbarItem isActive={activeTab() === "home"}>
                    <NavbarLink
                      href="#home"
                      isActive={activeTab() === "home"}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab("home");
                      }}
                    >
                      Home
                    </NavbarLink>
                  </NavbarItem>
                  <NavbarItem isActive={activeTab() === "features"}>
                    <NavbarLink
                      href="#features"
                      isActive={activeTab() === "features"}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab("features");
                      }}
                    >
                      Features
                    </NavbarLink>
                  </NavbarItem>
                  <NavbarItem isActive={activeTab() === "pricing"}>
                    <NavbarLink
                      href="#pricing"
                      isActive={activeTab() === "pricing"}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab("pricing");
                      }}
                    >
                      Pricing
                    </NavbarLink>
                  </NavbarItem>
                  <NavbarItem isActive={activeTab() === "docs"}>
                    <NavbarLink
                      href="#docs"
                      isActive={activeTab() === "docs"}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab("docs");
                      }}
                    >
                      Documentation
                    </NavbarLink>
                  </NavbarItem>
                </NavbarContent>

                {/* Right: Actions */}
                <NavbarActions>
                  <Button variant="ghost" size="sm" class="hidden sm:inline-flex">
                    Sign In
                  </Button>
                  <Button size="sm" class="h-8 gap-1.5">
                    <span>Get Started</span>
                    <ArrowRight class="size-3.5" />
                  </Button>
                </NavbarActions>
              </NavbarContainer>

              {/* Mobile Menu */}
              <NavbarMobileMenu>
                <NavbarMobileLink href="#home" isActive={activeTab() === "home"}>
                  Home
                </NavbarMobileLink>
                <NavbarMobileLink href="#features">Features</NavbarMobileLink>
                <NavbarMobileLink href="#pricing">Pricing</NavbarMobileLink>
                <NavbarMobileLink href="#docs">Documentation</NavbarMobileLink>
                <div class="pt-2 mt-1 border-t border-border/60 flex flex-col gap-2">
                  <Button variant="outline" size="sm" class="w-full justify-center">
                    Sign In
                  </Button>
                  <Button size="sm" class="w-full justify-center">
                    Get Started
                  </Button>
                </div>
              </NavbarMobileMenu>
            </Navbar>
          </div>
        </ComponentPreview>

        {/* Usage & Import */}
        <div class="space-y-4">
          <DocSectionHeader title="Usage" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        {/* Examples */}
        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          {/* 1. With Navigation Menu Dropdowns */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">With Navigation Menu & Mega-Menus</h3>
            <p class="text-sm text-muted-foreground">
              Embed <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">NavigationMenu</code> inside <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">NavbarContent</code> for rich multi-column dropdowns.
            </p>
            <ComponentPreview name="navbar" code={megaMenuCode} allowOverflow={true}>
              <div class="w-full max-w-4xl min-h-[300px] flex flex-col justify-start">
                <Navbar isSticky={false} class="rounded-lg border border-border bg-card shadow-xs">
                  <NavbarContainer>
                    <div class="flex items-center gap-2">
                      <NavbarMobileToggle />
                      <NavbarBrand href="#mega">
                        <div class="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-xs shadow-2xs">
                          ✦
                        </div>
                        <span class="font-bold text-sm tracking-tight">Studio</span>
                      </NavbarBrand>
                    </div>

                    <NavbarContent justify="center">
                      <NavigationMenu>
                        <NavigationMenuList>
                          <NavigationMenuItem value="resources">
                            <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                            <NavigationMenuContent class="w-[360px] sm:w-[420px] p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                              <NavigationMenuLink href="/docs/components/button">
                                <div class="font-semibold text-xs text-foreground flex items-center gap-1.5">
                                  <Zap class="size-3.5 text-primary" />
                                  <span>UI Primitives</span>
                                </div>
                                <p class="text-[11px] text-muted-foreground mt-0.5">
                                  60 accessible SolidJS components.
                                </p>
                              </NavigationMenuLink>

                              <NavigationMenuLink href="/docs/hooks">
                                <div class="font-semibold text-xs text-foreground flex items-center gap-1.5">
                                  <Sparkles class="size-3.5 text-primary" />
                                  <span>Reactive Hooks</span>
                                </div>
                                <p class="text-[11px] text-muted-foreground mt-0.5">
                                  43 fine-grained reactive primitives.
                                </p>
                              </NavigationMenuLink>

                              <NavigationMenuLink href="/docs/theming">
                                <div class="font-semibold text-xs text-foreground flex items-center gap-1.5">
                                  <Layers class="size-3.5 text-primary" />
                                  <span>Theming Engine</span>
                                </div>
                                <p class="text-[11px] text-muted-foreground mt-0.5">
                                  Tailwind CSS v4 token system.
                                </p>
                              </NavigationMenuLink>

                              <NavigationMenuLink href="/docs/mcp">
                                <div class="font-semibold text-xs text-foreground flex items-center gap-1.5">
                                  <Shield class="size-3.5 text-primary" />
                                  <span>MCP Server</span>
                                </div>
                                <p class="text-[11px] text-muted-foreground mt-0.5">
                                  AI tools for Cursor & Claude.
                                </p>
                              </NavigationMenuLink>
                            </NavigationMenuContent>
                          </NavigationMenuItem>

                          <NavigationMenuItem value="docs">
                            <NavigationMenuTrigger>Docs</NavigationMenuTrigger>
                            <NavigationMenuContent class="w-[280px] p-3 space-y-1">
                              <NavigationMenuLink href="/docs">
                                <div class="font-semibold text-xs text-foreground flex items-center gap-1.5">
                                  <BookOpen class="size-3.5 text-primary" />
                                  <span>Introduction</span>
                                </div>
                                <p class="text-[11px] text-muted-foreground mt-0.5">
                                  Quick start guide and setup.
                                </p>
                              </NavigationMenuLink>
                              <NavigationMenuLink href="/docs/cli">
                                <div class="font-semibold text-xs text-foreground flex items-center gap-1.5">
                                  <SlidersHorizontal class="size-3.5 text-primary" />
                                  <span>CLI Reference</span>
                                </div>
                                <p class="text-[11px] text-muted-foreground mt-0.5">
                                  Command flags and options.
                                </p>
                              </NavigationMenuLink>
                            </NavigationMenuContent>
                          </NavigationMenuItem>

                          <NavigationMenuItem>
                            <NavigationMenuLink
                              href="#pricing"
                              class="h-9 px-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground rounded-md inline-flex items-center transition-colors"
                            >
                              Pricing
                            </NavigationMenuLink>
                          </NavigationMenuItem>
                        </NavigationMenuList>
                      </NavigationMenu>
                    </NavbarContent>

                    <NavbarActions>
                      <Button variant="ghost" size="sm" class="hidden sm:inline-flex">
                        Sign In
                      </Button>
                      <Button size="sm" class="h-8">
                        Get Started
                      </Button>
                    </NavbarActions>
                  </NavbarContainer>

                  <NavbarMobileMenu>
                    <div class="space-y-1">
                      <NavbarMobileLink href="#primitives" isActive>
                        <span class="flex items-center gap-2">
                          <Zap class="size-4 text-primary" />
                          <span>UI Primitives</span>
                        </span>
                        <ChevronRight class="size-3.5 opacity-50" />
                      </NavbarMobileLink>
                      <NavbarMobileLink href="#hooks">
                        <span class="flex items-center gap-2">
                          <Sparkles class="size-4 text-primary" />
                          <span>Reactive Hooks</span>
                        </span>
                        <ChevronRight class="size-3.5 opacity-50" />
                      </NavbarMobileLink>
                      <NavbarMobileLink href="#theming">
                        <span class="flex items-center gap-2">
                          <Layers class="size-4 text-primary" />
                          <span>Theming Engine</span>
                        </span>
                        <ChevronRight class="size-3.5 opacity-50" />
                      </NavbarMobileLink>
                    </div>
                    <div class="pt-3 mt-2 border-t border-border/60 flex flex-col gap-2">
                      <Button variant="outline" size="sm" class="w-full justify-center">
                        Sign In
                      </Button>
                      <Button size="sm" class="w-full justify-center">
                        Get Started
                      </Button>
                    </div>
                  </NavbarMobileMenu>
                </Navbar>
              </div>
            </ComponentPreview>
          </div>

          {/* 2. Floating Card Variant */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Floating Card / Pill Variant</h3>
            <p class="text-sm text-muted-foreground">
              Pass <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">variant="floating"</code> for a centered floating header banner.
            </p>
            <ComponentPreview name="navbar" code={floatingCode}>
              <div class="w-full max-w-4xl">
                <Navbar variant="floating" isSticky={false} class="my-0">
                  <NavbarContainer>
                    <div class="flex items-center gap-2">
                      <NavbarMobileToggle />
                      <NavbarBrand href="#floating">
                        <span class="font-bold text-sm tracking-tight">Acme.co</span>
                      </NavbarBrand>
                    </div>

                    <NavbarContent justify="center">
                      <NavbarLink href="#ov" isActive>Overview</NavbarLink>
                      <NavbarLink href="#ft">Features</NavbarLink>
                      <NavbarLink href="#in">Integrations</NavbarLink>
                      <NavbarLink href="#pr">Pricing</NavbarLink>
                    </NavbarContent>

                    <NavbarActions>
                      <Button size="sm" class="h-8 gap-1.5">
                        <span>Try Free</span>
                        <Sparkles class="size-3.5" />
                      </Button>
                    </NavbarActions>
                  </NavbarContainer>

                  <NavbarMobileMenu>
                    <NavbarMobileLink href="#ov" isActive>Overview</NavbarMobileLink>
                    <NavbarMobileLink href="#ft">Features</NavbarMobileLink>
                    <NavbarMobileLink href="#in">Integrations</NavbarMobileLink>
                    <NavbarMobileLink href="#pr">Pricing</NavbarMobileLink>
                  </NavbarMobileMenu>
                </Navbar>
              </div>
            </ComponentPreview>
          </div>

          {/* 3. Application Header with Search & Profile Dropdown */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Application Header with Profile Menu</h3>
            <p class="text-sm text-muted-foreground">
              Combine search inputs, notification triggers, and user dropdown menus for dashboard layouts.
            </p>
            <ComponentPreview name="navbar" code={appHeaderCode} allowOverflow={true}>
              <div class="w-full max-w-4xl">
                <Navbar isSticky={false} class="rounded-lg border border-border bg-card shadow-xs">
                  <NavbarContainer>
                    <div class="flex items-center gap-2.5">
                      <NavbarMobileToggle />
                      <NavbarBrand href="#app">
                        <span class="font-extrabold text-base tracking-tight bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                          Dashboard
                        </span>
                        <Badge variant="outline" class="text-[10px] hidden sm:inline-flex">
                          v2.4
                        </Badge>
                      </NavbarBrand>
                    </div>

                    <NavbarContent justify="start" class="hidden lg:flex max-w-xs ml-4">
                      <div class="relative w-full">
                        <Search class="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                        <Input placeholder="Search records..." class="h-8 pl-8 text-xs bg-muted/30 w-full" />
                      </div>
                    </NavbarContent>

                    <NavbarActions>
                      <Button variant="ghost" size="sm" class="size-8 p-0">
                        <Bell class="size-4" />
                      </Button>

                      <DropdownMenu placement="bottom-end">
                        <DropdownMenuTrigger class="focus:outline-hidden">
                          <div class="flex size-8 items-center justify-center rounded-lg bg-primary/20 text-primary font-semibold text-xs border border-primary/30 cursor-pointer">
                            JD
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent class="w-48">
                          <DropdownMenuLabel>John Doe</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <User class="size-3.5 mr-2 text-muted-foreground" />
                            <span>Profile</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Settings class="size-3.5 mr-2 text-muted-foreground" />
                            <span>Settings</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem class="text-destructive">
                            <LogOut class="size-3.5 mr-2" />
                            <span>Log out</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </NavbarActions>
                  </NavbarContainer>

                  <NavbarMobileMenu>
                    <div class="pb-2">
                      <Input placeholder="Search records..." class="h-9 text-xs w-full" />
                    </div>
                    <NavbarMobileLink href="#dash" isActive>
                      Dashboard
                    </NavbarMobileLink>
                    <NavbarMobileLink href="#projects">Projects</NavbarMobileLink>
                    <NavbarMobileLink href="#team">Team</NavbarMobileLink>
                    <NavbarMobileLink href="#settings">Settings</NavbarMobileLink>
                  </NavbarMobileMenu>
                </Navbar>
              </div>
            </ComponentPreview>
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-4">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="Navbar"
            description="Root header container managing responsive layout and mobile open states."
            items={[
              {
                prop: "variant",
                type: '"default" | "floating" | "bordered" | "transparent"',
                default: '"default"',
                description: "Visual appearance style variant.",
              },
              {
                prop: "isSticky",
                type: "boolean",
                default: "true",
                description: "Whether the navbar sticks to the top of the viewport.",
              },
              {
                prop: "maxWidth",
                type: '"sm" | "md" | "lg" | "xl" | "2xl" | "full"',
                default: '"2xl"',
                description: "Maximum inner content width constraint.",
              },
              {
                prop: "open",
                type: "boolean",
                default: "undefined",
                description: "Controlled mobile menu open state.",
              },
              {
                prop: "onOpenChange",
                type: "(open: boolean) => void",
                default: "undefined",
                description: "Callback invoked when mobile menu open state changes.",
              },
            ]}
          />

          <DocApiTable
            title="NavbarContainer"
            description="Horizontal flex container holding brand, links, actions, and hamburger toggle."
            items={[]}
          />

          <DocApiTable
            title="NavbarContent"
            description="Section container for grouping links or interactive menus."
            items={[
              {
                prop: "justify",
                type: '"start" | "center" | "end"',
                default: '"center"',
                description: "Horizontal flex alignment.",
              },
              {
                prop: "hideOnMobile",
                type: "boolean",
                default: "true",
                description: "Hides this section on small mobile viewports.",
              },
            ]}
          />

          <DocApiTable
            title="NavbarLink"
            description="Semantic anchor link with active state indicator."
            items={[
              {
                prop: "isActive",
                type: "boolean",
                default: "false",
                description: "Applies active state styling.",
              },
              {
                prop: "variant",
                type: '"default" | "active" | "ghost"',
                default: '"default"',
                description: "Visual style variant.",
              },
            ]}
          />
        </div>

        {/* Footer Navigation */}
        <DocNextSteps
          prev={{ title: "Navigation Menu", href: "/docs/components/navigation-menu" }}
          next={{ title: "Sidebar", href: "/docs/components/sidebar" }}
        />
      </div>
    </>
  );
}
