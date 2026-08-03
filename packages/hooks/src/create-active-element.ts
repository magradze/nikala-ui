import { createSignal, onMount, onCleanup, type Accessor } from "solid-js";
import { isServer } from "solid-js/web";

export interface CreateActiveElementReturn {
  /** Accessor returning the currently focused DOM element, or null */
  activeElement: Accessor<Element | null>;
  /** Accessor returning true if any element (non-body) is focused */
  hasFocus: Accessor<boolean>;
}

/**
 * SolidJS reactive primitive for tracking the currently focused (active) DOM element.
 * Listens to focus/blur events on the document and reactively updates `activeElement` and `hasFocus`.
 */
export function createActiveElement(): CreateActiveElementReturn {
  // SSR: return static defaults
  if (isServer) {
    const [activeElement] = createSignal<Element | null>(null);
    const [hasFocus] = createSignal(false);
    return { activeElement, hasFocus };
  }

  const [activeElement, setActiveElement] = createSignal<Element | null>(null);

  const hasFocus = () => {
    const el = activeElement();
    return el !== null && el !== document.body;
  };

  const handleFocusChange = () => {
    setActiveElement(document.activeElement);
  };

  onMount(() => {
    // Set initial value
    setActiveElement(document.activeElement);

    document.addEventListener("focusin", handleFocusChange, true);
    document.addEventListener("focusout", handleFocusChange, true);

    onCleanup(() => {
      document.removeEventListener("focusin", handleFocusChange, true);
      document.removeEventListener("focusout", handleFocusChange, true);
    });
  });

  return {
    activeElement,
    hasFocus,
  };
}
