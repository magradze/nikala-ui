import { createSignal, Show } from "solid-js";
import { Seo } from "@/components/seo";
import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { createTauriWindow } from "@nikala-ui/hooks";
import {
  Titlebar,
  TitlebarControls,
  TitlebarTitle,
  TitlebarIcon,
} from "@/components/ui/titlebar";
import { Logo } from "@/components/ui/logo";
import {
  Monitor,
  Maximize2,
  Minimize2,
  Minus,
  RotateCcw,
  Sparkles,
  AppWindow,
} from "lucide-solid";

const importCode = `import { createTauriWindow } from "@nikala-ui/hooks";`;

const usageCode = `import { createTauriWindow } from "@/hooks/create-tauri-window";

function WindowManager() {
  const {
    isTauri,
    platform,
    isMaximized,
    isMinimized,
    isFullscreen,
    minimize,
    toggleMaximize,
    close,
    setFullscreen,
  } = createTauriWindow();

  return (
    <div class="space-y-4">
      <div class="flex gap-2">
        <button onClick={minimize}>
          {isMinimized() ? "Restore" : "Minimize"}
        </button>
        <button onClick={toggleMaximize}>
          {isMaximized() ? "Restore" : "Maximize"}
        </button>
        <button onClick={() => setFullscreen(!isFullscreen())}>
          Toggle Fullscreen
        </button>
      </div>

      <p>Platform: {platform()}</p>
      <p>Tauri Native: {isTauri() ? "Yes" : "No (Web Fallback)"}</p>
    </div>
  );
}`;

