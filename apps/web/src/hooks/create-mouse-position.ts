import { createEffect, createSignal, onCleanup, type Accessor } from "solid-js";

export interface CreateMousePositionOptions {
  /** Target element to calculate element-relative mouse coordinates for. Defaults to window. */
  target?: HTMLElement | Window | Accessor<HTMLElement | Window | undefined>;
}

export interface CreateMousePositionReturn {
  /** Accessor for global page X mouse position */
  x: Accessor<number>;
  /** Accessor for global page Y mouse position */
  y: Accessor<number>;
  /** Accessor for element-relative X mouse coordinate */
  elementX: Accessor<number>;
  /** Accessor for element-relative Y mouse coordinate */
  elementY: Accessor<number>;
  /** Accessor indicating if mouse pointer is inside target element bounds */
  isInside: Accessor<boolean>;
}

/**
 * SolidJS reactive primitive for tracking global and element-relative mouse pointer coordinates.
 *
 * @param options Configuration options including target element.
 */
export function createMousePosition(
  options: CreateMousePositionOptions = {}
): CreateMousePositionReturn {
  const [x, setX] = createSignal(0);
  const [y, setY] = createSignal(0);
  const [elementX, setElementX] = createSignal(0);
  const [elementY, setElementY] = createSignal(0);
  const [isInside, setIsInside] = createSignal(false);

  const getTarget = (): HTMLElement | Window | undefined => {
    if (typeof window === "undefined") return undefined;
    if (!options.target) return window;
    if (typeof options.target === "function") {
      return (options.target as Accessor<HTMLElement | Window | undefined>)();
    }
    return options.target;
  };

  const handleMouseMove = (event: MouseEvent) => {
    const pageX = event.pageX;
    const pageY = event.pageY;

    setX(pageX);
    setY(pageY);

    const target = getTarget();
    if (target && target !== window) {
      const el = target as HTMLElement;
      const rect = el.getBoundingClientRect();
      const relX = event.clientX - rect.left;
      const relY = event.clientY - rect.top;

      setElementX(relX);
      setElementY(relY);

      const inside =
        relX >= 0 && relX <= rect.width && relY >= 0 && relY <= rect.height;
      setIsInside(inside);
    } else {
      setElementX(pageX);
      setElementY(pageY);
      setIsInside(true);
    }
  };

  createEffect(() => {
    if (typeof window === "undefined") return;

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    onCleanup(() => {
      window.removeEventListener("mousemove", handleMouseMove);
    });
  });

  return {
    x,
    y,
    elementX,
    elementY,
    isInside,
  };
}
