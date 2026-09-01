import { splitProps, type Component, type ComponentProps } from "solid-js";
import { useRichTextEditor } from "./editor.js";
import { cn } from "@/lib/cn";

export const EditorFooter: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const { actions } = useRichTextEditor();

  const readingTime = () => {
    const words = actions.wordCount();
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min read`;
  };

  return (
    <div
      class={cn(
        "flex items-center justify-between border-t border-border px-3 py-1.5 text-[11px] text-muted-foreground bg-muted/30 rounded-b-lg select-none",
        local.class
      )}
      {...others}
    >
      <div class="flex items-center gap-3">
        <span>
          <strong class="text-foreground">{actions.wordCount()}</strong> words
        </span>
        <span>
          <strong class="text-foreground">{actions.characterCount()}</strong> characters
        </span>
      </div>
      <div class="flex items-center gap-2">
        <span>{readingTime()}</span>
      </div>
    </div>
  );
};
