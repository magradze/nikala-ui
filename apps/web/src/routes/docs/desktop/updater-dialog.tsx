import { createSignal, Show } from "solid-js";
import { Seo } from "@/components/seo";
import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { UpdaterModal } from "@/components/ui/updater-modal";
import { createAppUpdater } from "@/hooks/create-app-updater";
import {
  Package,
  Download,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  ShieldCheck,
} from "lucide-solid";

const importCode = `import { UpdaterModal } from "@/components/ui/updater-modal";
import { createAppUpdater } from "@/hooks/create-app-updater";`;

const usageCode = `import { createSignal } from "solid-js";
import { UpdaterModal } from "@/components/ui/updater-modal";
import { createAppUpdater } from "@/hooks/create-app-updater";
import { Button } from "@/components/ui/button";

function DesktopApp() {
  const [isOpen, setIsOpen] = createSignal(false);

  const updater = createAppUpdater({
    autoCheck: true,
    currentVersion: "v1.0.0",
    onUpdateAvailable: (info) => {
      setIsOpen(true);
    },
  });

  return (
    <div class="p-4">
      <Button
        variant="default"
        onClick={() => updater.checkForUpdates()}
      >
        Check for Updates
      </Button>

      <UpdaterModal
        open={isOpen()}
        onOpenChange={setIsOpen}
        updater={updater}
        appName="Nikala Studio"
      />
    </div>
  );
}`;

