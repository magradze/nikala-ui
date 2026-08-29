// src/routes/docs/components/dropzone.tsx
import { createSignal, For, Show } from "solid-js";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import {
  Dropzone,
  DropzoneIcon,
  DropzoneTitle,
  DropzoneDescription,
  DropzoneFileList,
  DropzoneFileItem,
  DropzoneRejectedItem,
} from "@/components/ui/dropzone";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { createDropZone } from "@nikala-ui/hooks";
import { Image as ImageIcon, FileCode, Music, User } from "lucide-solid";

/* --- Code Snippets --- */
const importCode = `import {
  Dropzone,
  DropzoneIcon,
  DropzoneTitle,
  DropzoneDescription,
  DropzoneFileList,
  DropzoneFileItem,
  DropzoneRejectedItem,
} from "@/components/ui/dropzone";
import { createDropZone } from "@/hooks/create-drop-zone";`;

const defaultCode = `const dropZone = createDropZone({
  accept: ["image/*", "application/pdf", ".txt"],
  maxSize: 5 * 1024 * 1024, // 5MB
  maxFiles: 3,
});

const formatSize = (bytes: number) => {
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
};

return (
  <div class="w-full max-w-md space-y-3">
    <Dropzone
      {...dropZone.props}
      isOver={dropZone.isOver()}
      onClick={dropZone.openFileDialog}
      class="cursor-pointer"
    >
      <DropzoneIcon />
      <DropzoneTitle>
        {dropZone.isOver() ? "Drop files now!" : "Click to upload or drag and drop"}
      </DropzoneTitle>
      <DropzoneDescription>
        SVG, PNG, JPG, or PDF (max. 5MB)
      </DropzoneDescription>
    </Dropzone>

    <Show when={dropZone.files().length > 0}>
      <DropzoneFileList>
        <For each={dropZone.files()}>
          {(file) => (
            <DropzoneFileItem
              name={file.name}
              size={formatSize(file.size)}
              onRemove={() => {
                dropZone.setFiles(dropZone.files().filter((f) => f !== file));
              }}
            />
          )}
        </For>
      </DropzoneFileList>
    </Show>
  </div>
);`;

const avatarUploadCode = `import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Dropzone, DropzoneTitle, DropzoneDescription } from "@/components/ui/dropzone";
import { createDropZone } from "@/hooks/create-drop-zone";

const [avatarUrl, setAvatarUrl] = createSignal<string | null>(null);

const avatarDrop = createDropZone({
  accept: "image/*",
  maxFiles: 1,
  maxSize: 2 * 1024 * 1024, // 2MB
  onDrop: (files) => {
    if (files[0]) {
      setAvatarUrl(URL.createObjectURL(files[0]));
    }
  },
});

return (
  <Dropzone
    {...avatarDrop.props}
    isOver={avatarDrop.isOver()}
    onClick={avatarDrop.openFileDialog}
    class="max-w-xs cursor-pointer p-6"
  >
    <Show
      when={avatarUrl()}
      fallback={
        <div class="flex flex-col items-center gap-2">
          <Avatar class="size-16 border-2 border-dashed border-border mb-1">
            <AvatarFallback>
              <User class="size-7 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          <DropzoneTitle>Upload Avatar</DropzoneTitle>
          <DropzoneDescription>PNG, JPG up to 2MB</DropzoneDescription>
        </div>
      }
    >
      {(url) => (
        <div class="flex flex-col items-center gap-2">
          <Avatar class="size-20 border-2 border-primary shadow-sm">
            <AvatarImage src={url()} alt="Avatar" />
            <AvatarFallback>AV</AvatarFallback>
          </Avatar>
          <p class="text-xs font-medium text-primary">Click or drop to replace</p>
        </div>
      )}
    </Show>
  </Dropzone>
);`;

export function DropzoneDemo() {
  const dropZone = createDropZone({
    accept: ["image/*", "application/pdf", ".txt", ".md", ".json"],
    maxSize: 5 * 1024 * 1024,
    maxFiles: 4,
  });

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const removeFile = (fileToRemove: File) => {
    dropZone.setFiles(dropZone.files().filter((f) => f !== fileToRemove));
  };

  return (
    <div class="w-full max-w-md space-y-3">
      <Dropzone
        {...dropZone.props}
        isOver={dropZone.isOver()}
        onClick={dropZone.openFileDialog}
        class="cursor-pointer"
      >
        <DropzoneIcon />
        <DropzoneTitle>
          {dropZone.isOver() ? "Drop files now!" : "Click to upload or drag and drop"}
        </DropzoneTitle>
        <DropzoneDescription>
          SVG, PNG, JPG, PDF or JSON (max. 5MB)
        </DropzoneDescription>
      </Dropzone>

      {/* Uploaded Files */}
      <Show when={dropZone.files().length > 0}>
        <DropzoneFileList>
          <div class="flex items-center justify-between pb-1">
            <span class="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Uploaded Files ({dropZone.files().length})
            </span>
            <Button
              variant="ghost"
              size="sm"
              class="h-6 px-2 text-xs text-muted-foreground hover:text-destructive"
              onClick={dropZone.clear}
            >
              Clear
            </Button>
          </div>
          <For each={dropZone.files()}>
            {(file) => (
              <DropzoneFileItem
                name={file.name}
                size={formatFileSize(file.size)}
                onRemove={() => removeFile(file)}
              >
                <Show when={file.type.startsWith("image/")}>
                  <ImageIcon class="size-4 text-primary" />
                </Show>
              </DropzoneFileItem>
            )}
          </For>
        </DropzoneFileList>
      </Show>

      {/* Rejected Files */}
      <Show when={dropZone.rejectedFiles().length > 0}>
        <div class="space-y-1.5 pt-2">
          <For each={dropZone.rejectedFiles()}>
            {(rejected) => (
              <DropzoneRejectedItem
                name={rejected.file.name}
                size={formatFileSize(rejected.file.size)}
                error={rejected.errors[0]?.message}
              />
            )}
          </For>
        </div>
      </Show>
    </div>
  );
}

