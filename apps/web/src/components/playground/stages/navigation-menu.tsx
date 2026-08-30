import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Sparkles, BookOpen, Layers, Zap } from "lucide-solid";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "navigation-menu",
  name: "Navigation Menu",
  props: [
    {
      name: "variant",
      label: "Variant",
      type: "select",
      options: ["default", "ghost", "outline"],
      default: "default",
    },
    {
      name: "size",
      label: "Size",
      type: "select",
      options: ["default", "sm", "lg"],
      default: "default",
    },
    {
      name: "hideChevron",
      label: "Hide Chevron",
      type: "boolean",
      default: false,
    },
    {
      name: "delayMs",
      label: "Hover Delay (ms)",
      type: "number",
      default: 150,
    },
  ],
  generateCode: (v) => {
    const delayStr = v.delayMs && v.delayMs !== 150 ? ` delayMs={${v.delayMs}}` : "";
    const variantStr = v.variant && v.variant !== "default" ? ` variant="${v.variant}"` : "";
    const sizeStr = v.size && v.size !== "default" ? ` size="${v.size}"` : "";
    const chevronStr = v.hideChevron ? ` hideChevron` : "";
    const triggerProps = `${variantStr}${sizeStr}${chevronStr}`;

    return `<NavigationMenu${delayStr}>
  <NavigationMenuList>
    {/* 1. Getting Started Mega-Menu */}
    <NavigationMenuItem value="getting-started">
      <NavigationMenuTrigger${triggerProps}>
        Getting Started
      </NavigationMenuTrigger>
      <NavigationMenuContent class="w-[380px] sm:w-[480px] grid grid-cols-1 sm:grid-cols-2 gap-3 p-4">
        <div class="row-span-3 rounded-md bg-linear-to-b from-primary/20 via-primary/5 to-muted/20 p-4 flex flex-col justify-end border border-primary/20">
          <div class="size-8 rounded-md bg-primary/20 text-primary flex items-center justify-center mb-2">
            <Sparkles class="size-4" />
          </div>
          <div class="font-bold text-sm text-foreground">Nikala UI</div>
          <p class="text-xs text-muted-foreground mt-1 leading-snug">
            Fine-grained copy-paste component system built natively for SolidJS & Tailwind v4.
          </p>
        </div>

        <div class="space-y-1">
          <NavigationMenuLink href="/docs">
            <div class="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <BookOpen class="size-3.5 text-primary" />
              <span>Documentation</span>
            </div>
            <p class="text-[11px] text-muted-foreground mt-0.5">
              Installation guides, CLI initialization and core setup.
            </p>
          </NavigationMenuLink>

          <NavigationMenuLink href="/docs/theming">
            <div class="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <Layers class="size-3.5 text-primary" />
              <span>Theming Engine</span>
            </div>
            <p class="text-[11px] text-muted-foreground mt-0.5">
              OKLCH semantic color tokens and dynamic dark mode.
            </p>
          </NavigationMenuLink>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>

    {/* 2. Components Dropdown */}
    <NavigationMenuItem value="components">
      <NavigationMenuTrigger${triggerProps}>
        Components
      </NavigationMenuTrigger>
      <NavigationMenuContent class="w-[300px] sm:w-[380px] p-3 space-y-1">
        <NavigationMenuLink href="/docs/components/button">
          <div class="text-xs font-semibold text-foreground">Button & Controls</div>
          <p class="text-[11px] text-muted-foreground mt-0.5">
            Interactive buttons with variant, size, and loading states.
          </p>
        </NavigationMenuLink>

        <NavigationMenuLink href="/docs/components/table">
          <div class="text-xs font-semibold text-foreground">Data Table & Timeline</div>
          <p class="text-[11px] text-muted-foreground mt-0.5">
            Accessible compound tables, chronological logs, and timelines.
          </p>
        </NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>

    {/* 3. Direct Link */}
    <NavigationMenuItem>
      <NavigationMenuLink
        href="/docs/hooks/create-clipboard"
        class="h-9 px-4 py-2 text-sm font-medium hover:bg-accent rounded-md inline-flex items-center"
      >
        40+ Hooks
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`;
  },
};

