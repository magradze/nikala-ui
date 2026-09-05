import { ThemeProvider } from "@nikala-ui/core";
import { defaultTheme } from "../../themes/default/index.js";
import type { BreadcrumbItemData } from "../../themes/types.js";
import type { PageData, SidebarItem, TocItem } from "../../types.js";
import type { ParentComponent } from "solid-js";

interface DocsLayoutShellProps {
  config: any;
  tree: SidebarItem[];
  currentPage: PageData | undefined;
  breadcrumbs: BreadcrumbItemData[];
  toc: TocItem[];
  prev: { title: string; href: string } | undefined;
  next: { title: string; href: string } | undefined;
}

export const DocsLayoutShell: ParentComponent<DocsLayoutShellProps> = (props) => (
  <ThemeProvider defaultTheme="system" storageKey="nikala-theme">
    <defaultTheme.Layout config={props.config} tree={props.tree} currentPage={props.currentPage} breadcrumbs={props.breadcrumbs} toc={props.toc} prev={props.prev} next={props.next}>
      {props.children}
    </defaultTheme.Layout>
  </ThemeProvider>
);
