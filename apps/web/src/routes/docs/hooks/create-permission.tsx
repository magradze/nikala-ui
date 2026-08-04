import { createPermission } from "@nikala-ui/hooks";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createSignal, onMount, Show } from "solid-js";

const importCode = `import { createPermission } from "@nikala-ui/hooks";`;

const basicUsageCode = `const { state, isSupported, query } = createPermission("geolocation");

return (
  <div class="p-4 border rounded-lg space-y-3">
    <Show when={isSupported()} fallback={<p>Permissions API not supported</p>}>
      <p>Geolocation status: <span class="font-bold">{state()}</span></p>
      <Button size="sm" onClick={query}>
        Re-query Status
      </Button>
    </Show>
  </div>
);`;

export function PermissionDemo() {
  const [mounted, setMounted] = createSignal(false);
  onMount(() => setMounted(true));

  const geoPermission = createPermission("geolocation");
  const notifPermission = createPermission("notifications");
  const [lastQueried, setLastQueried] = createSignal<string | null>(null);

  const handleRequestGeo = async () => {
    if (typeof window !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => geoPermission.query(),
        () => geoPermission.query()
      );
    }
  };

  const handleRequestNotif = async () => {
    if (typeof window !== "undefined" && "Notification" in window) {
      await Notification.requestPermission();
      await notifPermission.query();
      setLastQueried(new Date().toLocaleTimeString());
    }
  };

  const handleRequery = async () => {
    await geoPermission.query();
    await notifPermission.query();
    setLastQueried(new Date().toLocaleTimeString());
  };

  return (
    <Show when={mounted()} fallback={<div class="p-4 text-xs font-mono text-muted-foreground">Loading Permissions...</div>}>
      <div class="w-full max-w-sm p-5 rounded-xl border border-border bg-card space-y-4 shadow-sm">
        <div class="flex items-center justify-between">
          <span class="text-xs font-mono text-muted-foreground">Browser Permissions Monitor</span>
          <Show when={lastQueried()}>
            <span class="text-[10px] font-mono text-primary animate-pulse">Queried {lastQueried()}</span>
          </Show>
        </div>

        <Show when={!geoPermission.isSupported()}>
          <div class="p-3 text-xs text-amber-500 bg-amber-500/10 border border-amber-500/20 rounded-lg">
            Permissions API is not supported in this browser environment.
          </div>
        </Show>

        <Show when={geoPermission.isSupported()}>
          <div class="space-y-2">
            <div class="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border/50">
              <div class="space-y-0.5">
                <div class="text-xs font-semibold text-foreground">Geolocation</div>
                <div class="text-[10px] text-muted-foreground font-mono">name: "geolocation"</div>
              </div>
              <Show
                when={geoPermission.state() !== "prompt"}
                fallback={
                  <Button size="xs" variant="outline" onClick={handleRequestGeo}>
                    Request Access
                  </Button>
                }
              >
                <Badge
                  variant={geoPermission.state() === "granted" ? "success" : "destructive"}
                  class="capitalize font-mono text-[11px]"
                >
                  {geoPermission.state()}
                </Badge>
              </Show>
            </div>

            <div class="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border/50">
              <div class="space-y-0.5">
                <div class="text-xs font-semibold text-foreground">Notifications</div>
                <div class="text-[10px] text-muted-foreground font-mono">name: "notifications"</div>
              </div>
              <Show
                when={notifPermission.state() !== "prompt"}
                fallback={
                  <Button size="xs" variant="outline" onClick={handleRequestNotif}>
                    Request Access
                  </Button>
                }
              >
                <Badge
                  variant={notifPermission.state() === "granted" ? "success" : "destructive"}
                  class="capitalize font-mono text-[11px]"
                >
                  {notifPermission.state()}
                </Badge>
              </Show>
            </div>
          </div>

          <div class="pt-1">
            <Button size="sm" variant="outline" onClick={handleRequery} class="w-full">
              Re-query Permissions
            </Button>
          </div>
        </Show>
      </div>
    </Show>
  );
}

export default function CreatePermissionDocPage() {
  return (
    <>
      <Seo
        title="createPermission Primitive"
        description="SolidJS reactive primitive for querying and observing browser permission status changes."
        path="/docs/hooks/create-permission"
      />

      <div class="space-y-10 pb-16">
        <DocPageHeader
          title="createPermission"
          badge="primitive"
          description="Reactive primitive for querying browser permission states ('granted', 'denied', 'prompt') and listening to permission status changes."
        />

        <ComponentPreview name="create-permission" code={basicUsageCode}>
          <PermissionDemo />
        </ComponentPreview>

        <div class="space-y-4">
          <DocSectionHeader title="Import" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Permission Status Observation</h3>
            <p class="text-sm text-muted-foreground">
              Pass a permission descriptor name to <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">createPermission("geolocation")</code> to track status reactively.
            </p>
            <CodeBlock code={basicUsageCode} lang="tsx" />
          </div>
        </div>

        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="CreatePermissionOptions"
            items={[
              {
                prop: "name",
                type: "PermissionNameType",
                default: "-",
                description: "Permission descriptor name ('geolocation', 'notifications', 'camera', 'microphone').",
              },
            ]}
          />

          <DocApiTable
            title="CreatePermissionReturn"
            items={[
              {
                prop: "state",
                type: "Accessor<'granted' | 'denied' | 'prompt' | 'unknown'>",
                default: "'unknown'",
                description: "Signal accessor containing current permission status state.",
              },
              {
                prop: "isSupported",
                type: "Accessor<boolean>",
                default: "-",
                description: "Signal accessor indicating whether Permissions API is supported in browser.",
              },
              {
                prop: "query",
                type: "() => Promise<'granted' | 'denied' | 'prompt' | 'unknown'>",
                default: "-",
                description: "Imperatively re-queries permission status from browser API.",
              },
            ]}
          />
        </div>

        <DocNextSteps
          prev={{ title: "createGeolocation Primitive", href: "/docs/hooks/create-geolocation" }}
          next={{ title: "createBattery Primitive", href: "/docs/hooks/create-battery" }}
        />
      </div>
    </>
  );
}
