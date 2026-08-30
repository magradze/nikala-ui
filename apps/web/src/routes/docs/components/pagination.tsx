// src/routes/docs/components/pagination.tsx
import { For, createSignal } from "solid-js";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationFirst,
  PaginationLast,
  PaginationEllipsis,
  PaginationSummary,
} from "@/components/ui/pagination";
import { createPagination } from "@/hooks/create-pagination";

/* --- Code Snippets --- */
const importCode = `import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationFirst,
  PaginationLast,
  PaginationEllipsis,
  PaginationSummary,
} from "@/components/ui/pagination";
import { createPagination } from "@/hooks/create-pagination";`;

const defaultCode = `const pagination = createPagination({
  totalPages: 10,
  defaultPage: 2,
  siblingCount: 1,
  boundaries: 1,
});

return (
  <Pagination>
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious
          disabled={!pagination.hasPrevious()}
          onClick={pagination.previous}
        />
      </PaginationItem>

      <For each={pagination.range()}>
        {(item) =>
          item === "ellipsis" ? (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem>
              <PaginationLink
                isActive={pagination.page() === item}
                onClick={() => pagination.setPage(item)}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          )
        }
      </For>

      <PaginationItem>
        <PaginationNext
          disabled={!pagination.hasNext()}
          onClick={pagination.next}
        />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
);`;

const outlineCode = `const pagination = createPagination({
  totalPages: 8,
  defaultPage: 3,
});

return (
  <Pagination>
    <PaginationContent>
      <PaginationItem>
        <PaginationFirst
          variant="outline"
          disabled={!pagination.hasPrevious()}
          onClick={pagination.first}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationPrevious
          variant="outline"
          disabled={!pagination.hasPrevious()}
          onClick={pagination.previous}
        />
      </PaginationItem>

      <For each={pagination.range()}>
        {(item) =>
          item === "ellipsis" ? (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem>
              <PaginationLink
                variant="outline"
                isActive={pagination.page() === item}
                onClick={() => pagination.setPage(item)}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          )
        }
      </For>

      <PaginationItem>
        <PaginationNext
          variant="outline"
          disabled={!pagination.hasNext()}
          onClick={pagination.next}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLast
          variant="outline"
          disabled={!pagination.hasNext()}
          onClick={pagination.last}
        />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
);`;

const compactCode = `const [page, setPage] = createSignal(1);

return (
  <div class="flex items-center justify-between gap-4 w-full max-w-sm p-3 rounded-lg border border-border bg-card">
    <span class="text-xs text-muted-foreground font-mono">Page {page()} of 12</span>
    <div class="flex items-center gap-1">
      <PaginationPrevious
        variant="outline"
        size="sm"
        hideText
        disabled={page() <= 1}
        onClick={() => setPage((p) => Math.max(1, p - 1))}
      />
      <PaginationNext
        variant="outline"
        size="sm"
        hideText
        disabled={page() >= 12}
        onClick={() => setPage((p) => Math.min(12, p + 1))}
      />
    </div>
  </div>
);`;

