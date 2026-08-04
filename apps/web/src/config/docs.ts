// src/config/docs.ts
import type { Component } from "solid-js";
import { BookOpen, Terminal, Palette } from "lucide-solid";
import { DocComponentItem, DocHookItem, DocGuideItem, NavSection } from "@/types";

/* --- Documentation Guides List --- */
export const DOCUMENTATION_LIST: DocGuideItem[] = [
  {
    title: "Introduction",
    subtitle: "Architecture philosophy and Niko Pirosmani tribute",
    href: "/docs",
    shortcut: "⌘1",
    icon: BookOpen,
  },
  {
    title: "CLI Reference",
    subtitle: "nikala init, add, validate, diff, theme",
    href: "/docs/cli",
    shortcut: "⌘2",
    icon: Terminal,
  },
  {
    title: "Theming Guide",
    subtitle: "Dynamic theme provider and color palettes",
    href: "/docs/theming",
    shortcut: "⌘3",
    icon: Palette,
  },
];

/* --- Hooks Registry List --- */
export const HOOKS_LIST: DocHookItem[] = [
  {
    name: "create-controllable-signal",
    title: "createControllableSignal",
    description: "SolidJS reactive primitive supporting both controlled and uncontrolled state management",
    href: "/docs/hooks/create-controllable-signal",
  },
  {
    name: "create-click-outside",
    title: "createClickOutside",
    description: "SolidJS reactive primitive for detecting click and pointer interactions outside target elements",
    href: "/docs/hooks/create-click-outside",
  },
  {
    name: "create-clipboard",
    title: "createClipboard",
    description: "SolidJS reactive primitive for copying text to clipboard with automatic status reset",
    href: "/docs/hooks/create-clipboard",
  },
  {
    name: "create-keybindings",
    title: "createKeybindings",
    description: "SolidJS reactive primitives for listening to keyboard shortcuts, key combinations, and Escape key presses",
    href: "/docs/hooks/create-keybindings",
  },
  {
    name: "create-lock-scroll",
    title: "createLockScroll",
    description: "SolidJS reactive primitive for locking body or container scrolling when overlays are active",
    href: "/docs/hooks/create-lock-scroll",
  },
  {
    name: "create-disclosure",
    title: "createDisclosure",
    description: "SolidJS reactive primitive for managing boolean open/close disclosure state with helper controls",
    href: "/docs/hooks/create-disclosure",
  },
  {
    name: "create-media-query",
    title: "createMediaQuery",
    description: "SolidJS reactive primitives for tracking CSS media queries and responsive Tailwind breakpoints",
    href: "/docs/hooks/create-media-query",
  },
  {
    name: "create-debounce",
    title: "createDebounce",
    description: "SolidJS reactive primitives for debouncing and throttling rate-limited function execution",
    href: "/docs/hooks/create-debounce",
  },
  {
    name: "create-intersection-observer",
    title: "createIntersectionObserver",
    description: "SolidJS reactive primitives for observing element visibility and viewport intersection status",
    href: "/docs/hooks/create-intersection-observer",
  },
  {
    name: "create-timer",
    title: "createTimer",
    description: "SolidJS reactive primitives for recurring interval ticks and formatted countdown timers",
    href: "/docs/hooks/create-timer",
  },
  {
    name: "create-resize-observer",
    title: "createResizeObserver",
    description: "SolidJS reactive primitives for tracking element width and height dimensions dynamically",
    href: "/docs/hooks/create-resize-observer",
  },
  {
    name: "create-window-size",
    title: "createWindowSize",
    description: "SolidJS reactive primitive for tracking window viewport inner width and height",
    href: "/docs/hooks/create-window-size",
  },
  {
    name: "create-scroll-position",
    title: "createScrollPosition",
    description: "SolidJS reactive primitive for tracking scroll position, scroll direction, and container bounds",
    href: "/docs/hooks/create-scroll-position",
  },
  {
    name: "create-focus-trap",
    title: "createFocusTrap",
    description: "SolidJS reactive primitive for trapping keyboard focus inside target container element for accessibility",
    href: "/docs/hooks/create-focus-trap",
  },
  {
    name: "create-mouse-position",
    title: "createMousePosition",
    description: "SolidJS reactive primitive for tracking global and element-relative mouse pointer coordinates",
    href: "/docs/hooks/create-mouse-position",
  },
  {
    name: "create-long-press",
    title: "createLongPress",
    description: "SolidJS reactive primitive for detecting long press / hold touch and pointer interactions",
    href: "/docs/hooks/create-long-press",
  },
  {
    name: "create-hover",
    title: "createHover",
    description: "SolidJS reactive primitive for tracking element hover state with entrance and exit delays",
    href: "/docs/hooks/create-hover",
  },
  {
    name: "create-storage",
    title: "createLocalStorage",
    description: "SolidJS reactive primitives for Web Storage state synchronization across components and browser tabs",
    href: "/docs/hooks/create-storage",
  },
  {
    name: "create-previous",
    title: "createPrevious",
    description: "SolidJS reactive primitive for tracking previous value of a signal accessor",
    href: "/docs/hooks/create-previous",
  },
  {
    name: "create-network-status",
    title: "createNetworkStatus",
    description: "SolidJS reactive primitives for tracking browser network connectivity and connection quality metrics",
    href: "/docs/hooks/create-network-status",
  },
  {
    name: "create-color-mode",
    title: "createColorMode",
    description: "SolidJS reactive primitive for managing dark/light themes and system preferences",
    href: "/docs/hooks/create-color-mode",
  },
  {
    name: "create-form",
    title: "createForm",
    description: "SolidJS reactive primitive for form state management, field validation, errors, and submission",
    href: "/docs/hooks/create-form",
  },
  {
    name: "create-input-mask",
    title: "createInputMask",
    description: "SolidJS reactive primitive for input value masking (phone numbers, credit cards, dates)",
    href: "/docs/hooks/create-input-mask",
  },
  {
    name: "create-idle",
    title: "createIdle",
    description: "SolidJS reactive primitive for detecting user inactivity with customizable timeout",
    href: "/docs/hooks/create-idle",
  },
  {
    name: "create-active-element",
    title: "createActiveElement",
    description: "SolidJS reactive primitive for tracking the currently focused DOM element",
    href: "/docs/hooks/create-active-element",
  },
  {
    name: "create-infinite-scroll",
    title: "createInfiniteScroll",
    description: "SolidJS reactive primitive for dynamic infinite scrolling, auto-fetching pages, and scroll pagination",
    href: "/docs/hooks/create-infinite-scroll",
  },
  {
    name: "create-fullscreen",
    title: "createFullscreen",
    description: "SolidJS reactive primitive for requesting and monitoring element or document fullscreen status",
    href: "/docs/hooks/create-fullscreen",
  },
  {
    name: "create-audio",
    title: "createAudio & createVideo",
    description: "SolidJS reactive primitives for controlling HTML audio and video playback, duration, volume, and seeking",
    href: "/docs/hooks/create-audio",
  },
];

