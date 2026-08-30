import { Component, createSignal } from "solid-js";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Seo } from "@/components/seo";
import { Rating } from "@/components/ui/rating";
import { Badge } from "@/components/ui/badge";

/* Code Snippets */
const importCode = `import { Rating } from "@/components/ui/rating";`;

const defaultCode = `import { createSignal } from "solid-js";
import { Rating } from "@/components/ui/rating";

export function RatingDemo() {
  const [rating, setRating] = createSignal(4);

  return (
    <div class="flex flex-col items-center gap-3">
      <Rating value={rating()} onChange={setRating} size="lg" />
      <span class="text-sm text-muted-foreground">
        Selected: {rating()} of 5 stars
      </span>
    </div>
  );
}`;

const sizesCode = `<div class="flex flex-col items-start gap-4">
  <div class="flex items-center gap-4">
    <span class="text-xs font-mono text-muted-foreground w-16">sm</span>
    <Rating size="sm" defaultValue={4} />
  </div>

  <div class="flex items-center gap-4">
    <span class="text-xs font-mono text-muted-foreground w-16">default</span>
    <Rating size="default" defaultValue={4} />
  </div>

  <div class="flex items-center gap-4">
    <span class="text-xs font-mono text-muted-foreground w-16">lg</span>
    <Rating size="lg" defaultValue={4} />
  </div>
</div>`;

const variantsCode = `<div class="flex flex-col items-start gap-4">
  <div class="flex items-center gap-4">
    <span class="text-xs font-mono text-muted-foreground w-24">yellow</span>
    <Rating variant="yellow" defaultValue={5} />
  </div>

  <div class="flex items-center gap-4">
    <span class="text-xs font-mono text-muted-foreground w-24">primary</span>
    <Rating variant="primary" defaultValue={5} />
  </div>

  <div class="flex items-center gap-4">
    <span class="text-xs font-mono text-muted-foreground w-24">destructive</span>
    <Rating variant="destructive" defaultValue={5} />
  </div>
</div>`;

const readOnlyCode = `<div class="flex items-center gap-3 p-4 rounded-lg border border-border bg-card">
  <Rating value={5} readOnly size="sm" />
  <span class="text-sm font-semibold text-foreground">4.9 / 5.0</span>
  <span class="text-xs text-muted-foreground">(1,240 verified reviews)</span>
</div>`;

