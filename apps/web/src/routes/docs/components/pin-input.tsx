import { createSignal, Index } from "solid-js";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import {
  PinInput,
  PinInputInput,
  PinInputLabel,
} from "@/components/ui/pin-input";

const importCode = `import {
  PinInput,
  PinInputInput,
  PinInputLabel,
} from "@/components/ui/pin-input";`;

export default function PinInputDocsPage() {
  const [value, setValue] = createSignal("");
  const [alphaValue, setAlphaValue] = createSignal("");
  const [maskedValue, setMaskedValue] = createSignal("");

  return (
    <>
      <Seo
        title="Pin Input Component"
        description="4 or 6-digit SMS/2FA verification PIN code input component supporting numeric and alphanumeric modes."
        path="/docs/components/pin-input"
      />

      <div class="space-y-10 pb-16">
        <DocPageHeader
          title="Pin Input"
          badge="UI Component"
          description="Interactive multi-slot PIN/OTP input component for SMS and 2FA authentication verification codes."
        />

        {/* 1. Basic 4-digit Numeric OTP */}
        <DocSectionHeader
          title="Numeric-Only PIN (Default)"
          description="Strictly allows digits [0-9] and auto-advances to the next slot."
        />

        <ComponentPreview
          name="pin-input"
          code={`const [value, setValue] = createSignal("");

<PinInput type="numeric" value={value()} onValueChange={setValue} class="flex-col items-start gap-2">
  <PinInputLabel>Enter 4-Digit SMS Code</PinInputLabel>
  <div class="flex items-center gap-2">
    <Index each={[0, 1, 2, 3]}>
      {(index) => <PinInputInput index={index()} />}
    </Index>
  </div>
</PinInput>`}
        >
          <div class="flex flex-col items-start gap-2 py-4">
            <PinInput type="numeric" length={4} value={value()} onValueChange={setValue} class="flex-col items-start gap-2">
              <PinInputLabel>Enter 4-Digit SMS Code</PinInputLabel>
              <div class="flex items-center gap-2">
                <Index each={[0, 1, 2, 3]}>
                  {(index) => <PinInputInput index={index()} />}
                </Index>
              </div>
            </PinInput>
            <p class="text-xs text-muted-foreground font-mono mt-1">
              Current Code: <span class="text-foreground font-bold">{value() || "____"}</span>
            </p>
          </div>
        </ComponentPreview>

        <div class="space-y-4">
          <DocSectionHeader title="Usage" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        {/* 2. Alphanumeric OTP */}
        <DocSectionHeader
          title="Alphanumeric OTP Code"
          description="Allows letters and digits (e.g. A7F9) for license or promo codes."
        />

        <ComponentPreview
          name="pin-input"
          code={`const [alpha, setAlpha] = createSignal("");

<PinInput type="alphanumeric" value={alpha()} onValueChange={setAlpha} class="flex-col items-start gap-2">
  <PinInputLabel>Enter Promo / License Code</PinInputLabel>
  <div class="flex items-center gap-2">
    <Index each={[0, 1, 2, 3, 4, 5]}>
      {(index) => <PinInputInput index={index()} />}
    </Index>
  </div>
</PinInput>`}
        >
          <div class="flex flex-col items-start gap-2 py-4">
            <PinInput type="alphanumeric" length={6} value={alphaValue()} onValueChange={setAlphaValue} class="flex-col items-start gap-2">
              <PinInputLabel>Enter Promo / License Code</PinInputLabel>
              <div class="flex items-center gap-2">
                <Index each={[0, 1, 2, 3, 4, 5]}>
                  {(index) => <PinInputInput index={index()} />}
                </Index>
              </div>
            </PinInput>
            <p class="text-xs text-muted-foreground font-mono mt-1">
              Current Code: <span class="text-foreground font-bold">{alphaValue() || "______"}</span>
            </p>
          </div>
        </ComponentPreview>

        {/* 3. Masked / Password Mode */}
        <DocSectionHeader
          title="Masked Password Mode"
          description="Masked OTP slots for hiding sensitive security PIN codes."
        />

        <ComponentPreview
          name="pin-input"
          code={`const [value, setValue] = createSignal("");

<PinInput mask value={value()} onValueChange={setValue} class="flex-col items-start gap-2">
  <PinInputLabel>Secret Security PIN</PinInputLabel>
  <div class="flex items-center gap-2">
    <Index each={[0, 1, 2, 3]}>
      {(index) => <PinInputInput index={index()} />}
    </Index>
  </div>
</PinInput>`}
        >
          <div class="flex flex-col items-start gap-2 py-4">
            <PinInput mask value={maskedValue()} onValueChange={setMaskedValue} class="flex-col items-start gap-2">
              <PinInputLabel>Secret Security PIN</PinInputLabel>
              <div class="flex items-center gap-2">
                <Index each={[0, 1, 2, 3]}>
                  {(index) => <PinInputInput index={index()} />}
                </Index>
              </div>
            </PinInput>
          </div>
        </ComponentPreview>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="PinInput (Root)"
            items={[
              {
                prop: "type",
                type: '"numeric" | "alphanumeric"',
                default: '"numeric"',
                description: "Restricts input characters to digits [0-9] or allows letters + digits.",
              },
              {
                prop: "length",
                type: "number",
                default: "6",
                description: "Total number of OTP/PIN input slots.",
              },
              {
                prop: "value",
                type: "string",
                default: '""',
                description: "Controlled input value string.",
              },
              {
                prop: "onValueChange",
                type: "(value: string) => void",
                default: "—",
                description: "Callback fired when code value changes.",
              },
              {
                prop: "mask",
                type: "boolean",
                default: "false",
                description: "Masks characters as password dots.",
              },
              {
                prop: "disabled",
                type: "boolean",
                default: "false",
                description: "Disables all input slots.",
              },
            ]}
          />

          <DocApiTable
            title="PinInputInput"
            items={[
              {
                prop: "index",
                type: "number",
                default: "—",
                description: "Required 0-based slot index position.",
              },
            ]}
          />
        </div>

        <DocNextSteps
          prev={{ title: "Popover Component", href: "/docs/components/popover" }}
          next={{ title: "Progress Component", href: "/docs/components/progressფწწწდდდ3333დ" }}
        />
      </div>
    </>
  );
}
