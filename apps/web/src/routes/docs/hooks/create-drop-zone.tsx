// src/routes/docs/hooks/create-drop-zone.tsx
import { createSignal, For, Show } from "solid-js";
import { createDropZone } from "@nikala-ui/hooks";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UploadCloud, FileText, X, AlertCircle, CheckCircle2, Image as ImageIcon } from "lucide-solid";

const importCode = `import { createDropZone } from "@/hooks/create-drop-zone";`;

const basicUsageCode = `const dropZone = createDropZone({
  accept: ["image/*", "application/pdf"],
  maxSize: 5 * 1024 * 1024, // 5MB limit
  maxFiles: 3,
  onDrop: (acceptedFiles) => {
    console.log("Accepted files:", acceptedFiles);
  },
  onDropRejected: (rejected) => {
    console.warn("Rejected files:", rejected);
  },
});

return (
  <div
    {...dropZone.props}
    onClick={dropZone.openFileDialog}
    class={\`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors \${
      dropZone.isOver()
        ? "border-primary bg-primary/10"
        : "border-border hover:border-primary/50 bg-card"
    }\`}
  >
    <p class="text-sm font-medium">
      {dropZone.isOver() ? "Drop files here!" : "Drag & drop files or click to browse"}
    </p>
  </div>
);`;

const imageUploadCode = `const avatarDrop = createDropZone({
  accept: "image/*",
  maxFiles: 1,
  maxSize: 2 * 1024 * 1024, // 2MB
  onDrop: (files) => {
    const file = files[0];
    const previewUrl = URL.createObjectURL(file);
    console.log("Avatar uploaded:", previewUrl);
  },
});`;

export function DropZoneDemo() {
  const dropZone = createDropZone({
    accept: ["image/*", "application/pdf", ".txt", ".md"],
    maxSize: 5 * 1024 * 1024,
    maxFiles: 4,
  });

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div class="w-full max-w-lg space-y-4">
      {/* Drop Zone Box */}
      <div
        {...dropZone.props}
        class={`relative flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg text-center transition-all cursor-pointer ${
          dropZone.isOver()
            ? "border-primary bg-primary/10 scale-[1.01]"
            : "border-border hover:border-border/80 bg-card hover:bg-accent/20"
        }`}
        onClick={dropZone.openFileDialog}
      >
        <div class="p-3 mb-3 rounded-lg bg-primary/10 text-primary">
          <UploadCloud class="w-6 h-6 animate-pulse" />
        </div>
        <div class="space-y-1">
          <p class="text-sm font-medium">
            {dropZone.isOver() ? "Drop files now!" : "Drag & drop files here, or click to browse"}
          </p>
          <p class="text-xs text-muted-foreground">
            Supports PNG, JPG, PDF, TXT up to 5MB (Max 4 files)
          </p>
        </div>
      </div>

      {/* Accepted Files List */}
      <Show when={dropZone.files().length > 0}>
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Accepted Files ({dropZone.files().length})
            </span>
            <Button
              variant="ghost"
              size="sm"
              class="h-6 px-2 text-xs text-muted-foreground hover:text-destructive"
              onClick={dropZone.clear}
            >
              Clear all
            </Button>
          </div>
          <div class="space-y-1.5">
            <For each={dropZone.files()}>
              {(file) => (
                <div class="flex items-center justify-between p-2.5 rounded-md border border-border bg-card text-xs">
                  <div class="flex items-center gap-2 min-w-0">
                    <Show
                      when={file.type.startsWith("image/")}
                      fallback={<FileText class="w-4 h-4 text-muted-foreground shrink-0" />}
                    >
                      <ImageIcon class="w-4 h-4 text-primary shrink-0" />
                    </Show>
                    <span class="truncate font-medium">{file.name}</span>
                    <span class="text-muted-foreground font-mono">({formatFileSize(file.size)})</span>
                  </div>
                  <Badge variant="outline" class="text-[10px] text-emerald-500 border-emerald-500/30 shrink-0">
                    <CheckCircle2 class="w-3 h-3 mr-1" /> Ready
                  </Badge>
                </div>
              )}
            </For>
          </div>
        </div>
      </Show>

      {/* Rejected Files List */}
      <Show when={dropZone.rejectedFiles().length > 0}>
        <div class="space-y-2">
          <span class="text-xs font-semibold text-destructive uppercase tracking-wider">
            Rejected Files ({dropZone.rejectedFiles().length})
          </span>
          <div class="space-y-1.5">
            <For each={dropZone.rejectedFiles()}>
              {(rejected) => (
                <div class="flex items-center justify-between p-2.5 rounded-md border border-destructive/30 bg-destructive/10 text-xs">
                  <div class="flex items-center gap-2 min-w-0">
                    <AlertCircle class="w-4 h-4 text-destructive shrink-0" />
                    <span class="truncate font-medium">{rejected.file.name}</span>
                    <span class="text-destructive/80 font-mono">({formatFileSize(rejected.file.size)})</span>
                  </div>
                  <span class="text-[10px] text-destructive font-medium shrink-0">
                    {rejected.errors[0]?.message || "Invalid file"}
                  </span>
                </div>
              )}
            </For>
          </div>
        </div>
      </Show>
    </div>
  );
}

