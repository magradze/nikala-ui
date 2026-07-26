import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { CodeBlock } from "@/components/code-block";

const addThemeManagerCmd = `nikala add theme-manager`;

const themeProviderCode = `import { ThemeProvider } from "@/providers/theme-provider";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="nikala-theme">
      <div class="min-h-screen bg-background text-foreground">
        <header class="flex items-center justify-between p-4 border-b border-border">
          <h1>Application Title</h1>
          <ThemeToggle mode="max" effect="circular" />
        </header>
      </div>
    </ThemeProvider>
  );
}`;

export function ThemingManagerSection() {
  return (
    <div class="space-y-6">
      <DocSectionHeader
        title="Runtime Theme Manager (theme-manager)"
        description="Zero-dependency theme provider, brand accent color customizer, border-radius controls, and transition animations."
      />

      <div class="space-y-3">
        <p class="text-sm text-muted-foreground">Add theme-manager to your workspace:</p>
        <CodeBlock code={addThemeManagerCmd} lang="bash" />
      </div>

      <div class="space-y-3">
        <p class="text-sm text-muted-foreground">Wrap your application root component:</p>
        <CodeBlock code={themeProviderCode} lang="tsx" />
      </div>
    </div>
  );
}