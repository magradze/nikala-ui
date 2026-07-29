import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { CodeBlock } from "@/components/code-block";
import { formatCliCmd } from "@/lib/cli-formatter";

export function CliValidateSection() {
  const validateCmd = () => formatCliCmd("validate");

  return (
    <div class="space-y-4">
      <DocSectionHeader
        title="3. Health Diagnostics"
        description="Inspects your workspace for configuration issues, missing NPM packages, and corrupted CSS variables."
      />
      <CodeBlock code={validateCmd()} lang="bash" />
    </div>
  );
}