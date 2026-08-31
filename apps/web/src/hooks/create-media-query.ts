import { createEffect, createSignal, onCleanup, type Accessor } from "solid-js";

export const DEFAULT_BREAKPOINTS = {
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)",
  "2xl": "(min-width: 1536px)",
};

/**
 * SolidJS reactive primitive for tracking CSS media query match state.
 *
 * @param query Media query string or accessor returning media query string.
 */
export function createMediaQuery(query: string | Accessor<string>): Accessor<boolean> {
  const getQuery = (): string => {
    return typeof query === "function" ? query() : query;
  };

  const [matches, setMatches] = createSignal<boolean>(false);

  createEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) {
      setMatches(false);
      return;
    }

    const currentQuery = getQuery();
    const mediaQueryList = window.matchMedia(currentQuery);

    setMatches(mediaQueryList.matches);

    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener("change", listener);
      onCleanup(() => mediaQueryList.removeEventListener("change", listener));
    } else {
      mediaQueryList.addListener(listener);
      onCleanup(() => mediaQueryList.removeListener(listener));
    }
  });

  return matches;
}

export interface CreateBreakpointReturn {
  /** Accessor returning active breakpoint key (e.g. 'sm', 'md', 'lg') */
  active: Accessor<string>;
  /** Accessor indicating if screen width matches mobile (<768px) */
  isMobile: Accessor<boolean>;
  /** Accessor indicating if screen width matches tablet (768px - 1024px) */
  isTablet: Accessor<boolean>;
  /** Accessor indicating if screen width matches desktop (>=1024px) */
  isDesktop: Accessor<boolean>;
}

/**
 * SolidJS reactive primitive for tracking responsive Tailwind CSS design breakpoints.
 *
 * @param customBreakpoints Custom breakpoint definitions mapping key names to media query strings.
 */
export function createBreakpoint(
  customBreakpoints: Record<string, string> = DEFAULT_BREAKPOINTS
): CreateBreakpointReturn {
  const isSm = createMediaQuery(customBreakpoints.sm || DEFAULT_BREAKPOINTS.sm);
  const isMd = createMediaQuery(customBreakpoints.md || DEFAULT_BREAKPOINTS.md);
  const isLg = createMediaQuery(customBreakpoints.lg || DEFAULT_BREAKPOINTS.lg);
  const isXl = createMediaQuery(customBreakpoints.xl || DEFAULT_BREAKPOINTS.xl);
  const is2Xl = createMediaQuery(customBreakpoints["2xl"] || DEFAULT_BREAKPOINTS["2xl"]);

  const active = (): string => {
    if (is2Xl()) return "2xl";
    if (isXl()) return "xl";
    if (isLg()) return "lg";
    if (isMd()) return "md";
    if (isSm()) return "sm";
    return "xs";
  };

  const isMobile = (): boolean => !isMd();
  const isTablet = (): boolean => isMd() && !isLg();
  const isDesktop = (): boolean => isLg();

  return {
    active,
    isMobile,
    isTablet,
    isDesktop,
  };
}
