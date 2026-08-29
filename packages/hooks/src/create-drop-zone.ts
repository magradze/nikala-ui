import { createSignal, onCleanup, onMount, type Accessor } from "solid-js";

export interface FileRejection {
  file: File;
  errors: Array<{
    code: "file-invalid-type" | "file-too-large" | "file-too-small" | "too-many-files";
    message: string;
  }>;
}

export interface CreateDropZoneOptions {
  /** Accepted file types: MIME types (e.g. "image/*", "application/pdf") or extensions (e.g. ".png", ".jpg") */
  accept?: string | string[];
  /** Maximum number of files allowed */
  maxFiles?: number;
  /** Maximum file size in bytes */
  maxSize?: number;
  /** Minimum file size in bytes */
  minSize?: number;
  /** Whether multiple files are allowed. Defaults to true */
  multiple?: boolean;
  /** Whether the drop zone is disabled */
  disabled?: boolean | Accessor<boolean>;
  /** Prevents browser default behavior of opening files dropped outside dropzone. Defaults to true */
  preventDropOnDocument?: boolean;
  /** Callback fired when valid files are dropped */
  onDrop?: (files: File[], event: DragEvent) => void;
  /** Callback fired when some or all files fail validation */
  onDropRejected?: (rejectedFiles: FileRejection[], event: DragEvent) => void;
  /** Callback fired when drag enters the dropzone */
  onDragEnter?: (event: DragEvent) => void;
  /** Callback fired when drag leaves the dropzone */
  onDragLeave?: (event: DragEvent) => void;
  /** Callback fired when dragging over the dropzone */
  onDragOver?: (event: DragEvent) => void;
  /** Callback fired whenever accepted files list changes */
  onFilesChanged?: (files: File[]) => void;
}

export interface CreateDropZoneReturn {
  /** Whether drag operation is currently active over the target drop zone */
  isOver: Accessor<boolean>;
  /** Whether files are currently being dragged anywhere on the window */
  isDragging: Accessor<boolean>;
  /** Currently accepted dropped files */
  files: Accessor<File[]>;
  /** Currently rejected files with error details */
  rejectedFiles: Accessor<FileRejection[]>;
  /** Clear all accepted and rejected files */
  clear: () => void;
  /** Programmatically set files (e.g. from an <input type="file" /> change event) */
  setFiles: (files: File[]) => void;
  /** Programmatically open the native browser file selector dialog */
  openFileDialog: () => void;
  /** Ref callback to attach to target DOM element */
  ref: (el: HTMLElement) => void;
  /** Event handler props to spread directly onto target JSX element */
  props: {
    onDragEnter: (e: DragEvent) => void;
    onDragLeave: (e: DragEvent) => void;
    onDragOver: (e: DragEvent) => void;
    onDrop: (e: DragEvent) => void;
  };
}

function matchesAccept(file: File, acceptList: string[]): boolean {
  if (acceptList.length === 0) return true;
  const fileName = file.name.toLowerCase();
  const fileType = file.type.toLowerCase();

  return acceptList.some((pattern) => {
    const p = pattern.trim().toLowerCase();
    if (p.startsWith(".")) {
      return fileName.endsWith(p);
    }
    if (p.endsWith("/*")) {
      const typePrefix = p.slice(0, -2);
      return fileType.startsWith(typePrefix + "/");
    }
    return fileType === p;
  });
}

function validateFiles(
  incomingFiles: File[],
  options: CreateDropZoneOptions
): { accepted: File[]; rejected: FileRejection[] } {
  const acceptList = options.accept
    ? (Array.isArray(options.accept) ? options.accept : options.accept.split(","))
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const maxFiles = options.maxFiles ?? (options.multiple === false ? 1 : Infinity);
  const maxSize = options.maxSize;
  const minSize = options.minSize;

  const accepted: File[] = [];
  const rejected: FileRejection[] = [];

  incomingFiles.forEach((file, index) => {
    const errors: FileRejection["errors"] = [];

    if (index >= maxFiles) {
      errors.push({
        code: "too-many-files",
        message: `Maximum allowed files is ${maxFiles}.`,
      });
    }

    if (acceptList.length > 0 && !matchesAccept(file, acceptList)) {
      errors.push({
        code: "file-invalid-type",
        message: `File type "${file.type || file.name.split(".").pop()}" is not allowed.`,
      });
    }

    if (maxSize !== undefined && file.size > maxSize) {
      errors.push({
        code: "file-too-large",
        message: `File size exceeds ${(maxSize / (1024 * 1024)).toFixed(1)}MB limit.`,
      });
    }

    if (minSize !== undefined && file.size < minSize) {
      errors.push({
        code: "file-too-small",
        message: `File size is below ${(minSize / 1024).toFixed(1)}KB limit.`,
      });
    }

    if (errors.length > 0) {
      rejected.push({ file, errors });
    } else {
      accepted.push(file);
    }
  });

  return { accepted, rejected };
}

