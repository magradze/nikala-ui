import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { CodeBlock } from "@/components/code-block";
import { formatCliCmd } from "@/lib/cli-formatter";

export function CliListSection() {
  const listAllCmd = () => formatCliCmd("list");
  const listInstalledCmd = () => formatCliCmd("list --installed");
  const listHooksCmd = () => formatCliCmd("list --hook");
  const listComponentsCmd = () => formatCliCmd("list --component");
  const listJsonCmd = () => formatCliCmd("list --json");

  return (
    <div class="space-y-6">
      <DocSectionHeader
        title="3. Listing & Catalog Inspection"
        description="Inspect all available registry components and reactive hooks, with live indicators showing which items are already installed in your project."
      />

      <div class="space-y-3">
        <h3 class="text-lg font-medium tracking-tight">
          List All Available & Installed Items
        </h3>
        <p class="text-sm text-muted-foreground">
          Running <code class="text-primary font-mono font-semibold">nikala list</code> (or <code class="text-primary font-mono font-semibold">nikala ls</code>) displays the complete catalog of 60 UI components and 43 reactive hooks.
        </p>
        <CodeBlock code={listAllCmd()} lang="bash" />
      </div>

      <div class="space-y-3">
        <h3 class="text-lg font-medium tracking-tight">
          Filter by Locally Installed Items (--installed)
        </h3>
        <p class="text-sm text-muted-foreground">
          Show only the components and hooks currently present in your project:
        </p>
        <CodeBlock code={listInstalledCmd()} lang="bash" />
      </div>

      <div class="space-y-3">
        <h3 class="text-lg font-medium tracking-tight">
          Filter by Type (--component / --hook)
        </h3>
        <p class="text-sm text-muted-foreground">
          Filter the catalog to display only UI components or only reactive hooks:
        </p>
        <CodeBlock code={listComponentsCmd()} lang="bash" />
        <CodeBlock code={listHooksCmd()} lang="bash" />
      </div>

      <div class="space-y-3">
        <h3 class="text-lg font-medium tracking-tight">
          JSON Output Format (--json)
        </h3>
        <p class="text-sm text-muted-foreground">
          Output the full catalog and installation status as machine-readable JSON for CI/CD scripts and AI workflows:
        </p>
        <CodeBlock code={listJsonCmd()} lang="bash" />
      </div>
    </div>
  );
}
