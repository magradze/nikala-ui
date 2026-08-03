import { createEffect, createSignal, type Accessor } from "solid-js";

/**
 * SolidJS reactive primitive for tracking previous value of a signal accessor.
 *
 * @param source Target reactive signal accessor to observe.
 */
export function createPrevious<T>(source: Accessor<T>): Accessor<T | undefined> {
  const [previous, setPrevious] = createSignal<T | undefined>(undefined);
  let current: T = source();

  createEffect(() => {
    const next = source();
    if (current !== next) {
      setPrevious(() => current);
      current = next;
    }
  });

  return previous;
}
