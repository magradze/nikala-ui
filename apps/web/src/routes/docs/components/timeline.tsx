// src/routes/docs/components/timeline.tsx
import { createSignal, For, Show } from "solid-js";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelinePoint,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
  TimelineTitle,
  TimelineDescription,
  TimelineTime,
} from "@/components/ui/timeline";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  Package,
  Truck,
  CreditCard,
  Home,
  GitCommit,
  GitBranch,
  Rocket,
  AlertTriangle,
  Clock,
  Sparkles,
} from "lucide-solid";

/* --- Code Snippets --- */
const importCode = `import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelinePoint,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
  TimelineTitle,
  TimelineDescription,
  TimelineTime,
} from "@/components/ui/timeline";`;

const defaultCode = `<Timeline>
  {/* Step 1: Completed */}
  <TimelineItem>
    <TimelineSeparator>
      <TimelinePoint status="success">
        <Check class="size-4" />
      </TimelinePoint>
      <TimelineConnector />
    </TimelineSeparator>
    <TimelineContent>
      <div class="flex items-center justify-between gap-2">
        <TimelineTitle>Order Placed</TimelineTitle>
        <TimelineTime>Oct 14, 09:30 AM</TimelineTime>
      </div>
      <TimelineDescription>Your order #NK-9281 has been received and logged.</TimelineDescription>
    </TimelineContent>
  </TimelineItem>

  {/* Step 2: Completed */}
  <TimelineItem>
    <TimelineSeparator>
      <TimelinePoint status="success">
        <CreditCard class="size-4" />
      </TimelinePoint>
      <TimelineConnector />
    </TimelineSeparator>
    <TimelineContent>
      <div class="flex items-center justify-between gap-2">
        <TimelineTitle>Payment Confirmed</TimelineTitle>
        <TimelineTime>Oct 14, 09:32 AM</TimelineTime>
      </div>
      <TimelineDescription>Payment of $149.00 processed via Stripe.</TimelineDescription>
    </TimelineContent>
  </TimelineItem>

  {/* Step 3: In Progress */}
  <TimelineItem>
    <TimelineSeparator>
      <TimelinePoint status="primary">
        <Package class="size-4" />
      </TimelinePoint>
      <TimelineConnector dashed />
    </TimelineSeparator>
    <TimelineContent>
      <div class="flex items-center justify-between gap-2">
        <TimelineTitle class="text-primary">Fulfillment & Packaging</TimelineTitle>
        <TimelineTime>In Progress</TimelineTime>
      </div>
      <TimelineDescription>Items packed at Tbilisi Logistics Hub.</TimelineDescription>
    </TimelineContent>
  </TimelineItem>

  {/* Step 4: Pending */}
  <TimelineItem>
    <TimelineSeparator>
      <TimelinePoint status="muted">
        <Truck class="size-4" />
      </TimelinePoint>
    </TimelineSeparator>
    <TimelineContent>
      <div class="flex items-center justify-between gap-2">
        <TimelineTitle class="text-muted-foreground">Out for Delivery</TimelineTitle>
        <TimelineTime>Pending</TimelineTime>
      </div>
      <TimelineDescription>Courier dispatch scheduled for tomorrow.</TimelineDescription>
    </TimelineContent>
  </TimelineItem>
</Timeline>`;

const alternateCode = `<Timeline align="alternate">
  <TimelineItem>
    <TimelineOppositeContent>
      <TimelineTime>Q1 2026</TimelineTime>
    </TimelineOppositeContent>
    <TimelineSeparator>
      <TimelinePoint status="success">
        <Rocket class="size-4" />
      </TimelinePoint>
      <TimelineConnector />
    </TimelineSeparator>
    <TimelineContent>
      <TimelineTitle>Nikala UI v1.0 Launch</TimelineTitle>
      <TimelineDescription>Official public release with 40+ primitives and Tailwind CSS v4 support.</TimelineDescription>
    </TimelineContent>
  </TimelineItem>

  <TimelineItem>
    <TimelineOppositeContent>
      <TimelineTime>Q2 2026</TimelineTime>
    </TimelineOppositeContent>
    <TimelineSeparator>
      <TimelinePoint status="primary">
        <Sparkles class="size-4" />
      </TimelinePoint>
      <TimelineConnector />
    </TimelineSeparator>
    <TimelineContent>
      <TimelineTitle>AI MCP Server Integration</TimelineTitle>
      <TimelineDescription>Context-aware Model Context Protocol tools for Cursor, Windsurf, and Claude.</TimelineDescription>
    </TimelineContent>
  </TimelineItem>

  <TimelineItem>
    <TimelineOppositeContent>
      <TimelineTime>Q3 2026</TimelineTime>
    </TimelineOppositeContent>
    <TimelineSeparator>
      <TimelinePoint status="muted">
        <GitBranch class="size-4" />
      </TimelinePoint>
    </TimelineSeparator>
    <TimelineContent>
      <TimelineTitle>Enterprise Template Suite</TimelineTitle>
      <TimelineDescription>Full-stack dashboard boilerplates with SSR authentication and TanStack table presets.</TimelineDescription>
    </TimelineContent>
  </TimelineItem>
</Timeline>`;

