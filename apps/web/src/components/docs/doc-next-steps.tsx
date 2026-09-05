import { DocNextStepsProps } from "@/types";
import { type Component, Show } from "solid-js";

export const DocNextSteps: Component<DocNextStepsProps> = (props) => {
  return (
    <div class="flex items-center justify-between border-t border-border/50 pt-6 mt-10">
      <Show
        when={props.prev}
        fallback={<div />}
      >
        <a
          href={props.prev!.href}
          class="flex flex-col gap-1 text-sm font-medium hover:text-primary transition-colors"
        >
          <span class="text-xs text-muted-foreground">← Previous</span>
          <span>{props.prev!.title}</span>
        </a>
      </Show>

      <Show when={props.next}>
        <a
          href={props.next!.href}
          class="flex flex-col gap-1 text-sm font-medium text-right hover:text-primary transition-colors ml-auto"
        >
          <span class="text-xs text-muted-foreground">Next →</span>
          <span>{props.next!.title}</span>
        </a>
      </Show>
    </div>
  );
};