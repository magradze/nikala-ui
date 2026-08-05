export interface BasePalette {
  lightBg: string;
  lightFg: string;
  darkBg: string;
  darkFg: string;
  lightCard: string;
  darkCard: string;
  lightPopover: string;
  darkPopover: string;
  lightMuted: string;
  lightMutedFg: string;
  darkMuted: string;
  darkMutedFg: string;
  lightAccent: string;
  darkAccent: string;
  lightBorder: string;
  darkBorder: string;
  lightInput: string;
  darkInput: string;
  lightRing: string;
  darkRing: string;
  lightSidebar: string;
  darkSidebar: string;
  lightSidebarBorder: string;
  darkSidebarBorder: string;
}

export interface PrimaryColor {
  light: string;
  dark: string;
  lightFg: string;
  darkFg: string;
  charts: {
    chart1: string;
    chart2: string;
    chart3: string;
    chart4: string;
    chart5: string;
  };
}

export const BASE_PALETTES: Record<string, BasePalette> = {
  zinc: {
    lightBg: "oklch(1 0 0)",
    lightFg: "oklch(0.1450 0 0)",
    darkBg: "oklch(0.1450 0 0)",
    darkFg: "oklch(0.9850 0 0)",
    lightCard: "oklch(1 0 0)",
    darkCard: "oklch(0.2050 0 0)",
    lightPopover: "oklch(1 0 0)",
    darkPopover: "oklch(0.2690 0 0)",
    lightMuted: "oklch(0.9700 0 0)",
    lightMutedFg: "oklch(0.5560 0 0)",
    darkMuted: "oklch(0.2690 0 0)",
    darkMutedFg: "oklch(0.7080 0 0)",
    lightAccent: "oklch(0.9700 0 0)",
    darkAccent: "oklch(0.3710 0 0)",
    lightBorder: "oklch(0.9220 0 0)",
    darkBorder: "oklch(0.2750 0 0)",
    lightInput: "oklch(0.9220 0 0)",
    darkInput: "oklch(0.3250 0 0)",
    lightRing: "oklch(0.7080 0 0)",
    darkRing: "oklch(0.5560 0 0)",
    lightSidebar: "oklch(0.9850 0 0)",
    darkSidebar: "oklch(0.2050 0 0)",
    lightSidebarBorder: "oklch(0.9220 0 0)",
    darkSidebarBorder: "oklch(0.2750 0 0)",
  },
  slate: {
    lightBg: "oklch(1 0 0)",
    lightFg: "oklch(0.13 0.028 261.692)",
    darkBg: "oklch(0.13 0.028 261.692)",
    darkFg: "oklch(0.985 0.002 247.839)",
    lightCard: "oklch(1 0 0)",
    darkCard: "oklch(0.18 0.025 261.692)",
    lightPopover: "oklch(1 0 0)",
    darkPopover: "oklch(0.24 0.025 261.692)",
    lightMuted: "oklch(0.965 0.007 247.896)",
    lightMutedFg: "oklch(0.552 0.016 285.938)",
    darkMuted: "oklch(0.24 0.025 261.692)",
    darkMutedFg: "oklch(0.704 0.015 286.067)",
    lightAccent: "oklch(0.965 0.007 247.896)",
    darkAccent: "oklch(0.34 0.025 261.692)",
    lightBorder: "oklch(0.92 0.008 286.32)",
    darkBorder: "oklch(0.27 0.02 261.692)",
    lightInput: "oklch(0.92 0.008 286.32)",
    darkInput: "oklch(0.32 0.02 261.692)",
    lightRing: "oklch(0.7 0.015 286.067)",
    darkRing: "oklch(0.55 0.016 285.938)",
    lightSidebar: "oklch(0.985 0.002 247.839)",
    darkSidebar: "oklch(0.18 0.025 261.692)",
    lightSidebarBorder: "oklch(0.92 0.008 286.32)",
    darkSidebarBorder: "oklch(0.27 0.02 261.692)",
  },
  gray: {
    lightBg: "oklch(1 0 0)",
    lightFg: "oklch(0.141 0.005 285.823)",
    darkBg: "oklch(0.141 0.005 285.823)",
    darkFg: "oklch(0.985 0 0)",
    lightCard: "oklch(1 0 0)",
    darkCard: "oklch(0.205 0.005 285.823)",
    lightPopover: "oklch(1 0 0)",
    darkPopover: "oklch(0.269 0.005 285.823)",
    lightMuted: "oklch(0.967 0.001 286.375)",
    lightMutedFg: "oklch(0.552 0.016 285.938)",
    darkMuted: "oklch(0.269 0.005 285.823)",
    darkMutedFg: "oklch(0.707 0.004 286.32)",
    lightAccent: "oklch(0.967 0.001 286.375)",
    darkAccent: "oklch(0.371 0.005 285.823)",
    lightBorder: "oklch(0.92 0.004 286.32)",
    darkBorder: "oklch(0.275 0.005 285.823)",
    lightInput: "oklch(0.92 0.004 286.32)",
    darkInput: "oklch(0.325 0.005 285.823)",
    lightRing: "oklch(0.707 0.004 286.32)",
    darkRing: "oklch(0.552 0.016 285.938)",
    lightSidebar: "oklch(0.985 0 0)",
    darkSidebar: "oklch(0.205 0.005 285.823)",
    lightSidebarBorder: "oklch(0.92 0.004 286.32)",
    darkSidebarBorder: "oklch(0.275 0.005 285.823)",
  },
  neutral: {
    lightBg: "oklch(1 0 0)",
    lightFg: "oklch(0.145 0 0)",
    darkBg: "oklch(0.145 0 0)",
    darkFg: "oklch(0.985 0 0)",
    lightCard: "oklch(1 0 0)",
    darkCard: "oklch(0.205 0 0)",
    lightPopover: "oklch(1 0 0)",
    darkPopover: "oklch(0.269 0 0)",
    lightMuted: "oklch(0.970 0 0)",
    lightMutedFg: "oklch(0.556 0 0)",
    darkMuted: "oklch(0.269 0 0)",
    darkMutedFg: "oklch(0.708 0 0)",
    lightAccent: "oklch(0.970 0 0)",
    darkAccent: "oklch(0.371 0 0)",
    lightBorder: "oklch(0.922 0 0)",
    darkBorder: "oklch(0.275 0 0)",
    lightInput: "oklch(0.922 0 0)",
    darkInput: "oklch(0.325 0 0)",
    lightRing: "oklch(0.708 0 0)",
    darkRing: "oklch(0.556 0 0)",
    lightSidebar: "oklch(0.985 0 0)",
    darkSidebar: "oklch(0.205 0 0)",
    lightSidebarBorder: "oklch(0.922 0 0)",
    darkSidebarBorder: "oklch(0.275 0 0)",
  },
  stone: {
    lightBg: "oklch(1 0 0)",
    lightFg: "oklch(0.147 0.004 49.25)",
    darkBg: "oklch(0.147 0.004 49.25)",
    darkFg: "oklch(0.985 0.001 106.423)",
    lightCard: "oklch(1 0 0)",
    darkCard: "oklch(0.216 0.006 56.043)",
    lightPopover: "oklch(1 0 0)",
    darkPopover: "oklch(0.274 0.006 56.043)",
    lightMuted: "oklch(0.967 0.003 91.685)",
    lightMutedFg: "oklch(0.553 0.013 58.071)",
    darkMuted: "oklch(0.274 0.006 56.043)",
    darkMutedFg: "oklch(0.709 0.01 56.259)",
    lightAccent: "oklch(0.967 0.003 91.685)",
    darkAccent: "oklch(0.374 0.007 56.043)",
    lightBorder: "oklch(0.923 0.003 48.717)",
    darkBorder: "oklch(0.279 0.006 56.043)",
    lightInput: "oklch(0.923 0.003 48.717)",
    darkInput: "oklch(0.329 0.006 56.043)",
    lightRing: "oklch(0.709 0.01 56.259)",
    darkRing: "oklch(0.553 0.013 58.071)",
    lightSidebar: "oklch(0.985 0.001 106.423)",
    darkSidebar: "oklch(0.216 0.006 56.043)",
    lightSidebarBorder: "oklch(0.923 0.003 48.717)",
    darkSidebarBorder: "oklch(0.279 0.006 56.043)",
  },
};

