// src/routes/docs/index.tsx
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { IntroPirosmaniCallout } from "@/components/docs/intro/intro-pirosmani-callout";
import { IntroOverviewSection } from "@/components/docs/intro/intro-overview-section";
import { IntroPhilosophySection } from "@/components/docs/intro/intro-philosophy-section";
import { IntroQuickstartSection } from "@/components/docs/intro/intro-quickstart-section";

export default function IntroductionPage() {
  return (
    <>
      <Seo
        title="Introduction"
        description="A simple, copy-paste component system for SolidJS built natively for Tailwind CSS v4."
        path="/docs"
      />

      <div class="space-y-10 pb-16">
        <DocPageHeader
          title="Introduction"
          badge="v0.11.0"
          description="Re-imagining component systems for SolidJS and Tailwind CSS v4."
        />

        <IntroPirosmaniCallout />
        <IntroOverviewSection />
        <IntroPhilosophySection />
        <IntroQuickstartSection />

        <DocNextSteps
          next={{ title: "CLI Reference Guide", href: "/docs/cli" }}
        />
      </div>
    </>
  );
}
