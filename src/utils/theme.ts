export interface BasePalette {
  lightBg: string;
  lightFg: string;
  darkBg: string;
  darkFg: string;
  lightMuted: string;
  lightMutedFg: string;
  darkMuted: string;
  darkMutedFg: string;
  lightBorder: string;
  darkBorder: string;
  lightRing: string;
  darkRing: string;
}

export interface PrimaryColor {
  light: string;
  dark: string;
  lightFg: string;
  darkFg: string;
}

export const BASE_PALETTES: Record<string, BasePalette> = {
  zinc: {
    lightBg: "#ffffff",
    lightFg: "#09090b",
    darkBg: "#09090b",
    darkFg: "#fafafa",
    lightMuted: "#f4f4f5",
    lightMutedFg: "#71717a",
    darkMuted: "#27272a",
    darkMutedFg: "#a1a1aa",
    lightBorder: "#e4e4e7",
    darkBorder: "#27272a",
    lightRing: "#18181b",
    darkRing: "#d4d4d8",
  },
  slate: {
    lightBg: "#ffffff",
    lightFg: "#020617",
    darkBg: "#020617",
    darkFg: "#f8fafc",
    lightMuted: "#f1f5f9",
    lightMutedFg: "#64748b",
    darkMuted: "#1e293b",
    darkMutedFg: "#94a3b8",
    lightBorder: "#e2e8f0",
    darkBorder: "#1e293b",
    lightRing: "#0f172a",
    darkRing: "#cbd5e1",
  },
  gray: {
    lightBg: "#ffffff",
    lightFg: "#030712",
    darkBg: "#030712",
    darkFg: "#f9fafb",
    lightMuted: "#f3f4f6",
    lightMutedFg: "#6b7280",
    darkMuted: "#1f2937",
    darkMutedFg: "#9ca3af",
    lightBorder: "#e5e7eb",
    darkBorder: "#1f2937",
    lightRing: "#111827",
    darkRing: "#d1d5db",
  },
  neutral: {
    lightBg: "#ffffff",
    lightFg: "#0a0a0a",
    darkBg: "#0a0a0a",
    darkFg: "#fafafa",
    lightMuted: "#f5f5f5",
    lightMutedFg: "#737373",
    darkMuted: "#262626",
    darkMutedFg: "#a3a3a3",
    lightBorder: "#e5e5e5",
    darkBorder: "#262626",
    lightRing: "#171717",
    darkRing: "#d4d4d4",
  },
  stone: {
    lightBg: "#ffffff",
    lightFg: "#0c0a09",
    darkBg: "#0c0a09",
    darkFg: "#fafaf9",
    lightMuted: "#f5f5f4",
    lightMutedFg: "#78716c",
    darkMuted: "#292524",
    darkMutedFg: "#a8a29e",
    lightBorder: "#e7e5e4",
    darkBorder: "#292524",
    lightRing: "#1c1917",
    darkRing: "#d6d3d1",
  },
};

export const PRIMARY_COLORS: Record<string, PrimaryColor> = {
  wine: { light: "#722f37", dark: "#9e3b47", lightFg: "#ffffff", darkFg: "#ffffff" },
  violet: { light: "#7c3aed", dark: "#8b5cf6", lightFg: "#ffffff", darkFg: "#ffffff" },
  sky: { light: "#0284c7", dark: "#38bdf8", lightFg: "#ffffff", darkFg: "#0f172a" },
  emerald: { light: "#059669", dark: "#34d399", lightFg: "#ffffff", darkFg: "#052e16" },
  rose: { light: "#e11d48", dark: "#fb7185", lightFg: "#ffffff", darkFg: "#ffffff" },
  amber: { light: "#d97706", dark: "#fbbf24", lightFg: "#ffffff", darkFg: "#111827" },
  zinc: { light: "#18181b", dark: "#fafafa", lightFg: "#fafafa", darkFg: "#18181b" },
};

/**
 * Generates Tailwind CSS v4 theme variables based on base palette and primary accent color.
 */
export function generateThemeCss(baseColor: string = "zinc", primaryColor: string = "wine"): string {
  const base = BASE_PALETTES[baseColor] || BASE_PALETTES.zinc;
  const primary = PRIMARY_COLORS[primaryColor] || PRIMARY_COLORS.wine;

  return `@import "tailwindcss";

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
  --background: ${base.lightBg};
  --foreground: ${base.lightFg};
  --card: ${base.lightBg};
  --card-foreground: ${base.lightFg};
  --popover: ${base.lightBg};
  --popover-foreground: ${base.lightFg};
  --primary: ${primary.light};
  --primary-foreground: ${primary.lightFg};
  --secondary: ${base.lightMuted};
  --secondary-foreground: ${base.lightFg};
  --muted: ${base.lightMuted};
  --muted-foreground: ${base.lightMutedFg};
  --accent: ${base.lightMuted};
  --accent-foreground: ${base.lightFg};
  --destructive: #ef4444;
  --destructive-foreground: #ffffff;
  --border: ${base.lightBorder};
  --input: ${base.lightBorder};
  --ring: ${base.lightRing};
  --radius: 0.5rem;
}

.dark {
  color-scheme: dark;
  --background: ${base.darkBg};
  --foreground: ${base.darkFg};
  --card: ${base.darkBg};
  --card-foreground: ${base.darkFg};
  --popover: ${base.darkBg};
  --popover-foreground: ${base.darkFg};
  --primary: ${primary.dark};
  --primary-foreground: ${primary.darkFg};
  --secondary: ${base.darkMuted};
  --secondary-foreground: ${base.darkFg};
  --muted: ${base.darkMuted};
  --muted-foreground: ${base.darkMutedFg};
  --accent: ${base.darkMuted};
  --accent-foreground: ${base.darkFg};
  --destructive: #7f1d1d;
  --destructive-foreground: #ffffff;
  --border: ${base.darkBorder};
  --input: ${base.darkBorder};
  --ring: ${base.darkRing};
  --radius: 0.5rem;
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
`;
}