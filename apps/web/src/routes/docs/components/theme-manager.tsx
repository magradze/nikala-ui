// src/routes/docs/components/theme-manager.tsx
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Sparkles, Info } from "lucide-solid";

/* --- Code Snippets --- */
const installCliCode = `bunx @nikala-ui/cli add theme-manager`;

const solidStartSetupCode = `// src/app.tsx
import { MetaProvider } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { ThemeProvider } from "@/providers/theme-provider";
import { ThemeScript } from "@/providers/theme-script";
import "@/app.css";

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <ThemeProvider defaultTheme="system" storageKey="nikala-theme">
            {/* Anti-FOUC script executes synchronously before hydration */}
            <ThemeScript storageKey="nikala-theme" />
            <Suspense>{props.children}</Suspense>
          </ThemeProvider>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}`;

const viteSpaSetupCode = `// src/index.tsx (Vite / Tauri SPA)
import { render } from "solid-js/web";
import { ThemeProvider } from "@/providers/theme-provider";
import App from "./App";
import "./index.css";

render(
  () => (
    <ThemeProvider defaultTheme="system" storageKey="nikala-theme">
      <App />
    </ThemeProvider>
  ),
  document.getElementById("root")!
);`;

const programmaticCode = `import { useTheme } from "@/providers/theme-provider";
import { Button } from "@/components/ui/button";

export function CustomThemeSwitcher() {
  const { theme, setTheme, resolvedTheme, accent, setAccent } = useTheme();

  return (
    <div class="flex items-center gap-3">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setTheme(resolvedTheme() === "dark" ? "light" : "dark")}
      >
        Toggle Theme (Current: {resolvedTheme()})
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => setAccent("violet")}
      >
        Set Violet Accent
      </Button>
    </div>
  );
}`;

const buttonCode = `<ThemeToggle mode="button" effect="circular" />`;
const miniCode = `<ThemeToggle mode="mini" effect="circular" />`;
const maxCode = `<ThemeToggle mode="max" effect="circular" />`;

