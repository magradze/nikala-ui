// src/routes/docs/hooks/create-timer.tsx
import { createCountdown } from "@nikala-ui/hooks";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";

const importCode = `import { createTimer, createCountdown } from "@nikala-ui/hooks";`;

const basicUsageCode = `const { formatted, isRunning, toggle, reset } = createCountdown(60, {
  autostart: false,
  onComplete: () => console.log("Countdown finished!"),
});

return (
  <div class="space-y-3">
    <div class="text-2xl font-mono">{formatted()}</div>
    <div class="flex gap-2">
      <Button onClick={toggle}>{isRunning() ? "Pause" : "Start"}</Button>
      <Button variant="outline" onClick={reset}>Reset</Button>
    </div>
  </div>
);`;

export function TimerDemo() {
  const { formatted, isRunning, toggle, reset } = createCountdown(60, {
    autostart: false,
  });

  return (
    <div class="space-y-4 max-w-sm w-full min-h-[160px] flex flex-col items-center justify-center text-center">
      <div class="text-3xl font-bold font-mono tracking-wider p-4 rounded-lg border border-border bg-card shadow-xs text-foreground">
        {formatted()}
      </div>

      <div class="flex items-center gap-2">
        <Button size="sm" variant={isRunning() ? "secondary" : "default"} onClick={toggle}>
          {isRunning() ? "Pause" : "Start"}
        </Button>
        <Button size="sm" variant="outline" onClick={reset}>
          Reset
        </Button>
      </div>
    </div>
  );
}

export default function CreateTimerDocPage() {
  return (
    <>
      <Seo
        title="createTimer & createCountdown Primitives"
        description="SolidJS reactive primitives for recurring interval ticks and formatted countdown timers."
        path="/docs/hooks/create-timer"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="createTimer"
          badge="primitive"
          description="Reactive primitives for recurring interval timers and formatted countdown timers with play, pause, and reset controls."
        />

        {/* Live Interactive Hero Preview */}
        <ComponentPreview name="create-timer" code={basicUsageCode}>
          <TimerDemo />
        </ComponentPreview>

        {/* Import */}
        <div class="space-y-4">
          <DocSectionHeader title="Import" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        {/* Examples Section */}
        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          {/* Basic Usage */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Formatted Countdown Timer</h3>
            <p class="text-sm text-muted-foreground">
              Pass total duration in seconds to <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">createCountdown(seconds)</code> for built-in <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">MM:SS</code> formatting and control functions.
            </p>
            <CodeBlock code={basicUsageCode} lang="tsx" />
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="createCountdown Return Controls & Accessors"
            items={[
              {
                prop: "formatted",
                type: "Accessor<string>",
                default: "-",
                description: "Formatted MM:SS time string accessor.",
                required: true,
              },
              {
                prop: "remainingSeconds",
                type: "Accessor<number>",
                default: "-",
                description: "Raw remaining time in seconds accessor.",
              },
              {
                prop: "isRunning",
                type: "Accessor<boolean>",
                default: "false",
                description: "Signal accessor indicating whether timer is actively running.",
              },
              {
                prop: "start",
                type: "() => void",
                default: "-",
                description: "Starts or resumes the timer.",
              },
              {
                prop: "stop",
                type: "() => void",
                default: "-",
                description: "Pauses/stops the timer.",
              },
              {
                prop: "reset",
                type: "() => void",
                default: "-",
                description: "Resets timer to initial duration and starts running.",
              },
              {
                prop: "toggle",
                type: "() => void",
                default: "-",
                description: "Toggles between running and paused states.",
              },
            ]}
          />
        </div>

        {/* Footer Navigation */}
        <DocNextSteps
          prev={{ title: "createIntersectionObserver Primitive", href: "/docs/hooks/create-intersection-observer" }}
          next={{ title: "Accordion Component", href: "/docs/components/accordion" }}
        />
      </div>
    </>
  );
}
