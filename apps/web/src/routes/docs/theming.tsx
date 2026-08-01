import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { ThemingArchitectureSection } from "@/components/docs/theming/theming-architecture-section";
import { ThemingPalettesSection } from "@/components/docs/theming/theming-palettes-section";
import { ThemingCliSection } from "@/components/docs/theming/theming-cli-section";
import { ThemingManagerSection } from "@/components/docs/theming/theming-manager-section";
import { ThemingHookSection } from "@/components/docs/theming/theming-hook-section";
import { ThemingTokensSection } from "@/components/docs/theming/theming-tokens-section";

export default function ThemingDocsPage() {
  return (
    <>
      <Seo
        title="Theming Guide"
        description="Complete technical specifications for configuring, switching, and dynamically customizing themes and accent colors."
        path="/docs/theming"
      />

      <div class="space-y-10 pb-16">
        <DocPageHeader
          title="Theming & Color System"
          badge="Design Engine"
          description="A semantic, CSS-variable-driven theming architecture designed natively for Tailwind CSS v4."
        />

        <ThemingArchitectureSection />
        <ThemingPalettesSection />
        <ThemingCliSection />
        <ThemingManagerSection />
        <ThemingHookSection />
        <ThemingTokensSection />

        <DocNextSteps
          prev={{ title: "CLI Reference Guide", href: "/docs/cli" }}
          next={{ title: "Accordion Component", href: "/docs/components/accordion" }}
        />
      </div>
    </>
  );
}