const horizontalCode = `<Timeline orientation="horizontal">
  <TimelineItem>
    <TimelineSeparator>
      <TimelinePoint status="success"><Check class="size-3.5" /></TimelinePoint>
      <TimelineConnector />
    </TimelineSeparator>
    <TimelineContent>
      <TimelineTitle class="text-xs">1. Build</TimelineTitle>
      <TimelineTime>24s</TimelineTime>
    </TimelineContent>
  </TimelineItem>

  <TimelineItem>
    <TimelineSeparator>
      <TimelinePoint status="success"><Check class="size-3.5" /></TimelinePoint>
      <TimelineConnector />
    </TimelineSeparator>
    <TimelineContent>
      <TimelineTitle class="text-xs">2. Unit Tests</TimelineTitle>
      <TimelineTime>12s</TimelineTime>
    </TimelineContent>
  </TimelineItem>

  <TimelineItem>
    <TimelineSeparator>
      <TimelinePoint status="primary"><Clock class="size-3.5" /></TimelinePoint>
      <TimelineConnector dashed />
    </TimelineSeparator>
    <TimelineContent>
      <TimelineTitle class="text-xs text-primary">3. Deploy</TimelineTitle>
      <TimelineTime>Running...</TimelineTime>
    </TimelineContent>
  </TimelineItem>

  <TimelineItem>
    <TimelineSeparator>
      <TimelinePoint status="muted"><Home class="size-3.5" /></TimelinePoint>
    </TimelineSeparator>
    <TimelineContent>
      <TimelineTitle class="text-xs text-muted-foreground">4. Production</TimelineTitle>
      <TimelineTime>Queued</TimelineTime>
    </TimelineContent>
  </TimelineItem>
</Timeline>`;

export function TimelineHeroDemo() {
  return (
    <div class="w-full max-w-lg p-2">
      <Timeline>
        <TimelineItem>
          <TimelineSeparator>
            <TimelinePoint status="success">
              <Check class="size-4" />
            </TimelinePoint>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <div class="flex items-center justify-between gap-2">
              <TimelineTitle>Order Placed</TimelineTitle>
              <TimelineTime>Oct 14, 09:30 AM</TimelineTime>
            </div>
            <TimelineDescription>Your order #NK-9281 has been received and logged.</TimelineDescription>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <TimelinePoint status="success">
              <CreditCard class="size-4" />
            </TimelinePoint>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <div class="flex items-center justify-between gap-2">
              <TimelineTitle>Payment Confirmed</TimelineTitle>
              <TimelineTime>Oct 14, 09:32 AM</TimelineTime>
            </div>
            <TimelineDescription>Payment of $149.00 processed via Stripe.</TimelineDescription>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <TimelinePoint status="primary">
              <Package class="size-4" />
            </TimelinePoint>
            <TimelineConnector dashed />
          </TimelineSeparator>
          <TimelineContent>
            <div class="flex items-center justify-between gap-2">
              <TimelineTitle class="text-primary">Fulfillment & Packaging</TimelineTitle>
              <Badge variant="outline" class="text-[10px] h-5">In Progress</Badge>
            </div>
            <TimelineDescription>Items packed at Tbilisi Logistics Hub.</TimelineDescription>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <TimelinePoint status="muted">
              <Truck class="size-4" />
            </TimelinePoint>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <div class="flex items-center justify-between gap-2">
              <TimelineTitle class="text-muted-foreground">Out for Delivery</TimelineTitle>
              <TimelineTime>Pending</TimelineTime>
            </div>
            <TimelineDescription>Courier dispatch scheduled for tomorrow morning.</TimelineDescription>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  );
}

export function TimelineAlternateDemo() {
  return (
    <div class="w-full max-w-2xl p-2">
      <Timeline align="alternate">
        <TimelineItem>
          <TimelineOppositeContent>
            <TimelineTime>Q1 2026</TimelineTime>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelinePoint status="success">
              <Rocket class="size-4" />
            </TimelinePoint>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <TimelineTitle>Nikala UI v1.0 Launch</TimelineTitle>
            <TimelineDescription>Official public release with 40+ primitives and Tailwind CSS v4 support.</TimelineDescription>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent>
            <TimelineTime>Q2 2026</TimelineTime>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelinePoint status="primary">
              <Sparkles class="size-4" />
            </TimelinePoint>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <TimelineTitle>AI MCP Server Integration</TimelineTitle>
            <TimelineDescription>Context-aware Model Context Protocol tools for Cursor, Windsurf, and Claude.</TimelineDescription>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent>
            <TimelineTime>Q3 2026</TimelineTime>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelinePoint status="muted">
              <GitBranch class="size-4" />
            </TimelinePoint>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <TimelineTitle>Enterprise Template Suite</TimelineTitle>
            <TimelineDescription>Full-stack dashboard boilerplates with SSR authentication and TanStack table presets.</TimelineDescription>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  );
}

