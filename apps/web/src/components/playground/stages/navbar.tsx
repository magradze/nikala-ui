import { createSignal, Show } from "solid-js";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Sparkles,
  ArrowRight,
  Zap,
  BookOpen,
  Layers,
  Shield,
  SlidersHorizontal,
} from "lucide-solid";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "navbar",
  name: "Navbar",
  props: [
    {
      name: "variant",
      label: "Variant",
      type: "select",
      options: ["default", "floating", "bordered", "transparent"],
      default: "default",
    },
    {
      name: "maxWidth",
      label: "Max Width",
      type: "select",
      options: ["2xl", "xl", "lg", "md", "sm", "full"],
      default: "2xl",
    },
    {
      name: "justify",
      label: "Content Alignment",
      type: "select",
      options: ["center", "start", "end"],
      default: "center",
    },
    {
      name: "showMegaMenu",
      label: "Include Mega-Menu",
      type: "boolean",
      default: true,
    },
    {
      name: "showSearch",
      label: "Include Search Bar",
      type: "boolean",
      default: false,
    },
    {
      name: "brandTitle",
      label: "Brand Title",
      type: "text",
      default: "Nikala UI",
    },
  ],
  generateCode: (v) => {
    const variantStr = v.variant && v.variant !== "default" ? ` variant="${v.variant}"` : "";
    const maxWidthStr = v.maxWidth && v.maxWidth !== "2xl" ? ` maxWidth="${v.maxWidth}"` : "";
    const justifyStr = v.justify && v.justify !== "center" ? ` justify="${v.justify}"` : ' justify="center"';
    const brand = v.brandTitle || "Nikala UI";

    return `<Navbar isSticky={false}${variantStr}${maxWidthStr}>
  <NavbarContainer>
    {/* Left: Brand Logo & Mobile Trigger */}
    <div class="flex items-center gap-2">
      <NavbarMobileToggle />
      <NavbarBrand href="#">
        <div class="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-xs shadow-2xs">
          N
        </div>
        <span class="font-bold text-sm tracking-tight">${brand}</span>
      </NavbarBrand>
    </div>

    {/* Center: Navigation Links */}
    <NavbarContent${justifyStr}>${
      v.showMegaMenu
        ? `
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem value="resources">
            <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
            <NavigationMenuContent class="w-[360px] p-3 grid grid-cols-2 gap-2">
              <NavigationMenuLink href="/docs/components/button" class="p-2.5 rounded-md hover:bg-muted transition-colors">
                <div class="font-semibold text-xs text-foreground flex items-center gap-1.5">
                  <Zap class="size-3.5 text-primary" />
                  <span>UI Primitives</span>
                </div>
                <p class="text-[11px] text-muted-foreground mt-1 leading-snug">60 components</p>
              </NavigationMenuLink>
              <NavigationMenuLink href="/docs/hooks" class="p-2.5 rounded-md hover:bg-muted transition-colors">
                <div class="font-semibold text-xs text-foreground flex items-center gap-1.5">
                  <Sparkles class="size-3.5 text-primary" />
                  <span>Reactive Hooks</span>
                </div>
                <p class="text-[11px] text-muted-foreground mt-1 leading-snug">43 primitives</p>
              </NavigationMenuLink>
              <NavigationMenuLink href="/docs/theming" class="p-2.5 rounded-md hover:bg-muted transition-colors">
                <div class="font-semibold text-xs text-foreground flex items-center gap-1.5">
                  <Layers class="size-3.5 text-primary" />
                  <span>Theming</span>
                </div>
                <p class="text-[11px] text-muted-foreground mt-1 leading-snug">Tailwind v4 tokens</p>
              </NavigationMenuLink>
              <NavigationMenuLink href="/docs/mcp" class="p-2.5 rounded-md hover:bg-muted transition-colors">
                <div class="font-semibold text-xs text-foreground flex items-center gap-1.5">
                  <Shield class="size-3.5 text-primary" />
                  <span>MCP Server</span>
                </div>
                <p class="text-[11px] text-muted-foreground mt-1 leading-snug">AI integration</p>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem value="docs">
            <NavigationMenuTrigger>Docs</NavigationMenuTrigger>
            <NavigationMenuContent class="w-[280px] p-2.5 space-y-1">
              <NavigationMenuLink href="/docs" class="p-2 rounded-md hover:bg-muted transition-colors">
                <div class="font-semibold text-xs text-foreground flex items-center gap-1.5">
                  <BookOpen class="size-3.5 text-primary" />
                  <span>Introduction</span>
                </div>
                <p class="text-[11px] text-muted-foreground mt-0.5 leading-snug">Quick start guide</p>
              </NavigationMenuLink>
              <NavigationMenuLink href="/docs/cli" class="p-2 rounded-md hover:bg-muted transition-colors">
                <div class="font-semibold text-xs text-foreground flex items-center gap-1.5">
                  <SlidersHorizontal class="size-3.5 text-primary" />
                  <span>CLI Reference</span>
                </div>
                <p class="text-[11px] text-muted-foreground mt-0.5 leading-snug">CLI commands</p>
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
      </NavigationMenu>`
        : `
      <NavbarItem isActive>
        <NavbarLink href="#" isActive>Home</NavbarLink>
      </NavbarItem>
      <NavbarItem>
        <NavbarLink href="#">Features</NavbarLink>
      </NavbarItem>
      <NavbarItem>
        <NavbarLink href="#">Pricing</NavbarLink>
      </NavbarItem>`
    }
    </NavbarContent>${
      v.showSearch
        ? `

    <div class="hidden lg:flex max-w-xs ml-2">
      <div class="relative w-full">
        <Search class="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
        <Input placeholder="Search..." class="h-8 pl-8 text-xs bg-muted/30" />
      </div>
    </div>`
        : ""
    }

    {/* Right: Actions */}
    <NavbarActions>
      <Button variant="ghost" size="sm" class="hidden sm:inline-flex">Sign In</Button>
      <Button size="sm" class="h-8 gap-1.5">
        <span>Get Started</span>
        <ArrowRight class="size-3.5" />
      </Button>
    </NavbarActions>
  </NavbarContainer>

  {/* Mobile Menu */}
  <NavbarMobileMenu>
    <NavbarMobileLink href="#" isActive>Home</NavbarMobileLink>
    <NavbarMobileLink href="#">Features</NavbarMobileLink>
    <NavbarMobileLink href="#">Pricing</NavbarMobileLink>
    <div class="pt-2 mt-1 border-t border-border/60 flex flex-col gap-2">
      <Button variant="outline" size="sm" class="w-full justify-center">Sign In</Button>
      <Button size="sm" class="w-full justify-center">Get Started</Button>
    </div>
  </NavbarMobileMenu>
</Navbar>`;
  },
};

