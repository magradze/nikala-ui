import { createSignal, For, Show } from "solid-js";
import { A } from "@solidjs/router";
import {
  Titlebar,
  TitlebarActions,
  TitlebarControls,
  TitlebarTabs,
  TitlebarTitle,
} from "@/components/ui/titlebar";
import { createDocumentTabs } from "@/hooks/create-document-tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import {
  AppWindow,
  ArrowRight,
  FileCode,
  Download,
  Check,
  Copy,
  ShieldCheck,
  Command,
  Layers,
  ExternalLink,
  Settings,
  PenTool,
  Sparkles,
} from "lucide-solid";

import { tokenizeLine } from "./tokenizer";
import { getSettingsCode } from "./settings-view";
import { getUpdaterCode } from "./updater-view";
import { getBufferCode } from "./buffer-view";

interface TabData {
  getCode?: () => string;
}

export function DesktopShowcase() {
  const [platform, setPlatform] = createSignal<"macos" | "windows">("macos");
  const [copiedCode, setCopiedCode] = createSignal(false);
  const [editorContent, setEditorContent] = createSignal(
    `<h2>✨ Welcome to Nikala Studio</h2><p>Nikala UI is a <strong>lightweight, fine-grained reactive</strong> component suite built natively for <em>SolidJS</em> and <em>Tailwind CSS v4</em>.</p><ul data-type="taskList"><li data-type="taskItem" data-checked="true"><label><input type="checkbox" checked="checked"><span></span></label><div><p>Pure Copy-Paste ownership model with instant CLI scaffolding</p></div></li><li data-type="taskItem" data-checked="true"><label><input type="checkbox" checked="checked"><span></span></label><div><p>Type <code>/</code> anywhere on a new line for quick slash commands</p></div></li><li data-type="taskItem" data-checked="false"><label><input type="checkbox"><span></span></label><div><p>Select any word to reveal floating bubble formatting toolbar</p></div></li></ul><blockquote><p>Crafted for high performance with 0ms reactivity overhead.</p></blockquote>`
  );

  const tabs = createDocumentTabs<TabData>({
    initialTabs: [
      {
        id: "editor",
        title: "Editor",
        icon: PenTool,
        closable: false,
      },
      {
        id: "settings.tsx",
        title: "settings.tsx",
        icon: Settings,
        data: {
          getCode: () => getSettingsCode(),
        },
      },
      {
        id: "updater.tsx",
        title: "updater.tsx",
        icon: Download,
        data: {
          getCode: () => getUpdaterCode(),
        },
      },
    ],
    enableKeybindings: false,
  });

  const handleAddTab = () => {
    const nextIdx = tabs.count() + 1;
    const id = `Document-${nextIdx}.tsx`;
    tabs.addTab({
      id,
      title: id,
      icon: FileCode,
      data: {
        getCode: () => getBufferCode(nextIdx),
      },
    });
  };

  const currentCode = () => {
    const active = tabs.activeTab();
    if (active?.data?.getCode) {
      return active.data.getCode();
    }
    return `// Buffer #${tabs.activeTabId()} loaded`;
  };

  const handleCopyCurrentCode = () => {
    if (tabs.activeTabId() === "editor") {
      navigator.clipboard.writeText(editorContent());
    } else {
      navigator.clipboard.writeText(currentCode());
    }
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 1500);
  };

  const desktopModules = [
    {
      name: "Rich Text Editor",
      type: "UI Component",
      pkg: "components/ui/rich-text-editor",
      href: "/docs/components/rich-text-editor",
      icon: Sparkles,
      description: "Full-featured WYSIWYG rich text editor with toolbar, bubble formatting, tables, task lists, and Markdown.",
      cli: "bunx @nikala-ui/cli add rich-text-editor",
    },
    {
      name: "Titlebar & Controls",
      type: "UI Component",
      pkg: "components/ui/titlebar",
      href: "/docs/desktop/titlebar",
      icon: AppWindow,
      description: "Frameless titlebars with native Tauri drag regions, macOS traffic lights, and Windows 11 controls.",
      cli: "bunx @nikala-ui/cli add titlebar",
    },
    {
      name: "TitlebarTabs",
      type: "UI Component",
      pkg: "components/ui/titlebar-tabs",
      href: "/docs/desktop/titlebar-tabs",
      icon: Layers,
      description: "Multi-document tab bars supporting pills and underline variants, dirty indicators, and closable states.",
      cli: "bunx @nikala-ui/cli add titlebar-tabs",
    },
    {
      name: "createDocumentTabs",
      type: "Primitive",
      pkg: "hooks/create-document-tabs",
      href: "/docs/desktop/create-document-tabs",
      icon: FileCode,
      description: "Reactive tab manager with active state, dirty tracking, ⌘W/⌘T keybindings, and dynamic view routing.",
      cli: "bunx @nikala-ui/cli add -h create-document-tabs",
    },
    {
      name: "createTauriWindow",
      type: "Primitive",
      pkg: "hooks/create-tauri-window",
      href: "/docs/desktop/create-tauri-window",
      icon: ShieldCheck,
      description: "Fine-grained window controls: minimize, maximize, fullscreen, start dragging, and OS platform detection.",
      cli: "bunx @nikala-ui/cli add -h create-tauri-window",
    },
    {
      name: "UpdaterModal & Primitives",
      type: "Suite",
      pkg: "components/ui/updater-modal",
      href: "/docs/desktop/updater-dialog",
      icon: Download,
      description: "Native Tauri v2 auto-updater modal with changelog release notes, download progress, and restart actions.",
      cli: "bunx @nikala-ui/cli add updater-modal",
    },
  ];

  return (
    <section class="py-16 md:py-24 border-b border-border/40 bg-muted/10 relative overflow-hidden">
      <div class="container max-w-7xl px-4 mx-auto space-y-10">
        {/* 1. Section Header */}
        <div class="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <div class="space-y-2 text-left max-w-2xl">
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-primary/30 bg-primary/5 text-primary text-xs font-semibold">
              <AppWindow class="size-3.5" />
              <span>Tauri v2 Desktop Suite</span>
            </div>
            <h2 class="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Native Desktop Primitives for SolidJS
            </h2>
            <p class="text-sm sm:text-base text-muted-foreground">
              Frameless titlebars, window controls, multi-document tabs, and rich text editors engineered for Tauri v2.
            </p>
          </div>

          <div class="flex items-center gap-3">
            {/* Live Platform Morph Selector */}
            <div class="flex items-center p-1 rounded-lg bg-background border border-border shadow-xs">
              <button
                type="button"
                onClick={() => setPlatform("macos")}
                class="px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer"
                classList={{
                  "bg-primary text-primary-foreground font-semibold shadow-xs": platform() === "macos",
                  "text-muted-foreground hover:text-foreground": platform() !== "macos",
                }}
              >
                macOS Lights
              </button>
              <button
                type="button"
                onClick={() => setPlatform("windows")}
                class="px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer"
                classList={{
                  "bg-primary text-primary-foreground font-semibold shadow-xs": platform() === "windows",
                  "text-muted-foreground hover:text-foreground": platform() !== "windows",
                }}
              >
                Windows 11
              </button>
            </div>

            <A href="/docs/desktop/titlebar">
              <Button variant="outline" class="gap-2 text-xs font-semibold cursor-pointer">
                Desktop Documentation
                <ArrowRight class="size-3.5" />
              </Button>
            </A>
          </div>
        </div>

        {/* 2. Frameless Desktop Window Frame */}
        <div class="rounded-lg border border-border bg-card shadow-2xl overflow-hidden text-foreground">
          {/* Frameless Titlebar */}
          <Titlebar platform={platform()} class="border-b border-border bg-muted/60 text-foreground">
            <TitlebarTitle align="start" class="mx-2 font-bold text-primary text-xs">
              Nikala Studio
            </TitlebarTitle>
            <TitlebarControls />
            <TitlebarTabs
              manager={tabs}
              variant="pills"
              onAddTab={handleAddTab}
            />
            <TitlebarActions>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyCurrentCode}
                class="h-7 text-xs gap-1.5 px-2 cursor-pointer text-muted-foreground hover:text-foreground hover:bg-muted/50"
              >
                <Show when={copiedCode()} fallback={<Copy class="size-3.5" />}>
                  <Check class="size-3.5 text-emerald-500" />
                </Show>
                <span class="hidden sm:inline">
                  {copiedCode() ? "Copied" : tabs.activeTabId() === "editor" ? "Copy HTML" : "Copy Code"}
                </span>
              </Button>
            </TitlebarActions>
          </Titlebar>

          {/* Window Body: Live Rich Text Editor vs Code Viewer */}
          <Show
            when={tabs.activeTabId() === "editor"}
            fallback={
              <div class="font-mono text-xs overflow-hidden flex flex-col min-h-[380px] max-h-[480px] select-text bg-card">
                <div class="p-4 md:p-6 space-y-0.5 overflow-auto flex-1 text-[11px] leading-relaxed">
                  <For each={currentCode().split("\n")}>
                    {(line, idx) => {
                      const tokens = tokenizeLine(line);
                      return (
                        <div class="flex hover:bg-muted/30 -mx-4 md:-mx-6 px-4 md:px-6 py-0.5 rounded-xs">
                          <span class="w-8 select-none text-muted-foreground/40 text-right pr-4 shrink-0 font-mono text-[10px]">
                            {idx() + 1}
                          </span>
                          <div class="whitespace-pre">
                            <For each={tokens}>
                              {(t) => <span class={t.color}>{t.text}</span>}
                            </For>
                          </div>
                        </div>
                      );
                    }}
                  </For>
                </div>

                {/* Bottom Editor Bar */}
                <div class="flex items-center justify-between px-4 py-1.5 bg-muted/20 border-t border-border/60 text-[10px] text-muted-foreground shrink-0 font-mono">
                  <div class="flex items-center gap-3">
                    <span class="text-foreground flex items-center gap-1">
                      <FileCode class="size-3 text-primary" />
                      {tabs.activeTab()?.title}
                    </span>
                    <span>TypeScript JSX</span>
                    <span>UTF-8</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="text-emerald-600 dark:text-emerald-400">● Fine-grained 0ms Reactivity</span>
                    <span>Tauri v2</span>
                  </div>
                </div>
              </div>
            }
          >
            {/* Live Interactive Rich Text Editor Tab Seamlessly Integrated */}
            <div class="bg-card text-left">
              <RichTextEditor
                class="border-0 shadow-none rounded-none bg-card min-h-[360px]"
                value={editorContent()}
                onChange={setEditorContent}
                placeholder="Type something wonderful or type '/' for commands..."
              />
            </div>
          </Show>
        </div>

        {/* 3. Complete Technical Desktop Catalog */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <For each={desktopModules}>
            {(mod) => {
              const Icon = mod.icon;
              return (
                <A
                  href={mod.href}
                  class="group p-4 rounded-lg border border-border/70 bg-card/60 hover:bg-card hover:border-border transition-all flex flex-col justify-between space-y-3"
                >
                  <div class="space-y-2">
                    <div class="flex items-center justify-between">
                      <div class="size-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                        <Icon class="size-4" />
                      </div>
                      <Badge variant="outline" class="text-[10px] font-mono border-border">
                        {mod.type}
                      </Badge>
                    </div>

                    <div class="space-y-0.5 text-left">
                      <div class="flex items-center gap-1.5">
                        <h3 class="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                          {mod.name}
                        </h3>
                        <ExternalLink class="size-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p class="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {mod.description}
                      </p>
                    </div>
                  </div>

                  <div class="pt-2 border-t border-border/40 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                    <span class="text-primary truncate">{mod.pkg}</span>
                    <span class="text-xs group-hover:translate-x-0.5 transition-transform">→</span>
                  </div>
                </A>
              );
            }}
          </For>
        </div>
      </div>
    </section>
  );
}
