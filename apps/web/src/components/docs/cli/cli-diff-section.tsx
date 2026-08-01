import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { CodeBlock } from "@/components/code-block";
import { formatCliCmd } from "@/lib/cli-formatter";

export function CliDiffSection() {
  const diffCmd = () => formatCliCmd("diff");
  const diffSpecificCmd = () => formatCliCmd("diff button");

  return (
    <div class="space-y-4">
      <DocSectionHeader
        title="4. Code Inspector"
        description="Compares your local component implementations against official manifests on GitHub Raw CDN to inspect upstream style updates or bug fixes."
      />
      <CodeBlock code={`${diffCmd()}\n# or for a specific component\n${diffSpecificCmd()}`} lang="bash" />
    </div>
  );
}