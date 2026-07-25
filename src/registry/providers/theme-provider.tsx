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

export interface ThemeProviderProps {
  /** Initial default theme if no saved preference is found in localStorage */
  defaultTheme?: Theme;
  /** Key used to store theme preference in localStorage */
  storageKey?: string;
}

interface ThemeProviderContextValue {
  /** Current requested theme state ("light", "dark", or "system") */
  theme: Accessor<Theme>;
  /** Function to update the active theme preference */
  setTheme: (theme: Theme) => void;
}

const ThemeProviderContext = createContext<ThemeProviderContextValue>();

/**
 * Context provider managing application dark/light/system theme state and HTML root classes.
 */
export const ThemeProvider: ParentComponent<ThemeProviderProps> = (props) => {
  const storageKey = props.storageKey || "nikala-theme";
  const defaultTheme = props.defaultTheme || "system";

  // Safely read initial theme from localStorage if running in browser context
  const getInitialTheme = (): Theme => {
    if (typeof window === "undefined") return defaultTheme;
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved === "light" || saved === "dark" || saved === "system") {
        return saved;
      }
    } catch {
      // Ignore localStorage access errors
    }
    return defaultTheme;
  };

  const [theme, setThemeSignal] = createSignal<Theme>(getInitialTheme());

  // Applies or removes .dark and .light classes on document.documentElement (<html>)
  const applyTheme = (targetTheme: Theme) => {
    if (typeof window === "undefined") return;

    const root = document.documentElement;
    root.classList.remove("light", "dark");

    if (targetTheme === "system") {
      const systemIsDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.add(systemIsDark ? "dark" : "light");
    } else {
      root.classList.add(targetTheme);
    }
  };

  // Reactively apply theme changes and store selection in localStorage
  createEffect(() => {
    const currentTheme = theme();
    applyTheme(currentTheme);

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(storageKey, currentTheme);
      } catch {
        // Ignore localStorage write errors
      }
    }
  });

  onMount(() => {
    if (typeof window === "undefined") return;

    // Real-time listener for OS system theme preference changes using MediaQueryListEvent
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemChange = (e: MediaQueryListEvent) => {
      if (theme() === "system") {
        const root = document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(e.matches ? "dark" : "light");
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

  const setTheme = (newTheme: Theme) => {
    setThemeSignal(newTheme);
  };

  const value: ThemeProviderContextValue = {
    theme,
    setTheme,
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {props.children}
    </ThemeProviderContext.Provider>
  );
};

/**
 * Accesses Nikala UI theme state and update functions.
 */
export function useTheme(): ThemeProviderContextValue {
  const context = useContext(ThemeProviderContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}