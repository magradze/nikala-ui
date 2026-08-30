import { Component } from "solid-js";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Seo } from "@/components/seo";
import {
  Footer,
  FooterContainer,
  FooterContent,
  FooterColumn,
  FooterColumnTitle,
  FooterColumnList,
  FooterLink,
  FooterBrand,
  FooterBottom,
  FooterCopyright,
  FooterSocials,
} from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Sparkles,
  ArrowRight,
  Globe,
  Send,
  Heart,
  Github,
  Twitter,
} from "lucide-solid";

/* Code Snippets for Previews */
const importCode = `import {
  Footer,
  FooterContainer,
  FooterContent,
  FooterColumn,
  FooterColumnTitle,
  FooterColumnList,
  FooterLink,
  FooterBrand,
  FooterBottom,
  FooterCopyright,
  FooterSocials,
} from "@/components/ui/footer";`;

const defaultCode = `<Footer variant="default" maxWidth="2xl">
  <FooterContainer>
    <FooterContent>
      {/* Brand Column */}
      <FooterBrand>
        <div class="flex items-center gap-2 font-bold text-base tracking-tight">
          <div class="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-xs shadow-2xs">
            N
          </div>
          <span>Nikala UI</span>
          <Badge variant="outline" class="text-[10px] px-1.5 py-0 border-primary/30 text-primary">
            v0.11.0
          </Badge>
        </div>
        <p class="text-xs text-muted-foreground max-w-sm leading-relaxed">
          Fine-grained copy-paste component system built natively for SolidJS and Tailwind CSS v4.
        </p>
      </FooterBrand>

      {/* Column 1 */}
      <FooterColumn>
        <FooterColumnTitle>Products</FooterColumnTitle>
        <FooterColumnList>
          <FooterLink href="#">UI Primitives</FooterLink>
          <FooterLink href="#">Reactive Hooks</FooterLink>
          <FooterLink href="#">Tailwind v4 Themes</FooterLink>
          <FooterLink href="#">AI MCP Server</FooterLink>
        </FooterColumnList>
      </FooterColumn>

      {/* Column 2 */}
      <FooterColumn>
        <FooterColumnTitle>Resources</FooterColumnTitle>
        <FooterColumnList>
          <FooterLink href="#">Documentation</FooterLink>
          <FooterLink href="#">CLI Reference</FooterLink>
          <FooterLink href="#">Playground</FooterLink>
          <FooterLink href="#">Roadmap</FooterLink>
        </FooterColumnList>
      </FooterColumn>

      {/* Column 3 */}
      <FooterColumn>
        <FooterColumnTitle>Legal</FooterColumnTitle>
        <FooterColumnList>
          <FooterLink href="#">Privacy Policy</FooterLink>
          <FooterLink href="#">Terms of Service</FooterLink>
          <FooterLink href="#">MIT License</FooterLink>
        </FooterColumnList>
      </FooterColumn>
    </FooterContent>

    {/* Bottom Bar */}
    <FooterBottom>
      <FooterCopyright>
        © {new Date().getFullYear()} Nikala UI. Created with ❤️ for SolidJS.
      </FooterCopyright>
      <FooterSocials>
        <a href="#" class="hover:text-foreground transition-colors">
          <Globe class="size-4" />
        </a>
      </FooterSocials>
    </FooterBottom>
  </FooterContainer>
</Footer>`;

