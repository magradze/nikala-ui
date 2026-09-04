// packages/docs/src/client/App.tsx
import {
  createSignal,
  createEffect,
  createMemo,
  createResource,
  onMount,
  onCleanup,
  Show,
  Suspense,
  type Component,
} from "solid-js";
import { Dynamic } from "solid-js/web";
import { ThemeProvider } from "@nikala-ui/core";
import { defaultTheme } from "../themes/default/index.js";
import type { PageData, SidebarItem, TocItem } from "../types.js";
import type { BreadcrumbItemData } from "../themes/types.js";
import { defaultMdxComponents } from "../components/mdx-components.jsx";

function flattenSidebarItems(items: SidebarItem[]): Array<{ title: string; href: string }> {
  const flattened: Array<{ title: string; href: string }> = [];

  for (const item of items) {
    if (item.href) flattened.push({ title: item.title, href: item.href });
    if (item.items) flattened.push(...flattenSidebarItems(item.items));
  }

  return flattened;
}

// Virtual modules resolved by Vite plugin
// @ts-ignore
import rawConfig from "virtual:nikala-docs-config";
// @ts-ignore
import { tree as sidebarTree, pages as allPages } from "virtual:nikala-docs-tree";
// @ts-ignore
import { routes as pageRoutes } from "virtual:nikala-docs-routes";

export const App: Component = () => {
  const config = rawConfig || { title: "Nikala Docs" };

  createEffect(() => {
    if (typeof document !== "undefined") {
      document.title = config.title || "Documentation";
    }
  });

  // Current client-side route pathname
  const [pathname, setPathname] = createSignal(
    typeof window !== "undefined" ? window.location.pathname : "/"
  );

  // Intercept client-side anchor clicks for seamless SPA navigation
  onMount(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname);
    };

    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (
        !href ||
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("//") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        target.hasAttribute("download") ||
        target.getAttribute("target") === "_blank" ||
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      // Hash-only links within same page
      if (href.startsWith("#")) {
        const el = document.getElementById(href.slice(1));
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", href);
        }
        return;
      }

      // Normal internal page links
      const url = new URL(href, window.location.origin);
      if (url.origin === window.location.origin) {
        e.preventDefault();
        setPathname(url.pathname);
        window.history.pushState(null, "", href);
        if (url.hash) {
          const el = document.getElementById(url.hash.slice(1));
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
            return;
          }
        }
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      }
    };

    window.addEventListener("popstate", handlePopState);
    document.addEventListener("click", handleAnchorClick);

    onCleanup(() => {
      window.removeEventListener("popstate", handlePopState);
      document.removeEventListener("click", handleAnchorClick);
    });
  });

  // Current Page Data resolution
  const currentPage = createMemo<PageData | undefined>(() => {
    const current = pathname().replace(/\/$/, "");
    return (
      allPages.find((p: PageData) => p.url === current || p.url === pathname()) ||
      allPages[0]
    );
  });

  // Dynamic breadcrumbs derived from URL hierarchy
  const breadcrumbs = createMemo<BreadcrumbItemData[]>(() => {
    const page = currentPage();
    if (!page) return [];

    const segments = page.url.split("/").filter(Boolean);
    const items: BreadcrumbItemData[] = [{ title: "Docs", href: "/" }];

    let accumulated = "";
    for (let i = 0; i < segments.length; i++) {
      accumulated += "/" + segments[i];
      const isLast = i === segments.length - 1;
      const matchingPage = allPages.find((p: PageData) => p.url === accumulated);
      items.push({
        title: matchingPage?.title || segments[i].replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        href: isLast ? undefined : accumulated,
      });
    }

    return items;
  });

  // Table of contents for the active page
  const toc = createMemo<TocItem[]>(() => {
    return currentPage()?.toc || [];
  });

  // Keep previous/next navigation in the same order as the sidebar tree.
  const flatPages = createMemo<PageData[]>(() => {
    const visiblePages = new Map(
      allPages
        .filter((p: PageData) => p.frontmatter?.hidden !== true)
        .map((page: PageData) => [page.url, page] as const)
    );

    return flattenSidebarItems(sidebarTree)
      .map((item) => visiblePages.get(item.href))
      .filter((page): page is PageData => Boolean(page));
  });

  const prevPage = createMemo(() => {
    const current = currentPage();
    if (!current) return undefined;
    const pages = flatPages();
    const index = pages.findIndex((p) => p.url === current.url);
    if (index > 0) {
      const p = pages[index - 1];
      return { title: p.title, href: p.url };
    }
    return undefined;
  });

  const nextPage = createMemo(() => {
    const current = currentPage();
    if (!current) return undefined;
    const pages = flatPages();
    const index = pages.findIndex((p) => p.url === current.url);
    if (index >= 0 && index < pages.length - 1) {
      const p = pages[index + 1];
      return { title: p.title, href: p.url };
    }
    return undefined;
  });

  // Lazy load the compiled MDX module for the current URL
  const [pageModule] = createResource(
    () => currentPage()?.url,
    async (url) => {
      if (!url) return null;
      const loader = pageRoutes[url] || pageRoutes[url + "/"] || pageRoutes["/"];
      if (!loader) return null;
      return await loader();
    }
  );

  return (
    <ThemeProvider defaultTheme="system" storageKey="nikala-theme">
      <defaultTheme.Layout
        config={config}
        tree={sidebarTree}
        currentPage={currentPage()}
        breadcrumbs={breadcrumbs()}
        // Mount the TOC only after the lazy MDX module has rendered its
        // headings; the Nikala scroll-spy observes headings in onMount.
        toc={pageModule() ? toc() : []}
        prev={prevPage()}
        next={nextPage()}
      >
        <Suspense fallback={<div class="p-8 text-sm text-muted-foreground">Loading documentation...</div>}>
          <Show
            when={pageModule()}
            fallback={
              <div class="space-y-4 py-8">
                <h1 class="text-2xl font-bold">Page Not Found</h1>
                <p class="text-muted-foreground text-sm">The documentation article could not be found.</p>
              </div>
            }
          >
            {(mod) => (
              <Dynamic component={mod().default} components={defaultMdxComponents} />
            )}
          </Show>
        </Suspense>
      </defaultTheme.Layout>
    </ThemeProvider>
  );
};
