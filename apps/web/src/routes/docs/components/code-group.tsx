import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import {
  CodeGroup,
  CodeGroupList,
  CodeGroupTrigger,
  CodeGroupContent,
} from "@/components/ui/code-group";

/* --- Code Snippets --- */
const importCode = `import {
  CodeGroup,
  CodeGroupList,
  CodeGroupTrigger,
  CodeGroupContent,
} from "@/components/ui/code-group";`;

const defaultCode = `<CodeGroup defaultValue="App.tsx">
  <CodeGroupList>
    <CodeGroupTrigger value="App.tsx">App.tsx</CodeGroupTrigger>
    <CodeGroupTrigger value="styles.css">styles.css</CodeGroupTrigger>
    <CodeGroupTrigger value="package.json">package.json</CodeGroupTrigger>
  </CodeGroupList>

  <CodeGroupContent value="App.tsx">
    <pre><code>import { Button } from "@/components/ui/button";

export default function App() {
  return &lt;Button&gt;Click me&lt;/Button&gt;;
}</code></pre>
  </CodeGroupContent>

  <CodeGroupContent value="styles.css">
    <pre><code>@import "tailwindcss";

body {
  @apply bg-background text-foreground;
}</code></pre>
  </CodeGroupContent>

  <CodeGroupContent value="package.json">
    <pre><code>{
  "name": "my-app",
  "dependencies": {
    "@nikala-ui/core": "latest"
  }
}</code></pre>
  </CodeGroupContent>
</CodeGroup>`;

export default function CodeGroupDocsPage() {
  return (
    <>
      <Seo
        title="Code Group Component"
        description="Tabbed multi-file code snippet container built directly on Nikala UI Tabs primitives."
        path="/docs/components/code-group"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="Code Group"
          badge="compound"
          description="A tabbed code container for organizing multiple files, languages, and snippets in documentation, built directly on Nikala UI Tabs primitives."
        />

        {/* Hero Live Preview */}
        <ComponentPreview name="code-group" code={defaultCode}>
          <div class="w-full max-w-xl">
            <CodeGroup defaultValue="App.tsx">
              <CodeGroupList>
                <CodeGroupTrigger value="App.tsx">App.tsx</CodeGroupTrigger>
                <CodeGroupTrigger value="styles.css">styles.css</CodeGroupTrigger>
                <CodeGroupTrigger value="package.json">package.json</CodeGroupTrigger>
              </CodeGroupList>

              <CodeGroupContent value="App.tsx">
                <pre class="font-mono text-[13px]">
                  <code>
                    <span class="text-purple-600 dark:text-purple-400 font-medium">import</span> {"{ Button }"} <span class="text-purple-600 dark:text-purple-400 font-medium">from</span> <span class="text-emerald-600 dark:text-emerald-400">"@/components/ui/button"</span>;
                    {"\n\n"}
                    <span class="text-purple-600 dark:text-purple-400 font-medium">export default function</span> <span class="text-blue-600 dark:text-blue-400">App</span>() {"{"}
                    {"\n  "}<span class="text-purple-600 dark:text-purple-400 font-medium">return</span> &lt;<span class="text-amber-600 dark:text-amber-400">Button</span>&gt;Click me&lt;/<span class="text-amber-600 dark:text-amber-400">Button</span>&gt;;
                    {"\n}"}
                  </code>
                </pre>
              </CodeGroupContent>

              <CodeGroupContent value="styles.css">
                <pre class="font-mono text-[13px]">
                  <code>
                    <span class="text-purple-600 dark:text-purple-400 font-medium">@import</span> <span class="text-emerald-600 dark:text-emerald-400">"tailwindcss"</span>;
                    {"\n\n"}
                    <span class="text-amber-600 dark:text-amber-400">body</span> {"{"}
                    {"\n  "}<span class="text-purple-600 dark:text-purple-400">@apply</span> bg-background text-foreground;
                    {"\n}"}
                  </code>
                </pre>
              </CodeGroupContent>

              <CodeGroupContent value="package.json">
                <pre class="font-mono text-[13px]">
                  <code>
                    {"{\n  "}
                    <span class="text-sky-500 font-medium">"name"</span>: <span class="text-emerald-600 dark:text-emerald-400">"my-app"</span>,
                    {"\n  "}
                    <span class="text-sky-500 font-medium">"dependencies"</span>: {"{\n    "}
                    <span class="text-sky-500 font-medium">"@nikala-ui/core"</span>: <span class="text-emerald-600 dark:text-emerald-400">"latest"</span>
                    {"\n  }\n}"}
                  </code>
                </pre>
              </CodeGroupContent>
            </CodeGroup>
          </div>
        </ComponentPreview>

        {/* Usage & Import */}
        <div class="space-y-4">
          <DocSectionHeader title="Usage" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />
          <DocApiTable
            title="CodeGroup"
            items={[
              {
                prop: "defaultValue",
                type: "string",
                default: "undefined",
                description: "Initial active tab value (uncontrolled).",
              },
              {
                prop: "value",
                type: "string",
                default: "undefined",
                description: "Current active tab value (controlled).",
              },
              {
                prop: "onChange",
                type: "(value: string) => void",
                default: "undefined",
                description: "Callback fired when the active tab is switched.",
              },
            ]}
          />
        </div>

        {/* Next Steps */}
        <DocNextSteps
          prev={{ title: "Code Block", href: "/docs/components/code-block" }}
          next={{ title: "Package Manager Tabs", href: "/docs/components/package-manager-tabs" }}
        />
      </div>
    </>
  );
}