const newsletterCode = `<Footer variant="muted" maxWidth="2xl">
  <FooterContainer>
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-8 border-b border-border/50">
      <div class="lg:col-span-6 space-y-2">
        <h3 class="text-base font-semibold tracking-tight text-foreground">
          Subscribe to Product Updates
        </h3>
        <p class="text-xs text-muted-foreground leading-relaxed">
          Get weekly releases, new component alerts, and reactive primitive recipes in your inbox.
        </p>
      </div>
      <div class="lg:col-span-6 flex flex-col sm:flex-row gap-2 items-start sm:items-center">
        <Input placeholder="Enter your work email..." class="h-9 text-xs bg-background max-w-sm" />
        <Button size="sm" class="h-9 gap-1.5 shrink-0">
          <span>Subscribe</span>
          <Send class="size-3.5" />
        </Button>
      </div>
    </div>

    <FooterContent class="pt-8">
      <FooterColumn>
        <FooterColumnTitle>Components</FooterColumnTitle>
        <FooterColumnList>
          <FooterLink href="#">Buttons & Inputs</FooterLink>
          <FooterLink href="#">Navigation & Bars</FooterLink>
          <FooterLink href="#">Overlays & Modals</FooterLink>
          <FooterLink href="#">Data Tables</FooterLink>
        </FooterColumnList>
      </FooterColumn>

      <FooterColumn>
        <FooterColumnTitle>Hooks</FooterColumnTitle>
        <FooterColumnList>
          <FooterLink href="#">createClipboard</FooterLink>
          <FooterLink href="#">createColorMode</FooterLink>
          <FooterLink href="#">createWebSocket</FooterLink>
          <FooterLink href="#">createForm</FooterLink>
        </FooterColumnList>
      </FooterColumn>

      <FooterColumn>
        <FooterColumnTitle>Ecosystem</FooterColumnTitle>
        <FooterColumnList>
          <FooterLink href="#">SolidJS</FooterLink>
          <FooterLink href="#">Tailwind CSS v4</FooterLink>
          <FooterLink href="#">Kobalte UI</FooterLink>
        </FooterColumnList>
      </FooterColumn>

      <FooterColumn>
        <FooterColumnTitle>Community</FooterColumnTitle>
        <FooterColumnList>
          <FooterLink href="#">GitHub Discussions</FooterLink>
          <FooterLink href="#">Discord Chat</FooterLink>
          <FooterLink href="#">Twitter / X</FooterLink>
        </FooterColumnList>
      </FooterColumn>
    </FooterContent>

    <FooterBottom>
      <FooterCopyright>
        © 2026 Studio Inc. All rights reserved.
      </FooterCopyright>
      <div class="flex items-center gap-4 text-xs text-muted-foreground">
        <a href="#" class="hover:text-foreground">Security</a>
        <a href="#" class="hover:text-foreground">Privacy</a>
        <a href="#" class="hover:text-foreground">Cookies</a>
      </div>
    </FooterBottom>
  </FooterContainer>
</Footer>`;

const minimalCode = `<Footer variant="bordered" maxWidth="2xl">
  <FooterContainer class="py-6">
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-2 font-bold text-sm">
        <div class="size-6 rounded-md bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
          N
        </div>
        <span>Nikala UI</span>
      </div>

      <nav class="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
        <a href="#" class="hover:text-foreground transition-colors">Documentation</a>
        <a href="#" class="hover:text-foreground transition-colors">Components</a>
        <a href="#" class="hover:text-foreground transition-colors">Hooks</a>
        <a href="#" class="hover:text-foreground transition-colors">MCP Server</a>
        <a href="#" class="hover:text-foreground transition-colors">GitHub</a>
      </nav>

      <p class="text-xs text-muted-foreground">
        © 2026 Nikala UI. MIT License.
      </p>
    </div>
  </FooterContainer>
</Footer>`;

const floatingCode = `<Footer variant="floating" maxWidth="xl">
  <FooterContainer class="py-8">
    <div class="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
      <div class="space-y-1">
        <div class="font-bold text-sm tracking-tight text-card-foreground">
          Ready to build with Nikala UI?
        </div>
        <p class="text-xs text-muted-foreground">
          Explore our reactive SolidJS primitives suite and copy-paste components.
        </p>
      </div>

      <div class="flex items-center gap-3">
        <Button variant="outline" size="sm">Explore Docs</Button>
        <Button size="sm" class="gap-1.5">
          <span>Get Started</span>
          <ArrowRight class="size-3.5" />
        </Button>
      </div>
    </div>
  </FooterContainer>
</Footer>`;

