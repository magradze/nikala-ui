import { For, Show } from "solid-js";
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
  FileCode,
  FileJson,
  Terminal,
  Plus,
  X,
  Pin,
  Sparkles,
  Layers,
  Activity,
  ArrowRight,
  ArrowLeft,
} from "lucide-solid";

const importCode = `import { createDocumentTabs } from "@/hooks/create-document-tabs";`;

const basicUsageCode = `import { createDocumentTabs } from "@/hooks/create-document-tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { For, Show } from "solid-js";
import { Plus, X } from "lucide-solid";

function TabManager() {
  const tabs = createDocumentTabs({
    initialTabs: [
      { id: "main.rs", title: "main.rs", isPinned: true },
      { id: "app.tsx", title: "App.tsx", isDirty: true },
      { id: "styles.css", title: "styles.css" },
    ],
    enableKeybindings: true, // Enables Ctrl+W / Cmd+W to close active tab
    onTabChange: (active) => console.log("Active tab changed to:", active?.title),
  });

  return (
    <Card class="p-4 space-y-4">
      {/* 1. Tabs Header Bar */}
      <div class="flex items-center gap-1.5 border-b border-border pb-2">
        <For each={tabs.tabs()}>
          {(tab) => (
            <Button
              variant={tabs.activeTabId() === tab.id ? "default" : "secondary"}
              size="sm"
              onClick={() => tabs.setActiveTab(tab.id)}
              class="h-7 text-xs gap-1.5"
            >
              <span>{tab.title}</span>
              <Show when={tab.isDirty}>
                <span class="size-1.5 rouded-lg bg-amber-400" />
              </Show>
              <Show when={!tab.isPinned}>
                <span
                  role="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    tabs.closeTab(tab.id);
                  }}
                  class="hover:opacity-70"
                >
                  <X class="size-3" />
                </span>
              </Show>
            </Button>
          )}
        </For>

        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            const nextId = "doc-" + (tabs.count() + 1) + ".txt";
            tabs.addTab({ id: nextId, title: nextId });
          }}
          class="size-7"
        >
          <Plus class="size-3.5" />
        </Button>
      </div>

      {/* 2. Active Buffer Display */}
      <p class="text-xs text-muted-foreground">
        Active Document: <Badge variant="outline" class="font-mono">{tabs.activeTabId()}</Badge>
      </p>
    </Card>
  );
}`;

const dynamicTabUsageCode = `import { createDocumentTabs } from "@/hooks/create-document-tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dynamic } from "solid-js/web";
import { Show, For, type Component } from "solid-js";
import { FileCode, Settings as SettingsIcon, Terminal } from "lucide-solid";
import { CodeEditorView } from "@/components/editor-view";
import { SettingsView } from "@/components/settings-view";
import { TerminalView } from "@/components/terminal-view";

interface TabData {
  component: Component<any>;
  props?: Record<string, any>;
}

function MultiViewWorkspace() {
  const tabs = createDocumentTabs<TabData>({
    initialTabs: [
      {
        id: "editor",
        title: "App.tsx",
        icon: FileCode,
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
  });

  return (
    <Card class="flex flex-col h-96 overflow-hidden p-0">
      {/* Tab Selector Header */}
      <div class="flex items-center gap-1 p-2 bg-muted/40 border-b border-border">
        <For each={tabs.tabs()}>
          {(tab) => (
            <Button
              size="sm"
              variant={tabs.activeTabId() === tab.id ? "default" : "ghost"}
              onClick={() => tabs.setActiveTab(tab.id)}
              class="h-7 text-xs"
            >
              {tab.title}
            </Button>
          )}
        </For>
      </div>

      {/* Active Tab Dynamic Component View */}
      <div class="flex-1 p-4 overflow-auto">
        <Show when={tabs.activeTab()?.data?.component}>
          {(Comp) => (
            <Dynamic
              component={Comp()}
              {...(tabs.activeTab()?.data?.props || {})}
            />
          )}
        </Show>
      </div>
    </Card>
  );
};`;

