import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Steps, Step } from "@/components/ui/steps";
import { PackageManagerTabs } from "@/components/ui/package-manager-tabs";

/* --- Code Snippets --- */
const importCode = `import { Steps, Step } from "@/components/ui/steps";`;

const defaultCode = `<Steps>
  <Step title="Initialize your project">
    <p>Run the initialization wizard to configure Tailwind CSS v4 and paths.</p>
    <PackageManagerTabs command="nikala init" />
  </Step>

  <Step title="Add UI components">
    <p>Choose any component from the registry and install it into your project.</p>
    <PackageManagerTabs command="nikala add button" />
  </Step>

  <Step title="Import and compose">
    <p>Import your components directly and enjoy fine-grained SolidJS reactivity.</p>
  </Step>
</Steps>`;

const horizontalCode = `<Steps orientation="horizontal">
  <Step variant="primary" title="Account">
    <p>Create username</p>
  </Step>

  <Step variant="primary" title="Profile">
    <p>Upload avatar</p>
  </Step>

  <Step variant="info" title="Billing">
    <p>Add payment</p>
  </Step>

  <Step title="Done">
    <p>Ready to go</p>
  </Step>
</Steps>`;

const variantsCode = `<Steps>
  <Step variant="primary" title="Step 1: Install Package">
    <p>Install the core package using your preferred package manager.</p>
  </Step>

  <Step variant="info" title="Step 2: Configure Plugins">
    <p>Add the Nikala UI Tailwind CSS plugin to your build pipeline.</p>
  </Step>

  <Step variant="success" title="Step 3: Verification">
    <p>All dependencies are verified and ready for production.</p>
  </Step>
</Steps>`;

export default function StepsDocsPage() {
  return (
    <>
      <Seo
        title="Steps Component"
        description="A versatile vertical and horizontal multi-step stepper container with connecting lines, color variants, and rounded-lg badges."
        path="/docs/components/steps"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="Steps"
          badge="compound"
          description="A multi-step stepper container supporting both vertical tutorial guides and horizontal wizard flows with connecting lines and color variants."
        />

        {/* Hero Live Preview */}
        <ComponentPreview name="steps" code={defaultCode}>
          <div class="w-full max-w-xl">
            <Steps>
              <Step title="Initialize your project">
                <p class="text-sm text-muted-foreground">
                  Run the initialization wizard to configure Tailwind CSS v4 and path aliases.
                </p>
                <PackageManagerTabs command="nikala init" />
              </Step>

              <Step title="Add UI components">
                <p class="text-sm text-muted-foreground">
                  Choose any component from the registry and install it into your project.
                </p>
                <PackageManagerTabs command="nikala add button" />
              </Step>

              <Step title="Import and compose">
                <p class="text-sm text-muted-foreground">
                  Import your components directly and enjoy fine-grained SolidJS reactivity with zero extra runtime.
                </p>
              </Step>
            </Steps>
          </div>
        </ComponentPreview>

        {/* Usage & Import */}
        <div class="space-y-4">
          <DocSectionHeader title="Usage" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        {/* Examples */}
        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          {/* Horizontal Stepper Layout */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Horizontal Wizard Stepper</h3>
            <p class="text-sm text-muted-foreground">
              Set <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">orientation="horizontal"</code> for multi-step onboarding, checkouts, and wizards.
            </p>
            <ComponentPreview name="steps" code={horizontalCode}>
              <div class="w-full py-4 px-2">
                <Steps orientation="horizontal">
                  <Step variant="primary" title="Account">
                    <p>Create credentials</p>
                  </Step>

                  <Step variant="primary" title="Profile">
                    <p>Upload avatar</p>
                  </Step>

                  <Step variant="info" title="Billing">
                    <p>Add payment info</p>
                  </Step>

                  <Step title="Complete">
                    <p>Ready to deploy</p>
                  </Step>
                </Steps>
              </div>
            </ComponentPreview>
          </div>

          {/* Color Variants */}
          <div class="space-y-3 pt-6">
            <h3 class="text-lg font-semibold tracking-tight">Color Variants</h3>
            <p class="text-sm text-muted-foreground">
              Customize the step badge color scheme with <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">primary</code>, <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">info</code>, <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">success</code>, <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">warning</code>, <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">danger</code>, or <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">purple</code>.
            </p>
            <ComponentPreview name="steps" code={variantsCode}>
              <div class="w-full max-w-xl">
                <Steps>
                  <Step variant="primary" title="Step 1: Install Package">
                    <p class="text-sm text-muted-foreground">
                      Install the core package using your preferred package manager.
                    </p>
                  </Step>

                  <Step variant="info" title="Step 2: Configure Plugins">
                    <p class="text-sm text-muted-foreground">
                      Add the Nikala UI Tailwind CSS plugin to your build pipeline.
                    </p>
                  </Step>

                  <Step variant="success" title="Step 3: Verification">
                    <p class="text-sm text-muted-foreground">
                      All dependencies are verified and ready for production.
                    </p>
                  </Step>
                </Steps>
              </div>
            </ComponentPreview>
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />
          <DocApiTable
            title="Steps"
            items={[
              {
                prop: "orientation",
                type: '"vertical" | "horizontal"',
                default: '"vertical"',
                description: "Layout direction of the steps and connecting lines.",
              },
              {
                prop: "variant",
                type: '"default" | "primary" | "info" | "success" | "warning" | "danger" | "purple"',
                default: '"default"',
                description: "Default color variant applied to all child steps in this container.",
              },
            ]}
          />
          <DocApiTable
            title="Step"
            items={[
              {
                prop: "title",
                type: "string",
                default: "undefined",
                description: "Step headline title displayed above the step content.",
              },
              {
                prop: "variant",
                type: '"default" | "primary" | "info" | "success" | "warning" | "danger" | "purple"',
                default: '"default"',
                description: "Color scheme variant for the individual step number badge.",
              },
              {
                prop: "step",
                type: "string | number | JSX.Element",
                default: "Auto CSS counter",
                description: "Custom step number, label, or icon to override the automatic counter.",
              },
            ]}
          />
        </div>

        {/* Next Steps */}
        <DocNextSteps
          prev={{ title: "Slider", href: "/docs/components/slider" }}
          next={{ title: "Tabs", href: "/docs/components/tabs" }}
        />
      </div>
    </>
  );
}
