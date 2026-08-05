// src/routes/docs/components/switch.tsx
import { createSignal } from "solid-js";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

/* --- Code Snippets --- */
const importCode = `import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";`;

const defaultCode = `<div class="flex items-center space-x-2">
  <Switch id="airplane-mode" />
  <Label for="airplane-mode" class="cursor-pointer">
    Airplane Mode
  </Label>
</div>`;

const disabledCode = `<div class="flex flex-col gap-3">
  <div class="flex items-center space-x-2">
    <Switch id="disabled-off" disabled />
    <Label for="disabled-off" class="opacity-50">Disabled Off</Label>
  </div>

  <div class="flex items-center space-x-2">
    <Switch id="disabled-on" defaultChecked disabled />
    <Label for="disabled-on" class="opacity-50">Disabled On</Label>
  </div>
</div>`;

const controlledCode = `const [enabled, setEnabled] = createSignal(false);

return (
  <div class="space-y-3">
    <div class="flex items-center space-x-2">
      <Switch
        id="notifications"
        checked={enabled()}
        onChange={setEnabled}
      />
      <Label for="notifications" class="cursor-pointer">
        Push Notifications
      </Label>
    </div>
    <p class="text-xs font-mono text-muted-foreground">
      Status: {enabled() ? "Enabled" : "Disabled"}
    </p>
  </div>
);`;

export default function SwitchDocsPage() {
  const [enabled, setEnabled] = createSignal(false);

  return (
    <>
      <Seo
        title="Switch Component"
        description="Toggle switch control for boolean states built for SolidJS and Tailwind CSS v4."
        path="/docs/components/switch"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="Switch"
          badge="cva"
          description="A control that allows the user to toggle between checked and unchecked boolean states."
        />

        {/* Hero Live Preview */}
        <ComponentPreview name="switch" code={defaultCode}>
          <div class="flex items-center space-x-2">
            <Switch id="airplane-mode" />
            <Label for="airplane-mode" class="cursor-pointer">
              Airplane Mode
            </Label>
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

          {/* Disabled State */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Disabled State</h3>
            <p class="text-sm text-muted-foreground">
              Pass <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">disabled={`{true}`}</code> to prevent user toggling.
            </p>
            <ComponentPreview name="switch" code={disabledCode}>
              <div class="flex flex-col gap-3">
                <div class="flex items-center space-x-2">
                  <Switch id="disabled-off" disabled />
                  <Label for="disabled-off" class="opacity-50 cursor-not-allowed">Disabled Off</Label>
                </div>

                <div class="flex items-center space-x-2">
                  <Switch id="disabled-on" defaultChecked disabled />
                  <Label for="disabled-on" class="opacity-50 cursor-not-allowed">Disabled On</Label>
                </div>
              </div>
            </ComponentPreview>
          </div>

          {/* Controlled Signal State */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Controlled Signal State</h3>
            <p class="text-sm text-muted-foreground">
              Control state using <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">checked</code> and <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">onChange</code> callbacks.
            </p>
            <ComponentPreview name="switch" code={controlledCode}>
              <div class="space-y-3">
                <div class="flex items-center space-x-2">
                  <Switch
                    id="notifications"
                    checked={enabled()}
                    onChange={setEnabled}
                  />
                  <Label for="notifications" class="cursor-pointer">
                    Push Notifications
                  </Label>
                </div>
                <p class="text-xs font-mono text-muted-foreground">
                  Status: <span class="font-bold text-foreground">{enabled() ? "Enabled" : "Disabled"}</span>
                </p>
              </div>
            </ComponentPreview>
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="Switch"
            items={[
              {
                prop: "checked",
                type: "boolean",
                default: "-",
                description: "Controlled boolean checked state.",
              },
              {
                prop: "defaultChecked",
                type: "boolean",
                default: "false",
                description: "Initial value for uncontrolled state.",
              },
              {
                prop: "onChange",
                type: "(checked: boolean) => void",
                default: "-",
                description: "Callback function fired when toggle state changes.",
              },
              {
                prop: "disabled",
                type: "boolean",
                default: "false",
                description: "Disables interaction and reduces opacity.",
              },
            ]}
          />
        </div>

        {/* Footer Navigation */}
        <DocNextSteps
          prev={{ title: "Slider Component", href: "/docs/components/slider" }}
          next={{ title: "Tabs Component", href: "/docs/components/tabs" }}
        />
      </div>
    </>
  );
}