/**
 * SolidJS reactive primitive for managing file drag & drop zones with validation and file dialog support.
 *
 * @param options Configuration options for file acceptance, size limits, and callbacks.
 */
export function createDropZone(options: CreateDropZoneOptions = {}): CreateDropZoneReturn {
  const [isOver, setIsOver] = createSignal(false);
  const [isDragging, setIsDragging] = createSignal(false);
  const [files, setFilesInternal] = createSignal<File[]>([]);
  const [rejectedFiles, setRejectedFilesInternal] = createSignal<FileRejection[]>([]);

  let dragCounter = 0;
  let windowDragCounter = 0;
  let targetElement: HTMLElement | null = null;

  const isDisabled = () => {
    if (typeof options.disabled === "function") {
      return (options.disabled as Accessor<boolean>)();
    }
    return options.disabled ?? false;
  };

  const processFiles = (incomingFiles: File[], event: DragEvent) => {
    const { accepted, rejected } = validateFiles(incomingFiles, options);

    setFilesInternal(accepted);
    setRejectedFilesInternal(rejected);

    if (accepted.length > 0) {
      options.onDrop?.(accepted, event);
      options.onFilesChanged?.(accepted);
    }

    if (rejected.length > 0) {
      options.onDropRejected?.(rejected, event);
    }
  };

  const onDragEnter = (e: DragEvent) => {
    if (isDisabled()) return;
    e.preventDefault();
    dragCounter++;
    if (dragCounter === 1) {
      setIsOver(true);
      options.onDragEnter?.(e);
    }
  };

  const onDragOver = (e: DragEvent) => {
    if (isDisabled()) return;
    e.preventDefault();
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = "copy";
    }
    options.onDragOver?.(e);
  };

  const onDragLeave = (e: DragEvent) => {
    if (isDisabled()) return;
    e.preventDefault();
    dragCounter--;
    if (dragCounter <= 0) {
      dragCounter = 0;
      setIsOver(false);
      options.onDragLeave?.(e);
    }
  };

  const onDrop = (e: DragEvent) => {
    if (isDisabled()) return;
    e.preventDefault();
    dragCounter = 0;
    setIsOver(false);

    if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
      processFiles(Array.from(e.dataTransfer.files), e);
    }
  };

  const clear = () => {
    setFilesInternal([]);
    setRejectedFilesInternal([]);
    options.onFilesChanged?.([]);
  };

  const setFiles = (newFiles: File[]) => {
    const dummyEvent = new Event("drop") as unknown as DragEvent;
    processFiles(newFiles, dummyEvent);
  };

  const openFileDialog = () => {
    if (typeof document === "undefined" || isDisabled()) return;
    const input = document.createElement("input");
    input.type = "file";
    if (options.multiple !== false && (options.maxFiles === undefined || options.maxFiles > 1)) {
      input.multiple = true;
    }
    if (options.accept) {
      input.accept = Array.isArray(options.accept) ? options.accept.join(",") : options.accept;
    }
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        processFiles(Array.from(target.files), e as unknown as DragEvent);
      }
    };
    input.click();
  };

  const ref = (el: HTMLElement) => {
    targetElement = el;
  };

  // Window-level drag detection and document drop prevention
  onMount(() => {
    if (typeof window === "undefined") return;

    const handleWindowDragEnter = (e: DragEvent) => {
      windowDragCounter++;
      if (windowDragCounter === 1) {
        setIsDragging(true);
      }
    };

    const handleWindowDragLeave = (e: DragEvent) => {
      windowDragCounter--;
      if (windowDragCounter <= 0) {
        windowDragCounter = 0;
        setIsDragging(false);
      }
    };

    const handleWindowDrop = (e: DragEvent) => {
      windowDragCounter = 0;
      setIsDragging(false);
      if (options.preventDropOnDocument !== false) {
        e.preventDefault();
      }
    };

    const handleWindowDragOver = (e: DragEvent) => {
      if (options.preventDropOnDocument !== false) {
        e.preventDefault();
      }
    };

    window.addEventListener("dragenter", handleWindowDragEnter);
    window.addEventListener("dragleave", handleWindowDragLeave);
    window.addEventListener("dragover", handleWindowDragOver);
    window.addEventListener("drop", handleWindowDrop);

    onCleanup(() => {
      window.removeEventListener("dragenter", handleWindowDragEnter);
      window.removeEventListener("dragleave", handleWindowDragLeave);
      window.removeEventListener("dragover", handleWindowDragOver);
      window.removeEventListener("drop", handleWindowDrop);
    });
  });

  return {
    isOver,
    isDragging,
    files,
    rejectedFiles,
    clear,
    setFiles,
    openFileDialog,
    ref,
    props: {
      onDragEnter,
      onDragLeave,
      onDragOver,
      onDrop,
    },
  };
}
