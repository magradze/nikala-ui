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
              var key = 'nikala-theme';
              var mode = localStorage.getItem(key + '-mode') || localStorage.getItem('nikala-docs-theme-mode') || localStorage.getItem('theme') || 'system';
              var accent = localStorage.getItem(key + '-accent') || localStorage.getItem('nikala-docs-theme-accent') || '';
              var radius = localStorage.getItem(key + '-radius') || localStorage.getItem('nikala-docs-theme-radius') || '';
              var isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              var resolvedDark = mode === 'dark' || (mode === 'system' && isDark);
              var root = document.documentElement;
              root.classList.remove('light', 'dark');
              root.classList.add(resolvedDark ? 'dark' : 'light');
              root.style.colorScheme = resolvedDark ? 'dark' : 'light';
              var colorMap = {
                yellow: {
                  primary: resolvedDark ? 'oklch(0.852 0.199 91.936)' : 'oklch(0.795 0.184 86.047)',
                  foreground: 'oklch(0.145 0 0)'
                },
                red: {
                  primary: resolvedDark ? 'oklch(0.637 0.237 25.331)' : 'oklch(0.577 0.245 27.325)',
                  foreground: 'oklch(0.985 0 0)'
                },
                violet: {
                  primary: resolvedDark ? 'oklch(0.606 0.25 292.717)' : 'oklch(0.541 0.281 293.009)',
                  foreground: 'oklch(0.985 0 0)'
                },
                sky: {
                  primary: resolvedDark ? 'oklch(0.672 0.154 238.29)' : 'oklch(0.588 0.158 241.966)',
                  foreground: resolvedDark ? 'oklch(0.145 0 0)' : 'oklch(0.985 0 0)'
                },
                emerald: {
                  primary: resolvedDark ? 'oklch(0.696 0.17 162.48)' : 'oklch(0.596 0.145 163.225)',
                  foreground: resolvedDark ? 'oklch(0.145 0 0)' : 'oklch(0.985 0 0)'
                },
                zinc: {
                  primary: resolvedDark ? 'oklch(0.985 0 0)' : 'oklch(0.205 0 0)',
                  foreground: resolvedDark ? 'oklch(0.205 0 0)' : 'oklch(0.985 0 0)'
                }
              };
              if (accent && colorMap[accent]) {
                root.style.setProperty('--primary', colorMap[accent].primary);
                root.style.setProperty('--primary-foreground', colorMap[accent].foreground);
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