export default function PaginationDocPage() {
  const defaultPagination = createPagination({
    totalPages: 10,
    defaultPage: 2,
    siblingCount: 1,
    boundaries: 1,
  });

  const outlinePagination = createPagination({
    totalPages: 8,
    defaultPage: 3,
    siblingCount: 1,
    boundaries: 1,
  });

  const [compactPage, setCompactPage] = createSignal(1);

  return (
    <>
      <Seo
        title="Pagination Component"
        description="An accessible multi-page navigation bar with previous, next, page numbers, and ellipsis controls for SolidJS."
        path="/docs/components/pagination"
      />

      <div class="space-y-10 pb-16">
        {/* 1. Page Header */}
        <DocPageHeader
          title="Pagination"
          badge="Compound Component"
          description="An accessible multi-page navigation bar with previous, next, direct page numbers, and ellipsis jump controls."
        />

        {/* 2. Main Hero Preview */}
        <ComponentPreview name="pagination" code={defaultCode}>
          <div class="flex flex-col items-center justify-center p-8 w-full min-h-[160px] space-y-4">
            <PaginationSummary>
              Page {defaultPagination.page()} of {defaultPagination.totalPages()}
            </PaginationSummary>

            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    disabled={!defaultPagination.hasPrevious()}
                    onClick={defaultPagination.previous}
                  />
                </PaginationItem>

                <For each={defaultPagination.range()}>
                  {(item) =>
                    item === "ellipsis" ? (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    ) : (
                      <PaginationItem>
                        <PaginationLink
                          isActive={defaultPagination.page() === item}
                          onClick={() => defaultPagination.setPage(item)}
                        >
                          {item}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  }
                </For>

                <PaginationItem>
                  <PaginationNext
                    disabled={!defaultPagination.hasNext()}
                    onClick={defaultPagination.next}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </ComponentPreview>

        {/* 3. Usage & Import */}
        <div class="space-y-4">
          <DocSectionHeader title="Usage" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        {/* 4. Examples */}
        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          {/* Outline Variant with First/Last Controls */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Outline Variant & First/Last Buttons</h3>
            <p class="text-sm text-muted-foreground">
              Add <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">PaginationFirst</code> and <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">PaginationLast</code> for quick jump controls with <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">variant="outline"</code>.
            </p>
            <ComponentPreview name="pagination" code={outlineCode}>
              <div class="flex flex-col items-center justify-center p-6 w-full space-y-3">
                <PaginationSummary>
                  Selected Page: {outlinePagination.page()} of {outlinePagination.totalPages()}
                </PaginationSummary>

                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationFirst
                        variant="outline"
                        disabled={!outlinePagination.hasPrevious()}
                        onClick={outlinePagination.first}
                      />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationPrevious
                        variant="outline"
                        disabled={!outlinePagination.hasPrevious()}
                        onClick={outlinePagination.previous}
                      />
                    </PaginationItem>

                    <For each={outlinePagination.range()}>
                      {(item) =>
                        item === "ellipsis" ? (
                          <PaginationItem>
                            <PaginationEllipsis />
                          </PaginationItem>
                        ) : (
                          <PaginationItem>
                            <PaginationLink
                              variant="outline"
                              isActive={outlinePagination.page() === item}
                              onClick={() => outlinePagination.setPage(item)}
                            >
                              {item}
                            </PaginationLink>
                          </PaginationItem>
                        )
                      }
                    </For>

                    <PaginationItem>
                      <PaginationNext
                        variant="outline"
                        disabled={!outlinePagination.hasNext()}
                        onClick={outlinePagination.next}
                      />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLast
                        variant="outline"
                        disabled={!outlinePagination.hasNext()}
                        onClick={outlinePagination.last}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </ComponentPreview>
          </div>

          {/* Compact Mobile Layout */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Compact Mobile Layout</h3>
            <p class="text-sm text-muted-foreground">
              Use <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">hideText</code> on arrow controls for responsive tables and mobile viewports.
            </p>
            <ComponentPreview name="pagination" code={compactCode}>
              <div class="flex items-center justify-center p-6 w-full">
                <div class="flex items-center justify-between gap-4 w-full max-w-xs p-3 rounded-lg border border-border bg-card">
                  <span class="text-xs text-muted-foreground font-mono">Page {compactPage()} of 12</span>
                  <div class="flex items-center gap-1">
                    <PaginationPrevious
                      variant="outline"
                      size="sm"
                      hideText
                      disabled={compactPage() <= 1}
                      onClick={() => setCompactPage((p) => Math.max(1, p - 1))}
                    />
                    <PaginationNext
                      variant="outline"
                      size="sm"
                      hideText
                      disabled={compactPage() >= 12}
                      onClick={() => setCompactPage((p) => Math.min(12, p + 1))}
                    />
                  </div>
                </div>
              </div>
            </ComponentPreview>
          </div>
        </div>

        {/* 5. API Reference */}
        <div class="space-y-6 pt-4">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="PaginationLink"
            items={[
              {
                prop: "isActive",
                type: "boolean",
                default: "false",
                description: "Highlights the button as the current active page with aria-current='page'.",
              },
              {
                prop: "variant",
                type: '"default" | "outline" | "ghost" | "flat"',
                default: '"default"',
                description: "Visual appearance style for the pagination button.",
              },
              {
                prop: "size",
                type: '"default" | "sm" | "lg" | "icon"',
                default: '"default"',
                description: "Dimensions and padding of the button.",
              },
            ]}
          />

          <DocApiTable
            title="PaginationPrevious & PaginationNext"
            items={[
              {
                prop: "hideText",
                type: "boolean",
                default: "false",
                description: "Hides the text label and displays only the chevron icon for compact layouts.",
              },
              {
                prop: "disabled",
                type: "boolean",
                default: "false",
                description: "Disables interaction when at the beginning or end of the page range.",
              },
            ]}
          />
        </div>

        {/* 6. Footer Navigation */}
        <DocNextSteps
          prev={{ title: "Navigation Menu", href: "/docs/components/navigation-menu" }}
          next={{ title: "Progress Component", href: "/docs/components/progress" }}
        />
      </div>
    </>
  );
}
