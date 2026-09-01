import {
  createContext,
  createSignal,
  createEffect,
  useContext,
  splitProps,
  Show,
  onMount,
  onCleanup,
  type Component,
  type ComponentProps,
  type Accessor,
} from "solid-js";
import { useEditor, type UseEditorReturn, type UseEditorOptions } from "./use-editor.js";
import { EditorToolbar } from "./toolbar.js";
import { EditorFooter } from "./footer.js";
import { EditorLinkDialog } from "./link-dialog.js";
import { EditorImageDialog } from "./image-dialog.js";
import { EditorBubbleMenu } from "./bubble-menu.js";
import { EditorSlashCommand } from "./slash-command.js";
import { cn } from "@/lib/cn";

export type EditorViewMode = "visual" | "markdown";

export interface RichTextEditorContextValue {
  actions: UseEditorReturn;
  container: Accessor<HTMLDivElement | undefined>;
  isFullscreen: Accessor<boolean>;
  toggleFullscreen: () => void;
  viewMode: Accessor<EditorViewMode>;
  toggleViewMode: () => void;
  showLinkDialog: Accessor<boolean>;
  setShowLinkDialog: (show: boolean) => void;
  showImageDialog: Accessor<boolean>;
  setShowImageDialog: (show: boolean) => void;
  showTableMenu: Accessor<boolean>;
  setShowTableMenu: (show: boolean | ((prev: boolean) => boolean)) => void;
}

const RichTextEditorContext = createContext<RichTextEditorContextValue>();

export function useRichTextEditor(): RichTextEditorContextValue {
  const context = useContext(RichTextEditorContext);
  if (!context) {
    throw new Error("useRichTextEditor must be used within a <RichTextEditor /> component");
  }
  return context;
}

export interface RichTextEditorProps
  extends Omit<ComponentProps<"div">, "autofocus" | "onChange"> {
  value?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  editable?: boolean;
  autofocus?: boolean | "start" | "end" | "all" | number;
  characterLimit?: number;
  hideToolbar?: boolean;
  hideFooter?: boolean;
  hideBubbleMenu?: boolean;
  editorOptions?: Omit<UseEditorOptions, "content" | "placeholder" | "editable">;
}

