import { createSignal, For, Show } from "solid-js";
import { Seo } from "@/components/seo";
import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { createDocumentTabs } from "@/hooks/create-document-tabs";
import {
  Titlebar,
  TitlebarControls,
  TitlebarTabs,
  TitlebarTabList,
  TitlebarTab,
  TitlebarTabAddButton,
  type TitlebarTabsVariant,
  type TitlebarPlatform,
} from "@/components/ui/titlebar";
import {
  FileCode,
  Globe,
  Terminal,
  FileJson,
  Layout,
  Plus,
  Monitor,
  Apple,
  Pin,
  Sparkles,
  Zap,
} from "lucide-solid";

const importCode = `import {
  Titlebar,
  TitlebarControls,
  TitlebarTabs,
  TitlebarTabList,
  TitlebarTab,
  TitlebarTabAddButton,
} from "@/components/ui/titlebar";
import { createDocumentTabs } from "@/hooks/create-document-tabs";`;

const usageCode = `import { Titlebar, TitlebarControls, TitlebarTabs } from "@/components/ui/titlebar";
import { createDocumentTabs } from "@/hooks/create-document-tabs";
import { FileCode, FileJson, Terminal } from "lucide-solid";

function AppTitlebar() {
  const tabs = createDocumentTabs({
    initialTabs: [
      { id: "main.rs", title: "main.rs", icon: Terminal, isPinned: true },
      { id: "app.tsx", title: "App.tsx", icon: FileCode, isDirty: true },
      { id: "styles.css", title: "styles.css", icon: FileCode },
    ],
    enableKeybindings: true, // Enables Ctrl+W / Cmd+W to close active tab
  });

  const handleAddTab = () => {
    const id = "doc-" + (tabs.count() + 1) + ".ts";
    tabs.addTab({ id, title: id, icon: FileCode });
  };

  return (
    <Titlebar platform="macos" class="h-10 bg-card">
      <TitlebarControls platform="macos" class="mr-2" />

      {/* Direct integration with createDocumentTabs primitive */}
      <TitlebarTabs
        manager={tabs}
        variant="editor"
        onAddTab={handleAddTab}
      />
    </Titlebar>
  );
};`;

const dynamicComponentUsageCode = `import { Titlebar, TitlebarControls, TitlebarTabs } from "@/components/ui/titlebar";
import { createDocumentTabs } from "@/hooks/create-document-tabs";
import { Dynamic } from "solid-js/web";
import { Show, type Component } from "solid-js";
import { FileCode, Settings as SettingsIcon, Terminal } from "lucide-solid";
import { CodeEditorView } from "@/components/editor-view";
import { SettingsView } from "@/components/settings-view";
import { TerminalView } from "@/components/terminal-view";

interface TabData {
  component: Component<any>;
  props?: Record<string, any>;
}

function DesktopApp() {
  const tabs = createDocumentTabs<TabData>({
    initialTabs: [
      {
        id: "App.tsx",
        title: "App.tsx",
        icon: FileCode,
        isDirty: true,
        data: { component: CodeEditorView, props: { filename: "App.tsx" } },
      },
      {
        id: "settings",
        title: "Settings",
        icon: SettingsIcon,
        data: { component: SettingsView },
      },
      {
        id: "terminal",
        title: "Terminal",
        icon: Terminal,
        data: { component: TerminalView },
      },
    ],
    enableKeybindings: true,
  });

  const handleAddTab = () => {
    const id = "Untitled-" + (tabs.count() + 1) + ".tsx";
    tabs.addTab({
      id,
      title: id,
      icon: FileCode,
      data: { component: CodeEditorView, props: { filename: id } },
    });
  };

  return (
    <div class="h-screen flex flex-col bg-background text-foreground">
      {/* 1. Titlebar with Tabs */}
      <Titlebar platform="auto" class="h-10 bg-card">
        <TitlebarControls />
        <TitlebarTabs
          manager={tabs}
          variant="editor"
          onAddTab={handleAddTab}
        />
      </Titlebar>

      {/* 2. Dynamic Component Rendering for Active Tab */}
      <main class="flex-1 min-h-0 overflow-auto p-4">
        <Show when={tabs.activeTab()?.data?.component}>
          {(Comp) => (
            <Dynamic
              component={Comp()}
              {...(tabs.activeTab()?.data?.props || {})}
            />
          )}
        </Show>
      </main>
    </div>
  );
};`;

