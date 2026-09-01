import {
  createSignal,
  splitProps,
  Show,
  For,
  onCleanup,
  createEffect,
  type Component,
  type ComponentProps,
} from "solid-js";
import { useRichTextEditor } from "./editor.js";
import { EditorTableControls } from "./table-controls.js";
import { cn } from "@/lib/cn";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Type,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  ListTodo,
  Quote,
  Table as TableIcon,
  Link as LinkIcon,
  Unlink,
  Image as ImageIcon,
  Undo,
  Redo,
  Maximize2,
  Minimize2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Highlighter,
  Sparkles,
  RemoveFormatting,
  FileCode2,
  Eye,
  ChevronDown,
} from "lucide-solid";

export const HIGHLIGHT_PALETTE = [
  { name: "Yellow", value: "#eab308" },
  { name: "Amber", value: "#f59e0b" },
  { name: "Orange", value: "#f97316" },
  { name: "Red", value: "#ef4444" },
  { name: "Rose", value: "#f43f5e" },
  { name: "Pink", value: "#ec4899" },
  { name: "Purple", value: "#a855f7" },
  { name: "Violet", value: "#8b5cf6" },
  { name: "Indigo", value: "#6366f1" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Cyan", value: "#06b6d4" },
  { name: "Teal", value: "#14b8a6" },
  { name: "Emerald", value: "#10b981" },
  { name: "Green", value: "#22c55e" },
  { name: "Lime", value: "#84cc16" },
];

export interface ToolbarButtonProps extends ComponentProps<"button"> {
  isActive?: boolean;
  tooltip?: string;
}

export const ToolbarButton: Component<ToolbarButtonProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "isActive", "tooltip", "children"]);

  return (
    <button
      type="button"
      title={local.tooltip}
      class={cn(
        "inline-flex items-center justify-center h-8 w-8 rounded-md text-xs font-medium transition-colors cursor-pointer shrink-0 select-none",
        "text-muted-foreground hover:bg-muted hover:text-foreground",
        "focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring",
        local.isActive &&
          "bg-primary text-primary-foreground font-semibold shadow-xs hover:bg-primary/90 hover:text-primary-foreground",
        local.class
      )}
      {...others}
    >
      {local.children}
    </button>
  );
};

