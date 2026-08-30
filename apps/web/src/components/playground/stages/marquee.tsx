import { For, Show } from "solid-js";
import { Marquee } from "@/components/ui/marquee";
import {
  ReviewCard,
  ReviewHeader,
  ReviewProfile,
  ReviewAvatar,
  ReviewAuthor,
  ReviewRating,
  ReviewBody,
} from "@/components/ui/review-card";
import { Zap, Layers, Terminal, Cpu, Sparkles, Shield } from "lucide-solid";
import type { ComponentSpec, StageProps } from "@/types";

const reviews = [
  {
    name: "Alex River",
    username: "@alexriver",
    body: "Nikala UI + SolidJS is the fastest developer experience I have ever had. Fine-grained reactivity just works.",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    rating: 5,
  },
  {
    name: "Sarah Chen",
    username: "@sarahc_dev",
    body: "Tailwind v4 integration is flawless. Design tokens make dark mode seamless across the entire app.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    rating: 5,
  },
  {
    name: "Davit Kakhidze",
    username: "@davit_k",
    body: "The copy-paste model gives complete ownership. No locked dependencies, just clean TypeScript.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    rating: 5,
  },
  {
    name: "Elena Rostova",
    username: "@elena_ux",
    body: "The AI MCP Server integration saved us hours when scaffolding new UI sections and dashboard layouts.",
    img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
    rating: 5,
  },
];

const logos = [
  { name: "SolidJS", icon: "Zap" },
  { name: "Tailwind CSS", icon: "Layers" },
  { name: "TypeScript", icon: "Terminal" },
  { name: "Turborepo", icon: "Cpu" },
  { name: "Vite", icon: "Sparkles" },
  { name: "Kobalte UI", icon: "Shield" },
];

export const config: ComponentSpec = {
  id: "marquee",
  name: "Marquee",
  props: [
    {
      name: "duration",
      label: "Duration / Speed",
      type: "select",
      options: ["15s", "25s", "30s", "40s", "50s"],
      default: "30s",
    },
    {
      name: "reverse",
      label: "Reverse Direction",
      type: "boolean",
      default: false,
    },
    {
      name: "pauseOnHover",
      label: "Pause On Hover",
      type: "boolean",
      default: true,
    },
    {
      name: "fadeEdges",
      label: "Fade Edges Gradient",
      type: "boolean",
      default: true,
    },
    {
      name: "vertical",
      label: "Vertical Scroll",
      type: "boolean",
      default: false,
    },
    {
      name: "gap",
      label: "Gap Spacing",
      type: "select",
      options: ["0.5rem", "1rem", "1.5rem", "2rem"],
      default: "1rem",
    },
    {
      name: "contentType",
      label: "Content Preset",
      type: "select",
      options: ["reviews", "logos"],
      default: "reviews",
    },
  ],
  generateCode: (v) => {
    const reverseStr = v.reverse ? " reverse" : "";
    const pauseStr = v.pauseOnHover !== false ? " pauseOnHover" : "";
    const fadeStr = v.fadeEdges !== false ? " fadeEdges" : "";
    const vertStr = v.vertical ? " vertical" : "";
    const duration = v.duration || "30s";
    const gap = v.gap || "1rem";
    const isLogos = v.contentType === "logos";

    if (isLogos) {
      return `<Marquee${reverseStr}${pauseStr}${fadeStr}${vertStr} duration="${duration}" gap="${gap}">
  <For each={logos}>
    {(logo) => (
      <div class="flex items-center gap-2 text-sm font-semibold text-muted-foreground px-4 py-2 rounded-md hover:bg-muted/80">
        <span>{logo.name}</span>
      </div>
    )}
  </For>
</Marquee>`;
    }

    return `<Marquee${reverseStr}${pauseStr}${fadeStr}${vertStr} duration="${duration}" gap="${gap}">
  <For each={reviews}>
    {(review) => (
      <ReviewCard class="w-72 shrink-0">
        <ReviewHeader>
          <ReviewProfile>
            <ReviewAvatar src={review.img} alt={review.name} />
            <ReviewAuthor name={review.name} username={review.username} />
          </ReviewProfile>
          <ReviewRating value={review.rating} />
        </ReviewHeader>
        <ReviewBody class="line-clamp-2">
          "{review.body}"
        </ReviewBody>
      </ReviewCard>
    )}
  </For>
</Marquee>`;
  },
};

export default function MarqueeStage(props: StageProps) {
  const duration = () => String(props.values.duration || "30s");
  const reverse = () => Boolean(props.values.reverse);
  const pauseOnHover = () => props.values.pauseOnHover !== false;
  const fadeEdges = () => props.values.fadeEdges !== false;
  const vertical = () => Boolean(props.values.vertical);
  const gap = () => String(props.values.gap || "1rem");
  const contentType = () => String(props.values.contentType || "reviews");

  const logoComponents = [
    { name: "SolidJS", icon: Zap },
    { name: "Tailwind CSS", icon: Layers },
    { name: "TypeScript", icon: Terminal },
    { name: "Turborepo", icon: Cpu },
    { name: "Vite", icon: Sparkles },
    { name: "Kobalte UI", icon: Shield },
  ];

  return (
    <div
      class={
        vertical()
          ? "w-full max-w-sm h-80 overflow-hidden border border-border rounded-lg bg-card/40 p-2 mx-auto"
          : "w-full max-w-4xl overflow-hidden py-4"
      }
    >
      <Marquee
        duration={duration()}
        reverse={reverse()}
        pauseOnHover={pauseOnHover()}
        fadeEdges={fadeEdges()}
        vertical={vertical()}
        gap={gap()}
        class={vertical() ? "h-full" : "w-full"}
      >
        <Show
          when={contentType() === "reviews"}
          fallback={
            <For each={logoComponents}>
              {(logo) => (
                <div class="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors px-3.5 py-2 rounded-md hover:bg-muted cursor-default shrink-0">
                  <logo.icon class="size-4.5 text-primary" />
                  <span>{logo.name}</span>
                </div>
              )}
            </For>
          }
        >
          <For each={reviews}>
            {(review) => (
              <ReviewCard
                class={
                  vertical()
                    ? "w-full shrink-0 shadow-2xs"
                    : "w-72 shrink-0 shadow-2xs"
                }
              >
                <ReviewHeader>
                  <ReviewProfile>
                    <ReviewAvatar src={review.img} alt={review.name} />
                    <ReviewAuthor name={review.name} username={review.username} />
                  </ReviewProfile>
                  <ReviewRating value={review.rating} />
                </ReviewHeader>
                <ReviewBody class="line-clamp-2">
                  "{review.body}"
                </ReviewBody>
              </ReviewCard>
            )}
          </For>
        </Show>
      </Marquee>
    </div>
  );
}
