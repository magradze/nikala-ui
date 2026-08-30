import { createSignal, createEffect } from "solid-js";
import { Rating } from "@/components/ui/rating";
import { Badge } from "@/components/ui/badge";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "rating",
  name: "Rating",
  props: [
    {
      name: "size",
      label: "Size",
      type: "select",
      options: ["sm", "default", "lg"],
      default: "default",
    },
    {
      name: "variant",
      label: "Color Variant",
      type: "select",
      options: ["yellow", "primary", "destructive"],
      default: "yellow",
    },
    {
      name: "value",
      label: "Rating Value",
      type: "select",
      options: ["5", "4", "3", "2", "1", "0"],
      default: "4",
    },
    {
      name: "max",
      label: "Max Stars",
      type: "select",
      options: ["5", "10"],
      default: "5",
    },
    {
      name: "readOnly",
      label: "Read Only",
      type: "boolean",
      default: false,
    },
    {
      name: "disabled",
      label: "Disabled",
      type: "boolean",
      default: false,
    },
  ],
  generateCode: (v) => {
    const sizeStr = v.size && v.size !== "default" ? ` size="${v.size}"` : "";
    const variantStr = v.variant && v.variant !== "yellow" ? ` variant="${v.variant}"` : "";
    const maxStr = v.max && v.max !== "5" ? ` max={${v.max}}` : "";
    const readOnlyStr = v.readOnly ? " readOnly" : "";
    const disabledStr = v.disabled ? " disabled" : "";
    const val = Number(v.value ?? 4);

    if (v.readOnly) {
      return `<Rating value={${val}}${sizeStr}${variantStr}${maxStr}${readOnlyStr}${disabledStr} />`;
    }

    return `import { createSignal } from "solid-js";
import { Rating } from "@/components/ui/rating";

export function RatingDemo() {
  const [rating, setRating] = createSignal(${val});

  return (
    <Rating
      value={rating()}
      onChange={setRating}${sizeStr}${variantStr}${maxStr}${readOnlyStr}${disabledStr}
    />
  );
}`;
  },
};

export default function RatingStage(props: StageProps) {
  const size = () => (props.values.size as "sm" | "default" | "lg") || "default";
  const variant = () => (props.values.variant as "yellow" | "primary" | "destructive") || "yellow";
  const max = () => Number(props.values.max) || 5;
  const readOnly = () => Boolean(props.values.readOnly);
  const disabled = () => Boolean(props.values.disabled);

  const [rating, setRating] = createSignal(Number(props.values.value ?? 4));

  createEffect(() => {
    setRating(Number(props.values.value ?? 4));
  });

  return (
    <div class="flex flex-col items-center justify-center p-8 gap-4">
      <Rating
        value={rating()}
        onChange={setRating}
        size={size()}
        variant={variant()}
        max={max()}
        readOnly={readOnly()}
        disabled={disabled()}
      />
      <div class="flex items-center gap-2">
        <Badge variant="secondary" class="font-mono text-xs">
          {rating()} / {max()} Stars
        </Badge>
      </div>
    </div>
  );
}
