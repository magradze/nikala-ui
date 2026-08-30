import { createSignal } from "solid-js";
import { A } from "@solidjs/router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelinePoint,
  TimelineConnector,
  TimelineContent,
  TimelineTitle,
  TimelineTime,
} from "@/components/ui/timeline";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Sparkles,
  Bell,
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
  Layers,
  CloudUpload,
  Wifi,
} from "lucide-solid";

export function HeroBentoGrid() {
  const [notificationsEnabled, setNotificationsEnabled] = createSignal(true);
  const [autoSync, setAutoSync] = createSignal(true);
  const [textAlign, setTextAlign] = createSignal<"left" | "center" | "right">("left");
  const [formatting, setFormatting] = createSignal<string[]>(["bold"]);

  return (
    <div class="grid grid-cols-1 sm:grid-cols-6 gap-3 w-full text-left">
      {/* 1. Large Card: Segmented Toolbars & Interactive Text Editor (Spans 4 cols on desktop) */}
      <A href="/docs/components/toggle-group" class="group sm:col-span-4 block">
        <Card class="h-full bg-card border-border p-1 shadow-xs hover:border-primary/50 hover:shadow-md transition-all rounded-lg flex flex-col justify-between">
          <CardHeader class="p-3.5 pb-1.5">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-1.5">
                <div class="p-1 rounded-md bg-primary/10 text-primary">
                  <Layers class="size-3.5" />
                </div>
                <div>
                  <CardTitle class="text-xs font-bold group-hover:text-primary transition-colors">
                    Segmented Toolbar
                  </CardTitle>
                </div>
              </div>
              <ArrowUpRight class="size-3 text-muted-foreground group-hover:text-primary transition-all" />
            </div>
          </CardHeader>

          <CardContent class="p-3.5 pt-1 space-y-2" onClick={(e) => e.preventDefault()}>
            <div class="flex flex-wrap items-center justify-between gap-1.5 p-1.5 rounded-md border border-border bg-muted/30">
              <ToggleGroup
                type="single"
                value={textAlign()}
                onChange={(val) => val && setTextAlign(val as "left" | "center" | "right")}
                size="sm"
                variant="outline"
                class="bg-background"
              >
                <ToggleGroupItem value="left" aria-label="Align left" class="h-6 w-6 p-0">
                  <AlignLeft class="size-2.5" />
                </ToggleGroupItem>
                <ToggleGroupItem value="center" aria-label="Align center" class="h-6 w-6 p-0">
                  <AlignCenter class="size-2.5" />
                </ToggleGroupItem>
                <ToggleGroupItem value="right" aria-label="Align right" class="h-6 w-6 p-0">
                  <AlignRight class="size-2.5" />
                </ToggleGroupItem>
              </ToggleGroup>

              <ToggleGroup
                type="multiple"
                value={formatting()}
                onChange={setFormatting}
                size="sm"
                variant="outline"
                class="bg-background"
              >
                <ToggleGroupItem value="bold" aria-label="Bold" class="h-6 w-6 p-0">
                  <Bold class="size-2.5" />
                </ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Italic" class="h-6 w-6 p-0">
                  <Italic class="size-2.5" />
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
        <Card class="h-full bg-card border-border p-1 shadow-xs hover:border-primary/50 hover:shadow-md transition-all flex flex-col justify-between rounded-lg">
          <CardHeader class="p-3 pb-1">
            <div class="flex items-center justify-between">
              <CardTitle class="text-xs font-bold group-hover:text-primary transition-colors">
                Event Timeline
              </CardTitle>
              <ArrowUpRight class="size-3 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </CardHeader>

          <CardContent class="p-3 pt-0">
            <Timeline size="sm" class="space-y-0.5">
              <TimelineItem>
                <TimelineSeparator>
                  <TimelinePoint status="success">
                    <Check class="size-2" />
                  </TimelinePoint>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent class="pb-1.5">
                  <TimelineTitle class="text-[11px]">Order Verified</TimelineTitle>
                  <TimelineTime class="text-[9px]">09:30 AM</TimelineTime>
                </TimelineContent>
              </TimelineItem>

              <TimelineItem>
                <TimelineSeparator>
                  <TimelinePoint status="primary">
                    <Package class="size-2" />
                  </TimelinePoint>
                  <TimelineConnector dashed />
                </TimelineSeparator>
                <TimelineContent class="pb-1.5">
                  <TimelineTitle class="text-[11px] text-primary">In Transit</TimelineTitle>
                  <TimelineTime class="text-[9px]">Tbilisi Logistics Hub</TimelineTime>
                </TimelineContent>
              </TimelineItem>

              <TimelineItem>
                <TimelineSeparator>
                  <TimelinePoint status="muted">
                    <Truck class="size-2" />
                  </TimelinePoint>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent class="pb-0">
                  <TimelineTitle class="text-[11px] text-muted-foreground">Delivery</TimelineTitle>
                  <TimelineTime class="text-[9px]">Pending</TimelineTime>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          </CardContent>
        </Card>
      </A>

      {/* 4. Medium Card: Reactive Form Controls (Spans 3 cols) */}
      <A href="/docs/components/input" class="group sm:col-span-3 block">
        <Card class="h-full bg-card border-border p-1 shadow-xs hover:border-primary/50 hover:shadow-md transition-all flex flex-col justify-between rounded-lg">
          <CardHeader class="p-3 pb-1">
            <div class="flex items-center justify-between">
              <CardTitle class="text-xs font-bold group-hover:text-primary transition-colors">
                Reactive Controls
              </CardTitle>
              <ArrowUpRight class="size-3 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </CardHeader>

          <CardContent class="p-3 pt-1 space-y-2" onClick={(e) => e.preventDefault()}>
            <Input placeholder="Project identifier" value="nikala-store" class="h-7 text-[11px]" />

            <div class="flex items-center justify-between p-1.5 rounded-md border border-border bg-muted/40 text-[11px]">
              <div class="flex items-center gap-1.5">
                <Bell class="size-3 text-muted-foreground" />
                <span class="font-medium text-[10px]">Real-time Push</span>
              </div>
              <Switch
                checked={notificationsEnabled()}
                onChange={setNotificationsEnabled}
              />
            </div>

            <div class="flex items-center justify-between pt-0.5">
              <div class="flex items-center space-x-1.5">
                <Checkbox
                  id="hero-auto-sync"
                  checked={autoSync()}
                  onChange={setAutoSync}
                />
                <label for="hero-auto-sync" class="text-[10px] text-muted-foreground cursor-pointer">
                  Auto-sync
                </label>
              </div>
              <Button size="sm" class="h-6 text-[10px] px-2 font-medium cursor-pointer">
                Save
              </Button>
            </div>
          </CardContent>
        </Card>
      </A>

      {/* 5. Mini Card: Avatar & Pro Profile (Spans 2 cols) */}
      <A href="/docs/components/avatar" class="group sm:col-span-2 block">
        <Card class="h-full bg-card border-border p-2.5 shadow-xs hover:border-primary/50 hover:shadow-md transition-all rounded-lg flex flex-col justify-between">
          <div class="flex items-center justify-between pb-1">
            <span class="text-[9px] font-mono text-muted-foreground uppercase">Avatar</span>
            <Badge variant="outline" class="text-[8px] px-1 py-0 h-3.5">
              Pro
            </Badge>
          </div>

          <div class="flex items-center gap-2 p-1.5 rounded-md border border-border bg-muted/30">
            <Avatar class="size-6">
              <AvatarImage
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80"
                alt="Niko Pirosmani"
              />
              <AvatarFallback class="text-[9px]">NP</AvatarFallback>
            </Avatar>
            <div class="flex flex-col min-w-0">
              <span class="font-bold text-[11px] truncate">N. Pirosmani</span>
              <span class="text-muted-foreground text-[9px] truncate">
                Painter
              </span>
            </div>
          </div>
        </Card>
      </A>

      {/* 6. Mini Card: Command Hotkeys (Spans 2 cols) */}
      <A href="/docs/components/command" class="group sm:col-span-2 block">
        <Card class="h-full bg-card border-border p-2.5 shadow-xs hover:border-primary/50 hover:shadow-md transition-all rounded-lg flex flex-col justify-between">
          <div class="flex items-center justify-between pb-1">
            <span class="text-[9px] font-mono text-muted-foreground uppercase">Command</span>
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
        <Card class="h-full bg-card border-border p-2.5 shadow-xs hover:border-primary/50 hover:shadow-md transition-all rounded-lg flex flex-col justify-between">
          <div class="flex items-center justify-between pb-1">
            <span class="text-[9px] font-mono text-muted-foreground uppercase">Network</span>
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
    </div>
  );
}