export default function NavbarStage(props: StageProps) {
  const [activeTab, setActiveTab] = createSignal("home");

  const variant = () => (props.values.variant as "default" | "floating" | "bordered" | "transparent") || "default";
  const maxWidth = () => (props.values.maxWidth as "2xl" | "xl" | "lg" | "md" | "sm" | "full") || "2xl";
  const justify = () => (props.values.justify as "center" | "start" | "end") || "center";
  const showMegaMenu = () => props.values.showMegaMenu !== false;
  const showSearch = () => Boolean(props.values.showSearch);
  const brandTitle = () => String(props.values.brandTitle || "Nikala UI");

  return (
    <div class="w-full flex flex-col justify-start items-center p-2 min-h-[360px]">
      <Navbar
        isSticky={false}
        variant={variant()}
        maxWidth={maxWidth()}
      >
        <NavbarContainer>
          {/* Left: Brand & Mobile Toggle */}
          <div class="flex items-center gap-2">
            <NavbarMobileToggle />
            <NavbarBrand href="#playground">
              <div class="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-xs shadow-2xs">
                N
              </div>
              <span class="font-bold text-sm tracking-tight">{brandTitle()}</span>
            </NavbarBrand>
          </div>

          {/* Center: Navigation Links */}
          <NavbarContent justify={justify()}>
            <Show
              when={showMegaMenu()}
              fallback={
                <>
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
                </>
              }
            >
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem value="resources">
                    <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                    <NavigationMenuContent class="w-[360px] p-3 grid grid-cols-2 gap-2">
                      <NavigationMenuLink
                        href="/docs/components/button"
                        class="p-2.5 rounded-md hover:bg-muted transition-colors block select-none"
                      >
                        <div class="font-semibold text-xs text-foreground flex items-center gap-1.5">
                          <Zap class="size-3.5 text-primary" />
                          <span>UI Primitives</span>
                        </div>
                        <p class="text-[11px] text-muted-foreground mt-1 leading-snug">
                          60 UI components
                        </p>
                      </NavigationMenuLink>

                      <NavigationMenuLink
                        href="/docs/hooks"
                        class="p-2.5 rounded-md hover:bg-muted transition-colors block select-none"
                      >
                        <div class="font-semibold text-xs text-foreground flex items-center gap-1.5">
                          <Sparkles class="size-3.5 text-primary" />
                          <span>Reactive Hooks</span>
                        </div>
                        <p class="text-[11px] text-muted-foreground mt-1 leading-snug">
                          43 primitives
                        </p>
                      </NavigationMenuLink>

                      <NavigationMenuLink
                        href="/docs/theming"
                        class="p-2.5 rounded-md hover:bg-muted transition-colors block select-none"
                      >
                        <div class="font-semibold text-xs text-foreground flex items-center gap-1.5">
                          <Layers class="size-3.5 text-primary" />
                          <span>Theming</span>
                        </div>
                        <p class="text-[11px] text-muted-foreground mt-1 leading-snug">
                          Tailwind v4 tokens
                        </p>
                      </NavigationMenuLink>

                      <NavigationMenuLink
                        href="/docs/mcp"
                        class="p-2.5 rounded-md hover:bg-muted transition-colors block select-none"
                      >
                        <div class="font-semibold text-xs text-foreground flex items-center gap-1.5">
                          <Shield class="size-3.5 text-primary" />
                          <span>MCP Server</span>
                        </div>
                        <p class="text-[11px] text-muted-foreground mt-1 leading-snug">
                          AI integration
                        </p>
                      </NavigationMenuLink>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem value="docs">
                    <NavigationMenuTrigger>Docs</NavigationMenuTrigger>
                    <NavigationMenuContent class="w-[280px] p-2.5 space-y-1">
                      <NavigationMenuLink
                        href="/docs"
                        class="p-2 rounded-md hover:bg-muted transition-colors block select-none"
                      >
                        <div class="font-semibold text-xs text-foreground flex items-center gap-1.5">
                          <BookOpen class="size-3.5 text-primary" />
                          <span>Introduction</span>
                        </div>
                        <p class="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                          Quick start guide
                        </p>
                      </NavigationMenuLink>
                      <NavigationMenuLink
                        href="/docs/cli"
                        class="p-2 rounded-md hover:bg-muted transition-colors block select-none"
                      >
                        <div class="font-semibold text-xs text-foreground flex items-center gap-1.5">
                          <SlidersHorizontal class="size-3.5 text-primary" />
                          <span>CLI Reference</span>
                        </div>
                        <p class="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                          Command flags and options
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
            </Show>
          </NavbarContent>

          {/* Search Input Bar (Optional) */}
          <Show when={showSearch()}>
            <div class="hidden lg:flex max-w-xs ml-2">
              <div class="relative w-full">
                <Search class="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                <Input placeholder="Search..." class="h-8 pl-8 text-xs bg-muted/30" />
              </div>
            </div>
          </Show>

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
  );
}
