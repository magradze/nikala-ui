import { Show, createSignal } from "solid-js";
import {
  Message,
  MessageAvatar,
  MessageHeader,
  MessageContent,
  MessageFooter,
  MessageActions,
} from "@/components/ui/message";
import {
  Bubble,
  BubbleContent,
} from "@/components/ui/bubble";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Copy, Heart, Reply, CheckCheck } from "lucide-solid";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "message",
  name: "Message",
  props: [
    {
      name: "align",
      label: "Message Alignment",
      type: "select",
      options: ["start", "end"],
      default: "start",
    },
    {
      name: "variant",
      label: "Bubble Variant",
      type: "select",
      options: ["default", "muted", "outline", "ghost"],
      default: "muted",
    },
    {
      name: "sender",
      label: "Sender Name",
      type: "text",
      default: "Niko Pirosmani",
    },
    {
      name: "time",
      label: "Timestamp",
      type: "text",
      default: "12:45 PM",
    },
    {
      name: "text",
      label: "Message Text",
      type: "text",
      default: "Welcome to Nikala UI! Fine-grained reactivity and minimal Tailwind CSS v4 design.",
    },
    {
      name: "showAvatar",
      label: "Show Avatar",
      type: "boolean",
      default: true,
    },
    {
      name: "showActions",
      label: "Show Action Buttons",
      type: "boolean",
      default: true,
    },
  ],
};

export default function MessageStage(props: StageProps) {
  const [liked, setLiked] = createSignal(false);

  return (
    <div class="w-full max-w-lg p-4">
      <Message align={props.values.align as any}>
        {/* Left/Right Avatar */}
        <Show when={props.values.showAvatar}>
          <MessageAvatar>
            <Avatar class="size-8 rounded-lg">
              <AvatarFallback>
                {props.values.align === "end" ? "ME" : "NP"}
              </AvatarFallback>
            </Avatar>
          </MessageAvatar>
        </Show>

        {/* Message Content Container */}
        <MessageContent>
          {/* Header with Sender & Time */}
          <MessageHeader>
            <span class="font-medium text-foreground">{props.values.sender || "User"}</span>
            <span class="text-muted-foreground">{props.values.time || "Just now"}</span>
          </MessageHeader>

          {/* Bubble Component */}
          <Bubble variant={props.values.variant}>
            <BubbleContent>
              {props.values.text || "Hello from Nikala UI message."}
            </BubbleContent>
          </Bubble>

          {/* Footer Actions & Status */}
          <MessageFooter>
            {/* When outgoing (end), actions go on the left of status */}
            <Show when={props.values.showActions && props.values.align === "end"}>
              <MessageActions>
                <Button
                  variant="ghost"
                  size="icon"
                  class={liked() ? "text-red-500 h-6 w-6" : "h-6 w-6"}
                  onClick={() => setLiked(!liked())}
                >
                  <Heart class="size-3.5" />
                </Button>
                <Button variant="ghost" size="icon" class="h-6 w-6">
                  <Reply class="size-3.5" />
                </Button>
                <Button variant="ghost" size="icon" class="h-6 w-6">
                  <Copy class="size-3.5" />
                </Button>
              </MessageActions>
            </Show>

            {/* Read status on the edge */}
            <Show when={props.values.align === "end"}>
              <span class="inline-flex items-center gap-1 text-primary font-medium ml-1">
                <span>Read</span>
                <CheckCheck class="size-3.5" />
              </span>
            </Show>

            {/* When incoming (start), actions go on the right */}
            <Show when={props.values.showActions && props.values.align !== "end"}>
              <MessageActions>
                <Button
                  variant="ghost"
                  size="icon"
                  class={liked() ? "text-red-500 h-6 w-6" : "h-6 w-6"}
                  onClick={() => setLiked(!liked())}
                >
                  <Heart class="size-3.5" />
                </Button>
                <Button variant="ghost" size="icon" class="h-6 w-6">
                  <Reply class="size-3.5" />
                </Button>
                <Button variant="ghost" size="icon" class="h-6 w-6">
                  <Copy class="size-3.5" />
                </Button>
              </MessageActions>
            </Show>
          </MessageFooter>
        </MessageContent>
      </Message>
    </div>
  );
}
