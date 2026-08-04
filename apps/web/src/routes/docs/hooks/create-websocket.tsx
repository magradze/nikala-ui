import { createWebSocket } from "@nikala-ui/hooks";
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

const importCode = `import { createWebSocket } from "@/hooks/create-websocket";`;

const basicUsageCode = `const { data, readyState, send, open, close } = createWebSocket(
  "wss://echo.websocket.org"
);
const [message, setMessage] = createSignal("");

return (
  <div class="p-4 border rounded-lg space-y-3">
    <div class="flex justify-between">
      <span>Status: {readyState()}</span>
      <button onClick={readyState() === "OPEN" ? close : open}>
        {readyState() === "OPEN" ? "Disconnect" : "Connect"}
      </button>
    </div>
    <input value={message()} onInput={(e) => setMessage(e.currentTarget.value)} />
    <button onClick={() => send(message())}>Send Message</button>
    <p>Last Data: {JSON.stringify(data())}</p>
  </div>
);`;

export function WebSocketDemo() {
  const [mounted, setMounted] = createSignal(false);
  onMount(() => setMounted(true));

  const [serverUrl, setServerUrl] = createSignal("wss://echo.websocket.org");
  const [inputMsg, setInputMsg] = createSignal("Hello Nikala UI!");

  const { data, readyState, send, open, close, isSupported } = createWebSocket(
    serverUrl,
    {
      immediate: false,
      autoReconnect: false,
    }
  );

  const handleSend = () => {
    if (inputMsg().trim()) {
      send(inputMsg());
    }
  };

  return (
    <Show when={mounted()} fallback={<div class="p-4 text-xs font-mono text-muted-foreground">Loading WebSocket...</div>}>
      <div class="w-full max-w-sm p-5 rounded-lg border border-border bg-card space-y-4 shadow-sm">
        <div class="flex items-center justify-between">
          <span class="text-xs font-mono text-muted-foreground">WebSocket Client</span>
          <Show when={isSupported()}>
            <Badge
              variant={
                readyState() === "OPEN"
                  ? "default"
                  : readyState() === "CONNECTING"
                  ? "outline"
                  : "destructive"
              }
              class="capitalize font-mono text-[11px]"
            >
              {readyState()}
            </Badge>
          </Show>
        </div>

        <Show when={!isSupported()}>
          <div class="p-3 text-xs text-amber-500 bg-amber-500/10 border border-amber-500/20 rounded-lg">
            WebSocket API is not supported in this browser environment.
          </div>
        </Show>

        <Show when={isSupported()}>
          <div class="space-y-3">
            <div class="space-y-1">
              <label class="text-xs font-medium text-muted-foreground">Server URL</label>
              <Input
                value={serverUrl()}
                onInput={(e) => setServerUrl(e.currentTarget.value)}
                placeholder="wss://..."
                class="font-mono text-xs"
              />
            </div>

            <div class="flex gap-2">
              <Button
                size="sm"
                variant={readyState() === "OPEN" ? "destructive" : "default"}
                disabled={readyState() === "CONNECTING"}
                onClick={() => (readyState() === "OPEN" ? close() : open())}
                class="flex-1"
              >
                {readyState() === "CONNECTING"
                  ? "Connecting..."
                  : readyState() === "OPEN"
                  ? "Disconnect"
                  : "Connect Socket"}
              </Button>
            </div>

            <Show when={readyState() === "OPEN"}>
              <div class="space-y-3 pt-2 border-t border-border/50">
                <div class="space-y-1">
                  <label class="text-xs font-medium text-muted-foreground">Message Payload</label>
                  <Input
                    value={inputMsg()}
                    onInput={(e) => setInputMsg(e.currentTarget.value)}
                    placeholder="Type a message to send..."
                  />
                </div>

                <Button size="sm" onClick={handleSend} class="w-full">
                  Send Payload
                </Button>

                <Show when={data()}>
                  <div class="p-3 rounded-lg bg-muted/50 border border-border/50 space-y-1">
                    <span class="text-[10px] text-muted-foreground uppercase font-mono">Last Response Payload</span>
                    <pre class="text-xs font-mono text-foreground whitespace-pre-wrap break-all">
                      {typeof data() === "object" ? JSON.stringify(data(), null, 2) : String(data())}
                    </pre>
                  </div>
                </Show>
              </div>
            </Show>
          </div>
        </Show>
      </div>
    </Show>
  );
}

export default function CreateWebSocketDocPage() {
  return (
    <>
      <Seo
        title="createWebSocket Primitive"
        description="SolidJS reactive primitive for WebSocket client connections, auto-reconnection, and message passing."
        path="/docs/hooks/create-websocket"
      />

      <div class="space-y-10 pb-16">
        <DocPageHeader
          title="createWebSocket"
          badge="primitive"
          description="Reactive primitive for managing WebSocket client connections, real-time message broadcasting, automatic reconnects, and connection states."
        />

        <ComponentPreview isHook name="create-websocket" code={basicUsageCode}>
          <WebSocketDemo />
        </ComponentPreview>

        <div class="space-y-4">
          <DocSectionHeader title="Import" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Real-Time WebSocket Client</h3>
            <p class="text-sm text-muted-foreground">
              Pass a WebSocket endpoint URL to <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">createWebSocket(url)</code> to manage real-time connections.
            </p>
            <CodeBlock code={basicUsageCode} lang="tsx" />
          </div>
        </div>

        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="CreateWebSocketOptions"
            items={[
              {
                prop: "autoReconnect",
                type: "boolean",
                default: "true",
                description: "Whether to automatically attempt reconnection upon close.",
              },
              {
                prop: "reconnectInterval",
                type: "number",
                default: "3000",
                description: "Delay in milliseconds between reconnection attempts.",
              },
              {
                prop: "maxReconnectAttempts",
                type: "number",
                default: "5",
                description: "Maximum number of reconnection attempts before stopping.",
              },
            ]}
          />

          <DocApiTable
            title="CreateWebSocketReturn<T>"
            items={[
              {
                prop: "data",
                type: "Accessor<T | null>",
                default: "-",
                description: "Signal accessor containing latest received and parsed message data payload.",
              },
              {
                prop: "readyState",
                type: "Accessor<'CONNECTING' | 'OPEN' | 'CLOSING' | 'CLOSED'>",
                default: "'CLOSED'",
                description: "Signal accessor containing current connection status.",
              },
              {
                prop: "send",
                type: "(data: string | object | ArrayBuffer) => boolean",
                default: "-",
                description: "Sends string or JSON serialized payload over WebSocket.",
              },
              {
                prop: "open",
                type: "() => void",
                default: "-",
                description: "Establishes or reconnects WebSocket connection.",
              },
              {
                prop: "close",
                type: "(code?: number, reason?: string) => void",
                default: "-",
                description: "Terminates active WebSocket connection.",
              },
            ]}
          />
        </div>

        <DocNextSteps
          prev={{ title: "createWebNotification Primitive", href: "/docs/hooks/create-web-notification" }}
          next={{ title: "createDocumentTitle Primitive", href: "/docs/hooks/create-document-title" }}
        />
      </div>
    </>
  );
}
