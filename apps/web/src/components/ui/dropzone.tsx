import { splitProps, type Component, type JSX } from "solid-js";
import { cn } from "@/lib/cn";
import { CloudUpload, FileText, X, AlertCircle } from "lucide-solid";

export interface DropzoneProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
  isOver?: boolean;
  disabled?: boolean;
}

/**
 * Root container for the Dropzone file upload component.
 */
export const Dropzone: Component<DropzoneProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "isOver", "disabled"]);

  return (
    <div
      class={cn(
        "group relative flex w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-card/50 p-8 text-center transition-all",
        "hover:border-primary/50 hover:bg-card/80",
        local.isOver && "border-primary bg-primary/5 ring-2 ring-primary/20",
        local.disabled && "pointer-events-none opacity-50",
        local.class
      )}
      {...rest}
    />
  );
};

export interface DropzoneIconProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

/**
 * Centered icon placeholder for Dropzone.
 */
export const DropzoneIcon: Component<DropzoneIconProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <div
      class={cn(
        "mb-3 flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform group-hover:scale-105",
        local.class
      )}
      {...rest}
    >
      {local.children || <CloudUpload class="size-6" />}
    </div>
  );
};

export interface DropzoneTitleProps extends JSX.HTMLAttributes<HTMLHeadingElement> {
  class?: string;
}

/**
 * Primary title text for the dropzone prompt.
 */
export const DropzoneTitle: Component<DropzoneTitleProps> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <h4
      class={cn("text-sm font-semibold tracking-tight text-foreground", local.class)}
      {...rest}
    />
  );
};

export interface DropzoneDescriptionProps extends JSX.HTMLAttributes<HTMLParagraphElement> {
  class?: string;
}

/**
 * Subtitle description text for dropzone file specifications.
 */
export const DropzoneDescription: Component<DropzoneDescriptionProps> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <p
      class={cn("mt-1 text-xs text-muted-foreground", local.class)}
      {...rest}
    />
  );
};

export interface DropzoneFileListProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

/**
 * Container list for uploaded files.
 */
export const DropzoneFileList: Component<DropzoneFileListProps> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      class={cn("mt-4 flex w-full flex-col gap-2", local.class)}
      {...rest}
    />
  );
};

export interface DropzoneFileItemProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
  name: string;
  size?: string;
  onRemove?: () => void;
}

/**
 * Individual uploaded file card with name, formatted size, and remove button.
 */
export const DropzoneFileItem: Component<DropzoneFileItemProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "name", "size", "onRemove", "children"]);

  return (
    <div
      class={cn(
        "flex items-center justify-between gap-3 rounded-md border border-border bg-card p-2.5 text-xs transition-colors",
        local.class
      )}
      {...rest}
    >
      <div class="flex min-w-0 items-center gap-2.5">
        <div class="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
          {local.children || <FileText class="size-4" />}
        </div>
        <div class="flex min-w-0 flex-col text-left">
          <span class="truncate font-medium text-foreground">{local.name}</span>
          {local.size && (
            <span class="font-mono text-[11px] text-muted-foreground">{local.size}</span>
          )}
        </div>
      </div>

      {local.onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            local.onRemove?.();
          }}
          class="flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
          aria-label="Remove file"
        >
          <X class="size-3.5" />
        </button>
      )}
    </div>
  );
};

export interface DropzoneRejectedItemProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
  name: string;
  error?: string;
  size?: string;
}

/**
 * Card for displaying rejected files and validation errors.
 */
export const DropzoneRejectedItem: Component<DropzoneRejectedItemProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "name", "error", "size"]);

  return (
    <div
      class={cn(
        "flex items-center justify-between gap-3 rounded-md border border-destructive/30 bg-destructive/10 p-2.5 text-xs text-destructive",
        local.class
      )}
      {...rest}
    >
      <div class="flex min-w-0 items-center gap-2">
        <AlertCircle class="size-4 shrink-0" />
        <span class="truncate font-medium">{local.name}</span>
        {local.size && <span class="font-mono text-[11px] opacity-80">({local.size})</span>}
      </div>
      {local.error && (
        <span class="shrink-0 text-[11px] font-medium">{local.error}</span>
      )}
    </div>
  );
};
