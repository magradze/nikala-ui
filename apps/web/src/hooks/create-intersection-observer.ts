import { createEffect, createSignal, onCleanup, type Accessor } from "solid-js";

export interface CreateIntersectionObserverOptions extends IntersectionObserverInit {
  /** Whether the observer is active. Defaults to true. */
  enabled?: boolean | Accessor<boolean>;
}

/**
 * SolidJS reactive primitive for observing element visibility and intersection with viewport or root element.
 *
 * @param target Target element or accessor returning HTML element.
 * @param callback Observer callback invoked on intersection state change.
 * @param options IntersectionObserver options (root, rootMargin, threshold, enabled).
 */
export function createIntersectionObserver(
  target: HTMLElement | Accessor<HTMLElement | undefined>,
  callback: IntersectionObserverCallback,
  options: CreateIntersectionObserverOptions = {}
): void {
  const getTarget = (): HTMLElement | undefined => {
    if (typeof target === "function") {
      return (target as Accessor<HTMLElement | undefined>)();
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
    if (typeof window === "undefined" || !window.IntersectionObserver) {
      return;
    }

    if (!isEnabled()) return;

    const el = getTarget();
    if (!el) return;

    const observer = new IntersectionObserver(callback, {
      root: options.root,
      rootMargin: options.rootMargin,
      threshold: options.threshold,
    });

    observer.observe(el);

    onCleanup(() => {
      observer.disconnect();
    });
  });
}

/**
 * SolidJS reactive primitive returning a boolean accessor indicating if element is currently visible in viewport.
 *
 * @param target Target element or accessor returning HTML element.
 * @param options IntersectionObserver options.
 */
export function createInView(
  target: HTMLElement | Accessor<HTMLElement | undefined>,
  options: CreateIntersectionObserverOptions = {}
): Accessor<boolean> {
  const [isInView, setIsInView] = createSignal(false);

  createIntersectionObserver(
    target,
    (entries) => {
      const entry = entries[0];
      if (entry) {
        setIsInView(entry.isIntersecting);
      }
    },
    options
  );

  return isInView;
}
