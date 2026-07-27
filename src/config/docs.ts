// src/config/docs.ts
import type { Component } from "solid-js";
import { BookOpen, Terminal, Palette } from "lucide-solid";
import { DocComponentItem, DocGuideItem, NavSection } from "@/types";

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
];

/* --- Global Sidebar Navigation Config --- */
export const DOCS_SIDEBAR_NAVIGATION: NavSection[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "CLI Reference", href: "/docs/cli" },
      { title: "Theming", href: "/docs/theming" },
    ],
  },
  {
    title: "Components",
    items: COMPONENTS_LIST.map((comp) => ({
      title: comp.title,
      href: comp.href,
    })),
  },
];