export const PRIMARY_COLORS: Record<string, PrimaryColor> = {
  wine: {
    light: "oklch(0.4 0.09 15.0)",
    dark: "oklch(0.4 0.09 15.0)",
    lightFg: "oklch(0.9850 0 0)",
    darkFg: "oklch(0.9850 0 0)",
    charts: {
      chart1: "oklch(0.55 0.18 15)",
      chart2: "oklch(0.65 0.15 25)",
      chart3: "oklch(0.45 0.12 350)",
      chart4: "oklch(0.75 0.10 35)",
      chart5: "oklch(0.35 0.08 10)",
    },
  },
  violet: {
    light: "oklch(0.55 0.22 285)",
    dark: "oklch(0.65 0.2 285)",
    lightFg: "oklch(0.9850 0 0)",
    darkFg: "oklch(0.9850 0 0)",
    charts: {
      chart1: "oklch(0.65 0.22 285)",
      chart2: "oklch(0.55 0.19 260)",
      chart3: "oklch(0.75 0.15 310)",
      chart4: "oklch(0.45 0.16 270)",
      chart5: "oklch(0.85 0.10 290)",
    },
  },
  sky: {
    light: "oklch(0.6 0.16 230)",
    dark: "oklch(0.7 0.14 230)",
    lightFg: "oklch(0.9850 0 0)",
    darkFg: "oklch(0.1450 0 0)",
    charts: {
      chart1: "oklch(0.7 0.16 230)",
      chart2: "oklch(0.6 0.14 210)",
      chart3: "oklch(0.5 0.15 250)",
      chart4: "oklch(0.8 0.10 220)",
      chart5: "oklch(0.4 0.12 240)",
    },
  },
  emerald: {
    light: "oklch(0.55 0.18 160)",
    dark: "oklch(0.65 0.16 160)",
    lightFg: "oklch(0.9850 0 0)",
    darkFg: "oklch(0.1450 0 0)",
    charts: {
      chart1: "oklch(0.65 0.18 160)",
      chart2: "oklch(0.55 0.15 140)",
      chart3: "oklch(0.45 0.16 175)",
      chart4: "oklch(0.75 0.12 150)",
      chart5: "oklch(0.35 0.10 165)",
    },
  },
  rose: {
    light: "oklch(0.55 0.22 15)",
    dark: "oklch(0.65 0.2 15)",
    lightFg: "oklch(0.9850 0 0)",
    darkFg: "oklch(0.9850 0 0)",
    charts: {
      chart1: "oklch(0.65 0.22 15)",
      chart2: "oklch(0.55 0.18 350)",
      chart3: "oklch(0.75 0.16 25)",
      chart4: "oklch(0.45 0.15 5)",
      chart5: "oklch(0.85 0.10 30)",
    },
  },
  amber: {
    light: "oklch(0.65 0.18 70)",
    dark: "oklch(0.75 0.16 70)",
    lightFg: "oklch(0.9850 0 0)",
    darkFg: "oklch(0.1450 0 0)",
    charts: {
      chart1: "oklch(0.75 0.18 70)",
      chart2: "oklch(0.65 0.16 50)",
      chart3: "oklch(0.55 0.15 85)",
      chart4: "oklch(0.85 0.12 60)",
      chart5: "oklch(0.45 0.14 75)",
    },
  },
  zinc: {
    light: "oklch(0.2050 0 0)",
    dark: "oklch(0.9850 0 0)",
    lightFg: "oklch(0.9850 0 0)",
    darkFg: "oklch(0.1450 0 0)",
    charts: {
      chart1: "oklch(0.8100 0.1000 252)",
      chart2: "oklch(0.6200 0.1900 260)",
      chart3: "oklch(0.5500 0.2200 263)",
      chart4: "oklch(0.4900 0.2200 264)",
      chart5: "oklch(0.4200 0.1800 266)",
    },
  },
};

