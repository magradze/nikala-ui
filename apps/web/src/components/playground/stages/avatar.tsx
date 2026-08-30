import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/cn";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "avatar",
  name: "Avatar",
  props: [
    { name: "src", label: "Image URL", type: "text", default: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" },
    { name: "fallback", label: "Fallback Initials", type: "text", default: "NP" },
    { name: "size", label: "Size Scale", type: "select", options: ["sm", "md", "lg", "xl"], default: "md" },
    { name: "shape", label: "Shape", type: "select", options: ["circle", "rounded"], default: "circle" },
  ],
};

export default function AvatarStage(props: StageProps) {
  const sizeClass = () => {
    switch (props.values.size) {
      case "sm": return "h-8 w-8 text-xs";
      case "lg": return "h-16 w-16 text-base";
      case "xl": return "h-20 w-20 text-lg";
      default: return "h-12 w-12 text-sm";
    }
  };

  const shapeClass = () => (props.values.shape === "rounded" ? "rounded-lg" : "rounded-lg");

  return (
    <Avatar class={cn(sizeClass(), shapeClass())}>
      <AvatarImage src={props.values.src} alt="Avatar" />
      <AvatarFallback>{props.values.fallback || "NP"}</AvatarFallback>
    </Avatar>
  );
}