import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverTrigger, PopoverContent, PopoverTitle, PopoverDescription, PopoverCloseButton, PopoverArrow } from "@/components/ui/popover";

const importCode = `import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverTitle,
  PopoverDescription,
  PopoverCloseButton,
  PopoverArrow,
} from "@/components/ui/popover";`;

const defaultCode = `<Popover placement="bottom">
  <PopoverTrigger as={Button} variant="outline">Open Popover</PopoverTrigger>
  <PopoverContent class="w-80">
    <PopoverArrow />
    <PopoverCloseButton />
    <div class="grid gap-4">
      <div class="space-y-2">
        <PopoverTitle>Dimensions</PopoverTitle>
        <PopoverDescription>Set the width and max-height for the layer.</PopoverDescription>
      </div>
      <div class="grid gap-2">
        <div class="grid grid-cols-3 items-center gap-4">
          <Label for="width">Width</Label>
          <Input id="width" value="100%" class="col-span-2 h-8" />
        </div>
        <div class="grid grid-cols-3 items-center gap-4">
          <Label for="height">Height</Label>
          <Input id="height" value="25px" class="col-span-2 h-8" />
        </div>
      </div>
    </div>
  </PopoverContent>
</Popover>`;

const positionsCode = `<div class="flex flex-wrap gap-4">
  <Popover placement="top">
    <PopoverTrigger as={Button} variant="outline">Top</PopoverTrigger>
    <PopoverContent class="w-48"><PopoverArrow /><p class="text-sm">Top Placement</p></PopoverContent>
  </Popover>

  <Popover placement="right">
    <PopoverTrigger as={Button} variant="outline">Right</PopoverTrigger>
    <PopoverContent class="w-48"><PopoverArrow /><p class="text-sm">Right Placement</p></PopoverContent>
  </Popover>

  <Popover placement="bottom">
    <PopoverTrigger as={Button} variant="outline">Bottom</PopoverTrigger>
    <PopoverContent class="w-48"><PopoverArrow /><p class="text-sm">Bottom Placement</p></PopoverContent>
  </Popover>

  <Popover placement="left">
    <PopoverTrigger as={Button} variant="outline">Left</PopoverTrigger>
    <PopoverContent class="w-48"><PopoverArrow /><p class="text-sm">Left Placement</p></PopoverContent>
  </Popover>
</div>`;

export default function PopoverDocsPage() {
  return (
    <>
      <Seo
        title="Popover Component"
        description="Displays rich content in a portal layer triggered by a button for SolidJS and Tailwind CSS v4."
        path="/docs/components/popover"
      />

      <div class="space-y-10 pb-16">
        <DocPageHeader
          title="Popover"
          badge="kobalte"
          description="Displays rich content in a portal layer triggered by a button, built on Kobalte primitives."
        />

        <ComponentPreview name="popover" code={defaultCode}>
          <Popover placement="bottom">
            <PopoverTrigger as={Button} variant="outline">
              Open Popover
            </PopoverTrigger>
            <PopoverContent class="w-80">
              <PopoverArrow />
              <PopoverCloseButton />
              <div class="grid gap-4">
                <div class="space-y-2">
                  <PopoverTitle>Dimensions</PopoverTitle>
                  <PopoverDescription>
                    Set the width and max-height for the layer.
                  </PopoverDescription>
                </div>
                <div class="grid gap-2">
                  <div class="grid grid-cols-3 items-center gap-4">
                    <Label for="demo-width">Width</Label>
                    <Input id="demo-width" value="100%" class="col-span-2 h-8" />
                  </div>
                  <div class="grid grid-cols-3 items-center gap-4">
                    <Label for="demo-height">Height</Label>
                    <Input id="demo-height" value="25px" class="col-span-2 h-8" />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </ComponentPreview>

        <div class="space-y-4">
          <DocSectionHeader title="Usage" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Placements</h3>
            <p class="text-sm text-muted-foreground">
              Configure the positioning using the <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">placement</code> prop on <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">Popover</code>.
            </p>
            <ComponentPreview name="popover" code={positionsCode}>
              <div class="flex flex-wrap items-center gap-4 p-4">
                <Popover placement="top">
                  <PopoverTrigger as={Button} variant="outline">Top</PopoverTrigger>
                  <PopoverContent class="w-48"><PopoverArrow /><p class="text-sm">Top Placement</p></PopoverContent>
                </Popover>

                <Popover placement="right">
                  <PopoverTrigger as={Button} variant="outline">Right</PopoverTrigger>
                  <PopoverContent class="w-48"><PopoverArrow /><p class="text-sm">Right Placement</p></PopoverContent>
                </Popover>

                <Popover placement="bottom">
                  <PopoverTrigger as={Button} variant="outline">Bottom</PopoverTrigger>
                  <PopoverContent class="w-48"><PopoverArrow /><p class="text-sm">Bottom Placement</p></PopoverContent>
                </Popover>

                <Popover placement="left">
                  <PopoverTrigger as={Button} variant="outline">Left</PopoverTrigger>
                  <PopoverContent class="w-48"><PopoverArrow /><p class="text-sm">Left Placement</p></PopoverContent>
                </Popover>
              </div>
            </ComponentPreview>
          </div>
        </div>

        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="Popover"
            items={[
              {
                prop: "placement",
                type: '"top" | "bottom" | "left" | "right" | "top-start" | "top-end" | "bottom-start" | "bottom-end"',
                default: '"bottom"',
                description: "The preferred placement side of the popover content relative to the trigger.",
              },
              {
                prop: "gutter",
                type: "number",
                default: "0",
                description: "The distance in pixels between the popover content and the trigger element.",
              },
            ]}
          />
        </div>

        <DocNextSteps
          prev={{ title: "Tooltip Component", href: "/docs/components/tooltip" }}
          next={{ title: "Radio Group Component", href: "/docs/components/radio-group" }}
        />
      </div>
    </>
  );
}