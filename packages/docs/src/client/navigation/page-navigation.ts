import { createMemo, type Accessor } from "solid-js";
import type { BreadcrumbItemData } from "../../themes/types.js";
import type { PageData, SidebarItem, TocItem } from "../../types.js";
import { flattenSidebarItems } from "../utils/sidebar.js";

export function createPageNavigation(currentPage: Accessor<PageData | undefined>, pages: PageData[], sidebarTree: SidebarItem[]) {
  const breadcrumbs = createMemo<BreadcrumbItemData[]>(() => {
    const page = currentPage();
    if (!page) return [];
    const segments = page.url.split("/").filter(Boolean);
    const items: BreadcrumbItemData[] = [{ title: "Docs", href: "/" }];
    let accumulated = "";
    for (let index = 0; index < segments.length; index++) {
      accumulated += `/${segments[index]}`;
      const isLast = index === segments.length - 1;
      const matchingPage = pages.find((item) => item.url === accumulated);
      items.push({
        title: matchingPage?.title || segments[index].replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()),
        href: isLast ? undefined : accumulated,
      });
    }
    return items;
  });

  const toc = createMemo<TocItem[]>(() => currentPage()?.toc || []);
  const flatPages = createMemo<PageData[]>(() => {
    const visiblePages = new Map(pages.filter((page) => page.frontmatter?.hidden !== true).map((page) => [page.url, page] as const));
    return flattenSidebarItems(sidebarTree).map((item) => visiblePages.get(item.href)).filter((page): page is PageData => Boolean(page));
  });
  const prevPage = createMemo(() => {
    const page = currentPage();
    if (!page) return undefined;
    const ordered = flatPages();
    const index = ordered.findIndex((item) => item.url === page.url);
    if (index <= 0) return undefined;
    const previous = ordered[index - 1];
    return { title: previous.title, href: previous.url };
  });
  const nextPage = createMemo(() => {
    const page = currentPage();
    if (!page) return undefined;
    const ordered = flatPages();
    const index = ordered.findIndex((item) => item.url === page.url);
    if (index < 0 || index >= ordered.length - 1) return undefined;
    const next = ordered[index + 1];
    return { title: next.title, href: next.url };
  });
  return { breadcrumbs, toc, prevPage, nextPage };
}
