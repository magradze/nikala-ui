// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {/* Google Search Console Verification for both domains */}
          <meta name="google-site-verification" content="ASH5Gq4EFSogT7EFI7mLFmoe2qH3AJTtC9aIsXVYXmo" />
          <meta name="google-site-verification" content="_kXfLspD07TOVsR6TupXFOrNYUBpy_Bkb03VAzOk0Gs" />
          <link rel="icon" href="/favicon.ico" />
          {/* Font Optimization & Preconnect */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
            rel="stylesheet"
          />
          {/* Synchronous Anti-FOUC Script to prevent any theme flickering */}
          <script
            innerHTML={`(function(){try{
              var key = 'nikala-docs-theme';
              var mode = localStorage.getItem(key + '-mode') || localStorage.getItem('nikala-theme-mode') || localStorage.getItem('theme') || 'system';
              var accent = localStorage.getItem(key + '-accent') || localStorage.getItem('nikala-theme-accent') || '';
              var radius = localStorage.getItem(key + '-radius') || localStorage.getItem('nikala-theme-radius') || '';
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
            }catch(e){}})();`}
          />
          {assets}
        </head>
        <body>
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
