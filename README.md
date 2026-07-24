# Nikala UI

A simple, copy-paste component system for **SolidJS** built natively for **Tailwind CSS v4**.

Honoring the iconic Georgian painter **Niko Pirosmani (Nikala)**.

---

## Why Nikala UI?

Tailwind CSS v4 introduced a CSS-first configuration (`@theme`), which broke compatibility with many existing SolidJS UI wrappers.

Nikala UI gives you full ownership of your code. Instead of adding a heavy third-party UI package to your `node_modules`, Nikala's CLI writes lightweight, fully reactive SolidJS components directly into your `src/components/ui` directory.

- **Native SolidJS Reactivity** — Built with `splitProps` and fine-grained reactivity.
- **Tailwind CSS v4 First** — Designed around modern `@import "tailwindcss";` setups.
- **SolidJS & SolidStart Ready** — Smart auto-detection for standard Vite SPA, Tauri, Electron, and SolidStart (SSR / Fullstack) projects.
- **Full Code Ownership** — The component files live in your project. Tweak them as you see fit.
- **Smart CLI** — Automatically detects your package manager (`bun`, `pnpm`, `npm`, `yarn`) and installs required dependencies.
- **Custom Registries** — Supports adding components directly from remote HTTP(S) URLs.

---

## Quick Start

### 1. Initialize Nikala UI in your project

Run the initialization command in your SolidJS workspace:

```bash
nikala init
# or
bunx nikala init
# or
npx nikala init
```

This will:

- Generate `nikala.config.json`
- Configure `@` path aliases in `vite.config.ts` or `app.config.ts`
- Create the `src/lib/cn.ts` helper utility
- Set up standard Tailwind CSS v4 in `src/index.css` or `src/app.css`
- Automatically inject CSS imports into your main entry file (`index.tsx`, `app.tsx`, etc.)

### 2. Add components to your project

Add specific components or install all at once:

```bash
# Add specific components
nikala add button input card

# Or add all available components
nikala add all
# or
nikala add --all
```

You can also install components from custom remote URLs:

```bash
nikala add https://example.com/registry/my-custom-card.json
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
import { Badge } from "@/components/ui/badge";

export function App() {
  return (
    <Card class="w-[350px]">
      <CardHeader>
        <div class="flex items-center justify-between">
          <CardTitle>Nikala UI</CardTitle>
          <Badge>v0.1.0</Badge>
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

## Available Components (16)

- **`Button`** — Interactive button with variant and size options (`cva`).
- **`Input`** — Reactive text input with modern focus states.
- **`Card`** — Compound card layout (`Header`, `Title`, `Description`, `Content`, `Footer`).
- **`Badge`** — Status indicator and tag badges with multiple variants.
- **`Avatar`** — Profile image component with automatic fallback handling (`Image`, `Fallback`).
- **`Separator`** — Visual or semantic horizontal/vertical line divider.
- **`Textarea`** — Multi-line text area field with focus styling.
- **`Label`** — Accessible caption label for form controls.
- **`Skeleton`** — Animated pulse loading placeholder for content loading states.
- **`Switch`** — Toggle switch control for boolean states.
- **`Checkbox`** — Checkable input box with custom SVG checkmark indicator.
- **`Radio Group`** — Accessible radio button group with vertical and horizontal layout support (`RadioGroup`, `RadioGroupItem`).
- **`Select`** — Custom dropdown select menu component (`Select`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem`).
- **`Tabs`** — Layered content switcher supporting horizontal and vertical layout orientations (`Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`).
- **`Accordion`** — Vertically stacked collapsible content sections supporting single and multiple modes (`Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent`).
- **`Breadcrumb`** — Accessible navigation trail hierarchy (`Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator`, `BreadcrumbEllipsis`).
- **`Alert`** — Callout banner for user feedback with status variants, dismiss button, and timer (`Alert`, `AlertTitle`, `AlertDescription`).
- **`Dialog`** — Accessible modal window with backdrop blur, closable button, and outside-click options (`Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`).
- **`Sheet`** — Sliding panel component with 4-directional slide-in animations and backdrop blur (`Sheet`, `SheetTrigger`, `SheetContent`, `SheetHeader`, `SheetTitle`, `SheetDescription`, `SheetFooter`).
- **`Dropdown Menu`** — Full-featured context menu with submenus, checkboxes, radio items, shortcuts, and avatar trigger (`DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuSub`).

---

## Contributing & Component Authoring

Want to build or contribute a new component to Nikala UI? Please read our step-by-step authoring guide in [`docs/COMPONENT_GUIDE.md`](./docs/COMPONENT_GUIDE.md).

---

## License

[MIT](./LICENSE)
