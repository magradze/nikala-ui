import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocCallout } from "@/components/docs/doc-callout";
import { CodeBlock } from "@/components/code-block";
import { Lightbulb } from "lucide-solid";
import { formatCliCmd } from "@/lib/cli-formatter";

export function CliAddSection() {
  const addInteractiveCmd = () => formatCliCmd("add");
  const addHooksInteractiveCmd = () => formatCliCmd("add --hook");
  const addDirectCmd = () => formatCliCmd("add button input dialog");
  const addDirectHookCmd = () => formatCliCmd("add --hook create-audio create-fetch");
  const addAllCmd = () => formatCliCmd("add --all");
  const addOverwriteCmd = () => formatCliCmd("add button --overwrite");
  const addRemoteCmd = () =>
    formatCliCmd("add https://example.com/registry/custom-widget.json");

  return (
    <div class="space-y-6">
      <DocSectionHeader
        title="2. Component & Hook Installation"
        description="Installs component or primitive hook source code directly into your project directory and resolves dependencies."
      />

      <div class="space-y-3">
        <h3 class="text-lg font-medium tracking-tight">
          Interactive Autocomplete Multiselect Mode (UI Components)
        </h3>
        <p class="text-sm text-muted-foreground">
          Running the add command without component names launches an interactive multiselect menu for UI components.
        </p>
        <CodeBlock code={addInteractiveCmd()} lang="bash" />
      </div>

      <div class="space-y-3">
        <h3 class="text-lg font-medium tracking-tight">
          Interactive Hook Primitives Mode (--hook)
        </h3>
        <p class="text-sm text-muted-foreground">
          Pass the <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">--hook</code> (or <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">-h</code>) flag to filter and interactively select reactive primitives.
        </p>
        <CodeBlock code={addHooksInteractiveCmd()} lang="bash" />
      </div>

      <div class="space-y-3">
        <h3 class="text-lg font-medium tracking-tight">Direct Component & Hook Installation</h3>
        <CodeBlock code={addDirectCmd()} lang="bash" />
        <CodeBlock code={addDirectHookCmd()} lang="bash" />
      </div>

      <div class="space-y-3">
        <h3 class="text-lg font-medium tracking-tight">Installing All Components</h3>
        <CodeBlock code={addAllCmd()} lang="bash" />
      </div>

      <DocCallout variant="info" title="Remote Registries" icon={Lightbulb}>
        You can also install custom components or hooks directly from arbitrary HTTP(S) JSON manifests across the web.
      </DocCallout>

      <div class="space-y-3">
        <h3 class="text-lg font-medium tracking-tight">
          Installing from Remote Registry URLs
        </h3>
        <CodeBlock code={addRemoteCmd()} lang="bash" />
      </div>

      <div class="space-y-3">
        <h3 class="text-lg font-medium tracking-tight">
          Overwriting Existing Files
        </h3>
        <CodeBlock code={addOverwriteCmd()} lang="bash" />
      </div>
    </div>
  );
}