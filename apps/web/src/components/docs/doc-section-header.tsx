import { splitProps, type Component, type JSX } from "solid-js";
import { SectionHeading } from "@/components/ui/section-heading";

export interface DocSectionHeaderProps extends JSX.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
}

export const DocSectionHeader: Component<DocSectionHeaderProps> = (props) => {
  const [local, rest] = splitProps(props, ["title", "description", "class"]);

  return (
    <SectionHeading
      variant="section"
      title={local.title}
      description={local.description}
      class={local.class}
      {...rest}
    />
  );
};