import { createSignal } from "solid-js";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
  HoverCardArrow,
} from "@/components/ui/hover-card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "hover-card",
  name: "Hover Card",
  props: [
    { name: "username", label: "Username", type: "text", default: "magradze" },
    { name: "name", label: "Full Name", type: "text", default: "Giorgi Magradze" },
    { name: "bio", label: "Bio Text", type: "text", default: "Creator of Nikala UI." },
    { name: "followers", label: "Followers", type: "text", default: "1.2k" },
  ],
  generateCode: (v) => `<HoverCard>
  <HoverCardTrigger href="https://github.com/${v.username || "magradze"}" target="_blank">
    @${v.username || "magradze"}
  </HoverCardTrigger>
  <HoverCardContent class="w-80">
    <div class="flex justify-between space-x-4">
      <Avatar>
        <AvatarImage src="https://github.com/${v.username || "magradze"}.png" alt="${v.name || "Magradze"}" />
        <AvatarFallback>NM</AvatarFallback>
      </Avatar>
      <div class="space-y-1 text-left flex-1">
        <h4 class="text-sm font-semibold">${v.name || "Giorgi Magradze"}</h4>
        <p class="text-xs text-muted-foreground">${v.bio || "Creator of Nikala UI."}</p>
        <div class="flex items-center pt-2 gap-4 text-xs text-muted-foreground">
          <span><strong class="text-foreground">${v.followers || "1.2k"}</strong> Followers</span>
        </div>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>`,
};

export default function HoverCardStage(props: StageProps) {
  const [isFollowing, setIsFollowing] = createSignal(false);

  return (
    <div class="flex items-center justify-center py-8 min-h-40">
      <HoverCard>
        <HoverCardTrigger
          href={`https://github.com/${props.values.username || "magradze"}`}
          target="_blank"
        >
          @{props.values.username || "magradze"}
        </HoverCardTrigger>
        <HoverCardContent class="w-80">
          <HoverCardArrow />
          <div class="flex justify-between space-x-4">
            <Avatar class="h-10 w-10">
              <AvatarImage
                src={`https://github.com/${props.values.username || "magradze"}.png`}
                alt={props.values.name || "Magradze"}
              />
              <AvatarFallback>NM</AvatarFallback>
            </Avatar>
            <div class="space-y-1 text-left flex-1">
              <div class="flex items-center justify-between">
                <h4 class="text-sm font-semibold">{props.values.name || "Giorgi Magradze"}</h4>
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
                {props.values.bio || "Creator of Nikala UI."}
              </p>
              <div class="flex items-center pt-2 gap-4 text-xs text-muted-foreground">
                <span>
                  <strong class="text-foreground">{props.values.followers || "1.2k"}</strong> Followers
                </span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
