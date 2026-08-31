import { createSignal, createEffect, onCleanup, type Accessor } from "solid-js";

export interface CreateFullscreenOptions {
  /** Target element accessor or reference. Defaults to document.documentElement. */
  target?: HTMLElement | Accessor<HTMLElement | undefined>;
  /** Callback fired when entering fullscreen mode. */
  onEnter?: () => void;
  /** Callback fired when exiting fullscreen mode. */
  onExit?: () => void;
  /** Callback fired when fullscreen request fails. */
  onError?: (err: Event) => void;
}

export interface CreateFullscreenReturn {
  /** Signal indicating whether fullscreen mode is currently active. */
  isFullscreen: Accessor<boolean>;
  /** Request full screen mode for target element. */
  enter: () => Promise<void>;
  /** Exit full screen mode. */
  exit: () => Promise<void>;
  /** Toggle full screen mode. */
  toggle: () => Promise<void>;
}

/**
 * SolidJS reactive primitive for requesting and monitoring element fullscreen status.
 */
export function createFullscreen(
  options: CreateFullscreenOptions = {}
): CreateFullscreenReturn {
  const [isFullscreen, setIsFullscreen] = createSignal(false);

  const getTarget = (): HTMLElement | undefined => {
    if (typeof document === "undefined") return undefined;
    if (typeof options.target === "function") {
      return options.target() ?? document.documentElement;
    }
    return options.target ?? document.documentElement;
  };

  const updateStatus = (): void => {
    if (typeof document === "undefined") return;
    const activeEl = document.fullscreenElement;
    const isTargetFullscreen = Boolean(activeEl && activeEl === getTarget());
    setIsFullscreen(isTargetFullscreen);
  };

  const enter = async (): Promise<void> => {
    if (typeof window === "undefined") return;
    const el = getTarget();
    if (el?.requestFullscreen) {
      await el.requestFullscreen();
    }
  };

  const exit = async (): Promise<void> => {
    if (typeof document === "undefined") return;
    if (document.fullscreenElement && document.exitFullscreen) {
      await document.exitFullscreen();
    }
  };

  const toggle = async (): Promise<void> => {
    if (isFullscreen()) {
      await exit();
    } else {
      await enter();
    }
  };

  createEffect(() => {
    if (typeof document === "undefined") return;

    const handleFullscreenChange = (): void => {
      const activeEl = document.fullscreenElement;
      const isTarget = Boolean(activeEl && activeEl === getTarget());
      setIsFullscreen(isTarget);

      if (isTarget) {
        options.onEnter?.();
      } else {
        options.onExit?.();
      }
    };

    const handleFullscreenError = (err: Event): void => {
      options.onError?.(err);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("fullscreenerror", handleFullscreenError);

    onCleanup(() => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("fullscreenerror", handleFullscreenError);
    });
  });

  return {
    isFullscreen,
    enter,
    exit,
    toggle,
  };
}
