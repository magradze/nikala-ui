import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { CodeBlock } from "@/components/code-block";
import { formatCliCmd } from "@/lib/cli-formatter";

export function CliInitSection() {
  const initCmd = () => formatCliCmd("init");
  const initAiCmd = () => formatCliCmd("init --ai");
  const rulesCmd = () => formatCliCmd("rules");

  return (
    <div class="space-y-4">
      <DocSectionHeader
        title="1. Initialization & AI Assistant Rules"
        description="Run the initialization command in your SolidJS workspace to configure path aliases, CSS design tokens, and utility helpers."
      />
      <CodeBlock code={initCmd()} lang="bash" />

      <p class="text-xs text-muted-foreground pt-1">
        Pass the <code class="text-primary font-mono font-semibold">--ai</code> flag to automatically generate AI assistant rules (<code class="font-mono">.cursor/rules/nikala.mdc</code>, <code class="font-mono">.cursorrules</code>, and <code class="font-mono">AGENTS.md</code>) enforcing strict SolidJS reactivity rules for Cursor, Claude, and GitHub Copilot:
      </p>
      <CodeBlock code={initAiCmd()} lang="bash" />

      <p class="text-xs text-muted-foreground pt-1">
        Or generate/update AI assistant rules in an existing project at any time:
      </p>
      <CodeBlock code={rulesCmd()} lang="bash" />
    </div>
  );
}