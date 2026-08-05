import { createSignal } from "solid-js";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import {
  Slider,
  SliderTrack,
  SliderFill,
  SliderThumb,
  SliderLabel,
  SliderValueLabel,
} from "@/components/ui/slider";

export default function SliderDocsPage() {
  const [singleValue, setSingleValue] = createSignal([40]);
  const [rangeValue, setRangeValue] = createSignal([20, 80]);
  const [stepValue, setStepValue] = createSignal([50]);
  const [vertValue, setVertValue] = createSignal([60]);

  return (
    <>
      <Seo
        title="Slider Component"
        description="Numeric range slider built on Kobalte primitives with single/dual thumbs, step intervals, vertical orientation, and custom value labels."
        path="/docs/components/slider"
      />

      <div class="space-y-10 pb-16">
        <DocPageHeader
          title="Slider"
          badge="UI Component"
          description="Numeric range selection slider supporting single/dual thumbs, custom steps, vertical orientation, and formatted value labels."
        />

        {/* 1. Basic Single Thumb */}
        <DocSectionHeader
          title="Basic Slider"
          description="Standard single-thumb range slider with label and value readout."
        />

        <ComponentPreview
          name="slider"
          code={`const [value, setValue] = createSignal([40]);

<Slider value={value()} onChange={setValue}>
  <div class="flex items-center justify-between">
    <SliderLabel>Volume</SliderLabel>
    <SliderValueLabel />
  </div>
  <SliderTrack>
    <SliderThumb />
  </SliderTrack>
</Slider>`}
        >
          <div class="w-full max-w-sm py-4">
            <Slider value={singleValue()} onChange={setSingleValue}>
              <div class="flex items-center justify-between">
                <SliderLabel>Volume</SliderLabel>
                <SliderValueLabel />
              </div>
              <SliderTrack>
                <SliderThumb />
              </SliderTrack>
            </Slider>
          </div>
        </ComponentPreview>

        {/* 2. Range Slider (Dual Thumbs) */}
        <DocSectionHeader
          title="Range Slider (Dual Thumbs)"
          description="Min and max dual-thumb slider ideal for price range filters."
        />

        <ComponentPreview
          name="slider"
          code={`const [range, setRange] = createSignal([20, 80]);

<Slider
  value={range()}
  onChange={setRange}
  getValueLabel={(params) => \`$\${params.values[0]} - $\${params.values[1]}\`}
>
  <div class="flex items-center justify-between">
    <SliderLabel>Price Range</SliderLabel>
    <SliderValueLabel />
  </div>
  <SliderTrack>
    <SliderThumb />
    <SliderThumb />
  </SliderTrack>
</Slider>`}
        >
          <div class="w-full max-w-sm py-4">
            <Slider
              value={rangeValue()}
              onChange={setRangeValue}
              getValueLabel={(params) => `$${params.values[0]} - $${params.values[1]}`}
            >
              <div class="flex items-center justify-between">
                <SliderLabel>Price Range</SliderLabel>
                <SliderValueLabel />
              </div>
              <SliderTrack>
                <SliderThumb />
                <SliderThumb />
              </SliderTrack>
            </Slider>
          </div>
        </ComponentPreview>

        {/* 3. Steps & Intervals */}
        <DocSectionHeader
          title="Step Intervals & Ticks"
          description="Control value increments using step intervals (e.g., step=25) with visual tick marks."
        />

        <ComponentPreview
          name="slider"
          code={`const [step, setStep] = createSignal([50]);

<Slider
  value={step()}
  onChange={setStep}
  step={25}
  minValue={0}
  maxValue={100}
  getValueLabel={(params) => \`\${params.values[0]}%\`}
>
  <div class="flex items-center justify-between">
    <SliderLabel>Opacity (Step: 25%)</SliderLabel>
    <SliderValueLabel />
  </div>
  <SliderTrack>
    <SliderThumb />
  </SliderTrack>
  <div class="flex justify-between px-1 text-[10px] text-muted-foreground font-mono">
    <span>0%</span>
    <span>25%</span>
    <span>50%</span>
    <span>75%</span>
    <span>100%</span>
  </div>
</Slider>`}
        >
          <div class="w-full max-w-sm py-4 space-y-2">
            <Slider
              value={stepValue()}
              onChange={setStepValue}
              step={25}
              minValue={0}
              maxValue={100}
              getValueLabel={(params) => `${params.values[0]}%`}
            >
              <div class="flex items-center justify-between">
                <SliderLabel>Opacity (Step: 25%)</SliderLabel>
                <SliderValueLabel />
              </div>
              <SliderTrack>
                <SliderThumb />
              </SliderTrack>
            </Slider>
            <div class="flex justify-between px-1 text-[10px] text-muted-foreground font-mono">
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
          </div>
        </ComponentPreview>

        {/* 4. Vertical Orientation */}
        <DocSectionHeader
          title="Vertical Orientation"
          description="Vertical orientation slider ideal for audio mixers or equalizer controls."
        />

        <ComponentPreview
          name="slider"
          code={`const [vert, setVert] = createSignal([60]);

<div class="flex flex-col items-center gap-3 h-64 py-4">
  <span class="text-xs font-mono font-medium text-muted-foreground">{vert()[0]}dB</span>
  <Slider
    orientation="vertical"
    value={vert()}
    onChange={setVert}
    class="h-44"
  >
    <SliderTrack>
      <SliderThumb />
    </SliderTrack>
  </Slider>
  <span class="text-xs font-semibold text-foreground">Gain</span>
</div>`}
        >
          <div class="flex flex-col items-center gap-3 h-64 py-4">
            <span class="text-xs font-mono font-medium text-muted-foreground">{vertValue()[0]}dB</span>
            <Slider
              orientation="vertical"
              value={vertValue()}
              onChange={setVertValue}
              class="h-44"
            >
              <SliderTrack>
                <SliderThumb />
              </SliderTrack>
            </Slider>
            <span class="text-xs font-semibold text-foreground">Gain</span>
          </div>
        </ComponentPreview>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="Slider (Root)"
            items={[
              {
                prop: "value",
                type: "number[]",
                default: "[0]",
                description: "Array of numeric values for single or dual thumbs.",
              },
              {
                prop: "onChange",
                type: "(value: number[]) => void",
                default: "—",
                description: "Callback fired when slider value updates during dragging.",
              },
              {
                prop: "minValue",
                type: "number",
                default: "0",
                description: "Minimum allowable numeric bound.",
              },
              {
                prop: "maxValue",
                type: "number",
                default: "100",
                description: "Maximum allowable numeric bound.",
              },
              {
                prop: "step",
                type: "number",
                default: "1",
                description: "Granularity step size of value changes.",
              },
              {
                prop: "orientation",
                type: '"horizontal" | "vertical"',
                default: '"horizontal"',
                description: "Layout direction of the range slider.",
              },
              {
                prop: "getValueLabel",
                type: "(params: { values: number[] }) => string",
                default: "—",
                description: "Format function for screen-reader and SliderValueLabel readout.",
              },
              {
                prop: "disabled",
                type: "boolean",
                default: "false",
                description: "Disables interaction and reduces track opacity.",
              },
            ]}
          />
        </div>

        <DocNextSteps
          prev={{ title: "Skeleton Component", href: "/docs/components/skeleton" }}
          next={{ title: "Switch Component", href: "/docs/components/switch" }}
        />
      </div>
    </>
  );
}
