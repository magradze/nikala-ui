import { createSignal, createMemo, type Accessor } from "solid-js";

export interface CreatePaginationOptions {
  /** Total number of items across all pages, or total count. */
  count?: number | Accessor<number>;
  /** Explicit total number of pages. If provided, overrides count / pageSize calculation. */
  totalPages?: number | Accessor<number>;
  /** Controlled active page number (1-indexed). */
  page?: number | Accessor<number>;
  /** Default active page number for uncontrolled state. Defaults to 1. */
  defaultPage?: number;
  /** Number of items per page. Defaults to 10. */
  pageSize?: number | Accessor<number>;
  /** Number of sibling page buttons visible on each side of the current active page. Defaults to 1. */
  siblingCount?: number | Accessor<number>;
  /** Number of boundary pages visible at the beginning and end. Defaults to 1. */
  boundaries?: number | Accessor<number>;
  /** Callback fired whenever the active page changes. */
  onChange?: (page: number) => void;
}

export interface CreatePaginationReturn {
  /** Accessor returning the current active page number (1-indexed). */
  page: Accessor<number>;
  /** Accessor returning the calculated total number of pages. */
  totalPages: Accessor<number>;
  /** Accessor returning the active page size. */
  pageSize: Accessor<number>;
  /** Accessor returning an array of page numbers and "ellipsis" strings. */
  range: Accessor<(number | "ellipsis")[]>;
  /** Function to programmatically change to a specific page number. */
  setPage: (page: number) => void;
  /** Function to navigate to the next page. */
  next: () => void;
  /** Function to navigate to the previous page. */
  previous: () => void;
  /** Function to navigate to the first page (1). */
  first: () => void;
  /** Function to navigate to the last page (totalPages). */
  last: () => void;
  /** Accessor indicating whether a next page exists. */
  hasNext: Accessor<boolean>;
  /** Accessor indicating whether a previous page exists. */
  hasPrevious: Accessor<boolean>;
  /** 1-based start index of items on the current page (e.g. 1 for page 1 with pageSize 10). */
  startIndex: Accessor<number>;
  /** 1-based end index of items on the current page (e.g. 10 for page 1 with pageSize 10). */
  endIndex: Accessor<number>;
}

/**
 * SolidJS reactive primitive for computing pagination state, dynamic page range with ellipses, and navigation helpers.
 *
 * @param options Pagination configuration options.
 */
export function createPagination(options: CreatePaginationOptions = {}): CreatePaginationReturn {
  const getCount = () => {
    const raw = typeof options.count === "function" ? options.count() : options.count ?? 0;
    return Math.max(0, raw);
  };

  const getPageSize = () => {
    const raw = typeof options.pageSize === "function" ? options.pageSize() : options.pageSize ?? 10;
    return Math.max(1, raw);
  };

  const getExplicitTotalPages = () => {
    const raw = typeof options.totalPages === "function" ? options.totalPages() : options.totalPages;
    return raw !== undefined ? Math.max(1, raw) : undefined;
  };

  const getSiblingCount = () => {
    const raw = typeof options.siblingCount === "function" ? options.siblingCount() : options.siblingCount ?? 1;
    return Math.max(0, raw);
  };

  const getBoundaries = () => {
    const raw = typeof options.boundaries === "function" ? options.boundaries() : options.boundaries ?? 1;
    return Math.max(0, raw);
  };

  const [internalPage, setInternalPage] = createSignal<number>(Math.max(1, options.defaultPage ?? 1));

  const totalPages = createMemo<number>(() => {
    const explicit = getExplicitTotalPages();
    if (explicit !== undefined) {
      return Math.max(1, explicit);
    }
    const count = getCount();
    const size = getPageSize();
    return Math.max(1, Math.ceil(count / size));
  });

  const rawPage = () => {
    if (typeof options.page === "function") {
      return options.page();
    }
    if (typeof options.page === "number") {
      return options.page;
    }
    return internalPage();
  };

  const page = createMemo<number>(() => {
    const p = rawPage();
    const max = totalPages();
    if (p < 1) return 1;
    if (p > max) return max;
    return p;
  });

  const setPage = (nextPage: number) => {
    const max = totalPages();
    const clamped = Math.max(1, Math.min(nextPage, max));
    if (typeof options.page !== "function" && typeof options.page !== "number") {
      setInternalPage(clamped);
    }
    options.onChange?.(clamped);
  };

  const next = () => setPage(page() + 1);
  const previous = () => setPage(page() - 1);
  const first = () => setPage(1);
  const last = () => setPage(totalPages());

  const hasNext = createMemo(() => page() < totalPages());
  const hasPrevious = createMemo(() => page() > 1);

  const startIndex = createMemo(() => {
    const count = getCount();
    if (count === 0 && getExplicitTotalPages() === undefined) return 0;
    return (page() - 1) * getPageSize() + 1;
  });

  const endIndex = createMemo(() => {
    const count = getCount();
    const calculated = page() * getPageSize();
    if (count > 0) {
      return Math.min(calculated, count);
    }
    return calculated;
  });

  const range = createMemo<(number | "ellipsis")[]>(() => {
    const total = totalPages();
    const current = page();
    const siblings = getSiblingCount();
    const boundaries = getBoundaries();

    if (total <= 1) {
      return [1];
    }

    const pagesSet = new Set<number>();

    // 1. Boundary pages at the start
    for (let i = 1; i <= Math.min(boundaries, total); i++) {
      pagesSet.add(i);
    }

    // 2. Sibling pages around current page
    const leftSibling = Math.max(1, current - siblings);
    const rightSibling = Math.min(total, current + siblings);
    for (let i = leftSibling; i <= rightSibling; i++) {
      pagesSet.add(i);
    }

    // 3. Boundary pages at the end
    for (let i = Math.max(1, total - boundaries + 1); i <= total; i++) {
      pagesSet.add(i);
    }

    const sortedPages = Array.from(pagesSet).sort((a, b) => a - b);
    const result: (number | "ellipsis")[] = [];

    for (let i = 0; i < sortedPages.length; i++) {
      const currentPageNum = sortedPages[i];
      if (i > 0) {
        const prevPageNum = sortedPages[i - 1];
        const gap = currentPageNum - prevPageNum;
        if (gap === 2) {
          result.push(prevPageNum + 1);
        } else if (gap > 2) {
          result.push("ellipsis");
        }
      }
      result.push(currentPageNum);
    }

    return result;
  });

  return {
    page,
    totalPages,
    pageSize: getPageSize,
    range,
    setPage,
    next,
    previous,
    first,
    last,
    hasNext,
    hasPrevious,
    startIndex,
    endIndex,
  };
}
