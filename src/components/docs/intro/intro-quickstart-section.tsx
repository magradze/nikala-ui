import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { CodeBlock } from "@/components/code-block";

const initCode = `bunx @nikala-ui/cli init
# or
npx @nikala-ui/cli init
# or direct binary
nikala init`;

const addCode = `nikala add button card input theme-manager`;

export function IntroQuickstartSection() {
  return (
    <div class="space-y-4">
      <DocSectionHeader title="Quick Start" />
      <div class="space-y-3">
        <p class="text-sm text-muted-foreground">1. Initialize Nikala UI in your SolidJS project:</p>
        <CodeBlock code={initCode} lang="bash" />

        <p class="text-sm text-muted-foreground pt-2">2. Add components directly to your workspace:</p>
        <CodeBlock code={addCode} lang="bash" />
      </div>
    </div>
  );
}