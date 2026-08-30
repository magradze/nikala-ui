import { describe, it, expect, vi } from "vitest";
import { createRoot, createSignal } from "solid-js";
import { createPagination } from "@/hooks/create-pagination";

describe("createPagination", () => {
  it("calculates total pages correctly from count and pageSize", () => {
    createRoot((dispose) => {
      const pagination = createPagination({ count: 95, pageSize: 10 });
      expect(pagination.totalPages()).toBe(10);
      expect(pagination.page()).toBe(1);
      expect(pagination.startIndex()).toBe(1);
      expect(pagination.endIndex()).toBe(10);
      dispose();
    });
  });

  it("handles navigation methods correctly (next, previous, first, last)", () => {
    createRoot((dispose) => {
      const pagination = createPagination({ totalPages: 5, defaultPage: 2 });
      expect(pagination.page()).toBe(2);
      expect(pagination.hasNext()).toBe(true);
      expect(pagination.hasPrevious()).toBe(true);

      pagination.next();
      expect(pagination.page()).toBe(3);

      pagination.previous();
      expect(pagination.page()).toBe(2);

      pagination.last();
      expect(pagination.page()).toBe(5);
      expect(pagination.hasNext()).toBe(false);

      pagination.first();
      expect(pagination.page()).toBe(1);
      expect(pagination.hasPrevious()).toBe(false);

      dispose();
    });
  });

  it("generates exact sibling range with ellipses for page 1 and page 5", () => {
    createRoot((dispose) => {
      // Page 1 with siblingCount = 1 -> [1, 2, "ellipsis", 10]
      const p1 = createPagination({
        totalPages: 10,
        defaultPage: 1,
        siblingCount: 1,
        boundaries: 1,
      });
      expect(p1.range()).toEqual([1, 2, "ellipsis", 10]);

      // Page 5 with siblingCount = 1 -> [1, "ellipsis", 4, 5, 6, "ellipsis", 10]
      const p5 = createPagination({
        totalPages: 10,
        defaultPage: 5,
        siblingCount: 1,
        boundaries: 1,
      });
      expect(p5.range()).toEqual([1, "ellipsis", 4, 5, 6, "ellipsis", 10]);

      // Page 5 with siblingCount = 0 -> [1, "ellipsis", 5, "ellipsis", 10]
      const p0 = createPagination({
        totalPages: 10,
        defaultPage: 5,
        siblingCount: 0,
        boundaries: 1,
      });
      expect(p0.range()).toEqual([1, "ellipsis", 5, "ellipsis", 10]);

      dispose();
    });
  });

  it("safely handles negative inputs without errors", () => {
    createRoot((dispose) => {
      const pagination = createPagination({
        totalPages: -5,
        defaultPage: -2,
        siblingCount: -1,
      });
      expect(pagination.totalPages()).toBe(1);
      expect(pagination.page()).toBe(1);
      expect(pagination.range()).toEqual([1]);
      dispose();
    });
  });

  it("handles controlled page signal reactively", () => {
    createRoot((dispose) => {
      const [page, setPage] = createSignal(1);
      const pagination = createPagination({ totalPages: 5, page });

      expect(pagination.page()).toBe(1);
      setPage(4);
      expect(pagination.page()).toBe(4);

      dispose();
    });
  });

  it("fires onChange callback when page changes", () => {
    createRoot((dispose) => {
      const onChange = vi.fn();
      const pagination = createPagination({ totalPages: 5, defaultPage: 1, onChange });

      pagination.setPage(3);
      expect(onChange).toHaveBeenCalledWith(3);

      dispose();
    });
  });
});
