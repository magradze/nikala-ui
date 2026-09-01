import {
  createSignal,
  createEffect,
  onCleanup,
  Show,
  For,
  type Component,
} from "solid-js";
import { Portal } from "solid-js/web";
import { useRichTextEditor } from "./editor.js";
import { ToolbarButton, HIGHLIGHT_PALETTE } from "./toolbar.js";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Link as LinkIcon,
  Highlighter,
  Heading1,
  Heading2,
  List,
  ListTodo,
} from "lucide-solid";

export const EditorBubbleMenu: Component = () => {
  const { actions, container, isFullscreen, setShowLinkDialog } = useRichTextEditor();
  const [isVisible, setIsVisible] = createSignal(false);
  const [position, setPosition] = createSignal({ top: 0, left: 0 });
  const [showHighlightPalette, setShowHighlightPalette] = createSignal(false);

  createEffect(() => {
    if (typeof window === "undefined") return;

    const handleSelectionChange = () => {
      const ed = actions.editor();
      const containerEl = container();
      if (!ed || !ed.isFocused || !ed.isEditable) {
        setIsVisible(false);
        setShowHighlightPalette(false);
        return;
      }

      const { from, to } = ed.state.selection;
      if (from === to || ed.state.selection.empty) {
        setIsVisible(false);
        setShowHighlightPalette(false);
        return;
      }

      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) {
        setIsVisible(false);
        setShowHighlightPalette(false);
        return;
      }

      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {
        setIsVisible(false);
        setShowHighlightPalette(false);
        return;
      }

      // Check that selection is inside the editor view element
      const editorDom = ed.view.dom;
      if (!editorDom.contains(range.commonAncestorContainer)) {
        setIsVisible(false);
        setShowHighlightPalette(false);
        return;
      }

      if (isFullscreen() && containerEl) {
        const containerRect = containerEl.getBoundingClientRect();
        const top = rect.top - containerRect.top - 46;
        const left = rect.left - containerRect.left + rect.width / 2;

        setPosition({
          top: Math.max(8, top),
          left: Math.max(140, Math.min(containerRect.width - 140, left)),
        });
      } else {
        // Normal mode: viewport coordinates
        setPosition({
          top: Math.max(12, rect.top - 46),
          left: Math.max(140, Math.min(window.innerWidth - 140, rect.left + rect.width / 2)),
        });
      }

      setIsVisible(true);
    };

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // If clicking toolbar or any open popovers, hide bubble menu
      if (
        target.closest(".editor-popover-trigger") ||
        target.closest(".editor-popover-content") ||
        target.closest(".editor-toolbar")
      ) {
        setIsVisible(false);
        setShowHighlightPalette(false);
      }
    };

    document.addEventListener("selectionchange", handleSelectionChange);
    document.addEventListener("mousedown", handleMouseDown);

    onCleanup(() => {
      document.removeEventListener("selectionchange", handleSelectionChange);
      document.removeEventListener("mousedown", handleMouseDown);
    });
  });

  const portalTarget = () => {
    if (typeof document === "undefined") return undefined;
    return isFullscreen() ? container() || document.body : document.body;
  };

  return (
    <Show when={isVisible()}>
      <Portal mount={portalTarget()}>
        <div
          class={`${
            isFullscreen() ? "absolute" : "fixed"
          } z-[999999] flex items-center gap-0.5 p-1 rounded-md border border-border bg-popover text-popover-foreground shadow-xl backdrop-blur-md -translate-x-1/2 transition-all duration-75 animate-in fade-in zoom-in-95 pointer-events-auto select-none`}
          style={{
            top: `${position().top}px`,
            left: `${position().left}px`,
          }}
        >
          <ToolbarButton onClick={actions.toggleBold} isActive={actions.isActive("bold")} tooltip="Bold">
            <Bold class="h-3.5 w-3.5" />
          </ToolbarButton>
          <ToolbarButton onClick={actions.toggleItalic} isActive={actions.isActive("italic")} tooltip="Italic">
            <Italic class="h-3.5 w-3.5" />
          </ToolbarButton>
          <ToolbarButton onClick={actions.toggleUnderline} isActive={actions.isActive("underline")} tooltip="Underline">
            <UnderlineIcon class="h-3.5 w-3.5" />
          </ToolbarButton>
          <ToolbarButton onClick={actions.toggleStrike} isActive={actions.isActive("strike")} tooltip="Strikethrough">
            <Strikethrough class="h-3.5 w-3.5" />
          </ToolbarButton>
          <ToolbarButton onClick={actions.toggleCode} isActive={actions.isActive("code")} tooltip="Code">
            <Code class="h-3.5 w-3.5" />
          </ToolbarButton>

          {/* Marker Highlight with Tailwind Palette */}
          <div class="relative">
            <ToolbarButton
              onClick={() => setShowHighlightPalette((p) => !p)}
              isActive={actions.isActive("highlight")}
              tooltip="Highlight Color"
            >
              <Highlighter class="h-3.5 w-3.5" />
            </ToolbarButton>

            <Show when={showHighlightPalette()}>
              <div class="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 z-30 flex flex-col gap-1.5 p-2 bg-popover text-popover-foreground border border-border rounded-lg shadow-2xl min-w-[200px]">
                <div class="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Marker Palette
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

          <ToolbarButton
            onClick={() => setShowLinkDialog(true)}
            isActive={actions.isActive("link")}
            tooltip="Insert Link"
          >
            <LinkIcon class="h-3.5 w-3.5" />
          </ToolbarButton>

          <div class="h-4 w-px bg-border mx-0.5" />

          <ToolbarButton
            onClick={() => actions.setHeading(1)}
            isActive={actions.isActive("heading", { level: 1 })}
            tooltip="H1"
          >
            <Heading1 class="h-3.5 w-3.5" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => actions.setHeading(2)}
            isActive={actions.isActive("heading", { level: 2 })}
            tooltip="H2"
          >
            <Heading2 class="h-3.5 w-3.5" />
          </ToolbarButton>
          <ToolbarButton
            onClick={actions.toggleBulletList}
            isActive={actions.isActive("bulletList")}
            tooltip="List"
          >
            <List class="h-3.5 w-3.5" />
          </ToolbarButton>
          <ToolbarButton
            onClick={actions.toggleTaskList}
            isActive={actions.isActive("taskList")}
            tooltip="Tasks"
          >
            <ListTodo class="h-3.5 w-3.5" />
          </ToolbarButton>
        </div>
      </Portal>
    </Show>
  );
};
