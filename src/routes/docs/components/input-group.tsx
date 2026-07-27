// src/routes/docs/components/input-group.tsx
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Button } from "@/components/ui/button";
import { Search, Mail, Globe } from "lucide-solid";

/* --- Code Snippets --- */
const importCode = `import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group";`;

const defaultCode = `<InputGroup class="max-w-sm">
  <InputGroupAddon align="inline-start">
    <Search class="w-4 h-4 text-muted-foreground" />
  </InputGroupAddon>
  <InputGroupInput placeholder="Search components..." />
  <InputGroupAddon align="inline-end">
    <KbdGroup>
      <Kbd size="sm">⌘</Kbd>
      <Kbd size="sm">K</Kbd>
    </KbdGroup>
  </InputGroupAddon>
</InputGroup>`;

const urlCode = `<InputGroup class="max-w-sm">
  <InputGroupAddon align="inline-start" class="text-xs font-mono">
    https://
  </InputGroupAddon>
  <InputGroupInput placeholder="nikala.magradze.dev" />
  <InputGroupAddon align="inline-end">
    <Globe class="w-4 h-4 text-muted-foreground" />
  </InputGroupAddon>
</InputGroup>`;

const emailCode = `<InputGroup class="max-w-sm">
  <InputGroupAddon align="inline-start">
    <Mail class="w-4 h-4 text-muted-foreground" />
  </InputGroupAddon>
  <InputGroupInput placeholder="nikala@pirosmani.ge" />
</InputGroup>`;

const actionCode = `<InputGroup class="max-w-sm">
  <InputGroupInput placeholder="Enter promo code" />
  <InputGroupAddon align="inline-end">
    <Button size="sm" class="h-7 text-xs">
      Apply
    </Button>
  </InputGroupAddon>
</InputGroup>`;

export default function InputGroupDocsPage() {
  return (
    <>
      <Seo
        title="Input Group Component"
        description="Compound input wrapper for combining text inputs with prefix and suffix addons in SolidJS."
        path="/docs/components/input-group"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="Input Group"
          badge="Compound"
          description="A compound component wrapper for combining text inputs with search icons, URL prefixes, hotkey badges, and inline buttons."
        />

        {/* Hero Live Preview */}
        <ComponentPreview name="input-group" code={defaultCode}>
          <InputGroup class="w-full max-w-sm">
            <InputGroupAddon align="inline-start">
              <Search class="w-4 h-4 text-muted-foreground" />
            </InputGroupAddon>
            <InputGroupInput placeholder="Search components..." />
            <InputGroupAddon align="inline-end">
              <KbdGroup>
                <Kbd size="sm">⌘</Kbd>
                <Kbd size="sm">K</Kbd>
              </KbdGroup>
            </InputGroupAddon>
          </InputGroup>
        </ComponentPreview>

        {/* Usage & Import */}
        <div class="space-y-4">
          <DocSectionHeader title="Usage" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        {/* Examples */}
        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          {/* Email Prefix Icon */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">With Prefix Icon</h3>
            <p class="text-sm text-muted-foreground">
              Add leading icons using <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">InputGroupAddon align="inline-start"</code>.
            </p>
            <ComponentPreview name="input-group" code={emailCode}>
              <InputGroup class="w-full max-w-sm">
                <InputGroupAddon align="inline-start">
                  <Mail class="w-4 h-4 text-muted-foreground" />
                </InputGroupAddon>
                <InputGroupInput placeholder="nikala@pirosmani.ge" />
              </InputGroup>
            </ComponentPreview>
          </div>

          {/* URL Prefix */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">URL Domain Input</h3>
            <p class="text-sm text-muted-foreground">
              Combine static text prefixes and domain icons.
            </p>
            <ComponentPreview name="input-group" code={urlCode}>
              <InputGroup class="w-full max-w-sm">
                <InputGroupAddon align="inline-start" class="text-xs font-mono">
                  https://
                </InputGroupAddon>
                <InputGroupInput placeholder="nikala.magradze.dev" />
                <InputGroupAddon align="inline-end">
                  <Globe class="w-4 h-4 text-muted-foreground" />
                </InputGroupAddon>
              </InputGroup>
            </ComponentPreview>
          </div>

          {/* Action Button */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">With Inline Action Button</h3>
            <p class="text-sm text-muted-foreground">
              Embed compact action buttons inside <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">InputGroupAddon align="inline-end"</code>.
            </p>
            <ComponentPreview name="input-group" code={actionCode}>
              <InputGroup class="w-full max-w-sm">
                <InputGroupInput placeholder="Enter promo code" />
                <InputGroupAddon align="inline-end">
                  <Button size="sm" class="h-7 text-xs">
                    Apply
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </ComponentPreview>
          </div>
        </div>

        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="InputGroupAddon"
            items={[
              {
                prop: "align",
                type: '"inline-start" | "inline-end"',
                default: '"inline-start"',
                description: "Positions addon at the start (prefix) or end (suffix) of the input field.",
              },
            ]}
          />
        </div>

        {/* Footer Navigation */}
        <DocNextSteps
          prev={{ title: "Input Component", href: "/docs/components/input" }}
          next={{ title: "Kbd Component", href: "/docs/components/kbd" }}
        />
      </div>
    </>
  );
}