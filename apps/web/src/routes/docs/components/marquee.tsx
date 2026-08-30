import { Component, For } from "solid-js";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Seo } from "@/components/seo";
import { Marquee } from "@/components/ui/marquee";
import {
  ReviewCard,
  ReviewHeader,
  ReviewProfile,
  ReviewAvatar,
  ReviewAuthor,
  ReviewBody,
} from "@/components/ui/review-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Sparkles,
  Zap,
  Globe,
  Terminal,
  Shield,
  Layers,
  Cpu,
  Star,
} from "lucide-solid";

const reviews = [
  {
    name: "Alex River",
    username: "@alexriver",
    body: "Nikala UI + SolidJS is the fastest developer experience I have ever had. Fine-grained reactivity just works.",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
  },
  {
    name: "Sarah Chen",
    username: "@sarahc_dev",
    body: "Tailwind v4 integration is flawless. Design tokens make dark mode seamless across the entire app.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
  },
  {
    name: "Davit Kakhidze",
    username: "@davit_k",
    body: "The copy-paste model gives complete ownership. No locked dependencies, just clean TypeScript.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
  },
  {
    name: "Elena Rostova",
    username: "@elena_ux",
    body: "The AI MCP Server integration saved us hours when scaffolding new UI sections and dashboard layouts.",
    img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
  },
];

const logos = [
  { name: "SolidJS", icon: Zap },
  { name: "Tailwind CSS", icon: Layers },
  { name: "TypeScript", icon: Terminal },
  { name: "Turborepo", icon: Cpu },
  { name: "Vite", icon: Sparkles },
  { name: "Kobalte UI", icon: Shield },
];

/* Code Snippets */
const importCode = `import { Marquee } from "@/components/ui/marquee";`;

const defaultCode = `<Marquee pauseOnHover fadeEdges duration="30s" class="py-4">
  <For each={reviews}>
    {(review) => (
      <ReviewCard class="w-72 shrink-0">
        <ReviewHeader>
          <ReviewProfile>
            <ReviewAvatar src={review.img} alt={review.name} />
            <ReviewAuthor name={review.name} username={review.username} />
          </ReviewProfile>
        </ReviewHeader>
        <ReviewBody class="line-clamp-2">
          "{review.body}"
        </ReviewBody>
      </ReviewCard>
    )}
  </For>
</Marquee>`;

const logosCode = `<Marquee pauseOnHover fadeEdges duration="25s" gap="2rem" class="py-6 border-y border-border/50 bg-muted/20">
  <For each={logos}>
    {(logo) => (
      <div class="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors px-4 py-2 rounded-md hover:bg-muted">
        <logo.icon class="size-5 text-primary" />
        <span>{logo.name}</span>
      </div>
    )}
  </For>
</Marquee>`;

const dualCode = `<div class="space-y-4">
  {/* Forward Row */}
  <Marquee pauseOnHover fadeEdges duration="35s">
    <For each={reviews}>
      {(review) => (
        <div class="w-64 shrink-0 rounded-lg border border-border bg-card p-3 shadow-2xs">
          <p class="text-xs text-muted-foreground">{review.body}</p>
        </div>
      )}
    </For>
  </Marquee>

  {/* Reverse Opposing Row */}
  <Marquee reverse pauseOnHover fadeEdges duration="35s">
    <For each={reviews}>
      {(review) => (
        <div class="w-64 shrink-0 rounded-lg border border-border bg-card p-3 shadow-2xs">
          <p class="text-xs text-muted-foreground">{review.body}</p>
        </div>
      )}
    </For>
  </Marquee>
</div>`;

const verticalCode = `<div class="h-80 overflow-hidden border border-border rounded-lg bg-card/40 p-4">
  <Marquee vertical pauseOnHover fadeEdges duration="20s" gap="1rem" class="h-full">
    <For each={reviews}>
      {(review) => (
        <div class="w-full rounded-lg border border-border bg-card p-3 shadow-2xs">
          <div class="flex items-center gap-2 mb-1">
            <span class="text-xs font-semibold">{review.name}</span>
            <span class="text-[11px] text-muted-foreground">{review.username}</span>
          </div>
          <p class="text-xs text-muted-foreground">{review.body}</p>
        </div>
      )}
    </For>
  </Marquee>
</div>`;

