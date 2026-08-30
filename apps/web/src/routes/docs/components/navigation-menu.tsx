// src/routes/docs/components/navigation-menu.tsx
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Sparkles, BookOpen, Layers, Zap } from "lucide-solid";

/* --- Code Snippets --- */
const importCode = `import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";`;

const defaultCode = `<NavigationMenu>
  <NavigationMenuList>
    {/* 1. Getting Started Mega-Menu */}
    <NavigationMenuItem value="getting-started">
      <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
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
      <NavigationMenuTrigger>Components</NavigationMenuTrigger>
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

const simpleLinksCode = `<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuLink href="/docs" active class="h-9 px-4 py-2 text-sm font-medium rounded-md inline-flex items-center">
        Documentation
      </NavigationMenuLink>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href="/docs/components/button" class="h-9 px-4 py-2 text-sm font-medium hover:bg-accent rounded-md inline-flex items-center">
        Components
      </NavigationMenuLink>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href="/playground" class="h-9 px-4 py-2 text-sm font-medium hover:bg-accent rounded-md inline-flex items-center">
        Playground
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`;

export default function NavigationMenuDocPage() {
  return (
    <>
      <Seo
        title="Navigation Menu Component"
        description="A responsive and accessible top header navigation menu component supporting mega-menu dropdowns, link items, hover triggers, and animations for SolidJS."
        path="/docs/components/navigation-menu"
      />

      <div class="space-y-10 pb-16">
        {/* 1. Page Header */}
        <DocPageHeader
          title="Navigation Menu"
          badge="Compound Component"
          description="A collection of links for navigating websites with interactive mega-menu dropdowns and hover triggers."
        />

        {/* 2. Main Hero Preview */}
        <ComponentPreview name="navigation-menu" code={defaultCode}>
          <div class="flex items-center justify-center p-8 w-full min-h-[360px]">
            <NavigationMenu class="z-20">
              <NavigationMenuList>
                {/* 1. Getting Started Dropdown */}
                <NavigationMenuItem value="getting-started">
                  <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
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

                      <NavigationMenuLink href="/docs/mcp">
                        <div class="text-xs font-semibold text-foreground flex items-center gap-1.5">
                          <Zap class="size-3.5 text-primary" />
                          <span>AI MCP Server</span>
                        </div>
                        <p class="text-[11px] text-muted-foreground mt-0.5">
                          Stdio & SSE streaming for Cursor, Claude Code, and Windsurf.
                        </p>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* 2. Components Dropdown */}
                <NavigationMenuItem value="components">
                  <NavigationMenuTrigger>Components</NavigationMenuTrigger>
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
        </ComponentPreview>

        {/* 3. Usage & Import */}
        <div class="space-y-4">
          <DocSectionHeader title="Usage" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        {/* 4. Examples */}
        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          {/* Simple Link Items */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Simple Navigation Links</h3>
            <p class="text-sm text-muted-foreground">
              Use <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">NavigationMenuLink</code> for flat horizontal menus with active highlighting.
            </p>
            <ComponentPreview name="navigation-menu" code={simpleLinksCode}>
              <div class="flex items-center justify-center p-6">
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuLink href="/docs" active class="h-9 px-4 py-2 text-sm font-medium rounded-md inline-flex items-center">
                        Documentation
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink href="/docs/components/button" class="h-9 px-4 py-2 text-sm font-medium hover:bg-accent rounded-md inline-flex items-center">
                        Components
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink href="/playground" class="h-9 px-4 py-2 text-sm font-medium hover:bg-accent rounded-md inline-flex items-center">
                        Playground
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            </ComponentPreview>
          </div>
        </div>

        {/* 5. API Reference */}
        <div class="space-y-6 pt-4">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="NavigationMenu"
            items={[
              {
                prop: "value",
                type: "string | null",
                default: "null",
                description: "Controlled active item identifier currently expanded in the navigation menu.",
              },
              {
                prop: "onValueChange",
                type: "(value: string | null) => void",
                description: "Callback fired when the active open menu item changes.",
              },
              {
                prop: "delayMs",
                type: "number",
                default: "150",
                description: "Hover timeout delay in milliseconds before expanding/collapsing dropdown flyouts.",
              },
            ]}
          />

          <DocApiTable
            title="NavigationMenuTrigger"
            items={[
              {
                prop: "variant",
                type: '"default" | "ghost"',
                default: '"default"',
                description: "Trigger styling variant on NavigationMenuTrigger.",
              },
              {
                prop: "size",
                type: '"default" | "sm" | "lg"',
                default: '"default"',
                description: "Size dimensions of navigation menu trigger buttons.",
              },
              {
                prop: "hideChevron",
                type: "boolean",
                default: "false",
                description: "Hides the animated dropdown chevron icon inside NavigationMenuTrigger.",
              },
            ]}
          />

          <DocApiTable
            title="NavigationMenuLink"
            items={[
              {
                prop: "active",
                type: "boolean",
                default: "false",
                description: "Applies active highlighted styling to the link item.",
              },
              {
                prop: "href",
                type: "string",
                description: "Destination URL for the navigation link.",
              },
            ]}
          />
        </div>

        {/* 6. Footer Navigation */}
        <DocNextSteps
          prev={{ title: "Timeline Component", href: "/docs/components/timeline" }}
          next={{ title: "Tabs Component", href: "/docs/components/tabs" }}
        />
      </div>
    </>
  );
}
