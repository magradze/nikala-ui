## Description

<!-- Briefly describe what changes this PR introduces and the problem it solves. -->

## Type of Change

- [ ] New Component (`@nikala-ui/core`)
- [ ] New Reactive Primitive / Hook (`@nikala-ui/hooks`)
- [ ] Bug Fix
- [ ] Documentation & Guides
- [ ] UI / Styling Polish
- [ ] CLI / MCP / Build System

## Related Issue

<!-- Link related issues: e.g. Fixes #123 or Relates to #456 -->

## Engineering & Reactivity Checklist

Please verify the following guidelines before submitting:

- [ ] **SolidJS Reactivity**: Props are handled via `splitProps` (no direct prop destructuring).
- [ ] **Tailwind CSS v4 Native**: Uses semantic tokens (`bg-card`, `border-border`, `text-foreground`, etc.).
- [ ] **Border Radius**: Does not exceed `rounded-lg` (maximum allowed container radius).
- [ ] **SSR Safe**: Browser DOM access guards included (`typeof window !== "undefined"`).
- [ ] **Typecheck**: Passes cleanly (`bun run typecheck`).
- [ ] **Registry Sync**: If modifying core components, registry manifests are synced (`bun run build:registry`).