export default function MarqueeDocPage() {
  return (
    <>
      <Seo
        title="Marquee Component — SolidJS Tailwind v4"
        description="A smooth, GPU-accelerated infinite scrolling ticker component for logo clouds, testimonials, and live ribbons in SolidJS."
        path="/docs/components/marquee"
      />

      <div class="space-y-10 pb-16">
        <DocPageHeader
          title="Marquee"
          badge="Animation"
          description="A smooth, GPU-accelerated infinite scrolling ticker component for partner logo clouds, review testimonials, and live text ribbons."
        />

        {/* Hero Preview */}
        <ComponentPreview name="marquee" code={defaultCode} allowOverflow={true}>
          <div class="w-full max-w-4xl overflow-hidden py-4">
            <Marquee pauseOnHover fadeEdges duration="30s">
              <For each={reviews}>
                {(review) => (
                  <ReviewCard class="w-72 shrink-0">
                    <ReviewHeader>
                      <ReviewProfile>
                        <ReviewAvatar src={review.img} alt={review.name} />
                        <ReviewAuthor name={review.name} username={review.username} />
                      </ReviewProfile>
                    </ReviewHeader>
                    <ReviewBody class="line-clamp-2">
                      "{review.body}"
                    </ReviewBody>
                  </ReviewCard>
                )}
              </For>
            </Marquee>
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

          {/* Example 1: Logo Cloud */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Logo Cloud & Partners</h3>
            <p class="text-sm text-muted-foreground">
              Display infinite scrolling partner, customer, or tech stack logos with custom gap spacing.
            </p>
            <ComponentPreview name="marquee" code={logosCode} allowOverflow={true}>
              <div class="w-full max-w-4xl overflow-hidden py-4">
                <Marquee pauseOnHover fadeEdges duration="25s" gap="2rem" class="py-4 border-y border-border/50 bg-muted/20">
                  <For each={logos}>
                    {(logo) => (
                      <div class="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md hover:bg-muted/80 cursor-default">
                        <logo.icon class="size-4.5 text-primary" />
                        <span>{logo.name}</span>
                      </div>
                    )}
                  </For>
                </Marquee>
              </div>
            </ComponentPreview>
          </div>

          {/* Example 2: Dual Opposing Rows */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Dual Opposing Direction Rows</h3>
            <p class="text-sm text-muted-foreground">
              Stack two Marquees with the <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">reverse</code> prop on the second row for dynamic visual motion.
            </p>
            <ComponentPreview name="marquee" code={dualCode} allowOverflow={true}>
              <div class="w-full max-w-4xl overflow-hidden space-y-3 py-4">
                <Marquee pauseOnHover fadeEdges duration="35s">
                  <For each={reviews}>
                    {(review) => (
                      <div class="w-64 shrink-0 rounded-lg border border-border bg-card p-3 shadow-2xs">
                        <div class="flex items-center gap-2 mb-1.5">
                          <Avatar class="size-6">
                            <AvatarImage src={review.img} />
                            <AvatarFallback>{review.name[0]}</AvatarFallback>
                          </Avatar>
                          <span class="text-xs font-semibold">{review.name}</span>
                        </div>
                        <p class="text-xs text-muted-foreground line-clamp-2">{review.body}</p>
                      </div>
                    )}
                  </For>
                </Marquee>

                <Marquee reverse pauseOnHover fadeEdges duration="35s">
                  <For each={reviews}>
                    {(review) => (
                      <div class="w-64 shrink-0 rounded-lg border border-border bg-card p-3 shadow-2xs">
                        <div class="flex items-center gap-2 mb-1.5">
                          <Avatar class="size-6">
                            <AvatarImage src={review.img} />
                            <AvatarFallback>{review.name[0]}</AvatarFallback>
                          </Avatar>
                          <span class="text-xs font-semibold">{review.name}</span>
                        </div>
                        <p class="text-xs text-muted-foreground line-clamp-2">{review.body}</p>
                      </div>
                    )}
                  </For>
                </Marquee>
              </div>
            </ComponentPreview>
          </div>

          {/* Example 3: Vertical Marquee */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Vertical Infinite Scroll</h3>
            <p class="text-sm text-muted-foreground">
              Set <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">vertical={true}</code> inside a fixed-height container for streaming feeds and live activity columns.
            </p>
            <ComponentPreview name="marquee" code={verticalCode} allowOverflow={true}>
              <div class="w-full max-w-sm h-72 overflow-hidden border border-border rounded-lg bg-card/40 p-2 mx-auto">
                <Marquee vertical pauseOnHover fadeEdges duration="20s" gap="0.75rem" class="h-full">
                  <For each={reviews}>
                    {(review) => (
                      <div class="w-full rounded-lg border border-border bg-card p-3 shadow-2xs">
                        <div class="flex items-center gap-2 mb-1">
                          <span class="text-xs font-semibold">{review.name}</span>
                          <span class="text-[11px] text-muted-foreground">{review.username}</span>
                        </div>
                        <p class="text-xs text-muted-foreground">{review.body}</p>
                      </div>
                    )}
                  </For>
                </Marquee>
              </div>
            </ComponentPreview>
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-4">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="Marquee"
            description="Infinite scrolling ticker container component."
            items={[
              {
                prop: "duration",
                type: "number | string",
                default: '"40s"',
                description: "Animation cycle duration controlling scroll speed (e.g. 20, '30s', '45s').",
              },
              {
                prop: "reverse",
                type: "boolean",
                default: "false",
                description: "Reverses the animation direction (right to left or bottom to top).",
              },
              {
                prop: "pauseOnHover",
                type: "boolean",
                default: "false",
                description: "Pauses the animation smoothly when the user hovers over the track.",
              },
              {
                prop: "vertical",
                type: "boolean",
                default: "false",
                description: "Scrolls elements vertically instead of horizontally.",
              },
              {
                prop: "repeat",
                type: "number",
                default: "4",
                description: "Number of duplicated child cycles to guarantee a continuous seamless loop.",
              },
              {
                prop: "gap",
                type: "string",
                default: '"1rem"',
                description: "Spacing between adjacent marquee items (e.g. '1rem', '2rem', '24px').",
              },
              {
                prop: "fadeEdges",
                type: "boolean",
                default: "false",
                description: "Applies a subtle CSS gradient mask to smoothly fade edges into the background.",
              },
              {
                prop: "class",
                type: "string",
                default: "undefined",
                description: "Additional CSS classes to pass to the root container.",
              },
            ]}
          />
        </div>

        {/* Next Steps */}
        <DocNextSteps
          prev={{
            title: "Stat",
            href: "/docs/components/stat",
          }}
          next={{
            title: "Timeline",
            href: "/docs/components/timeline",
          }}
        />
      </div>
    </>
  );
}
