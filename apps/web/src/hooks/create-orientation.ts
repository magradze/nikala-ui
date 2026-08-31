import { createSignal, createEffect, onCleanup, type Accessor } from "solid-js";

export type ScreenOrientationType =
  | "portrait-primary"
  | "portrait-secondary"
  | "landscape-primary"
  | "landscape-secondary"
  | "portrait"
  | "landscape"
  | "unknown";

export interface CreateOrientationOptions {
  /** Callback fired when screen orientation changes. */
  onChange?: (orientation: ScreenOrientationType, angle: number) => void;
}

export interface CreateOrientationReturn {
  /** Signal indicating current orientation type. */
  type: Accessor<ScreenOrientationType>;
  /** Signal indicating current orientation angle in degrees (0, 90, 180, 270). */
  angle: Accessor<number>;
  /** Signal indicating if device screen is in portrait mode. */
  isPortrait: Accessor<boolean>;
  /** Signal indicating if device screen is in landscape mode. */
  isLandscape: Accessor<boolean>;
  /** Lock screen orientation if supported by device/browser. */
  lock: (orientation: string) => Promise<void>;
  /** Unlock screen orientation. */
  unlock: () => void;
}

/**
 * SolidJS reactive primitive for observing mobile/desktop screen orientation and angle.
 */
export function createOrientation(
  options: CreateOrientationOptions = {}
): CreateOrientationReturn {
  const [type, setType] = createSignal<ScreenOrientationType>("unknown");
  const [angle, setAngle] = createSignal<number>(0);

  const getOrientationState = (): { type: ScreenOrientationType; angle: number } => {
    if (typeof window === "undefined") {
      return { type: "unknown", angle: 0 };
    }

    if (window.screen?.orientation) {
      return {
        type: window.screen.orientation.type as ScreenOrientationType,
        angle: window.screen.orientation.angle || 0,
      };
    }

    /* Fallback for older browsers using window.orientation */
    const legacyAngle = (window as unknown as { orientation?: number }).orientation ?? 0;
    const isPortraitMode = Math.abs(legacyAngle) !== 90;
    return {
      type: isPortraitMode ? "portrait" : "landscape",
      angle: Number(legacyAngle),
    };
  };

  createEffect(() => {
    if (typeof window === "undefined") return;

    const updateState = (): void => {
      const state = getOrientationState();
      setType(state.type);
      setAngle(state.angle);
      options.onChange?.(state.type, state.angle);
    };

    updateState();

    if (window.screen?.orientation) {
      window.screen.orientation.addEventListener("change", updateState);
      onCleanup(() => {
        window.screen.orientation.removeEventListener("change", updateState);
      });
    } else {
      window.addEventListener("orientationchange", updateState);
      window.addEventListener("resize", updateState);
      onCleanup(() => {
        window.removeEventListener("orientationchange", updateState);
        window.removeEventListener("resize", updateState);
      });
    }
  });

  const isPortrait = (): boolean => {
    const currentType = type();
    return currentType.startsWith("portrait");
  };

  const isLandscape = (): boolean => {
    const currentType = type();
    return currentType.startsWith("landscape");
  };

  const lock = async (orientation: string): Promise<void> => {
    if (typeof window !== "undefined" && window.screen?.orientation) {
      const orientationApi = window.screen.orientation as unknown as {
        lock?: (orient: string) => Promise<void>;
      };
      if (typeof orientationApi.lock === "function") {
        await orientationApi.lock(orientation);
      }
    }
  };

  const unlock = (): void => {
    if (typeof window !== "undefined" && window.screen?.orientation) {
      const orientationApi = window.screen.orientation as unknown as {
        unlock?: () => void;
      };
      if (typeof orientationApi.unlock === "function") {
        orientationApi.unlock();
      }
    }
  };

  return {
    type,
    angle,
    isPortrait,
    isLandscape,
    lock,
    unlock,
  };
}
