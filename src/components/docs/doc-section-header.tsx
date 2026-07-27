import { splitProps, type Component, type JSX } from "solid-js";

export interface DocSectionHeaderProps extends JSX.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
}

export const DocSectionHeader: Component<DocSectionHeaderProps> = (props) => {
  const [local, rest] = splitProps(props, ["title", "description", "class"]);

  return (
    <div class={`space-y-1.5 ${local.class || ""}`} {...rest}>
      <h2 class="text-2xl font-semibold tracking-tight border-b border-border/50 pb-2">
        {local.title}
      </h2>
      {local.description && (
        <p class="text-sm text-muted-foreground leading-relaxed">
          {local.description}
        </p>
      )}
    </div>
  );
};