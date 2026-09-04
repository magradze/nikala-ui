// packages/docs/src/themes/default/index.ts
export * from "./Layout.jsx";
export * from "./Navbar.jsx";
export * from "./Sidebar.jsx";
export * from "./TableOfContents.jsx";
export * from "./Breadcrumbs.jsx";
export * from "./Pager.jsx";
export * from "./SearchDialog.jsx";

import { DocsLayout } from "./Layout.jsx";
import { DocsNavbar } from "./Navbar.jsx";
import { DocsSidebar } from "./Sidebar.jsx";
import { DocsTableOfContents } from "./TableOfContents.jsx";
import { DocsBreadcrumbs } from "./Breadcrumbs.jsx";
import { DocsPager, DocsPagination } from "./Pager.jsx";
import { DocsSearchDialog } from "./SearchDialog.jsx";
import type { DocsThemeContract } from "../types.js";

export const defaultTheme: DocsThemeContract = {
  name: "default",
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
