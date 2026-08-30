import { Show } from "solid-js";
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
import { Globe, Send } from "lucide-solid";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "footer",
  name: "Footer",
  props: [
    {
      name: "variant",
      label: "Variant",
      type: "select",
      options: ["default", "muted", "bordered", "floating", "transparent"],
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
      name: "showNewsletter",
      label: "Include Newsletter",
      type: "boolean",
      default: false,
    },
    {
      name: "showSocials",
      label: "Include Social Icons",
      type: "boolean",
      default: true,
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
    const brand = v.brandTitle || "Nikala UI";

    return `<Footer${variantStr}${maxWidthStr}>
  <FooterContainer>${
    v.showNewsletter
      ? `
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-8 border-b border-border/50">
      <div class="lg:col-span-6 space-y-1">
        <h3 class="text-sm font-semibold tracking-tight text-foreground">Subscribe to Updates</h3>
        <p class="text-xs text-muted-foreground">Get weekly releases and UI component alerts.</p>
      </div>
      <div class="lg:col-span-6 flex flex-col sm:flex-row gap-2 items-start sm:items-center">
        <Input placeholder="Enter your email..." class="h-8 text-xs bg-background max-w-sm" />
        <Button size="sm" class="h-8 gap-1.5 shrink-0">
          <span>Subscribe</span>
          <Send class="size-3" />
        </Button>
      </div>
    </div>
`
      : ""
  }
    <FooterContent${v.showNewsletter ? ' class="pt-8"' : ""}>
      {/* Brand Column */}
      <FooterBrand>
        <div class="flex items-center gap-2 font-bold text-base tracking-tight">
          <div class="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-xs shadow-2xs">
            N
          </div>
          <span>${brand}</span>
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
          <FooterLink href="#">Themes</FooterLink>
          <FooterLink href="#">MCP Server</FooterLink>
        </FooterColumnList>
      </FooterColumn>

      {/* Column 2 */}
      <FooterColumn>
        <FooterColumnTitle>Resources</FooterColumnTitle>
        <FooterColumnList>
          <FooterLink href="#">Documentation</FooterLink>
          <FooterLink href="#">CLI Tool</FooterLink>
          <FooterLink href="#">Playground</FooterLink>
          <FooterLink href="#">Roadmap</FooterLink>
        </FooterColumnList>
      </FooterColumn>

      {/* Column 3 */}
      <FooterColumn>
        <FooterColumnTitle>Legal</FooterColumnTitle>
        <FooterColumnList>
          <FooterLink href="#">Privacy Policy</FooterLink>
          <FooterLink href="#">Terms</FooterLink>
          <FooterLink href="#">MIT License</FooterLink>
        </FooterColumnList>
      </FooterColumn>
    </FooterContent>

    {/* Bottom Bar */}
    <FooterBottom>
      <FooterCopyright>
        © ${new Date().getFullYear()} ${brand}. All rights reserved.
      </FooterCopyright>${
        v.showSocials !== false
          ? `
      <FooterSocials>
        <a href="#" class="hover:text-foreground transition-colors">
          <Globe class="size-4" />
        </a>
      </FooterSocials>`
          : ""
      }
    </FooterBottom>
  </FooterContainer>
</Footer>`;
  },
};

export default function FooterStage(props: StageProps) {
  const variant = () => (props.values.variant as "default" | "muted" | "bordered" | "floating" | "transparent") || "default";
  const maxWidth = () => (props.values.maxWidth as "2xl" | "xl" | "lg" | "md" | "sm" | "full") || "2xl";
  const showNewsletter = () => Boolean(props.values.showNewsletter);
  const showSocials = () => props.values.showSocials !== false;
  const brandTitle = () => String(props.values.brandTitle || "Nikala UI");

  return (
    <div class="w-full flex flex-col justify-start items-center p-2 min-h-[360px]">
      <Footer
        variant={variant()}
        maxWidth={maxWidth()}
      >
        <FooterContainer class="py-8 md:py-10">
          <Show when={showNewsletter()}>
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-8 border-b border-border/50 mb-10">
              <div class="lg:col-span-6 space-y-1.5">
                <h3 class="text-sm font-semibold tracking-tight text-foreground">
                  Subscribe to Updates
                </h3>
                <p class="text-xs text-muted-foreground leading-relaxed">
                  Get weekly releases and new component alerts in your inbox.
                </p>
              </div>
              <div class="lg:col-span-6 flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                <Input placeholder="Enter your email..." class="h-8 text-xs bg-background max-w-sm" />
                <Button size="sm" class="h-8 gap-1.5 shrink-0">
                  <span>Subscribe</span>
                  <Send class="size-3" />
                </Button>
              </div>
            </div>
          </Show>

          <FooterContent>
            <FooterBrand>
              <div class="flex items-center gap-2 font-bold text-base tracking-tight">
                <div class="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-xs shadow-2xs">
                  N
                </div>
                <span>{brandTitle()}</span>
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
                <FooterLink href="#theming">Themes</FooterLink>
                <FooterLink href="#mcp">MCP Server</FooterLink>
              </FooterColumnList>
            </FooterColumn>

            <FooterColumn>
              <FooterColumnTitle>Resources</FooterColumnTitle>
              <FooterColumnList>
                <FooterLink href="#docs">Documentation</FooterLink>
                <FooterLink href="#cli">CLI Tool</FooterLink>
                <FooterLink href="#playground">Playground</FooterLink>
                <FooterLink href="#roadmap">Roadmap</FooterLink>
              </FooterColumnList>
            </FooterColumn>

            <FooterColumn>
              <FooterColumnTitle>Legal</FooterColumnTitle>
              <FooterColumnList>
                <FooterLink href="#privacy">Privacy Policy</FooterLink>
                <FooterLink href="#terms">Terms</FooterLink>
                <FooterLink href="#license">MIT License</FooterLink>
              </FooterColumnList>
            </FooterColumn>
          </FooterContent>

          <FooterBottom>
            <FooterCopyright>
              © {new Date().getFullYear()} {brandTitle()}. All rights reserved.
            </FooterCopyright>
            <Show when={showSocials()}>
              <FooterSocials>
                <a href="#globe" class="hover:text-foreground transition-colors">
                  <Globe class="size-4" />
                </a>
              </FooterSocials>
            </Show>
          </FooterBottom>
        </FooterContainer>
      </Footer>
    </div>
  );
}
