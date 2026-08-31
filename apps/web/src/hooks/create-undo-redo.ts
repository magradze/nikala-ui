import { createSignal, type Accessor } from "solid-js";

export interface CreateUndoRedoOptions<T> {
  /** Maximum number of history states to retain. Defaults to 50. */
  maxHistory?: number;
}

export interface CreateUndoRedoReturn<T> {
  /** Signal containing the current state value. */
  state: Accessor<T>;
  /** Update state value and append to history. */
  set: (nextState: T | ((prev: T) => T)) => void;
  /** Revert to previous state history entry. */
  undo: () => void;
  /** Advance to next state history entry. */
  redo: () => void;
  /** Signal indicating whether undo is available. */
  canUndo: Accessor<boolean>;
  /** Signal indicating whether redo is available. */
  canRedo: Accessor<boolean>;
  /** History stack of past states. */
  history: Accessor<T[]>;
  /** Reset history to initial state value. */
  reset: (initialState?: T) => void;
}

/**
 * SolidJS reactive primitive for undo/redo state history management.
 */
export function createUndoRedo<T>(
  initialValue: T | Accessor<T>,
  options: CreateUndoRedoOptions<T> = {}
): CreateUndoRedoReturn<T> {
  const getInitial = (): T => {
    return typeof initialValue === "function"
      ? (initialValue as Accessor<T>)()
      : initialValue;
  };

  const maxHistory = options.maxHistory ?? 50;

  const [history, setHistory] = createSignal<T[]>([getInitial()]);
  const [pointer, setPointer] = createSignal<number>(0);

  const state = (): T => history()[pointer()] ?? getInitial();

  const canUndo = (): boolean => pointer() > 0;
  const canRedo = (): boolean => pointer() < history().length - 1;

  const set = (nextState: T | ((prev: T) => T)): void => {
    const current = state();
    const resolved =
      typeof nextState === "function"
        ? (nextState as (prev: T) => T)(current)
        : nextState;

    if (Object.is(resolved, current)) return;

    /* Slice history up to current pointer and push new state */
    const sliced = history().slice(0, pointer() + 1);
    const updated = [...sliced, resolved];

    /* Trim to maxHistory limit */
    if (updated.length > maxHistory) {
      updated.shift();
    }

    setHistory(updated);
    setPointer(updated.length - 1);
  };

  const undo = (): void => {
    if (canUndo()) {
      setPointer((p) => p - 1);
    }
  };

  const redo = (): void => {
    if (canRedo()) {
      setPointer((p) => p + 1);
    }
  };

  const reset = (newInitial?: T): void => {
    const init = newInitial !== undefined ? newInitial : getInitial();
    setHistory([init]);
    setPointer(0);
  };

  return {
    state,
    set,
    undo,
    redo,
    canUndo,
    canRedo,
    history,
    reset,
  };
}
