// packages/docs/src/core/route-tree.ts
import type { PageData, SidebarItem } from "../types.js";
import { formatTitleFromFilename } from "./content-scanner.js";

export function formatGroupName(segment: string): string {
  return segment
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function buildSidebarTree(pages: PageData[]): SidebarItem[] {
  const rootPages: PageData[] = [];
  const categoryMap = new Map<string, PageData[]>();

  for (const page of pages) {
    if (page.url === "/") {
      rootPages.push(page);
      continue;
    }

    const segments = page.url.slice(1).split("/");
    if (segments.length === 1) {
      rootPages.push(page);
    } else {
      const cat = segments[0];
      if (!categoryMap.has(cat)) {
        categoryMap.set(cat, []);
      }
      categoryMap.get(cat)!.push(page);
    }
  }

  // Sort root pages: "/" always first, then by order, then title
  rootPages.sort((a, b) => {
    if (a.url === "/") return -1;
    if (b.url === "/") return 1;
    const orderA = a.frontmatter.order ?? 9999;
    const orderB = b.frontmatter.order ?? 9999;
    if (orderA !== orderB) return orderA - orderB;
    return a.title.localeCompare(b.title);
  });

  const rootItems: SidebarItem[] = rootPages.map((page) => ({
    title: page.title || "Overview",
    href: page.url,
    badge: page.frontmatter.badge,
    icon: page.frontmatter.icon,
  }));

  // Determine order of categories
  const categories = Array.from(categoryMap.entries()).map(([cat, catPages]) => {
    const minCategoryOrder = Math.min(
      ...catPages.map((p) => {
        const catOrder = typeof p.frontmatter.categoryOrder === "number" ? p.frontmatter.categoryOrder : undefined;
        return catOrder ?? 9999;
      })
    );
    const minPageOrder = Math.min(...catPages.map((p) => p.frontmatter.order ?? 9999));
    return { cat, catPages, minCategoryOrder, minPageOrder };
  });

  categories.sort((a, b) => {
    if (a.minCategoryOrder !== b.minCategoryOrder) {
      return a.minCategoryOrder - b.minCategoryOrder;
    }
    if (a.minPageOrder !== b.minPageOrder) {
      return a.minPageOrder - b.minPageOrder;
    }
    return a.cat.localeCompare(b.cat);
  });

  for (const { cat, catPages } of categories) {
    const group: SidebarItem = {
      title: formatGroupName(cat),
      items: [],
    };

    // Sort pages in this category by order, then title
    catPages.sort((a, b) => {
      const orderA = a.frontmatter.order ?? 9999;
      const orderB = b.frontmatter.order ?? 9999;
      if (orderA !== orderB) return orderA - orderB;
      return a.title.localeCompare(b.title);
    });

    for (const page of catPages) {
      const segments = page.url.slice(1).split("/");
      if (segments.length === 2) {
        group.items?.push({
          title: page.title,
          href: page.url,
          badge: page.frontmatter.badge,
          icon: page.frontmatter.icon,
        });
      } else {
        const subCategory = segments[1];
        let subGroup = group.items?.find(
          (item) => item.title === formatGroupName(subCategory) && item.items
        );

        if (!subGroup) {
          subGroup = {
            title: formatGroupName(subCategory),
            items: [],
            collapsed: false,
          };
          group.items?.push(subGroup);
        }

        subGroup.items?.push({
          title: page.title,
          href: page.url,
          badge: page.frontmatter.badge,
          icon: page.frontmatter.icon,
        });
      }
    }

    rootItems.push(group);
  }

  return rootItems;
}

export function flattenSidebarItems(items: SidebarItem[]): Array<{ title: string; href: string }> {
  const flattened: Array<{ title: string; href: string }> = [];

  for (const item of items) {
    if (item.href) {
      flattened.push({ title: item.title, href: item.href });
    }
    if (item.items) {
      flattened.push(...flattenSidebarItems(item.items));
    }
  }

  return flattened;
}

export function buildPagination(
  pages: PageData[],
  currentUrl: string
): { prev?: { title: string; href: string }; next?: { title: string; href: string } } {
  const currentPage = pages.find((p) => p.url === currentUrl);

  const sidebar = buildSidebarTree(pages);
  const flattened = flattenSidebarItems(sidebar);
  const currentIndex = flattened.findIndex((item) => item.href === currentUrl);

  if (currentIndex === -1) {
    return {};
  }

  let prev = currentIndex > 0 ? flattened[currentIndex - 1] : undefined;
  let next = currentIndex < flattened.length - 1 ? flattened[currentIndex + 1] : undefined;

  // Custom frontmatter overrides
  if (currentPage?.frontmatter.prev === false || currentPage?.frontmatter.prev === null) {
    prev = undefined;
  } else if (typeof currentPage?.frontmatter.prev === "string") {
    const target = pages.find((p) => p.url === currentPage.frontmatter.prev);
    if (target) prev = { title: target.title, href: target.url };
  } else if (typeof currentPage?.frontmatter.prev === "object" && currentPage.frontmatter.prev !== null) {
    prev = currentPage.frontmatter.prev as { title: string; href: string };
  }

  if (currentPage?.frontmatter.next === false || currentPage?.frontmatter.next === null) {
    next = undefined;
  } else if (typeof currentPage?.frontmatter.next === "string") {
    const target = pages.find((p) => p.url === currentPage.frontmatter.next);
    if (target) next = { title: target.title, href: target.url };
  } else if (typeof currentPage?.frontmatter.next === "object" && currentPage.frontmatter.next !== null) {
    next = currentPage.frontmatter.next as { title: string; href: string };
  }

  return { prev, next };
}

export function buildBreadcrumbs(
  url: string,
  pages: PageData[]
): Array<{ title: string; href?: string }> {
  const breadcrumbs: Array<{ title: string; href?: string }> = [
    { title: "Docs", href: "/" },
  ];

  if (url === "/") {
    return breadcrumbs;
  }

  const segments = url.slice(1).split("/");
  let accumulatedPath = "";

  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    accumulatedPath += `/${seg}`;
    const isLast = i === segments.length - 1;

    const matchingPage = pages.find((p) => p.url === accumulatedPath);
    const title = matchingPage?.title || formatTitleFromFilename(seg);

    breadcrumbs.push({
      title,
      href: isLast ? undefined : accumulatedPath,
    });
  }

  return breadcrumbs;
}