export default function UpdaterDialogDocsPage() {
  const [isOpen, setIsOpen] = createSignal(false);

  const updater = createAppUpdater({
    currentVersion: "v1.0.0",
  });

  const handleSimulateUpdate = () => {
    updater.simulateUpdate({
      version: "v1.2.0",
      date: "2026-08-31",
      body: "### What's New in Nikala Studio v1.2.0\n\n- Added native Window Titlebar tabs with drag region\n- Enhanced Tauri v2 capability security configuration\n- Optimized SolidJS signal reactivity and memory overhead\n- Fixed titlebar maximize layout jitter on Windows 11",
    });
    setIsOpen(true);
  };

  const handleCheckUpdate = async () => {
    await updater.checkForUpdates();
    setIsOpen(true);
  };

  return (
    <>
      <Seo
        title="UpdaterDialog Component — Nikala UI Desktop"
        description="Automated application update dialog for Tauri v2 and SolidJS with release notes preview, download progress bar, and relaunch actions."
        path="/docs/desktop/updater-dialog"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <div class="space-y-2">
          <div class="flex flex-wrap items-center gap-2">
            <h1 class="text-2xl sm:text-3xl font-bold tracking-tight">UpdaterDialog</h1>
            <div class="flex items-center gap-1.5 shrink-0">
              <Badge variant="outline" class="text-xs border-primary/40 text-primary">Tauri v2</Badge>
              <Badge variant="secondary" class="text-xs">Desktop</Badge>
            </div>
          </div>
          <p class="text-sm sm:text-base text-muted-foreground leading-relaxed">
            A complete, drop-in application auto-updater dialog for Tauri v2. Displays release notes, real-time download progress, signature verification, and one-click relaunch.
          </p>
        </div>

        {/* Live Interactive Simulator Stage */}
        <div class="space-y-4">
          <DocSectionHeader
            title="Live Update Simulator"
            description="Trigger the updater modal to inspect all lifecycle phases in your browser"
          />

          <Card class="bg-card/50 border-border/80 p-6 space-y-6">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div class="space-y-1">
                <div class="flex items-center gap-2 font-semibold text-foreground text-sm">
                  <Package class="size-4 text-primary" />
                  <span>Current App Version: <code class="font-mono text-primary font-bold">v1.0.0</code></span>
                </div>
                <p class="text-xs text-muted-foreground">
                  Simulate an available update or check the update endpoint.
                </p>
              </div>

              <div class="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCheckUpdate}
                  class="gap-1.5 cursor-pointer text-xs"
                >
                  <RefreshCw class="size-3.5" />
                  <span>Check for Updates</span>
                </Button>

                <Button
                  variant="default"
                  size="sm"
                  onClick={handleSimulateUpdate}
                  class="gap-1.5 cursor-pointer text-xs shadow-xs"
                >
                  <Sparkles class="size-3.5" />
                  <span>Simulate Update (v1.2.0)</span>
                </Button>
              </div>
            </div>

            {/* Current Lifecycle Status Pill */}
            <div class="p-3.5 rounded-lg bg-muted/40 border border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div class="flex items-center gap-2">
                <span class="text-muted-foreground">Updater Status:</span>
                <Badge variant="secondary" class="font-mono uppercase text-[10px]">
                  {updater.status()}
                </Badge>
              </div>
              <Show when={updater.status() === "downloaded"}>
                <span class="text-primary font-medium flex items-center gap-1">
                  <CheckCircle2 class="size-3.5" />
                  <span>Update ready to relaunch</span>
                </span>
              </Show>
            </div>
          </Card>

          {/* Render Active Modal */}
          <UpdaterModal
            open={isOpen()}
            onOpenChange={setIsOpen}
            updater={updater}
            appName="Nikala Studio"
          />
        </div>

        {/* Installation */}
        <div class="space-y-4">
          <DocSectionHeader
            title="Installation"
            description="Copy component and reactive primitive into your project"
          />

          <CodeBlock
            code="bunx @nikala-ui/cli add updater-modal -h create-app-updater"
            lang="bash"
            isCli={true}
          />
        </div>

        {/* Code Usage */}
        <div class="space-y-4">
          <DocSectionHeader
            title="Usage Example"
            description="Integrate auto-update checking on launch or user action"
          />

          <CodeBlock code={usageCode} lang="tsx" />
        </div>

        {/* Tauri v2 Setup Guide */}
        <div class="space-y-4">
          <DocSectionHeader
            title="Tauri v2 Auto-Updater Configuration"
            description="Configure Rust plugins, public key signature verification, and update endpoints"
          />

          <p class="text-sm text-muted-foreground">
            1. Install the official Tauri updater and process plugins in <code>src-tauri</code>:
          </p>

          <CodeBlock
            code="cargo add tauri-plugin-updater tauri-plugin-process"
            lang="bash"
          />

          <p class="text-sm text-muted-foreground mt-4">
            2. Register plugins in <code>src-tauri/src/lib.rs</code>:
          </p>

          <CodeBlock
            code={`tauri::Builder::default()
    .plugin(tauri_plugin_updater::Builder::new().build())
    .plugin(tauri_plugin_process::init())
    .run(tauri::generate_context!())
    .expect("error running app");`}
            lang="rust"
          />

          <p class="text-sm text-muted-foreground mt-4">
            3. Configure update endpoint and signature public key in <code>src-tauri/tauri.conf.json</code>:
          </p>

          <CodeBlock
            code={`{
  "plugins": {
    "updater": {
      "pubkey": "dW50cnVzdGVkIGNvbW1lbnQ6IG1pbmlzaWduIHB1YmxpYyBrZXk...",
      "endpoints": [
        "https://releases.myapp.com/{{target}}/{{current_version}}"
      ]
    }
  }
}`}
            lang="json"
          />
        </div>

        {/* API Reference */}
        <DocApiTable
          title="UpdaterModal Props"
          items={[
            {
              prop: "open",
              type: "boolean",
              default: "-",
              description: "Controlled open/close state of the modal dialog.",
            },
            {
              prop: "onOpenChange",
              type: "(open: boolean) => void",
              default: "-",
              description: "Callback invoked when modal disclosure state changes.",
            },
            {
              prop: "updater",
              type: "CreateAppUpdaterReturn",
              default: "-",
              description: "Reactive updater instance returned from createAppUpdater().",
            },
            {
              prop: "appName",
              type: "string",
              default: '"Application"',
              description: "Application name displayed in the header title.",
            },
          ]}
        />

        <DocNextSteps
          prev={{
            title: "Titlebar Component",
            href: "/docs/desktop/titlebar",
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
