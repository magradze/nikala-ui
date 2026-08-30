import fs from "fs-extra";
import path from "node:path";
import pc from "picocolors";

const cursorRuleContent = `---
description: Nikala UI & SolidJS Reactivity Development Rules
globs: **/*.{ts,tsx,js,jsx}
alwaysApply: true
---

# Nikala UI & SolidJS Engineering Guidelines

> Nikala UI is a copy-paste component system and reactive primitives suite for SolidJS built natively for Tailwind CSS v4.

## 1. Strict SolidJS Reactivity Rules

1. **NEVER Destructure Props Directly**:
   - \`const { variant, class: className } = props;\` -> ❌ **FORBIDDEN** (breaks SolidJS fine-grained signal tracking).
   - \`const [local, others] = splitProps(props, ["variant", "class"]);\` -> ✅ **REQUIRED**.

2. **Children Inspection & Tab Hydration**:
   - ALWAYS wrap \`props.children\` with SolidJS's native \`children(() => props.children)\` memoization helper when inspecting, iterating, or rendering dynamic JSX child nodes inside containers or conditional branches.

3. **SSR Safety Guards**:
   - Always include \`typeof window !== "undefined"\` and \`typeof document !== "undefined"\` guards inside browser event listeners or DOM access logic to prevent SSR hydration crashes in SolidStart environments.

4. **Anti-FOUC Theme Script**:
   - When using \`ThemeProvider\`, ALWAYS place \`<ThemeScript storageKey="nikala-theme" />\` synchronously inside \`<head>\` or root HTML before \`<ThemeProvider>\` to eliminate flash of unstyled content during SSR.

## 2. Tailwind CSS v4 Native Design Tokens

- All components must use semantic design tokens defined in modern \`@import "tailwindcss";\` setups (\`bg-background\`, \`text-foreground\`, \`bg-card\`, \`border-border\`, \`bg-primary\`, etc.).
- Avoid hardcoded arbitrary color values; prefer semantic design tokens.

## 3. Pure Copy-Paste Primitives Ownership

- UI components are placed in \`src/components/ui/\` (or configured alias).
- Reactive hooks are placed in \`src/hooks/\` and imported locally:
  \`import { createClipboard } from "@/hooks/create-clipboard";\`
`;

const rootAgentsRuleContent = `# Nikala UI & SolidJS Development Guidelines

> Nikala UI is a copy-paste component system and reactive primitives suite for SolidJS built natively for Tailwind CSS v4.

## 1. Strict SolidJS Reactivity Rules

1. **NEVER Destructure Props Directly**:
   - \`const { variant, class: className } = props;\` -> ❌ **FORBIDDEN** (breaks SolidJS fine-grained signal tracking).
   - \`const [local, others] = splitProps(props, ["variant", "class"]);\` -> ✅ **REQUIRED**.

2. **Children Inspection & Tab Hydration**:
   - ALWAYS wrap \`props.children\` with SolidJS's native \`children(() => props.children)\` memoization helper when inspecting, iterating, or rendering dynamic JSX child nodes.

3. **SSR Safety Guards**:
   - Always include \`typeof window !== "undefined"\` and \`typeof document !== "undefined"\` guards inside browser event listeners or DOM access logic.

4. **Anti-FOUC Theme Script**:
   - When using \`ThemeProvider\`, ALWAYS place \`<ThemeScript storageKey="nikala-theme" />\` synchronously inside \`<head>\` or root HTML before \`<ThemeProvider>\`.

## 2. Tailwind CSS v4 Native Design Tokens

- All components must use semantic design tokens (\`bg-background\`, \`text-foreground\`, \`bg-card\`, \`border-border\`, \`bg-primary\`, etc.).

## 3. Pure Copy-Paste Primitives Ownership

- UI components live in \`src/components/ui/\`.
- Reactive hooks live in \`src/hooks/\` and are imported locally:
  \`import { createClipboard } from "@/hooks/create-clipboard";\`
`;

/**
 * Sets up AI rules (.cursor/rules/nikala.mdc, .cursorrules, AGENTS.md) in the target workspace.
 */
export async function setupAiRules(cwd: string) {
  try {
    // 1. .cursor/rules/nikala.mdc
    const cursorRulesDir = path.join(cwd, ".cursor", "rules");
    await fs.ensureDir(cursorRulesDir);
    const mdcPath = path.join(cursorRulesDir, "nikala.mdc");
    await fs.writeFile(mdcPath, cursorRuleContent.trim() + "\n", "utf-8");

    // 2. .cursorrules (legacy Cursor format)
    const cursorRulesPath = path.join(cwd, ".cursorrules");
    await fs.writeFile(cursorRulesPath, rootAgentsRuleContent.trim() + "\n", "utf-8");

    // 3. AGENTS.md / CLAUDE.md
    const agentsPath = path.join(cwd, "AGENTS.md");
    if (!(await fs.pathExists(agentsPath))) {
      await fs.writeFile(agentsPath, rootAgentsRuleContent.trim() + "\n", "utf-8");
    }

    console.log(pc.green("✓ Generated AI assistant rules (.cursor/rules/nikala.mdc, .cursorrules, AGENTS.md)"));
  } catch (error) {
    console.log(pc.yellow(`⚠️  Failed to write AI assistant rules: ${error}`));
  }
}
