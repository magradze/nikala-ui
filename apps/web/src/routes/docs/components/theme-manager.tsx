// src/routes/docs/components/theme-manager.tsx
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { ThemeToggle } from "@/components/ui/theme-toggle";

/* --- Code Snippets --- */
const importCode = `import { ThemeProvider, ThemeScript } from "@/providers/theme-provider";
import { ThemeToggle } from "@/components/ui/theme-toggle";`;

const miniCode = `<ThemeToggle mode="mini" effect="circular" />`;

const maxCode = `<ThemeToggle mode="max" effect="circular" />`;

const effectsCode = `<div class="flex items-center gap-6">
  <div class="flex flex-col items-center gap-2">
    <span class="text-xs text-muted-foreground font-mono">effect="circular"</span>
    <ThemeToggle mode="mini" effect="circular" />
  </div>

  <div class="flex flex-col items-center gap-2">
    <span class="text-xs text-muted-foreground font-mono">effect="fade"</span>
    <ThemeToggle mode="mini" effect="fade" />
  </div>

  <div class="flex flex-col items-center gap-2">
    <span class="text-xs text-muted-foreground font-mono">effect="none"</span>
    <ThemeToggle mode="mini" effect="none" />
  </div>
</div>`;

export default function ThemeManagerDocsPage() {
  return (
    <>
      <Seo
        title="Theme Manager Component"
        description="Zero-dependency theme provider, brand accent customizer, border-radius controls, and view transition animations for SolidJS."
        path="/docs/components/theme-manager"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="Theme Manager"
          badge="Zero-Dependency"
          description="A complete theme management suite featuring ThemeProvider, zero-FOUC ThemeScript, dynamic accent color swatches, radius controls, and Web View Transitions."
        />

        {/* Hero Live Preview */}
        <ComponentPreview name="theme-manager" code={maxCode}>
          <div class="flex items-center gap-6">
            <ThemeToggle mode="max" effect="circular" />
          </div>
        </ComponentPreview>

        {/* Usage & Import */}
        <div class="space-y-4">
          <DocSectionHeader title="Usage" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        {/* Examples */}
        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          {/* Mini Dropdown Mode */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Mini Mode</h3>
            <p class="text-sm text-muted-foreground">
              Pass <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">mode="mini"</code> for a compact dropdown menu toggle button.
            </p>
            <ComponentPreview name="theme-manager" code={miniCode}>
              <ThemeToggle mode="mini" effect="circular" />
            </ComponentPreview>
          </div>

          {/* View Transition Animations */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">View Transition Effects</h3>
            <p class="text-sm text-muted-foreground">
              Customize the Web View Transitions animation using <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">effect="circular | fade | none"</code>.
            </p>
            <ComponentPreview name="theme-manager" code={effectsCode}>
              <div class="flex items-center gap-6">
                <div class="flex flex-col items-center gap-2">
                  <span class="text-xs text-muted-foreground font-mono">effect="circular"</span>
                  <ThemeToggle mode="mini" effect="circular" />
                </div>

                <div class="flex flex-col items-center gap-2">
                  <span class="text-xs text-muted-foreground font-mono">effect="fade"</span>
                  <ThemeToggle mode="mini" effect="fade" />
                </div>

                <div class="flex flex-col items-center gap-2">
                  <span class="text-xs text-muted-foreground font-mono">effect="none"</span>
                  <ThemeToggle mode="mini" effect="none" />
                </div>
              </div>
            </ComponentPreview>
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="ThemeToggle"
            items={[
              {
                prop: "mode",
                type: '"mini" | "max"',
                default: '"mini"',
                description: 'Presentation mode ("mini" renders a simple dropdown, "max" renders a full customizer panel).',
              },
              {
                prop: "effect",
                type: '"none" | "circular" | "fade"',
                default: '"none"',
                description: "Web View Transition animation effect when switching theme modes.",
              },
            ]}
          />

          <DocApiTable
            title="ThemeProvider"
            items={[
              {
                prop: "defaultTheme",
                type: '"light" | "dark" | "system"',
                default: '"system"',
                description: "Initial fallback theme mode on load if no saved preference exists.",
              },
              {
                prop: "storageKey",
                type: "string",
                default: '"nikala-theme"',
                description: "LocalStorage key namespace used for theme persistence.",
              },
              {
                prop: "defaultAccent",
                type: '"amber" | "violet" | "sky" | "emerald" | "rose" | "zinc"',
                default: "-",
                description: "Initial primary brand accent color override.",
              },
              {
                prop: "defaultRadius",
                type: '"0" | "0.3" | "0.5" | "0.75" | "1.0"',
                default: "-",
                description: "Initial border radius override in rem units.",
              },
            ]}
          />

          <DocApiTable
            title="ThemeScript"
            items={[
              {
                prop: "storageKey",
                type: "string",
                default: '"nikala-theme"',
                description: "LocalStorage key namespace used by pre-hydration inline script.",
              },
              {
                prop: "defaultTheme",
                type: '"light" | "dark" | "system"',
                default: '"system"',
                description: "Initial fallback theme mode before hydration.",
              },
            ]}
          />
        </div>

        {/* Footer Navigation */}
        <DocNextSteps
          prev={{ title: "Textarea Component", href: "/docs/components/textarea" }}
          next={{ title: "Introduction", href: "/docs" }}
        />
      </div>
    </>
  );
}