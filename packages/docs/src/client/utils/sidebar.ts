import type { SidebarItem } from "../../types.js";

export function flattenSidebarItems(items: SidebarItem[]): Array<{ title: string; href: string }> {
  const flattened: Array<{ title: string; href: string }> = [];
  for (const item of items) {
    if (item.href) flattened.push({ title: item.title, href: item.href });
    if (item.items) flattened.push(...flattenSidebarItems(item.items));
  }
  return flattened;
}
