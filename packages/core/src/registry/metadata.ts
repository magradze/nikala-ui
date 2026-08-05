export interface ComponentMeta {
  title: string;
  description: string;
  dependencies?: string[];
  registryDependencies?: string[];
}

/**
 * Static metadata configuration for all registered Nikala UI components.
 * Extend this record when adding new TSX components.
 */
export const COMPONENT_METADATA: Record<string, ComponentMeta> = {
  button: {
    title: "Button",
    description: "An interactive button component with variant and size options.",
    dependencies: ["clsx", "tailwind-merge", "class-variance-authority"],
  },
  input: {
    title: "Input",
    description: "A standard text input field with styling variants.",
    dependencies: ["clsx", "tailwind-merge"],
  },
  card: {
    title: "Card",
    description: "A versatile container component with header, content, and footer sections.",
    dependencies: ["clsx", "tailwind-merge"],
  },
  badge: {
    title: "Badge",
    description: "A small badge component for status indicators and tags.",
    dependencies: ["clsx", "tailwind-merge", "class-variance-authority"],
  },
  avatar: {
    title: "Avatar",
    description: "An image element with fallback representation for representing users.",
    dependencies: ["clsx", "tailwind-merge"],
  },
  separator: {
    title: "Separator",
    description: "Visually or semantically separates content horizontally or vertically.",
    dependencies: ["clsx", "tailwind-merge"],
  },
  textarea: {
    title: "Textarea",
    description: "A multi-line text input field with responsive focus styles.",
    dependencies: ["clsx", "tailwind-merge"],
  },
  label: {
    title: "Label",
    description: "Accessible caption label for form controls and inputs.",
    dependencies: ["clsx", "tailwind-merge", "class-variance-authority"],
  },
  skeleton: {
    title: "Skeleton",
    description: "Renders an animated pulse loading placeholder for content loading states.",
    dependencies: ["clsx", "tailwind-merge"],
  },
  switch: {
    title: "Switch",
    description: "A control that allows the user to toggle between checked and unchecked states.",
    dependencies: ["clsx", "tailwind-merge"],
  },
  checkbox: {
    title: "Checkbox",
    description: "A control that allows the user to toggle between checked and unchecked options.",
    dependencies: ["clsx", "tailwind-merge"],
  },
  "radio-group": {
    title: "Radio Group",
    description: "A set of checkable buttons built on Kobalte primitives where only one button can be checked at a time.",
    dependencies: ["clsx", "tailwind-merge", "@kobalte/core"],
  },
  select: {
    title: "Select",
    description: "Displays a list of options for the user to pick from, built on Kobalte primitives.",
    dependencies: ["clsx", "tailwind-merge", "@kobalte/core"],
  },
  combobox: {
    title: "Combobox",
    description: "Searchable autocomplete dropdown with single/multi-selection tags, avatars, group headers, and customizable clear controls.",
    dependencies: ["clsx", "tailwind-merge", "@kobalte/core"],
  },
  tabs: {
    title: "Tabs",
    description: "A set of layered sections of content displayed one at a time.",
    dependencies: ["clsx", "tailwind-merge"],
  },
  accordion: {
    title: "Accordion",
    description: "A vertically stacked set of interactive headings built on Kobalte primitives.",
    dependencies: ["clsx", "tailwind-merge", "@kobalte/core"],
  },
  breadcrumb: {
    title: "Breadcrumb",
    description: "Displays the path to the current resource using a hierarchy of links.",
    dependencies: ["clsx", "tailwind-merge"],
  },
  alert: {
    title: "Alert",
    description: "Displays a callout banner for user feedback with variants, dismiss button, and timer.",
    dependencies: ["clsx", "tailwind-merge", "class-variance-authority"],
  },
  dialog: {
    title: "Dialog",
    description: "A modal window overlaying the main content, built on Kobalte primitives with blur and outside-click options.",
    dependencies: ["clsx", "tailwind-merge", "@kobalte/core"],
  },
  sheet: {
    title: "Sheet / Drawer",
    description: "Extends the dialog component to display content that slides in from screen edges.",
    dependencies: ["clsx", "tailwind-merge", "class-variance-authority", "@kobalte/core"],
  },
  "dropdown-menu": {
    title: "Dropdown Menu",
    description: "Displays a menu to the user—such as a set of actions or functions—triggered by a button or avatar.",
    dependencies: ["clsx", "tailwind-merge", "@kobalte/core"],
  },
  "theme-manager": {
    title: "Theme Manager",
    description: "Zero-dependency ThemeProvider and ThemeToggle component for switching light, dark, and system themes.",
    dependencies: ["clsx", "tailwind-merge", "@kobalte/core", "lucide-solid"],
    registryDependencies: ["button", "dropdown-menu"],
  },
  banner: {
    title: "Banner",
    description: "An announcement banner with sticky positioning, dismissal persistence, auto-hide timer, Lucide icons, and variant styles.",
    dependencies: ["clsx", "tailwind-merge", "class-variance-authority", "lucide-solid"],
  },
  list: {
    title: "List / List Item",
    description: "Compound list components supporting icons, avatars, titles, subtitles, hotkey badges, chevron indicators, and interactive links.",
    dependencies: ["clsx", "tailwind-merge", "class-variance-authority", "lucide-solid", "@kobalte/core"],
  },
  kbd: {
    title: "Kbd (Keyboard Key)",
    description: "Keyboard key and shortcut group indicators for displaying hotkeys.",
    dependencies: ["clsx", "tailwind-merge", "class-variance-authority"],
  },
  "input-group": {
    title: "Input Group",
    description: "Compound input wrapper for combining text inputs with prefix and suffix addons.",
    dependencies: ["clsx", "tailwind-merge", "class-variance-authority"],
    registryDependencies: ["kbd"],
  },
  command: {
    title: "Command / Command Palette",
    description: "Fast, accessible command palette and search modal built on Kobalte Dialog primitives with auto-filtering.",
    dependencies: [
      "clsx",
      "tailwind-merge",
      "class-variance-authority",
      "lucide-solid",
      "@kobalte/core",
    ],
    registryDependencies: ["kbd", "input-group", "list"],
  },
  toast: {
    title: "Toast / Sonner",
    description: "A succinct message displayed temporarily in a toast region, built on Kobalte primitives.",
    dependencies: ["clsx", "tailwind-merge", "class-variance-authority", "lucide-solid", "@kobalte/core"],
  },
  tooltip: {
    title: "Tooltip",
    description: "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it, built on Kobalte primitives.",
    dependencies: ["clsx", "tailwind-merge", "@kobalte/core"],
  },
  popover: {
    title: "Popover",
    description: "Displays rich content in a portal layer triggered by a button, built on Kobalte primitives.",
    dependencies: ["clsx", "tailwind-merge", "@kobalte/core", "lucide-solid"],
  },
  progress: {
    title: "Progress",
    description: "Displays an indicator showing the completion progress of a task or media playback, built on Kobalte primitives.",
    dependencies: ["clsx", "tailwind-merge", "@kobalte/core"],
  },
};

