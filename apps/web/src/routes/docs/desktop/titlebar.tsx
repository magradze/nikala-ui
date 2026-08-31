import { createSignal } from "solid-js";
import { Seo } from "@/components/seo";
import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Titlebar,
  TitlebarControls,
  TitlebarTitle,
  TitlebarIcon,
  TitlebarActions,
} from "@/components/ui/titlebar";
import { Logo } from "@/components/ui/logo";
import { Settings, Search, Sparkles } from "lucide-solid";

const importCode = `import {
  Titlebar,
  TitlebarControls,
  TitlebarTitle,
  TitlebarIcon,
  TitlebarActions,
} from "@/components/ui/titlebar";`;

const usageCode = `<Titlebar platform="macos">
  <TitlebarControls />
  <TitlebarTitle>Nikala Studio</TitlebarTitle>
  <TitlebarActions>
    <Button variant="ghost" size="sm">Settings</Button>
  </TitlebarActions>
</Titlebar>`;

const windowsUsageCode = `<Titlebar platform="windows">
  <div class="flex items-center gap-2">
    <TitlebarIcon>
      <Logo class="size-4" />
    </TitlebarIcon>
    <TitlebarTitle>Nikala Studio — Windows 11</TitlebarTitle>
  </div>
  <TitlebarControls />
</Titlebar>`;

