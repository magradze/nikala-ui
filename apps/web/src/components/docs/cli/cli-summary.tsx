import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getCliRunnerPrefix } from "@/lib/cli-formatter";

export function CliSummary() {
  const prefix = () => getCliRunnerPrefix();

  return (
    <div class="space-y-4">
      <DocSectionHeader title="Command Summary" />
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card class="bg-card/50">
          <CardHeader class="p-4">
            <CardTitle class="text-sm font-mono text-primary">
              {prefix()} init
            </CardTitle>
            <CardDescription class="text-xs">
              Initializes configuration, path aliases, and OKLCH CSS design tokens.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card class="bg-card/50">
          <CardHeader class="p-4">
            <CardTitle class="text-sm font-mono text-primary">
              {prefix()} add
            </CardTitle>
            <CardDescription class="text-xs">
              Installs reactive components directly into your codebase.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card class="bg-card/50">
          <CardHeader class="p-4">
            <CardTitle class="text-sm font-mono text-primary">
              {prefix()} upgrade
            </CardTitle>
            <CardDescription class="text-xs">
              Syncs and upgrades installed components to latest registry versions.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card class="bg-card/50">
          <CardHeader class="p-4">
            <CardTitle class="text-sm font-mono text-primary">
              {prefix()} remove
            </CardTitle>
            <CardDescription class="text-xs">
              Safely uninstalls or cleans installed components and reactive hooks.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card class="bg-card/50">
          <CardHeader class="p-4">
            <CardTitle class="text-sm font-mono text-primary">
              {prefix()} validate
            </CardTitle>
            <CardDescription class="text-xs">
              Runs workspace health diagnostics on dependencies and CSS tokens.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card class="bg-card/50">
          <CardHeader class="p-4">
            <CardTitle class="text-sm font-mono text-primary">
              {prefix()} diff
            </CardTitle>
            <CardDescription class="text-xs">
              Compares local component code against upstream registry manifests.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}