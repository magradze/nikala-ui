import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock as DocCodeBlock } from "@/components/code-block";

/* --- Code Snippets --- */
const importCode = `import { CodeBlock } from "@/components/ui/code-block";`;

const defaultCode = `<CodeBlock
  code="bunx @nikala-ui/cli add button"
  isCli={true}
/>`;

const filenameCode = `<CodeBlock
  filename="App.tsx"
  lang="tsx"
  code={\`import { createSignal } from "solid-js";
import { Button } from "@/components/ui/button";

export default function App() {
  const [count, setCount] = createSignal(0);
  return <Button onClick={() => setCount(c => c + 1)}>Count: {count()}</Button>;
}\`}
/>`;

const floatingCopyCode = `<CodeBlock
  lang="javascript"
  code="const greeting = 'Hello, Nikala UI!';\\nconsole.log(greeting);"
/>`;

export default function CodeBlockDocsPage() {
  return (
    <>
      <Seo
        title="Code Block Component"
        description="A code block container with filename header, language badge, and interactive copy to clipboard button."
        path="/docs/components/code-block"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="Code Block"
          badge="ui"
          description="A structured code block container with filename header, language indicator, and interactive copy to clipboard button."
        />

        {/* Hero Live Preview */}
        <ComponentPreview name="code-block" code={defaultCode}>
          <div class="w-full max-w-xl">
            <DocCodeBlock
              code="bunx @nikala-ui/cli add button"
              lang="bash"
              isCli={true}
            />
          </div>
        </ComponentPreview>

        {/* Usage & Import */}
        <div class="space-y-4">
          <DocSectionHeader title="Usage" />
          <DocCodeBlock code={importCode} lang="tsx" />
        </div>

        {/* Examples */}
        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          {/* With Filename & Language */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">With Filename & Language</h3>
            <p class="text-sm text-muted-foreground">
              Displays a top header bar with the filename and language indicator.
            </p>
            <ComponentPreview name="code-block" code={filenameCode}>
              <div class="w-full max-w-xl">
                <DocCodeBlock
                  lang="tsx"
                  code={`import { createSignal } from "solid-js";
import { Button } from "@/components/ui/button";

export default function App() {
  const [count, setCount] = createSignal(0);
  return <Button onClick={() => setCount(c => c + 1)}>Count: {count()}</Button>;
}`}
                />
              </div>
            </ComponentPreview>
          </div>

          {/* Floating Copy Button */}
          <div class="space-y-3 pt-6">
            <h3 class="text-lg font-semibold tracking-tight">Floating Copy Button</h3>
            <p class="text-sm text-muted-foreground">
              When no header bar is displayed, the copy button smoothly floats in on hover.
            </p>
            <ComponentPreview name="code-block" code={floatingCopyCode}>
              <div class="w-full max-w-xl">
                <DocCodeBlock
                  lang="javascript"
                  code={`const greeting = 'Hello, Nikala UI!';
console.log(greeting);`}
                />
              </div>
            </ComponentPreview>
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />
          <DocApiTable
            title="CodeBlock"
            items={[
              {
                prop: "code",
                type: "string",
                default: "undefined",
                description: "The raw source code text to display and copy to the clipboard.",
              },
              {
                prop: "filename",
                type: "string",
                default: "undefined",
                description: "Optional file name displayed in the top header bar (e.g. 'App.tsx').",
              },
              {
                prop: "language",
                type: "string",
                default: "undefined",
                description: "Optional language label badge (e.g. 'tsx', 'rust', 'bash').",
              },
              {
                prop: "copyable",
                type: "boolean",
                default: "true",
                description: "Whether the interactive copy to clipboard button is enabled.",
              },
            ]}
          />
        </div>

        {/* Next Steps */}
        <DocNextSteps
          prev={{ title: "Card", href: "/docs/components/card" }}
          next={{ title: "Checkbox", href: "/docs/components/checkbox" }}
        />
      </div>
    </>
  );
}
