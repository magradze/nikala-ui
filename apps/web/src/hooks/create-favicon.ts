import { createEffect, onCleanup, type Accessor } from "solid-js";

export interface CreateFaviconOptions {
  /** Favicon rel attribute value. Defaults to 'icon'. */
  rel?: string;
  /** Favicon image mime-type format (e.g., 'image/x-icon', 'image/svg+xml', 'image/png'). */
  type?: string;
  /** Whether to restore original favicon on component unmount. Defaults to true. */
  restoreOnUnmount?: boolean;
}

/**
 * SolidJS reactive primitive for dynamically updating browser favicon element.
 */
export function createFavicon(
  href: string | Accessor<string>,
  options: CreateFaviconOptions = {}
): void {
  const getHref = (): string => (typeof href === "function" ? href() : href);

  createEffect(() => {
    if (typeof document === "undefined") return;

    const rel = options.rel ?? "icon";
    let linkElement: HTMLLinkElement | null = document.querySelector(
      `link[rel*="${rel}"]`
    );

    const originalHref = linkElement ? linkElement.href : "";

    if (!linkElement) {
      linkElement = document.createElement("link");
      linkElement.rel = rel;
      if (options.type) linkElement.type = options.type;
      document.head.appendChild(linkElement);
    }

    const newHref = getHref();
    if (newHref) {
      linkElement.href = newHref;
      if (options.type) linkElement.type = options.type;
    }

    onCleanup(() => {
      if (typeof document !== "undefined" && (options.restoreOnUnmount ?? true) && linkElement) {
        if (originalHref) {
          linkElement.href = originalHref;
        }
      }
    });
  });
}
