import { createSignal } from "solid-js";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Progress } from "@/components/ui/progress";

const importCode = `import { Progress } from "@/components/ui/progress";`;

const basicUsageCode = `<Progress value={60} />`;

const labeledCode = `<Progress value={75} label="Uploading file..." />`;

export function ProgressDemo() {
  const [value, setValue] = createSignal(45);

  return (
    <div class="w-full max-w-sm space-y-6">
      <Progress value={value()} label="Task Progress" />

      <div class="flex items-center gap-2">
        <button
          onClick={() => setValue((v) => Math.max(0, v - 15))}
          class="rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted"
        >
          -15%
        </button>
        <button
          onClick={() => setValue((v) => Math.min(100, v + 15))}
          class="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90"
        >
          +15%
        </button>
      </div>
    </div>
  );
}

export default function ProgressDocsPage() {
  return (
    <>
      <Seo
        title="Progress Component"
        description="Displays an indicator showing the completion progress of a task or media playback in SolidJS."
        path="/docs/components/progress"
      />

      <div class="space-y-10 pb-16">
        <DocPageHeader
          title="Progress"
          badge="Kobalte"
          description="Displays a visual progress bar indicator for loading states, task completion, and audio/video playback timelines."
        />

        <ComponentPreview name="progress" code={labeledCode}>
          <ProgressDemo />
        </ComponentPreview>

        <div class="space-y-4">
          <DocSectionHeader title="Usage" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Basic Progress Bar</h3>
            <p class="text-sm text-muted-foreground">
              Pass a numeric <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">value</code> (0-100) to display status.
            </p>
            <CodeBlock code={basicUsageCode} lang="tsx" />
          </div>

          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Labeled Progress Bar</h3>
            <p class="text-sm text-muted-foreground">
              Add a <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">label</code> prop to show accessible text and percentage output.
            </p>
            <CodeBlock code={labeledCode} lang="tsx" />
          </div>
        </div>

        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="Progress"
            items={[
              {
                prop: "value",
                type: "number",
                default: "0",
                description: "Current numeric progress value.",
              },
              {
                prop: "minValue",
                type: "number",
                default: "0",
                description: "Minimum value of the progress bar range.",
              },
              {
                prop: "maxValue",
                type: "number",
                default: "100",
                description: "Maximum value of the progress bar range.",
              },
              {
                prop: "label",
                type: "JSX.Element",
                default: "-",
                description: "Optional label element to display alongside percentage.",
              },
              {
                prop: "indicatorClass",
                type: "string",
                default: "-",
                description: "Custom styling classes for the inner indicator fill bar.",
              },
            ]}
          />
        </div>

        <DocNextSteps
          prev={{ title: "Popover Component", href: "/docs/components/popover" }}
          next={{ title: "Radio Group Component", href: "/docs/components/radio-group" }}
        />
      </div>
    </>
  );
}
