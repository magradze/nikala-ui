import { For, type Component } from "solid-js";
import { A } from "@solidjs/router";
import { Title, Meta } from "@solidjs/meta";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  Sparkles,
  Zap,
  Layers,
  ArrowRight,
  Lock,
  LayoutTemplate,
  CreditCard,
  BarChart3,
  MessagesSquare,
} from "lucide-solid";

interface BlockCategoryCard {
  id: string;
  title: string;
  description: string;
  href: string;
  count: number;
  icon: typeof Lock;
  isAvailable: boolean;
  featured?: string;
}

const CATEGORIES: BlockCategoryCard[] = [
  {
    id: "authentication",
    title: "Authentication",
    description: "Split-screen login forms, registration cards with password strength, 2FA verification, and recovery layouts.",
    href: "/blocks/login-01",
    count: 4,
    icon: Lock,
    isAvailable: true,
    featured: "Login 01, Register 01, OTP, Reset",
  },
  {
    id: "hero",
    title: "Hero Sections",
    description: "High-impact hero headers, centered badge layouts, dual CTAs, and video backdrops.",
    href: "/blocks/hero-01",
    count: 1,
    icon: LayoutTemplate,
    isAvailable: true,
    featured: "Hero 01",
  },
  {
    id: "pricing",
    title: "Pricing & Plans",
    description: "Tier comparison tables, monthly/yearly billing toggles, feature checkmarks, and checkout cards.",
    href: "#",
    count: 0,
    icon: CreditCard,
    isAvailable: false,
  },
  {
    id: "dashboard",
    title: "Dashboard & Shells",
    description: "Application layouts with responsive collapsible sidebars, stat metrics, and data tables.",
    href: "#",
    count: 0,
    icon: BarChart3,
    isAvailable: false,
  },
  {
    id: "testimonials",
    title: "Social Proof & Reviews",
    description: "Customer quote grids, animated marquee logo streams, and glassmorphic review cards.",
    href: "#",
    count: 0,
    icon: MessagesSquare,
    isAvailable: false,
  },
];

export default function BlocksHubPage() {
  return (
    <>
      <Title>Blocks — Nikala UI</Title>
      <Meta
        name="description"
        content="Production-ready SolidJS blocks and section templates built natively with Nikala UI and Tailwind CSS v4."
      />

      <div class="space-y-10 pb-16">
        {/* Page Hero Header */}
        <div class="space-y-4 max-w-3xl">
          <div class="inline-flex items-center gap-2 px-2.5 py-1 rouded-lg border border-primary/20 bg-primary/5 text-primary text-xs font-medium">
            <Sparkles class="size-3.5" />
            <span>Nikala UI Blocks</span>
            <Badge variant="secondary" class="text-[10px] px-1.5 py-0 bg-primary/15 text-primary border-0 font-medium">
              New
            </Badge>
          </div>

          <h1 class="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
            SolidJS Application & Marketing Blocks
          </h1>
          <p class="text-base text-muted-foreground leading-relaxed">
            Carefully crafted, responsive section compositions. Copy-paste full blocks directly into your codebase with complete source ownership.
          </p>

          <div class="flex flex-wrap items-center gap-6 pt-1 text-xs text-muted-foreground">
            <div class="flex items-center gap-1.5">
              <Layers class="size-4 text-primary" />
              <span>Pure Copy-Paste Ownership</span>
            </div>
            <div class="flex items-center gap-1.5">
              <Zap class="size-4 text-primary" />
              <span>Tailwind CSS v4 Design Tokens</span>
            </div>
            <div class="flex items-center gap-1.5">
              <ShieldCheck class="size-4 text-primary" />
              <span>Fine-Grained Reactivity</span>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div class="space-y-4">
          <h2 class="text-lg font-bold tracking-tight text-foreground">
            Browse by Category
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <For each={CATEGORIES}>
              {(cat) => {
                const IconComponent = cat.icon;

                if (!cat.isAvailable) {
                  return (
                    <Card class="opacity-60 border-dashed border-border/70 bg-card/30 flex flex-col justify-between">
                      <CardHeader class="pb-3">
                        <div class="flex items-center justify-between">
                          <div class="size-9 rounded-md bg-muted flex items-center justify-center text-muted-foreground">
                            <IconComponent class="size-4.5" />
                          </div>
                          <Badge variant="outline" class="text-[10px] text-muted-foreground border-border/60">
                            Coming Soon
                          </Badge>
                        </div>
                        <CardTitle class="text-base mt-3 text-foreground/80">{cat.title}</CardTitle>
                        <CardDescription class="text-xs leading-relaxed">
                          {cat.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  );
                }

                return (
                  <A
                    href={cat.href}
                    class="group block transition-all hover:-translate-y-0.5 focus:outline-none"
                  >
                    <Card class="h-full border-border/70 hover:border-primary/50 hover:shadow-sm transition-all bg-card/60 flex flex-col justify-between">
                      <CardHeader class="pb-3">
                        <div class="flex items-center justify-between">
                          <div class="size-9 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                            <IconComponent class="size-4.5" />
                          </div>
                          <Badge variant="secondary" class="text-[10px] bg-primary/10 text-primary border-0 font-medium">
                            {cat.count} {cat.count === 1 ? "Block" : "Blocks"}
                          </Badge>
                        </div>
                        <CardTitle class="text-base mt-3 group-hover:text-primary transition-colors flex items-center justify-between">
                          <span>{cat.title}</span>
                          <ArrowRight class="size-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                        </CardTitle>
                        <CardDescription class="text-xs leading-relaxed">
                          {cat.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent class="pt-0 pb-4">
                        <div class="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <span class="font-mono text-[11px] text-foreground font-medium">{cat.featured}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </A>
                );
              }}
            </For>
          </div>
        </div>
      </div>
    </>
  );
}
