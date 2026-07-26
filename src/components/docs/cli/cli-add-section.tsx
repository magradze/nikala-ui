import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocCallout } from "@/components/docs/doc-callout";
import { CodeBlock } from "@/components/code-block";
import { Lightbulb } from "lucide-solid";

const addInteractiveCmd = `nikala add`;
const addDirectCmd = `nikala add button input dialog`;
const addAllCmd = `nikala add all\n# or\nnikala add --all`;
const addOverwriteCmd = `nikala add button --overwrite`;
const addRemoteCmd = `nikala add https://example.com/registry/custom-widget.json`;

export function CliAddSection() {
  return (
    <div class="space-y-6">
      <DocSectionHeader
        title="2. Component Installation (nikala add)"
        description="Installs component source code directly into your src/components/ui directory and resolves NPM dependencies."
      />

      <div class="space-y-3">
        <h3 class="text-lg font-medium tracking-tight">Interactive Autocomplete Multiselect Mode</h3>
        <p class="text-sm text-muted-foreground">
          Running <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">nikala add</code> without arguments launches an interactive multiselect menu.
        </p>
        <CodeBlock code={addInteractiveCmd} lang="bash" />
      </div>

      <div class="space-y-3">
        <h3 class="text-lg font-medium tracking-tight">Direct Component Installation</h3>
        <CodeBlock code={addDirectCmd} lang="bash" />
      </div>

      <div class="space-y-3">
        <h3 class="text-lg font-medium tracking-tight">Installing All Components</h3>
        <CodeBlock code={addAllCmd} lang="bash" />
      </div>

      <DocCallout variant="info" title="Remote Registries" icon={Lightbulb}>
        You can also install custom components directly from arbitrary HTTP(S) JSON manifests across the web.
      </DocCallout>

      <div class="space-y-3">
        <h3 class="text-lg font-medium tracking-tight">Installing from Remote Registry URLs</h3>
        <CodeBlock code={addRemoteCmd} lang="bash" />
      </div>

      <div class="space-y-3">
        <h3 class="text-lg font-medium tracking-tight">Overwriting Existing Components</h3>
        <CodeBlock code={addOverwriteCmd} lang="bash" />
      </div>
    </div>
  );
}