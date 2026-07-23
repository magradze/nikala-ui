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
    description: "Renders an accessible label associated with form controls.",
    dependencies: ["clsx", "tailwind-merge"],
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
    description: "A set of checkable buttons where only one button can be checked at a time.",
    dependencies: ["clsx", "tailwind-merge"],
  },
  select: {
    title: "Select",
    description: "Displays a list of options for the user to pick from—triggered by a button.",
    dependencies: ["clsx", "tailwind-merge"],
  },
  tabs: {
    title: "Tabs",
    description: "A set of layered sections of content displayed one at a time.",
    dependencies: ["clsx", "tailwind-merge"],
  },
  accordion: {
    title: "Accordion",
    description: "A vertically stacked set of interactive headings that reveal sections of content.",
    dependencies: ["clsx", "tailwind-merge"],
  },
  breadcrumb: {
    title: "Breadcrumb",
    description: "Displays the path to the current resource using a hierarchy of links.",
    dependencies: ["clsx", "tailwind-merge"],
  },
};