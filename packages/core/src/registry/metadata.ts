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