import { createEffect, onCleanup, type Accessor } from "solid-js";

export interface CreateDocumentTitleOptions {
  /** Whether to restore original title on component unmount. Defaults to true. */
  restoreOnUnmount?: boolean;
}

/**
 * SolidJS reactive primitive for managing document title dynamically.
 */
export function createDocumentTitle(
  title: string | Accessor<string>,
  options: CreateDocumentTitleOptions = {}
): void {
  const getTitle = (): string => (typeof title === "function" ? title() : title);

  createEffect(() => {
    if (typeof document === "undefined") return;

    const originalTitle = document.title;
    const newTitle = getTitle();

    if (newTitle) {
      document.title = newTitle;
    }

    onCleanup(() => {
      if (typeof document !== "undefined" && (options.restoreOnUnmount ?? true)) {
        document.title = originalTitle;
      }
    });
  });
}
