import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { formatCliCmd } from "@/lib/cli-formatter";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-solid";
import { createSignal } from "solid-js";

/* --- Code Snippets --- */
const importCode = `import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";`;

const heroCode = `<Collapsible class="w-full max-w-sm space-y-2 border border-border p-4 rounded-lg bg-card text-card-foreground">
  <div class="flex items-center justify-between gap-4">
    <h4 class="text-sm font-semibold">@magradze starred 3 repositories</h4>
    <CollapsibleTrigger class="h-8 w-8 inline-flex items-center justify-center rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors shrink-0">
      <ChevronsUpDown class="h-4 w-4" />
    </CollapsibleTrigger>
  </div>

  <div class="rounded-md border border-border px-4 py-2 font-mono text-sm shadow-2xs bg-muted/30">
    @nikala-ui/ui
  </div>

  <CollapsibleContent class="space-y-2">
    <div class="rounded-md border border-border px-4 py-2 font-mono text-sm shadow-2xs bg-muted/30">
      solid-js/solid
    </div>
    <div class="rounded-md border border-border px-4 py-2 font-mono text-sm shadow-2xs bg-muted/30">
      tailwindlabs/tailwindcss
    </div>
  </CollapsibleContent>
</Collapsible>`;

const defaultOpenCode = `<Collapsible defaultOpen={true} class="w-full max-w-sm space-y-2 border border-border p-4 rounded-lg">
  <div class="flex items-center justify-between">
    <span class="text-sm font-medium">Developer Settings</span>
    <CollapsibleTrigger class="h-8 w-8 inline-flex items-center justify-center rounded-md hover:bg-accent">
      <ChevronsUpDown class="h-4 w-4" />
    </CollapsibleTrigger>
  </div>

  <CollapsibleContent class="pt-2 text-xs text-muted-foreground space-y-1">
    <p>• Enable experimental reactivity flags</p>
    <p>• Enable Tailwind CSS v4 OKLCH color engine</p>
  </CollapsibleContent>
</Collapsible>`;

export default function CollapsibleDocPage() {
  const cliCmd = () => formatCliCmd("add collapsible");
  const [isOpen, setIsOpen] = createSignal(false);

  return (
    <>
      <Seo
        title="Collapsible — Nikala UI"
        description="An interactive component that expands and collapses content panels with smooth height transitions."
        path="/docs/components/collapsible"
      />

      <div class="space-y-10">
        <DocPageHeader
          title="Collapsible"
          description="An interactive component that expands and collapses content panels with smooth height animations."
        />

        {/* Main Component Interactive Hero Preview */}
        <ComponentPreview name="collapsible" code={heroCode}>
          <Collapsible open={isOpen()} onOpenChange={setIsOpen} class="w-full max-w-sm space-y-2 border border-border p-4 rounded-lg bg-card text-card-foreground">
            <div class="flex items-center justify-between gap-4">
              <h4 class="text-sm font-semibold">@magradze starred 3 repositories</h4>
              <CollapsibleTrigger class="h-8 w-8 inline-flex items-center justify-center rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors shrink-0">
                <ChevronsUpDown class={`h-4 w-4 transition-transform duration-200 ${isOpen() ? "rotate-180" : ""}`} />
              </CollapsibleTrigger>
            </div>

            <div class="rounded-md border border-border px-4 py-2 font-mono text-sm shadow-2xs bg-muted/30">
              @nikala-ui/ui
            </div>

            <CollapsibleContent class="space-y-2">
              <div class="rounded-md border border-border px-4 py-2 font-mono text-sm shadow-2xs bg-muted/30">
                solid-js/solid
              </div>
              <div class="rounded-md border border-border px-4 py-2 font-mono text-sm shadow-2xs bg-muted/30">
                tailwindlabs/tailwindcss
              </div>
            </CollapsibleContent>
          </Collapsible>
        </ComponentPreview>

        {/* Usage */}
        <div class="space-y-4">
          <DocSectionHeader title="Usage" />
          <p class="text-sm text-muted-foreground">
            Import the components into your SolidJS layout:
          </p>
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        {/* Examples */}
        <div class="space-y-6">
          <DocSectionHeader title="Examples" />

          {/* Default Open Example */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Default Open State</h3>
            <p class="text-sm text-muted-foreground">
              Pass <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">defaultOpen={`{true}`}</code> to initialize the panel in expanded state.
            </p>
            <ComponentPreview name="collapsible-open" code={defaultOpenCode}>
              <Collapsible defaultOpen={true} class="w-full max-w-sm space-y-2 border border-border p-4 rounded-lg bg-card text-card-foreground">
                <div class="flex items-center justify-between">
                  <span class="text-sm font-medium">Developer Settings</span>
                  <CollapsibleTrigger class="h-8 w-8 inline-flex items-center justify-center rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors shrink-0">
                    <ChevronsUpDown class="h-4 w-4" />
                  </CollapsibleTrigger>
                </div>

                <CollapsibleContent class="pt-2 text-xs text-muted-foreground space-y-1">
                  <p>• Enable experimental reactivity flags</p>
                  <p>• Enable Tailwind CSS v4 OKLCH color engine</p>
                </CollapsibleContent>
              </Collapsible>
            </ComponentPreview>
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6">
          <DocSectionHeader title="API Reference" />
          <DocApiTable
            title="Collapsible Props"
            items={[
              {
                prop: "open",
                type: "boolean",
                default: "false",
                description: "Controlled open state of the collapsible content panel.",
              },
              {
                prop: "defaultOpen",
                type: "boolean",
                default: "false",
                description: "Initial open state for uncontrolled usage.",
              },
              {
                prop: "onOpenChange",
                type: "(open: boolean) => void",
                default: "-",
                description: "Event handler called when the open state changes.",
              },
              {
                prop: "disabled",
                type: "boolean",
                default: "false",
                description: "Whether interaction with the collapsible trigger is disabled.",
              },
            ]}
          />
        </div>

        <DocNextSteps
          prev={{ title: "Breadcrumb", href: "/docs/components/breadcrumb" }}
          next={{ title: "Combobox", href: "/docs/components/combobox" }}
        />
      </div>
    </>
  );
}
