import { Component } from "solid-js";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Seo } from "@/components/seo";
import {
  Stat,
  StatGroup,
  StatHeader,
  StatLabel,
  StatIcon,
  StatValue,
  StatUnit,
  StatTrend,
  StatHelpText,
} from "@/components/ui/stat";
import {
  DollarSign,
  Users,
  CreditCard,
  Activity,
  Zap,
  ShieldCheck,
  Clock,
  Sparkles,
} from "lucide-solid";

/* Code Snippets for Previews */
const importCode = `import {
  Stat,
  StatGroup,
  StatHeader,
  StatLabel,
  StatIcon,
  StatValue,
  StatUnit,
  StatTrend,
  StatHelpText,
} from "@/components/ui/stat";`;

const defaultCode = `<StatGroup columns={4}>
  <Stat>
    <StatHeader>
      <StatLabel>Total Revenue</StatLabel>
      <StatIcon>
        <DollarSign class="size-4" />
      </StatIcon>
    </StatHeader>
    <StatValue>
      <StatUnit>$</StatUnit>
      <span>45,231.89</span>
    </StatValue>
    <StatHelpText>
      <StatTrend type="up">+20.1%</StatTrend>
      <span>vs last month</span>
    </StatHelpText>
  </Stat>

  <Stat>
    <StatHeader>
      <StatLabel>Subscriptions</StatLabel>
      <StatIcon>
        <Users class="size-4" />
      </StatIcon>
    </StatHeader>
    <StatValue>+2,350</StatValue>
    <StatHelpText>
      <StatTrend type="up">+180.1%</StatTrend>
      <span>vs last month</span>
    </StatHelpText>
  </Stat>

  <Stat>
    <StatHeader>
      <StatLabel>Sales Count</StatLabel>
      <StatIcon>
        <CreditCard class="size-4" />
      </StatIcon>
    </StatHeader>
    <StatValue>12,234</StatValue>
    <StatHelpText>
      <StatTrend type="up">+19%</StatTrend>
      <span>vs last month</span>
    </StatHelpText>
  </Stat>

  <Stat>
    <StatHeader>
      <StatLabel>Active Now</StatLabel>
      <StatIcon>
        <Activity class="size-4" />
      </StatIcon>
    </StatHeader>
    <StatValue>+573</StatValue>
    <StatHelpText>
      <StatTrend type="down">-4.2%</StatTrend>
      <span>vs last hour</span>
    </StatHelpText>
  </Stat>
</StatGroup>`;

const heroStatsCode = `<div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center p-8 rounded-lg border border-border bg-card">
  <Stat variant="ghost" class="items-center">
    <StatValue class="text-3xl sm:text-4xl text-primary font-extrabold">100k+</StatValue>
    <StatLabel class="text-sm font-medium mt-1">Active Developers</StatLabel>
    <div class="text-xs text-muted-foreground mt-0.5">Worldwide community</div>
  </Stat>

  <Stat variant="ghost" class="items-center">
    <StatValue class="text-3xl sm:text-4xl text-primary font-extrabold">99.99%</StatValue>
    <StatLabel class="text-sm font-medium mt-1">Uptime SLA</StatLabel>
    <div class="text-xs text-muted-foreground mt-0.5">Enterprise reliability</div>
  </Stat>

  <Stat variant="ghost" class="items-center">
    <StatValue class="text-3xl sm:text-4xl text-primary font-extrabold">40+</StatValue>
    <StatLabel class="text-sm font-medium mt-1">Reactive Hooks</StatLabel>
    <div class="text-xs text-muted-foreground mt-0.5">SolidJS fine-grained</div>
  </Stat>

  <Stat variant="ghost" class="items-center">
    <StatValue class="text-3xl sm:text-4xl text-primary font-extrabold">&lt; 1ms</StatValue>
    <StatLabel class="text-sm font-medium mt-1">Signal Latency</StatLabel>
    <div class="text-xs text-muted-foreground mt-0.5">Zero VDOM overhead</div>
  </Stat>
</div>`;

const variantsCode = `<StatGroup columns={3}>
  {/* 1. Default Card */}
  <Stat variant="default">
    <StatHeader>
      <StatLabel>Monthly Active</StatLabel>
      <StatIcon><Users class="size-4" /></StatIcon>
    </StatHeader>
    <StatValue>84,200</StatValue>
    <StatHelpText>
      <StatTrend type="up">+14.2%</StatTrend>
      <span>Default card style</span>
    </StatHelpText>
  </Stat>

  {/* 2. Flat Style */}
  <Stat variant="flat">
    <StatHeader>
      <StatLabel>API Requests</StatLabel>
      <StatIcon><Zap class="size-4" /></StatIcon>
    </StatHeader>
    <StatValue>1.4M</StatValue>
    <StatHelpText>
      <StatTrend type="neutral">0.0%</StatTrend>
      <span>Flat muted background</span>
    </StatHelpText>
  </Stat>

  {/* 3. Bordered Style */}
  <Stat variant="bordered">
    <StatHeader>
      <StatLabel>Error Rate</StatLabel>
      <StatIcon><ShieldCheck class="size-4" /></StatIcon>
    </StatHeader>
    <StatValue>
      <span>0.02</span>
      <StatUnit>%</StatUnit>
    </StatValue>
    <StatHelpText>
      <StatTrend type="down">-0.8%</StatTrend>
      <span>Bordered high-contrast</span>
    </StatHelpText>
  </Stat>
</StatGroup>`;