export default function NavigationMenuStage(props: StageProps) {
  return (
    <div class="flex flex-col items-center justify-center p-6 sm:p-12 w-full min-h-[350px]">
      <NavigationMenu
        delayMs={Number(props.values.delayMs ?? 150)}
        class="z-20"
      >
        <NavigationMenuList>
          {/* 1. Getting Started Mega-Menu */}
          <NavigationMenuItem value="getting-started">
            <NavigationMenuTrigger
              variant={props.values.variant}
              size={props.values.size}
              hideChevron={Boolean(props.values.hideChevron)}
            >
              Getting Started
            </NavigationMenuTrigger>
            <NavigationMenuContent class="w-[360px] sm:w-[480px] grid grid-cols-1 sm:grid-cols-2 gap-3 p-4">
              <div class="row-span-3 rounded-md bg-linear-to-b from-primary/20 via-primary/5 to-muted/20 p-4 flex flex-col justify-end border border-primary/20">
                <div class="size-8 rounded-md bg-primary/20 text-primary flex items-center justify-center mb-2">
                  <Sparkles class="size-4" />
                </div>
                <div class="font-bold text-sm text-foreground">Nikala UI</div>
                <p class="text-xs text-muted-foreground mt-1 leading-snug">
                  Fine-grained copy-paste component system built natively for SolidJS & Tailwind v4.
                </p>
              </div>

              <div class="space-y-1">
                <NavigationMenuLink href="/docs" class="block">
                  <div class="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <BookOpen class="size-3.5 text-primary" />
                    <span>Documentation</span>
                  </div>
                  <p class="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">
                    Installation guides, CLI initialization and core setup.
                  </p>
                </NavigationMenuLink>

                <NavigationMenuLink href="/docs/theming" class="block">
                  <div class="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <Layers class="size-3.5 text-primary" />
                    <span>Theming Engine</span>
                  </div>
                  <p class="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">
                    OKLCH semantic color tokens and dynamic dark mode.
                  </p>
                </NavigationMenuLink>

                <NavigationMenuLink href="/docs/mcp" class="block">
                  <div class="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <Zap class="size-3.5 text-primary" />
                    <span>AI MCP Server</span>
                  </div>
                  <p class="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">
                    Stdio & SSE streaming for Cursor, Claude Code, and Windsurf.
                  </p>
                </NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* 2. Components Mega-Menu */}
          <NavigationMenuItem value="components">
            <NavigationMenuTrigger
              variant={props.values.variant}
              size={props.values.size}
              hideChevron={Boolean(props.values.hideChevron)}
            >
              Components
            </NavigationMenuTrigger>
            <NavigationMenuContent class="w-[300px] sm:w-[380px] p-3 space-y-1">
              <NavigationMenuLink href="/docs/components/button">
                <div class="text-xs font-semibold text-foreground">Button & Controls</div>
                <p class="text-[11px] text-muted-foreground mt-0.5">
                  Interactive buttons with variant, size, and loading states.
                </p>
              </NavigationMenuLink>

              <NavigationMenuLink href="/docs/components/table">
                <div class="text-xs font-semibold text-foreground">Data Table & Timeline</div>
                <p class="text-[11px] text-muted-foreground mt-0.5">
                  Accessible compound tables, chronological logs, and timelines.
                </p>
              </NavigationMenuLink>

              <NavigationMenuLink href="/docs/components/combobox">
                <div class="text-xs font-semibold text-foreground">Combobox & Command</div>
                <p class="text-[11px] text-muted-foreground mt-0.5">
                  Autocomplete dropdowns and modal search palettes.
                </p>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* 3. Direct Link */}
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/docs/hooks/create-clipboard"
              class="h-9 px-4 py-2 text-sm font-medium hover:bg-accent rounded-md inline-flex items-center"
            >
              40+ Hooks
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
