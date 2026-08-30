import { Skeleton } from "@/components/ui/skeleton";
import { Show } from "solid-js";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "skeleton",
  name: "Skeleton",
  props: [
    { name: "shape", label: "Placeholder Shape", type: "select", options: ["avatar", "card", "text"], default: "avatar" },
  ],
  generateCode: (v) => {
    if (v.shape === "card") return `<div class="space-y-2 w-48">
  <Skeleton class="h-20 w-full rounded-md" />
  <Skeleton class="h-3.5 w-3/4" />
</div>`;
    if (v.shape === "text") return `<div class="space-y-2 w-48">
  <Skeleton class="h-3.5 w-full" />
  <Skeleton class="h-3.5 w-2/3" />
</div>`;
    return `<Skeleton class="h-14 w-14 rounded-lg" />`;
  },
};

export default function SkeletonStage(props: StageProps) {
  return (
    <>
      <Show when={props.values.shape === "avatar"}>
        <Skeleton class="h-14 w-14 rounded-lg" />
      </Show>

      <Show when={props.values.shape === "card"}>
        <div class="space-y-2 w-48">
          <Skeleton class="h-20 w-full rounded-md" />
          <Skeleton class="h-3.5 w-3/4" />
        </div>
      </Show>

      <Show when={props.values.shape === "text"}>
        <div class="space-y-2 w-48">
          <Skeleton class="h-3.5 w-full" />
          <Skeleton class="h-3.5 w-2/3" />
        </div>
      </Show>
    </>
  );
}