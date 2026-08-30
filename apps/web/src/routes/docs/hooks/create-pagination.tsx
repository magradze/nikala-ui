// src/routes/docs/hooks/create-pagination.tsx
import { For, createSignal } from "solid-js";
import { createPagination } from "@/hooks/create-pagination";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-solid";

const importCode = `import { createPagination } from "@/hooks/create-pagination";`;

const basicUsageCode = `const pagination = createPagination({
  count: 120,
  pageSize: 10,
  siblingCount: 1,
  boundaries: 1,
});

return (
  <div class="space-y-4 text-center">
    <div class="text-sm text-muted-foreground">
      Showing items {pagination.startIndex()} - {pagination.endIndex()} of 120 (Page {pagination.page()} of {pagination.totalPages()})
    </div>

    <div class="flex items-center justify-center gap-1">
      <Button
        variant="outline"
        size="sm"
        disabled={!pagination.hasPrevious()}
        onClick={pagination.previous}
      >
        Previous
      </Button>

      <For each={pagination.range()}>
        {(item) =>
          item === "ellipsis" ? (
            <span class="px-2 text-xs text-muted-foreground">...</span>
          ) : (
            <Button
              variant={pagination.page() === item ? "default" : "outline"}
              size="sm"
              class="w-8 h-8 p-0"
              onClick={() => pagination.setPage(item)}
            >
              {item}
            </Button>
          )
        }
      </For>

      <Button
        variant="outline"
        size="sm"
        disabled={!pagination.hasNext()}
        onClick={pagination.next}
      >
        Next
      </Button>
    </div>
  </div>
);`;

export function PaginationHookDemo() {
  const pagination = createPagination({
    count: 150,
    pageSize: 10,
    siblingCount: 1,
    boundaries: 1,
  });

  return (
    <div class="space-y-4 max-w-lg w-full min-h-[160px] flex flex-col items-center justify-center text-center p-4">
      <div class="text-xs sm:text-sm text-muted-foreground font-mono">
        Showing items <span class="font-semibold text-foreground">{pagination.startIndex()}</span>–
        <span class="font-semibold text-foreground">{pagination.endIndex()}</span> of 150 (Page{" "}
        <span class="font-semibold text-foreground">{pagination.page()}</span> of{" "}
        <span class="font-semibold text-foreground">{pagination.totalPages()}</span>)
      </div>

      <div class="flex items-center justify-center gap-1 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          disabled={!pagination.hasPrevious()}
          onClick={pagination.first}
          class="h-8 w-8 p-0"
          aria-label="First page"
        >
          <ChevronsLeft class="size-4" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          disabled={!pagination.hasPrevious()}
          onClick={pagination.previous}
          class="h-8 px-2 text-xs gap-1"
        >
          <ChevronLeft class="size-3.5" />
          <span class="hidden sm:inline">Prev</span>
        </Button>

        <For each={pagination.range()}>
          {(item) =>
            item === "ellipsis" ? (
              <span class="px-1.5 text-xs text-muted-foreground select-none">...</span>
            ) : (
              <Button
                variant={pagination.page() === item ? "default" : "outline"}
                size="sm"
                class="w-8 h-8 p-0 text-xs font-mono"
                onClick={() => pagination.setPage(item)}
              >
                {item}
              </Button>
            )
          }
        </For>

        <Button
          variant="outline"
          size="sm"
          disabled={!pagination.hasNext()}
          onClick={pagination.next}
          class="h-8 px-2 text-xs gap-1"
        >
          <span class="hidden sm:inline">Next</span>
          <ChevronRight class="size-3.5" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          disabled={!pagination.hasNext()}
          onClick={pagination.last}
          class="h-8 w-8 p-0"
          aria-label="Last page"
        >
          <ChevronsRight class="size-4" />
        </Button>
      </div>
    </div>
  );
}

