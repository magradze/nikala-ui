# Nikala UI

A simple, copy-paste component system for **SolidJS** built natively for **Tailwind CSS v4**.

Honoring the iconic Georgian painter **Niko Pirosmani (Nikala)**.

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
nikala theme

# Direct command execution
nikala theme set sky slate
```

### 3. Add components to your project

Add specific components or install all at once:

```bash
# Add specific components
nikala add button input card theme-manager

# Or add all available components
nikala add all
# or
nikala add --all
```

You can also install components from custom remote URLs:

```bash
nikala add https://example.com/registry/my-custom-card.json
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
          <Badge>v0.4.0</Badge>
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

## Available Components (26)

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
- **`Banner`** — Announcement banner with sticky positioning, dismissal persistence, auto-hide timer, Lucide icons, and variant styles (`Banner`).
- **`Dialog`** — Accessible modal window with backdrop blur, closable button, and outside-click options (`Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`).
- **`Sheet`** — Sliding panel component with 4-directional slide-in animations and backdrop blur (`Sheet`, `SheetTrigger`, `SheetContent`, `SheetHeader`, `SheetTitle`, `SheetDescription`, `SheetFooter`).
- **`Dropdown Menu`** — Full-featured context menu with submenus, checkboxes, radio items, shortcuts, and avatar trigger (`DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuSub`).
- **`List`** — Compound list components supporting titles, subtitles, icons, avatars, hotkey badges, chevron indicators, and interactive links (`List`, `ListGroup`, `ListHeader`, `ListItem`).
- **`Kbd`** — Keyboard key and shortcut group indicators for displaying hotkeys (`Kbd`, `KbdGroup`).
- **`Input Group`** — Compound input wrapper for combining text inputs with prefix and suffix addons (`InputGroup`, `InputGroupInput`, `InputGroupAddon`).
- **`Command`** — Accessible command palette and search modal built on Kobalte Dialog primitives with auto-filtering (`Command`, `CommandDialog`, `CommandInput`, `CommandList`, `CommandEmpty`, `CommandGroup`, `CommandItem`, `CommandFooter`).
- **`Theme Manager`** — Zero-dependency theme provider, brand accent color customizer, border-radius controls, and transition animations (`ThemeProvider`, `ThemeToggle`, `useTheme`).

---

## Documentation & Guides

- [**CLI Commands Guide**](./docs/CLI.md) — Comprehensive guide covering initialization, component installation, interactive multiselect menu, workspace health diagnostics (`validate`), code diffing (`diff`), and CLI theme commands (`theme`).
- [**Theming & Color System Guide**](./docs/THEMING.md) — Comprehensive guide covering CLI theme customization, CSS design tokens, `ThemeProvider`, `ThemeToggle` modes, and Web View Transition animations.
- [**Component Authoring & Contribution Guide**](./docs/COMPONENT_GUIDE.md) — Detailed rules and conventions for creating, registering, and contributing new components.

---

## License

[MIT](./LICENSE)