export default function RatingDocPage() {
  const [demoRating, setDemoRating] = createSignal(4);

  return (
    <>
      <Seo
        title="Rating Component — SolidJS Tailwind v4"
        description="An accessible, interactive star rating input and read-only score display in SolidJS."
        path="/docs/components/rating"
      />

      <div class="space-y-10 pb-16">
        <DocPageHeader
          title="Rating"
          badge="Form & Inputs"
          description="An accessible star rating component supporting interactive inputs, hover preview states, keyboard navigation, and read-only score badges."
        />

        {/* Hero Preview */}
        <ComponentPreview name="rating" code={defaultCode} allowOverflow={true}>
          <div class="flex flex-col items-center justify-center p-8 gap-3">
            <Rating value={demoRating()} onChange={setDemoRating} size="lg" />
            <div class="flex items-center gap-2 mt-1">
              <Badge variant="secondary" class="font-mono">
                {demoRating()} / 5 Stars
              </Badge>
              <span class="text-xs text-muted-foreground">
                (Click or use arrow keys to change)
              </span>
            </div>
          </div>
        </ComponentPreview>

        {/* Usage Section */}
        <div class="space-y-4">
          <DocSectionHeader title="Usage" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        {/* Examples Section */}
        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          {/* Example 1: Sizes */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Size Scale</h3>
            <p class="text-sm text-muted-foreground">
              Select between <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">sm</code>, <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">default</code>, and <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">lg</code> star sizes.
            </p>
            <ComponentPreview name="rating" code={sizesCode}>
              <div class="p-6 flex flex-col items-start gap-4">
                <div class="flex items-center gap-4">
                  <span class="text-xs font-mono text-muted-foreground w-16">sm</span>
                  <Rating size="sm" defaultValue={4} />
                </div>
                <div class="flex items-center gap-4">
                  <span class="text-xs font-mono text-muted-foreground w-16">default</span>
                  <Rating size="default" defaultValue={4} />
                </div>
                <div class="flex items-center gap-4">
                  <span class="text-xs font-mono text-muted-foreground w-16">lg</span>
                  <Rating size="lg" defaultValue={4} />
                </div>
              </div>
            </ComponentPreview>
          </div>

          {/* Example 2: Color Variants */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Color Variants</h3>
            <p class="text-sm text-muted-foreground">
              Apply semantic color tokens like <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">yellow</code>, <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">primary</code>, or <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">destructive</code>.
            </p>
            <ComponentPreview name="rating" code={variantsCode}>
              <div class="p-6 flex flex-col items-start gap-4">
                <div class="flex items-center gap-4">
                  <span class="text-xs font-mono text-muted-foreground w-24">yellow</span>
                  <Rating variant="yellow" defaultValue={5} />
                </div>
                <div class="flex items-center gap-4">
                  <span class="text-xs font-mono text-muted-foreground w-24">primary</span>
                  <Rating variant="primary" defaultValue={5} />
                </div>
                <div class="flex items-center gap-4">
                  <span class="text-xs font-mono text-muted-foreground w-24">destructive</span>
                  <Rating variant="destructive" defaultValue={5} />
                </div>
              </div>
            </ComponentPreview>
          </div>

          {/* Example 3: Read-Only Display */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Read-Only Social Proof</h3>
            <p class="text-sm text-muted-foreground">
              Disable user interaction with <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">readOnly</code> to display customer feedback scores.
            </p>
            <ComponentPreview name="rating" code={readOnlyCode}>
              <div class="p-6 flex items-center justify-center">
                <div class="flex items-center gap-3 p-3.5 rounded-lg border border-border bg-card shadow-2xs">
                  <Rating value={5} readOnly size="sm" />
                  <span class="text-sm font-semibold text-foreground">4.9 / 5.0</span>
                  <span class="text-xs text-muted-foreground">(1,240 reviews)</span>
                </div>
              </div>
            </ComponentPreview>
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-4">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="Rating"
            description="Star rating input and display component."
            items={[
              {
                prop: "value",
                type: "number",
                default: "undefined",
                description: "Controlled rating score value.",
              },
              {
                prop: "defaultValue",
                type: "number",
                default: "0",
                description: "Uncontrolled initial rating score value.",
              },
              {
                prop: "max",
                type: "number",
                default: "5",
                description: "Maximum number of stars.",
              },
              {
                prop: "size",
                type: '"sm" | "default" | "lg"',
                default: '"default"',
                description: "Visual size of the rating stars.",
              },
              {
                prop: "variant",
                type: '"yellow" | "primary" | "destructive"',
                default: '"yellow"',
                description: "Color theme palette.",
              },
              {
                prop: "readOnly",
                type: "boolean",
                default: "false",
                description: "Disables interaction for display-only scores.",
              },
              {
                prop: "disabled",
                type: "boolean",
                default: "false",
                description: "Disables the input with muted opacity.",
              },
              {
                prop: "onChange",
                type: "(value: number) => void",
                default: "undefined",
                description: "Callback fired when a star score is selected.",
              },
              {
                prop: "onHover",
                type: "(value: number | null) => void",
                default: "undefined",
                description: "Callback fired when hovering over stars.",
              },
            ]}
          />
        </div>

        {/* Next Steps */}
        <DocNextSteps
          prev={{
            title: "Review Card",
            href: "/docs/components/review-card",
          }}
          next={{
            title: "Stat",
            href: "/docs/components/stat",
          }}
        />
      </div>
    </>
  );
}
