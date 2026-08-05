import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { CodeBlock } from "@/components/code-block";
import { getCliRunnerPrefix } from "@/lib/cli-formatter";

export function CliRemoveSection() {
  const prefix = () => getCliRunnerPrefix();

  return (
    <div class="space-y-4">
      <DocSectionHeader
        title="Remove & Uninstall"
        description="Safely remove or uninstall UI components and reactive hooks from your codebase."
      />

      <div class="space-y-3">
        <p class="text-sm text-muted-foreground">
          Interactive removal mode scans installed items, prompts for confirmation, and cleans up component files:
        </p>

        <CodeBlock
          code={`# Interactive removal mode for components
${prefix()} remove

# Uninstall specific components
${prefix()} uninstall button dialog

# Remove reactive hooks
${prefix()} remove -h create-clipboard`}
          lang="bash"
        />
      </div>
    </div>
  );
}
