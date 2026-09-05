// packages/docs/src/themes/default/index.ts
export * from "./layout.jsx";
export * from "./navbar.jsx";
export * from "./sidebar.jsx";
export * from "./content/table-of-contents.jsx";
export * from "./content/breadcrumbs.jsx";
export * from "./content/pager.jsx";
export * from "./overlays/search-dialog.jsx";

import { DocsLayout } from "./layout.jsx";
import { DocsNavbar } from "./navbar.jsx";
import { DocsSidebar } from "./sidebar.jsx";
import { DocsTableOfContents } from "./content/table-of-contents.jsx";
import { DocsBreadcrumbs } from "./content/breadcrumbs.jsx";
import { DocsPager, DocsPagination } from "./content/pager.jsx";
import { DocsSearchDialog } from "./overlays/search-dialog.jsx";
import { ThemeProvider } from "@nikala-ui/core";
import type { DocsThemeContract } from "../types.js";

export const defaultTheme: DocsThemeContract = {
  name: "default",
  Provider: ThemeProvider,
  Layout: DocsLayout,
  Navbar: DocsNavbar,
  Sidebar: DocsSidebar,
  TableOfContents: DocsTableOfContents,
  Breadcrumbs: DocsBreadcrumbs,
  Pagination: DocsPagination,
  Pager: DocsPager,
  SearchDialog: DocsSearchDialog,
};

export default defaultTheme;
