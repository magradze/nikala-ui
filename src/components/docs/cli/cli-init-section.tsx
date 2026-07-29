import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { CodeBlock } from "@/components/code-block";
import { formatCliCmd } from "@/lib/cli-formatter";

export function CliInitSection() {
  const initCmd = () => formatCliCmd("init");

  return (
    <div class="space-y-4">
      <DocSectionHeader
        title="1. Initialization"
        description="Run the initialization command in your SolidJS workspace to configure path aliases, CSS design tokens, and utility helpers."
      />
      <CodeBlock code={initCmd()} lang="bash" />
    </div>
  );
}