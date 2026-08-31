import { createSignal, createEffect, onCleanup, type Accessor } from "solid-js";

export type EventSourceStatus = "CONNECTING" | "OPEN" | "CLOSED";

export interface CreateEventSourceOptions {
  /** Event names to listen to on the EventSource. Defaults to ['message']. */
  events?: string[];
  /** Include credentials in CORS requests. */
  withCredentials?: boolean;
  /** Whether to open connection immediately. Defaults to true. */
  immediate?: boolean;
  /** Callback fired when connection is opened. */
  onOpen?: (event: Event) => void;
  /** Callback fired when message event is received. */
  onMessage?: (event: MessageEvent) => void;
  /** Callback fired when error occurs. */
  onError?: (event: Event) => void;
}

export interface CreateEventSourceReturn<T = unknown> {
  /** Signal accessor containing latest received SSE event data (parsed if JSON). */
  data: Accessor<T | null>;
  /** Signal accessor containing current EventSource status. */
  status: Accessor<EventSourceStatus>;
  /** Signal accessor containing last raw MessageEvent. */
  event: Accessor<MessageEvent | null>;
  /** Open or reconnect EventSource stream. */
  open: () => void;
  /** Close active EventSource stream. */
  close: () => void;
  /** Signal accessor indicating whether EventSource is supported in browser environment. */
  isSupported: Accessor<boolean>;
}

/**
 * SolidJS reactive primitive for subscribing to Server-Sent Events (SSE) streams.
 */
export function createEventSource<T = unknown>(
  url: string | Accessor<string>,
  options: CreateEventSourceOptions = {}
): CreateEventSourceReturn<T> {
  const [data, setData] = createSignal<T | null>(null);
  const [event, setEvent] = createSignal<MessageEvent | null>(null);
  const [status, setStatus] = createSignal<EventSourceStatus>("CLOSED");

  const getUrl = (): string => (typeof url === "function" ? url() : url);

  const isSupported = (): boolean =>
    typeof window !== "undefined" && "EventSource" in window;

  let es: EventSource | null = null;

  const close = (): void => {
    if (es) {
      es.close();
      es = null;
      setStatus("CLOSED");
    }
  };

  const open = (): void => {
    if (!isSupported()) return;

    close();

    setStatus("CONNECTING");

    try {
      const source = new EventSource(getUrl(), {
        withCredentials: options.withCredentials,
      });
      es = source;

      source.onopen = (e) => {
        setStatus("OPEN");
        options.onOpen?.(e);
      };

      source.onerror = (e) => {
        if (source.readyState === EventSource.CLOSED) {
          setStatus("CLOSED");
        } else if (source.readyState === EventSource.CONNECTING) {
          setStatus("CONNECTING");
        }
        options.onError?.(e);
      };

      const eventList = options.events ?? ["message"];
      eventList.forEach((eventName) => {
        source.addEventListener(eventName, (e) => {
          const msgEvt = e as MessageEvent;
          setEvent(() => msgEvt);
          try {
            const parsed = JSON.parse(msgEvt.data);
            setData(() => parsed);
          } catch {
            setData(() => msgEvt.data as unknown as T);
          }
          options.onMessage?.(msgEvt);
        });
      });
    } catch {
      setStatus("CLOSED");
      es = null;
    }
  };

  createEffect(() => {
    if (options.immediate ?? true) {
      open();
    }

    onCleanup(() => {
      close();
    });
  });

  return {
    data,
    status,
    event,
    open,
    close,
    isSupported,
  };
}
