import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipArrow } from "@/components/ui/tooltip";

const importCode = `import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";`;

const defaultCode = `<Tooltip>
  <TooltipTrigger as={Button} variant="outline">Hover Me</TooltipTrigger>
  <TooltipContent>
    Add to bookmark list
  </TooltipContent>
</Tooltip>`;

const placementCode = `<div class="flex items-center gap-4">
  <Tooltip placement="top">
    <TooltipTrigger as={Button} variant="outline">Top</TooltipTrigger>
    <TooltipContent>Top tooltip</TooltipContent>
  </Tooltip>
  <Tooltip placement="bottom">
    <TooltipTrigger as={Button} variant="outline">Bottom</TooltipTrigger>
    <TooltipContent>Bottom tooltip</TooltipContent>
  </Tooltip>
  <Tooltip placement="left">
    <TooltipTrigger as={Button} variant="outline">Left</TooltipTrigger>
    <TooltipContent>Left tooltip</TooltipContent>
  </Tooltip>
  <Tooltip placement="right">
    <TooltipTrigger as={Button} variant="outline">Right</TooltipTrigger>
    <TooltipContent>Right tooltip</TooltipContent>
  </Tooltip>
</div>`;

export default function TooltipDocsPage() {
  return (
    <>
      <Seo
        title="Tooltip Component"
        description="A popup that displays contextual information on element hover or focus for SolidJS and Tailwind CSS v4."
        path="/docs/components/tooltip"
      />

      <div class="space-y-10 pb-16">
        <DocPageHeader
          title="Tooltip"
          badge="kobalte"
          description="A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it."
        />

        <ComponentPreview name="tooltip" code={defaultCode}>
          <Tooltip>
            <TooltipTrigger as={Button} variant="outline">
              Hover Me
            </TooltipTrigger>
            <TooltipContent>
              <TooltipArrow />
              <span>Add to bookmark list</span>
            </TooltipContent>
          </Tooltip>
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
              Pass <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">placement="top | bottom | left | right"</code> to position the tooltip badge relative to the trigger.
            </p>
            <ComponentPreview name="tooltip" code={placementCode}>
              <div class="flex flex-wrap items-center gap-4">
                <Tooltip placement="top">
                  <TooltipTrigger as={Button} variant="outline">
                    Top
                  </TooltipTrigger>
                  <TooltipContent><TooltipArrow />Top tooltip</TooltipContent>
                </Tooltip>
                <Tooltip placement="bottom">
                  <TooltipTrigger as={Button} variant="outline">
                    Bottom
                  </TooltipTrigger>
                  <TooltipContent><TooltipArrow />Bottom</TooltipContent>
                </Tooltip>
                <Tooltip placement="left">
                  <TooltipTrigger as={Button} variant="outline">
                    Left
                  </TooltipTrigger>
                  <TooltipContent><TooltipArrow />Left tooltip</TooltipContent>
                </Tooltip>
                <Tooltip placement="right">
                  <TooltipTrigger as={Button} variant="outline">
                    Right
                  </TooltipTrigger>
                  <TooltipContent><TooltipArrow />Right tooltip</TooltipContent>
                </Tooltip>
              </div>
            </ComponentPreview>
          </div>
        </div>

        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="Tooltip"
            items={[
              {
                prop: "placement",
                type: '"top" | "bottom" | "left" | "right"',
                default: '"top"',
                description: "The preferred position of the tooltip relative to the trigger element.",
              },
              {
                prop: "openDelay",
                type: "number",
                default: "700",
                description: "The delay in milliseconds before the tooltip opens.",
              },
              {
                prop: "closeDelay",
                type: "number",
                default: "300",
                description: "The delay in milliseconds before the tooltip closes.",
              },
            ]}
          />
        </div>

        <DocNextSteps
          prev={{ title: "Toast Component", href: "/docs/components/toast" }}
          next={{ title: "Popover Component", href: "/docs/components/popover" }}
        />
      </div>
    </>
  );
}