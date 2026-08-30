// src/routes/docs/components/bubble.tsx
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import {
  Bubble,
  BubbleGroup,
  BubbleContent,
  BubbleReactions,
  BubbleReaction,
} from "@/components/ui/bubble";
import { createSignal } from "solid-js";

/* --- Code Snippets --- */
const importCode = `import {
  Bubble,
  BubbleGroup,
  BubbleContent,
  BubbleReactions,
  BubbleReaction,
} from "@/components/ui/bubble";`;

const defaultCode = `<div class="flex flex-col gap-3 w-full max-w-sm">
  {/* Primary Bubble (Sent) */}
  <div class="flex justify-end">
    <Bubble variant="default">
      <BubbleContent>Have you benchmarked the new createChatScroll hook?</BubbleContent>
    </Bubble>
  </div>

  {/* Muted Bubble (Received) */}
  <div class="flex justify-start">
    <Bubble variant="muted">
      <BubbleContent>Yes! Zero hydration overhead and buttery smooth 60fps scrolling.</BubbleContent>
      <BubbleReactions>
        <BubbleReaction count={4} active>⚡</BubbleReaction>
        <BubbleReaction count={2}>🔥</BubbleReaction>
      </BubbleReactions>
    </Bubble>
  </div>
</div>`;

const variantsCode = `<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
  <Bubble variant="default">
    <BubbleContent>Primary / Sent Message</BubbleContent>
  </Bubble>

  <Bubble variant="muted">
    <BubbleContent>Muted / Received Message</BubbleContent>
  </Bubble>

  <Bubble variant="outline">
    <BubbleContent>Outline / Card Message</BubbleContent>
  </Bubble>

  <Bubble variant="ghost">
    <BubbleContent>Ghost / Minimal Message</BubbleContent>
  </Bubble>
</div>`;

export default function BubbleDocPage() {
  const [activeReaction, setActiveReaction] = createSignal(true);
  const [reactionCount, setReactionCount] = createSignal(4);

  const toggleReaction = () => {
    if (activeReaction()) {
      setActiveReaction(false);
      setReactionCount((c) => c - 1);
    } else {
      setActiveReaction(true);
      setReactionCount((c) => c + 1);
    }
  };

  return (
    <>
      <Seo
        title="Bubble Component"
        description="Chat message bubble container supporting variants, grouped consecutive bubbles, and emoji reactions for SolidJS."
        path="/docs/components/bubble"
      />

      <div class="space-y-10 pb-16">
        {/* 1. Page Header */}
        <DocPageHeader
          title="Bubble"
          badge="Compound Component"
          description="A chat bubble container supporting multiple visual variants, grouped messages from the same sender, and interactive emoji reaction pills."
        />

        {/* 2. Main Hero Preview */}
        <ComponentPreview name="bubble" code={defaultCode}>
          <div class="flex items-center justify-center p-6 sm:p-10 w-full">
            <div class="flex flex-col gap-4 w-full max-w-sm">
              <div class="flex justify-end">
                <Bubble variant="default">
                  <BubbleContent>Have you benchmarked the new createChatScroll hook?</BubbleContent>
                </Bubble>
              </div>

              <div class="flex justify-start">
                <Bubble variant="muted">
                  <BubbleContent>Yes! Zero hydration overhead and buttery smooth 60fps scrolling.</BubbleContent>
                  <BubbleReactions>
                    <BubbleReaction
                      count={reactionCount()}
                      active={activeReaction()}
                      onClick={toggleReaction}
                    >
                      ⚡
                    </BubbleReaction>
                    <BubbleReaction count={2}>🔥</BubbleReaction>
                  </BubbleReactions>
                </Bubble>
              </div>
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

          {/* Visual Variants */}
          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Visual Variants</h3>
            <p class="text-sm text-muted-foreground">
              Choose from <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">default</code>, <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">muted</code>, <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">outline</code>, and <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">ghost</code> styles.
            </p>
            <ComponentPreview name="bubble" code={variantsCode}>
              <div class="flex items-center justify-center p-6 w-full">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
                  <Bubble variant="default">
                    <BubbleContent>Primary / Sent Message</BubbleContent>
                  </Bubble>

                  <Bubble variant="muted">
                    <BubbleContent>Muted / Received Message</BubbleContent>
                  </Bubble>

                  <Bubble variant="outline">
                    <BubbleContent>Outline / Card Message</BubbleContent>
                  </Bubble>

                  <Bubble variant="ghost">
                    <BubbleContent>Ghost / Minimal Message</BubbleContent>
                  </Bubble>
                </div>
              </div>
            </ComponentPreview>
          </div>
        </div>

        {/* 5. API Reference */}
        <div class="space-y-6 pt-4">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="Bubble"
            items={[
              {
                prop: "variant",
                type: '"default" | "muted" | "outline" | "ghost"',
                default: '"default"',
                description: "Visual appearance and background token of the bubble.",
              },
              {
                prop: "size",
                type: '"default" | "sm" | "lg"',
                default: '"default"',
                description: "Padding and font-size of the bubble container.",
              },
            ]}
          />

          <DocApiTable
            title="BubbleReaction"
            items={[
              {
                prop: "active",
                type: "boolean",
                default: "false",
                description: "Indicates whether the current user has reacted with this emoji.",
              },
              {
                prop: "count",
                type: "number",
                default: "undefined",
                description: "Total number of reactions received for this emoji badge.",
              },
            ]}
          />
        </div>

        {/* 6. Footer Navigation */}
        <DocNextSteps
          prev={{ title: "Message Component", href: "/docs/components/message" }}
          next={{ title: "Marker Component", href: "/docs/components/marker" }}
        />
      </div>
    </>
  );
}
