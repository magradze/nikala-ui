import type { SidebarItem } from "../types.js";

export interface FlatSidebarItem {
  title: string;
  href: string;
}

export function flattenSidebarItems(items: SidebarItem[]): FlatSidebarItem[] {
  const flattened: FlatSidebarItem[] = [];
  for (const item of items) {
    if (item.href) flattened.push({ title: item.title, href: item.href });
    if (item.items) flattened.push(...flattenSidebarItems(item.items));
  }
  return flattened;
}
