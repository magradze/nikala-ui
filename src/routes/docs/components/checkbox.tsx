// src/routes/docs/components/checkbox.tsx
import { createSignal } from "solid-js";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

/* --- Code Snippets --- */
const importCode = `import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";`;

const defaultCode = `<div class="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label for="terms" class="cursor-pointer">
    Accept terms and conditions
  </Label>
</div>`;

const disabledCode = `<div class="flex flex-col gap-3">
  <div class="flex items-center space-x-2">
    <Checkbox id="disabled-1" disabled />
    <Label for="disabled-1" class="opacity-50">Disabled unchecked</Label>
  </div>

  <div class="flex items-center space-x-2">
    <Checkbox id="disabled-2" defaultChecked disabled />
    <Label for="disabled-2" class="opacity-50">Disabled checked</Label>
  </div>
</div>`;

const formListCode = `<div class="space-y-4 max-w-sm rounded-lg border border-border p-4 bg-card">
  <div class="space-y-1">
    <h4 class="text-sm font-semibold">Notification Preferences</h4>
    <p class="text-xs text-muted-foreground">Select the types of emails you would like to receive.</p>
  </div>
  <div class="space-y-3 pt-2">
    <div class="flex items-start space-x-2">
      <Checkbox id="marketing" defaultChecked class="mt-0.5" />
      <div class="grid gap-1 leading-none">
        <Label for="marketing" class="text-xs font-medium cursor-pointer">Marketing emails</Label>
        <p class="text-[11px] text-muted-foreground">Receive promotional news and feature releases.</p>
      </div>
    </div>

    <div class="flex items-start space-x-2">
      <Checkbox id="security" defaultChecked disabled class="mt-0.5" />
      <div class="grid gap-1 leading-none">
        <Label for="security" class="text-xs font-medium opacity-70">Security alerts</Label>
        <p class="text-[11px] text-muted-foreground">Mandatory system and login security notices.</p>
      </div>
    </div>
  </div>
</div>`;

const controlledCode = `const [agreed, setAgreed] = createSignal(false);

return (
  <div class="space-y-3">
    <div class="flex items-center space-x-2">
      <Checkbox
        id="controlled"
        checked={agreed()}
        onChange={(val) => setAgreed(val)}
      />
      <Label for="controlled" class="cursor-pointer">
        Subscribe to newsletter
      </Label>
    </div>
    <p class="text-xs text-muted-foreground">
      Status: {agreed() ? "Subscribed" : "Unsubscribed"}
    </p>
  </div>
);`;

export default function CheckboxDocsPage() {
    const [agreed, setAgreed] = createSignal(false);

    return (
        <>
            <Seo
                title="Checkbox Component"
                description="Checkable input box with custom checkmark indicator and reactive signal support in SolidJS."
                path="/docs/components/checkbox"
            />

            <div class="space-y-10 pb-16">
                {/* Page Header */}
                <DocPageHeader
                    title="Checkbox"
                    badge="cva"
                    description="A control that allows the user to toggle between checked and unchecked boolean states."
                />

                {/* Hero Live Preview */}
                <ComponentPreview name="checkbox" code={defaultCode}>
                    <div class="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <Label for="terms" class="cursor-pointer">
                            Accept terms and conditions
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
                            Pass <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">disabled={`{true}`}</code> to prevent user interaction.
                        </p>
                        <ComponentPreview name="checkbox" code={disabledCode}>
                            <div class="flex flex-col gap-3">
                                <div class="flex items-center space-x-2">
                                    <Checkbox id="disabled-1" disabled />
                                    <Label for="disabled-1" class="opacity-50 cursor-not-allowed">Disabled unchecked</Label>
                                </div>

                                <div class="flex items-center space-x-2">
                                    <Checkbox id="disabled-2" defaultChecked disabled />
                                    <Label for="disabled-2" class="opacity-50 cursor-not-allowed">Disabled checked</Label>
                                </div>
                            </div>
                        </ComponentPreview>
                    </div>

                    {/* Controlled State */}
                    <div class="space-y-3">
                        <h3 class="text-lg font-semibold tracking-tight">Controlled State</h3>
                        <p class="text-sm text-muted-foreground">
                            Use <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">checked</code> and <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">onChange</code> for reactive signal tracking.
                        </p>
                        <ComponentPreview name="checkbox" code={controlledCode}>
                            <div class="space-y-3">
                                <div class="flex items-center space-x-2">
                                    <Checkbox
                                        id="controlled-demo"
                                        checked={agreed()}
                                        onChange={(val) => setAgreed(val)}
                                    />
                                    <Label for="controlled-demo" class="cursor-pointer">
                                        Subscribe to newsletter
                                    </Label>
                                </div>
                                <p class="text-xs font-mono text-muted-foreground">
                                    Status: <span class="font-bold text-foreground">{agreed() ? "Subscribed" : "Unsubscribed"}</span>
                                </p>
                            </div>
                        </ComponentPreview>
                    </div>

                    {/* Form List Card Example */}
                    <div class="space-y-3">
                        <h3 class="text-lg font-semibold tracking-tight">Form Preference List</h3>
                        <p class="text-sm text-muted-foreground">
                            Combine checkboxes with sub-titles and cards for preference settings.
                        </p>
                        <ComponentPreview name="checkbox" code={formListCode}>
                            <div class="space-y-4 max-w-sm w-full rounded-lg border border-border p-4 bg-card">
                                <div class="space-y-1">
                                    <h4 class="text-sm font-semibold">Notification Preferences</h4>
                                    <p class="text-xs text-muted-foreground">Select the types of emails you would like to receive.</p>
                                </div>
                                <div class="space-y-3 pt-2">
                                    <div class="flex items-start space-x-2">
                                        <Checkbox id="marketing-demo" defaultChecked class="mt-0.5" />
                                        <div class="grid gap-1 leading-none">
                                            <Label for="marketing-demo" class="text-xs font-medium cursor-pointer">Marketing emails</Label>
                                            <p class="text-[11px] text-muted-foreground">Receive promotional news and feature releases.</p>
                                        </div>
                                    </div>

                                    <div class="flex items-start space-x-2">
                                        <Checkbox id="security-demo" defaultChecked disabled class="mt-0.5" />
                                        <div class="grid gap-1 leading-none">
                                            <Label for="security-demo" class="text-xs font-medium opacity-70">Security alerts</Label>
                                            <p class="text-[11px] text-muted-foreground">Mandatory system and login security notices.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ComponentPreview>
                    </div>
                </div>

                {/* API Reference */}
                <div class="space-y-6 pt-6">
                    <DocSectionHeader title="API Reference" />

                    <DocApiTable
                        title="Checkbox"
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
                                description: "Initial uncontrolled checked state.",
                            },
                            {
                                prop: "onChange",
                                type: "(checked: boolean) => void",
                                default: "-",
                                description: "Event handler callback triggered when the checked state changes.",
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
                    prev={{ title: "Card Component", href: "/docs/components/card" }}
                    next={{ title: "Command Palette", href: "/docs/components/command" }}
                />
            </div>
        </>
    );
}