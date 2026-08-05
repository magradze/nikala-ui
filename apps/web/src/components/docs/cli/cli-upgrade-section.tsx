import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { CodeBlock } from "@/components/code-block";
import { getCliRunnerPrefix } from "@/lib/cli-formatter";

export function CliUpgradeSection() {
  const prefix = () => getCliRunnerPrefix();

  return (
    <div class="space-y-4">
      <DocSectionHeader
        title="Upgrade & Update"
        description="Upgrade your installed components and hooks to the latest registry versions with automatic dependency resolution."
      />

      <div class="space-y-3">
        <p class="text-sm text-muted-foreground">
          Run interactive upgrade mode to select which installed components to update, or specify exact names:
        </p>

        <CodeBlock
          code={`# Interactive upgrade mode
${prefix()} upgrade

# Upgrade specific components or hooks
${prefix()} update button dialog create-clipboard

# Upgrade all installed items in project
${prefix()} upgrade --all`}
          lang="bash"
        />
      </div>
    </div>
  );
}
