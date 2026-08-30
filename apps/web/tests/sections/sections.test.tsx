import { describe, it, expect } from "vitest";
import { Hero } from "@/components/sections/hero";
import { DashboardShowcase } from "@/components/sections/dashboard-showcase";
import { HooksShowcase } from "@/components/sections/hooks-showcase";
import { McpShowcase } from "@/components/sections/mcp-showcase";
import { Features } from "@/components/sections/features";
import { CtaSection } from "@/components/sections/cta";

describe("Homepage Modular Sections", () => {
  it("should define Hero section component as a function", () => {
    expect(typeof Hero).toBe("function");
  });

  it("should define DashboardShowcase section component as a function", () => {
    expect(typeof DashboardShowcase).toBe("function");
  });

  it("should define HooksShowcase section component as a function", () => {
    expect(typeof HooksShowcase).toBe("function");
  });

  it("should define McpShowcase section component as a function", () => {
    expect(typeof McpShowcase).toBe("function");
  });

  it("should define Features section component as a function", () => {
    expect(typeof Features).toBe("function");
  });

  it("should define CtaSection component as a function", () => {
    expect(typeof CtaSection).toBe("function");
  });
});
