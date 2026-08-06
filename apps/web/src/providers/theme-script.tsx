import { type Component } from "solid-js";

export interface ThemeScriptProps {
  /** Storage key namespace used in localStorage (default: "nikala-theme") */
  storageKey?: string;
  /** Initial default theme mode if no saved preference exists (default: "system") */
  defaultTheme?: "light" | "dark" | "system";
  /** Initial default primary accent color if no saved preference exists */
  defaultAccent?: string;
  /** Initial default border radius if no saved preference exists */
  defaultRadius?: string;
}

/**
 * Pre-hydration inline script executed synchronously before DOM paint to prevent theme flickering (anti-FOUC).
 */
export const ThemeScript: Component<ThemeScriptProps> = (props) => {
  const key = props.storageKey || "nikala-theme";
  const defTheme = props.defaultTheme || "system";
  const defAccent = props.defaultAccent || "";
  const defRadius = props.defaultRadius || "";

  const scriptText = `(function(){try{
  var key = '${key}';
  var mode = localStorage.getItem(key + '-mode') || '${defTheme}';
  var accent = localStorage.getItem(key + '-accent') || '${defAccent}';
  var radius = localStorage.getItem(key + '-radius') || '${defRadius}';

  var isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  var resolvedDark = mode === 'dark' || (mode === 'system' && isDark);

  var root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(resolvedDark ? 'dark' : 'light');
  root.style.colorScheme = resolvedDark ? 'dark' : 'light';

  var colorMap = {
    amber: resolvedDark ? '#fbbf24' : '#d97706',
    violet: resolvedDark ? '#8b5cf6' : '#7c3aed',
    sky: resolvedDark ? '#38bdf8' : '#0284c7',
    emerald: resolvedDark ? '#34d399' : '#059669',
    rose: resolvedDark ? '#fb7185' : '#e11d48',
    zinc: resolvedDark ? '#fafafa' : '#18181b'
  };

  if (accent && colorMap[accent]) {
    root.style.setProperty('--primary', colorMap[accent]);
  }

  if (radius) {
    var radVal = radius.endsWith('rem') ? radius : radius + 'rem';
    root.style.setProperty('--radius', radVal);
  }
}catch(e){}})();`;

  return <script innerHTML={scriptText} />;
};