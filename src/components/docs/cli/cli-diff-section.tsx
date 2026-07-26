import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { CodeBlock } from "@/components/code-block";

const diffCmd = `nikala diff\n# or for a specific component\nnikala diff button`;

export function CliDiffSection() {
  return (
    <div class="space-y-4">
      <DocSectionHeader
        title="4. Code Inspector (nikala diff)"
        description="Compares your local component implementations against official manifests on GitHub Raw CDN to inspect upstream style updates or bug fixes."
      />
      <CodeBlock code={diffCmd} lang="bash" />
    </div>
  );
}