export default function TitlebarTabsDocsPage() {
  const [activePlatform, setActivePlatform] = createSignal<TitlebarPlatform>("macos");
  const [activeVariant, setActiveVariant] = createSignal<TitlebarTabsVariant>("editor");

  const tabsManager = createDocumentTabs({
    initialTabs: [
      { id: "main.rs", title: "main.rs", icon: Terminal, isPinned: true },
      { id: "App.tsx", title: "App.tsx", icon: FileCode, isDirty: true },
      { id: "tauri.conf.json", title: "tauri.conf.json", icon: FileJson },
      { id: "nikala.dev", title: "nikala.dev", icon: Globe },
    ],
    enableKeybindings: true,
  });

  let counter = 1;

  const handleAddTab = () => {
    const id = `Untitled-${counter++}.tsx`;
    tabsManager.addTab({ id, title: id, icon: FileCode });
  };

  return (
    <>
      <Seo
        title="TitlebarTabs Component — Nikala UI Desktop"
        description="Native draggable tab bar integrated directly inside desktop titlebars. Ideal for code editors, browsers, terminals, and multi-document apps."
        path="/docs/desktop/titlebar-tabs"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <div class="space-y-2">
          <div class="flex flex-wrap items-center gap-2">
            <h1 class="text-2xl sm:text-3xl font-bold tracking-tight">TitlebarTabs</h1>
            <div class="flex items-center gap-1.5 shrink-0">
              <Badge variant="outline" class="text-xs border-primary/40 text-primary">Tauri v2</Badge>
              <Badge variant="secondary" class="text-xs">Desktop</Badge>
            </div>
          </div>
          <p class="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Native draggable tabs built directly inside window titlebar chrome. Powered natively by the <code class="font-mono text-primary font-medium">createDocumentTabs</code> reactive primitive with zero-boilerplate 1-liner mode or compound slot customization.
          </p>
        </div>

        {/* Live Interactive Simulator Stage */}
        <div class="space-y-4">
          <DocSectionHeader
            title="Interactive Titlebar Tabs Simulator"
            description="Test different tab styling variants, platform layouts, and reactive tab lifecycle actions"
          />

          {/* Controls Bar */}
          <div class="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg bg-card/60 border border-border/70 text-xs">
            {/* Variant Switcher */}
            <div class="flex items-center gap-2">
              <span class="text-muted-foreground font-medium">Tab Style:</span>
              <div class="inline-flex rounded-md border border-border/50 bg-muted/40 p-0.5 font-mono">
                <Button
                  variant={activeVariant() === "editor" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveVariant("editor")}
                  class="h-6.5 px-2.5 text-xs cursor-pointer"
                >
                  Editor (VSCode)
                </Button>
                <Button
                  variant={activeVariant() === "chrome" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveVariant("chrome")}
                  class="h-6.5 px-2.5 text-xs cursor-pointer"
                >
                  Chrome (Curved)
                </Button>
                <Button
                  variant={activeVariant() === "pills" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveVariant("pills")}
                  class="h-6.5 px-2.5 text-xs cursor-pointer"
                >
                  Pills (Floating)
                </Button>
              </div>
            </div>

            {/* Platform Frame Switcher */}
            <div class="flex items-center gap-2">
              <span class="text-muted-foreground font-medium">Platform:</span>
              <div class="inline-flex rounded-md border border-border/50 bg-muted/40 p-0.5 font-mono">
                <Button
                  variant={activePlatform() === "macos" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActivePlatform("macos")}
                  class="h-6.5 px-2.5 text-xs gap-1.5 cursor-pointer"
                >
                  <Apple class="size-3" />
                  <span>macOS</span>
                </Button>
                <Button
                  variant={activePlatform() === "windows" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActivePlatform("windows")}
                  class="h-6.5 px-2.5 text-xs gap-1.5 cursor-pointer"
                >
                  <Monitor class="size-3" />
                  <span>Windows 11</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Simulated Native Frameless Window Container */}
          <div class="rounded-xl border border-border/80 bg-card/60 shadow-xl overflow-hidden">
            {/* Titlebar with Tabs */}
            <Titlebar
              platform={activePlatform()}
              class="h-10 bg-muted/30 border-b border-border/60"
            >
              {/* Left Controls on macOS */}
              <Show when={activePlatform() === "macos"}>
                <TitlebarControls platform="macos" class="mr-2" />
              </Show>

              {/* Central Tab Bar via createDocumentTabs Manager */}
              <TitlebarTabs
                manager={tabsManager}
                variant={activeVariant()}
                onAddTab={handleAddTab}
              />

              {/* Right Controls on Windows */}
              <Show when={activePlatform() === "windows"}>
                <TitlebarControls platform="windows" />
              </Show>
            </Titlebar>

            {/* Window Content Body */}
            <div class="p-8 sm:p-12 text-center space-y-4 bg-background/50 min-h-[180px] flex flex-col items-center justify-center">
              <div class="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Layout class="size-5" />
              </div>
              <div class="space-y-1">
                <p class="text-sm font-semibold text-foreground">
                  Active Document: <code class="font-mono text-primary font-bold">{tabsManager.activeTabId() || "None"}</code>
                </p>
                <p class="text-xs text-muted-foreground max-w-sm">
                  Seamlessly wired to <code class="font-mono text-foreground font-semibold">createDocumentTabs</code>. Total Tabs: <strong class="text-foreground">{tabsManager.count()}</strong> ({tabsManager.pinnedTabs().length} pinned).
                </p>
              </div>

              {/* Quick Actions Bar */}
              <div class="flex flex-wrap items-center justify-center gap-2 pt-2 border-t border-border/40 text-xs">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => tabsManager.togglePin(tabsManager.activeTabId())}
                  disabled={!tabsManager.activeTabId()}
                  class="h-7 text-xs gap-1.5 cursor-pointer"
                >
                  <Pin class="size-3" />
                  <span>Toggle Pin</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => tabsManager.markDirty(tabsManager.activeTabId(), !tabsManager.activeTab()?.isDirty)}
                  disabled={!tabsManager.activeTabId()}
                  class="h-7 text-xs cursor-pointer"
                >
                  {tabsManager.activeTab()?.isDirty ? "Mark Saved" : "Mark Unsaved (Dirty)"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => tabsManager.closeOthers(tabsManager.activeTabId())}
                  disabled={tabsManager.count() <= 1}
                  class="h-7 text-xs cursor-pointer"
                >
                  Close Others
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Installation */}
        <div class="space-y-4">
          <DocSectionHeader
            title="Installation"
            description="Install both the Titlebar component and the reactive tabs primitive"
          />

          <CodeBlock
            code="bunx @nikala-ui/cli add titlebar -h create-document-tabs"
            lang="bash"
            isCli={true}
          />
        </div>

        {/* Code Usage */}
        <div class="space-y-6">
          <DocSectionHeader
            title="Usage Examples"
            description="Control and render desktop titlebar tabs with fine-grained reactivity"
          />

          <div class="space-y-3">
            <h3 class="text-base font-semibold tracking-tight">1. Basic Titlebar Tabs Integration</h3>
            <CodeBlock code={usageCode} lang="tsx" />
          </div>

          <div class="space-y-3 pt-2">
            <h3 class="text-base font-semibold tracking-tight">2. Dynamic Component Views per Tab</h3>
            <p class="text-sm text-muted-foreground">
              Pass custom SolidJS components inside <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">tab.data.component</code> and render the active tab view dynamically using SolidJS <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">&lt;Dynamic&gt;</code>:
            </p>
            <CodeBlock code={dynamicComponentUsageCode} lang="tsx" />
          </div>
        </div>

        {/* API Reference Table */}
        <DocApiTable
          title="TitlebarTabs Props"
          items={[
            {
              prop: "manager",
              type: "CreateDocumentTabsReturn<T>",
              default: "-",
              description: "Direct reactive instance from createDocumentTabs(). Enables declarative zero-boilerplate auto-rendering.",
            },
            {
              prop: "value",
              type: "string",
              default: "-",
              description: "Controlled identifier value of active tab (when not using manager).",
            },
            {
              prop: "onValueChange",
              type: "(value: string) => void",
              default: "-",
              description: "Callback triggered when a tab is clicked (when not using manager).",
            },
            {
              prop: "onAddTab",
              type: "() => void",
              default: "-",
              description: "Callback for the '+' add button in declarative mode.",
            },
            {
              prop: "variant",
              type: '"editor" | "chrome" | "pills"',
              default: '"editor"',
              description: "Visual design variant of the tab chrome.",
            },
          ]}
        />

        <DocApiTable
          title="TitlebarTab Props"
          items={[
            {
              prop: "tab",
              type: "TabItem<T>",
              default: "-",
              description: "Tab object from createDocumentTabs(). Automatically binds id, title, icon, isDirty, isPinned, and close callback.",
            },
            {
              prop: "value",
              type: "string",
              default: "-",
              description: "Unique string key identifying this individual tab.",
            },
            {
              prop: "isDirty",
              type: "boolean",
              default: "false",
              description: "Displays unsaved dot indicator that morphs into a close icon on hover.",
            },
            {
              prop: "isPinned",
              type: "boolean",
              default: "false",
              description: "Compact icon-only tab mode with pin badge indicator.",
            },
            {
              prop: "closable",
              type: "boolean",
              default: "true",
              description: "Whether to display the close (✕) button action.",
            },
            {
              prop: "onClose",
              type: "(e: MouseEvent) => void",
              default: "-",
              description: "Callback invoked when the tab close action is clicked.",
            },
          ]}
        />

        <DocNextSteps
          prev={{
            title: "createDocumentTabs Hook",
            href: "/docs/desktop/create-document-tabs",
          }}
          next={{
            title: "UpdaterDialog Component",
            href: "/docs/desktop/updater-dialog",
          }}
        />
      </div>
    </>
  );
}
