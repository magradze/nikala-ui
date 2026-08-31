import { createSignal } from "solid-js";
import { Seo } from "@/components/seo";
import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { createGlobalShortcut } from "@nikala-ui/hooks";
import { Command, Sparkles, CheckCircle2 } from "lucide-solid";

const importCode = `import { createGlobalShortcut } from "@nikala-ui/hooks";`;

const usageCode = `import { createSignal } from "solid-js";
import { createGlobalShortcut } from "@/hooks/create-global-shortcut";

function AppShortcutListener() {
  const [lastTriggered, setLastTriggered] = createSignal("");

  createGlobalShortcut({
    shortcut: ["CommandOrControl+Shift+K", "Alt+Space"],
    onTrigger: (key) => {
      setLastTriggered(key);
      console.log("Global shortcut fired:", key);
    },
  });

  return (
    <div>
      <p>Press Ctrl+Shift+K or Alt+Space anywhere on your system.</p>
      {lastTriggered() && <p>Last shortcut: {lastTriggered()}</p>}
    </div>
  );
}`;

export default function CreateGlobalShortcutDocsPage() {
  const [triggerCount, setTriggerCount] = createSignal(0);
  const [lastCombo, setLastCombo] = createSignal("");

  createGlobalShortcut({
    shortcut: ["CommandOrControl+Shift+K", "Alt+Space"],
    onTrigger: (combo) => {
      setTriggerCount((c) => c + 1);
      setLastCombo(combo);
    },
  });

  return (
    <>
      <Seo
        title="createGlobalShortcut Primitive — Nikala UI Desktop"
        description="SolidJS reactive primitive for registering native OS-level global hotkeys via Tauri v2 plugin with automatic browser fallback."
        path="/docs/desktop/create-global-shortcut"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <div class="space-y-2">
          <div class="flex flex-wrap items-center gap-2">
            <h1 class="text-2xl sm:text-3xl font-bold tracking-tight break-all sm:break-normal">
              createGlobalShortcut
            </h1>
            <div class="flex items-center gap-1.5 shrink-0">
              <Badge variant="outline" class="text-xs border-primary/40 text-primary">Tauri v2</Badge>
              <Badge variant="secondary" class="text-xs">Hook</Badge>
            </div>
          </div>
          <p class="text-sm sm:text-base text-muted-foreground leading-relaxed">
            A reactive primitive for registering system-wide global hotkeys using the Tauri v2 Global Shortcut plugin, with automatic keyboard fallback for web browsers.
          </p>
        </div>

        {/* Live Interactive Trigger Test */}
        <div class="space-y-4">
          <DocSectionHeader
            title="Live Shortcut Test"
            description="Press Ctrl+Shift+K or Alt+Space on your keyboard to test listener"
          />

          <Card class="bg-card/50 border-border/80 p-4 sm:p-6 space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div class="flex items-center gap-2">
                <Command class="size-4 text-primary shrink-0" />
                <span class="text-sm font-semibold text-foreground">Registered Key Combinations</span>
              </div>
              <Badge variant="secondary" class="text-xs font-mono w-fit">
                Ctrl+Shift+K | Alt+Space
              </Badge>
            </div>

            <div class="p-4 rounded-md bg-muted/40 border border-border/50 flex items-center justify-between text-xs">
              <div class="space-y-1">
                <span class="text-muted-foreground">Trigger Status</span>
                <p class="font-mono text-foreground font-semibold">
                  {triggerCount() > 0
                    ? `Triggered ${triggerCount()} time(s) (Last: ${lastCombo()})`
                    : "Awaiting keypress..."}
                </p>
              </div>
              {triggerCount() > 0 && (
                <span class="inline-flex items-center gap-1 text-primary font-medium">
                  <CheckCircle2 class="size-3.5" />
                  <span>Active</span>
                </span>
              )}
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
            code="bunx @nikala-ui/cli add -h create-global-shortcut"
            lang="bash"
            isCli={true}
          />
        </div>

        {/* Code Usage */}
        <div class="space-y-4">
          <DocSectionHeader
            title="Usage Example"
            description="Listen to global desktop hotkeys"
          />

          <CodeBlock code={usageCode} lang="tsx" />
        </div>

        {/* Tauri Plugin Setup */}
        <div class="space-y-4">
          <DocSectionHeader
            title="Tauri v2 Plugin Configuration"
            description="Add global shortcut plugin to your Rust backend"
          />

          <p class="text-sm text-muted-foreground">
            1. Install the official Tauri global shortcut plugin in <code>src-tauri</code>:
          </p>

          <CodeBlock
            code="cargo add tauri-plugin-global-shortcut"
            lang="bash"
          />

          <p class="text-sm text-muted-foreground mt-4">
            2. Register the plugin in <code>src-tauri/src/lib.rs</code>:
          </p>

          <CodeBlock
            code={`tauri::Builder::default()
    .plugin(tauri_plugin_global_shortcut::Builder::new().build())
    .run(tauri::generate_context!())
    .expect("error while running tauri application");`}
            lang="rust"
          />
        </div>

        {/* API Table */}
        <DocApiTable
          title="Options"
          items={[
            {
              prop: "shortcut",
              type: "string | string[]",
              default: "-",
              description: "Key combination string (e.g., 'CommandOrControl+Shift+P', 'Alt+Space').",
            },
            {
              prop: "onTrigger",
              type: "(shortcut: string) => void",
              default: "-",
              description: "Callback invoked whenever the global shortcut is triggered.",
            },
            {
              prop: "autoRegister",
              type: "boolean",
              default: "true",
              description: "Automatically registers shortcuts on mount and cleans up on unmount.",
            },
          ]}
        />

        <DocNextSteps
          prev={{
            title: "createTauriWindow",
            href: "/docs/desktop/create-tauri-window",
          }}
          next={{
            title: "Desktop Suite Setup",
            href: "/docs/desktop/setup",
          }}
        />
      </div>
    </>
  );
}
