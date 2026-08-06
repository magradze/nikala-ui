import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { CodeBlock } from "@/components/code-block";
import { formatCliCmd } from "@/lib/cli-formatter";

export function ThemingCliSection() {
  const themeInteractiveCmd = () => formatCliCmd("theme");
  const themeSetCmd = () =>
    `# Set primary accent color and base gray palette\n${formatCliCmd("theme set sky slate")}\n\n# Set Amber accent\n${formatCliCmd("theme set amber zinc")}`;

  return (
    <div class="space-y-4">
      <DocSectionHeader
        title="CLI Theme Commands"
        description="Switch brand accent colors or base palettes anytime without re-running initialization."
      />

      <div class="space-y-3">
        <p class="text-sm text-muted-foreground">Interactive theme selection menu:</p>
        <CodeBlock code={themeInteractiveCmd()} lang="bash" />

        <p class="text-sm text-muted-foreground pt-2">Direct command execution:</p>
        <CodeBlock code={themeSetCmd()} lang="bash" />
      </div>
    </div>
  );
}