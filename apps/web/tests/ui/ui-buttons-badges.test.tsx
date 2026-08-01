import { describe, it, expect } from "vitest";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { Kbd } from "@/components/ui/kbd";
import { Logo } from "@/components/ui/logo";

describe("UI Component - Button", () => {
  it("should be defined as a component function", () => {
    expect(typeof Button).toBe("function");
  });

  it("should compute cva variant classes correctly", () => {
    const defaultClasses = buttonVariants();
    expect(defaultClasses).toContain("inline-flex");
    expect(defaultClasses).toContain("bg-primary");

    const outlineClasses = buttonVariants({ variant: "outline", size: "sm" });
    expect(outlineClasses).toContain("border");
    expect(outlineClasses).toContain("h-8");
  });
});

describe("UI Component - Badge", () => {
  it("should be defined as a component function", () => {
    expect(typeof Badge).toBe("function");
  });

  it("should compute cva variant classes correctly", () => {
    const defaultClasses = badgeVariants();
    expect(defaultClasses).toContain("inline-flex");
    expect(defaultClasses).toContain("bg-primary");

    const secondaryClasses = badgeVariants({ variant: "secondary" });
    expect(secondaryClasses).toContain("bg-secondary");
  });
});

describe("UI Component - Kbd", () => {
  it("should be defined as a component function", () => {
    expect(typeof Kbd).toBe("function");
  });
});

describe("UI Component - Logo", () => {
  it("should be defined as a component function", () => {
    expect(typeof Logo).toBe("function");
  });
});
