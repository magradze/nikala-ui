// packages/docs/src/types.ts

export interface Frontmatter {
  title?: string;
  description?: string;
  order?: number;
  categoryOrder?: number;
  icon?: string;
  badge?: string;
  prev?: string | { title: string; href: string } | boolean;
  next?: string | { title: string; href: string } | boolean;
  toc?: boolean;
  [key: string]: unknown;
}

export interface TocItem {
  id: string;
  text: string;
  depth: number;
}

export interface PageData {
  slug: string;
  url: string;
  filePath: string;
  frontmatter: Frontmatter;
  toc: TocItem[];
  title: string;
  description?: string;
}

export interface SidebarItem {
  title: string;
  href?: string;
  badge?: string;
  icon?: string;
  items?: SidebarItem[];
  collapsed?: boolean;
}

export interface NavItem {
  title: string;
  href: string;
  external?: boolean;
}

export interface DocsThemeConfig {
  accentColor?: string;
  grayColor?: string;
  defaultMode?: "light" | "dark" | "system";
}

export interface DocsConfig {
  title?: string;
  description?: string;
  contentDir?: string;
  logo?: {
    text?: string;
    image?: string;
    href?: string;
  };
  repository?: {
    url: string;
    branch?: string;
    rootDir?: string;
  };
  nav?: NavItem[];
  sidebar?: SidebarItem[] | "auto";
  theme?: DocsThemeConfig;
  search?: {
    enabled?: boolean;
    provider?: "local" | "pagefind" | "orama" | "algolia";
  };
}
