import type { SidebarItem } from "../types.js";

export function isSidebarItemActive(item: SidebarItem, currentUrl?: string): boolean {
  return Boolean(item.href && currentUrl && item.href === currentUrl);
}

export function containsActiveSidebarItem(item: SidebarItem, currentUrl?: string): boolean {
  return isSidebarItemActive(item, currentUrl)
    || Boolean(item.items?.some((child) => containsActiveSidebarItem(child, currentUrl)));
}

export function isSidebarItemNew(item: SidebarItem): boolean {
  if (!item.addedAt) return false;
  const timestamp = new Date(item.addedAt).getTime();
  if (!Number.isFinite(timestamp)) return false;
  const ageInDays = (Date.now() - timestamp) / (1000 * 60 * 60 * 24);
  return ageInDays >= 0 && ageInDays <= 14;
}

export function containsNewSidebarItem(item: SidebarItem): boolean {
  return isSidebarItemNew(item) || Boolean(item.items?.some(containsNewSidebarItem));
}
