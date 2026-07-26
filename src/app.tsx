// src/app.tsx
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { MetaProvider } from "@solidjs/meta";
import { ThemeProvider } from "@/providers/theme-provider";
import "./app.css";

/* --- Pre-hydration theme, accent color, and radius injector --- */
const themeScript = `(function(){try{
  var key = 'nikala-docs-theme';
  var raw = localStorage.getItem(key);
  var mode = 'system';
  var accent = '';
  var radius = '';

  /* Parse JSON payload or individual storage keys */
  if (raw) {
    if (raw.startsWith('{')) {
      var parsed = JSON.parse(raw);
      mode = parsed.theme || parsed.mode || 'system';
      accent = parsed.accent || '';
      radius = parsed.radius || '';
    } else {
      mode = raw;
    }
  }

  if (!accent) accent = localStorage.getItem(key + '-accent') || localStorage.getItem('nikala-accent') || '';
  if (!radius) radius = localStorage.getItem(key + '-radius') || localStorage.getItem('nikala-radius') || '';

  /* 1. Theme Mode (Dark/Light) */
  var isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  var activeDark = mode === 'dark' || ((!mode || mode === 'system') && isDark);
  if (activeDark) {
    document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = 'dark';
  } else {
    document.documentElement.classList.remove('dark');
    document.documentElement.style.colorScheme = 'light';
  }

  /* 2. Dynamic Accent Color Mapping */
  var colorMap = {
    wine: '#722f37',
    violet: '#7c3aed',
    sky: '#0284c7',
    emerald: '#059669',
    rose: '#e11d48',
    amber: '#d97706',
    zinc: activeDark ? '#fafafa' : '#18181b'
  };

  if (accent && colorMap[accent]) {
    document.documentElement.style.setProperty('--primary', colorMap[accent]);
    document.documentElement.style.setProperty('--ring', colorMap[accent]);
    document.documentElement.setAttribute('data-accent', accent);
  }

  /* 3. Border Radius */
  if (radius) {
    var radiusVal = radius.endsWith('rem') ? radius : radius + 'rem';
    document.documentElement.style.setProperty('--radius', radiusVal);
    document.documentElement.setAttribute('data-radius', radius);
  }
}catch(e){}})();`;

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          {/* Synchronously injects theme styles into documentElement before DOM paint */}
          <script innerHTML={themeScript} />

          <ThemeProvider defaultTheme="system" storageKey="nikala-docs-theme">
            <Suspense>{props.children}</Suspense>
          </ThemeProvider>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}