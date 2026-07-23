# Nikala UI 🎨

A simple, copy-paste component system for **SolidJS** built natively for **Tailwind CSS v4**.

Inspired by the iconic Georgian painter **Niko Pirosmani (Nikala)** — known for his bold contrasts, vivid colors, and dark canvas aesthetic.

---

## Why Nikala UI?

Tailwind CSS v4 introduced a CSS-first configuration (`@theme`), which broke compatibility with many existing SolidJS UI wrappers.

Nikala UI gives you full ownership of your code. Instead of adding a heavy third-party UI package to your `node_modules`, Nikala's CLI writes lightweight, fully reactive SolidJS components directly into your `src/components/ui` directory.

- ⚡ **Native SolidJS Reactivity** — Built with `splitProps` and fine-grained reactivity.
- 🎨 **Tailwind CSS v4 First** — Designed around modern `@import "tailwindcss";` setups.
- 📂 **Full Code Ownership** — The component files live in your project. Tweak them as you see fit.
- 📦 **Smart CLI** — Automatically detects your package manager (`bun`, `pnpm`, `npm`, `yarn`) and installs required dependencies.

---

## Quick Start

### 1. Initialize Nikala UI in your project

Run the initialization command in your SolidJS workspace:

```bash
bunx nikala init
# or
npx nikala init
```

This will:

- Generate `nikala.config.json`
- Configure `@` path aliases in `vite.config.ts` and `tsconfig.json`
- Create the `src/lib/cn.ts` helper utility
- Set up standard `src/index.css` for Tailwind v4

### 2. Add components to your project

Add only the components you actually need:

```bash
bunx nikala add button input card
```

### 3. Import and use

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

export function App() {
  return (
    <Card class="w-[350px]">
      <CardHeader>
        <CardTitle>Nikala UI</CardTitle>
        <CardDescription>Pirosmani inspired SolidJS UI kit.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Simple, copy-paste components built with Tailwind CSS v4.</p>
      </CardContent>
      <CardFooter>
        <Button onClick={() => alert("Gamarjoba!")}>Get Started</Button>
      </CardFooter>
    </Card>
  );
}
```

---

## Available Components (Phase 1)

- **`Button`** — Interactive button with variant and size options (`cva`).
- **`Input`** — Reactive text input with modern focus states.
- **`Card`** — Compound card layout (`Header`, `Title`, `Description`, `Content`, `Footer`).

---

## License

[MIT](./LICENSE)
