import {
  splitProps,
  createMemo,
  Index,
  type JSX,
  type ParentComponent,
} from "solid-js";
import { cn } from "@/lib/cn";

export interface MarqueeProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  vertical?: boolean;
  repeat?: number;
  duration?: number | string;
  gap?: string;
  fadeEdges?: boolean;
}

export const Marquee: ParentComponent<MarqueeProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "class",
    "reverse",
    "pauseOnHover",
    "vertical",
    "repeat",
    "duration",
    "gap",
    "fadeEdges",
    "children",
  ]);

  const repeatCount = () => local.repeat ?? 4;
  const durationValue = () =>
    typeof local.duration === "number"
      ? `${local.duration}s`
      : local.duration || "40s";
  const gapValue = () => local.gap || "1rem";

  const repeatArray = createMemo(() =>
    Array.from({ length: repeatCount() }, (_, i) => i)
  );

  return (
    <>
      <style>{`
        @keyframes nikala-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-100% - var(--marquee-gap, 1rem)));
          }
        }
        @keyframes nikala-marquee-vertical {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(calc(-100% - var(--marquee-gap, 1rem)));
          }
        }
        .nikala-marquee-track {
          animation: nikala-marquee var(--marquee-duration, 40s) linear infinite;
        }
        .nikala-marquee-track-vertical {
          animation: nikala-marquee-vertical var(--marquee-duration, 40s) linear infinite;
        }
        [data-reverse="true"] .nikala-marquee-track,
        [data-reverse="true"] .nikala-marquee-track-vertical {
          animation-direction: reverse;
        }
        [data-pause="true"]:hover .nikala-marquee-track,
        [data-pause="true"]:hover .nikala-marquee-track-vertical {
          animation-play-state: paused;
        }
      `}</style>
      <div
        data-reverse={local.reverse ? "true" : "false"}
        data-pause={local.pauseOnHover ? "true" : "false"}
        style={{
          "--marquee-duration": durationValue(),
          "--marquee-gap": gapValue(),
        }}
        class={cn(
          "group flex overflow-hidden p-2 select-none",
          local.vertical ? "flex-col h-full" : "flex-row w-full",
          local.fadeEdges &&
            (local.vertical
              ? "[mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
              : "[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"),
          local.class
        )}
        {...rest}
      >
        <Index each={repeatArray()}>
          {() => (
            <div
              class={cn(
                "flex shrink-0 justify-around items-center",
                local.vertical
                  ? "flex-col min-h-full nikala-marquee-track-vertical"
                  : "flex-row min-w-full nikala-marquee-track"
              )}
              style={{
                gap: gapValue(),
                [local.vertical ? "margin-bottom" : "margin-right"]: gapValue(),
              }}
            >
              {local.children}
            </div>
          )}
        </Index>
      </div>
    </>
  );
};
