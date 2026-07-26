import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { CodeBlock } from "@/components/code-block";

const validateCmd = `nikala validate\n# or\nnikala doctor`;

export function CliValidateSection() {
  return (
    <div class="space-y-4">
      <DocSectionHeader
        title="3. Health Diagnostics (nikala validate / doctor)"
        description="Inspects your workspace for configuration issues, missing NPM packages (clsx, tailwind-merge, class-variance-authority), and corrupted CSS variables."
      />
      <CodeBlock code={validateCmd} lang="bash" />
    </div>
  );
}