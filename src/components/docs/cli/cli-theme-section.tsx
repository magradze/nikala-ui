import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { CodeBlock } from "@/components/code-block";
import { formatCliCmd } from "@/lib/cli-formatter";

export function CliThemeSection() {
  const themeInteractiveCmd = () => formatCliCmd("theme");
  const themeSetCmd = () =>
    `${formatCliCmd("theme set sky slate")}\n\n# Set Pirosmani wine accent\n${formatCliCmd("theme set wine zinc")}`;

  return (
    <div class="space-y-6">
      <DocSectionHeader
        title="5. CLI Theme Customization"
        description="Allows switching base gray palettes and primary brand accent colors directly from terminal without re-running initialization."
      />

      <div class="space-y-3">
        <h3 class="text-lg font-medium tracking-tight">Interactive Selection Menu</h3>
        <CodeBlock code={themeInteractiveCmd()} lang="bash" />
      </div>

      <div class="space-y-3">
        <h3 class="text-lg font-medium tracking-tight">Direct Command Execution</h3>
        <CodeBlock code={themeSetCmd()} lang="bash" />
      </div>
    </div>
  );
}