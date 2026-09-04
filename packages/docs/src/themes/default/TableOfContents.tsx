// packages/docs/src/themes/default/TableOfContents.tsx
import { splitProps, type Component } from "solid-js";
import { TableOfContents as CoreTableOfContents } from "@nikala-ui/core";
import type { DocsTableOfContentsProps } from "../types.js";

export const DocsTableOfContents: Component<DocsTableOfContentsProps> = (props) => {
  const [local, rest] = splitProps(props, ["items", "title", "class"]);

  return (
    <CoreTableOfContents
      items={local.items}
      title={local.title ?? "On this page"}
      class={local.class}
      {...rest}
    />
  );
};
