export const SOLIDJS_RULES = `Nikala UI SolidJS Rules:
1. Props Splitting: NEVER destructure props directly. ALWAYS use splitProps(props, ["variant", "class"]).
2. Children Memoization: ALWAYS wrap props.children with children(() => props.children) when rendering dynamic child nodes in tabs or conditional branches.
3. Hook Imports: Copy-paste hooks locally to src/hooks/ and import via alias: import { createClipboard } from "@/hooks/create-clipboard".
`;

export const THEMING_RULES = `Nikala UI Theming & Styling Rules:
1. Max Border Radius: NEVER use rounded-xl, 2xl, or 3xl for containers or cards. The max allowed radius is rounded-lg.
2. Anti-FOUC ThemeScript: ALWAYS place <ThemeScript storageKey="..." /> synchronously in root head before ThemeProvider.
3. Tailwind v4 Tokens: Use semantic tokens like bg-background, text-foreground, bg-card, border-border, bg-primary.
`;

export const RESOURCE_LIST = [
  {
    uri: "nikala://rules/solidjs",
    name: "SolidJS Reactivity Guidelines",
    description: "Strict engineering rules for props splitting, fine-grained signals, and children memoization in SolidJS",
    mimeType: "text/plain",
  },
  {
    uri: "nikala://rules/theming",
    name: "Tailwind CSS v4 Design Tokens",
    description: "Semantic color tokens, anti-FOUC ThemeScript usage, and max rounded-lg border radius rule",
    mimeType: "text/plain",
  },
];
