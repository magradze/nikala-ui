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
};