const effectsCode = `<div class="flex flex-wrap items-center gap-6">
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
        title="Theme Manager Component — Nikala UI"
        description="Zero-dependency theme provider, anti-FOUC script, brand accent customizer, border-radius controls, and Web View Transition animations for SolidJS."
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
          <div class="flex items-center justify-center p-4">
            <ThemeToggle mode="max" effect="circular" />
          </div>
        </ComponentPreview>

        {/* Installation */}
        <div class="space-y-4">
          <DocSectionHeader title="Installation" />
          <CodeBlock code={installCliCode} lang="bash" />
        </div>

        {/* Setup Guide */}
        <div class="space-y-6 pt-2">
          <DocSectionHeader title="Setup & Integration" />

          {/* Step 1 */}
          <div class="space-y-3">
            <h3 class="text-base font-semibold tracking-tight flex items-center gap-2">
              <span class="flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">1</span>
              Wrap your Application with ThemeProvider
            </h3>
            <p class="text-sm text-muted-foreground">
              Wrap the root of your application in <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">ThemeProvider</code> to provide reactive theme state across all components.
            </p>

            <Tabs defaultValue="solidstart">
              <TabsList>
                <TabsTrigger value="solidstart">SolidStart (SSR)</TabsTrigger>
                <TabsTrigger value="vite">Vite / Tauri (SPA)</TabsTrigger>
              </TabsList>

              <TabsContent value="solidstart" class="pt-2">
                <CodeBlock code={solidStartSetupCode} lang="tsx" />
              </TabsContent>

              <TabsContent value="vite" class="pt-2">
                <CodeBlock code={viteSpaSetupCode} lang="tsx" />
              </TabsContent>
            </Tabs>
          </div>

          {/* Step 2: Anti-FOUC */}
          <div class="space-y-3 pt-2">
            <h3 class="text-base font-semibold tracking-tight flex items-center gap-2">
              <span class="flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">2</span>
              Prevent Flash of Unstyled Content (Anti-FOUC)
            </h3>
            <p class="text-sm text-muted-foreground">
              In SSR environments (SolidStart), place <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">&lt;ThemeScript /&gt;</code> inside <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">ThemeProvider</code>. It injects a tiny inline script that reads localStorage and applies the theme class before HTML renders.
            </p>

            <Alert variant="default" class="border-primary/30 bg-primary/5">
              <Info class="size-4 text-primary" />
              <AlertTitle>Zero-FOUC Guarantee</AlertTitle>
              <AlertDescription>
                <code class="font-mono text-xs">ThemeScript</code> executes synchronously in the client browser before the stylesheet parses, eliminating any white flash when loading dark mode pages.
              </AlertDescription>
            </Alert>
          </div>

          {/* Step 3: Add ThemeToggle */}
          <div class="space-y-3 pt-2">
            <h3 class="text-base font-semibold tracking-tight flex items-center gap-2">
              <span class="flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">3</span>
              Add the ThemeToggle Component
            </h3>
            <p class="text-sm text-muted-foreground">
              Place <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">&lt;ThemeToggle /&gt;</code> in your Header, Navbar, or Titlebar actions slot.
            </p>
            <CodeBlock code={miniCode} lang="tsx" />
          </div>
        </div>

        {/* Examples */}
        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          {/* Button Toggle Mode */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Button Mode (Direct 1-Click Toggle)</h3>
            <p class="text-sm text-muted-foreground">
              Pass <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">mode="button"</code> for a simple, direct 1-click Dark/Light toggle switch without any dropdown menu.
            </p>
            <ComponentPreview name="theme-manager" code={buttonCode}>
              <div class="flex items-center justify-center p-4">
                <ThemeToggle mode="button" effect="circular" />
              </div>
            </ComponentPreview>
          </div>

          {/* Mini Dropdown Mode */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Mini Mode (Dropdown Menu)</h3>
            <p class="text-sm text-muted-foreground">
              Pass <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">mode="mini"</code> for a compact dropdown menu toggle button with Light, Dark, and System options.
            </p>
            <ComponentPreview name="theme-manager" code={miniCode}>
              <div class="flex items-center justify-center p-4">
                <ThemeToggle mode="mini" effect="circular" />
              </div>
            </ComponentPreview>
          </div>

          {/* Max Customizer Mode */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Max Mode (Full Theme Customizer)</h3>
            <p class="text-sm text-muted-foreground">
              Pass <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">mode="max"</code> for a complete theme designer panel with color mode switches, 6 accent palette swatches, and border-radius sliders.
            </p>
            <ComponentPreview name="theme-manager" code={maxCode}>
              <div class="flex items-center justify-center p-4">
                <ThemeToggle mode="max" effect="circular" />
              </div>
            </ComponentPreview>
          </div>

          {/* View Transition Animations */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Web View Transition Effects</h3>
            <p class="text-sm text-muted-foreground">
              Smoothly animate theme transitions using the native Web View Transitions API with <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">effect="circular | fade | none"</code>.
            </p>
            <ComponentPreview name="theme-manager" code={effectsCode}>
              <div class="flex flex-wrap items-center justify-center gap-8 p-4">
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

            <Alert variant="warning" class="border-border/60 bg-muted/30">
              <Info class="size-4 text-primary" />
              <AlertTitle>Platform & Engine Compatibility</AlertTitle>
              <AlertDescription class="space-y-1.5 text-xs text-muted-foreground">
                <p>
                  • <strong>Web & Desktop (Windows & macOS)</strong>: Full native support in Chromium browsers, Microsoft Edge WebView2 (Tauri on Windows), and Apple WKWebView (Tauri on macOS / Safari 18+).
                </p>
                <p>
                  • <strong>Desktop (Linux WebKitGTK)</strong>: In Tauri Linux environments, View Transitions automatically degrade to safe instant mode (<code class="bg-muted px-1 py-0.5 rounded font-mono">effect="none"</code>) to prevent WebKitGTK hardware layer faults.
                </p>
              </AlertDescription>
            </Alert>
          </div>

          {/* Programmatic Access */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Programmatic Control (`useTheme`)</h3>
            <p class="text-sm text-muted-foreground">
              Access and manipulate the active theme and accent colors programmatically anywhere in your component tree using the <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">useTheme()</code> hook.
            </p>
            <CodeBlock code={programmaticCode} lang="tsx" />
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
                type: '"button" | "mini" | "max"',
                default: '"mini"',
                description: 'Presentation mode ("button" renders a direct 1-click dark/light toggle switch, "mini" renders a compact dropdown, "max" renders a full customizer panel).',
              },
              {
                prop: "effect",
                type: '"none" | "circular" | "fade"',
                default: '"none"',
                description: "Web View Transition animation effect when switching theme modes.",
              },
              {
                prop: "variant",
                type: '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"',
                default: '"ghost"',
                description: "Visual appearance style of the toggle button or dropdown trigger.",
              },
              {
                prop: "size",
                type: '"default" | "sm" | "lg" | "icon"',
                default: '"icon"',
                description: "Size scale of the toggle button.",
              },
              {
                prop: "class",
                type: "string",
                default: "-",
                description: "Optional additional CSS classes.",
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

          <DocApiTable
            title="useTheme Return Value"
            items={[
              {
                prop: "theme",
                type: 'Accessor<"light" | "dark" | "system">',
                default: "-",
                description: "Active user preference theme signal.",
              },
              {
                prop: "setTheme",
                type: '(theme: "light" | "dark" | "system") => void',
                default: "-",
                description: "Setter function to update active theme mode.",
              },
              {
                prop: "resolvedTheme",
                type: 'Accessor<"light" | "dark">',
                default: "-",
                description: "Resolved effective theme mode accounting for system OS preference.",
              },
              {
                prop: "accent",
                type: "Accessor<string>",
                default: "-",
                description: "Active primary accent color name signal.",
              },
              {
                prop: "setAccent",
                type: "(accent: string) => void",
                default: "-",
                description: "Setter function to update brand accent color palette.",
              },
              {
                prop: "radius",
                type: "Accessor<string>",
                default: "-",
                description: "Active border radius in rem units signal.",
              },
              {
                prop: "setRadius",
                type: "(radius: string) => void",
                default: "-",
                description: "Setter function to update global border radius token.",
              },
            ]}
          />
        </div>

        {/* Footer Navigation */}
        <DocNextSteps
          prev={{ title: "Textarea Component", href: "/docs/components/textarea" }}
          next={{ title: "Desktop Suite", href: "/docs/desktop" }}
        />
      </div>
    </>
  );
}