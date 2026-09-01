import { createSignal } from "solid-js";
import { A } from "@solidjs/router";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Rating } from "@/components/ui/rating";
import { PinInput, PinInputInput } from "@/components/ui/pin-input";
import { Slider, SliderTrack, SliderThumb } from "@/components/ui/slider";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelinePoint,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
  TimelineTitle,
} from "@/components/ui/timeline";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Command as CommandIcon,
  ArrowUpRight,
  Check,
  Package,
  Truck,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  CloudUpload,
  Wifi,
  SlidersHorizontal,
} from "lucide-solid";

export function HeroBentoGrid() {
  const [progress, setProgress] = createSignal(82);
  const [rating, setRating] = createSignal(4);
  const [otpPin, setOtpPin] = createSignal("4920");
  const [sliderValue, setSliderValue] = createSignal<number[]>([68]);
  const [textAlign, setTextAlign] = createSignal<"left" | "center" | "right">("left");
  const [formatting, setFormatting] = createSignal<string[]>(["bold"]);

  return (
    <div class="grid grid-cols-1 sm:grid-cols-6 gap-3 w-full text-left">
      {/* 1. Large Card: Segmented Toolbars & Interactive Text Editor (Spans 4 cols on desktop) */}
      <A href="/docs/components/toggle-group" class="group sm:col-span-4 block">
        <Card class="h-full bg-card border-border p-3 shadow-xs hover:border-primary/50 hover:shadow-md transition-all rounded-lg flex flex-col justify-between">
          <div class="flex items-center justify-between pb-1">
            <span class="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              Segmented Toolbar
            </span>
            <ArrowUpRight class="size-3 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>

          <CardContent class="p-0 pt-1 space-y-2" onClick={(e) => e.preventDefault()}>
            <div class="flex flex-wrap items-center justify-between gap-1.5 p-1 rounded-md border border-border/70 bg-muted/40">
              <ToggleGroup
                type="single"
                value={textAlign()}
                onChange={(val) => val && setTextAlign(val as "left" | "center" | "right")}
                size="sm"
                class="bg-muted/60 p-0.5 rounded-md border border-border/40 gap-0.5"
              >
                <ToggleGroupItem value="left" aria-label="Align left" class="h-6 w-6 p-0 rounded-sm">
                  <AlignLeft class="size-3" />
                </ToggleGroupItem>
                <ToggleGroupItem value="center" aria-label="Align center" class="h-6 w-6 p-0 rounded-sm">
                  <AlignCenter class="size-3" />
                </ToggleGroupItem>
                <ToggleGroupItem value="right" aria-label="Align right" class="h-6 w-6 p-0 rounded-sm">
                  <AlignRight class="size-3" />
                </ToggleGroupItem>
              </ToggleGroup>

              <ToggleGroup
                type="multiple"
                value={formatting()}
                onChange={setFormatting}
                size="sm"
                class="bg-muted/60 p-0.5 rounded-md border border-border/40 gap-0.5"
              >
                <ToggleGroupItem value="bold" aria-label="Bold" class="h-6 w-6 p-0 rounded-sm">
                  <Bold class="size-3" />
                </ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Italic" class="h-6 w-6 p-0 rounded-sm">
                  <Italic class="size-3" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div
              class="p-2 rounded-md border border-border/60 bg-background text-[11px] text-foreground transition-all line-clamp-2"
              style={{
                "text-align": textAlign(),
                "font-weight": formatting().includes("bold") ? "bold" : "normal",
                "font-style": formatting().includes("italic") ? "italic" : "normal",
              }}
            >
              "Art is born from genuine simplicity." — Niko Pirosmani
            </div>
          </CardContent>
        </Card>
      </A>

      {/* 2. Compact Tile: Dropzone Upload (Spans 2 cols) */}
      <A href="/docs/components/dropzone" class="group sm:col-span-2 block">
        <Card class="h-full bg-card border-border p-3 shadow-xs hover:border-primary/50 hover:shadow-md transition-all rounded-lg flex flex-col justify-between text-center">
          <div class="flex items-center justify-between pb-1">
            <span class="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Dropzone</span>
            <ArrowUpRight class="size-3 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>

          <div class="border border-dashed border-border group-hover:border-primary/50 rounded-md p-2 bg-muted/20 transition-colors my-auto">
            <CloudUpload class="size-4 text-primary mx-auto mb-1" />
            <span class="text-[10px] font-semibold text-foreground block">Drop Assets</span>
            <span class="text-[9px] text-muted-foreground block">PNG, SVG, PDF</span>
          </div>
        </Card>
      </A>

      {/* 3. Medium Tall Card: Event Timeline Workflow (Spans 3 cols) */}
      <A href="/docs/components/timeline" class="group sm:col-span-3 block">
        <Card class="h-full bg-card border-border p-3 shadow-xs hover:border-primary/50 hover:shadow-md transition-all flex flex-col justify-between rounded-lg">
          <div class="flex items-center justify-between pb-1">
            <span class="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              Event Timeline
            </span>
            <ArrowUpRight class="size-3 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>

          <CardContent class="p-3.5 pt-0 flex-1 flex flex-col justify-center">
            <Timeline align="alternate" class="w-full my-auto space-y-1">
              <TimelineItem class="min-h-[2.6rem]">
                <TimelineOppositeContent class="pb-2 pt-0.5 text-[10px] text-muted-foreground font-medium">
                  09:30 AM
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelinePoint status="success" class="size-6">
                    <Check class="size-3.5 stroke-[2.5]" />
                  </TimelinePoint>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent class="pb-2 pt-0.5">
                  <TimelineTitle class="text-xs font-semibold">Verified</TimelineTitle>
                </TimelineContent>
              </TimelineItem>

              <TimelineItem class="min-h-[2.6rem]">
                <TimelineOppositeContent class="pb-2 pt-0.5 text-[10px] text-primary font-semibold">
                  11:45 AM
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelinePoint status="primary" class="size-6">
                    <Package class="size-3.5 stroke-[2.5]" />
                  </TimelinePoint>
                  <TimelineConnector dashed />
                </TimelineSeparator>
                <TimelineContent class="pb-2 pt-0.5">
                  <TimelineTitle class="text-xs font-semibold text-primary">In Transit</TimelineTitle>
                </TimelineContent>
              </TimelineItem>

              <TimelineItem class="min-h-0">
                <TimelineOppositeContent class="pb-0 pt-0.5 text-[10px] text-muted-foreground font-medium">
                  Pending
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelinePoint status="muted" class="size-6">
                    <Truck class="size-3.5 stroke-[2]" />
                  </TimelinePoint>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent class="pb-0 pt-0.5">
                  <TimelineTitle class="text-xs font-semibold text-muted-foreground">Delivery</TimelineTitle>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          </CardContent>
        </Card>
      </A>

      {/* 4. Split Cards: Progress & Rating/Status (Spans 3 cols, 2 separate cards) */}
      <div class="sm:col-span-3 flex flex-col gap-3">
        {/* 4A. Progress Card */}
        <A href="/docs/components/progress" class="group block flex-1">
          <Card class="h-full bg-card border-border p-3 shadow-xs hover:border-primary/50 hover:shadow-md transition-all rounded-lg flex flex-col justify-between" onClick={(e) => e.preventDefault()}>
            <div class="flex items-center justify-between pb-1">
              <span class="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Progress</span>
              <ArrowUpRight class="size-3 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>

            <div class="my-auto space-y-1.5 py-0.5">
              <div class="flex items-center justify-between text-xs">
                <span class="font-medium text-foreground">Optimization</span>
                <span class="font-mono text-primary font-bold text-xs">{progress()}%</span>
              </div>
              <Progress value={progress()} class="h-2" />
            </div>
          </Card>
        </A>

        {/* 4B. Rating Card */}
        <A href="/docs/components/rating" class="group block flex-1">
          <Card class="h-full bg-card border-border p-3 shadow-xs hover:border-primary/50 hover:shadow-md transition-all rounded-lg flex flex-col justify-between" onClick={(e) => e.preventDefault()}>
            <div class="flex items-center justify-between pb-1">
              <span class="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Rating</span>
              <ArrowUpRight class="size-3 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>

            <div class="my-auto flex items-center justify-between py-0.5">
              <Rating value={rating()} onChange={setRating} size="sm" />
              <span class="font-mono text-xs font-semibold text-foreground">
                {rating()}.0 / 5.0
              </span>
            </div>
          </Card>
        </A>
      </div>

      {/* 5. Mini Card: PIN & OTP Input (Spans 2 cols) */}
      <A href="/docs/components/pin-input" class="group sm:col-span-2 block">
        <Card class="h-full bg-card border-border p-2.5 shadow-xs hover:border-primary/50 hover:shadow-md transition-all rounded-lg flex flex-col justify-between" onClick={(e) => e.preventDefault()}>
          <div class="flex items-center justify-between pb-1">
            <span class="text-[9px] font-mono text-muted-foreground uppercase">OTP Code</span>
            <Badge variant="outline" class="text-[8px] px-1 py-0 h-3.5">
              Secure
            </Badge>
          </div>

          <div class="flex flex-col items-center justify-center my-auto py-0.5">
            <PinInput value={otpPin()} onValueChange={setOtpPin} length={4} class="gap-1.5 justify-center">
              <PinInputInput index={0} class="size-6.5 text-[11px] text-center font-mono rounded border border-border bg-background focus:border-primary focus:ring-1 focus:ring-primary" />
              <PinInputInput index={1} class="size-6.5 text-[11px] text-center font-mono rounded border border-border bg-background focus:border-primary focus:ring-1 focus:ring-primary" />
              <PinInputInput index={2} class="size-6.5 text-[11px] text-center font-mono rounded border border-border bg-background focus:border-primary focus:ring-1 focus:ring-primary" />
              <PinInputInput index={3} class="size-6.5 text-[11px] text-center font-mono rounded border border-border bg-background focus:border-primary focus:ring-1 focus:ring-primary" />
            </PinInput>
            <span class="text-[8px] text-muted-foreground mt-1 tracking-tight">4-digit verification</span>
          </div>
        </Card>
      </A>

      {/* 6. Mini Card: Command Hotkeys (Spans 2 cols) */}
      <A href="/docs/components/command" class="group sm:col-span-2 block">
        <Card class="h-full bg-card border-border p-2.5 shadow-xs hover:border-primary/50 hover:shadow-md transition-all rounded-lg flex flex-col justify-between" onClick={(e) => e.preventDefault()}>
          <div class="flex items-center justify-between pb-1">
            <span class="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Command</span>
            <CommandIcon class="size-3 text-primary" />
          </div>

          <div class="flex items-center justify-between p-1.5 rounded-md border border-border bg-muted/40 text-[10px]">
            <span class="font-medium text-foreground">Search</span>
            <KbdGroup>
              <Kbd size="sm" class="text-[9px] px-1 py-0">⌘</Kbd>
              <Kbd size="sm" class="text-[9px] px-1 py-0">K</Kbd>
            </KbdGroup>
          </div>
        </Card>
      </A>

      {/* 7. Mini Card: Network Signal (Spans 2 cols) */}
      <A href="/docs/hooks/create-network-status" class="group sm:col-span-2 block">
        <Card class="h-full bg-card border-border p-2.5 shadow-xs hover:border-primary/50 hover:shadow-md transition-all rounded-lg flex flex-col justify-between" onClick={(e) => e.preventDefault()}>
          <div class="flex items-center justify-between pb-1">
            <span class="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Network</span>
            <Wifi class="size-3 text-emerald-500" />
          </div>

          <div class="flex items-center justify-between p-1.5 rounded-md border border-emerald-500/20 bg-emerald-500/5 text-[10px]">
            <span class="font-medium text-foreground">Status</span>
            <div class="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold text-[9px]">
              <span class="size-1.5 rounded-lg bg-emerald-500 animate-pulse" />
              <span>Online</span>
            </div>
          </div>
        </Card>
      </A>

      {/* 8. Full-Width Card: Reactive Slider (Spans 6 cols) */}
      <A href="/docs/components/slider" class="group sm:col-span-6 block">
        <Card class="h-full bg-card border-border p-3 shadow-xs hover:border-primary/50 hover:shadow-md transition-all rounded-lg flex flex-col justify-between" onClick={(e) => e.preventDefault()}>
          <div class="flex items-center justify-between pb-1.5">
            <span class="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              Reactive Slider
            </span>
            <ArrowUpRight class="size-3 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>

          <div class="my-auto py-1">
            <Slider
              value={sliderValue()}
              onChange={setSliderValue}
              minValue={0}
              maxValue={100}
              step={1}
              class="w-full gap-2"
            >
              <div class="flex items-center justify-between text-xs">
                <div class="flex items-center gap-1.5 font-medium text-foreground">
                  <SlidersHorizontal class="size-3 text-primary" />
                  <span>Bandwidth Allocation</span>
                </div>
                <span class="font-mono text-xs font-bold text-primary">
                  {sliderValue()[0]}%
                </span>
              </div>
              <SliderTrack class="h-2 bg-muted/60 rounded-lg">
                <SliderThumb class="size-4.5 bg-background border-2 border-primary shadow-xs" />
              </SliderTrack>
            </Slider>
          </div>
        </Card>
      </A>
    </div>
  );
}
