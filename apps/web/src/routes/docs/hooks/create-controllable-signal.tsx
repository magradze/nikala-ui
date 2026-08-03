// src/routes/docs/hooks/create-controllable-signal.tsx
import { createSignal } from "solid-js";
import { createControllableSignal } from "@nikala-ui/hooks";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/* --- Code Snippets --- */
const importCode = `import { createControllableSignal } from "@nikala-ui/hooks";`;

const basicUncontrolledCode = `const [value, setValue] = createControllableSignal({
  defaultValue: "Initial State",
});

return (
  <div class="space-y-3">
    <p class="text-sm font-mono">Current Value: {value()}</p>
    <div class="flex gap-2">
      <Button size="sm" onClick={() => setValue("Option A")}>Select A</Button>
      <Button size="sm" variant="outline" onClick={() => setValue("Option B")}>Select B</Button>
    </div>
  </div>
);`;

const controlledCode = `const [externalState, setExternalState] = createSignal("Controlled Value");

const [value, setValue] = createControllableSignal({
  value: () => externalState(),
  onChange: (next) => setExternalState(next),
});

return (
  <div class="space-y-3">
    <p class="text-sm font-mono">State: {value()}</p>
    <Button size="sm" onClick={() => setValue("Updated Controlled Value")}>
      Update State
    </Button>
  </div>
);`;

const componentIntegrationCode = `import { splitProps } from "solid-js";
import { createControllableSignal } from "@nikala-ui/hooks";

export function CustomToggle(props: { value?: boolean; defaultValue?: boolean; onChange?: (v: boolean) => void }) {
  const [local] = splitProps(props, ["value", "defaultValue", "onChange"]);

  const [isChecked, setIsChecked] = createControllableSignal({
    value: () => local.value,
    defaultValue: local.defaultValue ?? false,
    onChange: (v) => local.onChange?.(v),
  });

  return (
    <button onClick={() => setIsChecked(!isChecked())}>
      Toggle: {isChecked() ? "ON" : "OFF"}
    </button>
  );
}`;

export default function CreateControllableSignalDocPage() {
  const [demoState, setDemoState] = createControllableSignal({
    defaultValue: "Tab A",
  });

  const [parentSignal, setParentSignal] = createSignal("Controlled Active");
  const [controlledDemo, setControlledDemo] = createControllableSignal({
    value: () => parentSignal(),
    onChange: (v) => setParentSignal(v),
  });

  return (
    <>
      <Seo
        title="createControllableSignal Primitive"
        description="SolidJS reactive primitive supporting both controlled and uncontrolled state management seamlessly."
        path="/docs/hooks/create-controllable-signal"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="createControllableSignal"
          badge="primitive"
          description="A primitive for managing state in SolidJS components that support both controlled and uncontrolled modes with a unified setter API."
        />

        {/* Live Interactive Hero Preview */}
        <ComponentPreview name="create-controllable-signal" code={basicUncontrolledCode}>
          <div class="space-y-4 max-w-sm w-full rounded-xl border border-border p-5 bg-card/60 backdrop-blur-xs">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold text-muted-foreground">Active Selection</span>
              <Badge variant="secondary" class="font-mono text-xs">{demoState()}</Badge>
            </div>
            <div class="flex gap-2 pt-2">
              <Button
                size="sm"
                variant={demoState() === "Tab A" ? "default" : "outline"}
                onClick={() => setDemoState("Tab A")}
              >
                Option A
              </Button>
              <Button
                size="sm"
                variant={demoState() === "Tab B" ? "default" : "outline"}
                onClick={() => setDemoState("Tab B")}
              >
                Option B
              </Button>
              <Button
                size="sm"
                variant={demoState() === "Tab C" ? "default" : "outline"}
                onClick={() => setDemoState("Tab C")}
              >
                Option C
              </Button>
            </div>
          </div>
        </ComponentPreview>

        {/* Import & Usage */}
        <div class="space-y-4">
          <DocSectionHeader title="Import" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        {/* Examples Section */}
        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          {/* Uncontrolled Mode */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Uncontrolled Mode</h3>
            <p class="text-sm text-muted-foreground">
              Pass <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">defaultValue</code> when the component manages its own internal state.
            </p>
            <CodeBlock code={basicUncontrolledCode} lang="tsx" />
          </div>

          {/* Controlled Mode */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Controlled Mode</h3>
            <p class="text-sm text-muted-foreground">
              Pass a getter function for <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">value</code> and an <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">onChange</code> callback when parent component controls state.
            </p>
            <ComponentPreview name="create-controllable-signal" code={controlledCode}>
              <div class="space-y-3 p-4 border border-border rounded-lg bg-card/40">
                <div class="flex items-center space-x-3">
                  <span class="text-xs text-muted-foreground font-mono">Parent Signal State:</span>
                  <span class="text-xs font-bold font-mono text-primary">{controlledDemo()}</span>
                </div>
                <div class="flex gap-2">
                  <Button
                    size="sm"
                    variant={controlledDemo() === "State Alpha" ? "default" : "outline"}
                    onClick={() => setControlledDemo(controlledDemo() === "State Alpha" ? "State Beta" : "State Alpha")}
                  >
                    {controlledDemo() === "State Alpha" ? "Switch to Beta" : "Switch to Alpha"}
                  </Button>
                </div>
              </div>
            </ComponentPreview>
          </div>

          {/* Custom Component Integration */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Custom Component Pattern</h3>
            <p class="text-sm text-muted-foreground">
              Use <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">createControllableSignal</code> inside UI components to effortlessly support both modes.
            </p>
            <CodeBlock code={componentIntegrationCode} lang="tsx" />
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="CreateControllableSignalOptions<T>"
            items={[
              {
                prop: "value",
                type: "Accessor<T | undefined> | T",
                default: "-",
                description: "Controlled value getter accessor or raw value.",
              },
              {
                prop: "defaultValue",
                type: "T",
                default: "-",
                description: "Uncontrolled default initial state value.",
              },
              {
                prop: "onChange",
                type: "(value: T) => void",
                default: "-",
                description: "Callback triggered whenever state changes.",
              },
            ]}
          />
        </div>

        {/* Footer Navigation */}
        <DocNextSteps
          prev={{ title: "Hooks & Primitives Overview", href: "/docs/hooks" }}
          next={{ title: "Accordion Component", href: "/docs/components/accordion" }}
        />
      </div>
    </>
  );
}
