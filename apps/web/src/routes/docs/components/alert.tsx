import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Terminal, CircleCheck, Info, TriangleAlert, CircleAlert } from "lucide-solid";

/* --- Code Snippets --- */
const importCode = `import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";`;

const defaultCode = `<Alert class="max-w-md">
  <Terminal class="h-4 w-4" />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components to your app using the nikala CLI tool.
  </AlertDescription>
</Alert>`;

const variantsCode = `<div class="flex flex-col gap-4 max-w-md w-full">
  <Alert variant="default">
    <Info class="h-4 w-4" />
    <AlertTitle>Default Alert</AlertTitle>
    <AlertDescription>Standard system notification banner.</AlertDescription>
  </Alert>

  <Alert variant="info">
    <Info class="h-4 w-4" />
    <AlertTitle>Information</AlertTitle>
    <AlertDescription>New update available for installation.</AlertDescription>
  </Alert>

  <Alert variant="success">
    <CheckCircle class="h-4 w-4" />
    <AlertTitle>Success</AlertTitle>
    <AlertDescription>Component added to your project successfully.</AlertDescription>
  </Alert>

  <Alert variant="warning">
    <AlertTriangle class="h-4 w-4" />
    <AlertTitle>Warning</AlertTitle>
    <AlertDescription>Your session is about to expire in 5 minutes.</AlertDescription>
  </Alert>

  <Alert variant="destructive">
    <AlertCircle class="h-4 w-4" />
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
  </Alert>
</div>`;

const closableCode = `<Alert variant="warning" closable={true} class="max-w-md">
  <AlertTriangle class="h-4 w-4" />
  <AlertTitle>Dismissible Alert</AlertTitle>
  <AlertDescription>
    Click the X button on the top right to dismiss this banner.
  </AlertDescription>
</Alert>`;

export default function AlertDocsPage() {
  return (
    <>
      <Seo
        title="Alert Component"
        description="Callout banner for user feedback with status variants, dismiss button, and timer."
        path="/docs/components/alert"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="Alert"
          badge="cva"
          description="Displays a callout banner for user feedback with status color variants, dismiss button, and auto-dismiss timer."
        />

        {/* Hero Live Preview */}
        <ComponentPreview name="alert" code={defaultCode}>
          <div class="w-full max-w-md">
            <Alert>
              <Terminal class="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                You can add components to your app using the nikala CLI tool.
              </AlertDescription>
            </Alert>
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

          {/* Status Variants */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Variants</h3>
            <p class="text-sm text-muted-foreground">
              Supports <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">default</code>, <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">info</code>, <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">success</code>, <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">warning</code>, and <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">destructive</code> styles.
            </p>
            <ComponentPreview name="alert" code={variantsCode}>
              <div class="flex flex-col gap-4 max-w-md w-full">
                <Alert variant="default">
                  <Info class="h-4 w-4" />
                  <AlertTitle>Default Alert</AlertTitle>
                  <AlertDescription>Standard system notification banner.</AlertDescription>
                </Alert>

                <Alert variant="info">
                  <Info class="h-4 w-4" />
                  <AlertTitle>Information</AlertTitle>
                  <AlertDescription>New update available for installation.</AlertDescription>
                </Alert>

                <Alert variant="success">
                  <CircleCheck class="h-4 w-4" />
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>Component added to your project successfully.</AlertDescription>
                </Alert>

                <Alert variant="warning">
                  <TriangleAlert class="h-4 w-4" />
                  <AlertTitle>Warning</AlertTitle>
                  <AlertDescription>Your session is about to expire in 5 minutes.</AlertDescription>
                </Alert>

                <Alert variant="destructive">
                  <CircleAlert class="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
                </Alert>
              </div>
            </ComponentPreview>
          </div>

          {/* Closable Alert */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Closable / Dismissible</h3>
            <p class="text-sm text-muted-foreground">
              Pass <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">closable={`{true}`}</code> to render an interactive close button.
            </p>
            <ComponentPreview name="alert" code={closableCode}>
              <div class="w-full max-w-md">
                <Alert variant="warning" closable={true}>
                  <TriangleAlert class="h-4 w-4" />
                  <AlertTitle>Dismissible Alert</AlertTitle>
                  <AlertDescription>
                    Click the X button on the top right to dismiss this banner.
                  </AlertDescription>
                </Alert>
              </div>
            </ComponentPreview>
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="Alert"
            items={[
              {
                prop: "variant",
                type: '"default" | "info" | "success" | "warning" | "destructive"',
                default: '"default"',
                description: "Visual style variant and status color theme.",
              },
              {
                prop: "closable",
                type: "boolean",
                default: "false",
                description: "Displays an interactive top-right X close button.",
              },
              {
                prop: "duration",
                type: "number",
                default: "-",
                description: "Auto-dismiss timer duration in milliseconds.",
              },
              {
                prop: "onClose",
                type: "() => void",
                default: "-",
                description: "Callback function fired when the alert is dismissed.",
              },
            ]}
          />
        </div>

        {/* Footer Navigation */}
        <DocNextSteps
          prev={{ title: "Accordion Component", href: "/docs/components/accordion" }}
          next={{ title: "Avatar Component", href: "/docs/components/avatar" }}
        />
      </div>
    </>
  );
}