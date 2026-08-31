import { createSignal, onMount, onCleanup, type Accessor } from "solid-js";

export interface CreateWindowSizeReturn {
  /** Accessor for current window inner width in pixels */
  width: Accessor<number>;
  /** Accessor for current window inner height in pixels */
  height: Accessor<number>;
}

/**
 * SolidJS reactive primitive for tracking window viewport dimensions (width and height).
 */
export function createWindowSize(): CreateWindowSizeReturn {
  const [width, setWidth] = createSignal<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const [height, setHeight] = createSignal<number>(
    typeof window !== "undefined" ? window.innerHeight : 0
  );

  onMount(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    onCleanup(() => {
      window.removeEventListener("resize", handleResize);
    });
  });

  return {
    width,
    height,
  };
}
