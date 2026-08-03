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
- **`createKeybindings` / `createEscapeKey`** — SolidJS reactive primitives for listening to keyboard shortcuts, key combinations, and Escape key presses.
- **`createLockScroll`** — SolidJS reactive primitive for locking body or container scrolling when overlays are active.
- **`createDisclosure`** — SolidJS reactive primitive for managing boolean open/close state with toggle, open, and close helpers.
- **`createMediaQuery` / `createBreakpoint`** — SolidJS reactive primitives for tracking CSS media queries and responsive Tailwind breakpoints.
- **`createDebounce` / `createThrottle`** — SolidJS reactive primitives for debouncing and throttling rate-limited function execution.
- **`createIntersectionObserver` / `createInView`** — SolidJS reactive primitives for detecting element viewport visibility and scroll animation triggers.
- **`createTimer` / `createCountdown`** — SolidJS reactive primitives for recurring interval ticks and formatted countdown timers.
- **`createResizeObserver` / `createElementSize`** — SolidJS reactive primitives for tracking element width and height dimensions dynamically.
- **`createWindowSize`** — SolidJS reactive primitive for tracking window viewport inner width and height.
- **`createScrollPosition`** — SolidJS reactive primitive for tracking scroll position, scroll direction, and top/bottom container status.
- **`createFocusTrap`** — SolidJS reactive primitive for trapping keyboard focus inside target container element for accessibility (WCAG).
- **`createMousePosition`** — SolidJS reactive primitive for tracking global and element-relative mouse pointer coordinates.
- **`createLongPress`** — SolidJS reactive primitive for detecting long press / hold touch and pointer interactions.
- **`createHover`** — SolidJS reactive primitive for tracking element hover state with entrance/exit delays.
- **`createLocalStorage` / `createSessionStorage`** — SolidJS reactive primitives for Web Storage state synchronization across tabs.
- **`createPrevious`** — SolidJS reactive primitive for tracking previous value of a signal accessor.
- **`createNetworkStatus` / `createOnline`** — SolidJS reactive primitives for tracking browser network connectivity and connection quality metrics.
- **`createColorMode`** — SolidJS reactive primitive for managing dark/light themes and system preferences.
- **`createForm`** — SolidJS reactive primitive for form state management, field validation, errors, and submission.
- **`createInputMask`** — SolidJS reactive primitive for input value masking (phone numbers, credit cards, dates).
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
