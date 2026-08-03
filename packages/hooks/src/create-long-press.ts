import { createSignal, onCleanup } from "solid-js";

export interface CreateLongPressOptions {
  /** Long press hold threshold duration in milliseconds. Defaults to 500. */
  threshold?: number;
  /** Callback fired when long press hold starts */
  onStart?: () => void;
  /** Callback fired when long press is successfully completed */
  onFinish?: () => void;
  /** Callback fired when long press is cancelled before threshold */
  onCancel?: () => void;
}

export interface CreateLongPressReturn {
  /** Accessor indicating if long press is currently being held */
  isPressed: () => boolean;
  /** JSX Event Handlers object to spread or attach onto target element */
  props: {
    onPointerDown: (e: PointerEvent) => void;
    onPointerUp: (e: PointerEvent) => void;
    onPointerLeave: (e: PointerEvent) => void;
    onCancel: (e: Event) => void;
  };
}

/**
 * SolidJS reactive primitive for detecting long press / hold interactions on elements.
 *
 * @param handler Callback function invoked when long press threshold is reached.
 * @param options Options for threshold duration and state callbacks.
 */
export function createLongPress(
  handler: (event: Event) => void,
  options: CreateLongPressOptions = {}
): CreateLongPressReturn {
  const threshold = options.threshold ?? 500;
  const [isPressed, setIsPressed] = createSignal(false);
  let timer: ReturnType<typeof setTimeout> | undefined;

  const cancel = (e?: Event) => {
    if (timer) {
      clearTimeout(timer);
      timer = undefined;
    }
    if (isPressed()) {
      setIsPressed(false);
      options.onCancel?.();
    }
  };

  const start = (e: Event) => {
    cancel();
    setIsPressed(true);
    options.onStart?.();

    timer = setTimeout(() => {
      handler(e);
      options.onFinish?.();
      timer = undefined;
    }, threshold);
  };

  const finish = (e: Event) => {
    if (timer) {
      clearTimeout(timer);
      timer = undefined;
      options.onCancel?.();
    }
    setIsPressed(false);
  };

  onCleanup(() => {
    cancel();
  });

  return {
    isPressed,
    props: {
      onPointerDown: start,
      onPointerUp: finish,
      onPointerLeave: cancel,
      onCancel: cancel,
    },
  };
}
