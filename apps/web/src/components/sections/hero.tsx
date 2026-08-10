import { createSignal, JSX } from "solid-js";
import { A } from "@solidjs/router";
import { createClipboard } from "@nikala-ui/hooks";
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
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Sparkles,
  CircleCheck,
  Bell,
  Command as CommandIcon,
  ArrowUpRight,
} from "lucide-solid";

export const Hero: () => JSX.Element = () => {
  const { copied, copy } = createClipboard({ timeout: 2000 });
  const [notificationsEnabled, setNotificationsEnabled] = createSignal(true);
  const cliInitCmd = "npx @nikala-ui/cli init";

  const copyInitCommand = () => {
    copy(cliInitCmd);
  };

  return (
    <>
      {/* Hero Section */}
      <section class="relative overflow-hidden py-16 md:py-28 border-b border-border/40">
        {/* Subtle CSS Grid Pattern Background */}
        <div class="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[36px_36px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div class="container max-w-7xl px-4 mx-auto flex flex-col items-center text-center space-y-8">
          {/* Version Badge */}
          <A href="/docs" class="inline-flex items-center gap-2">
            <Badge
              variant="outline"
              class="px-3 py-1 text-xs rounded-lg border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer"
            >
              <span class="w-2 h-2 rounded-lg bg-primary animate-pulse mr-1" />
              Nikala UI v0.10.0 is now live for Tailwind v4
            </Badge>
          </A>

          {/* Main Title */}
          <h1 class="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight max-w-4xl leading-[1.1]">
            Copy-Paste UI Components for{" "}
            <span class="text-primary">SolidJS</span> &{" "}
            <span class="text-primary">Tailwind v4</span>
          </h1>

          {/* Description */}
          <p class="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Honoring Georgian painter Niko Pirosmani (Nikala). Fine-grained
            reactivity, full code ownership, smart CLI, and native CSS-first
            configuration.
          </p>

          {/* Call to Actions & Terminal Quick Command */}
          <div class="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-2">
            <A href="/docs/components/button" class="w-full sm:w-auto">
              <Button
                size="lg"
                class="w-full sm:w-auto gap-2 text-base h-11 px-8 font-semibold shadow-lg shadow-primary/25"
              >
                Explore Components
                <svg
                  class="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Button>
            </A>

            <div class="flex items-center gap-2 bg-zinc-950 dark:bg-zinc-900 border border-border text-zinc-200 px-4 h-11 rounded-md font-mono text-sm w-full sm:w-auto justify-between shadow-inner">
              <span class="text-zinc-400 select-none">$</span>
              <span class="px-2">{cliInitCmd}</span>
              <button
                onClick={copyInitCommand}
                class="ml-2 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-2.5 py-1 rounded transition-colors cursor-pointer"
              >
                {copied() ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          {/* Supabase-Style Premium Bento Showcase Grid */}
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 w-full max-w-7xl pt-14 text-left">
            {/* 1. Large Card: Interactive Form Controls (Spans 2 cols) */}
            <A
              href="/docs/components/input"
              class="group md:col-span-2 lg:col-span-2 block"
            >
              <Card class="h-full bg-card/70 backdrop-blur-md border-border/80 p-1 shadow-sm transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-xl group-hover:shadow-primary/10 group-hover:-translate-y-1 group-hover:scale-[1.01] flex flex-col justify-between">
                <CardHeader class="p-6 pb-2">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <Sparkles class="w-5 h-5 text-primary" />
                      <CardTitle class="text-lg group-hover:text-primary transition-colors">
                        Reactive Form Controls
                      </CardTitle>
                    </div>
                    <div class="flex items-center gap-2">
                      <Badge variant="outline" class="text-[10px] font-mono">
                        Fine-Grained
                      </Badge>
                      <ArrowUpRight class="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                  </div>
                  <CardDescription class="text-xs pt-1">
                    Inputs, switches, and buttons built with SolidJS signals for
                    instant state synchronization.
                  </CardDescription>
                </CardHeader>

                <CardContent class="p-6 pt-2 space-y-4">
                  <div class="space-y-1.5" onClick={(e) => e.preventDefault()}>
                    <label class="text-xs font-semibold text-muted-foreground">
                      Project Identifier
                    </label>
                    <Input placeholder="my-solidstart-app" value="nikala-web" />
                  </div>

                  <div
                    class="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/40"
                    onClick={(e) => e.preventDefault()}
                  >
                    <div class="flex items-center gap-2">
                      <Bell class="w-4 h-4 text-muted-foreground" />
                      <span class="text-xs font-medium">Real-time Push Alerts</span>
                    </div>
                    <Switch
                      checked={notificationsEnabled()}
                      onChange={setNotificationsEnabled}
                    />
                  </div>
                </CardContent>

                <CardFooter
                  class="px-6 pb-6 pt-4 flex items-center justify-between border-t border-border/40 mt-2"
                  onClick={(e) => e.preventDefault()}
                >
                  <div class="flex items-center space-x-2">
                    <Checkbox id="hero-check" defaultChecked />
                    <label
                      for="hero-check"
                      class="text-xs text-muted-foreground cursor-pointer"
                    >
                      Enable Auto-Sync
                    </label>
                  </div>
                  <Button size="sm" class="gap-1.5 text-xs">
                    Save Setup
                  </Button>
                </CardFooter>
              </Card>
            </A>

            {/* 2. Medium Card: User Profile & Avatars (Spans 1 col) */}
            <A href="/docs/components/avatar" class="group block">
              <Card class="h-full bg-card/70 backdrop-blur-md border-border/80 p-1 shadow-sm transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-xl group-hover:shadow-primary/10 group-hover:-translate-y-1 group-hover:scale-[1.01] flex flex-col justify-between">
                <CardHeader class="p-6 pb-3">
                  <div class="flex items-center justify-between">
                    <CardTitle class="text-base group-hover:text-primary transition-colors">
                      Avatar & Fallbacks
                    </CardTitle>
                    <ArrowUpRight class="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <CardDescription class="text-xs">
                    Automatic error fallback indicators.
                  </CardDescription>
                </CardHeader>

                <CardContent class="p-6 pt-0 space-y-4">
                  <div class="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/30">
                    <Avatar class="h-10 w-10">
                      <AvatarImage
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                        alt="Niko Pirosmani"
                      />
                      <AvatarFallback>NP</AvatarFallback>
                    </Avatar>
                    <div class="flex flex-col text-xs min-w-0">
                      <span class="font-bold truncate">Niko Pirosmani</span>
                      <span class="text-muted-foreground text-[11px] truncate">
                        Artist & Painter
                      </span>
                    </div>
                    <Badge variant="outline" class="ml-auto text-[10px] px-1.5">
                      Pro
                    </Badge>
                  </div>
                </CardContent>

                <CardFooter class="p-6 pt-0">
                  <Button variant="outline" size="sm" class="w-full text-xs">
                    View Profile
                  </Button>
                </CardFooter>
              </Card>
            </A>

            {/* 3. Medium Card: Command Palette & Hotkeys (Spans 1 col) */}
            <A href="/docs/components/command" class="group block">
              <Card class="h-full bg-card/70 backdrop-blur-md border-border/80 p-1 shadow-sm transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-xl group-hover:shadow-primary/10 group-hover:-translate-y-1 group-hover:scale-[1.01] flex flex-col justify-between">
                <CardHeader class="p-6 pb-3">
                  <div class="flex items-center justify-between">
                    <CardTitle class="text-base flex items-center gap-2 group-hover:text-primary transition-colors">
                      <CommandIcon class="w-4 h-4 text-primary" />
                      Command Palette
                    </CardTitle>
                    <ArrowUpRight class="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <CardDescription class="text-xs">
                    Accessible keyboard navigation.
                  </CardDescription>
                </CardHeader>

                <CardContent class="p-6 pt-0 space-y-3">
                  <div class="flex items-center justify-between p-2.5 rounded-md border border-border bg-muted/40 text-xs">
                    <span class="font-medium">Global Search</span>
                    <KbdGroup>
                      <Kbd size="sm">⌘</Kbd>
                      <Kbd size="sm">K</Kbd>
                    </KbdGroup>
                  </div>

                  <div class="flex items-center justify-between p-2.5 rounded-md border border-border bg-muted/40 text-xs">
                    <span class="font-medium">Quick CLI</span>
                    <KbdGroup>
                      <Kbd size="sm">Ctrl</Kbd>
                      <Kbd size="sm">B</Kbd>
                    </KbdGroup>
                  </div>
                </CardContent>

                <CardFooter class="p-6 pt-0">
                  <Button
                    variant="secondary"
                    size="sm"
                    class="w-full text-xs gap-1.5"
                  >
                    Press ⌘K to Search
                  </Button>
                </CardFooter>
              </Card>
            </A>

            {/* 4. Medium Card: Layered Tabs (Spans 1 col) */}
            <A href="/docs/components/tabs" class="group block">
              <Card class="h-full bg-card/70 backdrop-blur-md border-border/80 p-1 shadow-sm transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-xl group-hover:shadow-primary/10 group-hover:-translate-y-1 group-hover:scale-[1.01] flex flex-col justify-between">
                <CardHeader class="p-6 pb-3">
                  <div class="flex items-center justify-between">
                    <CardTitle class="text-base group-hover:text-primary transition-colors">
                      Layered Tabs
                    </CardTitle>
                    <ArrowUpRight class="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <CardDescription class="text-xs">
                    Horizontal and vertical content switchers.
                  </CardDescription>
                </CardHeader>

                <CardContent class="p-6 pt-0">
                  <Tabs defaultValue="overview" class="w-full">
                    <TabsList class="grid w-full grid-cols-2">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="code">Code</TabsTrigger>
                    </TabsList>
                    <TabsContent
                      value="overview"
                      class="p-3 text-xs bg-muted/30 rounded-md border border-border/50"
                    >
                      Fine-grained SolidJS reactivity.
                    </TabsContent>
                    <TabsContent
                      value="code"
                      class="p-3 text-xs font-mono bg-muted/30 rounded-md border border-border/50"
                    >
                      nikala add tabs
                    </TabsContent>
                  </Tabs>
                </CardContent>

                <CardFooter class="p-6 pt-0">
                  <span class="text-[11px] text-muted-foreground font-mono">
                    Accessible ARIA tabs
                  </span>
                </CardFooter>
              </Card>
            </A>

            {/* 5. Medium Card: Status Callouts (Spans 1 col) */}
            <A href="/docs/components/alert" class="group block">
              <Card class="h-full bg-card/70 backdrop-blur-md border-border/80 p-1 shadow-sm transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-xl group-hover:shadow-primary/10 group-hover:-translate-y-1 group-hover:scale-[1.01] flex flex-col justify-between">
                <CardHeader class="p-6 pb-3">
                  <div class="flex items-center justify-between">
                    <CardTitle class="text-base group-hover:text-primary transition-colors">
                      Status Callouts
                    </CardTitle>
                    <ArrowUpRight class="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <CardDescription class="text-xs">
                    Feedback banners and alerts.
                  </CardDescription>
                </CardHeader>

                <CardContent class="p-6 pt-0">
                  <Alert variant="success" class="p-3 text-xs">
                    <CircleCheck class="h-4 w-4" />
                    <AlertTitle class="text-xs font-bold">Success</AlertTitle>
                    <AlertDescription class="text-[11px]">
                      Tailwind v4 tokens loaded.
                    </AlertDescription>
                  </Alert>
                </CardContent>

                <CardFooter class="p-6 pt-0">
                  <Badge variant="outline" class="text-[10px]">
                    5 Status Variants
                  </Badge>
                </CardFooter>
              </Card>
            </A>

            {/* 6. Large Card: Loading Skeletons (Spans 2 cols) */}
            <A
              href="/docs/components/skeleton"
              class="group md:col-span-2 lg:col-span-2 block"
            >
              <Card class="h-full bg-card/70 backdrop-blur-md border-border/80 p-1 shadow-sm transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-xl group-hover:shadow-primary/10 group-hover:-translate-y-1 group-hover:scale-[1.01] flex flex-col justify-between">
                <CardHeader class="p-6 pb-3">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <CardTitle class="text-base group-hover:text-primary transition-colors">
                        Async Loading States
                      </CardTitle>
                      <Badge variant="secondary" class="text-[10px]">
                        Skeleton
                      </Badge>
                    </div>
                    <ArrowUpRight class="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <CardDescription class="text-xs">
                    Animated pulse loading placeholders for async data fetching.
                  </CardDescription>
                </CardHeader>

                <CardContent class="p-6 pt-0">
                  <div class="flex items-center space-x-4 p-3.5 rounded-lg border border-border/60 bg-muted/20">
                    <Skeleton class="h-10 w-10 rounded-full shrink-0" />
                    <div class="space-y-2 flex-1">
                      <Skeleton class="h-3.5 w-3/4" />
                      <Skeleton class="h-3.5 w-1/2" />
                    </div>
                  </div>
                </CardContent>

                <CardFooter class="p-6 pt-4 flex items-center justify-between border-t border-border/40">
                  <span class="text-xs text-muted-foreground">
                    Smooth CSS keyframe pulse animations
                  </span>
                  <span class="text-xs text-primary font-medium flex items-center gap-1">
                    Explore Docs →
                  </span>
                </CardFooter>
              </Card>
            </A>
          </div>
        </div>
      </section>
    </>
  );
};