/* API Table Schema */
const footerProps = [
  {
    name: "variant",
    type: '"default" | "muted" | "bordered" | "floating" | "transparent"',
    default: '"default"',
    description: "Visual style variant controlling backgrounds and top border styling.",
  },
  {
    name: "maxWidth",
    type: '"sm" | "md" | "lg" | "xl" | "2xl" | "full"',
    default: '"2xl"',
    description: "Maximum horizontal container width constraint.",
  },
  {
    name: "class",
    type: "string",
    description: "Additional CSS classes to pass to the root footer element.",
  },
];

export default function FooterDocPage() {
  return (
    <>
      <Seo
        title="Footer Component — SolidJS Tailwind v4"
        description="A responsive, accessible, and structured bottom navigation layout suite for websites, landing pages, and web applications in SolidJS."
        path="/docs/components/footer"
      />

      <div class="space-y-10 pb-16">
        <DocPageHeader
          title="Footer"
          badge="Layout"
          description="A responsive, accessible, and structured bottom navigation layout suite supporting multi-column link directories, brand sections, and newsletter inputs."
        />

        {/* Hero Preview */}
        <ComponentPreview name="footer" code={defaultCode} allowOverflow={true}>
          <div class="w-full max-w-4xl">
            <Footer variant="default" maxWidth="full" class="rounded-lg border border-border bg-card shadow-xs">
              <FooterContainer class="py-8 md:py-10">
                <FooterContent>
                  <FooterBrand>
                    <div class="flex items-center gap-2 font-bold text-base tracking-tight">
                      <div class="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-xs shadow-2xs">
                        N
                      </div>
                      <span>Nikala UI</span>
                      <Badge variant="outline" class="text-[10px] px-1.5 py-0 border-primary/30 text-primary">
                        v0.11.0
                      </Badge>
                    </div>
                    <p class="text-xs text-muted-foreground max-w-sm leading-relaxed">
                      Fine-grained copy-paste component system built natively for SolidJS and Tailwind CSS v4.
                    </p>
                  </FooterBrand>

                  <FooterColumn>
                    <FooterColumnTitle>Products</FooterColumnTitle>
                    <FooterColumnList>
                      <FooterLink href="#primitives">UI Primitives</FooterLink>
                      <FooterLink href="#hooks">Reactive Hooks</FooterLink>
                      <FooterLink href="#theming">Tailwind v4 Themes</FooterLink>
                      <FooterLink href="#mcp">AI MCP Server</FooterLink>
                    </FooterColumnList>
                  </FooterColumn>

                  <FooterColumn>
                    <FooterColumnTitle>Resources</FooterColumnTitle>
                    <FooterColumnList>
                      <FooterLink href="#docs">Documentation</FooterLink>
                      <FooterLink href="#cli">CLI Reference</FooterLink>
                      <FooterLink href="#playground">Playground</FooterLink>
                      <FooterLink href="#roadmap">Roadmap</FooterLink>
                    </FooterColumnList>
                  </FooterColumn>

                  <FooterColumn>
                    <FooterColumnTitle>Legal</FooterColumnTitle>
                    <FooterColumnList>
                      <FooterLink href="#privacy">Privacy Policy</FooterLink>
                      <FooterLink href="#terms">Terms of Service</FooterLink>
                      <FooterLink href="#license">MIT License</FooterLink>
                    </FooterColumnList>
                  </FooterColumn>
                </FooterContent>

                <FooterBottom>
                  <FooterCopyright>
                    © {new Date().getFullYear()} Nikala UI. Created with ❤️ for SolidJS.
                  </FooterCopyright>
                  <FooterSocials>
                    <a href="#globe" class="hover:text-foreground transition-colors">
                      <Globe class="size-4" />
                    </a>
                  </FooterSocials>
                </FooterBottom>
              </FooterContainer>
            </Footer>
          </div>
        </ComponentPreview>

        {/* Usage Section */}
        <div class="space-y-4">
          <DocSectionHeader title="Usage" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        {/* Examples Section */}
        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          {/* Example 1: With Newsletter Form */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">With Newsletter Form</h3>
            <p class="text-sm text-muted-foreground">
              Add email subscription forms and split headers above navigation columns for SaaS websites.
            </p>
            <ComponentPreview name="footer" code={newsletterCode} allowOverflow={true}>
              <div class="w-full max-w-4xl">
                <Footer variant="muted" maxWidth="full" class="rounded-lg border border-border shadow-xs">
                  <FooterContainer class="py-8 md:py-10">
                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-6 border-b border-border/50">
                      <div class="lg:col-span-6 space-y-1.5">
                        <h3 class="text-sm font-semibold tracking-tight text-foreground">
                          Subscribe to Product Updates
                        </h3>
                        <p class="text-xs text-muted-foreground leading-relaxed">
                          Get weekly releases, new component alerts, and reactive primitive recipes in your inbox.
                        </p>
                      </div>
                      <div class="lg:col-span-6 flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                        <Input placeholder="Enter your work email..." class="h-8 text-xs bg-background max-w-sm" />
                        <Button size="sm" class="h-8 gap-1.5 shrink-0">
                          <span>Subscribe</span>
                          <Send class="size-3" />
                        </Button>
                      </div>
                    </div>

                    <FooterContent class="pt-6">
                      <FooterColumn>
                        <FooterColumnTitle>Components</FooterColumnTitle>
                        <FooterColumnList>
                          <FooterLink href="#btn">Buttons & Inputs</FooterLink>
                          <FooterLink href="#nav">Navigation & Bars</FooterLink>
                          <FooterLink href="#mod">Overlays & Modals</FooterLink>
                          <FooterLink href="#tab">Data Tables</FooterLink>
                        </FooterColumnList>
                      </FooterColumn>

                      <FooterColumn>
                        <FooterColumnTitle>Hooks</FooterColumnTitle>
                        <FooterColumnList>
                          <FooterLink href="#clip">createClipboard</FooterLink>
                          <FooterLink href="#col">createColorMode</FooterLink>
                          <FooterLink href="#ws">createWebSocket</FooterLink>
                          <FooterLink href="#form">createForm</FooterLink>
                        </FooterColumnList>
                      </FooterColumn>

                      <FooterColumn>
                        <FooterColumnTitle>Ecosystem</FooterColumnTitle>
                        <FooterColumnList>
                          <FooterLink href="#solid">SolidJS</FooterLink>
                          <FooterLink href="#tw">Tailwind CSS v4</FooterLink>
                          <FooterLink href="#kob">Kobalte UI</FooterLink>
                        </FooterColumnList>
                      </FooterColumn>

                      <FooterColumn>
                        <FooterColumnTitle>Community</FooterColumnTitle>
                        <FooterColumnList>
                          <FooterLink href="#disc">Discussions</FooterLink>
                          <FooterLink href="#chat">Discord</FooterLink>
                          <FooterLink href="#x">Twitter / X</FooterLink>
                        </FooterColumnList>
                      </FooterColumn>
                    </FooterContent>

                    <FooterBottom class="mt-6 pt-4">
                      <FooterCopyright>
                        © 2026 Studio Inc. All rights reserved.
                      </FooterCopyright>
                      <div class="flex items-center gap-4 text-xs text-muted-foreground">
                        <a href="#sec" class="hover:text-foreground">Security</a>
                        <a href="#priv" class="hover:text-foreground">Privacy</a>
                        <a href="#cook" class="hover:text-foreground">Cookies</a>
                      </div>
                    </FooterBottom>
                  </FooterContainer>
                </Footer>
              </div>
            </ComponentPreview>
          </div>

          {/* Example 2: Minimalist Inline Footer */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Minimalist Single Row</h3>
            <p class="text-sm text-muted-foreground">
              A compact, single-row footer layout for dashboards, authentication screens, and clean web apps.
            </p>
            <ComponentPreview name="footer" code={minimalCode} allowOverflow={true}>
              <div class="w-full max-w-4xl">
                <Footer variant="bordered" maxWidth="full" class="rounded-lg border border-border shadow-xs">
                  <FooterContainer class="py-4 px-4 sm:px-6">
                    <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div class="flex items-center gap-2 font-bold text-sm">
                        <div class="size-6 rounded-md bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                          N
                        </div>
                        <span>Nikala UI</span>
                      </div>

                      <nav class="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                        <a href="#doc" class="hover:text-foreground transition-colors">Documentation</a>
                        <a href="#comp" class="hover:text-foreground transition-colors">Components</a>
                        <a href="#hook" class="hover:text-foreground transition-colors">Hooks</a>
                        <a href="#mcp" class="hover:text-foreground transition-colors">MCP Server</a>
                      </nav>

                      <p class="text-xs text-muted-foreground">
                        © 2026 Nikala UI. MIT License.
                      </p>
                    </div>
                  </FooterContainer>
                </Footer>
              </div>
            </ComponentPreview>
          </div>

          {/* Example 3: Floating Card Footer */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Floating Card Call-To-Action</h3>
            <p class="text-sm text-muted-foreground">
              A floating card container variant (<code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">variant="floating"</code>) with integrated call-to-action buttons.
            </p>
            <ComponentPreview name="footer" code={floatingCode} allowOverflow={true}>
              <div class="w-full max-w-4xl">
                <Footer variant="floating" maxWidth="full" class="my-0">
                  <FooterContainer class="py-6 px-6">
                    <div class="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                      <div class="space-y-1">
                        <div class="font-bold text-sm tracking-tight text-card-foreground">
                          Ready to build with Nikala UI?
                        </div>
                        <p class="text-xs text-muted-foreground">
                          Explore our reactive SolidJS primitives suite and copy-paste components.
                        </p>
                      </div>

                      <div class="flex items-center gap-2 shrink-0">
                        <Button variant="outline" size="sm" class="h-8">Explore Docs</Button>
                        <Button size="sm" class="h-8 gap-1.5">
                          <span>Get Started</span>
                          <ArrowRight class="size-3.5" />
                        </Button>
                      </div>
                    </div>
                  </FooterContainer>
                </Footer>
              </div>
            </ComponentPreview>
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-4">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="Footer"
            description="Root footer element managing visual styling variants and container max-width constraints."
            items={[
              {
                prop: "variant",
                type: '"default" | "muted" | "bordered" | "floating" | "transparent"',
                default: '"default"',
                description: "Visual appearance style variant.",
              },
              {
                prop: "maxWidth",
                type: '"sm" | "md" | "lg" | "xl" | "2xl" | "full"',
                default: '"2xl"',
                description: "Maximum inner content width constraint.",
              },
              {
                prop: "class",
                type: "string",
                default: "undefined",
                description: "Additional CSS classes.",
              },
            ]}
          />

          <DocApiTable
            title="FooterContainer"
            description="Inner wrapper providing responsive padding and horizontal constraints."
            items={[
              {
                prop: "class",
                type: "string",
                default: "undefined",
                description: "Additional CSS classes.",
              },
            ]}
          />

          <DocApiTable
            title="FooterContent"
            description="Responsive grid layout wrapper holding navigation columns and brand summary."
            items={[
              {
                prop: "class",
                type: "string",
                default: "undefined",
                description: "Additional CSS classes for custom grid column layouts.",
              },
            ]}
          />

          <DocApiTable
            title="FooterColumn"
            description="Vertical flex container for a single topic column."
            items={[
              {
                prop: "class",
                type: "string",
                default: "undefined",
                description: "Additional CSS classes.",
              },
            ]}
          />

          <DocApiTable
            title="FooterLink"
            description="Semantic anchor element with hover state styling and accessible tap targets."
            items={[
              {
                prop: "href",
                type: "string",
                default: "undefined",
                description: "Target URL destination.",
              },
              {
                prop: "class",
                type: "string",
                default: "undefined",
                description: "Additional CSS classes.",
              },
            ]}
          />

          <DocApiTable
            title="FooterBottom"
            description="Bottom bar dividing copyright text, legal policies, and social icon links."
            items={[
              {
                prop: "class",
                type: "string",
                default: "undefined",
                description: "Additional CSS classes.",
              },
            ]}
          />
        </div>

        {/* Next Steps */}
        <DocNextSteps
          previous={{
            title: "Navbar",
            href: "/docs/components/navbar",
          }}
          next={{
            title: "Sidebar",
            href: "/docs/components/sidebar",
          }}
        />
      </div>
    </>
  );
}
