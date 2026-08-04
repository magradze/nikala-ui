import { createSignal, createEffect, onCleanup, type Accessor } from "solid-js";

export type WebSocketReadyState = "CONNECTING" | "OPEN" | "CLOSING" | "CLOSED";

export interface CreateWebSocketOptions {
  /** Subprotocol or list of subprotocols. */
  protocols?: string | string[];
  /** Whether to automatically reconnect upon disconnect. Defaults to true. */
  autoReconnect?: boolean;
  /** Reconnection delay in milliseconds. Defaults to 3000ms. */
  reconnectInterval?: number;
  /** Maximum reconnection attempts. Defaults to 5. */
  maxReconnectAttempts?: number;
  /** Whether to open connection immediately upon initialization. Defaults to true. */
  immediate?: boolean;
  /** Callback fired when WebSocket connection opens. */
  onConnected?: (ws: WebSocket) => void;
  /** Callback fired when WebSocket connection closes. */
  onDisconnected?: (event: CloseEvent) => void;
  /** Callback fired when WebSocket receives a message. */
  onMessage?: (event: MessageEvent) => void;
  /** Callback fired when WebSocket encounters an error. */
  onError?: (event: Event) => void;
}

export interface CreateWebSocketReturn<T = unknown> {
  /** Signal accessor containing latest received message data (parsed if JSON). */
  data: Accessor<T | null>;
  /** Signal accessor containing current WebSocket ready state. */
  readyState: Accessor<WebSocketReadyState>;
  /** Signal accessor containing last raw MessageEvent. */
  lastMessage: Accessor<MessageEvent | null>;
  /** Send string data or object payload (auto JSON stringified). */
  send: (data: string | object | ArrayBufferLike | Blob) => boolean;
  /** Open or reconnect WebSocket connection. */
  open: () => void;
  /** Close active WebSocket connection. */
  close: (code?: number, reason?: string) => void;
  /** Signal accessor indicating whether WebSocket is supported in browser environment. */
  isSupported: Accessor<boolean>;
}

/**
 * SolidJS reactive primitive for WebSocket client connections, auto-reconnection, and message passing.
 */
export function createWebSocket<T = unknown>(
  url: string | Accessor<string>,
  options: CreateWebSocketOptions = {}
): CreateWebSocketReturn<T> {
  const [data, setData] = createSignal<T | null>(null);
  const [lastMessage, setLastMessage] = createSignal<MessageEvent | null>(null);
  const [readyState, setReadyState] = createSignal<WebSocketReadyState>("CLOSED");

  const getUrl = (): string => (typeof url === "function" ? url() : url);

  const isSupported = (): boolean =>
    typeof window !== "undefined" && "WebSocket" in window;

  let ws: WebSocket | null = null;
  let reconnectCount = 0;
  let reconnectTimer: ReturnType<typeof setTimeout> | null = null;

  const mapReadyState = (state: number): WebSocketReadyState => {
    switch (state) {
      case WebSocket.CONNECTING:
        return "CONNECTING";
      case WebSocket.OPEN:
        return "OPEN";
      case WebSocket.CLOSING:
        return "CLOSING";
      case WebSocket.CLOSED:
      default:
        return "CLOSED";
    }
  };

  const close = (code?: number, reason?: string): void => {
    if (reconnectTimer) {
      clearTimeout(reconnectTimer);
      reconnectTimer = null;
    }
    if (ws) {
      const socket = ws;
      ws = null;
      socket.close(code, reason);
      setReadyState("CLOSED");
    }
  };

  const send = (payload: string | object | ArrayBufferLike | Blob): boolean => {
    if (!ws || ws.readyState !== WebSocket.OPEN) return false;

    try {
      if (typeof payload === "object" && !(payload instanceof ArrayBuffer) && !(payload instanceof Blob)) {
        ws.send(JSON.stringify(payload));
      } else {
        ws.send(payload as any);
      }
      return true;
    } catch {
      return false;
    }
  };

  const open = (): void => {
    if (!isSupported()) return;

    if (ws) {
      ws.close();
      ws = null;
    }

    setReadyState("CONNECTING");

    try {
      const targetUrl = getUrl();
      const socket = new WebSocket(targetUrl, options.protocols);
      ws = socket;

      socket.onopen = () => {
        reconnectCount = 0;
        setReadyState("OPEN");
        options.onConnected?.(socket);
      };

      socket.onmessage = (event: MessageEvent) => {
        setLastMessage(() => event);
        try {
          const parsed = JSON.parse(event.data);
          setData(() => parsed);
        } catch {
          setData(() => event.data as unknown as T);
        }
        options.onMessage?.(event);
      };

      socket.onerror = (event: Event) => {
        options.onError?.(event);
      };

      socket.onclose = (event: CloseEvent) => {
        setReadyState("CLOSED");
        ws = null;
        options.onDisconnected?.(event);

        if (
          (options.autoReconnect ?? false) &&
          reconnectCount < (options.maxReconnectAttempts ?? 5)
        ) {
          reconnectCount++;
          reconnectTimer = setTimeout(open, options.reconnectInterval ?? 3000);
        }
      };
    } catch {
      setReadyState("CLOSED");
      ws = null;
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
    readyState,
    lastMessage,
    send,
    open,
    close,
    isSupported,
  };
}
