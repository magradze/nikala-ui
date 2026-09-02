import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { PackageManagerTabs } from "@/components/ui/package-manager-tabs";

/* --- Code Snippets --- */
const importCode = `import { PackageManagerTabs } from "@/components/ui/package-manager-tabs";`;

const defaultCode = `<PackageManagerTabs
  command="add @nikala-ui/core"
/>`;

const customManagersCode = `<PackageManagerTabs
  managers={["bunx", "npx", "pnpm", "yarn"]}
  command="add button"
/>`;

const createCode = `<PackageManagerTabs
  managers={["bun", "pnpm", "npm", "yarn"]}
  command="create @nikala-ui/docs my-project"
/>`;

const explicitCommandsCode = `<PackageManagerTabs
  managers={["bun", "pnpm", "npm", "deno"]}
  commands={{
    bun: "bun run dev --port 3000",
    pnpm: "pnpm dev --port 3000",
    npm: "npm run dev -- --port 3000",
    deno: "deno task dev --port 3000",
  }}
/>`;

export default function PackageManagerTabsDocsPage() {
  return (
    <>
      <Seo
        title="Package Manager Tabs Component"
        description="Interactive command tab bar supporting customizable package managers (bun, pnpm, npm, yarn, deno, bunx, npx) with copy functionality."
        path="/docs/components/package-manager-tabs"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="Package Manager Tabs"
          badge="ui"
          description="Displays an interactive CLI command box with customizable package manager tabs and one-click copy to clipboard."
        />

        {/* Hero Live Preview */}
        <ComponentPreview name="package-manager-tabs" code={defaultCode}>
          <div class="w-full max-w-xl">
            <PackageManagerTabs command="add @nikala-ui/core" />
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

          {/* Custom Managers */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Custom Managers List</h3>
            <p class="text-sm text-muted-foreground">
              Pass any custom list of managers via the <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">managers</code> prop (e.g. <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">["bunx", "npx", "pnpm", "yarn"]</code>).
            </p>
            <ComponentPreview name="package-manager-tabs" code={customManagersCode}>
              <div class="w-full max-w-xl">
                <PackageManagerTabs
                  managers={["bunx", "npx", "pnpm", "yarn"]}
                  command="add button"
                />
              </div>
            </ComponentPreview>
          </div>

          {/* Project Scaffolding (Create) */}
          <div class="space-y-3 pt-6">
            <h3 class="text-lg font-semibold tracking-tight">Project Creation Commands</h3>
            <p class="text-sm text-muted-foreground">
              Automatically transforms <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">create &lt;template&gt;</code> commands across managers.
            </p>
            <ComponentPreview name="package-manager-tabs" code={createCode}>
              <div class="w-full max-w-xl">
                <PackageManagerTabs
                  managers={["bun", "pnpm", "npm", "yarn"]}
                  command="create @nikala-ui/docs my-project"
                />
              </div>
            </ComponentPreview>
          </div>

          {/* Explicit Custom Commands */}
          <div class="space-y-3 pt-6">
            <h3 class="text-lg font-semibold tracking-tight">Explicit Custom Commands</h3>
            <p class="text-sm text-muted-foreground">
              Provide exact commands for each manager using the <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">commands</code> map prop.
            </p>
            <ComponentPreview name="package-manager-tabs" code={explicitCommandsCode}>
              <div class="w-full max-w-xl">
                <PackageManagerTabs
                  managers={["bun", "pnpm", "npm", "deno"]}
                  commands={{
                    bun: "bun run dev --port 3000",
                    pnpm: "pnpm dev --port 3000",
                    npm: "npm run dev -- --port 3000",
                    deno: "deno task dev --port 3000",
                  }}
                />
              </div>
            </ComponentPreview>
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />
          <DocApiTable
            title="PackageManagerTabs"
            items={[
              {
                prop: "managers",
                type: "string[]",
                default: '["bun", "pnpm", "npm", "yarn"]',
                description: "List of package managers to show in the switcher tabs.",
              },
              {
                prop: "command",
                type: "string",
                default: "undefined",
                description: "Single command string template automatically transformed per manager.",
              },
              {
                prop: "commands",
                type: "Record<string, string>",
                default: "undefined",
                description: "Explicit map of custom commands for specific managers.",
              },
              {
                prop: "defaultValue",
                type: "string",
                default: "First manager in list",
                description: "Initial selected package manager (uncontrolled).",
              },
              {
                prop: "value",
                type: "string",
                default: "undefined",
                description: "Active selected package manager (controlled).",
              },
              {
                prop: "onChange",
                type: "(manager: string) => void",
                default: "undefined",
                description: "Callback fired when the user selects a different package manager tab.",
              },
              {
                prop: "copyable",
                type: "boolean",
                default: "true",
                description: "Whether the copy button is displayed in the header bar.",
              },
            ]}
          />
        </div>

        {/* Next Steps */}
        <DocNextSteps
          prev={{ title: "Navigation Menu", href: "/docs/components/navigation-menu" }}
          next={{ title: "Pagination", href: "/docs/components/pagination" }}
        />
      </div>
    </>
  );
}