export const EditorToolbar: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  const {
    actions,
    isFullscreen,
    toggleFullscreen,
    viewMode,
    toggleViewMode,
    setShowLinkDialog,
    setShowImageDialog,
    setShowTableMenu,
  } = useRichTextEditor();

  const [showTypography, setShowTypography] = createSignal(false);
  const [showAlign, setShowAlign] = createSignal(false);
  const [showHighlightPalette, setShowHighlightPalette] = createSignal(false);

  // Close menus on outside click
  createEffect(() => {
    if (typeof window === "undefined") return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".editor-popover-trigger") && !target.closest(".editor-popover-content")) {
        setShowTypography(false);
        setShowAlign(false);
        setShowHighlightPalette(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    onCleanup(() => document.removeEventListener("click", handleClickOutside));
  });

  const currentTypographyLabel = () => {
    if (actions.isActive("heading", { level: 1 })) return "H1";
    if (actions.isActive("heading", { level: 2 })) return "H2";
    if (actions.isActive("heading", { level: 3 })) return "H3";
    return "Normal";
  };

  const CurrentAlignIcon = () => {
    if (actions.isActive({ textAlign: "center" })) return AlignCenter;
    if (actions.isActive({ textAlign: "right" })) return AlignRight;
    return AlignLeft;
  };

  const isEditable = () => actions.editor()?.isEditable ?? true;

  return (
    <div
      class={cn(
        "sticky top-0 z-10 flex flex-wrap items-center gap-1 border-b border-border bg-card/95 backdrop-blur-xs p-1.5 rounded-t-lg",
        local.class
      )}
      {...others}
    >
      {/* Editing Controls Group (Disabled in Read-Only Mode) */}
      <div
        class="flex flex-wrap items-center gap-1"
        classList={{
          "opacity-40 pointer-events-none select-none": !isEditable(),
        }}
      >
        {/* 1. History (Undo / Redo) */}
        <div class="flex items-center gap-0.5 pr-1 border-r border-border shrink-0">
          <ToolbarButton onClick={actions.undo} disabled={!isEditable() || !actions.canUndo()} tooltip="Undo (Ctrl+Z)">
            <Undo class="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton onClick={actions.redo} disabled={!isEditable() || !actions.canRedo()} tooltip="Redo (Ctrl+Y)">
            <Redo class="h-4 w-4" />
          </ToolbarButton>
        </div>

      {/* 2. Compact Typography Dropdown */}
      <div class="relative shrink-0 editor-popover-trigger">
        <button
          type="button"
          onClick={() => setShowTypography((p) => !p)}
          class="inline-flex items-center gap-1 h-8 px-2 rounded-md text-xs font-medium text-foreground bg-muted/50 hover:bg-muted transition-colors cursor-pointer border border-border/40"
          title="Typography"
        >
          <Type class="h-3.5 w-3.5 text-muted-foreground" />
          <span class="font-semibold text-xs min-w-[44px] text-left">{currentTypographyLabel()}</span>
          <ChevronDown class="h-3 w-3 text-muted-foreground" />
        </button>

        <Show when={showTypography()}>
          <div class="absolute top-full left-0 mt-1 z-30 flex flex-col gap-0.5 p-1 bg-popover text-popover-foreground border border-border rounded-lg shadow-xl min-w-[140px] editor-popover-content animate-in fade-in zoom-in-95">
            <button
              type="button"
              class={cn(
                "flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs text-left cursor-pointer hover:bg-muted transition-colors",
                !actions.isActive("heading") && "bg-primary text-primary-foreground font-semibold hover:bg-primary"
              )}
              onClick={() => {
                actions.setParagraph();
                setShowTypography(false);
              }}
            >
              <Type class="h-3.5 w-3.5" />
              <span>Normal text</span>
            </button>
            <button
              type="button"
              class={cn(
                "flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs text-left cursor-pointer hover:bg-muted transition-colors",
                actions.isActive("heading", { level: 1 }) && "bg-primary text-primary-foreground font-semibold hover:bg-primary"
              )}
              onClick={() => {
                actions.setHeading(1);
                setShowTypography(false);
              }}
            >
              <Heading1 class="h-3.5 w-3.5" />
              <span class="font-bold">Heading 1</span>
            </button>
            <button
              type="button"
              class={cn(
                "flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs text-left cursor-pointer hover:bg-muted transition-colors",
                actions.isActive("heading", { level: 2 }) && "bg-primary text-primary-foreground font-semibold hover:bg-primary"
              )}
              onClick={() => {
                actions.setHeading(2);
                setShowTypography(false);
              }}
            >
              <Heading2 class="h-3.5 w-3.5" />
              <span class="font-semibold">Heading 2</span>
            </button>
            <button
              type="button"
              class={cn(
                "flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs text-left cursor-pointer hover:bg-muted transition-colors",
                actions.isActive("heading", { level: 3 }) && "bg-primary text-primary-foreground font-semibold hover:bg-primary"
              )}
              onClick={() => {
                actions.setHeading(3);
                setShowTypography(false);
              }}
            >
              <Heading3 class="h-3.5 w-3.5" />
              <span class="font-medium">Heading 3</span>
            </button>
          </div>
        </Show>
      </div>

      {/* 3. Inline Marks (Bold, Italic, Underline, Strike, Code, Highlight) */}
      <div class="flex items-center gap-0.5 px-1 border-r border-border shrink-0">
        <ToolbarButton onClick={actions.toggleBold} isActive={actions.isActive("bold")} tooltip="Bold (Ctrl+B)">
          <Bold class="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={actions.toggleItalic} isActive={actions.isActive("italic")} tooltip="Italic (Ctrl+I)">
          <Italic class="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={actions.toggleUnderline}
          isActive={actions.isActive("underline")}
          tooltip="Underline (Ctrl+U)"
        >
          <UnderlineIcon class="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={actions.toggleStrike} isActive={actions.isActive("strike")} tooltip="Strikethrough">
          <Strikethrough class="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={actions.toggleCode} isActive={actions.isActive("code")} tooltip="Inline Code">
          <Code class="h-4 w-4" />
        </ToolbarButton>

        {/* Highlighter Color Palette */}
        <div class="relative shrink-0 editor-popover-trigger">
          <ToolbarButton
            onClick={() => setShowHighlightPalette((p) => !p)}
            isActive={actions.isActive("highlight")}
            tooltip="Highlight Color"
          >
            <Highlighter class="h-4 w-4" />
          </ToolbarButton>

          <Show when={showHighlightPalette()}>
            <div class="absolute top-full left-0 mt-1 z-30 flex flex-col gap-1.5 p-2 bg-popover text-popover-foreground border border-border rounded-lg shadow-xl min-w-[200px] editor-popover-content animate-in fade-in zoom-in-95">
              <div class="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                Tailwind Highlight Colors
              </div>
              <div class="grid grid-cols-5 gap-1.5">
                <For each={HIGHLIGHT_PALETTE}>
                  {(color) => (
                    <button
                      type="button"
                      title={color.name}
                      class="h-6 w-6 rounded-md border border-border/60 hover:scale-110 transition-transform cursor-pointer shadow-2xs"
                      style={{ "background-color": color.value }}
                      onClick={() => {
                        actions.toggleHighlight(color.value);
                        setShowHighlightPalette(false);
                      }}
                    />
                  )}
                </For>
              </div>
              <button
                type="button"
                class="w-full text-center py-1 mt-1 text-xs rounded-md bg-muted hover:bg-muted/80 text-foreground transition-colors cursor-pointer font-medium"
                onClick={() => {
                  actions.toggleHighlight();
                  setShowHighlightPalette(false);
                }}
              >
                Clear Highlight
              </button>
            </div>
          </Show>
        </div>
      </div>

      {/* 4. Compact Alignment Dropdown */}
      <div class="relative shrink-0 editor-popover-trigger">
        <button
          type="button"
          onClick={() => setShowAlign((p) => !p)}
          class="inline-flex items-center justify-center h-8 w-8 rounded-md text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
          title="Text Alignment"
        >
          {(() => {
            const Icon = CurrentAlignIcon();
            return <Icon class="h-4 w-4" />;
          })()}
        </button>

        <Show when={showAlign()}>
          <div class="absolute top-full left-0 mt-1 z-30 flex items-center gap-0.5 p-1 bg-popover text-popover-foreground border border-border rounded-lg shadow-xl editor-popover-content animate-in fade-in zoom-in-95">
            <ToolbarButton
              onClick={() => {
                actions.setTextAlign("left");
                setShowAlign(false);
              }}
              isActive={actions.isActive({ textAlign: "left" })}
              tooltip="Align Left"
            >
              <AlignLeft class="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => {
                actions.setTextAlign("center");
                setShowAlign(false);
              }}
              isActive={actions.isActive({ textAlign: "center" })}
              tooltip="Align Center"
            >
              <AlignCenter class="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => {
                actions.setTextAlign("right");
                setShowAlign(false);
              }}
              isActive={actions.isActive({ textAlign: "right" })}
              tooltip="Align Right"
            >
              <AlignRight class="h-4 w-4" />
            </ToolbarButton>
          </div>
        </Show>
      </div>

      {/* 5. Lists & Blocks */}
      <div class="flex items-center gap-0.5 px-1 border-r border-border shrink-0">
        <ToolbarButton
          onClick={actions.toggleBulletList}
          isActive={actions.isActive("bulletList")}
          tooltip="Bullet List"
        >
          <List class="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={actions.toggleOrderedList}
          isActive={actions.isActive("orderedList")}
          tooltip="Numbered List"
        >
          <ListOrdered class="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={actions.toggleTaskList} isActive={actions.isActive("taskList")} tooltip="Task Checklist">
          <ListTodo class="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={actions.toggleBlockquote}
          isActive={actions.isActive("blockquote")}
          tooltip="Blockquote"
        >
          <Quote class="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={actions.toggleCodeBlock}
          isActive={actions.isActive("codeBlock")}
          tooltip="Code Block"
        >
          <Sparkles class="h-4 w-4" />
        </ToolbarButton>
      </div>

      {/* 6. Inserts: Link, Image, Table */}
      <div class="flex items-center gap-0.5 px-1 shrink-0">
        <ToolbarButton
          onClick={() => {
            if (actions.isActive("link")) {
              actions.unsetLink();
            } else {
              setShowLinkDialog(true);
            }
          }}
          isActive={actions.isActive("link")}
          tooltip={actions.isActive("link") ? "Remove Link" : "Insert Link"}
        >
          <Show when={actions.isActive("link")} fallback={<LinkIcon class="h-4 w-4" />}>
            <Unlink class="h-4 w-4" />
          </Show>
        </ToolbarButton>

        <ToolbarButton onClick={() => setShowImageDialog(true)} tooltip="Insert Image">
          <ImageIcon class="h-4 w-4" />
        </ToolbarButton>

        <div class="relative shrink-0">
          <ToolbarButton
            onClick={() => setShowTableMenu((prev) => !prev)}
            isActive={actions.isActive("table")}
            tooltip="Table Controls"
          >
            <TableIcon class="h-4 w-4" />
          </ToolbarButton>

          <EditorTableControls />
        </div>
      </div>
      </div>

      {/* 7. Markdown Toggle, Clear Formatting, Fullscreen */}
      <div class="flex items-center gap-1 border-l border-border pl-1.5 shrink-0 ml-auto">
        <ToolbarButton
          onClick={toggleViewMode}
          isActive={viewMode() === "markdown"}
          tooltip={viewMode() === "markdown" ? "Switch to Visual Editor" : "Switch to Markdown Mode"}
        >
          <Show when={viewMode() === "markdown"} fallback={<FileCode2 class="h-4 w-4" />}>
            <Eye class="h-4 w-4" />
          </Show>
        </ToolbarButton>

        <ToolbarButton onClick={actions.clearContent} disabled={!isEditable()} tooltip="Clear All Content">
          <RemoveFormatting class="h-4 w-4" />
        </ToolbarButton>

        <Show
          when={isFullscreen()}
          fallback={
            <ToolbarButton onClick={toggleFullscreen} tooltip="Fullscreen Mode">
              <Maximize2 class="h-4 w-4" />
            </ToolbarButton>
          }
        >
          <button
            type="button"
            onClick={toggleFullscreen}
            class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer shadow-xs ml-0.5 shrink-0"
            title="Exit Fullscreen (Esc)"
          >
            <Minimize2 class="h-3.5 w-3.5" />
            <span>Exit Fullscreen</span>
          </button>
        </Show>
      </div>
    </div>
  );
};
