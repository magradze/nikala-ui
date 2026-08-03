import { createSignal, onMount, onCleanup, type Accessor } from "solid-js";
import { isServer } from "solid-js/web";

export interface CreateIdleOptions {
  /** Timeout in milliseconds before user is considered idle (default: 60000 = 60s) */
  timeout?: number;
  /** Initial idle state (default: false) */
  initialState?: boolean;
  /** DOM events to listen for user activity */
  events?: string[];
  /** Callback fired when user becomes idle */
  onIdle?: () => void;
  /** Callback fired when user becomes active after being idle */
  onActive?: () => void;
}

export interface CreateIdleReturn {
  /** Accessor returning true if user has been inactive for timeout period */
  isIdle: Accessor<boolean>;
  /** Accessor returning timestamp in ms of last detected user interaction */
  lastActive: Accessor<number>;
  /** Reset idle state and restart timer */
  reset: () => void;
}

const DEFAULT_EVENTS = [
  "mousemove",
  "mousedown",
  "keydown",
  "touchstart",
  "scroll",
  "wheel",
];

/**
 * SolidJS reactive primitive for detecting user inactivity (idle state) with customizable timeout and event triggers.
 *
 * @param options Configuration options including timeout in ms and event handlers.
 */
export function createIdle(options: CreateIdleOptions = {}): CreateIdleReturn {
  const initialIdle = options.initialState ?? false;

  // SSR: return static defaults — no timers, no listeners
  if (isServer) {
    const [isIdle] = createSignal(initialIdle);
    const [lastActive] = createSignal(0);
    return { isIdle, lastActive, reset: () => {} };
  }

  const timeoutMs = options.timeout ?? 60000;
  const events = options.events ?? DEFAULT_EVENTS;

  const [isIdle, setIsIdle] = createSignal(initialIdle);
  const [lastActive, setLastActive] = createSignal(0);

  let timerId: any = null;

  const startTimer = () => {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => {
      if (!isIdle()) {
        setIsIdle(true);
        if (options.onIdle) options.onIdle();
      }
    }, timeoutMs);
  };

  const handleUserActivity = () => {
    setLastActive(Date.now());

    if (isIdle()) {
      setIsIdle(false);
      if (options.onActive) options.onActive();
    }

    startTimer();
  };

  const reset = () => {
    setLastActive(Date.now());
    setIsIdle(false);
    startTimer();
  };

  onMount(() => {
    // Set initial lastActive to now on client mount
    setLastActive(Date.now());

    events.forEach((evt) => {
      window.addEventListener(evt, handleUserActivity, { passive: true });
    });

    startTimer();

    onCleanup(() => {
      if (timerId) clearTimeout(timerId);
      events.forEach((evt) => {
        window.removeEventListener(evt, handleUserActivity);
      });
    });
  });

  return {
    isIdle,
    lastActive,
    reset,
  };
}

