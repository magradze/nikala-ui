import { createSignal, Show, For } from "solid-js";
import { Seo } from "@/components/seo";
import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { createAppUpdater } from "@/hooks/create-app-updater";
import {
  Download,
  RotateCcw,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  Package,
  Activity,
  Zap,
} from "lucide-solid";

const importCode = `import { createAppUpdater } from "@/hooks/create-app-updater";`;

const basicUsageCode = `import { createAppUpdater } from "@/hooks/create-app-updater";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Show } from "solid-js";
import { Download, RotateCcw } from "lucide-solid";

function AppHeader() {
  const updater = createAppUpdater({
    autoCheck: true,
    currentVersion: "v1.0.0",
    onUpdateAvailable: (info) => {
      console.log("New version available:", info.version);
    },
  });

  return (
    <div class="flex items-center gap-3 p-3 rounded-lg border bg-card">
      {/* 1. Status Pill */}
      <span class="text-xs text-muted-foreground">
        Status: <Badge variant="secondary" class="font-mono text-xs">{updater.status()}</Badge>
      </span>

      {/* 2. Download Action */}
      <Show when={updater.status() === "available"}>
        <Button
          variant="default"
          size="sm"
          onClick={() => updater.downloadAndInstall()}
          class="h-7 text-xs gap-1.5"
        >
          <Download class="size-3.5" />
          <span>Download {updater.updateInfo()?.version}</span>
        </Button>
      </Show>

      {/* 3. Restart Action */}
      <Show when={updater.status() === "downloaded"}>
        <Button
          variant="default"
          size="sm"
          onClick={() => updater.relaunch()}
          class="h-7 text-xs gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          <RotateCcw class="size-3.5" />
          <span>Restart to Apply</span>
        </Button>
      </Show>
    </div>
  );
};`;

function formatBytes(bytes: number): string {
  if (!bytes || bytes === 0) return "0 MB";
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
}

