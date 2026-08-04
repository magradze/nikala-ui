import { createBattery } from "@nikala-ui/hooks";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { createSignal, onMount, Show } from "solid-js";

const importCode = `import { createBattery } from "@/hooks/create-battery";`;

const basicUsageCode = `const { battery, isSupported } = createBattery();

return (
  <div class="p-4 border rounded-lg space-y-3">
    <Show when={isSupported()} fallback={<p>Battery Status API not supported</p>}>
      <div class="flex justify-between items-center">
        <span>Level: {Math.round(battery().level * 100)}%</span>
        <span>{battery().charging ? "Charging" : "Discharging"}</span>
      </div>
      <Progress value={battery().level * 100} />
    </Show>
  </div>
);`;

export function BatteryDemo() {
  const [mounted, setMounted] = createSignal(false);
  onMount(() => setMounted(true));

  const { battery, isSupported } = createBattery();

  const percentage = () => Math.round(battery().level * 100);

  return (
    <Show when={mounted()} fallback={<div class="p-4 text-xs font-mono text-muted-foreground">Loading Battery...</div>}>
      <div class="w-full max-w-sm p-5 rounded-lg border border-border bg-card space-y-4 shadow-sm">
        <div class="flex items-center justify-between">
          <span class="text-xs font-mono text-muted-foreground">Battery Status</span>
          <Show when={isSupported()}>
            <Badge
              variant={battery().charging ? "default" : "outline"}
              class="capitalize font-mono text-[11px]"
            >
              {battery().charging ? "Charging ⚡" : "Discharging"}
            </Badge>
          </Show>
        </div>

        <Show when={!isSupported()}>
          <div class="p-3 text-xs text-amber-500 bg-amber-500/10 border border-amber-500/20 rounded-lg">
            Battery Status API is not supported in this browser environment.
          </div>
        </Show>

        <Show when={isSupported()}>
          <div class="space-y-2">
            <div class="flex justify-between text-xs font-mono">
              <span class="text-muted-foreground">Charge Level</span>
              <span class="font-bold text-foreground">{percentage()}%</span>
            </div>
            <Progress value={percentage()} />
          </div>

          <div class="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
            <div class="p-2.5 rounded-lg bg-muted/50 border border-border/50 space-y-0.5">
              <span class="text-[10px] text-muted-foreground uppercase">State</span>
              <div class="font-bold text-foreground capitalize">
                {battery().charging ? "Plugged In" : "On Battery"}
              </div>
            </div>
            <div class="p-2.5 rounded-lg bg-muted/50 border border-border/50 space-y-0.5">
              <span class="text-[10px] text-muted-foreground uppercase">Level Ratio</span>
              <div class="font-bold text-foreground">{battery().level.toFixed(2)}</div>
            </div>
          </div>
        </Show>
      </div>
    </Show>
  );
}

export default function CreateBatteryDocPage() {
  return (
    <>
      <Seo
        title="createBattery Primitive"
        description="SolidJS reactive primitive for observing device battery status, charge level, and charging metrics."
        path="/docs/hooks/create-battery"
      />

      <div class="space-y-10 pb-16">
        <DocPageHeader
          title="createBattery"
          badge="primitive"
          description="Reactive primitive for tracking device battery charge level, charging status, and power connection metrics."
        />

        <ComponentPreview isHook name="create-battery" code={basicUsageCode}>
          <BatteryDemo />
        </ComponentPreview>

        <div class="space-y-4">
          <DocSectionHeader title="Import" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Device Battery Status Monitoring</h3>
            <p class="text-sm text-muted-foreground">
              Call <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">createBattery()</code> to access reactive battery level and charging state signals.
            </p>
            <CodeBlock code={basicUsageCode} lang="tsx" />
          </div>
        </div>

        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="BatteryState"
            items={[
              {
                prop: "level",
                type: "number",
                default: "1",
                description: "Battery charge level ratio between 0.0 (empty) and 1.0 (full).",
              },
              {
                prop: "charging",
                type: "boolean",
                default: "true",
                description: "Whether device battery is currently charging.",
              },
              {
                prop: "chargingTime",
                type: "number",
                default: "0",
                description: "Remaining time in seconds until battery is fully charged.",
              },
              {
                prop: "dischargingTime",
                type: "number",
                default: "Infinity",
                description: "Remaining time in seconds until battery is discharged.",
              },
            ]}
          />

          <DocApiTable
            title="CreateBatteryReturn"
            items={[
              {
                prop: "battery",
                type: "Accessor<BatteryState>",
                default: "-",
                description: "Signal accessor containing current battery status state metrics.",
              },
              {
                prop: "isSupported",
                type: "Accessor<boolean>",
                default: "-",
                description: "Signal accessor indicating whether Battery Status API is supported in browser.",
              },
            ]}
          />
        </div>

        <DocNextSteps
          prev={{ title: "createPermission Primitive", href: "/docs/hooks/create-permission" }}
          next={{ title: "createWebNotification Primitive", href: "/docs/hooks/create-web-notification" }}
        />
      </div>
    </>
  );
}
