// src/routes/docs/hooks/create-input-mask.tsx
import { createInputMask } from "@nikala-ui/hooks";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Input } from "@/components/ui/input";

const importCode = `import { createInputMask } from "@nikala-ui/hooks";`;

const basicUsageCode = `const phoneMask = createInputMask({
  mask: "+### ### ### ###",
});

return (
  <div>
    <Input {...phoneMask.props} placeholder="+1 555 123 4567" />
    <p>Masked: {phoneMask.value()}</p>
    <p>Raw Digits: {phoneMask.unmaskedValue()}</p>
  </div>
);`;

export function InputMaskDemo() {
  const phoneMask = createInputMask({
    mask: "+### ### ### ###",
  });

  const cardMask = createInputMask({
    mask: "#### #### #### ####",
  });

  return (
    <div class="space-y-4 max-w-sm w-full min-h-180px flex flex-col items-center justify-center text-center">
      <div class="w-full p-4 rounded-lg border border-border bg-card shadow-xs space-y-4 text-left">
        {/* Phone Mask */}
        <div class="space-y-1">
          <label class="text-xs font-medium text-foreground">International Phone Number:</label>
          <Input
            value={phoneMask.props.value()}
            onInput={phoneMask.props.onInput}
            placeholder="+1 555 123 4567"
            class="h-8 text-xs font-mono"
          />
          <div class="flex justify-between text-[10px] text-muted-foreground font-mono pt-0.5">
            <span>Raw: <strong class="text-foreground">{phoneMask.unmaskedValue() || "empty"}</strong></span>
            <span>Masked: <strong class="text-primary">{phoneMask.value() || "empty"}</strong></span>
          </div>
        </div>

        {/* Credit Card Mask */}
        <div class="space-y-1 pt-1">
          <label class="text-xs font-medium text-foreground">Card Number (16 Digits):</label>
          <Input
            value={cardMask.props.value()}
            onInput={cardMask.props.onInput}
            placeholder="4500 1234 5678 9012"
            class="h-8 text-xs font-mono"
          />
          <div class="flex justify-between text-[10px] text-muted-foreground font-mono pt-0.5">
            <span>Raw: <strong class="text-foreground">{cardMask.unmaskedValue() || "empty"}</strong></span>
            <span>Masked: <strong class="text-primary">{cardMask.value() || "empty"}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CreateInputMaskDocPage() {
  return (
    <div class="space-y-10 pb-16">
      <Seo
        title="createInputMask Primitive"
        description="SolidJS reactive primitive for input value masking (phone numbers, credit cards, dates)."
        path="/docs/hooks/create-input-mask"
      />

      {/* Page Header */}
      <DocPageHeader
        title="createInputMask"
        badge="primitive"
        description="A reactive primitive for formatting input field values against custom pattern templates such as phone numbers, credit cards, dates, and ID codes."
      />

      {/* Live Interactive Hero Preview */}
      <ComponentPreview isHook name="create-input-mask" code={basicUsageCode}>
        <InputMaskDemo />
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
          <h3 class="text-lg font-semibold tracking-tight">Masking Phone & Credit Card Inputs</h3>
          <p class="text-sm text-muted-foreground">
            Pass a pattern template to <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">createInputMask(&#123; mask: '+995 (500) 00-00-00' &#125;)</code>.
          </p>
          <CodeBlock code={basicUsageCode} lang="tsx" />
        </div>
      </div>

      {/* API Reference */}
      <div class="space-y-6 pt-6">
        <DocSectionHeader title="API Reference" />

        <DocApiTable
          title="CreateInputMaskReturn & Options"
          items={[
            {
              prop: "value",
              type: "Accessor<string>",
              default: "''",
              description: "Signal accessor returning formatted masked input string.",
              required: true,
            },
            {
              prop: "unmaskedValue",
              type: "Accessor<string>",
              default: "''",
              description: "Signal accessor returning raw unmasked digits or characters.",
              required: true,
            },
            {
              prop: "setValue",
              type: "(val: string) => void",
              default: "-",
              description: "Function to programmatically format and set new input value.",
            },
            {
              prop: "props",
              type: "{ value, onInput }",
              default: "-",
              description: "JSX props object to spread onto target HTMLInputElement.",
            },
          ]}
        />
      </div>

      {/* Footer Navigation */}
      <DocNextSteps
        prev={{ title: "createForm Primitive", href: "/docs/hooks/create-form" }}
        next={{ title: "createIdle Primitive", href: "/docs/hooks/create-idle" }}
      />
    </div>
  );
}
