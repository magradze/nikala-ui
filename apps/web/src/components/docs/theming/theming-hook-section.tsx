import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { CodeBlock } from "@/components/code-block";

const useThemeCode = `import { useTheme } from "@/providers/theme-provider";

export function CustomControls() {
  const { theme, setTheme, accent, setAccent, radius, setRadius } = useTheme();

  return (
    <div class="flex gap-2">
      <button onClick={() => setTheme("dark")}>Dark Mode</button>
      <button onClick={() => setAccent("emerald")}>Emerald Accent</button>
      <button onClick={() => setRadius("0.75")}>Large Radius</button>
    </div>
  );
}`;

export function ThemingHookSection() {
  return (
    <div class="space-y-4">
      <DocSectionHeader
        title="useTheme() Hook API"
        description="Access and mutate theme parameters programmatically inside any child component."
      />
      <CodeBlock code={useThemeCode} lang="tsx" />
    </div>
  );
}
