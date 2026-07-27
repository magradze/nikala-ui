import { ThemeToggle } from "@/components/ui/theme-toggle";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "theme-manager",
  name: "Theme Manager",
  props: [
    { name: "mode", label: "Display Mode", type: "select", options: ["max", "mini"], default: "max" },
    { name: "effect", label: "View Transition Effect", type: "select", options: ["circular", "fade", "none"], default: "circular" },
  ],
  generateCode: (v) => `<ThemeToggle mode="${v.mode}" effect="${v.effect}" />`,
};

export default function ThemeManagerStage(props: StageProps) {
  return <ThemeToggle mode={props.values.mode} effect={props.values.effect} />;
}