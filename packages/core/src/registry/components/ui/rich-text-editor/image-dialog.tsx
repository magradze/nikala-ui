import { createSignal, type Component } from "solid-js";
import { useRichTextEditor } from "./editor.js";

export const EditorImageDialog: Component = () => {
  const { actions, setShowImageDialog } = useRichTextEditor();
  const [url, setUrl] = createSignal("");
  const [alt, setAlt] = createSignal("");

  const handleApply = (e: Event) => {
    e.preventDefault();
    if (url().trim()) {
      actions.setImage({ src: url().trim(), alt: alt().trim() });
      setShowImageDialog(false);
    }
  };

  const handleFileUpload = (e: Event & { currentTarget: HTMLInputElement }) => {
    const file = e.currentTarget.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        actions.setImage({ src: reader.result, alt: file.name });
        setShowImageDialog(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      <div class="w-full max-w-sm rounded-lg border border-border bg-card p-4 shadow-lg text-card-foreground">
        <h3 class="text-sm font-semibold mb-3">Insert Image</h3>
        <form onSubmit={handleApply} class="flex flex-col gap-3">
          <div>
            <label class="text-[11px] font-medium text-muted-foreground block mb-1">Image URL</label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={url()}
              onInput={(e) => setUrl(e.currentTarget.value)}
              class="w-full h-8 px-2.5 text-xs rounded-md border border-border bg-background text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label class="text-[11px] font-medium text-muted-foreground block mb-1">Or Upload Local File</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              class="w-full text-xs text-muted-foreground file:mr-2 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-muted file:text-foreground hover:file:bg-muted/80 cursor-pointer"
            />
          </div>
          <div class="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              class="px-2.5 py-1 text-xs rounded-md border border-border hover:bg-muted cursor-pointer"
              onClick={() => setShowImageDialog(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!url().trim()}
              class="px-3 py-1 text-xs rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 disabled:opacity-50 cursor-pointer"
            >
              Insert Image
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
