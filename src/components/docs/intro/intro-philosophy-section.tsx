import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Box, Palette, Wrench, Zap } from "lucide-solid";

export function IntroPhilosophySection() {
  return (
    <div class="space-y-4">
      <DocSectionHeader title="Core Philosophy" />
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card class="bg-card/50">
          <CardHeader>
            <CardTitle class="text-base flex gap-2"><Zap /> Native SolidJS Reactivity</CardTitle>
            <CardDescription class="text-xs">
              Built strictly with <code class="bg-muted px-1 py-0.5 rounded">splitProps</code> to preserve fine-grained signal tracking without object destructuring bugs.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card class="bg-card/50">
          <CardHeader>
            <CardTitle class="text-base flex gap-2"><Palette /> Tailwind CSS v4 First</CardTitle>
            <CardDescription class="text-xs">
              Designed around modern CSS-first setups with semantic variable design tokens (<code class="bg-muted px-1 py-0.5 rounded">--primary</code>, <code class="bg-muted px-1 py-0.5 rounded">--background</code>).
            </CardDescription>
          </CardHeader>
        </Card>

        <Card class="bg-card/50">
          <CardHeader>
            <CardTitle class="text-base flex gap-2"><Wrench /> Full Code Ownership</CardTitle>
            <CardDescription class="text-xs">
              Components live inside your codebase. Customize, tweak, or extend them as your application grows.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card class="bg-card/50">
          <CardHeader>
            <CardTitle class="text-base flex gap-2"><Zap /> Smart CLI</CardTitle>
            <CardDescription class="text-xs">
              Auto-detects Bun, pnpm, npm, yarn, and framework environments (Vite, Tauri, SolidStart, Electron).
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}