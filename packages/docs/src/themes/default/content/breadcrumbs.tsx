// packages/docs/src/themes/default/content/breadcrumbs.tsx
import { For, Show, splitProps, type Component } from "solid-js";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { BreadcrumbList } from "@/components/ui/breadcrumb";
import { BreadcrumbItem } from "@/components/ui/breadcrumb";
import { BreadcrumbLink } from "@/components/ui/breadcrumb";
import { BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { BreadcrumbPage } from "@/components/ui/breadcrumb";
import type { DocsBreadcrumbsProps } from "../../types.js";

export const DocsBreadcrumbs: Component<DocsBreadcrumbsProps> = (props) => {
  const [local, rest] = splitProps(props, ["items", "class"]);

  return (
    <Breadcrumb class={local.class} {...rest}>
      <BreadcrumbList>
        <For each={local.items}>
          {(item, index) => {
            const isLast = () => index() === local.items.length - 1;
            return (
              <>
                <BreadcrumbItem>
                  <Show
                    when={!isLast() && item.href}
                    fallback={<BreadcrumbPage>{item.title}</BreadcrumbPage>}
                  >
                    <BreadcrumbLink href={item.href}>{item.title}</BreadcrumbLink>
                  </Show>
                </BreadcrumbItem>
                <Show when={!isLast()}>
                  <BreadcrumbSeparator />
                </Show>
              </>
            );
          }}
        </For>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
