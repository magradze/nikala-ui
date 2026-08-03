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