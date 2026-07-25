import {
  createContext,
  createEffect,
  createSignal,
  onCleanup,
  onMount,
  useContext,
  type ParentComponent,
  type Accessor,
} from "solid-js";

export type Theme = "light" | "dark" | "system";
export type AccentColor = "wine" | "violet" | "sky" | "emerald" | "rose" | "amber" | "zinc";
export type Radius = "0" | "0.3" | "0.5" | "0.75" | "1.0";

export interface ThemeProviderProps {
  /** Initial default theme mode if no saved preference is found */
  defaultTheme?: Theme;
  /** Initial default accent color */
  defaultAccent?: AccentColor;
  /** Initial default border radius */
  defaultRadius?: Radius;
  /** Key used to store preferences in localStorage */
  storageKey?: string;
}

const ACCENT_COLORS: Record<
  AccentColor,
  { light: string; dark: string; lightFg: string; darkFg: string }
> = {
  wine: { light: "#722f37", dark: "#9e3b47", lightFg: "#ffffff", darkFg: "#ffffff" },
  violet: { light: "#7c3aed", dark: "#8b5cf6", lightFg: "#ffffff", darkFg: "#ffffff" },
  sky: { light: "#0284c7", dark: "#38bdf8", lightFg: "#ffffff", darkFg: "#0f172a" },
  emerald: { light: "#059669", dark: "#34d399", lightFg: "#ffffff", darkFg: "#052e16" },
  rose: { light: "#e11d48", dark: "#fb7185", lightFg: "#ffffff", darkFg: "#ffffff" },
  amber: { light: "#d97706", dark: "#fbbf24", lightFg: "#ffffff", darkFg: "#111827" },
  zinc: { light: "#18181b", dark: "#fafafa", lightFg: "#fafafa", darkFg: "#18181b" },
};

interface ThemeProviderContextValue {
  theme: Accessor<Theme>;
  setTheme: (theme: Theme) => void;
  accent: Accessor<AccentColor>;
  setAccent: (accent: AccentColor) => void;
  radius: Accessor<Radius>;
  setRadius: (radius: Radius) => void;
}

const ThemeProviderContext = createContext<ThemeProviderContextValue>();

/**
 * Context provider managing application dark/light/system theme state, accent colors, and border radius.
 */
export const ThemeProvider: ParentComponent<ThemeProviderProps> = (props) => {
  const storageKey = props.storageKey || "nikala-theme";
  const defaultTheme = props.defaultTheme || "system";
  const defaultAccent = props.defaultAccent || "wine";
  const defaultRadius = props.defaultRadius || "0.5";

  // Read initial values safely from localStorage
  const getInitialTheme = (): Theme => {
    if (typeof window === "undefined") return defaultTheme;
    try {
      const saved = localStorage.getItem(`${storageKey}-mode`);
      if (saved === "light" || saved === "dark" || saved === "system") return saved;
    } catch { }
    return defaultTheme;
  };

  const getInitialAccent = (): AccentColor => {
    if (typeof window === "undefined") return defaultAccent;
    try {
      const saved = localStorage.getItem(`${storageKey}-accent`);
      if (saved && ACCENT_COLORS[saved as AccentColor]) return saved as AccentColor;
    } catch { }
    return defaultAccent;
  };

  const getInitialRadius = (): Radius => {
    if (typeof window === "undefined") return defaultRadius;
    try {
      const saved = localStorage.getItem(`${storageKey}-radius`);
      if (saved) return saved as Radius;
    } catch { }
    return defaultRadius;
  };

  const [theme, setThemeSignal] = createSignal<Theme>(getInitialTheme());
  const [accent, setAccentSignal] = createSignal<AccentColor>(getInitialAccent());
  const [radius, setRadiusSignal] = createSignal<Radius>(getInitialRadius());

  // Applies classes and CSS variables for theme mode, accent color, and border radius
  const applyTheme = (targetTheme: Theme, currentAccent: AccentColor, currentRadius: Radius) => {
    if (typeof window === "undefined") return;

    const root = document.documentElement;
    root.classList.remove("light", "dark");

    let resolvedDark = false;
    if (targetTheme === "system") {
      resolvedDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.add(resolvedDark ? "dark" : "light");
    } else {
      resolvedDark = targetTheme === "dark";
      root.classList.add(targetTheme);
    }

    // Update CSS custom properties for theme dynamic accents & border radius
    const accentData = ACCENT_COLORS[currentAccent] || ACCENT_COLORS.wine;
    const primaryHex = resolvedDark ? accentData.dark : accentData.light;
    const primaryFgHex = resolvedDark ? accentData.darkFg : accentData.lightFg;

    root.style.setProperty("--primary", primaryHex);
    root.style.setProperty("--primary-foreground", primaryFgHex);
    root.style.setProperty("--radius", `${currentRadius}rem`);
  };

  // Reactively apply theme updates and store in localStorage
  createEffect(() => {
    const t = theme();
    const a = accent();
    const r = radius();

    applyTheme(t, a, r);

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(`${storageKey}-mode`, t);
        localStorage.setItem(`${storageKey}-accent`, a);
        localStorage.setItem(`${storageKey}-radius`, r);
      } catch { }
    }
  });

  onMount(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemChange = (e: MediaQueryListEvent) => {
      if (theme() === "system") {
        const root = document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(e.matches ? "dark" : "light");

        const accentData = ACCENT_COLORS[accent()] || ACCENT_COLORS.wine;
        const primaryHex = e.matches ? accentData.dark : accentData.light;
        const primaryFgHex = e.matches ? accentData.darkFg : accentData.lightFg;

        root.style.setProperty("--primary", primaryHex);
        root.style.setProperty("--primary-foreground", primaryFgHex);
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleSystemChange);
    } else if ("addListener" in mediaQuery) {
      (mediaQuery as any).addListener(handleSystemChange);
    }

    onCleanup(() => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleSystemChange);
      } else if ("removeListener" in mediaQuery) {
        (mediaQuery as any).removeListener(handleSystemChange);
      }
    });
  });

  const value: ThemeProviderContextValue = {
    theme,
    setTheme: (newTheme: Theme) => setThemeSignal(newTheme),
    accent,
    setAccent: (newAccent: AccentColor) => setAccentSignal(newAccent),
    radius,
    setRadius: (newRadius: Radius) => setRadiusSignal(newRadius),
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {props.children}
    </ThemeProviderContext.Provider>
  );
};

/**
 * Accesses Nikala UI theme state, accent colors, border radius, and update functions.
 */
export function useTheme(): ThemeProviderContextValue {
  const context = useContext(ThemeProviderContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}