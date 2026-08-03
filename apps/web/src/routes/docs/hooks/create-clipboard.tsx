// src/routes/docs/hooks/create-clipboard.tsx
import { createSignal } from "solid-js";
import { createClipboard } from "@nikala-ui/hooks";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";

const importCode = `import { createClipboard } from "@nikala-ui/hooks";`;

const basicUsageCode = `const { copied, copy, error } = createClipboard({ timeout: 2000 });

const handleCopy = () => {
  copy("npx @nikala-ui/cli init");
};

return (
  <Button onClick={handleCopy}>
    {copied() ? "Copied to Clipboard!" : "Copy Command"}
  </Button>
);`;

export function ClipboardDemo() {
  const { copied, copy } = createClipboard({ timeout: 2000 });
  const [text, setText] = createSignal("bun add @nikala-ui/hooks");

  return (
    <div class="space-y-4 max-w-sm w-full min-h-[160px] flex flex-col items-center justify-center">
      <div class="w-full flex items-center justify-between gap-2 p-2.5 rounded-lg border border-border bg-muted/40 font-mono text-xs">
        <span class="truncate text-muted-foreground">{text()}</span>
        <Button
          size="sm"
          variant={copied() ? "secondary" : "outline"}
          class="h-7 text-xs shrink-0"
          onClick={() => copy(text())}
        >
          {copied() ? "Copied!" : "Copy"}
        </Button>
      </div>
    </div>
  );
}

export default function CreateClipboardDocPage() {
  return (
    <>
      <Seo
        title="createClipboard Primitive"
        description="SolidJS reactive primitive for copying text to clipboard with automatic status reset."
        path="/docs/hooks/create-clipboard"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="createClipboard"
          badge="primitive"
          description="A reactive primitive for copying text strings to the user's system clipboard with automatic status reset and error handling."
        />

        {/* Live Interactive Hero Preview */}
        <ComponentPreview name="create-clipboard" code={basicUsageCode}>
          <ClipboardDemo />
        </ComponentPreview>

        {/* Import */}
        <div class="space-y-4">
          <DocSectionHeader title="Import" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        {/* Examples Section */}
        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          {/* Basic Usage */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Basic Usage</h3>
            <p class="text-sm text-muted-foreground">
              Call <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">copy(text)</code> to copy string data. The <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">copied()</code> signal automatically flips to <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">true</code> and resets after the specified timeout.
            </p>
            <CodeBlock code={basicUsageCode} lang="tsx" />
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="CreateClipboardOptions & Return"
            items={[
              {
                prop: "timeout",
                type: "number",
                default: "2000",
                description: "Duration in milliseconds before the copied signal automatically resets to false.",
              },
              {
                prop: "copy",
                type: "(text: string) => Promise<boolean>",
                default: "-",
                description: "Asynchronous function to copy text to system clipboard.",
                required: true,
              },
              {
                prop: "copied",
                type: "Accessor<boolean>",
                default: "false",
                description: "Signal accessor indicating whether text was recently copied.",
                required: true,
              },
              {
                prop: "error",
                type: "Accessor<Error | undefined>",
                default: "undefined",
                description: "Signal accessor containing any clipboard permission or write error.",
              },
            ]}
          />
        </div>

        {/* Footer Navigation */}
        <DocNextSteps
          prev={{ title: "createClickOutside Primitive", href: "/docs/hooks/create-click-outside" }}
          next={{ title: "Accordion Component", href: "/docs/components/accordion" }}
        />
      </div>
    </>
  );
}
