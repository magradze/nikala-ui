import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-solid";
import { Show } from "solid-js";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "alert",
  name: "Alert",
  props: [
    { name: "title", label: "Title", type: "text", default: "Heads up!" },
    {
      name: "description",
      label: "Description",
      type: "text",
      default: "You can add components to your app using the nikala CLI.",
    },
    {
      name: "variant",
      label: "Variant",
      type: "select",
      options: ["default", "info", "success", "warning", "destructive"],
      default: "default",
    },
    { name: "closable", label: "Closable Button", type: "boolean", default: true },
    { name: "showIcon", label: "Show Icon", type: "boolean", default: true },
  ],
  generateCode: (v) => {
    const variantAttr = v.variant && v.variant !== "default" ? ` variant="${v.variant}"` : "";
    const closableAttr = v.closable ? ` closable={true}` : "";
    const iconCode = v.showIcon ? `<Info class="h-4 w-4" />\n  ` : "";

    return `<Alert${variantAttr}${closableAttr} class="max-w-md">
  ${iconCode}<AlertTitle>${v.title || "Heads up!"}</AlertTitle>
  <AlertDescription>
    ${v.description || ""}
  </AlertDescription>
</Alert>`;
  },
};

export default function AlertStage(props: StageProps) {
  return (
    <Alert
      variant={props.values.variant}
      closable={props.values.closable}
      class="w-full max-w-md"
    >
      <Show when={props.values.showIcon}>
        <Info class="h-4 w-4" />
      </Show>
      <AlertTitle>{props.values.title}</AlertTitle>
      <AlertDescription>{props.values.description}</AlertDescription>
    </Alert>
  );
}