export default function StatDocPage() {
  return (
    <>
      <Seo
        title="Stat / Metric Component — SolidJS Tailwind v4"
        description="Display key performance indicators, statistics, financial data, and metrics with trends and icons in SolidJS."
        path="/docs/components/stat"
      />

      <div class="space-y-10 pb-16">
        <DocPageHeader
          title="Stat / Metric"
          badge="Data Display"
          description="Display key metrics, KPIs, financial data, and performance statistics with trends, icons, and units."
        />

        {/* Hero Preview */}
        <ComponentPreview name="stat" code={defaultCode} allowOverflow={true}>
          <div class="w-full max-w-4xl p-2">
            <StatGroup columns={4}>
              <Stat>
                <StatHeader>
                  <StatLabel>Total Revenue</StatLabel>
                  <StatIcon>
                    <DollarSign class="size-4" />
                  </StatIcon>
                </StatHeader>
                <StatValue>
                  <StatUnit>$</StatUnit>
                  <span>45,231.89</span>
                </StatValue>
                <StatHelpText>
                  <StatTrend type="up">+20.1%</StatTrend>
                  <span>vs last month</span>
                </StatHelpText>
              </Stat>

              <Stat>
                <StatHeader>
                  <StatLabel>Subscriptions</StatLabel>
                  <StatIcon>
                    <Users class="size-4" />
                  </StatIcon>
                </StatHeader>
                <StatValue>+2,350</StatValue>
                <StatHelpText>
                  <StatTrend type="up">+180.1%</StatTrend>
                  <span>vs last month</span>
                </StatHelpText>
              </Stat>

              <Stat>
                <StatHeader>
                  <StatLabel>Sales Count</StatLabel>
                  <StatIcon>
                    <CreditCard class="size-4" />
                  </StatIcon>
                </StatHeader>
                <StatValue>12,234</StatValue>
                <StatHelpText>
                  <StatTrend type="up">+19%</StatTrend>
                  <span>vs last month</span>
                </StatHelpText>
              </Stat>

              <Stat>
                <StatHeader>
                  <StatLabel>Active Now</StatLabel>
                  <StatIcon>
                    <Activity class="size-4" />
                  </StatIcon>
                </StatHeader>
                <StatValue>+573</StatValue>
                <StatHelpText>
                  <StatTrend type="down">-4.2%</StatTrend>
                  <span>vs last hour</span>
                </StatHelpText>
              </Stat>
            </StatGroup>
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

          {/* Example 1: Hero Social Proof Stats */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Hero Social Proof Stats</h3>
            <p class="text-sm text-muted-foreground">
              Center-aligned stats for marketing hero sections and product landing pages.
            </p>
            <ComponentPreview name="stat" code={heroStatsCode} allowOverflow={true}>
              <div class="w-full max-w-4xl p-2">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center p-6 sm:p-8 rounded-lg border border-border bg-card shadow-2xs">
                  <Stat variant="ghost" class="items-center">
                    <StatValue class="text-3xl sm:text-4xl text-primary font-extrabold">100k+</StatValue>
                    <StatLabel class="text-sm font-medium mt-1">Active Developers</StatLabel>
                    <div class="text-xs text-muted-foreground mt-0.5">Worldwide community</div>
                  </Stat>

                  <Stat variant="ghost" class="items-center">
                    <StatValue class="text-3xl sm:text-4xl text-primary font-extrabold">99.99%</StatValue>
                    <StatLabel class="text-sm font-medium mt-1">Uptime SLA</StatLabel>
                    <div class="text-xs text-muted-foreground mt-0.5">Enterprise reliability</div>
                  </Stat>

                  <Stat variant="ghost" class="items-center">
                    <StatValue class="text-3xl sm:text-4xl text-primary font-extrabold">40+</StatValue>
                    <StatLabel class="text-sm font-medium mt-1">Reactive Hooks</StatLabel>
                    <div class="text-xs text-muted-foreground mt-0.5">SolidJS fine-grained</div>
                  </Stat>

                  <Stat variant="ghost" class="items-center">
                    <StatValue class="text-3xl sm:text-4xl text-primary font-extrabold">&lt; 1ms</StatValue>
                    <StatLabel class="text-sm font-medium mt-1">Signal Latency</StatLabel>
                    <div class="text-xs text-muted-foreground mt-0.5">Zero VDOM overhead</div>
                  </Stat>
                </div>
              </div>
            </ComponentPreview>
          </div>

          {/* Example 2: Style Variants */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Visual Style Variants</h3>
            <p class="text-sm text-muted-foreground">
              Choose between <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">default</code>, <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">flat</code>, and <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">bordered</code> card presentations.
            </p>
            <ComponentPreview name="stat" code={variantsCode} allowOverflow={true}>
              <div class="w-full max-w-4xl p-2">
                <StatGroup columns={3}>
                  <Stat variant="default">
                    <StatHeader>
                      <StatLabel>Monthly Active</StatLabel>
                      <StatIcon><Users class="size-4" /></StatIcon>
                    </StatHeader>
                    <StatValue>84,200</StatValue>
                    <StatHelpText>
                      <StatTrend type="up">+14.2%</StatTrend>
                      <span>Default card style</span>
                    </StatHelpText>
                  </Stat>

                  <Stat variant="flat">
                    <StatHeader>
                      <StatLabel>API Requests</StatLabel>
                      <StatIcon><Zap class="size-4" /></StatIcon>
                    </StatHeader>
                    <StatValue>1.4M</StatValue>
                    <StatHelpText>
                      <StatTrend type="neutral">0.0%</StatTrend>
                      <span>Flat muted background</span>
                    </StatHelpText>
                  </Stat>

                  <Stat variant="bordered">
                    <StatHeader>
                      <StatLabel>Error Rate</StatLabel>
                      <StatIcon><ShieldCheck class="size-4" /></StatIcon>
                    </StatHeader>
                    <StatValue>
                      <span>0.02</span>
                      <StatUnit>%</StatUnit>
                    </StatValue>
                    <StatHelpText>
                      <StatTrend type="down">-0.8%</StatTrend>
                      <span>Bordered high-contrast</span>
                    </StatHelpText>
                  </Stat>
                </StatGroup>
              </div>
            </ComponentPreview>
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-4">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="Stat"
            description="Root card container for an individual statistic."
            items={[
              {
                prop: "variant",
                type: '"default" | "flat" | "bordered" | "ghost"',
                default: '"default"',
                description: "Visual appearance style variant.",
              },
              {
                prop: "class",
                type: "string",
                default: "undefined",
                description: "Additional CSS classes.",
              },
            ]}
          />

          <DocApiTable
            title="StatGroup"
            description="Responsive grid container holding multiple Stat cards."
            items={[
              {
                prop: "columns",
                type: "1 | 2 | 3 | 4 | 5",
                default: "4",
                description: "Number of grid columns on desktop viewports.",
              },
              {
                prop: "class",
                type: "string",
                default: "undefined",
                description: "Additional CSS classes.",
              },
            ]}
          />

          <DocApiTable
            title="StatTrend"
            description="Indicator text showing percentage growth, decline, or neutral trend without heavy background."
            items={[
              {
                prop: "type",
                type: '"up" | "down" | "neutral"',
                default: '"up"',
                description: "Trend direction controlling color tokens and icon.",
              },
              {
                prop: "hideIcon",
                type: "boolean",
                default: "false",
                description: "Hides the trending up / down chevron arrow icon.",
              },
              {
                prop: "class",
                type: "string",
                default: "undefined",
                description: "Additional CSS classes.",
              },
            ]}
          />

          <DocApiTable
            title="StatValue"
            description="Main numerical or textual metric display."
            items={[
              {
                prop: "class",
                type: "string",
                default: "undefined",
                description: "Additional CSS classes.",
              },
            ]}
          />

          <DocApiTable
            title="StatUnit"
            description="Prefix or suffix symbol container (e.g. $, %, /mo, ms)."
            items={[
              {
                prop: "class",
                type: "string",
                default: "undefined",
                description: "Additional CSS classes.",
              },
            ]}
          />

          <DocApiTable
            title="StatHeader"
            description="Top flex row holding the label and optional icon."
            items={[
              {
                prop: "class",
                type: "string",
                default: "undefined",
                description: "Additional CSS classes.",
              },
            ]}
          />

          <DocApiTable
            title="StatLabel"
            description="Small descriptive title for the metric."
            items={[
              {
                prop: "class",
                type: "string",
                default: "undefined",
                description: "Additional CSS classes.",
              },
            ]}
          />

          <DocApiTable
            title="StatIcon"
            description="Small subtle container for metric iconography."
            items={[
              {
                prop: "class",
                type: "string",
                default: "undefined",
                description: "Additional CSS classes.",
              },
            ]}
          />

          <DocApiTable
            title="StatHelpText"
            description="Bottom row with justify-between alignment for trend and contextual notes."
            items={[
              {
                prop: "class",
                type: "string",
                default: "undefined",
                description: "Additional CSS classes.",
              },
            ]}
          />
        </div>

        {/* Next Steps */}
        <DocNextSteps
          prev={{
            title: "Footer",
            href: "/docs/components/footer",
          }}
          next={{
            title: "Timeline",
            href: "/docs/components/timeline",
          }}
        />
      </div>
    </>
  );
}
