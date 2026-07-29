import { describe, it, expect } from "vitest";
import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { Showcase } from "@/components/sections/showcase";

describe("Sections - Hero, Features & Showcase", () => {
  it("should define Hero section component as a function", () => {
    expect(typeof Hero).toBe("function");
  });

  it("should define Features section component as a function", () => {
    expect(typeof Features).toBe("function");
  });

  it("should define Showcase section component as a function", () => {
    expect(typeof Showcase).toBe("function");
  });
});
