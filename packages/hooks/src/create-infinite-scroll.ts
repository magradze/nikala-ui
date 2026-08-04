import { createSignal, createEffect, onCleanup, type Accessor } from "solid-js";

export interface CreateInfiniteScrollOptions {
  /** Target element to observe or trigger scroll on. Defaults to document / scroll parent. */
  target?: HTMLElement | Accessor<HTMLElement | undefined>;
  /** Distance threshold from bottom in pixels to trigger fetch. Defaults to 100. */
  threshold?: number;
  /** Whether loading is currently enabled or auto-fetching is active. Defaults to true. */
  enabled?: boolean | Accessor<boolean>;
  /** Callback function when scrolled near bottom to fetch next items. */
  onLoadMore: () => Promise<void> | void;
}

export interface CreateInfiniteScrollReturn {
  /** Sentinel ref function to bind to a DOM element at the bottom of the list. */
  setSentinelRef: (el: HTMLElement | null) => void;
  /** Signal indicating whether fetching is currently in progress. */
  isLoading: Accessor<boolean>;
  /** Signal indicating whether an error occurred during last fetch. */
  error: Accessor<Error | null>;
  /** Imperative function to manually trigger next page load. */
  loadMore: () => Promise<void>;
}

/**
 * SolidJS reactive primitive for dynamic infinite scrolling / auto-fetching.
 */
export function createInfiniteScroll(
  options: CreateInfiniteScrollOptions
): CreateInfiniteScrollReturn {
  const [sentinelEl, setSentinelEl] = createSignal<HTMLElement | null>(null);
  const [isLoading, setIsLoading] = createSignal(false);
  const [error, setError] = createSignal<Error | null>(null);

  const isEnabled = (): boolean => {
    if (typeof options.enabled === "function") {
      return options.enabled();
    }
    return options.enabled ?? true;
  };

  const loadMore = async (): Promise<void> => {
    if (isLoading() || !isEnabled()) return;
    setIsLoading(true);
    setError(null);
    try {
      await options.onLoadMore();
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsLoading(false);
    }
  };

  createEffect(() => {
    if (typeof window === "undefined" || !window.IntersectionObserver) return;
    if (!isEnabled()) return;

    const el = sentinelEl();
    if (!el) return;

    const rootMargin = `${options.threshold ?? 100}px`;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting && !isLoading()) {
          loadMore();
        }
      },
      {
        rootMargin,
        threshold: 0,
      }
    );

    observer.observe(el);

    onCleanup(() => {
      observer.disconnect();
    });
  });

  return {
    setSentinelRef: setSentinelEl,
    isLoading,
    error,
    loadMore,
  };
}
