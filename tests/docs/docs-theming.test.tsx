import { describe, it, expect } from "vitest";
import { ThemingArchitectureSection } from "@/components/docs/theming/theming-architecture-section";
import { ThemingPalettesSection } from "@/components/docs/theming/theming-palettes-section";
import { ThemingCliSection } from "@/components/docs/theming/theming-cli-section";
import { ThemingManagerSection } from "@/components/docs/theming/theming-manager-section";
import { ThemingHookSection } from "@/components/docs/theming/theming-hook-section";
import { ThemingTokensSection } from "@/components/docs/theming/theming-tokens-section";

describe("Docs Theming Section Components", () => {
  it("should define all theming doc components", () => {
    expect(typeof ThemingArchitectureSection).toBe("function");
    expect(typeof ThemingPalettesSection).toBe("function");
    expect(typeof ThemingCliSection).toBe("function");
    expect(typeof ThemingManagerSection).toBe("function");
    expect(typeof ThemingHookSection).toBe("function");
    expect(typeof ThemingTokensSection).toBe("function");
  });
});
