import {
  Show,
  splitProps,
  type Component,
  type ParentComponent,
  type JSX,
} from "solid-js";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import type {
  CreateAppUpdaterReturn,
  UpdateManifestInfo,
  UpdateProgressInfo,
} from "@/hooks/create-app-updater";
import {
  Download,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Package,
} from "lucide-solid";
import { cn } from "@/lib/cn";

function formatBytes(bytes: number): string {
  if (!bytes || bytes === 0) return "0 MB";
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
}

/* --- 1. Sub-components for Clean Modularity & Zero Repetition --- */

export interface UpdaterHeaderProps {
  appName: string;
  status: string;
  info?: UpdateManifestInfo | null;
}

export const UpdaterHeader: Component<UpdaterHeaderProps> = (props) => (
  <DialogHeader class="space-y-1.5 text-left">
    <div class="flex items-center justify-between">
      <div class="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
        <Package class="size-4" />
      </div>
      <Show when={props.info?.version}>
        <div class="flex items-center gap-1.5 text-xs font-mono">
          <span class="text-muted-foreground">{props.info?.currentVersion || "v1.0.0"}</span>
          <ArrowRight class="size-3 text-muted-foreground" />
          <Badge variant="default" class="text-xs px-1.5 py-0 bg-primary text-primary-foreground font-semibold">
            {props.info?.version}
          </Badge>
        </div>
      </Show>
    </div>

    <DialogTitle class="text-base font-bold tracking-tight text-foreground">
      {props.status === "downloaded"
        ? "Update Ready to Install"
        : props.status === "downloading"
        ? "Downloading Update..."
        : props.status === "up-to-date"
        ? "Up to Date"
        : `New Update Available for ${props.appName}`}
    </DialogTitle>

    <DialogDescription class="text-xs text-muted-foreground leading-relaxed">
      {props.status === "downloaded"
        ? "The update has been downloaded and verified. Restart to apply changes."
        : props.status === "downloading"
        ? "Please wait while update packages are being downloaded."
        : props.status === "up-to-date"
        ? `${props.appName} is running on the latest version.`
        : "A new version with features and bug fixes is ready to install."}
    </DialogDescription>
  </DialogHeader>
);

export interface UpdaterReleaseNotesProps {
  body?: string;
  date?: string;
}

export const UpdaterReleaseNotes: Component<UpdaterReleaseNotesProps> = (props) => (
  <div class="space-y-1">
    <div class="flex items-center justify-between text-xs text-muted-foreground font-medium">
      <span>Release Notes</span>
      <Show when={props.date}>
        <span class="text-[11px] font-mono">{props.date}</span>
      </Show>
    </div>
    <pre class="max-h-28 overflow-y-auto rounded-md border border-border bg-black/5 dark:bg-black/50 p-2.5 text-xs text-foreground font-mono whitespace-pre-wrap leading-relaxed select-text shadow-inner">
      {props.body}
    </pre>
  </div>
);

export interface UpdaterProgressBarProps {
  progress: UpdateProgressInfo;
}

export const UpdaterProgressBar: Component<UpdaterProgressBarProps> = (props) => (
  <div class="space-y-1.5 py-1">
    <div class="flex items-center justify-between text-xs font-mono">
      <span class="text-muted-foreground font-sans">Progress</span>
      <span class="font-semibold text-primary">{props.progress.percentage}%</span>
    </div>
    <Progress value={props.progress.percentage} class="h-1.5" />
    <div class="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
      <span>{formatBytes(props.progress.downloaded)}</span>
      <span>{formatBytes(props.progress.total)}</span>
    </div>
  </div>
);

/* --- 2. Main UpdaterModal Compound Component --- */

export interface UpdaterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  updater: CreateAppUpdaterReturn;
  appName?: string;
  class?: string;
}

export const UpdaterModal: Component<UpdaterModalProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "open",
    "onOpenChange",
    "updater",
    "appName",
    "class",
  ]);

  const appName = () => local.appName || "Nikala Desktop";
  const status = () => local.updater.status();
  const info = () => local.updater.updateInfo();
  const progress = () => local.updater.progress();
  const error = () => local.updater.error();

  return (
    <Dialog open={local.open} onOpenChange={local.onOpenChange}>
      <DialogContent class={cn("sm:max-w-sm", local.class)}>
        {/* Header */}
        <UpdaterHeader
          appName={appName()}
          status={status()}
          info={info()}
        />

        {/* Error Alert */}
        <Show when={error()}>
          <Alert variant="destructive" class="py-2 text-xs">
            <AlertTriangle class="size-3.5" />
            <AlertTitle class="font-semibold text-xs">Update Failed</AlertTitle>
            <AlertDescription class="text-[11px]">{error()}</AlertDescription>
          </Alert>
        </Show>

        {/* Release Notes */}
        <Show when={info()?.body && (status() === "available" || status() === "downloading")}>
          <UpdaterReleaseNotes body={info()?.body} date={info()?.date} />
        </Show>

        {/* Progress Bar */}
        <Show when={status() === "downloading"}>
          <UpdaterProgressBar progress={progress()} />
        </Show>

        {/* Success Callout */}
        <Show when={status() === "downloaded"}>
          <div class="flex items-center gap-2.5 p-2.5 rounded-md border border-primary/30 bg-primary/5 text-xs text-foreground">
            <CheckCircle2 class="size-4 text-primary shrink-0" />
            <p class="font-medium text-foreground text-xs">Package downloaded & verified.</p>
          </div>
        </Show>

        {/* Actions Footer */}
        <DialogFooter class="flex-row items-center justify-end gap-1.5 pt-1">
          <Show when={status() === "available" || status() === "error"}>
            <Button
              variant="outline"
              size="sm"
              onClick={() => local.onOpenChange(false)}
              class="text-xs h-7.5 px-3 cursor-pointer"
            >
              Later
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => local.updater.downloadAndInstall()}
              class="text-xs h-7.5 px-3 gap-1.5 cursor-pointer font-medium"
            >
              <Download class="size-3.5" />
              <span>Update Now</span>
            </Button>
          </Show>

          <Show when={status() === "downloading"}>
            <Button
              variant="outline"
              size="sm"
              disabled
              class="text-xs h-7.5 w-full opacity-70 justify-center"
            >
              Downloading ({progress().percentage}%)
            </Button>
          </Show>

          <Show when={status() === "downloaded"}>
            <Button
              variant="outline"
              size="sm"
              onClick={() => local.onOpenChange(false)}
              class="text-xs h-7.5 px-3 cursor-pointer"
            >
              Later
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => local.updater.relaunch()}
              class="text-xs h-7.5 px-3 gap-1.5 cursor-pointer font-semibold shadow-xs"
            >
              <RotateCcw class="size-3.5" />
              <span>Relaunch</span>
            </Button>
          </Show>

          <Show when={status() === "up-to-date" || status() === "idle"}>
            <Button
              variant="outline"
              size="sm"
              onClick={() => local.onOpenChange(false)}
              class="text-xs h-7.5 px-3 cursor-pointer"
            >
              Close
            </Button>
          </Show>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
