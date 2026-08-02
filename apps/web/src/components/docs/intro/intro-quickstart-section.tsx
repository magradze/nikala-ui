import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { CodeBlock } from "@/components/code-block";
import { formatCliCmd } from "@/lib/cli-formatter";

export function IntroQuickstartSection() {
  const initCmd = () => formatCliCmd("init");
  const addCmd = () => formatCliCmd("add button card input theme-manager");

  return (
    <div class="space-y-4">
      <DocSectionHeader title="Quick Start" />
      <div class="space-y-3">
        <p class="text-sm text-muted-foreground">1. Initialize Nikala UI in your SolidJS project:</p>
        <CodeBlock code={initCmd()} lang="bash" />

        <p class="text-sm text-muted-foreground pt-2">2. Add components directly to your workspace:</p>
        <CodeBlock code={addCmd()} lang="bash" />
      </div>
    </div>
  );
}