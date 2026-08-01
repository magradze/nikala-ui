import { describe, it, expect } from "vitest";
import { Seo } from "@/components/seo";
import { CodeBlock } from "@/components/code-block";
import { ComponentPreview } from "@/components/component-preview";
import { DocsSidebar } from "@/components/docs-sidebar";

describe("Core Components - Seo, CodeBlock, ComponentPreview & DocsSidebar", () => {
  it("should define Seo component function", () => {
    expect(typeof Seo).toBe("function");
  });

  it("should define CodeBlock component function", () => {
    expect(typeof CodeBlock).toBe("function");
  });

  it("should define ComponentPreview component function", () => {
    expect(typeof ComponentPreview).toBe("function");
  });

  it("should define DocsSidebar component function", () => {
    expect(typeof DocsSidebar).toBe("function");
  });
});