/**
 * Static metadata configuration for all registered Nikala UI primitives / hooks.
 */
export const HOOK_METADATA: Record<string, ComponentMeta> = {
  "create-controllable-signal": {
    title: "createControllableSignal",
    description: "SolidJS reactive primitive supporting both controlled and uncontrolled state management",
  },
  "create-click-outside": {
    title: "createClickOutside",
    description: "SolidJS reactive primitive for detecting click and pointer interactions outside target elements",
  },
  "create-clipboard": {
    title: "createClipboard",
    description: "SolidJS reactive primitive for copying text to clipboard with automatic status reset",
  },
  "create-keybindings": {
    title: "createKeybindings",
    description: "SolidJS reactive primitives for listening to keyboard shortcuts, key combinations, and Escape key presses",
  },
  "create-lock-scroll": {
    title: "createLockScroll",
    description: "SolidJS reactive primitive for locking body or container scrolling when overlays are active",
  },
  "create-disclosure": {
    title: "createDisclosure",
    description: "SolidJS reactive primitive for managing boolean open/close disclosure state with helper controls",
  },
  "create-media-query": {
    title: "createMediaQuery",
    description: "SolidJS reactive primitives for tracking CSS media queries and responsive Tailwind breakpoints",
  },
  "create-debounce": {
    title: "createDebounce",
    description: "SolidJS reactive primitives for debouncing and throttling rate-limited function execution",
  },
  "create-intersection-observer": {
    title: "createIntersectionObserver",
    description: "SolidJS reactive primitives for observing element visibility and viewport intersection status",
  },
  "create-timer": {
    title: "createTimer",
    description: "SolidJS reactive primitives for recurring interval ticks and formatted countdown timers",
  },
  "create-resize-observer": {
    title: "createResizeObserver",
    description: "SolidJS reactive primitives for tracking element width and height dimensions dynamically",
  },
  "create-window-size": {
    title: "createWindowSize",
    description: "SolidJS reactive primitive for tracking window viewport inner width and height",
  },
  "create-scroll-position": {
    title: "createScrollPosition",
    description: "SolidJS reactive primitive for tracking scroll position, scroll direction, and container bounds",
  },
  "create-focus-trap": {
    title: "createFocusTrap",
    description: "SolidJS reactive primitive for trapping keyboard focus inside target container element for accessibility",
  },
  "create-mouse-position": {
    title: "createMousePosition",
    description: "SolidJS reactive primitive for tracking global and element-relative mouse pointer coordinates",
  },
  "create-long-press": {
    title: "createLongPress",
    description: "SolidJS reactive primitive for detecting long press / hold touch and pointer interactions",
  },
  "create-hover": {
    title: "createHover",
    description: "SolidJS reactive primitive for tracking element hover state with entrance and exit delays",
  },
  "create-storage": {
    title: "createLocalStorage",
    description: "SolidJS reactive primitives for Web Storage state synchronization across components and browser tabs",
  },
  "create-previous": {
    title: "createPrevious",
    description: "SolidJS reactive primitive for tracking previous value of a signal accessor",
  },
  "create-network-status": {
    title: "createNetworkStatus",
    description: "SolidJS reactive primitives for tracking browser network connectivity and connection quality metrics",
  },
  "create-color-mode": {
    title: "createColorMode",
    description: "SolidJS reactive primitive for managing dark/light themes and system preferences",
  },
  "create-form": {
    title: "createForm",
    description: "SolidJS reactive primitive for form state management, field validation, errors, and submission",
  },
  "create-input-mask": {
    title: "createInputMask",
    description: "SolidJS reactive primitive for input value masking (phone numbers, credit cards, dates)",
  },
  "create-idle": {
    title: "createIdle",
    description: "SolidJS reactive primitive for detecting user inactivity with customizable timeout",
  },
  "create-active-element": {
    title: "createActiveElement",
    description: "SolidJS reactive primitive for tracking the currently focused DOM element",
  },
  "create-infinite-scroll": {
    title: "createInfiniteScroll",
    description: "SolidJS reactive primitive for dynamic infinite scrolling, auto-fetching pages, and scroll pagination",
  },
  "create-fullscreen": {
    title: "createFullscreen",
    description: "SolidJS reactive primitive for requesting and monitoring element or document fullscreen status",
  },
  "create-audio": {
    title: "createAudio & createVideo",
    description: "SolidJS reactive primitives for controlling HTML audio and video playback, duration, volume, and seeking",
  },
  "create-orientation": {
    title: "createOrientation",
    description: "SolidJS reactive primitive for observing mobile and desktop screen orientation changes and rotation angles",
  },
  "create-undo-redo": {
    title: "createUndoRedo",
    description: "SolidJS reactive primitive for undo/redo state history management, history stack tracking, and reverting actions",
  },
  "create-fetch": {
    title: "createFetch",
    description: "SolidJS reactive primitive for HTTP REST API fetching, request loading states, error handling, and refetching",
  },
  "create-geolocation": {
    title: "createGeolocation",
    description: "SolidJS reactive primitive for tracking browser Geolocation position, coordinates, speed, and GPS accuracy",
  },
  "create-permission": {
    title: "createPermission",
    description: "SolidJS reactive primitive for querying and observing browser permission status changes",
  },
  "create-battery": {
    title: "createBattery",
    description: "SolidJS reactive primitive for observing device battery status, charge level, and charging metrics",
  },
  "create-web-notification": {
    title: "createWebNotification",
    description: "SolidJS reactive primitive for sending browser desktop notifications and managing notification permissions",
  },
  "create-websocket": {
    title: "createWebSocket",
    description: "SolidJS reactive primitive for WebSocket client connections, auto-reconnection, and message passing",
  },
  "create-document-title": {
    title: "createDocumentTitle",
    description: "SolidJS reactive primitive for managing document title dynamically",
  },
  "create-favicon": {
    title: "createFavicon",
    description: "SolidJS reactive primitive for dynamically updating browser favicon element",
  },
  "create-event-source": {
    title: "createEventSource",
    description: "SolidJS reactive primitive for subscribing to Server-Sent Events (SSE) streams",
  },
  "create-scroll-into-view": {
    title: "createScrollIntoView",
    description: "SolidJS reactive primitive for scrolling a target element into view smooth or auto behavior",
  },
};