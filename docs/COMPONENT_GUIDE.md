
# Nikala UI — Component Authoring & Contribution Guide

This document provides a comprehensive, step-by-step instruction guide for authoring, styling, registering, and testing new components in **Nikala UI**. Follow these conventions strictly to maintain fine-grained SolidJS reactivity, Tailwind CSS v4 compatibility, and automated CLI registry generation.

---

## 1. Core Principles & Philosophy

1. **Native SolidJS Reactivity:**
   - **NEVER** destructure `props` directly (e.g., `const { class, variant } = props;` is strictly forbidden as it destroys SolidJS signal tracking).
   - **ALWAYS** use `splitProps(props, ["keys", "to", "split"])` to separate component-specific props from pass-through HTML attributes.
2. **Tailwind CSS v4 Native:**
   - Use standard Tailwind v4 utility classes and semantic state selectors (e.g., `data-[state=active]:...`, `aria-selected:...`, `dark:...`).
   - Standard neutral colors default to `zinc` palette variants (`zinc-900`, `zinc-50`, `zinc-200`, `zinc-800`).
3. **Copy-Paste Code Ownership:**
   - Components are copied directly into the end-user's `src/components/ui` folder.
   - Keep atomic components 100% dependency-free whenever possible (relying only on `clsx`, `tailwind-merge`, and `class-variance-authority`).
4. **SSR & Hydration Safety:**
   - Any direct DOM interaction (`document.addEventListener`, `window.innerWidth`, etc.) must be wrapped inside `onMount` and cleaned up in `onCleanup`.

---

## 2. Monorepo Repository File Structure

```text
nikala-ui/ (Monorepo Root)
├── package.json                   # Root workspace config (packages/*)
├── docs/                          # Global documentation & guidelines
└── packages/
    ├── cli/                       # @nikala-ui/cli package
    │   ├── package.json
    │   ├── src/
    │   │   ├── index.ts           # CLI binary entry point
    │   │   ├── commands/          # init, add, theme, validate, diff
    │   │   └── utils/             # CLI helper modules
    │   └── dist/                  # Built CLI executable output
    │
    └── core/                      # @nikala-ui/core package
        ├── package.json           # Component dependencies (@kobalte/core, corvu)
        ├── scripts/
        │   └── build-registry.ts # Registry JSON manifest compiler
        ├── registry/              # Generated JSON manifests for CLI
        │   ├── index.json
        │   └── <component>.json
        └── src/
            ├── registry/
            │   ├── metadata.ts   # Component metadata definitions
            │   ├── providers/    # ThemeProvider, ThemeScript, ThemeTransitions
            │   └── components/   # Source TSX components
            │       └── ui/
            │           └── <component>.tsx
            └── lib/
                └── cn.ts
```

---

## 3. Step-by-Step Creation Workflow

### Step 1: Create the Component Source File

Create a new file under `src/registry/components/ui/<component-kebab-name>.tsx`.

*Example:* `src/registry/components/ui/badge.tsx`

---

### Step 2: Implement Component Code Rules

#### Rule A: Import Statements