export default function TitlebarDocsPage() {
  const [platform, setPlatform] = createSignal<"macos" | "windows">("macos");
  const [isSimulatedMax, setIsSimulatedMax] = createSignal(false);

  return (
    <>
      <Seo
        title="Titlebar Component — Nikala UI Desktop"
        description="Custom frameless window header component with native macOS traffic lights and Windows 11 Fluent controls for Tauri v2 and SolidJS."
        path="/docs/desktop/titlebar"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <div class="space-y-2">
          <div class="flex flex-wrap items-center gap-2">
            <h1 class="text-2xl sm:text-3xl font-bold tracking-tight">Titlebar</h1>
            <div class="flex items-center gap-1.5 shrink-0">
              <Badge variant="outline" class="text-xs border-primary/40 text-primary">Tauri v2</Badge>
              <Badge variant="secondary" class="text-xs">Desktop</Badge>
            </div>
          </div>
          <p class="text-sm sm:text-base text-muted-foreground leading-relaxed">
            A native-feeling custom titlebar for frameless desktop windows. Supports macOS Traffic Lights, Windows 11 controls, draggable headers, and action bars.
          </p>
        </div>

        {/* Interactive Window Simulator Stage */}
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-semibold text-foreground">Interactive Window Frame Simulator</h3>
            <div class="flex items-center gap-1.5 p-0.5 rounded-lg border border-border bg-muted/40 text-xs">
              <button
                type="button"
                onClick={() => setPlatform("macos")}
                class={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  platform() === "macos"
                    ? "bg-background text-foreground font-medium shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                macOS
              </button>
              <button
                type="button"
                onClick={() => setPlatform("windows")}
                class={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  platform() === "windows"
                    ? "bg-background text-foreground font-medium shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Windows 11
              </button>
            </div>
          </div>

          {/* Simulated OS Window Container */}
          <div class="relative w-full rounded-lg border border-border/80 bg-card shadow-lg overflow-hidden transition-all">
            {/* Titlebar Component */}
            <Titlebar
              platform={platform()}
              isMaximized={isSimulatedMax()}
              onToggleMaximize={() => { setIsSimulatedMax(!isSimulatedMax()); }}
              class="border-b border-border/60"
            >
              {platform() === "macos" ? (
                <>
                  <TitlebarControls />
                  <TitlebarTitle class="text-xs text-muted-foreground">
                    Nikala Desktop — SolidJS Native Window
                  </TitlebarTitle>
                  <TitlebarActions>
                    <Button variant="ghost" size="icon" class="h-6 w-6">
                      <Search class="size-3" />
                    </Button>
                    <Button variant="ghost" size="icon" class="h-6 w-6">
                      <Settings class="size-3" />
                    </Button>
                  </TitlebarActions>
                </>
              ) : (
                <>
                  <div class="flex items-center gap-1.5 flex-1 pl-2">
                    <TitlebarIcon>
                      <Logo class="size-3.5 rounded-xs" />
                    </TitlebarIcon>
                    <TitlebarTitle class="text-xs text-muted-foreground">
                      Nikala Desktop — Windows 11 Fluent
                    </TitlebarTitle>
                  </div>
                  <TitlebarActions class="pr-2">
                    <Button variant="ghost" size="icon" class="h-6 w-6">
                      <Sparkles class="size-3 text-primary" />
                    </Button>
                  </TitlebarActions>
                  <TitlebarControls />
                </>
              )}
            </Titlebar>

            {/* Window Content Body */}
            <div class="p-8 text-center space-y-3 min-h-48 flex flex-col items-center justify-center bg-background/50">
              <div class="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Logo class="size-6" />
              </div>
              <div class="space-y-1">
                <h4 class="text-sm font-semibold text-foreground">Window Body Area</h4>
                <p class="text-xs text-muted-foreground max-w-sm">
                  Click and drag the titlebar above or double-click to simulate window maximization.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Installation */}
        <div class="space-y-4">
          <DocSectionHeader
            title="Installation"
            description="Copy component into your project"
          />

          <CodeBlock
            code="bunx @nikala-ui/cli add titlebar"
            lang="bash"
            isCli={true}
          />
        </div>

        {/* Code Usage */}
        <div class="space-y-4">
          <DocSectionHeader
            title="Usage Examples"
            description="Integrate custom titlebars in your Tauri application"
          />

          <Tabs defaultValue="macos">
            <TabsList>
              <TabsTrigger value="macos">macOS Style</TabsTrigger>
              <TabsTrigger value="windows">Windows 11 Style</TabsTrigger>
            </TabsList>

            <TabsContent value="macos" class="pt-3">
              <CodeBlock code={usageCode} lang="tsx" />
            </TabsContent>

            <TabsContent value="windows" class="pt-3">
              <CodeBlock code={windowsUsageCode} lang="tsx" />
            </TabsContent>
          </Tabs>
        </div>

        {/* Tauri v2 Configuration Tips */}
        <div class="space-y-4">
          <DocSectionHeader
            title="Tauri v2 Frameless Window Setup"
            description="Configure tauri.conf.json to enable custom window decorations"
          />

          <p class="text-sm text-muted-foreground">
            To use custom titlebars, disable default OS decorations in <code>src-tauri/tauri.conf.json</code>:
          </p>

          <CodeBlock
            code={`{
  "app": {
    "windows": [
      {
        "title": "My App",
        "width": 1000,
        "height": 700,
        "decorations": false,
        "transparent": true
      }
    ]
  }
}`}
            lang="json"
          />
        </div>

        {/* Component API Table */}
        <DocApiTable
          title="Titlebar Props"
          items={[
            {
              prop: "platform",
              type: '"macos" | "windows" | "auto"',
              default: '"auto"',
              description: "Target window control style. 'auto' automatically detects client OS.",
            },
            {
              prop: "variant",
              type: '"default" | "translucent" | "floating" | "transparent"',
              default: '"default"',
              description: "Visual appearance style of the titlebar header.",
            },
            {
              prop: "size",
              type: '"sm" | "default" | "lg"',
              default: '"default"',
              description: "Height scale of the titlebar.",
            },
            {
              prop: "onMinimize",
              type: "() => void",
              default: "-",
              description: "Custom callback when minimize button is triggered.",
            },
            {
              prop: "onToggleMaximize",
              type: "() => void",
              default: "-",
              description: "Custom callback when maximize/restore button is triggered.",
            },
            {
              prop: "onClose",
              type: "() => void",
              default: "-",
              description: "Custom callback when close button is triggered.",
            },
          ]}
        />

        <DocNextSteps
          prev={{
            title: "Desktop Overview",
            href: "/docs/desktop",
          }}
          next={{
            title: "createTauriWindow",
            href: "/docs/desktop/create-tauri-window",
          }}
        />
      </div>
    </>
  );
}
