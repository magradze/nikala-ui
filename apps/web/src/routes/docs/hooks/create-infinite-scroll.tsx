import { createSignal, For } from "solid-js";
import { createInfiniteScroll } from "@nikala-ui/hooks";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";

const importCode = `import { createInfiniteScroll } from "@nikala-ui/hooks";`;

const basicUsageCode = `const [items, setItems] = createSignal<string[]>(["Item 1", "Item 2", "Item 3"]);

const { setSentinelRef, isLoading, loadMore } = createInfiniteScroll({
  onLoadMore: async () => {
    // Simulate async data fetching delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setItems((prev) => [...prev, \`Item \${prev.length + 1}\`, \`Item \${prev.length + 2}\`]);
  },
});

return (
  <div class="space-y-2 max-h-60 overflow-y-auto border rounded-md p-4">
    <For each={items()}>{(item) => <div class="p-2 border rounded bg-card">{item}</div>}</For>
    <div ref={setSentinelRef} class="py-2 text-center text-xs text-muted-foreground">
      {isLoading() ? "Loading more items..." : "Scroll down to load more"}
    </div>
  </div>
);`;

export function InfiniteScrollDemo() {
  const [items, setItems] = createSignal<string[]>([
    "Initial Item 1",
    "Initial Item 2",
    "Initial Item 3",
    "Initial Item 4",
  ]);

  const { setSentinelRef, isLoading, loadMore } = createInfiniteScroll({
    onLoadMore: async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setItems((prev) => [
        ...prev,
        `Loaded Item ${prev.length + 1}`,
        `Loaded Item ${prev.length + 2}`,
      ]);
    },
  });

  return (
    <div class="w-full max-w-sm space-y-3">
      <div class="max-h-56 overflow-y-auto rounded-lg border border-border bg-background p-3 space-y-2">
        <For each={items()}>
          {(item) => (
            <div class="rounded-lg border border-border/60 bg-card p-2.5 text-xs font-medium text-foreground shadow-sm">
              {item}
            </div>
          )}
        </For>
        <div
          ref={setSentinelRef}
          class="flex items-center justify-center p-3 text-xs font-mono text-muted-foreground border border-dashed rounded-lg"
        >
          {isLoading() ? (
            <span class="animate-pulse text-primary font-semibold">Fetching next page...</span>
          ) : (
            <span>Scroll down or trigger sentinel</span>
          )}
        </div>
      </div>

      <button
        onClick={() => loadMore()}
        disabled={isLoading()}
        class="w-full rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
      >
        {isLoading() ? "Loading..." : "Manual Fetch Next Page"}
      </button>
    </div>
  );
}

export default function CreateInfiniteScrollDocPage() {
  return (
    <>
      <Seo
        title="createInfiniteScroll Primitive"
        description="SolidJS reactive primitive for dynamic infinite scrolling, auto-fetching pages, and scroll pagination."
        path="/docs/hooks/create-infinite-scroll"
      />

      <div class="space-y-10 pb-16">
        <DocPageHeader
          title="createInfiniteScroll"
          badge="primitive"
          description="Reactive primitive for infinite scroll lists, automatic page pagination, and sentinel visibility detection."
        />

        <ComponentPreview name="create-infinite-scroll" code={basicUsageCode}>
          <InfiniteScrollDemo />
        </ComponentPreview>

        <div class="space-y-4">
          <DocSectionHeader title="Import" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Auto-fetching Sentinel List</h3>
            <p class="text-sm text-muted-foreground">
              Bind <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">setSentinelRef</code> to an element at the bottom of your scroll container to trigger <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">onLoadMore</code> automatically when scrolled into view.
            </p>
            <CodeBlock code={basicUsageCode} lang="tsx" />
          </div>
        </div>

        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="CreateInfiniteScrollOptions"
            items={[
              {
                prop: "onLoadMore",
                type: "() => Promise<void> | void",
                default: "-",
                description: "Callback invoked when user scrolls near the bottom sentinel element.",
                required: true,
              },
              {
                prop: "threshold",
                type: "number",
                default: "100",
                description: "Pixel offset threshold before the bottom sentinel triggers loading.",
              },
              {
                prop: "enabled",
                type: "boolean | Accessor<boolean>",
                default: "true",
                description: "Controls whether infinite scroll auto-fetching is active.",
              },
            ]}
          />

          <DocApiTable
            title="CreateInfiniteScrollReturn"
            items={[
              {
                prop: "setSentinelRef",
                type: "(el: HTMLElement | null) => void",
                default: "-",
                description: "Ref callback function to bind to your list sentinel DOM element.",
              },
              {
                prop: "isLoading",
                type: "Accessor<boolean>",
                default: "-",
                description: "Signal indicating whether an async load operation is currently in progress.",
              },
              {
                prop: "error",
                type: "Accessor<Error | null>",
                default: "-",
                description: "Signal containing the last fetch Error if the load callback threw an exception.",
              },
              {
                prop: "loadMore",
                type: "() => Promise<void>",
                default: "-",
                description: "Imperative function to trigger loading the next page immediately.",
              },
            ]}
          />
        </div>

        <DocNextSteps
          prev={{ title: "createActiveElement Primitive", href: "/docs/hooks/create-active-element" }}
          next={{ title: "createFullscreen Primitive", href: "/docs/hooks/create-fullscreen" }}
        />
      </div>
    </>
  );
}