export default function CreateTauriWindowDocsPage() {
  const {
    isTauri,
    platform,
    isMaximized,
    isMinimized,
    isFullscreen,
    isFocused,
    minimize,
    toggleMaximize,
    close,
    setFullscreen,
  } = createTauriWindow();

  return (
    <>
      <Seo
        title="createTauriWindow Primitive — Nikala UI Desktop"
        description="SolidJS reactive primitive for controlling and observing native Tauri desktop window states, drag regions, maximize, minimize, and fullscreen."
        path="/docs/desktop/create-tauri-window"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <h1 class="text-3xl font-bold tracking-tight">createTauriWindow</h1>
            <Badge variant="outline" class="text-xs border-primary/40 text-primary">Tauri v2</Badge>
            <Badge variant="secondary" class="text-xs">Hook</Badge>
          </div>
          <p class="text-base text-muted-foreground">
            A fine-grained reactive primitive for controlling and observing native Tauri desktop window states (maximize, minimize, close, drag regions, focus, and fullscreen).
          </p>
        </div>

        {/* Live Interactive State Preview & Simulated Window Stage */}
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <DocSectionHeader
              title="Live Window Controller Simulator"
              description="Interact with buttons to observe reactive signal state transitions"
            />
          </div>

          <Card class="bg-card/50 border-border/80 p-6 space-y-6">
            {/* Status Indicators Grid */}
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div class="p-3 rounded-md bg-muted/40 border border-border/50 space-y-1">
                <span class="text-muted-foreground">Platform</span>
                <p class="font-mono font-semibold uppercase text-foreground">{platform()}</p>
              </div>
              <div class="p-3 rounded-md bg-muted/40 border border-border/50 space-y-1">
                <span class="text-muted-foreground">Tauri Runtime</span>
                <p class="font-mono font-semibold text-foreground">
                  {isTauri() ? "Active (Native)" : "Web Fallback"}
                </p>
              </div>
              <div class="p-3 rounded-md bg-muted/40 border border-border/50 space-y-1">
                <span class="text-muted-foreground">Maximized</span>
                <p class="font-mono font-semibold text-foreground">{isMaximized() ? "Yes" : "No"}</p>
              </div>
              <div class="p-3 rounded-md bg-muted/40 border border-border/50 space-y-1">
                <span class="text-muted-foreground">Minimized</span>
                <p class="font-mono font-semibold text-foreground">{isMinimized() ? "Yes" : "No"}</p>
              </div>
            </div>

            {/* Action Buttons Toolbar */}
            <div class="flex flex-wrap items-center gap-2">
              <Button
                variant={isMinimized() ? "secondary" : "outline"}
                size="sm"
                onClick={minimize}
                class="gap-1.5 cursor-pointer"
              >
                <Show when={isMinimized()} fallback={<Minus class="size-3.5" />}>
                  <RotateCcw class="size-3.5 text-primary" />
                </Show>
                <span>{isMinimized() ? "Restore From Minimize" : "Minimize"}</span>
              </Button>

              <Button
                variant={isMaximized() ? "secondary" : "outline"}
                size="sm"
                onClick={toggleMaximize}
                class="gap-1.5 cursor-pointer"
              >
                <Show when={isMaximized()} fallback={<Maximize2 class="size-3.5" />}>
                  <Minimize2 class="size-3.5 text-primary" />
                </Show>
                <span>{isMaximized() ? "Restore Window" : "Maximize Window"}</span>
              </Button>

              <Button
                variant={isFullscreen() ? "secondary" : "outline"}
                size="sm"
                onClick={() => setFullscreen(!isFullscreen())}
                class="gap-1.5 cursor-pointer"
              >
                <Monitor class="size-3.5" />
                <span>{isFullscreen() ? "Exit Fullscreen" : "Toggle Fullscreen"}</span>
              </Button>
            </div>

            {/* Simulated Dynamic OS Window Canvas */}
            <div class="relative w-full rounded-lg border border-border/70 bg-background/80 shadow-md overflow-hidden transition-all duration-300 min-h-56 flex flex-col justify-between">
              {/* Window Titlebar */}
              <Titlebar
                platform="macos"
                isMaximized={isMaximized()}
                onMinimize={minimize}
                onToggleMaximize={toggleMaximize}
                onClose={close}
                class="border-b border-border/50 bg-muted/30"
              >
                <TitlebarControls />
                <TitlebarTitle class="text-xs">
                  Nikala Reactive Window — {isMaximized() ? "Maximized Mode" : isMinimized() ? "Minimized" : "Normal Window"}
                </TitlebarTitle>
              </Titlebar>

              {/* Dynamic Body Content */}
              <div class="p-8 text-center flex-1 flex flex-col items-center justify-center space-y-3 transition-all">
                <Show
                  when={!isMinimized()}
                  fallback={
                    <div class="space-y-2 animate-in fade-in zoom-in-95 duration-200">
                      <div class="size-9 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                        <Minus class="size-4" />
                      </div>
                      <p class="text-sm font-semibold text-foreground">Window Minimized</p>
                      <p class="text-xs text-muted-foreground">The application window is minimized in the dock/taskbar.</p>
                      <Button variant="outline" size="sm" onClick={minimize} class="mt-2 text-xs">
                        Restore Window
                      </Button>
                    </div>
                  }
                >
                  <div class={`transition-all duration-300 ${isMaximized() ? "w-full max-w-lg p-6 rounded-lg bg-card border border-border/60 shadow-xs" : "space-y-1.5"}`}>
                    <div class="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center mx-auto mb-2">
                      <Logo class="size-5" />
                    </div>
                    <h4 class="text-sm font-semibold text-foreground">
                      {isMaximized() ? "Window State: Maximized (Full Viewport)" : "Window State: Standard Frameless"}
                    </h4>
                    <p class="text-xs text-muted-foreground">
                      Signal <code class="text-primary font-mono">isMaximized()</code> is currently <strong class="text-foreground font-mono">{isMaximized() ? "true" : "false"}</strong>
                    </p>
                  </div>
                </Show>
              </div>

              {/* Window Footer Status Bar */}
              <div class="px-3 py-1.5 border-t border-border/40 bg-muted/20 flex items-center justify-between text-[11px] font-mono text-muted-foreground select-none">
                <span>Focus: {isFocused() ? "Active" : "Inactive"}</span>
                <span>Fullscreen: {isFullscreen() ? "true" : "false"}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Installation */}
        <div class="space-y-4">
          <DocSectionHeader
            title="Installation"
            description="Install primitive via CLI copy-paste model"
          />

          <CodeBlock
            code="bunx @nikala-ui/cli add -h create-tauri-window"
            lang="bash"
            isCli={true}
          />
        </div>

        {/* Code Usage */}
        <div class="space-y-4">
          <DocSectionHeader
            title="Usage Example"
            description="Integrate reactive window controls into custom components"
          />

          <CodeBlock code={usageCode} lang="tsx" />
        </div>

        {/* API Reference */}
        <DocApiTable
          title="Return Values"
          items={[
            {
              prop: "isTauri",
              type: "Accessor<boolean>",
              default: "-",
              description: "Indicates whether the code is executing inside a Tauri desktop runtime.",
            },
            {
              prop: "platform",
              type: 'Accessor<"macos" | "windows" | "linux" | "web">',
              default: "-",
              description: "Detected host operating system.",
            },
            {
              prop: "isMaximized",
              type: "Accessor<boolean>",
              default: "-",
              description: "Reactive signal indicating whether window is currently maximized.",
            },
            {
              prop: "isMinimized",
              type: "Accessor<boolean>",
              default: "-",
              description: "Reactive signal indicating whether window is currently minimized.",
            },
            {
              prop: "isFullscreen",
              type: "Accessor<boolean>",
              default: "-",
              description: "Reactive signal indicating whether window is in full screen mode.",
            },
            {
              prop: "minimize",
              type: "() => Promise<void>",
              default: "-",
              description: "Minimizes the window to the taskbar/dock.",
            },
            {
              prop: "toggleMaximize",
              type: "() => Promise<void>",
              default: "-",
              description: "Toggles between maximized and restored window states.",
            },
            {
              prop: "close",
              type: "() => Promise<void>",
              default: "-",
              description: "Closes the application window.",
            },
            {
              prop: "startDragging",
              type: "(e?: MouseEvent) => Promise<void>",
              default: "-",
              description: "Initiates native window dragging when mousedown occurs on a header region.",
            },
          ]}
        />

        <DocNextSteps
          prev={{
            title: "Titlebar Component",
            href: "/docs/desktop/titlebar",
          }}
          next={{
            title: "createGlobalShortcut",
            href: "/docs/desktop/create-global-shortcut",
          }}
        />
      </div>
    </>
  );
}
