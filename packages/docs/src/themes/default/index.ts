// packages/docs/src/themes/default/index.ts
export * from "./Layout.js";
export * from "./Navbar.js";
export * from "./Sidebar.js";
export * from "./TableOfContents.js";
export * from "./Breadcrumbs.js";
export * from "./Pager.js";
export * from "./SearchDialog.js";

import { DocsLayout } from "./Layout.js";
import { DocsNavbar } from "./Navbar.js";
import { DocsSidebar } from "./Sidebar.js";
import { DocsTableOfContents } from "./TableOfContents.js";
import { DocsBreadcrumbs } from "./Breadcrumbs.js";
import { DocsPager, DocsPagination } from "./Pager.js";
import { DocsSearchDialog } from "./SearchDialog.js";
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
