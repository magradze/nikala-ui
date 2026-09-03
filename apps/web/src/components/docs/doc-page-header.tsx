import { splitProps, type Component } from "solid-js";
import { SectionHeading } from "@/components/ui/section-heading";
import { DocPageHeaderProps } from "@/types";

export const DocPageHeader: Component<DocPageHeaderProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "title",
    "description",
    "badge",
    "badgeVariant",
    "class",
  ]);

  return (
    <SectionHeading
      variant="page"
      title={local.title}
      badge={local.badge}
      badgeVariant={local.badgeVariant}
      description={local.description}
      class={local.class}
      {...rest}
    />
  );
};