export function AvatarDropDemo() {
  const [avatarUrl, setAvatarUrl] = createSignal<string | null>(null);

  const avatarDrop = createDropZone({
    accept: "image/*",
    maxFiles: 1,
    maxSize: 2 * 1024 * 1024, // 2MB
    onDrop: (files) => {
      if (files[0]) {
        setAvatarUrl(URL.createObjectURL(files[0]));
      }
    },
  });

  return (
    <div class="flex flex-col items-center gap-3">
      <Dropzone
        {...avatarDrop.props}
        isOver={avatarDrop.isOver()}
        onClick={avatarDrop.openFileDialog}
        class="max-w-xs cursor-pointer p-6 relative overflow-hidden"
      >
        <Show
          when={avatarUrl()}
          fallback={
            <div class="flex flex-col items-center gap-2">
              <Avatar class="size-16 border-2 border-dashed border-border mb-1">
                <AvatarFallback>
                  <User class="size-7 text-muted-foreground" />
                </AvatarFallback>
              </Avatar>
              <DropzoneTitle>Upload Avatar</DropzoneTitle>
              <DropzoneDescription>PNG, JPG up to 2MB</DropzoneDescription>
            </div>
          }
        >
          {(url) => (
            <div class="flex flex-col items-center gap-2">
              <Avatar class="size-20 border-2 border-primary shadow-sm">
                <AvatarImage src={url()} alt="Avatar Preview" />
                <AvatarFallback>AV</AvatarFallback>
              </Avatar>
              <p class="text-xs font-medium text-primary">Click or drop to replace</p>
            </div>
          )}
        </Show>
      </Dropzone>

      <Show when={avatarUrl()}>
        <Button
          variant="outline"
          size="sm"
          class="h-7 text-xs text-muted-foreground hover:text-destructive"
          onClick={(e) => {
            e.stopPropagation();
            setAvatarUrl(null);
            avatarDrop.clear();
          }}
        >
          Remove Avatar
        </Button>
      </Show>

      <Show when={avatarDrop.rejectedFiles().length > 0}>
        <span class="text-xs text-destructive font-medium">
          {avatarDrop.rejectedFiles()[0]?.errors[0]?.message}
        </span>
      </Show>
    </div>
  );
}

export default function DropzoneDocsPage() {
  return (
    <>
      <Seo
        title="Dropzone Component"
        description="A lightweight, accessible drag-and-drop file upload zone built with SolidJS and Tailwind CSS v4."
        path="/docs/components/dropzone"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="Dropzone"
          badge="compound"
          description="A compound drag-and-drop file upload container with hover highlight states, file type validation, preview lists, and file deletion controls."
        />

        {/* Hero Live Preview */}
        <ComponentPreview name="dropzone" code={defaultCode}>
          <DropzoneDemo />
        </ComponentPreview>

        {/* Usage & Import */}
        <div class="space-y-4">
          <DocSectionHeader title="Usage" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        {/* Examples */}
        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          {/* Avatar Upload */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Profile & Avatar Upload</h3>
            <p class="text-sm text-muted-foreground">
              A compact dropzone tailored for single image profile uploads with <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">maxFiles: 1</code>.
            </p>
            <ComponentPreview name="dropzone" code={avatarUploadCode}>
              <AvatarDropDemo />
            </ComponentPreview>
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="Dropzone Components"
            items={[
              {
                prop: "Dropzone",
                type: "Component<DropzoneProps>",
                default: "-",
                description: "Root container with dashed border, hover effects, and isOver state styling.",
              },
              {
                prop: "DropzoneIcon",
                type: "Component<DropzoneIconProps>",
                default: "-",
                description: "Centered circular badge container for upload icons.",
              },
              {
                prop: "DropzoneTitle",
                type: "Component<DropzoneTitleProps>",
                default: "-",
                description: "Main prompt title heading for the drop area.",
              },
              {
                prop: "DropzoneDescription",
                type: "Component<DropzoneDescriptionProps>",
                default: "-",
                description: "Supporting text displaying allowed file types or size limits.",
              },
              {
                prop: "DropzoneFileList",
                type: "Component<DropzoneFileListProps>",
                default: "-",
                description: "Vertical list container for accepted file items.",
              },
              {
                prop: "DropzoneFileItem",
                type: "Component<DropzoneFileItemProps>",
                default: "-",
                description: "File preview item with file icon, name, formatted size, and remove button.",
              },
              {
                prop: "DropzoneRejectedItem",
                type: "Component<DropzoneRejectedItemProps>",
                default: "-",
                description: "Alert item for files that failed validation with error message.",
              },
            ]}
          />
        </div>

        {/* Footer Navigation */}
        <DocNextSteps
          prev={{ title: "Dialog Component", href: "/docs/components/dialog" }}
          next={{ title: "Empty Component", href: "/docs/components/empty" }}
        />
      </div>
    </>
  );
}
