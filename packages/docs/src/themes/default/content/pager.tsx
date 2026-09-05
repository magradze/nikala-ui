// packages/docs/src/themes/default/content/pager.tsx
import { splitProps, type Component } from "solid-js";
import { Pager as CorePager } from "@/components/ui/pager";
import type { DocsPagerProps } from "../../types.js";

export const DocsPager: Component<DocsPagerProps> = (props) => {
  const [local, rest] = splitProps(props, ["prev", "next", "class"]);

  return (
    <CorePager
      prev={local.prev}
      next={local.next}
      class={local.class}
      {...rest}
    />
  );
};

export const DocsPagination = DocsPager;
