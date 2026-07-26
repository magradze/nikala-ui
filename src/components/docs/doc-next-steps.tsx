import { A } from "@solidjs/router";
import { type Component } from "solid-js";

interface DocNextStepsProps {
  prev?: { title: string; href: string };
  next?: { title: string; href: string };
}

export const DocNextSteps: Component<DocNextStepsProps> = (props) => {
  return (
    <div class="flex items-center justify-between border-t border-border/50 pt-6 mt-10">
      {props.prev ? (
        <A
          href={props.prev.href}
          class="flex flex-col gap-1 text-sm font-medium hover:text-primary transition-colors"
        >
          <span class="text-xs text-muted-foreground">← Previous</span>
          <span>{props.prev.title}</span>
        </A>
      ) : (
        <div />
      )}

      {props.next && (
        <A
          href={props.next.href}
          class="flex flex-col gap-1 text-sm font-medium text-right hover:text-primary transition-colors"
        >
          <span class="text-xs text-muted-foreground">Next →</span>
          <span>{props.next.title}</span>
        </A>
      )}
    </div>
  );
};