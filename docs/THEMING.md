# Nikala UI — Theming & Color System Guide

Nikala UI implements a semantic, CSS-variable-driven theming architecture designed natively for Tailwind CSS v4. This document provides complete technical specifications for configuring, switching, and dynamically customizing application themes, brand accent colors, border radius, and view transition animations.

---

## 1. Core Architecture

The theming engine in Nikala UI rests on three main architectural layers:

1. **Tailwind CSS v4 `@theme inline` Tokens:** Maps semantic utility names (`bg-primary`, `bg-card`, `border-border`, `text-muted-foreground`) to CSS variables.
2. **CSS Custom Properties (`:root` and `.dark`):** Holds exact color hex values for light and dark color schemes, respecting system preferences and dark mode toggles.
3. **Runtime State Management (`ThemeProvider`):** Controls class switching (`.dark` / `.light`) on `document.documentElement`, handles `localStorage` persistence, and executes View Transition animations.

---

## 2. CLI Theme Commands

You can configure or switch theme palettes directly from the command line using the `nikala theme` CLI suite.

### Interactive Mode

To open an interactive terminal menu for selecting base gray palettes and primary brand colors:

```bash
nikala theme
# or
nikala theme set
```

### Direct Command Mode

To update theme variables programmatically without interactive prompts:

```bash
# Set primary accent color (defaults base gray palette to existing configuration)
nikala theme set sky

# Set both primary accent color and base gray palette
nikala theme set wine slate
```

### Supported Color Palettes

#### Base Gray Palettes

- **`zinc`** — Modern cool gray (Default)
- **`slate`** — Slightly blue-tinted slate gray
- **`gray`** — Neutral gray
- **`neutral`** — Warm neutral gray
- **`stone`** — Earthy stone gray

#### Primary Brand Accent Colors

- **`wine`** — Pirosmani signature Qvevri red (`#722f37`)
- **`violet`** — Deep purple (`#7c3aed`)
- **`sky`** — Vibrant blue (`#0284c7`)
- **`emerald`** — Rich emerald green (`#059669`)
- **`rose`** — Vivid rose pink (`#e11d48`)
- **`amber`** — Warm gold amber (`#d97706`)
- **`zinc`** — Monochrome dark/light (`#18181b`)

---

## 3. Runtime Theme Manager (`theme-manager`)

Nikala UI provides a zero-dependency runtime theme management component suite.

To add the Theme Manager to your project:

```bash
nikala add theme-manager
```

This command generates two files in your workspace:

- `src/providers/theme-provider.tsx` — Logic provider & `useTheme()` hook.
- `src/components/ui/theme-toggle.tsx` — UI switcher button component.

### Setting Up `ThemeProvider`

Wrap your application root component (e.g., `src/App.tsx` or `src/app.tsx` in SolidStart) with `ThemeProvider`:

```tsx
import { ThemeProvider } from "@/providers/theme-provider";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="nikala-theme">
      <div class="min-h-screen bg-background text-foreground">
        <header class="flex items-center justify-between p-4 border-b border-border">
          <h1>Application Title</h1>
          <ThemeToggle mode="max" effect="circular" />
        </header>
      </div>
    </ThemeProvider>
  );
}
```

#### `ThemeProvider` Component API

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `defaultTheme` | `"light" \| "dark" \| "system"` | `"system"` | Default theme mode on initial load if no saved preference exists. |
| `defaultAccent` | `AccentColor` | `undefined` | Optional default primary accent color override. |
| `defaultRadius` | `Radius` | `undefined` | Optional default border radius override. |
| `storageKey` | `string` | `"nikala-theme"` | Namespace key used for `localStorage` persistence. |

---

### `ThemeToggle` UI Component API

The `ThemeToggle` component supports two distinct presentation modes and multiple Web View Transition animations.

```tsx
// Compact mode with circular ripple animation
<ThemeToggle mode="mini" effect="circular" />

// Full customizer panel mode with smooth fade transition
<ThemeToggle mode="max" effect="fade" />
```

#### `ThemeToggle` Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `mode` | `"mini" \| "max"` | `"mini"` | Presentation mode: `"mini"` renders a simple dropdown; `"max"` renders a full customization panel. |
| `effect` | `"none" \| "circular" \| "fade"` | `"none"` | View Transition animation effect when toggling theme modes. |

#### View Transition Effects

- **`"none"`** — Instantaneous theme change without transition animation.
- **`"circular"`** — Expands a smooth circular clip-path ripple from the exact pointer click coordinates using the Web View Transitions API.
- **`"fade"`** — Executes a 350ms opacity cross-fade across the entire viewport.

---

## 4. `useTheme()` Hook API

Inside any child component wrapped by `ThemeProvider`, access or modify theme parameters using `useTheme()`:

```tsx
import { useTheme } from "@/providers/theme-provider";

export function CustomControls() {
  const { theme, setTheme, accent, setAccent, radius, setRadius } = useTheme();

  return (
    <div>
      <button onClick={() => setTheme("dark")}>Dark Mode</button>
      <button onClick={() => setAccent("emerald")}>Emerald Accent</button>
      <button onClick={() => setRadius("0.75")}>Large Radius</button>
    </div>
  );
}
```

---

## 5. CSS Tokens Reference

When `nikala init` or `nikala theme set` runs, it outputs standard CSS variables to your primary CSS file (`src/index.css` or `src/app.css`):

```css
@import "tailwindcss";

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --radius-lg: var(--radius);
  --radius-md: calc(var(--radius) - 2px);
  --radius-sm: calc(var(--radius) - 4px);
}

:root {
  color-scheme: light;
  /* Light theme color definitions */
}

.dark {
  color-scheme: dark;
  /* Dark theme color definitions */
}

@layer base {
  * {
    border-color: var(--border);
  }
  body {
    background-color: var(--background);
    color: var(--foreground);
  }
}
```
