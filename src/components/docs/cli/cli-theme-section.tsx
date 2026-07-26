import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { CodeBlock } from "@/components/code-block";

const themeInteractiveCmd = `nikala theme`;
const themeSetCmd = `# Set primary accent color and base gray palette\nnikala theme set sky slate\n\n# Set Pirosmani wine accent\nnikala theme set wine zinc`;

export function CliThemeSection() {
  return (
    <div class="space-y-6">
      <DocSectionHeader
        title="5. CLI Theme Customization (nikala theme)"
        description="Allows switching base gray palettes and primary brand accent colors directly from terminal without re-running initialization."
      />

      <div class="space-y-3">
        <h3 class="text-lg font-medium tracking-tight">Interactive Selection Menu</h3>
        <CodeBlock code={themeInteractiveCmd} lang="bash" />
      </div>

      <div class="space-y-3">
        <h3 class="text-lg font-medium tracking-tight">Direct Command Execution</h3>
        <CodeBlock code={themeSetCmd} lang="bash" />
      </div>
    </div>
  );
}