// src/routes/docs/hooks/create-network-status.tsx
import { createNetworkStatus } from "@nikala-ui/hooks";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";

const importCode = `import { createNetworkStatus, createOnline } from "@nikala-ui/hooks";`;

const basicUsageCode = `const { isOnline, downlink, effectiveType, rtt } = createNetworkStatus();

return (
  <div>
    <p>Status: {isOnline() ? "Online" : "Offline"}</p>
    <p>Speed: {downlink() ?? "Unknown"} Mbps</p>
    <p>Type: {effectiveType() ?? "Unknown"}</p>
  </div>
);`;

export function NetworkStatusDemo() {
  const { isOnline, downlink, effectiveType, rtt, saveData } = createNetworkStatus();

  return (
    <div class="space-y-4 max-w-sm w-full min-h-[180px] flex flex-col items-center justify-center text-center">
      <div
        class={`w-full p-5 rounded-xl border transition-all duration-300 text-xs font-mono space-y-2.5 text-left ${
          isOnline()
            ? "border-emerald-500/50 bg-emerald-500/10 shadow-sm"
            : "border-destructive/50 bg-destructive/10 text-destructive"
        }`}
      >
        <div class="flex items-center justify-between">
          <span class="text-muted-foreground">Network Connectivity:</span>
          <span class={`font-bold ${isOnline() ? "text-emerald-500" : "text-destructive"}`}>
            {isOnline() ? "ONLINE ●" : "OFFLINE ○"}
          </span>
        </div>
        <div class="text-muted-foreground">
          Effective Tier:{" "}
          <span class="text-foreground font-bold uppercase">{effectiveType() || "4g (High Speed)"}</span>
        </div>
        <div class="text-muted-foreground">
          Estimated Downlink:{" "}
          <span class="text-foreground font-bold">
            {downlink() !== undefined ? `${downlink()} Mbps` : "N/A (Browser Protected)"}
          </span>
        </div>
        <div class="text-muted-foreground">
          Latency (RTT):{" "}
          <span class="text-foreground font-bold">
            {rtt() !== undefined ? `${rtt()} ms` : "N/A (Browser Protected)"}
          </span>
        </div>
        <div class="text-muted-foreground">
          Data Saver Mode:{" "}
          <span class="text-foreground font-bold">{saveData() ? "Enabled" : "Disabled"}</span>
        </div>
      </div>
      <p class="text-[10px] text-muted-foreground italic">
        Note: W3C Network API caps high-speed connections (Ethernet/Wi-Fi) at "4g". Speed/RTT metrics require browser Network API permissions.
      </p>
    </div>
  );
}

export default function CreateNetworkStatusDocPage() {
  return (
    <>
      <Seo
        title="createNetworkStatus & createOnline Primitives"
        description="SolidJS reactive primitives for tracking browser network connectivity and connection quality metrics."
        path="/docs/hooks/create-network-status"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="createNetworkStatus"
          badge="primitive"
          description="A reactive primitive for observing browser online/offline status and Network Information API metrics (downlink, RTT, effective connection type)."
        />

        {/* Live Interactive Hero Preview */}
        <ComponentPreview name="create-network-status" code={basicUsageCode}>
          <NetworkStatusDemo />
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
            <h3 class="text-lg font-semibold tracking-tight">Observe Connection Status & Speed</h3>
            <p class="text-sm text-muted-foreground">
              Call <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">createNetworkStatus()</code> to access reactive connection signals.
            </p>
            <CodeBlock code={basicUsageCode} lang="tsx" />
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="CreateNetworkStatusReturn Accessors"
            items={[
              {
                prop: "isOnline",
                type: "Accessor<boolean>",
                default: "true",
                description: "Signal accessor indicating whether browser is connected online.",
                required: true,
              },
              {
                prop: "effectiveType",
                type: "Accessor<'slow-2g' | '2g' | '3g' | '4g' | undefined>",
                default: "undefined",
                description: "Signal accessor returning Network Information effective type.",
              },
              {
                prop: "downlink",
                type: "Accessor<number | undefined>",
                default: "undefined",
                description: "Estimated network downlink speed in megabits per second.",
              },
              {
                prop: "rtt",
                type: "Accessor<number | undefined>",
                default: "undefined",
                description: "Estimated network round-trip time in milliseconds.",
              },
              {
                prop: "saveData",
                type: "Accessor<boolean | undefined>",
                default: "undefined",
                description: "Signal accessor indicating if user has data saver mode enabled.",
              },
            ]}
          />
        </div>

        {/* Footer Navigation */}
        <DocNextSteps
          prev={{ title: "createPrevious Primitive", href: "/docs/hooks/create-previous" }}
          next={{ title: "createColorMode Primitive", href: "/docs/hooks/create-color-mode" }}
        />
      </div>
    </>
  );
}
