import { createSignal, type Component } from "solid-js";
import { useRichTextEditor } from "./editor.js";

export const EditorLinkDialog: Component = () => {
  const { actions, setShowLinkDialog } = useRichTextEditor();
  const [url, setUrl] = createSignal("");

  const handleApply = (e: Event) => {
    e.preventDefault();
    if (url().trim()) {
      actions.setLink({ href: url().trim() });
      setShowLinkDialog(false);
    }
  };

  return (
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      <div class="w-full max-w-sm rounded-lg border border-border bg-card p-4 shadow-lg text-card-foreground">
        <h3 class="text-sm font-semibold mb-3">Insert Hyperlink</h3>
        <form onSubmit={handleApply} class="flex flex-col gap-3">
          <input
            type="url"
            placeholder="https://example.com"
            value={url()}
            onInput={(e) => setUrl(e.currentTarget.value)}
            autofocus
            class="w-full h-8 px-2.5 text-xs rounded-md border border-border bg-background text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary"
          />
          <div class="flex items-center justify-end gap-2">
            <button
              type="button"
              class="px-2.5 py-1 text-xs rounded-md border border-border hover:bg-muted cursor-pointer"
              onClick={() => setShowLinkDialog(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-3 py-1 text-xs rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 cursor-pointer"
            >
              Apply Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
