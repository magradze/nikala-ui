import { describe, it, expect } from "vitest";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocCallout } from "@/components/docs/doc-callout";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { IntroPirosmaniCallout } from "@/components/docs/intro/intro-pirosmani-callout";
import { IntroOverviewSection } from "@/components/docs/intro/intro-overview-section";
import { IntroPhilosophySection } from "@/components/docs/intro/intro-philosophy-section";
import { IntroQuickstartSection } from "@/components/docs/intro/intro-quickstart-section";

describe("Docs General & Intro Components", () => {
  it("should define general doc header, callout, and table components", () => {
    expect(typeof DocPageHeader).toBe("function");
    expect(typeof DocSectionHeader).toBe("function");
    expect(typeof DocCallout).toBe("function");
    expect(typeof DocNextSteps).toBe("function");
    expect(typeof DocApiTable).toBe("function");
  });

  it("should define intro section components", () => {
    expect(typeof IntroPirosmaniCallout).toBe("function");
    expect(typeof IntroOverviewSection).toBe("function");
    expect(typeof IntroPhilosophySection).toBe("function");
    expect(typeof IntroQuickstartSection).toBe("function");
  });
});
