# Nikala UI

A simple, copy-paste component system for **SolidJS** built natively for **Tailwind CSS v4**.

Honoring the iconic Georgian painter **Niko Pirosmani (Nikala)**.

[![npm version](https://img.shields.io/npm/v/@nikala-ui/cli.svg?style=flat-square&color=9e3a47)](https://www.npmjs.com/package/@nikala-ui/cli)
[![npm downloads](https://img.shields.io/npm/dm/@nikala-ui/cli.svg?style=flat-square&color=00a63e)](https://www.npmjs.com/package/@nikala-ui/cli)
[![CI Status](https://img.shields.io/github/actions/workflow/status/nikala-ui/ui/workspace-ci.yml?branch=main&style=flat-square&label=CI)](https://github.com/nikala-ui/ui/actions/workflows/workspace-ci.yml)
[![SolidJS](https://img.shields.io/badge/SolidJS-v1.8+-4c78a8?style=flat-square&logo=solid)](https://solidjs.com)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)

**Official Documentation & Live Playground:** [nikala.dev](https://nikala.dev)

---

## Why Nikala UI?

Tailwind CSS v4 introduced a CSS-first configuration (`@theme`), which broke compatibility with many existing SolidJS UI wrappers.

Nikala UI gives you full ownership of your code. Instead of adding a heavy third-party UI package to your `node_modules`, Nikala's CLI writes lightweight, fully reactive SolidJS components directly into your `src/components/ui` directory.

- **Native SolidJS Reactivity** — Built with `splitProps` and fine-grained reactivity.
- **Tailwind CSS v4 First** — Designed around modern `@import "tailwindcss";` setups with semantic design tokens.
- **SolidJS & SolidStart Ready** — Smart auto-detection for standard Vite SPA, Tauri, Electron, and SolidStart (SSR / Fullstack) projects.
- **Full Code Ownership** — The component files live in your project. Tweak them as you see fit.
- **Smart CLI** — Automatically detects your package manager (`bun`, `pnpm`, `npm`, `yarn`) and installs required dependencies.
- **Dynamic Theme Engine** — Customize base gray palettes, primary brand accent colors, and border radii at build-time or runtime.
- **Custom Registries** — Supports adding components directly from remote HTTP(S) URLs.
- **Monorepo Architecture** — Decoupled CLI (@nikala-ui/cli) and core design system (@nikala-ui/core) for instant background registry updates.

---

## Quick Start

### 1. Initialize Nikala UI in your project

Run the initialization command in your SolidJS workspace:

```bash
 # Execute via npm package scope or npx/bunx
   bunx @nikala-ui/cli init
   # or
   npx @nikala-ui/cli init
```

This will:

- Prompt for directory preferences, base gray palette, and primary brand accent color
- Generate `nikala.config.json`
- Configure `@` path aliases in `vite.config.ts` or `app.config.ts`
- Create the `src/lib/cn.ts` helper utility
- Set up standard Tailwind CSS v4 variables in `src/index.css` or `src/app.css`
- Automatically inject CSS imports into your main entry file (`index.tsx`, `app.tsx`, etc.)

### 2. Customize Theme Colors via CLI

Switch brand accent colors or base palettes anytime without re-running initialization:

```bash
# Interactive theme selection menu
bunx @nikala-ui/cli theme

# Direct command execution
bunx @nikala-ui/cli theme set sky slate
```

### 3. Add components to your project

Add specific components or install all at once:

```bash
# Add specific components
bunx @nikala-ui/cli add button input card theme-manager

## Or add all available components

bunx @nikala-ui/cli add all

## or

bunx @nikala-ui/cli add --all

```

You can also install components from custom remote URLs:

```bash
bunx @nikala-ui/cli add https://example.com/registry/my-custom-card.json
```

### 4. Import and use

```tsx
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function App() {
  return (
    <Card class="w-[350px]">
      <CardHeader>
        <div class="flex items-center justify-between">
          <CardTitle>Nikala UI</CardTitle>
          <Badge>v0.8.0</Badge>
        </div>
        <CardDescription>SolidJS + Tailwind v4 component system.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Simple, copy-paste components built for SolidJS.</p>
      </CardContent>
      <CardFooter>
        <Button onClick={() => alert("Gamarjoba!")}>Get Started</Button>
      </CardFooter>
    </Card>
  );
}
```

---

---

## Components

Nikala UI provides a growing library of accessible, beautifully designed SolidJS components built natively for Tailwind CSS v4.

Explore all components, interactive live previews, and API references at **[nikala.dev/docs/components](https://nikala.dev/docs/components)**.

You can also list all available components directly from your terminal:

```bash
bunx @nikala-ui/cli add
```

---

## Documentation & Guides

- [**CLI Commands Guide**](./docs/CLI.md) — Comprehensive guide covering initialization, component installation, interactive multiselect menu, workspace health diagnostics (`validate`), code diffing (`diff`), and CLI theme commands (`theme`).
- [**Theming & Color System Guide**](./docs/THEMING.md) — Comprehensive guide covering CLI theme customization, CSS design tokens, `ThemeProvider`, `ThemeToggle` modes, and Web View Transition animations.
- [**Component Authoring & Contribution Guide**](./docs/COMPONENT_GUIDE.md) — Detailed rules and conventions for creating, registering, and contributing new components.

---

## License

[MIT](./LICENSE)
