import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocCallout } from "@/components/docs/doc-callout";
import { CodeBlock } from "@/components/code-block";
import { Lightbulb } from "lucide-solid";
import { formatCliCmd } from "@/lib/cli-formatter";

export function CliAddSection() {
  const addInteractiveCmd = () => formatCliCmd("add");
  const addDirectCmd = () => formatCliCmd("add button input dialog");
  const addAllCmd = () => formatCliCmd("add --all");
  const addOverwriteCmd = () => formatCliCmd("add button --overwrite");
  const addRemoteCmd = () =>
    formatCliCmd("add https://example.com/registry/custom-widget.json");

  return (
    <div class="space-y-6">
      <DocSectionHeader
        title="2. Component Installation"
        description="Installs component source code directly into your src/components/ui directory and resolves NPM dependencies."
      />

      <div class="space-y-3">
        <h3 class="text-lg font-medium tracking-tight">
          Interactive Autocomplete Multiselect Mode
        </h3>
        <p class="text-sm text-muted-foreground">
          Running the add command without component names launches an interactive multiselect menu.
        </p>
        <CodeBlock code={addInteractiveCmd()} lang="bash" />
      </div>

      <div class="space-y-3">
        <h3 class="text-lg font-medium tracking-tight">Direct Component Installation</h3>
        <CodeBlock code={addDirectCmd()} lang="bash" />
      </div>

      <div class="space-y-3">
        <h3 class="text-lg font-medium tracking-tight">Installing All Components</h3>
        <CodeBlock code={addAllCmd()} lang="bash" />
      </div>

      <DocCallout variant="info" title="Remote Registries" icon={Lightbulb}>
        You can also install custom components directly from arbitrary HTTP(S) JSON manifests across the web.
      </DocCallout>

      <div class="space-y-3">
        <h3 class="text-lg font-medium tracking-tight">
          Installing from Remote Registry URLs
        </h3>
        <CodeBlock code={addRemoteCmd()} lang="bash" />
      </div>

      <div class="space-y-3">
        <h3 class="text-lg font-medium tracking-tight">
          Overwriting Existing Components
        </h3>
        <CodeBlock code={addOverwriteCmd()} lang="bash" />
      </div>
    </div>
  );
}