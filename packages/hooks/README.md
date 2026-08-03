# @nikala-ui/hooks

Reactive SolidJS state primitives and custom hooks for **Nikala UI**.

Honoring the iconic Georgian painter **Niko Pirosmani (Nikala)**.

Official Documentation & Interactive Demos: [nikala.magradze.dev](https://nikala.magradze.dev)

---

## Overview

This package provides reusable, fine-grained reactive primitives designed natively for SolidJS applications. It simplifies managing complex component state such as controlled and uncontrolled inputs, state synchronization, and reactive event callbacks.

---

## Core Features & Available Hooks

- **`createControllableSignal`** — SolidJS reactive primitive for managing state supporting both controlled and uncontrolled modes with a unified setter API.
- **`createClickOutside`** — SolidJS reactive primitive for detecting user interactions outside specified element(s) or refs.
- **`createClipboard`** — SolidJS reactive primitive for copying text to clipboard with automatic status reset.
- **Native SolidJS Reactivity** — Zero-dependency, fine-grained reactivity built directly on SolidJS signals.
- **TypeScript First** — Fully typed options, getters, and return tuple interfaces.

---

## Installation & Usage

Install the hooks package via your preferred package manager:

```bash
bun add @nikala-ui/hooks
# or
npm install @nikala-ui/hooks
```

Import hooks directly into your SolidJS components:

```tsx
import { createControllableSignal } from "@nikala-ui/hooks";

const [value, setValue] = createControllableSignal({
  defaultValue: "Uncontrolled Initial State",
});
```

---

## Documentation & Links

- Repository: [github.com/nikala-ui/ui](https://github.com/nikala-ui/ui)
- Hooks Documentation: [nikala.magradze.dev/docs/hooks](https://nikala.magradze.dev/docs/hooks)

## License

[MIT](https://github.com/nikala-ui/ui/blob/main/LICENSE)