export default function CreateAppUpdaterDocsPage() {
  const updater = createAppUpdater({
    currentVersion: "v1.0.0",
  });

  const handleSimulate = () => {
    updater.simulateUpdate({
      version: "v1.2.0",
      date: new Date().toISOString().split("T")[0],
      body: "### Release Highlights v1.2.0\n- Added native Window Titlebar tabs\n- Upgraded Tauri v2 capabilities\n- Optimized reactive SolidJS update signals",
    });
  };

  return (
    <>
      <Seo
        title="createAppUpdater Hook — Nikala UI Desktop"
        description="Fine-grained reactive SolidJS primitive for checking, downloading, observing progress, and installing Tauri v2 desktop application updates."
        path="/docs/desktop/create-app-updater"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <div class="space-y-2">
          <div class="flex flex-wrap items-center gap-2">
            <h1 class="text-2xl sm:text-3xl font-bold tracking-tight">createAppUpdater</h1>
            <div class="flex items-center gap-1.5 shrink-0">
              <Badge variant="outline" class="text-xs border-primary/40 text-primary">Tauri v2</Badge>
              <Badge variant="secondary" class="text-xs">Hook</Badge>
            </div>
          </div>
          <p class="text-sm sm:text-base text-muted-foreground leading-relaxed">
            A fine-grained reactive SolidJS primitive for Tauri v2 auto-updates. Seamlessly checks remote release endpoints, tracks real-time chunk download bytes, and triggers one-click application restarts.
          </p>
        </div>

        {/* Live Headless Primitive Tester */}
        <div class="space-y-4">
          <DocSectionHeader
            title="Interactive Primitive State Tester"
            description="Trigger updater lifecycle actions to inspect reactive signals in real-time"
          />

          <Card class="bg-card/50 border-border/80 p-6 space-y-6">
            {/* Top Toolbar */}
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div class="space-y-1">
                <div class="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Activity class="size-4 text-primary" />
                  <span>Observed Status:</span>
                  <Badge variant="default" class="font-mono text-xs uppercase bg-primary text-primary-foreground">
                    {updater.status()}
                  </Badge>
                </div>
                <p class="text-xs text-muted-foreground">
                  Current App Version: <code class="font-mono text-foreground font-semibold">v1.0.0</code>
                </p>
              </div>

              <div class="flex flex-wrap items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updater.checkForUpdates()}
                  disabled={updater.isLoading()}
                  class="gap-1.5 cursor-pointer text-xs"
                >
                  <RefreshCw class="size-3.5" classList={{ "animate-spin": updater.status() === "checking" }} />
                  <span>Check Updates</span>
                </Button>

                <Button
                  variant="default"
                  size="sm"
                  onClick={handleSimulate}
                  class="gap-1.5 cursor-pointer text-xs shadow-xs"
                >
                  <Sparkles class="size-3.5" />
                  <span>Simulate Release</span>
                </Button>
              </div>
            </div>

            {/* Reactive State Cards Grid */}
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {/* Card 1: Version Target */}
              <div class="p-3.5 rounded-lg border border-border/60 bg-muted/30 space-y-1">
                <span class="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Target Version</span>
                <p class="text-sm font-bold font-mono text-foreground">
                  {updater.updateInfo()?.version || "— (No update detected)"}
                </p>
              </div>

              {/* Card 2: Progress Status */}
              <div class="p-3.5 rounded-lg border border-border/60 bg-muted/30 space-y-1">
                <span class="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Download Progress</span>
                <p class="text-sm font-bold font-mono text-foreground">
                  {updater.progress().percentage}% ({formatBytes(updater.progress().downloaded)})
                </p>
              </div>

              {/* Card 3: Loading Flag */}
              <div class="p-3.5 rounded-lg border border-border/60 bg-muted/30 space-y-1 sm:col-span-2 lg:col-span-1">
                <span class="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">isLoading Signal</span>
                <p class="text-sm font-bold font-mono text-foreground">
                  {updater.isLoading() ? "true" : "false"}
                </p>
              </div>
            </div>

            {/* Download Progress Bar (When downloading) */}
            <Show when={updater.status() === "downloading"}>
              <div class="space-y-1.5 p-3 rounded-lg border border-primary/20 bg-primary/5">
                <div class="flex items-center justify-between text-xs font-mono">
                  <span class="text-foreground font-medium">Downloading Update Stream</span>
                  <span class="text-primary font-bold">{updater.progress().percentage}%</span>
                </div>
                <Progress value={updater.progress().percentage} class="h-2" />
              </div>
            </Show>

            {/* Live Actions Trigger Bar */}
            <div class="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border/50">
              <span class="text-xs text-muted-foreground">Action Triggers:</span>

              <div class="flex items-center gap-2">
                <Show when={updater.status() === "available"}>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => updater.downloadAndInstall()}
                    class="gap-1.5 cursor-pointer text-xs"
                  >
                    <Download class="size-3.5" />
                    <span>Download & Install</span>
                  </Button>
                </Show>

                <Show when={updater.status() === "downloaded"}>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => updater.relaunch()}
                    class="gap-1.5 cursor-pointer text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                  >
                    <RotateCcw class="size-3.5" />
                    <span>Relaunch Application</span>
                  </Button>
                </Show>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => updater.dismiss()}
                  class="text-xs cursor-pointer text-muted-foreground hover:text-foreground"
                >
                  Reset State
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Installation */}
        <div class="space-y-4">
          <DocSectionHeader
            title="Installation"
            description="Copy the reactive primitive into your src/hooks directory"
          />

          <CodeBlock
            code="bunx @nikala-ui/cli add --hook create-app-updater"
            lang="bash"
            isCli={true}
          />
        </div>

        {/* Headless Usage Code */}
        <div class="space-y-4">
          <DocSectionHeader
            title="Headless Usage Example"
            description="Control update lifecycles without any pre-packaged modal dialogs"
          />

          <CodeBlock code={basicUsageCode} lang="tsx" />
        </div>

        {/* API Reference Table */}
        <DocApiTable
          title="CreateAppUpdaterOptions"
          items={[
            {
              prop: "autoCheck",
              type: "boolean",
              default: "false",
              description: "Whether to automatically check the update endpoint once mounted.",
            },
            {
              prop: "currentVersion",
              type: "string",
              default: '"v1.0.0"',
              description: "Application version fallback string if not automatically resolved.",
            },
            {
              prop: "onUpdateAvailable",
              type: "(info: UpdateManifestInfo) => void",
              default: "-",
              description: "Callback invoked when a new version release is detected.",
            },
            {
              prop: "onDownloadFinished",
              type: "() => void",
              default: "-",
              description: "Callback invoked when update download and signature verification completes.",
            },
            {
              prop: "onError",
              type: "(error: Error | string) => void",
              default: "-",
              description: "Callback invoked on network or signature verification failures.",
            },
          ]}
        />

        <DocApiTable
          title="CreateAppUpdaterReturn"
          items={[
            {
              prop: "status",
              type: 'Accessor<"idle" | "checking" | "available" | "downloading" | "downloaded" | "up-to-date" | "error">',
              default: "-",
              description: "Fine-grained reactive signal tracking the current lifecycle status.",
            },
            {
              prop: "updateInfo",
              type: "Accessor<UpdateManifestInfo | null>",
              default: "-",
              description: "Reactive metadata containing target version, release notes, and publication date.",
            },
            {
              prop: "progress",
              type: "Accessor<{ downloaded: number; total: number; percentage: number }>",
              default: "-",
              description: "Reactive signal tracking download stream bytes and percentage.",
            },
            {
              prop: "isLoading",
              type: "Accessor<boolean>",
              default: "-",
              description: "Convenience signal indicating if an operation is active (checking or downloading).",
            },
            {
              prop: "checkForUpdates",
              type: "() => Promise<boolean>",
              default: "-",
              description: "Queries configured Tauri updater endpoint for new releases.",
            },
            {
              prop: "downloadAndInstall",
              type: "() => Promise<void>",
              default: "-",
              description: "Downloads and verifies update binaries with live chunk progress updates.",
            },
            {
              prop: "relaunch",
              type: "() => Promise<void>",
              default: "-",
              description: "Restarts desktop application process to apply installed updates.",
            },
            {
              prop: "simulateUpdate",
              type: "(mockInfo?: Partial<UpdateManifestInfo>) => void",
              default: "-",
              description: "Simulates an available release for browser testing and UI development.",
            },
          ]}
        />

        <DocNextSteps
          prev={{
            title: "UpdaterDialog Component",
            href: "/docs/desktop/updater-dialog",
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
