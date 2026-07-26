import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function CliSummary() {
  return (
    <div class="space-y-4">
      <DocSectionHeader title="Command Summary" />
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card class="bg-card/50">
          <CardHeader class="p-4">
            <CardTitle class="text-sm font-mono text-primary">nikala init</CardTitle>
            <CardDescription class="text-xs">Initializes configuration, path aliases, and CSS design tokens.</CardDescription>
          </CardHeader>
        </Card>

        <Card class="bg-card/50">
          <CardHeader class="p-4">
            <CardTitle class="text-sm font-mono text-primary">nikala add</CardTitle>
            <CardDescription class="text-xs">Installs reactive components directly into your codebase.</CardDescription>
          </CardHeader>
        </Card>

        <Card class="bg-card/50">
          <CardHeader class="p-4">
            <CardTitle class="text-sm font-mono text-primary">nikala validate</CardTitle>
            <CardDescription class="text-xs">Runs workspace health diagnostics on dependencies and CSS tokens.</CardDescription>
          </CardHeader>
        </Card>

        <Card class="bg-card/50">
          <CardHeader class="p-4">
            <CardTitle class="text-sm font-mono text-primary">nikala diff</CardTitle>
            <CardDescription class="text-xs">Compares local component code against upstream registry manifests.</CardDescription>
          </CardHeader>
        </Card>

        <Card class="bg-card/50 sm:col-span-2 lg:col-span-2">
          <CardHeader class="p-4">
            <CardTitle class="text-sm font-mono text-primary">nikala theme</CardTitle>
            <CardDescription class="text-xs">Customizes base gray palettes and primary accent colors directly from CLI.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}