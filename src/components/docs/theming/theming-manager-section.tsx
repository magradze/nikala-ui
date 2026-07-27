// src/components/docs/theming/theming-manager-section.tsx
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocCallout } from "@/components/docs/doc-callout";
import { CodeBlock } from "@/components/code-block";
import { ShieldAlert } from "lucide-solid";

const addThemeManagerCmd = `nikala add theme-manager`;

const themeProviderCode = `import { ThemeProvider, ThemeScript } from "@/providers/theme-provider";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function App() {
  return (
    <>
      {/* Synchronously injected before DOM paint to eliminate SSR theme flickering */}
      <ThemeScript storageKey="nikala-theme" />

      <ThemeProvider defaultTheme="system" storageKey="nikala-theme">
        <div class="min-h-screen bg-background text-foreground">
          <header class="flex items-center justify-between p-4 border-b border-border">
            <h1>Application Title</h1>
            <ThemeToggle mode="max" effect="circular" />
          </header>
        </div>
      </ThemeProvider>
    </>
  );
}`;

const themeScriptPropsCode = `<ThemeScript 
  storageKey="nikala-theme" 
  defaultTheme="system" 
  defaultAccent="wine" 
  defaultRadius="0.5" 
/>`;

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

      {/* Anti-FOUC Callout */}
      <DocCallout
        variant="info"
        title="Zero-FOUC Pre-Hydration Injection"
        icon={ShieldAlert}
      >
        Include <code class="font-bold">ThemeScript</code> at the root of your app before <code class="font-bold">ThemeProvider</code>. It runs a lightweight inline script synchronously before DOM paint, preventing white theme flashes in Server-Side Rendering (SSR).
      </DocCallout>

      <div class="space-y-3">
        <p class="text-sm text-muted-foreground">Wrap your application root component:</p>
        <CodeBlock code={themeProviderCode} lang="tsx" />
      </div>

      <div class="space-y-3">
        <p class="text-sm text-muted-foreground">Customizing ThemeScript fallback defaults:</p>
        <CodeBlock code={themeScriptPropsCode} lang="tsx" />
      </div>
    </div>
  );
}