import { onCleanup, type Accessor } from "solid-js";

export interface DebounceThrottleReturn<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): void;
  clear: () => void;
}

/**
 * SolidJS reactive primitive for debouncing function execution.
 *
 * @param fn Function to debounce.
 * @param delay Delay in milliseconds (number or accessor).
 */
export function createDebounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number | Accessor<number>
): DebounceThrottleReturn<T> {
  const getDelay = (): number => (typeof delay === "function" ? delay() : delay);
  let timer: ReturnType<typeof setTimeout> | undefined;

  const clear = () => {
    if (timer) {
      clearTimeout(timer);
      timer = undefined;
    }
  };

  const debounced = (...args: Parameters<T>) => {
    clear();
    timer = setTimeout(() => {
      fn(...args);
    }, getDelay());
  };

  debounced.clear = clear;

  onCleanup(() => {
    clear();
  });

  return debounced;
}

/**
 * SolidJS reactive primitive for throttling function execution.
 *
 * @param fn Function to throttle.
 * @param delay Interval in milliseconds (number or accessor).
 */
export function createThrottle<T extends (...args: any[]) => any>(
  fn: T,
  delay: number | Accessor<number>
): DebounceThrottleReturn<T> {
  const getDelay = (): number => (typeof delay === "function" ? delay() : delay);
  let lastCall = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;

  const clear = () => {
    if (timer) {
      clearTimeout(timer);
      timer = undefined;
    }
  };

  const throttled = (...args: Parameters<T>) => {
    const now = Date.now();
    const interval = getDelay();
    const remaining = interval - (now - lastCall);

    if (remaining <= 0) {
      clear();
      lastCall = now;
      fn(...args);
    } else if (!timer) {
      timer = setTimeout(() => {
        lastCall = Date.now();
        timer = undefined;
        fn(...args);
      }, remaining);
    }
  };

  throttled.clear = clear;

  onCleanup(() => {
    clear();
  });

  return throttled;
}