Components must import `cn` from `@/lib/cn` (which maps to the end-user's utility path):

```tsx
import { splitProps, type Component, type JSX } from "solid-js";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
```

#### Rule B: Props Definition

Interface names must be exported and follow the pattern `<ComponentName>Props`. Extend the appropriate `JSX.<Element>HTMLAttributes<HTML<Element>Element>`.

```tsx
export interface BadgeProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  class?: string;
}
```

#### Rule C: `splitProps` Usage Pattern

Extract locally used props and capture remaining HTML attributes into `rest`:

```tsx
export const Badge: Component<BadgeProps> = (props) => {
  // CORRECT: Preserves reactivity across prop updates
  const [local, rest] = splitProps(props, ["variant", "class", "children"]);

  return (
    <div
      class={cn(badgeVariants({ variant: local.variant }), local.class)}
      {...rest}
    >
      {local.children}
    </div>
  );
};
```

> **❌ WRONG (Do Not Do This):**
>
> ```tsx
> export const Badge = ({ variant, class: className, children, ...rest }: BadgeProps) => {
>   // DESTROYS SOLIDJS REACTIVITY!
> }
> ```

#### Rule D: `children()` Helper for Children Inspection

Whenever a component needs to inspect, iterate, or dynamically track `children` nodes (e.g., counting options or checking child types), **NEVER** read `local.children` directly as an array. Always wrap `props.children` with SolidJS's native `children()` memoization helper:

```tsx
import { children, type ParentComponent } from "solid-js";

export const ListContainer: ParentComponent = (props) => {
  // Correctly memoizes dynamic JSX child nodes while preserving reactivity
  const resolvedChildren = children(() => props.children);

  return <div class="space-y-2">{resolvedChildren()}</div>;
};
```

---

### Step 3: Compound Components & Context Pattern

For components containing sub-components (e.g., `Card`, `Tabs`, `Accordion`, `Select`, `RadioGroup`), use SolidJS `createContext` and pass reactive accessors (`Accessor<T>`).

#### Example Compound Context Pattern

```tsx
import {
  createContext,
  useContext,
  createSignal,
  splitProps,
  type Component,
  type Accessor,
} from "solid-js";

interface RadioGroupContextValue {
  value: Accessor<string | undefined>;
  setValue: (value: string) => void;
}

const RadioGroupContext = createContext<RadioGroupContextValue>();

export const RadioGroup: Component<RadioGroupProps> = (props) => {
  const [local, rest] = splitProps(props, ["value", "defaultValue", "onChange", "children", "class"]);
  const [internalValue, setInternalValue] = createSignal(local.defaultValue);

  const currentValue = () => (local.value !== undefined ? local.value : internalValue());

  const handleSelect = (val: string) => {
    if (local.value === undefined) setInternalValue(val);
    if (typeof local.onChange === "function") local.onChange(val);
  };

  return (
    <RadioGroupContext.Provider value={{ value: currentValue, setValue: handleSelect }}>
      <div class={cn("grid gap-2", local.class)} {...rest}>
        {local.children}
      </div>
    </RadioGroupContext.Provider>
  );
};
```

---

### Step 4: Register Component Metadata

Open `src/registry/metadata.ts` and add an entry for your new component inside the `COMPONENT_METADATA` record.

```typescript
export const COMPONENT_METADATA: Record<string, ComponentMeta> = {
  // ... existing components
  "component-kebab-name": {
    title: "Component Title",
    description: "Concise summary describing what this component does.",
    dependencies: ["clsx", "tailwind-merge", "class-variance-authority"], // List NPM packages
    registryDependencies: [], // List required Nikala UI components (e.g., ["button"])
  },
};
```

---

### Step 5: Build Registry Manifests

Run the build script to compile TSX components into JSON registry files under `registry/`:

```bash
bun run build
# or
bun scripts/build-registry.ts
```

Verify that `registry/<component-kebab-name>.json` and `registry/index.json` have been generated and contain valid file string representations.

---

### Step 6: Test Installation in Workspace

Test component installation using the Nikala CLI in a test project:

```bash
# Add specific component
nikala add <component-kebab-name>

# Or test full suite
nikala add --all
```

Verify:

1. The `.tsx` file is written correctly to `src/components/ui/<component-kebab-name>.tsx`.
2. Required NPM packages are automatically installed.
3. Component renders cleanly without TypeScript or runtime errors.

---

### Step 7: Update Documentation (`README.md`)

Add the new component entry to `README.md` under the **`Available Components`** section:

```markdown
- **`Component Name`** — Short functional description of the component (`SubComponents`).
```

---

### Step 8: Commit Changes Following Conventional Commits

Stage and commit files using conventional commit messages:

```bash
git add src/registry/components/ui/<component>.tsx src/registry/metadata.ts
git commit -m "feat(ui): add <component> component"

git add registry/
git commit -m "build(registry): generate manifest for <component> component"

git add README.md
git commit -m "docs: add <component> to README"

git push origin main
```

---

## 4. Complete Code Template Reference

### Single Atom Component Template (`src/registry/components/ui/example-atom.tsx`)

```tsx
import { splitProps, type Component, type JSX } from "solid-js";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

export const atomVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-zinc-300",
  {
    variants: {
      variant: {
        default: "bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900",
        outline: "border border-zinc-200 bg-transparent dark:border-zinc-800",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface AtomProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof atomVariants> {
  class?: string;
}

/**
 * Nikala UI Atom Component.
 */
export const Atom: Component<AtomProps> = (props) => {
  const [local, rest] = splitProps(props, ["variant", "size", "class", "children"]);

  return (
    <div
      class={cn(atomVariants({ variant: local.variant, size: local.size }), local.class)}
      {...rest}
    >
      {local.children}
    </div>
  );
};
```

---

## 5. Summary Checklist for Reviewers / AI Agents

- [ ] TSX file added to `src/registry/components/ui/`
- [ ] Uses `splitProps` (NO object destructuring on props)
- [ ] Uses `children()` helper if inspecting or mapping children nodes
- [ ] Leverages Corvu or Kobalte for complex A11y overlays/menus/drawers
- [ ] Uses `cn(...)` for class merging
- [ ] Extends standard JSX element attributes
- [ ] Metadata added to `src/registry/metadata.ts`
- [ ] `bun run build` executed successfully
- [ ] Generated `registry/*.json` committed
- [ ] Documentation updated in `README.md`
