import {
  createSignal,
  splitProps,
  Show,
  type JSX,
  type ParentComponent,
} from "solid-js";
import {
  Folder,
  FolderOpen,
  File,
  FileCode,
  FileJson,
  FileText,
  ChevronRight,
} from "lucide-solid";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/cn";

export interface FileTreeProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

/**
 * Root FileTree container for displaying project directory hierarchies.
 */
export const FileTree: ParentComponent<FileTreeProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <div
      class={cn(
        "my-4 w-full rounded-lg border border-border bg-card/60 p-3 font-mono text-sm shadow-2xs select-none",
        local.class
      )}
      {...rest}
    >
      <div class="space-y-0.5">{local.children}</div>
    </div>
  );
};

export interface FileTreeFolderProps {
  /** Folder name */
  name: string;
  /** Initial open state of the folder (default: true) */
  defaultOpen?: boolean;
  /** Controlled open state */
  open?: boolean;
  /** Callback fired when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Custom folder icon override */
  icon?: JSX.Element;
  class?: string;
  children?: JSX.Element;
}

/**
 * Collapsible folder node in the FileTree.
 */
export const FileTreeFolder: ParentComponent<FileTreeFolderProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "name",
    "defaultOpen",
    "open",
    "onOpenChange",
    "icon",
    "class",
    "children",
  ]);

  const [isOpen, setIsOpen] = createSignal(local.defaultOpen ?? true);

  const openState = () => (local.open !== undefined ? local.open : isOpen());

  const handleToggle = (next: boolean) => {
    if (local.open === undefined) {
      setIsOpen(next);
    }
    local.onOpenChange?.(next);
  };

  return (
    <Collapsible
      open={openState()}
      onOpenChange={handleToggle}
      class={cn("w-full", local.class)}
      {...rest}
    >
      <CollapsibleTrigger class="group flex w-full items-center justify-start gap-1.5 rounded-md px-1.5 py-1 text-xs text-foreground transition-colors hover:bg-muted/70 cursor-pointer">
        <ChevronRight
          class={cn(
            "size-3.5 shrink-0 text-muted-foreground transition-transform duration-200",
            openState() && "rotate-90 text-foreground"
          )}
        />
        <Show
          when={local.icon}
          fallback={
            <Show
              when={openState()}
              fallback={<Folder class="size-3.5 shrink-0 text-amber-500/90 dark:text-amber-400" />}
            >
              <FolderOpen class="size-3.5 shrink-0 text-amber-500 dark:text-amber-400" />
            </Show>
          }
        >
          {local.icon}
        </Show>
        <span class="font-medium text-foreground tracking-tight">{local.name}</span>
      </CollapsibleTrigger>

      <CollapsibleContent class="border-l border-border/60 ml-3.5 pl-3 pt-0.5 space-y-0.5">
        {local.children}
      </CollapsibleContent>
    </Collapsible>
  );
};

export interface FileTreeFileProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /** File name */
  name: string;
  /** Custom file icon override */
  icon?: JSX.Element;
  class?: string;
}

/**
 * Returns a smart default Lucide icon based on file extension.
 */
function getFileIcon(filename: string): JSX.Element {
  const ext = filename.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "tsx":
    case "jsx":
    case "ts":
    case "js":
    case "mjs":
    case "rs":
    case "py":
    case "go":
      return <FileCode class="size-3.5 shrink-0 text-sky-500 dark:text-sky-400" />;
    case "json":
      return <FileJson class="size-3.5 shrink-0 text-amber-500 dark:text-amber-400" />;
    case "md":
    case "mdx":
    case "txt":
      return <FileText class="size-3.5 shrink-0 text-emerald-500 dark:text-emerald-400" />;
    default:
      return <File class="size-3.5 shrink-0 text-muted-foreground" />;
  }
}

/**
 * Leaf file item inside a FileTree.
 */
export const FileTreeFile: ParentComponent<FileTreeFileProps> = (props) => {
  const [local, rest] = splitProps(props, ["name", "icon", "class", "children"]);

  return (
    <div
      class={cn(
        "flex w-full items-center justify-start gap-1.5 rounded-md px-1.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground cursor-default",
        local.class
      )}
      {...rest}
    >
      <span class="size-3.5 shrink-0" />
      <Show when={local.icon} fallback={getFileIcon(local.name)}>
        {local.icon}
      </Show>
      <span class="tracking-tight">{local.name}</span>
      <Show when={local.children}>
        <div class="ml-auto">{local.children}</div>
      </Show>
    </div>
  );
};
