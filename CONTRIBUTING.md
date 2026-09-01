# Contributing to Nikala UI

Thank you for your interest in contributing to **Nikala UI**! We are thrilled to welcome you to our open-source community.

Honoring the iconic Georgian modernist painter **Niko Pirosmani (Nikala)**, Nikala UI brings high craftsmanship, 100% copy-paste code ownership, fine-grained reactivity, and native **Tailwind CSS v4** design tokens to the **SolidJS** ecosystem.

We strive to make contributing as **simple, frictionless, and enjoyable** as possible.

---

## 1. Monorepo Architecture

Nikala UI is organized as a high-performance **Turborepo** workspace powered by **Bun** (`1.3+`).

```plaintext
nikala-ui/
├── apps/
│   └── web/                   # Documentation portal, live previews & playground (SolidStart + Tailwind v4)
├── packages/
│   ├── cli/                   # @nikala-ui/cli (nikala init, add, theme, validate, diff)
│   ├── core/                  # @nikala-ui/core registry manifests & Kobalte-based UI components (69)
│   ├── hooks/                 # @nikala-ui/hooks reactive SolidJS primitives suite (47)
│   └── mcp/                   # @nikala-ui/mcp Model Context Protocol server for AI coding assistants
└── package.json               # Monorepo root configuration
```

### Workspace Packages

| Workspace | Package Name | Description |
| :--- | :--- | :--- |
| `apps/web` | `apps/web` | Official documentation, live component previews, and interactive playground hosted at [nikala.dev](https://nikala.dev). |
| `packages/core` | `@nikala-ui/core` | Central registry containing source components, registry schema manifests, and JSON compilation pipeline. |
| `packages/hooks` | `@nikala-ui/hooks` | Standalone reactive primitives library tailored specifically for SolidJS fine-grained reactivity. |
| `packages/cli` | `@nikala-ui/cli` | Interactive command-line client for initializing projects, scaffolding themes, and installing components/primitives. |
| `packages/mcp` | `@nikala-ui/mcp` | Model Context Protocol server exposing Nikala UI components, hooks, prompts, and diagnostics directly to AI coding tools. |

---

## 2. Local Development Setup

### Prerequisites

- **[Bun](https://bun.sh/)** `v1.3.0` or higher (*required package manager*)
- **Node.js** `v20.0.0` or higher
- **Git**

### Step-by-Step Setup

1. **Fork and clone the repository:**

   ```bash
   git clone https://github.com/nikala-ui/ui.git
   cd ui
   ```

2. **Create a new branch:**

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Install dependencies:**

   ```bash
   bun install
   ```

4. **Start the local docs development server:**

   ```bash
   cd apps/web && bun run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the live site.

---

## 3. Key Development Commands

Run these commands directly from the monorepo root:

```bash
# Build the entire monorepo (Registry -> CLI -> MCP -> Web app)
bun run build

# Fast single-command TypeScript typecheck across all workspaces:
bun run typecheck

# Rebuild automated registry manifests and sync UI components to docs:
bun run build:registry

# Individual package builds:
bun run build:cli          # Compiles TypeScript CLI binary in packages/cli/dist/
bun run build:mcp          # Compiles MCP server bundle in packages/mcp/dist/
bun run build:web          # Compiles production SSR bundle for apps/web
```

---

## 4. Engineering Standards & Strict Guidelines

When writing or modifying SolidJS components and hooks, please adhere to these core rules:

### A. SolidJS Reactivity Rules

1. **NEVER Destructure Component Props Directly:**
   - ❌ **Forbidden:** `const { variant, class: className } = props;` *(Destroys fine-grained signal tracking)*.
   - ✅ **Required:** `const [local, rest] = splitProps(props, ["variant", "class"]);`
2. **Polymorphic Rendering:**
   - Use `Dynamic` from `solid-js/web` (`<Dynamic component={local.as || "div"} {...rest} />`) for polymorphic elements without binding `@nikala-ui/core` to external routers.
3. **Children Inspection & Memoization:**
   - Always wrap dynamic JSX children with `children(() => props.children)` when inspecting or mapping dynamic slot elements.
4. **SSR Hydration Safety:**
   - Guard all browser/DOM APIs with `typeof window !== "undefined"` to ensure full SSR compatibility with SolidStart.

### B. Styling & Design Token Constraints (Tailwind CSS v4)

1. **Native Tailwind v4 Semantic Tokens:**
   - Rely on semantic tokens defined in `@import "tailwindcss";` (`bg-background`, `text-foreground`, `bg-card`, `border-border`, `bg-primary`, `text-primary-foreground`). Avoid hardcoded arbitrary color values.
2. **Border Radius Constraint:**
   - Never use `rounded-xl`, `rounded-2xl`, or `rounded-3xl` for main container cards or dialog boxes. **The maximum allowed border radius across Nikala UI is `rounded-lg`**.

---

## 5. Frictionless Contribution Workflows

We believe in **low barrier to entry**. You don't need to write exhaustive documentation or playground setups to submit a great contribution.

### 🐛 1. Fixing a Bug or Improving a Component (Most Common)

1. Make your fix in `packages/core/src/registry/components/ui/<component-name>.tsx` (or `packages/hooks/src/<hook-name>.ts`).
2. Run the build & check scripts:

   ```bash
   bun run build:registry
   bun run typecheck
   ```

   *(The registry build will automatically sync your changes to `apps/web`)*.
3. Commit and open a Pull Request!

---

### ✨ 2. Proposing a New Component or Primitive (Maintainer-Assisted)

1. Add your new component TSX file in `packages/core/src/registry/components/ui/<component-name>.tsx` (or hook in `packages/hooks/src/<hook-name>.ts`).
2. Run `bun run build:registry` and `bun run typecheck`.
3. Submit your Pull Request.

> [!TIP]
> **Maintainer-Assisted Documentation:**
> You do **not** need to build the documentation page, interactive playground stages, or sidebar configs yourself unless you want to. The Nikala UI core maintainers will gladly author the docs page and integrate your component upon merging!

---

## 6. Commit Message Conventions

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```plaintext
<type>(<scope>): <short description>
```

### Types & Scopes

- **Types**: `feat`, `fix`, `docs`, `refactor`, `perf`, `chore`, `ci`
- **Scopes**: `core`, `hooks`, `cli`, `mcp`, `web`

**Examples:**

- `feat(core): add review-card component`
- `fix(web): prevent FOUC theme flickering on SSR route transitions`
- `feat(hooks): add createDocumentTabs primitive`
- `docs: update contributing handbook`

---

## 7. Pre-PR Checklist

Before opening your pull request, please verify:

- [ ] `bun run build:registry` was executed.
- [ ] `bun run typecheck` passes with zero errors.
- [ ] Props are not destructured directly (using `splitProps`).
- [ ] Your commit messages follow Conventional Commits.

---

## 8. Questions & Community

- **Discussions & Ideas**: Open a [GitHub Discussion](https://github.com/nikala-ui/ui/discussions).
- **Issues & Bugs**: Open a [GitHub Issue](https://github.com/nikala-ui/ui/issues).
- **Website**: [nikala.dev](https://nikala.dev)
- **Author**: Created with ❤️ by [Magradze](https://github.com/magradze).

Thank you for contributing to Nikala UI! 🚀
