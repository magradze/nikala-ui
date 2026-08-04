import { createFetch } from "@nikala-ui/hooks";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Show } from "solid-js";

const importCode = `import { createFetch } from "@nikala-ui/hooks";`;

const basicUsageCode = `interface Post { title: string; body: string; }

const { data, isLoading, error, refetch } = createFetch<Post>(
  "https://jsonplaceholder.typicode.com/posts/1"
);

return (
  <div class="p-4 border rounded-lg space-y-2">
    <Show when={isLoading()}>Loading post...</Show>
    <Show when={data()}>
      <h4 class="font-bold">{data()?.title}</h4>
      <p>{data()?.body}</p>
    </Show>
    <button onClick={refetch} class="px-3 py-1 bg-primary text-primary-foreground rounded">
      Refetch Data
    </button>
  </div>
);`;

interface SamplePost {
  id: number;
  title: string;
  body: string;
}

export function FetchDemo() {
  const { data, isLoading, error, refetch } = createFetch<SamplePost>(
    "https://jsonplaceholder.typicode.com/posts/1"
  );

  return (
    <div class="w-full max-w-sm p-5 rounded-lg border border-border bg-card space-y-4 shadow-sm">
      <div class="flex items-center justify-between">
        <span class="text-xs font-mono text-muted-foreground">GET /posts/1</span>
        <button
          onClick={() => refetch()}
          disabled={isLoading()}
          class="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          {isLoading() ? "Fetching..." : "Refetch Data"}
        </button>
      </div>

      <Show when={isLoading()}>
        <div class="p-4 text-center text-xs font-mono text-primary animate-pulse border border-dashed rounded-lg">
          Loading HTTP response...
        </div>
      </Show>

      <Show when={error()}>
        <div class="p-3 text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-lg">
          Failed to fetch: {error()?.message}
        </div>
      </Show>

      <Show when={data()}>
        <div class="space-y-2 p-3 rounded-lg bg-muted/50 border border-border/50">
          <h4 class="text-sm font-semibold text-foreground capitalize">{data()?.title}</h4>
          <p class="text-xs text-muted-foreground leading-relaxed line-clamp-3">{data()?.body}</p>
        </div>
      </Show>
    </div>
  );
}

export default function CreateFetchDocPage() {
  return (
    <>
      <Seo
        title="createFetch Primitive"
        description="SolidJS reactive primitive for HTTP data fetching, request loading state management, error handling, and manual refetching."
        path="/docs/hooks/create-fetch"
      />

      <div class="space-y-10 pb-16">
        <DocPageHeader
          title="createFetch"
          badge="primitive"
          description="Reactive primitive for managing HTTP REST API calls, automatic JSON response parsing, loading/error states, and request cancellation."
        />

        <ComponentPreview name="create-fetch" code={basicUsageCode}>
          <FetchDemo />
        </ComponentPreview>

        <div class="space-y-4">
          <DocSectionHeader title="Import" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Reactive HTTP REST API Request</h3>
            <p class="text-sm text-muted-foreground">
              Pass an API endpoint URL to <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">createFetch(url)</code> to observe loading status, response data, and error states.
            </p>
            <CodeBlock code={basicUsageCode} lang="tsx" />
          </div>
        </div>

        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="CreateFetchOptions"
            items={[
              {
                prop: "immediate",
                type: "boolean",
                default: "true",
                description: "Whether request triggers immediately upon primitive initialization.",
              },
              {
                prop: "transform",
                type: "(data: unknown) => T",
                default: "-",
                description: "Custom transformation callback to parse raw API response.",
              },
            ]}
          />

          <DocApiTable
            title="CreateFetchReturn"
            items={[
              {
                prop: "data",
                type: "Accessor<T | null>",
                default: "-",
                description: "Signal containing fetched response data payload.",
              },
              {
                prop: "isLoading",
                type: "Accessor<boolean>",
                default: "-",
                description: "Signal indicating whether HTTP request is currently active.",
              },
              {
                prop: "error",
                type: "Accessor<Error | null>",
                default: "-",
                description: "Signal containing Error instance if request failed.",
              },
              {
                prop: "refetch",
                type: "() => Promise<void>",
                default: "-",
                description: "Imperatively re-executes the HTTP fetch request.",
              },
              {
                prop: "abort",
                type: "() => void",
                default: "-",
                description: "Aborts active HTTP request via AbortController.",
              },
            ]}
          />
        </div>

        <DocNextSteps
          prev={{ title: "createUndoRedo Primitive", href: "/docs/hooks/create-undo-redo" }}
          next={{ title: "createGeolocation Primitive", href: "/docs/hooks/create-geolocation" }}
        />
      </div>
    </>
  );
}
