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
import {
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  ListTodo,
  Quote,
  Table as TableIcon,
  Sparkles,
  Minus,
} from "lucide-solid";

export interface SlashCommandItem {
  title: string;
  description: string;
  icon: Component<{ class?: string }>;
  action: () => void;
}

export const EditorSlashCommand: Component = () => {
  const { actions, container, isFullscreen } = useRichTextEditor();
  const [isOpen, setIsOpen] = createSignal(false);
  const [selectedIndex, setSelectedIndex] = createSignal(0);
  const [query, setQuery] = createSignal("");
  const [position, setPosition] = createSignal({ top: 0, left: 0 });

  const itemRefs: HTMLElement[] = [];

  const items: SlashCommandItem[] = [
    {
      title: "Heading 1",
      description: "Big section heading",
      icon: Heading1,
      action: () => actions.setHeading(1),
    },
    {
      title: "Heading 2",
      description: "Medium section heading",
      icon: Heading2,
      action: () => actions.setHeading(2),
    },
    {
      title: "Heading 3",
      description: "Small section heading",
      icon: Heading3,
      action: () => actions.setHeading(3),
    },
    {
      title: "Bullet List",
      description: "Create a simple bulleted list",
      icon: List,
      action: actions.toggleBulletList,
    },
    {
      title: "Numbered List",
      description: "Create a numbered sequence",
      icon: ListOrdered,
      action: actions.toggleOrderedList,
    },
    {
      title: "Task Checklist",
      description: "Track tasks with interactive checkboxes",
      icon: ListTodo,
      action: actions.toggleTaskList,
    },
    {
      title: "Blockquote",
      description: "Capture a notable quote or callout",
      icon: Quote,
      action: actions.toggleBlockquote,
    },
    {
      title: "Code Block",
      description: "Display code with monospace font",
      icon: Sparkles,
      action: actions.toggleCodeBlock,
    },
    {
      title: "Table",
      description: "Insert a 3x3 editable data table",
      icon: TableIcon,
      action: () => actions.insertTable({ rows: 3, cols: 3, withHeaderRow: true }),
    },
    {
      title: "Divider",
      description: "Separate content with a horizontal line",
      icon: Minus,
      action: actions.insertHorizontalRule,
    },
  ];

  const filteredItems = () =>
    items.filter(
      (item) =>
        item.title.toLowerCase().includes(query().toLowerCase()) ||
        item.description.toLowerCase().includes(query().toLowerCase())
    );

  // Auto-scroll active item into view
  createEffect(() => {
    if (!isOpen()) return;
    const idx = selectedIndex();
    const el = itemRefs[idx];
    if (el) {
      el.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  });

  const executeItem = (item: SlashCommandItem) => {
    const ed = actions.editor();
    if (ed) {
      const { from } = ed.state.selection;
      const textBefore = ed.state.doc.textBetween(Math.max(0, from - 20), from, "\n");
      const slashIndex = textBefore.lastIndexOf("/");
      if (slashIndex !== -1) {
        const deleteCount = textBefore.length - slashIndex;
        ed.commands.deleteRange({ from: from - deleteCount, to: from });
      }
    }
    item.action();
    setIsOpen(false);
    setQuery("");
  };

  createEffect(() => {
    if (typeof window === "undefined") return;

    const handleEditorUpdate = () => {
      const ed = actions.editor();
      const containerEl = container();
      if (!ed || !ed.isFocused || !ed.isEditable) {
        setIsOpen(false);
        return;
      }

      const { from, empty } = ed.state.selection;
      if (!empty) {
        setIsOpen(false);
        return;
      }

      const textBefore = ed.state.doc.textBetween(Math.max(0, from - 25), from, "\n");
      const match = textBefore.match(/(?:^|\s)\/([a-zA-Z0-9]*)$/);

      if (match) {
        const matchedQuery = match[1] || "";
        setQuery(matchedQuery);
        setSelectedIndex(0);

        try {
          const coords = ed.view.coordsAtPos(from);
          const menuHeight = 280;
          const menuWidth = 288;

          if (isFullscreen() && containerEl) {
            // Fullscreen mode: position relative to container
            const containerRect = containerEl.getBoundingClientRect();
            const spaceBelow = containerRect.bottom - coords.bottom;
            let top: number;

            if (spaceBelow < menuHeight && coords.top - containerRect.top > menuHeight) {
              // Flip upwards if not enough room below
              top = coords.top - containerRect.top - menuHeight - 6;
            } else {
              // Open downwards
              top = coords.bottom - containerRect.top + 6;
            }

            const left = Math.max(12, Math.min(containerRect.width - menuWidth - 12, coords.left - containerRect.left));

            setPosition({ top, left });
            setIsOpen(true);
          } else {
            // Normal mode: viewport fixed coordinates to prevent any container overflow clipping
            const spaceBelow = window.innerHeight - coords.bottom;
            let top: number;

            if (spaceBelow < menuHeight && coords.top > menuHeight) {
              // Flip upwards
              top = coords.top - menuHeight - 6;
            } else {
              // Open downwards
              top = coords.bottom + 6;
            }

            const left = Math.max(12, Math.min(window.innerWidth - menuWidth - 12, coords.left));

            setPosition({ top, left });
            setIsOpen(true);
          }
        } catch {
          setIsOpen(false);
        }
      } else {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen()) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredItems().length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems().length) % filteredItems().length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        const current = filteredItems()[selectedIndex()];
        if (current) executeItem(current);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown, true);
    document.addEventListener("selectionchange", handleEditorUpdate);
    document.addEventListener("input", handleEditorUpdate);

    onCleanup(() => {
      window.removeEventListener("keydown", handleKeyDown, true);
      document.removeEventListener("selectionchange", handleEditorUpdate);
      document.removeEventListener("input", handleEditorUpdate);
    });
  });

  const portalTarget = () => {
    if (typeof document === "undefined") return undefined;
    return isFullscreen() ? container() || document.body : document.body;
  };

  return (
    <Show when={isOpen() && filteredItems().length > 0}>
      <Portal mount={portalTarget()}>
        <div
          class={`${
            isFullscreen() ? "absolute" : "fixed"
          } z-[999999] w-72 rounded-lg border border-border bg-popover text-popover-foreground shadow-2xl p-1.5 max-h-72 overflow-y-auto animate-in fade-in zoom-in-95 pointer-events-auto`}
          style={{
            top: `${position().top}px`,
            left: `${position().left}px`,
          }}
        >
          <div class="px-2 py-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider border-b border-border/60 mb-1">
            Slash Commands
          </div>
          <For each={filteredItems()}>
            {(item, index) => {
              const Icon = item.icon;
              const isSelected = () => index() === selectedIndex();
              return (
                <button
                  ref={(el) => (itemRefs[index()] = el)}
                  type="button"
                  class={`flex items-center justify-between w-full px-2 py-2 rounded-md text-left text-xs transition-colors cursor-pointer ${
                    isSelected()
                      ? "bg-accent/80 text-accent-foreground font-semibold ring-1 ring-border shadow-xs"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  }`}
                  onClick={() => executeItem(item)}
                  onMouseEnter={() => setSelectedIndex(index())}
                >
                  <div class="flex items-center gap-2.5 truncate">
                    <div
                      class={`flex items-center justify-center h-6 w-6 rounded-md shrink-0 border ${
                        isSelected()
                          ? "bg-background text-foreground border-border shadow-2xs"
                          : "bg-muted text-muted-foreground border-transparent"
                      }`}
                    >
                      <Icon class="h-3.5 w-3.5" />
                    </div>
                    <div class="flex flex-col truncate">
                      <span class="text-foreground text-xs">{item.title}</span>
                      <span class="text-[10px] text-muted-foreground truncate">{item.description}</span>
                    </div>
                  </div>
                  <Show when={isSelected()}>
                    <span class="text-[10px] text-muted-foreground font-mono ml-1">↵</span>
                  </Show>
                </button>
              );
            }}
          </For>
        </div>
      </Portal>
    </Show>
  );
};
