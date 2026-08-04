import { createWebNotification } from "@nikala-ui/hooks";
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

const importCode = `import { createWebNotification } from "@nikala-ui/hooks";`;

const basicUsageCode = `const { permission, isSupported, show, requestPermission } = createWebNotification();
const [title, setTitle] = createSignal("Hello Nikala UI");

return (
  <div class="p-4 border rounded-lg space-y-3">
    <Show when={isSupported()} fallback={<p>Notifications not supported</p>}>
      <Show when={permission() === "granted"} fallback={
        <Button onClick={requestPermission}>Request Permission</Button>
      }>
        <Input value={title()} onInput={(e) => setTitle(e.currentTarget.value)} />
        <Button onClick={() => show(title(), { body: "Test body" })}>
          Send Notification
        </Button>
      </Show>
    </Show>
  </div>
);`;

export function WebNotificationDemo() {
  const [mounted, setMounted] = createSignal(false);
  onMount(() => setMounted(true));

  const [title, setTitle] = createSignal("New Order Received!");
  const [body, setBody] = createSignal("Order #4092 has been placed successfully.");

  const { permission, isSupported, show, requestPermission } = createWebNotification();

  const handleSend = () => {
    show(title(), {
      body: body(),
      icon: "/favicon.ico",
    });
  };

  return (
    <Show when={mounted()} fallback={<div class="p-4 text-xs font-mono text-muted-foreground">Loading Notifications...</div>}>
      <div class="w-full max-w-sm p-5 rounded-lg border border-border bg-card space-y-4 shadow-sm">
        <div class="flex items-center justify-between">
          <span class="text-xs font-mono text-muted-foreground">Web Notifications</span>
          <Show when={isSupported()}>
            <Badge
              variant={
                permission() === "granted"
                  ? "default"
                  : permission() === "denied"
                  ? "destructive"
                  : "outline"
              }
              class="capitalize font-mono text-[11px]"
            >
              {permission()}
            </Badge>
          </Show>
        </div>

        <Show when={!isSupported()}>
          <div class="p-3 text-xs text-amber-500 bg-amber-500/10 border border-amber-500/20 rounded-lg">
            Web Notifications API is not supported in this browser environment.
          </div>
        </Show>

        <Show when={isSupported()}>
          <Show when={permission() !== "granted"}>
            <div class="p-3.5 rounded-lg bg-muted/50 border border-border/50 space-y-3 text-center">
              <p class="text-xs text-muted-foreground">
                Grant notification permission to send native desktop alerts.
              </p>
              <Button size="sm" onClick={() => requestPermission()} class="w-full">
                Request Permission
              </Button>
            </div>
          </Show>

          <Show when={permission() === "granted"}>
            <div class="space-y-3">
              <div class="space-y-1">
                <label class="text-xs font-medium text-muted-foreground">Notification Title</label>
                <Input
                  value={title()}
                  onInput={(e) => setTitle(e.currentTarget.value)}
                  placeholder="Enter notification title..."
                />
              </div>

              <div class="space-y-1">
                <label class="text-xs font-medium text-muted-foreground">Notification Body</label>
                <Input
                  value={body()}
                  onInput={(e) => setBody(e.currentTarget.value)}
                  placeholder="Enter notification message..."
                />
              </div>

              <Button size="sm" onClick={handleSend} class="w-full">
                Send Desktop Notification
              </Button>
            </div>
          </Show>
        </Show>
      </div>
    </Show>
  );
}

export default function CreateWebNotificationDocPage() {
  return (
    <>
      <Seo
        title="createWebNotification Primitive"
        description="SolidJS reactive primitive for sending browser desktop notifications and managing notification permissions."
        path="/docs/hooks/create-web-notification"
      />

      <div class="space-y-10 pb-16">
        <DocPageHeader
          title="createWebNotification"
          badge="primitive"
          description="Reactive primitive for sending browser desktop notifications, handling click/close callbacks, and managing notification permission states."
        />

        <ComponentPreview name="create-web-notification" code={basicUsageCode}>
          <WebNotificationDemo />
        </ComponentPreview>

        <div class="space-y-4">
          <DocSectionHeader title="Import" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Desktop Notification Triggering</h3>
            <p class="text-sm text-muted-foreground">
              Call <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">createWebNotification()</code> to request permissions and trigger native browser popups.
            </p>
            <CodeBlock code={basicUsageCode} lang="tsx" />
          </div>
        </div>

        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="CreateWebNotificationOptions"
            items={[
              {
                prop: "title",
                type: "string",
                default: "-",
                description: "Default fallback title for notifications.",
              },
              {
                prop: "onClick",
                type: "(event: Event) => void",
                default: "-",
                description: "Callback fired when notification popup is clicked.",
              },
              {
                prop: "onClose",
                type: "(event: Event) => void",
                default: "-",
                description: "Callback fired when notification popup is dismissed.",
              },
            ]}
          />

          <DocApiTable
            title="CreateWebNotificationReturn"
            items={[
              {
                prop: "permission",
                type: "Accessor<NotificationPermission>",
                default: "-",
                description: "Signal accessor containing current Notification permission state ('granted', 'denied', 'default').",
              },
              {
                prop: "show",
                type: "(title?: string, options?: NotificationOptions) => Notification | null",
                default: "-",
                description: "Triggers and displays a browser desktop notification.",
              },
              {
                prop: "requestPermission",
                type: "() => Promise<NotificationPermission>",
                default: "-",
                description: "Requests browser Notification permission.",
              },
              {
                prop: "close",
                type: "() => void",
                default: "-",
                description: "Dismisses active notification popup.",
              },
            ]}
          />
        </div>

        <DocNextSteps
          prev={{ title: "createBattery Primitive", href: "/docs/hooks/create-battery" }}
          next={{ title: "createWebSocket Primitive", href: "/docs/hooks/create-websocket" }}
        />
      </div>
    </>
  );
}