export const RichTextEditor: Component<RichTextEditorProps> = (props) => {
  const [local, others] = splitProps(props, [
    "class",
    "value",
    "onChange",
    "placeholder",
    "editable",
    "autofocus",
    "characterLimit",
    "hideToolbar",
    "hideFooter",
    "hideBubbleMenu",
    "editorOptions",
    "children",
  ]);

  let containerRef: HTMLDivElement | undefined;
  let editorElementRef: HTMLDivElement | undefined;
  const [container, setContainer] = createSignal<HTMLDivElement | undefined>();
  const [isFullscreen, setIsFullscreen] = createSignal(false);
  const [viewMode, setViewMode] = createSignal<EditorViewMode>("visual");
  const [markdownSource, setMarkdownSource] = createSignal("");
  const [showLinkDialog, setShowLinkDialog] = createSignal(false);
  const [showImageDialog, setShowImageDialog] = createSignal(false);
  const [showTableMenu, setShowTableMenu] = createSignal(false);

  const actions = useEditor({
    content: local.value,
    placeholder: local.placeholder || "Write something rich or type '/' for commands...",
    editable: local.editable ?? true,
    autofocus: local.autofocus ?? false,
    characterLimit: local.characterLimit,
    onUpdate: ({ editor: ed }) => {
      local.onChange?.(ed.getHTML());
    },
    ...local.editorOptions,
  });

  onMount(() => {
    if (editorElementRef) {
      actions.mount(editorElementRef);
    }
  });

  createEffect(() => {
    const ed = actions.editor();
    if (ed && local.value !== undefined && ed.getHTML() !== local.value) {
      ed.commands.setContent(local.value, { emitUpdate: false });
    }
  });

  createEffect(() => {
    const ed = actions.editor();
    if (ed && local.editable !== undefined) {
      actions.setEditable(local.editable);
    }
  });

  const toggleFullscreen = () => {
    if (typeof document === "undefined") return;
    if (!document.fullscreenElement) {
      if (containerRef?.requestFullscreen) {
        containerRef.requestFullscreen().catch(() => {
          setIsFullscreen(true);
        });
      } else {
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {
          setIsFullscreen(false);
        });
      } else {
        setIsFullscreen(false);
      }
    }
  };

  createEffect(() => {
    if (typeof document === "undefined") return;
    const handleFullscreenChange = () => {
      const isNativeFs = document.fullscreenElement === containerRef;
      setIsFullscreen(isNativeFs);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    onCleanup(() => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
    });
  });

  const toggleViewMode = () => {
    const ed = actions.editor();
    if (!ed) return;

    if (viewMode() === "visual") {
      // Switch to Markdown mode
      const currentMd = (ed.storage as any).markdown?.getMarkdown?.() || "";
      setMarkdownSource(currentMd);
      setViewMode("markdown");
    } else {
      // Switch back to Visual mode
      ed.commands.setContent(markdownSource(), { emitUpdate: true });
      local.onChange?.(ed.getHTML());
      setViewMode("visual");
    }
  };

  const handleMarkdownInput = (val: string) => {
    setMarkdownSource(val);
    const ed = actions.editor();
    if (ed) {
      ed.commands.setContent(val, { emitUpdate: false });
      local.onChange?.(ed.getHTML());
    }
  };

  createEffect(() => {
    if (typeof window === "undefined") return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen()) {
        if (typeof document !== "undefined" && document.fullscreenElement) {
          document.exitFullscreen?.().catch(() => {});
        } else {
          setIsFullscreen(false);
        }
      }
    };
    window.addEventListener("keydown", handleEsc);
    onCleanup(() => window.removeEventListener("keydown", handleEsc));
  });

  createEffect(() => {
    if (typeof document === "undefined") return;
    if (isFullscreen()) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      onCleanup(() => {
        document.body.style.overflow = original;
      });
    }
  });

  const contextValue: RichTextEditorContextValue = {
    actions,
    container,
    isFullscreen,
    toggleFullscreen,
    viewMode,
    toggleViewMode,
    showLinkDialog,
    setShowLinkDialog,
    showImageDialog,
    setShowImageDialog,
    showTableMenu,
    setShowTableMenu: (val) => {
      if (typeof val === "function") {
        setShowTableMenu(val);
      } else {
        setShowTableMenu(val);
      }
    },
  };

  return (
    <RichTextEditorContext.Provider value={contextValue}>
      <div
        ref={(el) => {
          containerRef = el;
          setContainer(el);
        }}
        class={cn(
          "relative flex flex-col w-full rounded-lg border border-border bg-card text-card-foreground shadow-xs transition-all",
          isFullscreen() &&
            "fixed inset-0 z-[99999] rounded-none border-0 h-screen w-screen bg-background flex flex-col overflow-hidden m-0 p-0",
          local.class
        )}
        {...others}
      >
        <Show when={!local.hideToolbar}>
          <EditorToolbar />
        </Show>

        {/* Visual WYSIWYG View */}
        <div
          class={cn(
            "relative flex-1 w-full overflow-y-auto min-h-[220px]",
            viewMode() === "markdown" && "hidden"
          )}
        >
          <div
            class={cn(
              "w-full px-4 py-4 min-h-full",
              isFullscreen() && "max-w-4xl mx-auto px-8 py-8"
            )}
          >
            <div ref={editorElementRef} class="tiptap-wrapper w-full h-full" />
            <Show when={local.children}>{local.children}</Show>
          </div>
        </div>

        {/* Raw Markdown Source View */}
        <Show when={viewMode() === "markdown"}>
          <div class="relative flex-1 w-full overflow-y-auto min-h-[220px] bg-muted/20">
            <div
              class={cn(
                "w-full p-4 min-h-full",
                isFullscreen() && "max-w-4xl mx-auto px-8 py-8"
              )}
            >
              <textarea
                class="w-full h-full min-h-[220px] bg-transparent text-foreground focus:outline-hidden resize-none leading-relaxed font-mono text-xs"
                placeholder="Write or paste raw markdown here..."
                value={markdownSource()}
                onInput={(e) => handleMarkdownInput(e.currentTarget.value)}
              />
            </div>
          </div>
        </Show>

        <Show when={!local.hideFooter}>
          <EditorFooter />
        </Show>

        <Show when={!local.hideBubbleMenu && viewMode() === "visual"}>
          <EditorBubbleMenu />
        </Show>

        <Show when={viewMode() === "visual"}>
          <EditorSlashCommand />
        </Show>

        <Show when={showLinkDialog()}>
          <EditorLinkDialog />
        </Show>

        <Show when={showImageDialog()}>
          <EditorImageDialog />
        </Show>
      </div>
    </RichTextEditorContext.Provider>
  );
};
