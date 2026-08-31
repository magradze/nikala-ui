import { Show, createSignal } from "solid-js";
import {
  Bubble,
  BubbleGroup,
  BubbleContent,
  BubbleReactions,
  BubbleReaction,
} from "@/components/ui/bubble";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "bubble",
  name: "Bubble",
  props: [
    {
      name: "variant",
      label: "Variant",
      type: "select",
      options: ["default", "muted", "outline", "ghost"],
      default: "default",
    },
    {
      name: "size",
      label: "Size",
      type: "select",
      options: ["sm", "default", "lg"],
      default: "default",
    },
    {
      name: "text",
      label: "Bubble Text",
      type: "text",
      default: "Hello! Niko Pirosmani's artworks inspire handcrafted UI in Nikala.",
    },
    {
      name: "showReactions",
      label: "Show Reactions",
      type: "boolean",
      default: true,
    },
    {
      name: "showGroup",
      label: "Grouped Consecutive Bubbles",
      type: "boolean",
      default: false,
    },
  ],
};

export default function BubbleStage(props: StageProps) {
  const [liked, setLiked] = createSignal(false);
  const [heartCount, setHeartCount] = createSignal(4);

  const toggleHeart = () => {
    if (liked()) {
      setLiked(false);
      setHeartCount((c) => c - 1);
    } else {
      setLiked(true);
      setHeartCount((c) => c + 1);
    }
  };

  return (
    <div class="w-full max-w-md p-4 space-y-3">
      <Show
        when={props.values.showGroup}
        fallback={
          <Bubble
            variant={props.values.variant}
            size={props.values.size}
          >
            <BubbleContent>
              {props.values.text || "Hello! Welcome to Nikala UI."}
            </BubbleContent>
            <Show when={props.values.showReactions}>
              <BubbleReactions>
                <BubbleReaction
                  active={liked()}
                  count={heartCount()}
                  onClick={toggleHeart}
                >
                  ❤️
                </BubbleReaction>
                <BubbleReaction count={2}>
                  🚀
                </BubbleReaction>
                <BubbleReaction count={1}>
                  ✨
                </BubbleReaction>
              </BubbleReactions>
            </Show>
          </Bubble>
        }
      >
        <BubbleGroup>
          <Bubble
            variant={props.values.variant}
            size={props.values.size}
          >
            <BubbleContent>
              {props.values.text || "Hello! Welcome to Nikala UI."}
            </BubbleContent>
          </Bubble>
          <Bubble
            variant={props.values.variant}
            size={props.values.size}
          >
            <BubbleContent>
              Here is the second grouped message in the sequence.
            </BubbleContent>
            <Show when={props.values.showReactions}>
              <BubbleReactions>
                <BubbleReaction
                  active={liked()}
                  count={heartCount()}
                  onClick={toggleHeart}
                >
                  ❤️
                </BubbleReaction>
                <BubbleReaction count={2}>
                  🚀
                </BubbleReaction>
              </BubbleReactions>
            </Show>
          </Bubble>
        </BubbleGroup>
      </Show>
    </div>
  );
}
