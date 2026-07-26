import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function ThemingArchitectureSection() {
  return (
    <div class="space-y-4">
      <DocSectionHeader
        title="Core Architecture"
        description="Nikala UI implements a semantic, CSS-variable-driven theming architecture designed natively for Tailwind CSS v4."
      />

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card class="bg-card/50">
          <CardHeader class="p-4">
            <CardTitle class="text-sm font-semibold">1. Tailwind v4 @theme Tokens</CardTitle>
            <CardDescription class="text-xs">
              Maps semantic utility names (<code class="bg-muted px-1 py-0.5 rounded">bg-primary</code>, <code class="bg-muted px-1 py-0.5 rounded">border-border</code>) to CSS variables.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card class="bg-card/50">
          <CardHeader class="p-4">
            <CardTitle class="text-sm font-semibold">2. CSS Custom Properties</CardTitle>
            <CardDescription class="text-xs">
              Holds exact color hex values in <code class="bg-muted px-1 py-0.5 rounded">:root</code> and <code class="bg-muted px-1 py-0.5 rounded">.dark</code> schemes.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card class="bg-card/50">
          <CardHeader class="p-4">
            <CardTitle class="text-sm font-semibold">3. ThemeProvider Context</CardTitle>
            <CardDescription class="text-xs">
              Controls client-side class switching, localStorage persistence, and Web View Transitions.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}