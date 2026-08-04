import { createGeolocation } from "@nikala-ui/hooks";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { createSignal, onMount, Show } from "solid-js";

const importCode = `import { createGeolocation } from "@nikala-ui/hooks";`;

const basicUsageCode = `const { coords, loading, error, isSupported, getCurrentPosition } = createGeolocation();

return (
  <div class="p-4 border rounded-lg space-y-3">
    <Show when={isSupported()} fallback={<p>Geolocation not supported</p>}>
      <Show when={loading()}>Requesting GPS coordinates...</Show>
      <Show when={coords().latitude}>
        <p>Latitude: {coords().latitude}</p>
        <p>Longitude: {coords().longitude}</p>
        <p>Accuracy: {coords().accuracy} meters</p>
      </Show>
      <button onClick={getCurrentPosition} class="px-3 py-1 bg-primary text-primary-foreground rounded">
        Refresh Location
      </button>
    </Show>
  </div>
);`;

export function GeolocationDemo() {
  const [mounted, setMounted] = createSignal(false);
  onMount(() => setMounted(true));

  const { coords, loading, error, isSupported, getCurrentPosition } = createGeolocation({
    immediate: false,
  });

  return (
    <Show when={mounted()} fallback={<div class="p-4 text-xs font-mono text-muted-foreground">Loading Geolocation...</div>}>
      <div class="w-full max-w-sm p-5 rounded-xl border border-border bg-card space-y-4 shadow-sm">
        <div class="flex items-center justify-between">
          <span class="text-xs font-mono text-muted-foreground">GPS Location Tracker</span>
          <button
            onClick={() => getCurrentPosition()}
            disabled={loading() || !isSupported()}
            class="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
          >
            {loading() ? "Locating..." : "Locate Me"}
          </button>
        </div>

        <Show when={!isSupported()}>
          <div class="p-3 text-xs text-amber-500 bg-amber-500/10 border border-amber-500/20 rounded-lg">
            Geolocation API is not supported in this browser environment.
          </div>
        </Show>

        <Show when={error()}>
          <div class="p-3 text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-lg">
            Error: {error()?.message}
          </div>
        </Show>

      <Show when={coords().latitude !== null}>
        <div class="grid grid-cols-2 gap-2 text-xs">
          <div class="p-2.5 rounded-lg bg-muted/50 border border-border/50 space-y-1">
            <span class="text-[10px] text-muted-foreground uppercase font-mono">Latitude</span>
            <div class="font-bold font-mono text-foreground">{coords().latitude?.toFixed(5)}</div>
          </div>
          <div class="p-2.5 rounded-lg bg-muted/50 border border-border/50 space-y-1">
            <span class="text-[10px] text-muted-foreground uppercase font-mono">Longitude</span>
            <div class="font-bold font-mono text-foreground">{coords().longitude?.toFixed(5)}</div>
          </div>
          <div class="p-2.5 rounded-lg bg-muted/50 border border-border/50 space-y-1 col-span-2">
            <span class="text-[10px] text-muted-foreground uppercase font-mono">Accuracy</span>
            <div class="font-medium font-mono text-foreground">
              {coords().accuracy ? `± ${coords().accuracy?.toFixed(1)} meters` : "N/A"}
            </div>
          </div>
        </div>
      </Show>

      <Show when={coords().latitude === null && !error() && !loading()}>
        <div class="p-4 text-center text-xs text-muted-foreground border border-dashed rounded-lg">
          Click "Locate Me" or grant location permissions to view live GPS coordinates.
        </div>
      </Show>
      </div>
    </Show>
  );
}

export default function CreateGeolocationDocPage() {
  return (
    <>
      <Seo
        title="createGeolocation Primitive"
        description="SolidJS reactive primitive for tracking browser Geolocation position, coordinates, speed, and GPS accuracy."
        path="/docs/hooks/create-geolocation"
      />

      <div class="space-y-10 pb-16">
        <DocPageHeader
          title="createGeolocation"
          badge="primitive"
          description="Reactive primitive for observing user geographic location, GPS coordinates, accuracy level, and position changes."
        />

        <ComponentPreview isHook name="create-geolocation" code={basicUsageCode}>
          <GeolocationDemo />
        </ComponentPreview>

        <div class="space-y-4">
          <DocSectionHeader title="Import" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Geographic Location Tracking</h3>
            <p class="text-sm text-muted-foreground">
              Call <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">createGeolocation()</code> to reactively track latitude, longitude, and accuracy metrics.
            </p>
            <CodeBlock code={basicUsageCode} lang="tsx" />
          </div>
        </div>

        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="CreateGeolocationOptions"
            items={[
              {
                prop: "enableHighAccuracy",
                type: "boolean",
                default: "false",
                description: "Whether to request high-accuracy GPS coordinates.",
              },
              {
                prop: "timeout",
                type: "number",
                default: "Infinity",
                description: "Maximum length of time (ms) browser waits to return position.",
              },
              {
                prop: "maximumAge",
                type: "number",
                default: "0",
                description: "Maximum age (ms) of cached position that browser accepts.",
              },
              {
                prop: "immediate",
                type: "boolean",
                default: "true",
                description: "Whether to start watching position immediately.",
              },
            ]}
          />

          <DocApiTable
            title="CreateGeolocationReturn"
            items={[
              {
                prop: "coords",
                type: "Accessor<GeolocationState>",
                default: "-",
                description: "Signal accessor containing latitude, longitude, speed, and accuracy.",
              },
              {
                prop: "loading",
                type: "Accessor<boolean>",
                default: "-",
                description: "Signal accessor indicating whether location query is active.",
              },
              {
                prop: "error",
                type: "Accessor<GeolocationPositionError | Error | null>",
                default: "-",
                description: "Signal accessor containing error details if location fetch failed.",
              },
              {
                prop: "isSupported",
                type: "Accessor<boolean>",
                default: "-",
                description: "Signal accessor indicating if Geolocation API is supported in browser.",
              },
              {
                prop: "getCurrentPosition",
                type: "() => void",
                default: "-",
                description: "Imperatively requests position once.",
              },
            ]}
          />
        </div>

        <DocNextSteps
          prev={{ title: "createFetch Primitive", href: "/docs/hooks/create-fetch" }}
          next={{ title: "createPermission Primitive", href: "/docs/hooks/create-permission" }}
        />
      </div>
    </>
  );
}
