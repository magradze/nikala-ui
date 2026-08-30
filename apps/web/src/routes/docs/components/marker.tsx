// src/routes/docs/components/marker.tsx
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import {
  Marker,
  MarkerContent,
  MarkerTyping,
  MarkerDate,
} from "@/components/ui/marker";

/* --- Code Snippets --- */
const importCode = `import {
  Marker,
  MarkerContent,
  MarkerTyping,
  MarkerDate,
} from "@/components/ui/marker";`;

const defaultCode = `<div class="flex flex-col gap-4 w-full max-w-sm">
  {/* Date Divider Marker */}
  <MarkerDate date="Today, 3:45 PM" />

  {/* System Status Event Marker */}
  <Marker role="status">
    <MarkerContent>
      <span>🚀 Release v1.3.0 deployed to edge servers</span>
    </MarkerContent>
  </Marker>

  {/* Live Typing Indicator Marker */}
  <Marker role="status">
    <MarkerTyping name="Nikala Bot" />
  </Marker>
</div>`;

const typingCode = `<div class="space-y-3 w-full max-w-xs">
  <MarkerTyping name="Giorgi" />
  <MarkerTyping name="Claude Assistant" />
  <MarkerTyping />
</div>`;

export default function MarkerDocPage() {
  return (
    <>
      <Seo
        title="Marker Component"
        description="System chat events, date dividers, and live typing indicator badges for SolidJS."
        path="/docs/components/marker"
      />

      <div class="space-y-10 pb-16">
        {/* 1. Page Header */}
        <DocPageHeader
          title="Marker"
          badge="Compound Component"
          description="System event indicators, date timeline dividers, and live animated typing indicators for chat interfaces."
        />

        {/* 2. Main Hero Preview */}
        <ComponentPreview name="marker" code={defaultCode}>
          <div class="flex items-center justify-center p-6 sm:p-10 w-full">
            <div class="flex flex-col gap-4 w-full max-w-sm">
              <MarkerDate date="Today, 3:45 PM" />

              <Marker role="status">
                <MarkerContent>
                  <span>🚀 Release v1.3.0 deployed to edge servers</span>
                </MarkerContent>
              </Marker>

              <Marker role="status">
                <MarkerTyping name="Nikala Bot" />
              </Marker>
            </div>
          </div>
        </ComponentPreview>

        {/* 3. Usage & Import */}
        <div class="space-y-4">
          <DocSectionHeader title="Usage" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        {/* 4. Examples */}
        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          {/* Typing Indicators */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Typing Indicators</h3>
            <p class="text-sm text-muted-foreground">
              Display live typing animations with optional sender labels.
            </p>
            <ComponentPreview name="marker" code={typingCode}>
              <div class="flex flex-col items-center justify-center p-6 w-full space-y-3">
                <MarkerTyping name="Giorgi" />
                <MarkerTyping name="Claude Assistant" />
                <MarkerTyping />
              </div>
            </ComponentPreview>
          </div>
        </div>

        {/* 5. API Reference */}
        <div class="space-y-6 pt-4">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="MarkerDate"
            items={[
              {
                prop: "date",
                type: "string",
                default: "undefined",
                description: "The formatted date string to display inside the horizontal divider.",
              },
            ]}
          />

          <DocApiTable
            title="MarkerTyping"
            items={[
              {
                prop: "name",
                type: "string",
                default: "undefined",
                description: 'Optional name of the user or agent typing (e.g. "Giorgi is typing...").',
              },
            ]}
          />
        </div>

        {/* 6. Footer Navigation */}
        <DocNextSteps
          prev={{ title: "Bubble Component", href: "/docs/components/bubble" }}
          next={{ title: "Pagination Component", href: "/docs/components/pagination" }}
        />
      </div>
    </>
  );
}
