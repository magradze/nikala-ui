// src/routes/docs/components/banner.tsx
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Banner } from "@/components/ui/banner";
import { AlertCircle } from "lucide-solid";


/* --- Code Snippets --- */
const importCode = `import { Banner } from "@/components/ui/banner";`;

const defaultCode = `<Banner
  variant="warning"
  dismissible={true}
  link="https://https://github.com/nikala-ui/ui"
  linkText="GitHub"
>
  Website is under active construction. Some pages and components are in preview mode.
</Banner>`;

const variantsCode = `<Banner variant="default">Default announcement banner</Banner>
<Banner variant="info">Informational update banner</Banner>
<Banner variant="success">Operation completed successfully!</Banner>
<Banner variant="warning">Warning: Unsaved changes ahead</Banner>
<Banner variant="destructive">Critical system alert</Banner>
<Banner variant="pirosmani">Nikala Pirosmani signature Qvevri wine accent</Banner>`;

const linkCode = `<Banner
  variant="info"
  link="https://https://github.com/nikala-ui/ui"
  linkText="View on GitHub"
>
  Check out the official Nikala UI open-source repository.
</Banner>`;

const customIconCode = `<Banner
  variant="destructive"
  icon={AlertCircle}
>
  High priority security patch required. Please update immediately.
</Banner>`;

const nonDismissibleCode = `<Banner variant="pirosmani" dismissible={false}>
  Persistent header message that cannot be closed by user.
</Banner>`;

export default function BannerDocsPage() {
  return (
    <>
      <Seo
        title="Banner Component"
        description="An announcement banner with sticky positioning, dismissal persistence, auto-hide timer, Lucide icons, and variant styles."
        path="/docs/components/banner"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="Banner"
          badge="cva"
          description="An announcement bar for sticky top notifications, updates, and dismissible banners with localStorage memory."
        />

        {/* Hero Live Preview */}
        <ComponentPreview name="banner" code={defaultCode}>
          <div class="w-full">
            <Banner
              variant="warning"
              dismissible={true}
              link="https://https://github.com/nikala-ui/ui"
              linkText="GitHub"
            >
              Website is under active construction. Some pages and components are in preview mode.
            </Banner>
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

          {/* Color Variants */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Variants</h3>
            <p class="text-sm text-muted-foreground">
              Supports default, info, success, warning, destructive, and Pirosmani signature wine variants.
            </p>
            <ComponentPreview name="banner" code={variantsCode}>
              <div class="flex flex-col gap-3 w-full">
                <Banner variant="default" dismissible={false}>Default announcement banner</Banner>
                <Banner variant="info" dismissible={false}>Informational update banner</Banner>
                <Banner variant="success" dismissible={false}>Operation completed successfully!</Banner>
                <Banner variant="warning" dismissible={false}>Warning: Unsaved changes ahead</Banner>
                <Banner variant="destructive" dismissible={false}>Critical system alert</Banner>
                <Banner variant="pirosmani" dismissible={false}>Nikala Pirosmani signature Qvevri wine accent</Banner>
              </div>
            </ComponentPreview>
          </div>

          {/* Action Link */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">With Action Link</h3>
            <p class="text-sm text-muted-foreground">
              Pass <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">link</code> and <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">linkText</code> props to attach an anchor link.
            </p>
            <ComponentPreview name="banner" code={linkCode}>
              <div class="w-full">
                <Banner
                  variant="info"
                  dismissible={false}
                  link="https://github.com/nikala-ui/ui"
                  linkText="View on GitHub"
                >
                  Check out the official Nikala UI open-source repository.
                </Banner>
              </div>
            </ComponentPreview>
          </div>

          {/* Custom Icon */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Custom Icon</h3>
            <p class="text-sm text-muted-foreground">
              Pass a Lucide icon component via <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">icon</code> prop.
            </p>
            <ComponentPreview name="banner" code={customIconCode}>
              <div class="w-full">
                <Banner
                  variant="destructive"
                  dismissible={false}
                  icon={AlertCircle}
                >
                  High priority security patch required. Please update immediately.
                </Banner>
              </div>
            </ComponentPreview>
          </div>

          {/* Non-Dismissible */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Non-Dismissible</h3>
            <p class="text-sm text-muted-foreground">
              Set <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">dismissible={`{false}`}</code> to hide the close button.
            </p>
            <ComponentPreview name="banner" code={nonDismissibleCode}>
              <div class="w-full">
                <Banner variant="pirosmani" dismissible={false}>
                  Persistent header message that cannot be closed by user.
                </Banner>
              </div>
            </ComponentPreview>
          </div>
        </div>

        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="Banner"
            items={[
              {
                prop: "variant",
                type: '"default" | "warning" | "info" | "success" | "destructive" | "pirosmani"',
                default: '"default"',
                description: "Color theme and visual alert state variant.",
              },
              {
                prop: "sticky",
                type: "boolean",
                default: "false",
                description: "Pins the banner sticky to the top of the viewport.",
              },
              {
                prop: "dismissible",
                type: "boolean",
                default: "true",
                description: "Shows or hides the trailing X close button.",
              },
              {
                prop: "storageKey",
                type: "string",
                default: "-",
                description: "LocalStorage key namespace to remember user dismissal across page refreshes.",
              },
              {
                prop: "autoHideDelay",
                type: "number",
                default: "-",
                description: "Time in milliseconds before auto-closing the banner.",
              },
              {
                prop: "showIcon",
                type: "boolean",
                default: "true",
                description: "Toggles rendering of the leading icon.",
              },
              {
                prop: "icon",
                type: "Component<{ class?: string }>",
                default: "-",
                description: "Custom Lucide icon component reference.",
              },
              {
                prop: "link",
                type: "string",
                default: "-",
                description: "Target URL for the optional inline action link.",
              },
              {
                prop: "linkText",
                type: "string",
                default: '"Learn more"',
                description: "Anchor link text label.",
              },
              {
                prop: "onDismiss",
                type: "() => void",
                default: "-",
                description: "Callback triggered when the banner is closed.",
              },
            ]}
          />
        </div>

        {/* Footer Navigation */}
        <DocNextSteps
          prev={{ title: "Badge Component", href: "/docs/components/badge" }}
          next={{ title: "Breadcrumb Component", href: "/docs/components/breadcrumb" }}
        />
      </div>
    </>
  );
}