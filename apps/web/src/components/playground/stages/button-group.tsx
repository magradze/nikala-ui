import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "button-group",
  name: "Button Group",
  props: [
    {
      name: "orientation",
      label: "Orientation",
      type: "select",
      options: ["horizontal", "vertical"],
      default: "horizontal",
    },
    {
      name: "variant",
      label: "Button Variant",
      type: "select",
      options: ["default", "secondary", "destructive", "outline", "ghost"],
      default: "outline",
    },
    {
      name: "disabled",
      label: "Disabled",
      type: "boolean",
      default: false,
    },
  ],
  generateCode: (v) => {
    const orientation = v.orientation === "vertical" ? ' orientation="vertical"' : "";
    const variant = v.variant && v.variant !== "default" ? ` variant="${v.variant}"` : "";
    const disabled = v.disabled ? " disabled" : "";

    return `<ButtonGroup${orientation} aria-label="Document actions">
  <Button${variant}${disabled}>Copy</Button>
  <Button${variant}${disabled}>Share</Button>
  <Button${variant}${disabled}>Export</Button>
</ButtonGroup>`;
  },
};

export default function ButtonGroupStage(props: StageProps) {
  const orientation = () => props.values.orientation || "horizontal";
  const variant = () => props.values.variant || "outline";
  const disabled = () => props.values.disabled || false;

  return (
    <ButtonGroup orientation={orientation()} aria-label="Document actions">
      <Button variant={variant()} disabled={disabled()}>Copy</Button>
      <Button variant={variant()} disabled={disabled()}>Share</Button>
      <Button variant={variant()} disabled={disabled()}>Export</Button>
    </ButtonGroup>
  );
}