export default function CreatePaginationDocPage() {
  return (
    <>
      <Seo
        title="createPagination Reactive Primitive"
        description="SolidJS reactive primitive for computing pagination state, dynamic page ranges with ellipses, and navigation helpers."
        path="/docs/hooks/create-pagination"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="createPagination"
          badge="primitive"
          description="A headless reactive primitive for calculating pagination ranges, handling ellipsis gaps, and orchestrating page transitions."
        />

        {/* Live Interactive Hero Preview */}
        <ComponentPreview isHook name="create-pagination" code={basicUsageCode}>
          <PaginationHookDemo />
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
            <h3 class="text-lg font-semibold tracking-tight">Basic Dynamic Range</h3>
            <p class="text-sm text-muted-foreground">
              Configure total <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">count</code>, <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">pageSize</code>, and sibling boundaries to generate an accessible navigation bar.
            </p>
            <CodeBlock code={basicUsageCode} lang="tsx" />
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="CreatePaginationOptions"
            items={[
              {
                prop: "count",
                type: "number | Accessor<number>",
                default: "0",
                description: "Total number of items across all pages.",
              },
              {
                prop: "totalPages",
                type: "number | Accessor<number>",
                default: "undefined",
                description: "Explicit total number of pages (overrides count / pageSize calculation).",
              },
              {
                prop: "page",
                type: "number | Accessor<number>",
                default: "undefined",
                description: "Controlled active page number (1-indexed).",
              },
              {
                prop: "defaultPage",
                type: "number",
                default: "1",
                description: "Initial page number for uncontrolled state.",
              },
              {
                prop: "pageSize",
                type: "number | Accessor<number>",
                default: "10",
                description: "Number of records per individual page.",
              },
              {
                prop: "siblingCount",
                type: "number | Accessor<number>",
                default: "1",
                description: "Number of sibling buttons visible on each side of the active page.",
              },
              {
                prop: "boundaries",
                type: "number | Accessor<number>",
                default: "1",
                description: "Number of boundary page numbers visible at the beginning and end.",
              },
              {
                prop: "onChange",
                type: "(page: number) => void",
                default: "undefined",
                description: "Callback fired when the active page changes.",
              },
            ]}
          />

          <DocApiTable
            title="CreatePaginationReturn"
            items={[
              {
                prop: "page",
                type: "Accessor<number>",
                description: "Current active page number (1-indexed).",
              },
              {
                prop: "totalPages",
                type: "Accessor<number>",
                description: "Calculated total page count.",
              },
              {
                prop: "range",
                type: 'Accessor<(number | "ellipsis")[]>',
                description: "Array containing active page numbers and ellipsis indicators.",
              },
              {
                prop: "setPage",
                type: "(page: number) => void",
                description: "Programmatically updates the current page within valid bounds.",
              },
              {
                prop: "next",
                type: "() => void",
                description: "Navigates to the next page.",
              },
              {
                prop: "previous",
                type: "() => void",
                description: "Navigates to the previous page.",
              },
              {
                prop: "first",
                type: "() => void",
                description: "Navigates to page 1.",
              },
              {
                prop: "last",
                type: "() => void",
                description: "Navigates to totalPages.",
              },
              {
                prop: "hasNext",
                type: "Accessor<boolean>",
                description: "Whether a subsequent page is available.",
              },
              {
                prop: "hasPrevious",
                type: "Accessor<boolean>",
                description: "Whether an earlier page is available.",
              },
              {
                prop: "startIndex",
                type: "Accessor<number>",
                description: "1-based starting item index for the current page.",
              },
              {
                prop: "endIndex",
                type: "Accessor<number>",
                description: "1-based ending item index for the current page.",
              },
            ]}
          />
        </div>

        {/* Next Steps */}
        <DocNextSteps
          prev={{ title: "createForm", href: "/docs/hooks/create-form" }}
          next={{ title: "createUndoRedo", href: "/docs/hooks/create-undo-redo" }}
        />
      </div>
    </>
  );
}