export default function CreateDocumentTabsDocsPage() {
  const tabs = createDocumentTabs({
    initialTabs: [
      { id: "main.rs", title: "main.rs", icon: Terminal, isPinned: true },
      { id: "App.tsx", title: "App.tsx", icon: FileCode, isDirty: true },
      { id: "tauri.conf.json", title: "tauri.conf.json", icon: FileJson },
    ],
    enableKeybindings: true,
  });

  let counter = 1;

  const handleAddTab = () => {
    const id = `Document-${counter++}.md`;
    tabs.addTab({ id, title: id, icon: FileCode });
  };

  return (
    <>
      <Seo
        title="createDocumentTabs Hook — Nikala UI Desktop"
        description="Fine-grained reactive primitive for managing multi-document tabs, editor buffers, and browser tab stacks."
        path="/docs/desktop/create-document-tabs"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <div class="space-y-2">
          <div class="flex flex-wrap items-center gap-2">
            <h1 class="text-2xl sm:text-3xl font-bold tracking-tight">createDocumentTabs</h1>
            <div class="flex items-center gap-1.5 shrink-0">
              <Badge variant="outline" class="text-xs border-primary/40 text-primary">Tauri v2</Badge>
              <Badge variant="secondary" class="text-xs">Hook</Badge>
            </div>
          </div>
          <p class="text-sm sm:text-base text-muted-foreground leading-relaxed">
            A powerful reactive SolidJS primitive for controlling document stacks, editor buffers, and browser tabs. Features automatic adjacent tab activation on close, pinned tab separation, dirty state tracking, and keyboard navigation.
          </p>
        </div>

        {/* Interactive Primitive State Tester */}
        <div class="space-y-4">
          <DocSectionHeader
            title="Interactive Primitive State Tester"
            description="Trigger reactive actions to observe real-time fine-grained signal changes"
          />

          <Card class="bg-card/50 border-border/80 p-6 space-y-6">
            {/* Top Toolbar */}
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div class="flex items-center gap-2">
                <Layers class="size-4 text-primary" />
                <span class="text-sm font-semibold text-foreground">Active Tab:</span>
                <Badge variant="default" class="font-mono text-xs bg-primary text-primary-foreground font-semibold">
                  {tabs.activeTabId() || "None"}
                </Badge>
              </div>

              <div class="flex flex-wrap items-center gap-2">
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleAddTab}
                  class="gap-1.5 cursor-pointer text-xs shadow-xs"
                >
                  <Plus class="size-3.5" />
                  <span>Add Document</span>
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => tabs.prevTab()}
                  disabled={tabs.count() <= 1}
                  class="gap-1 cursor-pointer text-xs"
                >
                  <ArrowLeft class="size-3.5" />
                  <span>Prev</span>
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => tabs.nextTab()}
                  disabled={tabs.count() <= 1}
                  class="gap-1 cursor-pointer text-xs"
                >
                  <span>Next</span>
                  <ArrowRight class="size-3.5" />
                </Button>
              </div>
            </div>

            {/* Reactive State Cards Grid */}
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Card 1: Total Count */}
              <div class="p-3.5 rounded-lg border border-border/60 bg-muted/30 space-y-1">
                <span class="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Total Tabs</span>
                <p class="text-sm font-bold font-mono text-foreground">{tabs.count()}</p>
              </div>

              {/* Card 2: Pinned Count */}
              <div class="p-3.5 rounded-lg border border-border/60 bg-muted/30 space-y-1">
                <span class="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Pinned Tabs</span>
                <p class="text-sm font-bold font-mono text-foreground">{tabs.pinnedTabs().length}</p>
              </div>

              {/* Card 3: Dirty State */}
              <div class="p-3.5 rounded-lg border border-border/60 bg-muted/30 space-y-1">
                <span class="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">hasDirtyTabs</span>
                <p class="text-sm font-bold font-mono text-foreground">
                  {tabs.hasDirtyTabs() ? "true (Unsaved)" : "false (Clean)"}
                </p>
              </div>

              {/* Card 4: Active Object */}
              <div class="p-3.5 rounded-lg border border-border/60 bg-muted/30 space-y-1">
                <span class="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Active Title</span>
                <p class="text-sm font-bold font-mono text-foreground truncate">
                  {tabs.activeTab()?.title || "—"}
                </p>
              </div>
            </div>

            {/* Interactive Tab Badges Row */}
            <div class="space-y-2">
              <span class="text-xs font-medium text-muted-foreground">Managed Tabs Array:</span>
              <div class="flex flex-wrap items-center gap-1.5 p-2 rounded-lg bg-muted/40 border border-border/50">
                <For each={tabs.tabs()}>
                  {(tab) => (
                    <div
                      onClick={() => tabs.setActiveTab(tab.id)}
                      class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono select-none cursor-pointer transition-colors"
                      classList={{
                        "bg-primary text-primary-foreground font-bold shadow-xs": tabs.activeTabId() === tab.id,
                        "bg-card border border-border/60 text-foreground hover:bg-muted": tabs.activeTabId() !== tab.id,
                      }}
                    >
                      <Show when={tab.isPinned}>
                        <Pin class="size-2.5 rotate-45 shrink-0 opacity-70" />
                      </Show>
                      <span>{tab.title}</span>
                      <Show when={tab.isDirty}>
                        <span class="size-1.5 rouded-lg bg-amber-400 shrink-0" />
                      </Show>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          tabs.closeTab(tab.id);
                        }}
                        class="size-3.5 rounded-xs flex items-center justify-center hover:bg-black/20 opacity-70 hover:opacity-100 transition-opacity ml-0.5 cursor-pointer"
                      >
                        <X class="size-2.5" />
                      </button>
                    </div>
                  )}
                </For>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div class="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border/50 text-xs">
              <span class="text-xs text-muted-foreground">Item Actions for Active Tab:</span>

              <div class="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => tabs.togglePin(tabs.activeTabId())}
                  disabled={!tabs.activeTabId()}
                  class="h-7 text-xs gap-1 cursor-pointer"
                >
                  <Pin class="size-3" />
                  <span>Toggle Pin</span>
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => tabs.markDirty(tabs.activeTabId(), !tabs.activeTab()?.isDirty)}
                  disabled={!tabs.activeTabId()}
                  class="h-7 text-xs cursor-pointer"
                >
                  {tabs.activeTab()?.isDirty ? "Mark Saved" : "Mark Unsaved"}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => tabs.closeOthers(tabs.activeTabId())}
                  disabled={tabs.count() <= 1}
                  class="h-7 text-xs cursor-pointer"
                >
                  Close Others
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Installation */}
        <div class="space-y-4">
          <DocSectionHeader
            title="Installation"
            description="Copy the reactive tabs primitive into your src/hooks directory"
          />

          <CodeBlock
            code="bunx @nikala-ui/cli add --hook create-document-tabs"
            lang="bash"
            isCli={true}
          />
        </div>

        {/* Headless Usage Code */}
        <div class="space-y-6">
          <DocSectionHeader
            title="Usage Examples"
            description="Use createDocumentTabs in any SolidJS component or custom navigation bar"
          />

          <div class="space-y-3">
            <h3 class="text-base font-semibold tracking-tight">1. Basic Tab State Management</h3>
            <CodeBlock code={basicUsageCode} lang="tsx" />
          </div>

          <div class="space-y-3 pt-2">
            <h3 class="text-base font-semibold tracking-tight">2. Dynamic Component Views per Tab</h3>
            <p class="text-sm text-muted-foreground">
              Pass custom SolidJS components inside <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">tab.data.component</code> and render the active tab view dynamically using SolidJS <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">&lt;Dynamic&gt;</code>:
            </p>
            <CodeBlock code={dynamicTabUsageCode} lang="tsx" />
          </div>
        </div>

        {/* API Reference Table */}
        <DocApiTable
          title="CreateDocumentTabsOptions<T>"
          items={[
            {
              prop: "initialTabs",
              type: "TabItem<T>[]",
              default: "[]",
              description: "Initial collection of tab items to seed the state.",
            },
            {
              prop: "defaultActiveId",
              type: "string",
              default: "first tab id",
              description: "Identifier of the tab that should be active initially.",
            },
            {
              prop: "enableKeybindings",
              type: "boolean",
              default: "false",
              description: "Enables keyboard shortcuts (Ctrl+W / Cmd+W) to close active tab.",
            },
            {
              prop: "onTabChange",
              type: "(tab: TabItem<T> | undefined) => void",
              default: "-",
              description: "Callback invoked whenever the active tab selection changes.",
            },
            {
              prop: "onTabClose",
              type: "(tab: TabItem<T>) => boolean | void",
              default: "-",
              description: "Callback fired before closing a tab. Return false to prevent closing.",
            },
          ]}
        />

        <DocApiTable
          title="CreateDocumentTabsReturn<T>"
          items={[
            {
              prop: "tabs",
              type: "Accessor<TabItem<T>[]>",
              default: "-",
              description: "Reactive signal containing the complete list of open tabs.",
            },
            {
              prop: "activeTabId",
              type: "Accessor<string>",
              default: "-",
              description: "Reactive signal tracking the active tab unique identifier.",
            },
            {
              prop: "activeTab",
              type: "Accessor<TabItem<T> | undefined>",
              default: "-",
              description: "Memoized accessor for the currently active tab item object.",
            },
            {
              prop: "pinnedTabs",
              type: "Accessor<TabItem<T>[]>",
              default: "-",
              description: "Memoized accessor returning only pinned tabs in left-aligned order.",
            },
            {
              prop: "unpinnedTabs",
              type: "Accessor<TabItem<T>[]>",
              default: "-",
              description: "Memoized accessor returning standard unpinned tabs.",
            },
            {
              prop: "hasDirtyTabs",
              type: "Accessor<boolean>",
              default: "-",
              description: "Convenience signal indicating if any open tab has unsaved changes.",
            },
            {
              prop: "count",
              type: "Accessor<number>",
              default: "-",
              description: "Total number of open tabs.",
            },
            {
              prop: "addTab",
              type: "(tab: TabItem<T>, activate?: boolean) => void",
              default: "-",
              description: "Appends or inserts a new tab and optionally activates it immediately.",
            },
            {
              prop: "closeTab",
              type: "(id: string) => boolean",
              default: "-",
              description: "Closes a tab and automatically shifts active focus to the nearest adjacent sibling.",
            },
            {
              prop: "markDirty",
              type: "(id: string, isDirty?: boolean) => void",
              default: "-",
              description: "Sets or clears unsaved change indicator flag on target tab.",
            },
            {
              prop: "togglePin",
              type: "(id: string) => void",
              default: "-",
              description: "Toggles pinned state of a tab and positions it on the left of unpinned tabs.",
            },
            {
              prop: "closeOthers",
              type: "(id: string) => void",
              default: "-",
              description: "Closes all open tabs except the designated ID and pinned tabs.",
            },
            {
              prop: "nextTab / prevTab",
              type: "() => void",
              default: "-",
              description: "Cycles sequentially through open tabs.",
            },
          ]}
        />

        <DocNextSteps
          prev={{
            title: "TitlebarTabs Component",
            href: "/docs/desktop/titlebar-tabs",
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
