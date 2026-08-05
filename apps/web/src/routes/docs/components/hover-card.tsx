import { createSignal } from "solid-js";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
  HoverCardArrow,
} from "@/components/ui/hover-card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function HoverCardDocsPage() {
  const [isFollowing, setIsFollowing] = createSignal(false);

  return (
    <>
      <Seo
        title="Hover Card Component"
        description="Twitter and GitHub style profile preview card triggered on hover, built on Kobalte primitives."
        path="/docs/components/hover-card"
      />

      <div class="space-y-10 pb-16">
        <DocPageHeader
          title="Hover Card"
          badge="UI Component"
          description="Displays rich contextual popover content when users hover over an avatar or link, built on Kobalte primitives."
        />

        {/* 1. Basic User Profile Hover Card */}
        <DocSectionHeader
          title="User Profile Preview"
          description="Twitter/GitHub style user bio and follow action preview card."
        />

        <ComponentPreview
          name="hover-card"
          code={`<HoverCard>
  <HoverCardTrigger href="https://github.com/magradze" target="_blank">
    @magradze
  </HoverCardTrigger>
  <HoverCardContent class="w-80">
    <div class="flex justify-between space-x-4">
      <Avatar>
        <AvatarImage src="https://github.com/magradze.png" alt="Magradze" />
        <AvatarFallback>NM</AvatarFallback>
      </Avatar>
      <div class="space-y-1 text-left flex-1">
        <h4 class="text-sm font-semibold">Giorgi Magradze</h4>
        <p class="text-xs text-muted-foreground">
          Creator of Nikala UI. Building elegant SolidJS UI components.
        </p>
        <div class="flex items-center pt-2 gap-4 text-xs text-muted-foreground">
          <span><strong class="text-foreground">1.2k</strong> Followers</span>
          <span><strong class="text-foreground">180</strong> Following</span>
        </div>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>`}
        >
          <div class="flex items-center justify-center py-8">
            <HoverCard>
              <HoverCardTrigger href="https://github.com/magradze" target="_blank">
                @magradze
              </HoverCardTrigger>
              <HoverCardContent class="w-80">
                <HoverCardArrow />
                <div class="flex justify-between space-x-4">
                  <Avatar class="h-10 w-10">
                    <AvatarImage src="https://github.com/magradze.png" alt="Magradze" />
                    <AvatarFallback>NM</AvatarFallback>
                  </Avatar>
                  <div class="space-y-1 text-left flex-1">
                    <div class="flex items-center justify-between">
                      <h4 class="text-sm font-semibold">Giorgi Magradze</h4>
                      <Button
                        size="sm"
                        variant={isFollowing() ? "outline" : "default"}
                        onClick={() => setIsFollowing(!isFollowing())}
                        class="h-7 px-2.5 text-xs"
                      >
                        {isFollowing() ? "Following" : "Follow"}
                      </Button>
                    </div>
                    <p class="text-xs text-muted-foreground">
                      Creator of Nikala UI. Building elegant SolidJS UI primitives.
                    </p>
                    <div class="flex items-center pt-2 gap-4 text-xs text-muted-foreground">
                      <span><strong class="text-foreground">1.2k</strong> Followers</span>
                      <span><strong class="text-foreground">180</strong> Following</span>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </ComponentPreview>

        {/* 2. Repository / Link Preview */}
        <DocSectionHeader
          title="Repository & Project Preview"
          description="Hover card for displaying repository status and star counts."
        />

        <ComponentPreview
          name="hover-card"
          code={`<HoverCard>
  <HoverCardTrigger href="https://github.com/nikala-ui/ui" target="_blank">
    nikala-ui/ui
  </HoverCardTrigger>
  <HoverCardContent class="w-80">
    <div class="space-y-2">
      <div class="flex items-center justify-between">
        <h4 class="text-sm font-semibold">nikala-ui/ui</h4>
        <span class="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">v1.0.0</span>
      </div>
      <p class="text-xs text-muted-foreground">
        Beautiful, accessible SolidJS UI component library powered by Tailwind CSS.
      </p>
      <div class="flex items-center gap-4 pt-2 text-xs text-muted-foreground font-mono">
        <span>⭐ 3,450 stars</span>
        <span>TypeScript</span>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>`}
        >
          <div class="flex items-center justify-center py-8">
            <HoverCard>
              <HoverCardTrigger href="https://github.com/nikala-ui/ui" target="_blank">
                nikala-ui/ui
              </HoverCardTrigger>
              <HoverCardContent class="w-80">
                <HoverCardArrow />
                <div class="space-y-2">
                  <div class="flex items-center justify-between">
                    <h4 class="text-sm font-semibold">nikala-ui/ui</h4>
                    <span class="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">v1.0.0</span>
                  </div>
                  <p class="text-xs text-muted-foreground">
                    Beautiful, accessible SolidJS UI component library powered by Tailwind CSS.
                  </p>
                  <div class="flex items-center gap-4 pt-2 text-xs text-muted-foreground font-mono">
                    <span>⭐ 3,450 stars</span>
                    <span>TypeScript</span>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </ComponentPreview>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="HoverCard (Root)"
            items={[
              {
                prop: "openDelay",
                type: "number",
                default: "200",
                description: "Delay in milliseconds before showing the preview card.",
              },
              {
                prop: "closeDelay",
                type: "number",
                default: "150",
                description: "Delay in milliseconds before hiding the preview card on mouse leave.",
              },
              {
                prop: "open",
                type: "boolean",
                default: "false",
                description: "Controlled visibility state of the hover card.",
              },
              {
                prop: "onOpenChange",
                type: "(open: boolean) => void",
                default: "—",
                description: "Callback fired when open state changes.",
              },
            ]}
          />
        </div>

        <DocNextSteps
          prev={{ title: "Input Group Component", href: "/docs/components/input-group" }}
          next={{ title: "Kbd Component", href: "/docs/components/kbd" }}
        />
      </div>
    </>
  );
}
