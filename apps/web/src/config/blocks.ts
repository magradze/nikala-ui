export interface BlockItem {
  id: string;
  name: string;
  title: string;
  description: string;
  category: "authentication" | "hero" | "marketing" | "application";
  dependencies?: string[];
  registryDependencies?: string[];
}

export const BLOCKS_CATEGORIES = [
  { id: "all", label: "All Blocks" },
  { id: "authentication", label: "Authentication" },
  { id: "hero", label: "Hero" },
  { id: "marketing", label: "Marketing (Coming Soon)", disabled: true },
] as const;

export const BLOCKS_LIST: BlockItem[] = [
  {
    id: "login-01",
    name: "login-01",
    title: "Login 01 — Split Screen with Social Auth",
    description: "A modern split-screen authentication page block with OAuth providers, email sign-in form, and brand testimonial visual.",
    category: "authentication",
    dependencies: ["clsx", "tailwind-merge", "lucide-solid"],
    registryDependencies: ["button", "input", "label", "checkbox", "separator"],
  },
  {
    id: "hero-01",
    name: "hero-01",
    title: "Hero 01 — Simple Centered with Actions",
    description: "A clean centered hero section with badge pill, high-contrast headline, and dual CTA buttons.",
    category: "hero",
    dependencies: ["clsx", "tailwind-merge", "lucide-solid"],
    registryDependencies: ["button", "badge"],
  },
];