export default function TimelineDocsPage() {
  return (
    <>
      <Seo
        title="Timeline Component"
        description="A responsive chronological event timeline supporting vertical, horizontal, and alternating layouts."
        path="/docs/components/timeline"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="Timeline"
          badge="compound"
          description="A compound chronological display for event streams, activity logs, order tracking, and multi-step workflows."
        />

        {/* Hero Live Preview */}
        <ComponentPreview name="timeline" code={defaultCode}>
          <TimelineHeroDemo />
        </ComponentPreview>

        {/* Usage & Import */}
        <div class="space-y-4">
          <DocSectionHeader title="Usage" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        {/* Examples */}
        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          {/* Alternate Layout */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Alternating Layout</h3>
            <p class="text-sm text-muted-foreground">
              Use <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">align="alternate"</code> with <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">TimelineOppositeContent</code> to render milestones alternately on the left and right sides.
            </p>
            <ComponentPreview name="timeline" code={alternateCode}>
              <TimelineAlternateDemo />
            </ComponentPreview>
          </div>

          {/* Horizontal Layout */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Horizontal Pipeline</h3>
            <p class="text-sm text-muted-foreground">
              Set <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">orientation="horizontal"</code> for step-by-step progress bars and deployment pipelines.
            </p>
            <ComponentPreview name="timeline" code={horizontalCode}>
              <div class="w-full max-w-xl p-4">
                <Timeline orientation="horizontal">
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelinePoint status="success"><Check class="size-3.5" /></TimelinePoint>
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                      <TimelineTitle class="text-xs">1. Build</TimelineTitle>
                      <TimelineTime>24s</TimelineTime>
                    </TimelineContent>
                  </TimelineItem>

                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelinePoint status="success"><Check class="size-3.5" /></TimelinePoint>
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                      <TimelineTitle class="text-xs">2. Tests</TimelineTitle>
                      <TimelineTime>12s</TimelineTime>
                    </TimelineContent>
                  </TimelineItem>

                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelinePoint status="primary"><Clock class="size-3.5" /></TimelinePoint>
                      <TimelineConnector dashed />
                    </TimelineSeparator>
                    <TimelineContent>
                      <TimelineTitle class="text-xs text-primary">3. Deploy</TimelineTitle>
                      <TimelineTime>Running</TimelineTime>
                    </TimelineContent>
                  </TimelineItem>

                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelinePoint status="muted"><Home class="size-3.5" /></TimelinePoint>
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                      <TimelineTitle class="text-xs text-muted-foreground">4. Live</TimelineTitle>
                      <TimelineTime>Queued</TimelineTime>
                    </TimelineContent>
                  </TimelineItem>
                </Timeline>
              </div>
            </ComponentPreview>
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="Timeline Components"
            items={[
              {
                prop: "Timeline",
                type: "Component<TimelineProps>",
                default: "-",
                description: "Root ordered list container managing orientation, alignment, and sizing context.",
              },
              {
                prop: "TimelineItem",
                type: "Component<TimelineItemProps>",
                default: "-",
                description: "Individual timeline event list item row.",
              },
              {
                prop: "TimelineSeparator",
                type: "Component<TimelineSeparatorProps>",
                default: "-",
                description: "Container grouping the status point dot and the connector line track.",
              },
              {
                prop: "TimelinePoint",
                type: "Component<TimelinePointProps>",
                default: "-",
                description: "Marker node supporting status ('default', 'primary', 'success', 'warning', 'destructive', 'muted') and variant ('default', 'solid', 'subtle', 'outline').",
              },
              {
                prop: "TimelineConnector",
                type: "Component<TimelineConnectorProps>",
                default: "-",
                description: "Connecting line track between items with optional dashed style.",
              },
              {
                prop: "TimelineContent",
                type: "Component<TimelineContentProps>",
                default: "-",
                description: "Main body container for event titles, descriptions, and metadata.",
              },
              {
                prop: "TimelineOppositeContent",
                type: "Component<TimelineOppositeContentProps>",
                default: "-",
                description: "Content placed on the opposite side of the timeline track in alternate layouts.",
              },
            ]}
          />
        </div>

        {/* Footer Navigation */}
        <DocNextSteps
          prev={{ title: "Table Component", href: "/docs/components/table" }}
          next={{ title: "Toast Component", href: "/docs/components/toast" }}
        />
      </div>
    </>
  );
}
