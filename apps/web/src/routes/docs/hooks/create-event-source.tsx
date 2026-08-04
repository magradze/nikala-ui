import { createEventSource } from "@nikala-ui/hooks";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { createSignal, onMount, Show } from "solid-js";

const importCode = `import { createEventSource } from "@nikala-ui/hooks";`;

const basicUsageCode = `const { data, status, open, close } = createEventSource(
  "https://api.example.com/sse-stream"
);

return (
  <div class="p-4 border rounded-lg space-y-3">
    <div class="flex justify-between">
      <span>Status: {status()}</span>
      <button onClick={status() === "OPEN" ? close : open}>
        {status() === "OPEN" ? "Disconnect" : "Connect SSE"}
      </button>
    </div>
    <p>Received Stream: {JSON.stringify(data())}</p>
  </div>
);`;

export function EventSourceDemo() {
  const [mounted, setMounted] = createSignal(false);
  onMount(() => setMounted(true));

  const [sseUrl, setSseUrl] = createSignal("https://api.example.com/events");

  const { data, status, open, close, isSupported } = createEventSource(
    sseUrl,
    {
      immediate: false,
    }
  );

  return (
    <Show when={mounted()} fallback={<div class="p-4 text-xs font-mono text-muted-foreground">Loading EventSource...</div>}>
      <div class="w-full max-w-sm p-5 rounded-lg border border-border bg-card space-y-4 shadow-sm">
        <div class="flex items-center justify-between">
          <span class="text-xs font-mono text-muted-foreground">Server-Sent Events (SSE)</span>
          <Show when={isSupported()}>
            <Badge
              variant={
                status() === "OPEN"
                  ? "default"
                  : status() === "CONNECTING"
                  ? "outline"
                  : "destructive"
              }
              class="capitalize font-mono text-[11px]"
            >
              {status()}
            </Badge>
          </Show>
        </div>

        <Show when={!isSupported()}>
          <div class="p-3 text-xs text-amber-500 bg-amber-500/10 border border-amber-500/20 rounded-lg">
            EventSource API is not supported in this browser environment.
          </div>
        </Show>

        <Show when={isSupported()}>
          <div class="space-y-3">
            <div class="space-y-1">
              <label class="text-xs font-medium text-muted-foreground">SSE Endpoint URL</label>
              <Input
                value={sseUrl()}
                onInput={(e) => setSseUrl(e.currentTarget.value)}
                placeholder="https://..."
                class="font-mono text-xs"
              />
            </div>

            <div class="flex gap-2">
              <Button
                size="sm"
                variant={status() === "OPEN" ? "destructive" : "default"}
                disabled={status() === "CONNECTING"}
                onClick={() => (status() === "OPEN" ? close() : open())}
                class="flex-1"
              >
                {status() === "CONNECTING"
                  ? "Connecting..."
                  : status() === "OPEN"
                  ? "Disconnect Stream"
                  : "Connect Stream"}
              </Button>
            </div>

            <Show when={data()}>
              <div class="p-3 rounded-lg bg-muted/50 border border-border/50 space-y-1">
                <span class="text-[10px] text-muted-foreground uppercase font-mono">Latest Received Event</span>
                <pre class="text-xs font-mono text-foreground whitespace-pre-wrap break-all">
                  {typeof data() === "object" ? JSON.stringify(data(), null, 2) : String(data())}
                </pre>
              </div>
            </Show>
          </div>
        </Show>
      </div>
    </Show>
  );
}

export default function CreateEventSourceDocPage() {
  return (
    <>
      <Seo
        title="createEventSource Primitive"
        description="SolidJS reactive primitive for subscribing to Server-Sent Events (SSE) streams."
        path="/docs/hooks/create-event-source"
      />

      <div class="space-y-10 pb-16">
        <DocPageHeader
          title="createEventSource"
          badge="primitive"
          description="Reactive primitive for managing Server-Sent Events (SSE) client connections, subscribing to event streams, and handling status updates."
        />

        <ComponentPreview name="create-event-source" code={basicUsageCode}>
          <EventSourceDemo />
        </ComponentPreview>

        <div class="space-y-4">
          <DocSectionHeader title="Import" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">SSE Stream Connection</h3>
            <p class="text-sm text-muted-foreground">
              Pass an HTTP SSE endpoint to <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">createEventSource(url)</code> to consume real-time events.
            </p>
            <CodeBlock code={basicUsageCode} lang="tsx" />
          </div>
        </div>

        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="CreateEventSourceOptions"
            items={[
              {
                prop: "events",
                type: "string[]",
                default: "['message']",
                description: "Array of SSE event names to listen for.",
              },
              {
                prop: "withCredentials",
                type: "boolean",
                default: "false",
                description: "Whether to send CORS credentials with the EventSource request.",
              },
              {
                prop: "immediate",
                type: "boolean",
                default: "true",
                description: "Whether to connect to the stream immediately upon component initialization.",
              },
            ]}
          />

          <DocApiTable
            title="CreateEventSourceReturn<T>"
            items={[
              {
                prop: "data",
                type: "Accessor<T | null>",
                default: "-",
                description: "Signal accessor containing latest received stream event payload.",
              },
              {
                prop: "status",
                type: "Accessor<'CONNECTING' | 'OPEN' | 'CLOSED'>",
                default: "'CLOSED'",
                description: "Signal accessor containing current EventSource connection status.",
              },
              {
                prop: "open",
                type: "() => void",
                default: "-",
                description: "Establishes or reconnects EventSource stream connection.",
              },
              {
                prop: "close",
                type: "() => void",
                default: "-",
                description: "Closes active EventSource stream.",
              },
            ]}
          />
        </div>

        <DocNextSteps
          prev={{ title: "createFavicon Primitive", href: "/docs/hooks/create-favicon" }}
          next={{ title: "createOrientation Primitive", href: "/docs/hooks/create-orientation" }}
        />
      </div>
    </>
  );
}
