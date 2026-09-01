import { Show, type Component } from "solid-js";
import { useRichTextEditor } from "./editor.js";
import { Plus, Minus, Trash2 } from "lucide-solid";

export const EditorTableControls: Component = () => {
  const { actions, showTableMenu, setShowTableMenu } = useRichTextEditor();

  return (
    <Show when={showTableMenu()}>
      <div class="absolute top-full left-0 mt-1 z-20 flex flex-col gap-1 p-2 bg-popover text-popover-foreground border border-border rounded-md shadow-md min-w-[160px]">
        <Show
          when={actions.isActive("table")}
          fallback={
            <button
              type="button"
              class="flex items-center gap-2 px-2 py-1.5 text-xs text-left rounded hover:bg-muted cursor-pointer transition-colors"
              onClick={() => {
                actions.insertTable({ rows: 3, cols: 3, withHeaderRow: true });
                setShowTableMenu(false);
              }}
            >
              <Plus class="h-3.5 w-3.5" /> Insert 3x3 Table
            </button>
          }
        >
          <button
            type="button"
            class="flex items-center gap-2 px-2 py-1 text-xs text-left rounded hover:bg-muted cursor-pointer transition-colors"
            onClick={() => actions.editor()?.chain().focus().addRowAfter().run()}
          >
            <Plus class="h-3.5 w-3.5" /> Add Row Below
          </button>
          <button
            type="button"
            class="flex items-center gap-2 px-2 py-1 text-xs text-left rounded hover:bg-muted cursor-pointer transition-colors"
            onClick={() => actions.editor()?.chain().focus().addColumnAfter().run()}
          >
            <Plus class="h-3.5 w-3.5" /> Add Column Right
          </button>
          <button
            type="button"
            class="flex items-center gap-2 px-2 py-1 text-xs text-left rounded hover:bg-muted cursor-pointer text-destructive transition-colors"
            onClick={() => actions.editor()?.chain().focus().deleteRow().run()}
          >
            <Minus class="h-3.5 w-3.5" /> Delete Row
          </button>
          <button
            type="button"
            class="flex items-center gap-2 px-2 py-1 text-xs text-left rounded hover:bg-muted cursor-pointer text-destructive transition-colors"
            onClick={() => actions.editor()?.chain().focus().deleteColumn().run()}
          >
            <Minus class="h-3.5 w-3.5" /> Delete Column
          </button>
          <button
            type="button"
            class="flex items-center gap-2 px-2 py-1 text-xs text-left rounded hover:bg-muted cursor-pointer text-destructive font-medium border-t border-border mt-1 pt-1.5 transition-colors"
            onClick={() => {
              actions.editor()?.chain().focus().deleteTable().run();
              setShowTableMenu(false);
            }}
          >
            <Trash2 class="h-3.5 w-3.5" /> Delete Table
          </button>
        </Show>
      </div>
    </Show>
  );
};
