import { For, Show } from "solid-js";
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
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "pagination",
  name: "Pagination",
  props: [
    {
      name: "variant",
      label: "Variant",
      type: "select",
      options: ["default", "outline", "ghost", "flat"],
      default: "default",
    },
    {
      name: "size",
      label: "Size",
      type: "select",
      options: ["default", "sm", "lg"],
      default: "default",
    },
    {
      name: "totalPages",
      label: "Total Pages",
      type: "number",
      default: 10,
    },
    {
      name: "siblingCount",
      label: "Sibling Count",
      type: "number",
      default: 1,
    },
    {
      name: "showFirstLast",
      label: "First/Last Jumps",
      type: "boolean",
      default: false,
    },
    {
      name: "hideText",
      label: "Icon-only Arrows",
      type: "boolean",
      default: false,
    },
    {
      name: "showSummary",
      label: "Show Summary",
      type: "boolean",
      default: true,
    },
  ],
  generateCode: (v) => {
    const variantStr = v.variant && v.variant !== "default" ? ` variant="${v.variant}"` : "";
    const sizeStr = v.size && v.size !== "default" ? ` size="${v.size}"` : "";
    const hideTextStr = v.hideText ? ` hideText` : "";
    const commonProps = `${variantStr}${sizeStr}`;

    const firstLastCode = v.showFirstLast
      ? `      <PaginationItem>
        <PaginationFirst${commonProps}${hideTextStr} disabled={!pagination.hasPrevious()} onClick={pagination.first} />
      </PaginationItem>
`
      : "";

    const lastCode = v.showFirstLast
      ? `      <PaginationItem>
        <PaginationLast${commonProps}${hideTextStr} disabled={!pagination.hasNext()} onClick={pagination.last} />
      </PaginationItem>
`
      : "";

    const summaryCode = v.showSummary
      ? `    <PaginationSummary>Page {pagination.page()} of {pagination.totalPages()}</PaginationSummary>
`
      : "";

    return `const pagination = createPagination({
  totalPages: ${v.totalPages ?? 10},
  siblingCount: ${v.siblingCount ?? 1},
  defaultPage: 1,
});

return (
  <div class="space-y-3 flex flex-col items-center">
${summaryCode}    <Pagination>
      <PaginationContent>
${firstLastCode}      <PaginationItem>
        <PaginationPrevious
${commonProps ? `          ${commonProps.trim()}\n` : ""}${hideTextStr ? `          ${hideTextStr.trim()}\n` : ""}          disabled={!pagination.hasPrevious()}
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
${commonProps ? `                ${commonProps.trim()}\n` : ""}                isActive={pagination.page() === item}
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
${commonProps ? `          ${commonProps.trim()}\n` : ""}${hideTextStr ? `          ${hideTextStr.trim()}\n` : ""}          disabled={!pagination.hasNext()}
          onClick={pagination.next}
        />
      </PaginationItem>
${lastCode}      </PaginationContent>
    </Pagination>
  </div>
);`;
  },
};

export default function PaginationStage(props: StageProps) {
  const pagination = createPagination({
    totalPages: () => Number(props.values.totalPages ?? 10),
    siblingCount: () => Number(props.values.siblingCount ?? 1),
    defaultPage: 1,
  });

  return (
    <div class="flex flex-col items-center justify-center p-6 sm:p-12 w-full min-h-[220px] space-y-4">
      <Show when={props.values.showSummary}>
        <PaginationSummary>
          Page {pagination.page()} of {pagination.totalPages()} (Active Page: {pagination.page()})
        </PaginationSummary>
      </Show>

      <Pagination>
        <PaginationContent>
          <Show when={props.values.showFirstLast}>
            <PaginationItem>
              <PaginationFirst
                variant={props.values.variant}
                size={props.values.size}
                hideText={Boolean(props.values.hideText)}
                disabled={!pagination.hasPrevious()}
                onClick={pagination.first}
              />
            </PaginationItem>
          </Show>

          <PaginationItem>
            <PaginationPrevious
              variant={props.values.variant}
              size={props.values.size}
              hideText={Boolean(props.values.hideText)}
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
                    variant={props.values.variant}
                    size={props.values.size}
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
              variant={props.values.variant}
              size={props.values.size}
              hideText={Boolean(props.values.hideText)}
              disabled={!pagination.hasNext()}
              onClick={pagination.next}
            />
          </PaginationItem>

          <Show when={props.values.showFirstLast}>
            <PaginationItem>
              <PaginationLast
                variant={props.values.variant}
                size={props.values.size}
                hideText={Boolean(props.values.hideText)}
                disabled={!pagination.hasNext()}
                onClick={pagination.last}
              />
            </PaginationItem>
          </Show>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
