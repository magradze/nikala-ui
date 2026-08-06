# @nikala-ui/core

Core design system components, providers, and registry manifests for **Nikala UI**.

Honoring the iconic Georgian painter **Niko Pirosmani (Nikala)**.

Official Documentation & Interactive Demos: [nikala.dev](https://nikala.dev)

---

## Overview

This package serves as the primary component registry and source code repository for Nikala UI. Components are fetched on demand via `@nikala-ui/cli` and written directly into your application's `src/components/ui` workspace directory.

---

## Core Features

- **26 Core UI Components** — Button, Input, Card, Badge, Avatar, Separator, Textarea, Label, Skeleton, Switch, Checkbox, Radio Group, Select, Tabs, Accordion, Breadcrumb, Alert, Dialog, Sheet, Dropdown Menu, Theme Manager, Banner, List, Kbd, InputGroup, Command.
- **Native SolidJS Reactivity** — Fine-grained signals with `splitProps` and context accessors.
- **100% WAI-ARIA Accessible** — Powered by Kobalte and Corvu headless primitives.
- **Tailwind CSS v4 Native** — Driven by `@theme inline` semantic design tokens.

---

## Usage

Use the official CLI client to add components to your SolidJS or SolidStart project:

```bash
npx @nikala-ui/cli add
```

## Documentation & Links

- Repository: [github.com/nikala-ui/ui](https://github.com/nikala-ui/ui)
- Component Authoring Guide: [docs/COMPONENT_GUIDE.md](https://github.com/nikala-ui/ui/blob/main/docs/COMPONENT_GUIDE.md)
- Theming System Guide: [docs/THEMING.md](https://github.com/nikala-ui/ui/blob/main/docs/THEMING.md)

## License

[MIT](https://github.com/nikala-ui/ui/blob/main/LICENSE)
