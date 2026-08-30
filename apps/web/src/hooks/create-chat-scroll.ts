import { createSignal, createEffect, onCleanup, onMount, type Accessor } from "solid-js";

export interface CreateChatScrollOptions {
  /** Target scrollable container element or accessor */
  target: HTMLElement | Accessor<HTMLElement | undefined>;
  /** Dependency accessor (e.g. messages length or content signal) that triggers auto-scroll when changed */
  trigger?: Accessor<any>;
  /** Threshold in pixels from bottom to consider the container "at bottom". Defaults to 40. */
  threshold?: number;
  /** Whether auto-scroll is enabled. Defaults to true. */
  enabled?: boolean | Accessor<boolean>;
  /** Scroll behavior: "smooth" or "auto". Defaults to "smooth". */
  behavior?: ScrollBehavior;
}

export interface CreateChatScrollReturn {
  /** Accessor indicating whether the container is currently scrolled to the bottom */
  isAtBottom: Accessor<boolean>;
  /** Accessor indicating whether user has manually scrolled up away from bottom */
  isScrolledUp: Accessor<boolean>;
  /** Programmatically scroll container directly to the bottom */
  scrollToBottom: (options?: { smooth?: boolean }) => void;
}

/**
 * SolidJS reactive primitive for chat and streaming message auto-scrolling with user scroll detection.
 *
 * @param options Chat scroll configuration options.
 */
export function createChatScroll(options: CreateChatScrollOptions): CreateChatScrollReturn {
  const [isAtBottom, setIsAtBottom] = createSignal<boolean>(true);
  const isScrolledUp = () => !isAtBottom();

  const getElement = (): HTMLElement | undefined => {
    if (typeof options.target === "function") {
      return (options.target as Accessor<HTMLElement | undefined>)();
    }
    return options.target;
  };

  const isEnabled = () => {
    if (typeof options.enabled === "function") {
      return (options.enabled as Accessor<boolean>)();
    }
    return options.enabled ?? true;
  };

  const threshold = options.threshold ?? 40;

  const checkIfAtBottom = () => {
    const el = getElement();
    if (!el) return true;
    const distanceToBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    return distanceToBottom <= threshold;
  };

  const scrollToBottom = (opts?: { smooth?: boolean }) => {
    const el = getElement();
    if (!el) return;

    const useSmooth = opts?.smooth ?? (options.behavior === "smooth" || options.behavior === undefined);

    el.scrollTo({
      top: el.scrollHeight,
      behavior: useSmooth ? "smooth" : "auto",
    });
    setIsAtBottom(true);
  };

  const handleScroll = () => {
    const atBottom = checkIfAtBottom();
    setIsAtBottom(atBottom);
  };

  onMount(() => {
    if (typeof window === "undefined") return;

    const el = getElement();
    if (el) {
      el.addEventListener("scroll", handleScroll, { passive: true });
      setIsAtBottom(checkIfAtBottom());
    }
  });

  onCleanup(() => {
    if (typeof window === "undefined") return;
    const el = getElement();
    if (el) {
      el.removeEventListener("scroll", handleScroll);
    }
  });

  // Watch trigger dependencies (e.g. messages length or stream tokens)
  if (options.trigger) {
    createEffect(() => {
      // Track trigger dependency
      options.trigger!();

      if (isEnabled() && isAtBottom()) {
        // Run after microtask/DOM paint
        setTimeout(() => {
          scrollToBottom({ smooth: true });
        }, 10);
      }
    });
  }

  return {
    isAtBottom,
    isScrolledUp,
    scrollToBottom,
  };
}
