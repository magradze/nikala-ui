import { describe, it, expect } from "vitest";
import { CliAddSection } from "@/components/docs/cli/cli-add-section";
import { CliDiffSection } from "@/components/docs/cli/cli-diff-section";
import { CliInitSection } from "@/components/docs/cli/cli-init-section";
import { CliSummary } from "@/components/docs/cli/cli-summary";
import { CliThemeSection } from "@/components/docs/cli/cli-theme-section";
import { CliValidateSection } from "@/components/docs/cli/cli-validate-section";
import { CliPmSwitcher } from "@/components/docs/cli/cli-pm-switcher";

describe("Docs CLI Section Components", () => {
  it("should define all CLI doc section components", () => {
    expect(typeof CliAddSection).toBe("function");
    expect(typeof CliDiffSection).toBe("function");
    expect(typeof CliInitSection).toBe("function");
    expect(typeof CliSummary).toBe("function");
    expect(typeof CliThemeSection).toBe("function");
    expect(typeof CliValidateSection).toBe("function");
    expect(typeof CliPmSwitcher).toBe("function");
  });
});