/* --- Component Library Registry List --- */
export const COMPONENTS_LIST: DocComponentItem[] = [
  { name: "accordion", title: "Accordion", description: "Vertically stacked collapsible content sections", href: "/docs/components/accordion" },
  { name: "alert", title: "Alert", description: "Callout banner for user feedback with status variants", href: "/docs/components/alert" },
  { name: "avatar", title: "Avatar", description: "Profile image component with automatic fallback handling", href: "/docs/components/avatar" },
  { name: "badge", title: "Badge", description: "Status indicator and tag badges with multiple variants", href: "/docs/components/badge" },
  { name: "banner", title: "Banner", description: "Announcement banner with sticky positioning and dismissal", href: "/docs/components/banner" },
  { name: "breadcrumb", title: "Breadcrumb", description: "Accessible navigation trail hierarchy", href: "/docs/components/breadcrumb" },
  { name: "button", title: "Button", description: "Interactive button with variant and size options", href: "/docs/components/button" },
  { name: "card", title: "Card", description: "Compound card layout with header, title, and footer", href: "/docs/components/card" },
  { name: "checkbox", title: "Checkbox", description: "Checkable input box with custom checkmark indicator", href: "/docs/components/checkbox" },
  { name: "command", title: "Command", description: "Fast, accessible command palette and search modal", href: "/docs/components/command" },
  { name: "dialog", title: "Dialog", description: "Accessible modal window overlaying main content", href: "/docs/components/dialog" },
  { name: "dropdown-menu", title: "Dropdown Menu", description: "Full-featured context menu with submenus and items", href: "/docs/components/dropdown-menu" },
  { name: "input", title: "Input", description: "Reactive text input field with modern focus states", href: "/docs/components/input" },
  { name: "input-group", title: "Input Group", description: "Compound input wrapper with prefix and suffix addons", href: "/docs/components/input-group" },
  { name: "kbd", title: "Kbd", description: "Keyboard key and shortcut indicators for hotkeys", href: "/docs/components/kbd" },
  { name: "label", title: "Label", description: "Accessible caption label for form controls", href: "/docs/components/label" },
  { name: "list", title: "List", description: "Compound list components supporting icons, avatars, and hotkeys", href: "/docs/components/list" },
  { name: "radio-group", title: "Radio Group", description: "Accessible radio button group layout", href: "/docs/components/radio-group" },
  { name: "select", title: "Select", description: "Custom dropdown select menu component", href: "/docs/components/select" },
  { name: "separator", title: "Separator", description: "Visual or semantic horizontal/vertical line divider", href: "/docs/components/separator" },
  { name: "sheet", title: "Sheet", description: "Sliding panel component with slide-in animations", href: "/docs/components/sheet" },
  { name: "skeleton", title: "Skeleton", description: "Animated pulse loading placeholder", href: "/docs/components/skeleton" },
  { name: "switch", title: "Switch", description: "Toggle switch control for boolean states", href: "/docs/components/switch" },
  { name: "tabs", title: "Tabs", description: "Layered content switcher supporting horizontal/vertical tabs", href: "/docs/components/tabs" },
  { name: "textarea", title: "Textarea", description: "Multi-line text area field with focus styling", href: "/docs/components/textarea" },
  { name: "theme-manager", title: "Theme Manager", description: "Zero-dependency ThemeProvider and ThemeToggle", href: "/docs/components/theme-manager" },
  { name: "toast", title: "Toast", description: "Temporary feedback notification banners built on Kobalte primitives", href: "/docs/components/toast" },
  { name: "tooltip", title: "Tooltip", description: "Contextual hover information popup badge", href: "/docs/components/tooltip" },
  { name: "popover", title: "Popover", description: "Displays rich content in a portal layer triggered by a button", href: "/docs/components/popover" },
  { name: "progress", title: "Progress", description: "Displays an indicator showing completion progress of a task or media", href: "/docs/components/progress" },
];

/* --- Global Sidebar Navigation Config --- */
export const GETTING_STARTED_SECTION: NavSection = {
  title: "Getting Started",
  items: [
    { title: "Introduction", href: "/docs" },
    { title: "CLI Reference", href: "/docs/cli" },
    { title: "Theming", href: "/docs/theming" },
  ],
};

export const HOOKS_SECTION: NavSection = {
  title: "Hooks",
  items: HOOKS_LIST.map((hook) => ({
    title: hook.title,
    href: hook.href,
  })),
};

export const COMPONENTS_SECTION: NavSection = {
  title: "Components",
  items: COMPONENTS_LIST.map((comp) => ({
    title: comp.title,
    href: comp.href,
  })),
};

export const DOCS_SIDEBAR_NAVIGATION: NavSection[] = [
  GETTING_STARTED_SECTION,
  COMPONENTS_SECTION,
];

export const HOOKS_SIDEBAR_NAVIGATION: NavSection[] = [
  GETTING_STARTED_SECTION,
  HOOKS_SECTION,
];

export const COMPONENTS_SIDEBAR_NAVIGATION: NavSection[] = [
  GETTING_STARTED_SECTION,
  COMPONENTS_SECTION,
];