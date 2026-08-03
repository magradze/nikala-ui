import type { Component, JSX } from "solid-js";

/* Navigation & Sidebar Types */
export interface NavItem {
  title: string;
  href: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export interface DocGuideItem {
  title: string;
  subtitle: string;
  href: string;
  shortcut?: string;
  icon: Component<{ class?: string }>;
}

export interface DocComponentItem {
  name: string;
  title: string;
  description: string;
  href: string;
}

export interface DocHookItem {
  name: string;
  title: string;
  description: string;
  href: string;
}

/* API Reference Table Types */
export interface PropItem {
  prop: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

export interface DocApiTableProps extends JSX.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  items: PropItem[];
  class?: string;
}

/* Layout Header & Pagination Types */
export interface DocPageHeaderProps extends JSX.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "outline" | "destructive";
}

export interface DocNextStepsProps {
  prev?: { title: string; href: string };
  next?: { title: string; href: string };
}
