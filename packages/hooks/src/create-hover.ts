import { createSignal, onCleanup, type Accessor } from "solid-js";

export interface CreateHoverOptions {
  /** Delay in milliseconds before setting hover state to true */
  delayEnter?: number;
  /** Delay in milliseconds before setting hover state to false */
  delayLeave?: number;
  /** Callback fired when hover state transitions to true */
  onHoverStart?: () => void;
  /** Callback fired when hover state transitions to false */
  onHoverEnd?: () => void;
}

export interface CreateHoverReturn {
  /** Accessor indicating whether target element is hovered */
  isHovered: Accessor<boolean>;
  /** Event listeners props to spread onto target JSX element */
  props: {
    onPointerEnter: (e: PointerEvent) => void;
    onPointerLeave: (e: PointerEvent) => void;
  };
}

/**
 * SolidJS reactive primitive for tracking element hover state with optional entrance/exit delays.
 *
 * @param options Configuration options for hover delays and callbacks.
 */
export function createHover(options: CreateHoverOptions = {}): CreateHoverReturn {
  const [isHovered, setIsHovered] = createSignal(false);
  let enterTimer: ReturnType<typeof setTimeout> | undefined;
  let leaveTimer: ReturnType<typeof setTimeout> | undefined;

  const clearTimers = () => {
    if (enterTimer) {
      clearTimeout(enterTimer);
      enterTimer = undefined;
    }
    if (leaveTimer) {
      clearTimeout(leaveTimer);
      leaveTimer = undefined;
    }
  };

  const onPointerEnter = () => {
    clearTimers();
    const delay = options.delayEnter ?? 0;

    if (delay > 0) {
      enterTimer = setTimeout(() => {
        setIsHovered(true);
        options.onHoverStart?.();
        enterTimer = undefined;
      }, delay);
    } else {
      setIsHovered(true);
      options.onHoverStart?.();
    }
  };

  const onPointerLeave = () => {
    clearTimers();
    const delay = options.delayLeave ?? 0;

    if (delay > 0) {
      leaveTimer = setTimeout(() => {
        setIsHovered(false);
        options.onHoverEnd?.();
        leaveTimer = undefined;
      }, delay);
    } else {
      setIsHovered(false);
      options.onHoverEnd?.();
    }
  };

  onCleanup(() => {
    clearTimers();
  });

  return {
    isHovered,
    props: {
      onPointerEnter,
      onPointerLeave,
    },
  };
}
