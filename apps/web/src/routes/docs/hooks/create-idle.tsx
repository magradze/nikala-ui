// src/routes/docs/hooks/create-idle.tsx
import { createSignal, onMount, onCleanup } from "solid-js";
import { createIdle } from "@nikala-ui/hooks";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";

const importCode = `import { createIdle } from "@nikala-ui/hooks";`;

const basicUsageCode = `const { isIdle, lastActive, reset } = createIdle({
  timeout: 5000, // 5 seconds
  onIdle: () => console.log("User went idle!"),
  onActive: () => console.log("User is back!"),
});

return (
  <div>
    <p>Status: {isIdle() ? "Idle" : "Active"}</p>
    <Button onClick={reset}>Reset Timer</Button>
  </div>
);`;

export function IdleDemo() {
  const [log, setLog] = createSignal<string[]>([]);
  const [now, setNow] = createSignal(0);

  onMount(() => {
    setNow(Date.now());
    const tickId = setInterval(() => setNow(Date.now()), 1000);
    onCleanup(() => clearInterval(tickId));
  });

  const addLog = (msg: string) => {
    setLog((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 6));
  };

  const { isIdle, lastActive, reset } = createIdle({
    timeout: 5000,
    onIdle: () => addLog("User went idle"),
    onActive: () => addLog("User is back"),
  });

  const secondsAgo = () => {
    const n = now();
    const la = lastActive();
    if (n === 0 || la === 0) return 0;
    return Math.max(0, Math.floor((n - la) / 1000));
  };

  const handleReset = () => {
    reset();
    setNow(Date.now());
    addLog("Timer reset");
  };

  return (
    <div class="space-y-4 max-w-sm w-full min-h-[180px] flex flex-col items-center justify-center text-center">
      <div class="w-full p-4 rounded-lg border border-border bg-card shadow-xs space-y-3 text-left">
        <div class="flex items-center justify-between text-xs font-mono">
          <span class="text-muted-foreground">Status:</span>
          <span class={`font-bold ${isIdle() ? "text-amber-500" : "text-emerald-500"}`}>
            {isIdle() ? "💤 IDLE" : "✅ ACTIVE"}
          </span>
        </div>
        <div class="text-[10px] text-muted-foreground font-mono">
          Last activity: <strong class="text-foreground">{secondsAgo()}s ago</strong> (timeout: 5s)
        </div>

        <Button size="sm" variant="outline" onClick={handleReset} class="h-7 text-xs w-full cursor-pointer">
          Reset Idle Timer
        </Button>
      </div>

      {log().length > 0 && (
        <div class="w-full p-3 rounded-lg border border-border bg-muted/30 text-left text-[10px] font-mono space-y-0.5 max-h-24 overflow-y-auto">
          {log().map((entry) => (
            <div class="text-muted-foreground">{entry}</div>
          ))}
        </div>
      )}

      <p class="text-[10px] text-muted-foreground italic">
        Stop moving your mouse for 5 seconds to trigger idle state.
      </p>
    </div>
  );
}

export default function CreateIdleDocPage() {
  return (
    <div class="space-y-10 pb-16">
      <Seo
        title="createIdle Primitive"
        description="SolidJS reactive primitive for detecting user inactivity with customizable timeout and activity events."
        path="/docs/hooks/create-idle"
      />

      {/* Page Header */}
      <DocPageHeader
        title="createIdle"
        badge="primitive"
        description="A reactive primitive for detecting when a user has been inactive for a specified duration, with configurable DOM events and onIdle/onActive callbacks."
      />

      {/* Live Interactive Hero Preview */}
      <ComponentPreview isHook name="create-idle" code={basicUsageCode}>
        <IdleDemo />
      </ComponentPreview>

      {/* Import */}
      <div class="space-y-4">
        <DocSectionHeader title="Import" />
        <CodeBlock code={importCode} lang="tsx" />
      </div>

      {/* Examples Section */}
      <div class="space-y-8 pt-4">
        <DocSectionHeader title="Examples" />

        <div class="space-y-3">
          <h3 class="text-lg font-semibold tracking-tight">Idle Detection with Callbacks</h3>
          <p class="text-sm text-muted-foreground">
            Set <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">timeout</code> in milliseconds and optional <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">onIdle</code> / <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">onActive</code> callbacks.
          </p>
          <CodeBlock code={basicUsageCode} lang="tsx" />
        </div>
      </div>

      {/* API Reference */}
      <div class="space-y-6 pt-6">
        <DocSectionHeader title="API Reference" />

        <DocApiTable
          title="CreateIdleReturn & Options"
          items={[
            {
              prop: "isIdle",
              type: "Accessor<boolean>",
              default: "false",
              description: "Signal accessor returning true when user is inactive beyond timeout.",
              required: true,
            },
            {
              prop: "lastActive",
              type: "Accessor<number>",
              default: "Date.now()",
              description: "Signal accessor returning timestamp (ms) of last detected user activity.",
              required: true,
            },
            {
              prop: "reset",
              type: "() => void",
              default: "-",
              description: "Function to reset idle state and restart the inactivity timer.",
            },
            {
              prop: "timeout",
              type: "number",
              default: "60000",
              description: "Inactivity timeout in milliseconds before user is considered idle.",
            },
            {
              prop: "onIdle",
              type: "() => void",
              default: "-",
              description: "Callback invoked when user becomes idle.",
            },
            {
              prop: "onActive",
              type: "() => void",
              default: "-",
              description: "Callback invoked when user resumes activity after being idle.",
            },
          ]}
        />
      </div>

      {/* Footer Navigation */}
      <DocNextSteps
        prev={{ title: "createInputMask Primitive", href: "/docs/hooks/create-input-mask" }}
        next={{ title: "createActiveElement Primitive", href: "/docs/hooks/create-active-element" }}
      />
    </div>
  );
}
