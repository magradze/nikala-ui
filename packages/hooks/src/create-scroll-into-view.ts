import { createEffect, onCleanup, type Accessor } from "solid-js";

export interface CreateScrollIntoViewOptions extends ScrollIntoViewOptions {
  /** Whether the element should scroll into view automatically. Defaults to true. */
  enabled?: boolean | Accessor<boolean>;
  /** Delay in milliseconds before executing scrollIntoView. Defaults to 0. */
  delay?: number;
}

/**
 * SolidJS reactive primitive for scrolling a target element into view smooth or auto behavior.
 */
export function createScrollIntoView(
  target: HTMLElement | Accessor<HTMLElement | null | undefined> | null | undefined,
  options: CreateScrollIntoViewOptions = {}
): void {
  const getTarget = (): HTMLElement | null | undefined => {
    if (typeof target === "function") {
      return target();
    }
    return target;
  };

  const isEnabled = (): boolean => {
    if (typeof options.enabled === "function") {
      return options.enabled();
    }
    return options.enabled ?? true;
  };

  createEffect(() => {
    if (!isEnabled()) return;

    const el = getTarget();
    if (!el || typeof window === "undefined") return;

    const scrollOptions: ScrollIntoViewOptions = {
      behavior: options.behavior ?? "smooth",
      block: options.block ?? "nearest",
      inline: options.inline ?? "nearest",
    };

    let timer: ReturnType<typeof setTimeout> | null = null;

    if (options.delay && options.delay > 0) {
      timer = setTimeout(() => {
        el.scrollIntoView(scrollOptions);
      }, options.delay);
    } else {
      el.scrollIntoView(scrollOptions);
    }

    onCleanup(() => {
      if (timer) clearTimeout(timer);
    });
  });
}
