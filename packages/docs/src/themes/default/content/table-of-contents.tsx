// packages/docs/src/themes/default/content/table-of-contents.tsx
import { createSignal, onMount, Show, splitProps, type Component } from "solid-js";
import { TableOfContents as CoreTableOfContents } from "@/components/ui/table-of-contents";
import type { DocsTableOfContentsProps } from "../../types.js";

export const DocsTableOfContents: Component<DocsTableOfContentsProps> = (props) => {
  const [local, rest] = splitProps(props, ["items", "title", "class"]);
  const [ready, setReady] = createSignal(false);

  onMount(() => {
    if (typeof window === "undefined") {
      setReady(true);
      return;
    }

    const frame = window.requestAnimationFrame(() => setReady(true));
    return () => window.cancelAnimationFrame(frame);
  });

  return (
    <Show when={ready()}>
      <CoreTableOfContents
        items={local.items}
        title={local.title ?? "On this page"}
        class={local.class}
        {...rest}
      />
    </Show>
  );
};
