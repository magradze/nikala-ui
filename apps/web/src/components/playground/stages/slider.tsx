import { createSignal, createEffect } from "solid-js";
import {
  Slider,
  SliderTrack,
  SliderThumb,
  SliderLabel,
  SliderValueLabel,
} from "@/components/ui/slider";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "slider",
  name: "Slider",
  props: [
    { name: "label", label: "Label", type: "text", default: "Volume" },
    { name: "minValue", label: "Min Value", type: "number", default: 0 },
    { name: "maxValue", label: "Max Value", type: "number", default: 100 },
    { name: "step", label: "Step Interval", type: "number", default: 1 },
    {
      name: "orientation",
      label: "Orientation",
      type: "select",
      options: ["horizontal", "vertical"],
      default: "horizontal",
    },
    { name: "multiple", label: "Dual Thumbs (Range)", type: "boolean", default: false },
    { name: "showLabel", label: "Show Label", type: "boolean", default: true },
    { name: "showValueLabel", label: "Show Value Label", type: "boolean", default: true },
    { name: "disabled", label: "Disabled", type: "boolean", default: false },
  ],
  generateCode: (v) => `<Slider
  value={value()}
  onChange={setValue}
  minValue={${v.minValue ?? 0}}
  maxValue={${v.maxValue ?? 100}}
  step={${v.step ?? 1}}${v.orientation === "vertical" ? '\n  orientation="vertical"' : ""}${v.disabled ? "\n  disabled={true}" : ""}
  class="${v.orientation === "vertical" ? "h-48" : "w-full space-y-2"}"
>
${v.showLabel || v.showValueLabel ? `  <div class="flex items-center justify-between">
${v.showLabel ? `    <SliderLabel>${v.label || "Volume"}</SliderLabel>\n` : ""}${v.showValueLabel ? "    <SliderValueLabel />\n" : ""}  </div>\n` : ""}  <SliderTrack>
    <SliderThumb />
${v.multiple ? "    <SliderThumb />\n" : ""}  </SliderTrack>
</Slider>`,
};

export default function SliderStage(props: StageProps) {
  const [singleValue, setSingleValue] = createSignal([40]);
  const [rangeValue, setRangeValue] = createSignal([20, 80]);

  const min = () => (props.values.minValue !== undefined && !isNaN(Number(props.values.minValue)) ? Number(props.values.minValue) : 0);
  const max = () => (props.values.maxValue !== undefined && !isNaN(Number(props.values.maxValue)) ? Number(props.values.maxValue) : 100);
  const step = () => (props.values.step !== undefined && !isNaN(Number(props.values.step)) && Number(props.values.step) > 0 ? Number(props.values.step) : 1);

  // Apply value clamping effect on min/max changes as recommended by Claude
  createEffect(() => {
    const minVal = min();
    const maxVal = max();
    if (minVal >= maxVal) return;

    setSingleValue((prev) => [Math.min(Math.max(prev[0], minVal), maxVal)]);
    setRangeValue((prev) => {
      const clamped = prev.map((v) => Math.min(Math.max(v, minVal), maxVal));
      if (clamped.length === 2 && clamped[0] > clamped[1]) {
        return [clamped[1], clamped[1]];
      }
      return clamped;
    });
  });

  const isVertical = () => props.values.orientation === "vertical";
  const isMultiple = () => props.values.multiple;

  return (
    <div
      class={
        isVertical()
          ? "flex items-center justify-center h-64 py-4"
          : "w-full max-w-sm py-4"
      }
    >
      <Slider
        value={isMultiple() ? rangeValue() : singleValue()}
        onChange={(val) => (isMultiple() ? setRangeValue(val) : setSingleValue(val))}
        minValue={min()}
        maxValue={max()}
        step={step()}
        disabled={props.values.disabled}
        orientation={props.values.orientation || "horizontal"}
        getValueLabel={
          isMultiple()
            ? (params) => `$${params.values[0]} - $${params.values[1]}`
            : (params) => `${params.values[0]}`
        }
        class={isVertical() ? "h-44" : "w-full space-y-2"}
      >
        {(props.values.showLabel || props.values.showValueLabel) && (
          <div
            class={
              isVertical()
                ? "flex flex-col items-center gap-1 mb-2"
                : "flex items-center justify-between"
            }
          >
            {props.values.showLabel && (
              <SliderLabel>{props.values.label || "Volume"}</SliderLabel>
            )}
            {props.values.showValueLabel && <SliderValueLabel />}
          </div>
        )}

        <SliderTrack>
          <SliderThumb />
          {isMultiple() && <SliderThumb />}
        </SliderTrack>
      </Slider>
    </div>
  );
}
