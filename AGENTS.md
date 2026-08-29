# CLAUDE.md — Nikala UI Project Guidelines & AI Assistant Handbook

> **Nikala UI** is a lightweight, copy-paste component system and reactive primitives suite for **SolidJS** built natively for **Tailwind CSS v4**. Honoring iconic Georgian painter **Niko Pirosmani (Nikala)**.

- **Monorepo Root**: `/home/magradze/Projects/nikala-ui`
- **Documentation & Live Site**: [nikala.dev](https://nikala.dev)
- **Primary Package Manager**: `bun` (Version 1.3+)

---

## 1. Monorepo Architecture Overview

This project is a Turborepo/Bun monorepo structured into decoupled packages and apps:

```plaintext
nikala-ui/
├── apps/
│   └── web/                   # Documentation website & playground (SolidStart + Vite + Tailwind v4)
├── packages/
│   ├── cli/                   # @nikala-ui/cli binary tool (nikala init, add, theme, validate, diff)
│   ├── core/                  # @nikala-ui/core registry JSON manifests, metadata & Kobalte UI components
│   ├── hooks/                 # @nikala-ui/hooks reactive SolidJS primitives suite (40 primitives)
│   └── mcp/                   # @nikala-ui/mcp Model Context Protocol server (tools, resources, prompts)
└── .github/
    └── scripts/               # CI/CD snapshot versioning scripts
```

### Workspace Package Roles

- **`apps/web`**: The official documentation portal, live component previews, and interactive playground hosted at `nikala.dev`.
- **`packages/cli`**: The command-line client (`nikala` / `npx @nikala-ui/cli`). Handles project initialization, interactive multiselect for UI components and `--hook` primitives, theme configuration, and diagnostic validation.
- **`packages/core`**: Central registry containing full source manifests for Kobalte-based UI components.
- **`packages/hooks`**: Standalone primitives library providing 40 reactive hooks written specifically for SolidJS fine-grained reactivity.
- **`packages/mcp`**: Model Context Protocol (MCP) server integration supporting Stdio local execution (`npx @nikala-ui/mcp`) and remote HTTP/SSE streaming (`https://nikala.dev/api/mcp/sse`) with callable tools (`list_components`, `install_component`, `validate_project`, `inspect_workspace`), pre-built AI prompts, and SolidJS engineering resources.

---

## 2. Monorepo Development Commands

Always prefer using `bun` for script execution and dependency management across the monorepo.

### Building Packages

```bash
# Build the entire monorepo (Registry -> CLI -> MCP -> Web app)
bun run build

# Individual package build commands:
bun run build:registry     # Builds JSON manifests in packages/core/registry/
bun run build:cli          # Compiles TypeScript CLI binary in packages/cli/dist/
bun run build:mcp          # Compiles MCP server binary in packages/mcp/dist/
bun run build:web          # Compiles production SSR bundle in apps/web/.output/
```

### Development & Live Preview

```bash
# Start local dev server for docs website (apps/web)
cd apps/web && bun run dev

# Run TypeScript typechecking without emitting JS files
bunx tsc --noEmit                          # Monorepo root
cd packages/hooks && bunx tsc --noEmit     # Hooks package
cd apps/web && bunx tsc --noEmit          # Web app package
```

---

## 3. Strict Coding Rules & Engineering Guidelines

When contributing code or modifying components/hooks in Nikala UI, AI assistants and developers MUST strictly enforce the following rules:

### A. SolidJS Reactivity Rules

1. **NEVER Destructure Component Props Directly**:
   - `const { variant, class: className } = props;` -> ❌ **FORBIDDEN** (destroys fine-grained signal tracking).
   - `const [local, others] = splitProps(props, ["variant", "class"]);` -> ✅ **REQUIRED**.
2. **Children Inspection & Tab Hydration**:
   - ALWAYS wrap `props.children` with SolidJS's native `children(() => props.children)` memoization helper when inspecting, iterating, or rendering dynamic JSX child nodes inside tab containers or conditional branches.
3. **SSR Safety Guards**:
   - Always include `typeof window !== "undefined"` and `typeof document !== "undefined"` guards inside browser event listeners or DOM access logic to prevent SSR hydration crashes in SolidStart environments.
4. **Anti-FOUC Theme Script**:
   - When using `ThemeProvider`, ALWAYS place `<ThemeScript storageKey="nikala-theme" />` synchronously inside `<head>` or root HTML before `<ThemeProvider>` to eliminate flash of unstyled content during SSR.

### B. Styling & Design Token Constraints

1. **Border Radius Constraint**:
   - NEVER use `rounded-xl`, `rounded-2xl`, `rounded-3xl`, or `rounded-full` for main container cards or dialog boxes. **The maximum allowed border radius across Nikala UI is `rounded-lg`**.
2. **Tailwind CSS v4 Native Setup**:
   - All components must use semantic design tokens defined in modern `@import "tailwindcss";` setups (`bg-background`, `text-foreground`, `bg-card`, `border-border`, `bg-primary`, etc.). Avoid hardcoded arbitrary color values.
3. **UI Component Reusability in Docs**:
   - When building interactive previews, playground stages, or docs pages, ALWAYS consume existing primitives from `@/components/ui/*` (`Button`, `Badge`, `Input`, `Progress`, `Tabs`, etc.) instead of raw HTML elements.

---

## 4. Pure Copy-Paste Ownership Model for Primitives

Nikala UI implements a 100% **Pure Copy-Paste Ownership** model for both components and reactive primitives:

- Running `bunx @nikala-ui/cli add <component>` copies component TSX source directly to the developer's `src/components/ui/` directory.
- Running `bunx @nikala-ui/cli add --hook <hook-name>` (or `-h`) copies hook TS source files directly to the developer's `src/hooks/<hook-name>.ts` directory.
- Developers own 100% of the source code and import hooks locally:
  `import { createClipboard } from "@/hooks/create-clipboard";`

---

## 5. Complete Catalog of Components (27) & Primitives (40)

### UI Components (`@nikala-ui/core`)

`accordion`, `alert`, `avatar`, `badge`, `banner`, `breadcrumb`, `button`, `card`, `checkbox`, `command`, `dialog`, `dropdown-menu`, `input`, `input-group`, `kbd`, `label`, `list`, `popover`, `progress`, `radio-group`, `select`, `separator`, `sheet`, `skeleton`, `switch`, `tabs`, `textarea`, `theme-manager`.

### Reactive Primitives / Hooks (`@nikala-ui/hooks`)

`createActiveElement`, `createAudio` / `createVideo`, `createBattery`, `createClickOutside`, `createClipboard`, `createColorMode`, `createControllableSignal`, `createDebounce`, `createDisclosure`, `createDocumentTitle`, `createEventSource`, `createFavicon`, `createFetch`, `createFocusTrap`, `createForm`, `createFullscreen`, `createGeolocation`, `createHover`, `createIdle`, `createInfiniteScroll`, `createInputMask`, `createIntersectionObserver`, `createKeybindings`, `createLockScroll`, `createLongPress`, `createMediaQuery`, `createMousePosition`, `createNetworkStatus`, `createOrientation`, `createPermission`, `createPrevious`, `createResizeObserver`, `createScrollIntoView`, `createScrollPosition`, `createStorage` (`createLocalStorage`, `createSessionStorage`), `createTimer`, `createUndoRedo`, `createWebNotification`, `createWebSocket`, `createWindowSize`.
