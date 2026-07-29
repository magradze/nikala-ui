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
