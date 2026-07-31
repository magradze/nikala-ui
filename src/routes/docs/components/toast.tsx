import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";
import { showToast, ToastRegion, ToastList } from "@/components/ui/toast";

const importCode = `import { showToast, ToastRegion, ToastList } from "@/components/ui/toast";`;

const setupCode = `// Add ToastRegion to your root App layout (e.g., App.tsx or root layout)
export default function App() {
  return (
    <>
      <MainContent />
      <ToastRegion>
        <ToastList />
      </ToastRegion>
    </>
  );
}`;

const defaultCode = `showToast({
  title: "Event created",
  description: "Monday, January 3rd at 6:00pm",
});`;

const successCode = `showToast({
  title: "Changes saved",
  description: "Your profile preferences were updated successfully.",
  variant: "success",
});`;

const destructiveCode = `showToast({
  title: "Error occurred",
  description: "Could not connect to the remote database.",
  variant: "destructive",
});`;

export default function ToastDocsPage() {
  return (
    <>
      <Seo
        title="Toast Component"
        description="A succinct message displayed temporarily in a toast region for SolidJS and Tailwind CSS v4."
        path="/docs/components/toast"
      />

      {/* Global Toast Region for all examples on this docs page */}
      <ToastRegion>
        <ToastList />
      </ToastRegion>

      <div class="space-y-10 pb-16">
        <DocPageHeader
          title="Toast"
          badge="kobalte"
          description="A succinct message displayed temporarily in a toast region, built on Kobalte primitives."
        />

        <ComponentPreview name="toast" code={defaultCode}>
          <Button
            onClick={() =>
              showToast({
                title: "Event created",
                description: "Monday, January 3rd at 6:00pm",
              })
            }
          >
            Show Default Toast
          </Button>
        </ComponentPreview>

        <div class="space-y-4">
          <DocSectionHeader title="Usage" />
          <p class="text-sm text-muted-foreground">
            1. Import the toast trigger helper and layout provider components:
          </p>
          <CodeBlock code={importCode} lang="tsx" />

          <p class="text-sm text-muted-foreground pt-2">
            2. Place <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">&lt;ToastRegion&gt;&lt;ToastList /&gt;&lt;/ToastRegion&gt;</code> at your application root:
          </p>
          <CodeBlock code={setupCode} lang="tsx" />
        </div>

        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Success Variant</h3>
            <p class="text-sm text-muted-foreground">
              Pass <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">variant="success"</code> for positive feedback messages.
            </p>
            <ComponentPreview name="toast" code={successCode}>
              <Button
                variant="outline"
                onClick={() =>
                  showToast({
                    title: "Changes saved",
                    description: "Your profile preferences were updated successfully.",
                    variant: "success",
                  })
                }
              >
                Show Success Toast
              </Button>
            </ComponentPreview>
          </div>

          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Destructive Variant</h3>
            <p class="text-sm text-muted-foreground">
              Pass <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">variant="destructive"</code> for error and warning callouts.
            </p>
            <ComponentPreview name="toast" code={destructiveCode}>
              <Button
                variant="destructive"
                onClick={() =>
                  showToast({
                    title: "Error occurred",
                    description: "Could not connect to the remote database.",
                    variant: "destructive",
                  })
                }
              >
                Show Error Toast
              </Button>
            </ComponentPreview>
          </div>
        </div>

        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="showToast Options"
            items={[
              {
                prop: "title",
                type: "string",
                default: "undefined",
                description: "The primary bold title text announced in the notification.",
              },
              {
                prop: "description",
                type: "string",
                default: "undefined",
                description: "Optional secondary description text.",
              },
              {
                prop: "variant",
                type: '"default" | "success" | "destructive" | "warning" | "info"',
                default: '"default"',
                description: "Visual status style variant.",
              },
              {
                prop: "duration",
                type: "number",
                default: "5000",
                description: "Auto-dismiss duration in milliseconds.",
              },
            ]}
          />
        </div>

        <DocNextSteps
          prev={{ title: "Textarea Component", href: "/docs/components/textarea" }}
          next={{ title: "Tooltip Component", href: "/docs/components/tooltip" }}
        />
      </div>
    </>
  );
}