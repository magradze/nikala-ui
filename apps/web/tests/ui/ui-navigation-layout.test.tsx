import { describe, it, expect } from "vitest";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { List, ListItem } from "@/components/ui/list";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

describe("UI Component - Breadcrumb Suite", () => {
  it("should define all Breadcrumb subcomponents", () => {
    expect(typeof Breadcrumb).toBe("function");
    expect(typeof BreadcrumbList).toBe("function");
    expect(typeof BreadcrumbItem).toBe("function");
    expect(typeof BreadcrumbLink).toBe("function");
    expect(typeof BreadcrumbPage).toBe("function");
    expect(typeof BreadcrumbSeparator).toBe("function");
    expect(typeof BreadcrumbEllipsis).toBe("function");
  });
});

describe("UI Component - Tabs Suite", () => {
  it("should define all Tabs subcomponents", () => {
    expect(typeof Tabs).toBe("function");
    expect(typeof TabsList).toBe("function");
    expect(typeof TabsTrigger).toBe("function");
    expect(typeof TabsContent).toBe("function");
  });
});

describe("UI Component - Separator, Skeleton & List", () => {
  it("should define Separator, Skeleton, and List components", () => {
    expect(typeof Separator).toBe("function");
    expect(typeof Skeleton).toBe("function");
    expect(typeof List).toBe("function");
    expect(typeof ListItem).toBe("function");
  });
});

describe("UI Component - Avatar Suite", () => {
  it("should define Avatar subcomponents", () => {
    expect(typeof Avatar).toBe("function");
    expect(typeof AvatarImage).toBe("function");
    expect(typeof AvatarFallback).toBe("function");
  });
});

describe("UI Component - NavigationMenu Suite", () => {
  it("should define all NavigationMenu subcomponents", async () => {
    const {
      NavigationMenu,
      NavigationMenuList,
      NavigationMenuItem,
      NavigationMenuTrigger,
      NavigationMenuContent,
      NavigationMenuLink,
    } = await import("@/components/ui/navigation-menu");

    expect(typeof NavigationMenu).toBe("function");
    expect(typeof NavigationMenuList).toBe("function");
    expect(typeof NavigationMenuItem).toBe("function");
    expect(typeof NavigationMenuTrigger).toBe("function");
    expect(typeof NavigationMenuContent).toBe("function");
    expect(typeof NavigationMenuLink).toBe("function");
  });
});

describe("UI Component - Pagination Suite", () => {
  it("should define all Pagination subcomponents", async () => {
    const {
      Pagination,
      PaginationContent,
      PaginationItem,
      PaginationLink,
      PaginationPrevious,
      PaginationNext,
      PaginationFirst,
      PaginationLast,
      PaginationEllipsis,
      PaginationSummary,
    } = await import("@/components/ui/pagination");

    expect(typeof Pagination).toBe("function");
    expect(typeof PaginationContent).toBe("function");
    expect(typeof PaginationItem).toBe("function");
    expect(typeof PaginationLink).toBe("function");
    expect(typeof PaginationPrevious).toBe("function");
    expect(typeof PaginationNext).toBe("function");
    expect(typeof PaginationFirst).toBe("function");
    expect(typeof PaginationLast).toBe("function");
    expect(typeof PaginationEllipsis).toBe("function");
    expect(typeof PaginationSummary).toBe("function");
  });
});
