import { describe, it, expect } from "vitest";
import { Footer } from "@/components/partials/footer";
import { Header } from "@/components/partials/header";
import { MobileNav } from "@/components/partials/mobile-nav";

describe("Partials - Footer, Header & MobileNav", () => {
  it("should define Footer component as a function", () => {
    expect(typeof Footer).toBe("function");
  });

  it("should define Header component as a function", () => {
    expect(typeof Header).toBe("function");
  });

  it("should define MobileNav component as a function", () => {
    expect(typeof MobileNav).toBe("function");
  });
});
