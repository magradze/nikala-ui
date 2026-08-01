import { splitProps, type Component, type JSX } from "solid-js";
import { Badge } from "@/components/ui/badge";
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
    <div class={`space-y-2 ${local.class || ""}`} {...rest}>
      <div class="flex items-center gap-2">
        <h1 class="text-3xl font-bold tracking-tight sm:text-4xl">
          {local.title}
        </h1>
        {local.badge && (
          <Badge variant={local.badgeVariant || "outline"} class="text-xs">
            {local.badge}
          </Badge>
        )}
      </div>
      {local.description && (
        <p class="text-lg text-muted-foreground leading-relaxed">
          {local.description}
        </p>
      )}
    </div>
  );
};