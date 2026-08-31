import { createSignal, createEffect, type Accessor } from "solid-js";

export interface CreateFetchOptions<T> extends RequestInit {
  /** Whether the request should be refetched automatically on window focus. Defaults to false. */
  refetchOnFocus?: boolean;
  /** Custom transform function to process raw JSON / text response into required shape. */
  transform?: (data: unknown) => T;
  /** Whether the initial request should execute immediately. Defaults to true. */
  immediate?: boolean;
}

export interface CreateFetchReturn<T> {
  /** Signal containing fetched data. */
  data: Accessor<T | null>;
  /** Signal indicating whether request is loading. */
  isLoading: Accessor<boolean>;
  /** Signal containing request error if fetch failed. */
  error: Accessor<Error | null>;
  /** Imperative function to refetch data manually. */
  refetch: () => Promise<void>;
  /** Abort ongoing HTTP request. */
  abort: () => void;
}

/**
 * SolidJS reactive primitive for handling HTTP fetch requests, loading states, errors, and manual refetching.
 */
export function createFetch<T = unknown>(
  url: string | Accessor<string>,
  options: CreateFetchOptions<T> = {}
): CreateFetchReturn<T> {
  const [data, setData] = createSignal<T | null>(null);
  const [isLoading, setIsLoading] = createSignal(options.immediate ?? true);
  const [error, setError] = createSignal<Error | null>(null);

  let controller: AbortController | null = null;

  const getUrl = (): string => {
    return typeof url === "function" ? url() : url;
  };

  const abort = (): void => {
    if (controller) {
      controller.abort();
      controller = null;
    }
  };

  const executeFetch = async (): Promise<void> => {
    if (typeof window === "undefined") return;

    abort();
    controller = new AbortController();

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(getUrl(), {
        ...options,
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
      }

      const raw = await response.json();
      const result = options.transform ? options.transform(raw) : (raw as T);

      setData(() => result);
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return;
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsLoading(false);
    }
  };

  createEffect(() => {
    if (options.immediate ?? true) {
      executeFetch();
    }
  });

  return {
    data,
    isLoading,
    error,
    refetch: executeFetch,
    abort,
  };
}
