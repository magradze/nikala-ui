import { describe, it, expect } from "vitest";
import {
  Sidebar,
  SidebarProvider,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarTrigger,
  SidebarRail,
  SidebarInset,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";

describe("UI Component - Sidebar Suite", () => {
  it("should define all Sidebar structural and menu subcomponents", () => {
    expect(typeof SidebarProvider).toBe("function");
    expect(typeof Sidebar).toBe("function");
    expect(typeof SidebarHeader).toBe("function");
    expect(typeof SidebarContent).toBe("function");
    expect(typeof SidebarFooter).toBe("function");
    expect(typeof SidebarSeparator).toBe("function");
    expect(typeof SidebarInset).toBe("function");
    expect(typeof SidebarTrigger).toBe("function");
    expect(typeof SidebarRail).toBe("function");
    expect(typeof useSidebar).toBe("function");
  });

  it("should define all SidebarGroup and SidebarMenu subcomponents", () => {
    expect(typeof SidebarGroup).toBe("function");
    expect(typeof SidebarGroupLabel).toBe("function");
    expect(typeof SidebarGroupAction).toBe("function");
    expect(typeof SidebarGroupContent).toBe("function");
    expect(typeof SidebarMenu).toBe("function");
    expect(typeof SidebarMenuItem).toBe("function");
    expect(typeof SidebarMenuButton).toBe("function");
    expect(typeof SidebarMenuAction).toBe("function");
    expect(typeof SidebarMenuBadge).toBe("function");
    expect(typeof SidebarMenuSkeleton).toBe("function");
  });

  it("should define nested Submenu subcomponents", () => {
    expect(typeof SidebarMenuSub).toBe("function");
    expect(typeof SidebarMenuSubItem).toBe("function");
    expect(typeof SidebarMenuSubButton).toBe("function");
  });
});
