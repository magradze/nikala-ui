// src/routes/docs/hooks/create-color-mode.tsx
import { createColorMode } from "@nikala-ui/hooks";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";

const importCode = `import { createColorMode } from "@nikala-ui/hooks";`;

const basicUsageCode = `const { mode, setMode, toggleColorMode, isDark } = createColorMode({
  initialValue: "system",
  storageKey: "nikala-color-mode",
});

return (
  <div class="flex items-center gap-2">
    <Button onClick={toggleColorMode}>
      Toggle Mode ({isDark() ? "Dark" : "Light"})
    </Button>
    <Button variant="outline" onClick={() => setMode("system")}>
      System Default
    </Button>
  </div>
);`;

export function ColorModeDemo() {
  const { mode, setMode, toggleColorMode, isDark } = createColorMode({
    initialValue: "system",
    storageKey: "nikala-demo-color-mode",
  });

  return (
    <div class="space-y-4 max-w-sm w-full min-h-[180px] flex flex-col items-center justify-center text-center">
      <div class="w-full p-4 rounded-xl border border-border bg-card shadow-xs text-xs font-mono space-y-2 text-left">
        <div>Selected Mode: <span class="font-bold text-foreground uppercase">{mode()}</span></div>
        <div>Is Dark Resolved: <span class="font-bold text-emerald-500">{isDark() ? "YES" : "NO"}</span></div>
      </div>

      <div class="flex items-center gap-1.5">
        <Button
          size="sm"
          variant={mode() === "light" ? "default" : "outline"}
          onClick={() => setMode("light")}
          class="h-7 text-xs px-2.5"
        >
          Light
        </Button>
        <Button
          size="sm"
          variant={mode() === "dark" ? "default" : "outline"}
          onClick={() => setMode("dark")}
          class="h-7 text-xs px-2.5"
        >
          Dark
        </Button>
        <Button
          size="sm"
          variant={mode() === "system" ? "default" : "outline"}
          onClick={() => setMode("system")}
          class="h-7 text-xs px-2.5"
        >
          System
        </Button>
      </div>
    </div>
  );
}

export default function CreateColorModeDocPage() {
  return (
    <>
      <Seo
        title="createColorMode Primitive"
        description="SolidJS reactive primitive for managing dark/light color mode themes and system preferences."
        path="/docs/hooks/create-color-mode"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="createColorMode"
          badge="primitive"
          description="A reactive primitive for managing dark mode, light mode, and system preference color scheme synchronization with localStorage persistence."
        />

        {/* Live Interactive Hero Preview */}
        <ComponentPreview name="create-color-mode" code={basicUsageCode}>
          <ColorModeDemo />
        </ComponentPreview>

        {/* Import */}
        <div class="space-y-4">
          <DocSectionHeader title="Import" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        {/* Examples Section */}
        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          {/* Basic Usage */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Toggle Theme & Storage Persistence</h3>
            <p class="text-sm text-muted-foreground">
              Call <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">createColorMode(&#123; storageKey: 'app-theme' &#125;)</code> to control theme class on document element.
            </p>
            <CodeBlock code={basicUsageCode} lang="tsx" />
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="CreateColorModeOptions & Return"
            items={[
              {
                prop: "mode",
                type: "Accessor<'light' | 'dark' | 'system'>",
                default: "'system'",
                description: "Signal accessor returning active color mode preference.",
                required: true,
              },
              {
                prop: "isDark",
                type: "Accessor<boolean>",
                default: "false",
                description: "Signal accessor indicating whether resolved theme is dark.",
                required: true,
              },
              {
                prop: "setMode",
                type: "(mode: 'light' | 'dark' | 'system') => void",
                default: "-",
                description: "Function to change color mode and save to localStorage.",
              },
              {
                prop: "toggleColorMode",
                type: "() => void",
                default: "-",
                description: "Function to toggle mode between light and dark.",
              },
            ]}
          />
        </div>

        {/* Footer Navigation */}
        <DocNextSteps
          prev={{ title: "createNetworkStatus Primitive", href: "/docs/hooks/create-network-status" }}
          next={{ title: "Accordion Component", href: "/docs/components/accordion" }}
        />
      </div>
    </>
  );
}
