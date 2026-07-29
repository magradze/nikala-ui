import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { CliSummary } from "@/components/docs/cli/cli-summary";
import { CliInitSection } from "@/components/docs/cli/cli-init-section";
import { CliAddSection } from "@/components/docs/cli/cli-add-section";
import { CliValidateSection } from "@/components/docs/cli/cli-validate-section";
import { CliDiffSection } from "@/components/docs/cli/cli-diff-section";
import { CliThemeSection } from "@/components/docs/cli/cli-theme-section";
import { CliPmSwitcher } from "@/components/docs/cli/cli-pm-switcher";

export default function CliDocsPage() {
  return (
    <>
      <Seo
        title="CLI Reference"
        description="Comprehensive CLI guide for initializing Nikala UI, adding components, validating workspace health, and customizing themes."
        path="/docs/cli"
      />

      <div class="space-y-10 pb-16">
        <DocPageHeader
          title="CLI Reference"
          badge="CLI Tool"
          description="Command line interface guide for initializing projects, managing components, inspecting diffs, and setting up theme palettes."
        />

        <CliPmSwitcher />

        <CliSummary />
        <CliInitSection />
        <CliAddSection />
        <CliValidateSection />
        <CliDiffSection />
        <CliThemeSection />

        {/* Page Footer Navigation */}
        <DocNextSteps
          prev={{ title: "Introduction", href: "/docs" }}
          next={{ title: "Theming Guide", href: "/docs/theming" }}
        />
      </div>
    </>
  );
}