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
    id: "register-01",
    name: "register-01",
    title: "Register 01 — Sign-Up Card with Password Strength",
    description: "A comprehensive sign-up card featuring social logins, live password strength meter with validation checklist, and terms agreement.",
    category: "authentication",
    dependencies: ["clsx", "tailwind-merge", "lucide-solid"],
    registryDependencies: ["card", "input", "label", "button", "checkbox", "progress", "badge", "separator"],
  },
  {
    id: "otp-verification-01",
    name: "otp-verification-01",
    title: "OTP Verification 01 — Two-Factor Security Code",
    description: "A clean 2-Factor Authentication block with a 6-digit PIN input, countdown resend timer, and security notifications.",
    category: "authentication",
    dependencies: ["clsx", "tailwind-merge", "lucide-solid"],
    registryDependencies: ["card", "pin-input", "button", "alert", "badge"],
  },
  {
    id: "forgot-password-01",
    name: "forgot-password-01",
    title: "Forgot Password 01 — Account Recovery Flow",
    description: "A sleek password recovery block with email instructions submission and success confirmation states.",
    category: "authentication",
    dependencies: ["clsx", "tailwind-merge", "lucide-solid"],
    registryDependencies: ["card", "input", "label", "button", "alert", "badge"],
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