export default function CreateDropZoneDocPage() {
  return (
    <>
      <Seo
        title="createDropZone Primitive"
        description="SolidJS reactive primitive for handling drag & drop file zones with validation and native file dialogs."
        path="/docs/hooks/create-drop-zone"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="createDropZone"
          badge="primitive"
          description="A reactive primitive for handling file drag & drop operations with MIME type and size validation, drop rejection tracking, and native file dialog integration."
        />

        {/* Live Interactive Hero Preview */}
        <ComponentPreview isHook name="create-drop-zone" code={basicUsageCode}>
          <DropZoneDemo />
        </ComponentPreview>

        {/* Import */}
        <div class="space-y-4">
          <DocSectionHeader title="Import" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        {/* Examples Section */}
        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          {/* Basic Usage */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Basic Drag & Drop</h3>
            <p class="text-sm text-muted-foreground">
              Spread <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">dropZone.props</code> onto any container element and use <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">dropZone.isOver()</code> to provide visual drag hover feedback.
            </p>
            <CodeBlock code={basicUsageCode} lang="tsx" />
          </div>

          {/* Avatar Image Upload */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Single Image / Avatar Upload</h3>
            <p class="text-sm text-muted-foreground">
              Restrict drops to a single image file up to 2MB using <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">maxFiles: 1</code> and <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">accept: "image/*"</code>.
            </p>
            <CodeBlock code={imageUploadCode} lang="tsx" />
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="CreateDropZoneOptions"
            items={[
              {
                prop: "accept",
                type: "string | string[]",
                default: "undefined",
                description: "Accepted MIME types (e.g. 'image/*') or file extensions (e.g. '.pdf', '.png').",
              },
              {
                prop: "maxFiles",
                type: "number",
                default: "Infinity",
                description: "Maximum number of files allowed in a single drop.",
              },
              {
                prop: "maxSize",
                type: "number",
                default: "undefined",
                description: "Maximum file size in bytes.",
              },
              {
                prop: "minSize",
                type: "number",
                default: "undefined",
                description: "Minimum file size in bytes.",
              },
              {
                prop: "multiple",
                type: "boolean",
                default: "true",
                description: "Whether multiple files can be dropped simultaneously.",
              },
              {
                prop: "disabled",
                type: "boolean | Accessor<boolean>",
                default: "false",
                description: "Disables drag and drop event handling.",
              },
              {
                prop: "preventDropOnDocument",
                type: "boolean",
                default: "true",
                description: "Prevents default browser file drop behavior across the document window.",
              },
              {
                prop: "onDrop",
                type: "(files: File[], event: DragEvent) => void",
                default: "undefined",
                description: "Callback fired when valid files pass validation and are dropped.",
              },
              {
                prop: "onDropRejected",
                type: "(rejected: FileRejection[], event: DragEvent) => void",
                default: "undefined",
                description: "Callback fired when dropped files fail type or size validation.",
              },
            ]}
          />

          <DocApiTable
            title="CreateDropZoneReturn"
            items={[
              {
                prop: "isOver",
                type: "Accessor<boolean>",
                default: "-",
                description: "Reactive signal indicating whether files are currently dragged over the target dropzone.",
              },
              {
                prop: "isDragging",
                type: "Accessor<boolean>",
                default: "-",
                description: "Reactive signal indicating whether files are being dragged anywhere in the browser window.",
              },
              {
                prop: "files",
                type: "Accessor<File[]>",
                default: "-",
                description: "Signal containing the array of currently accepted dropped files.",
              },
              {
                prop: "rejectedFiles",
                type: "Accessor<FileRejection[]>",
                default: "-",
                description: "Signal containing the array of rejected files along with specific validation error codes.",
              },
              {
                prop: "openFileDialog",
                type: "() => void",
                default: "-",
                description: "Programmatically triggers the native browser file selector dialog with matching accept/multiple constraints.",
              },
              {
                prop: "clear",
                type: "() => void",
                default: "-",
                description: "Resets and clears both accepted and rejected files signals.",
              },
              {
                prop: "props",
                type: "DropZoneProps",
                default: "-",
                description: "Event handler properties (onDragEnter, onDragOver, onDragLeave, onDrop) to spread on target JSX elements.",
              },
            ]}
          />
        </div>

        {/* Footer Navigation */}
        <DocNextSteps
          prev={{ title: "createDocumentTitle Hook", href: "/docs/hooks/create-document-title" }}
          next={{ title: "createEventSource Hook", href: "/docs/hooks/create-event-source" }}
        />
      </div>
    </>
  );
}