/**
 * Generates Tailwind CSS v4 theme variables matching tweakcn specification.
 */
export function generateThemeCss(baseColor: string = "zinc", primaryColor: string = "wine"): string {
  const base = BASE_PALETTES[baseColor] || BASE_PALETTES.zinc;
  const primary = PRIMARY_COLORS[primaryColor] || PRIMARY_COLORS.wine;

  return `@import "tailwindcss";

@custom-variant dark (&:is(.dark *));

:root {
  --background: ${base.lightBg};
  --foreground: ${base.lightFg};
  --card: ${base.lightCard};
  --card-foreground: ${base.lightFg};
  --popover: ${base.lightPopover};
  --popover-foreground: ${base.lightFg};
  --primary: ${primary.light};
  --primary-foreground: ${primary.lightFg};
  --secondary: ${base.lightMuted};
  --secondary-foreground: ${base.lightFg};
  --muted: ${base.lightMuted};
  --muted-foreground: ${base.lightMutedFg};
  --accent: ${base.lightAccent};
  --accent-foreground: ${base.lightFg};
  --destructive: oklch(0.5770 0.2450 27.3250);
  --destructive-foreground: oklch(1 0 0);
  --border: ${base.lightBorder};
  --input: ${base.lightInput};
  --ring: ${base.lightRing};
  --chart-1: ${primary.charts.chart1};
  --chart-2: ${primary.charts.chart2};
  --chart-3: ${primary.charts.chart3};
  --chart-4: ${primary.charts.chart4};
  --chart-5: ${primary.charts.chart5};
  --sidebar: ${base.lightSidebar};
  --sidebar-foreground: ${base.lightFg};
  --sidebar-primary: ${primary.light};
  --sidebar-primary-foreground: ${primary.lightFg};
  --sidebar-accent: ${base.lightMuted};
  --sidebar-accent-foreground: ${base.lightFg};
  --sidebar-border: ${base.lightSidebarBorder};
  --sidebar-ring: ${base.lightRing};
  --font-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  --font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  --radius: 0.625rem;
  --shadow-x: 0;
  --shadow-y: 1px;
  --shadow-blur: 3px;
  --shadow-spread: 0px;
  --shadow-opacity: 0.1;
  --shadow-color: oklch(0 0 0);
  --shadow-2xs: 0 1px 3px 0px hsl(0 0% 0% / 0.05);
  --shadow-xs: 0 1px 3px 0px hsl(0 0% 0% / 0.05);
  --shadow-sm: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10);
  --shadow: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10);
  --shadow-md: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 2px 4px -1px hsl(0 0% 0% / 0.10);
  --shadow-lg: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 4px 6px -1px hsl(0 0% 0% / 0.10);
  --shadow-xl: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 8px 10px -1px hsl(0 0% 0% / 0.10);
  --shadow-2xl: 0 1px 3px 0px hsl(0 0% 0% / 0.25);
  --tracking-normal: 0em;
  --spacing: 0.25rem;
}

.dark {
  --background: ${base.darkBg};
  --foreground: ${base.darkFg};
  --card: ${base.darkCard};
  --card-foreground: ${base.darkFg};
  --popover: ${base.darkPopover};
  --popover-foreground: ${base.darkFg};
  --primary: ${primary.dark};
  --primary-foreground: ${primary.darkFg};
  --secondary: ${base.darkMuted};
  --secondary-foreground: ${base.darkFg};
  --muted: ${base.darkMuted};
  --muted-foreground: ${base.darkMutedFg};
  --accent: ${base.darkAccent};
  --accent-foreground: ${base.darkFg};
  --destructive: oklch(0.7040 0.1910 22.2160);
  --destructive-foreground: ${base.darkFg};
  --border: ${base.darkBorder};
  --input: ${base.darkInput};
  --ring: ${base.darkRing};
  --chart-1: ${primary.charts.chart1};
  --chart-2: ${primary.charts.chart2};
  --chart-3: ${primary.charts.chart3};
  --chart-4: ${primary.charts.chart4};
  --chart-5: ${primary.charts.chart5};
  --sidebar: ${base.darkSidebar};
  --sidebar-foreground: ${base.darkFg};
  --sidebar-primary: ${primary.dark};
  --sidebar-primary-foreground: ${primary.darkFg};
  --sidebar-accent: ${base.darkMuted};
  --sidebar-accent-foreground: ${base.darkFg};
  --sidebar-border: ${base.darkSidebarBorder};
  --sidebar-ring: ${base.darkRing};
  --font-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  --font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  --radius: 0.625rem;
  --shadow-x: 0;
  --shadow-y: 1px;
  --shadow-blur: 3px;
  --shadow-spread: 0px;
  --shadow-opacity: 0.1;
  --shadow-color: oklch(0 0 0);
  --shadow-2xs: 0 1px 3px 0px hsl(0 0% 0% / 0.05);
  --shadow-xs: 0 1px 3px 0px hsl(0 0% 0% / 0.05);
  --shadow-sm: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10);
  --shadow: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10);
  --shadow-md: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 2px 4px -1px hsl(0 0% 0% / 0.10);
  --shadow-lg: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 4px 6px -1px hsl(0 0% 0% / 0.10);
  --shadow-xl: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 8px 10px -1px hsl(0 0% 0% / 0.10);
  --shadow-2xl: 0 1px 3px 0px hsl(0 0% 0% / 0.25);
}

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
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);

  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
  --font-serif: var(--font-serif);

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);

  --shadow-2xs: var(--shadow-2xs);
  --shadow-xs: var(--shadow-xs);
  --shadow-sm: var(--shadow-sm);
  --shadow: var(--shadow);
  --shadow-md: var(--shadow-md);
  --shadow-lg: var(--shadow-lg);
  --shadow-xl: var(--shadow-xl);
  --shadow-2xl: var(--shadow-2xl);
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