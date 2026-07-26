import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { CodeBlock } from "@/components/code-block";

const initCmd = `npx nikala init
# or
bunx nikala init`;

export function CliInitSection() {
  return (
    <div class="space-y-4">
      <DocSectionHeader
        title="1. Initialization (nikala init)"
        description="Run the initialization command in your SolidJS workspace to configure path aliases, CSS design tokens, and utility helpers."
      />
      <CodeBlock code={initCmd} lang="bash" />
    </div>
  );
}