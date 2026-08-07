import { AspectRatio } from "@/components/ui/aspect-ratio";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "aspect-ratio",
  name: "Aspect Ratio",
  props: [
    {
      name: "ratio",
      label: "Ratio Presets",
      type: "select",
      options: ["16/9", "4/3", "1/1", "21/9"],
      default: "16/9",
    },
  ],
  generateCode: (v) => {
    const ratioStr = v.ratio || "16/9";
    return `<div class="w-full max-w-sm">
  <AspectRatio ratio={${ratioStr.replace("/", " / ")}} class="bg-muted rounded-lg border border-border">
    <img
      src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
      alt="Preview Image"
      class="h-full w-full object-cover"
    />
  </AspectRatio>
</div>`;
  },
};

export default function AspectRatioStage(props: StageProps) {
  const getRatioNumeric = () => {
    const val = props.values.ratio || "16/9";
    if (val === "4/3") return 4 / 3;
    if (val === "1/1") return 1 / 1;
    if (val === "21/9") return 21 / 9;
    return 16 / 9;
  };

  return (
    <div class="w-full max-w-sm p-4">
      <AspectRatio
        ratio={getRatioNumeric()}
        class="bg-muted rounded-lg border border-border transition-all duration-300"
      >
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="Photo by Drew Beamer"
          class="h-full w-full object-cover"
        />
      </AspectRatio>
    </div>
  );
}
