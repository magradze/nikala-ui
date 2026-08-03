import { createEffect, createSignal, onCleanup, type Accessor } from "solid-js";

export interface CreateTimerOptions {
  /** Whether the timer starts running automatically on mount. Defaults to false. */
  autostart?: boolean;
}

export interface CreateTimerReturn {
  /** Accessor indicating if timer is actively running */
  isRunning: Accessor<boolean>;
  /** Function to start or resume the timer */
  start: () => void;
  /** Function to pause/stop the timer */
  stop: () => void;
  /** Function to reset and restart the timer */
  reset: () => void;
  /** Function to toggle running state */
  toggle: () => void;
}

/**
 * SolidJS reactive primitive for recurring interval timers.
 *
 * @param intervalMs Interval duration in milliseconds.
 * @param callback Function to execute on each interval tick.
 * @param options Configuration options including autostart.
 */
export function createTimer(
  intervalMs: number | Accessor<number>,
  callback: () => void,
  options: CreateTimerOptions = {}
): CreateTimerReturn {
  const [isRunning, setIsRunning] = createSignal<boolean>(options.autostart ?? false);
  let timerId: ReturnType<typeof setInterval> | undefined;

  const getInterval = () => (typeof intervalMs === "function" ? intervalMs() : intervalMs);

  const stop = () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = undefined;
    }
    setIsRunning(false);
  };

  const start = () => {
    stop();
    const delay = getInterval();
    if (delay <= 0) return;

    setIsRunning(true);
    timerId = setInterval(() => {
      callback();
    }, delay);
  };

  const reset = () => {
    start();
  };

  const toggle = () => {
    if (isRunning()) {
      stop();
    } else {
      start();
    }
  };

  createEffect(() => {
    if (isRunning()) {
      start();
    }
  });

  onCleanup(() => {
    stop();
  });

  return {
    isRunning,
    start,
    stop,
    reset,
    toggle,
  };
}

export interface CreateCountdownOptions extends CreateTimerOptions {
  /** Callback fired when countdown reaches zero */
  onComplete?: () => void;
}

export interface CreateCountdownReturn extends CreateTimerReturn {
  /** Accessor for remaining seconds */
  remainingSeconds: Accessor<number>;
  /** Accessor for formatted time string (MM:SS) */
  formatted: Accessor<string>;
}

/**
 * SolidJS reactive primitive for countdown timers.
 *
 * @param durationSeconds Total countdown duration in seconds.
 * @param options Configuration options including autostart and onComplete callback.
 */
export function createCountdown(
  durationSeconds: number | Accessor<number>,
  options: CreateCountdownOptions = {}
): CreateCountdownReturn {
  const getInitialDuration = () =>
    typeof durationSeconds === "function" ? durationSeconds() : durationSeconds;

  const [remaining, setRemaining] = createSignal<number>(getInitialDuration());

  const timer = createTimer(
    1000,
    () => {
      setRemaining((prev) => {
        if (prev <= 1) {
          timer.stop();
          options.onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    },
    { autostart: options.autostart }
  );

  const reset = () => {
    setRemaining(getInitialDuration());
    timer.start();
  };

  const formatted = (): string => {
    const total = remaining();
    const minutes = Math.floor(total / 60);
    const seconds = total % 60;
    const mm = String(minutes).padStart(2, "0");
    const ss = String(seconds).padStart(2, "0");
    return `${mm}:${ss}`;
  };

  return {
    ...timer,
    remainingSeconds: remaining,
    formatted,
    reset,
  };
}
