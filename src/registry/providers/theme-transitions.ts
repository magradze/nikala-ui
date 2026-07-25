export type ThemeEffect = "none" | "circular" | "fade";

/**
 * Executes a theme change with the specified transition effect using the Web View Transitions API.
 *
 * @param effect - Desired transition animation ("none", "circular", "fade")
 * @param event - Mouse or Pointer event to calculate transition center coordinates
 * @param updateThemeCallback - Callback function performing the actual theme state change
 */
export function runThemeTransition(
  effect: ThemeEffect = "none",
  event: MouseEvent | undefined,
  updateThemeCallback: () => void
) {
  // Safe fallback if View Transitions API is unsupported or user prefers reduced motion
  if (
    effect === "none" ||
    typeof document === "undefined" ||
    !(document as any).startViewTransition ||
    window.matchMedia("(prefers-color-scheme: reduce)").matches
  ) {
    updateThemeCallback();
    return;
  }

  // Circular expanding ripple transition originating from click coordinates
  if (effect === "circular" && event) {
    const x = event.clientX;
    const y = event.clientY;

    // Calculate maximum radius to reach the furthest corner of the screen
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = (document as any).startViewTransition(() => {
      updateThemeCallback();
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];

      document.documentElement.animate(
        {
          clipPath: clipPath,
        },
        {
          duration: 500,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
    return;
  }

  // Standard smooth view transition fade
  if (effect === "fade") {
    (document as any).startViewTransition(() => {
      updateThemeCallback();
    });
    return;
  }

  // Default fallback
  updateThemeCallback();
}