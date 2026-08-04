import { createSignal } from "solid-js";
import { createFullscreen } from "@nikala-ui/hooks";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";

const importCode = `import { createFullscreen } from "@/hooks/create-fullscreen";`;

const basicUsageCode = `const [boxRef, setBoxRef] = createSignal<HTMLDivElement>();
const { isFullscreen, toggle } = createFullscreen({ target: boxRef });

return (
  <div ref={setBoxRef} class="p-6 border rounded-lg bg-card text-center space-y-4">
    <p>Fullscreen status: {isFullscreen() ? "Active" : "Inactive"}</p>
    <button onClick={toggle} class="px-4 py-2 bg-primary text-primary-foreground rounded-md">
      Toggle Fullscreen
    </button>
  </div>
);`;

export function FullscreenDemo() {
  const [containerRef, setContainerRef] = createSignal<HTMLDivElement>();
  const { isFullscreen, toggle, enter, exit } = createFullscreen({ target: containerRef });

  return (
    <div
      ref={setContainerRef}
      class={`flex flex-col items-center justify-center p-6 rounded-lg border transition-all ${
        isFullscreen()
          ? "bg-card text-card-foreground w-full h-full min-h-[300px]"
          : "bg-background text-foreground max-w-sm w-full"
      }`}
    >
      <div class="space-y-4 text-center">
        <div class="text-xs font-mono px-3 py-1 rounded-full border border-border inline-block bg-muted">
          Status: {isFullscreen() ? "FULLSCREEN ACTIVE" : "NORMAL VIEW"}
        </div>
        <div class="flex items-center justify-center gap-2">
          <button
            onClick={() => toggle()}
            class="rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {isFullscreen() ? "Exit Fullscreen" : "Enter Fullscreen"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CreateFullscreenDocPage() {
  return (
    <>
      <Seo
        title="createFullscreen Primitive"
        description="SolidJS reactive primitive for controlling fullscreen mode and tracking screen state."
        path="/docs/hooks/create-fullscreen"
      />

      <div class="space-y-10 pb-16">
        <DocPageHeader
          title="createFullscreen"
          badge="primitive"
          description="Reactive primitive for entering, exiting, toggling, and tracking element or document fullscreen status."
        />

        <ComponentPreview isHook name="create-fullscreen" code={basicUsageCode}>
          <FullscreenDemo />
        </ComponentPreview>

        <div class="space-y-4">
          <DocSectionHeader title="Import" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Toggle Element Fullscreen</h3>
            <p class="text-sm text-muted-foreground">
              Pass an element accessor to <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">createFullscreen({`{ target }`})</code> to control full screen mode for a specific container.
            </p>
            <CodeBlock code={basicUsageCode} lang="tsx" />
          </div>
        </div>

        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="CreateFullscreenOptions"
            items={[
              {
                prop: "target",
                type: "HTMLElement | Accessor<HTMLElement | undefined>",
                default: "document.documentElement",
                description: "Target HTML element to request fullscreen on.",
              },
              {
                prop: "onEnter",
                type: "() => void",
                default: "-",
                description: "Callback fired when full screen mode is engaged.",
              },
              {
                prop: "onExit",
                type: "() => void",
                default: "-",
                description: "Callback fired when full screen mode is exited.",
              },
            ]}
          />

          <DocApiTable
            title="CreateFullscreenReturn"
            items={[
              {
                prop: "isFullscreen",
                type: "Accessor<boolean>",
                default: "-",
                description: "Signal indicating whether fullscreen is active.",
              },
              {
                prop: "enter",
                type: "() => Promise<void>",
                default: "-",
                description: "Requests target element to enter fullscreen mode.",
              },
              {
                prop: "exit",
                type: "() => Promise<void>",
                default: "-",
                description: "Exits fullscreen mode.",
              },
              {
                prop: "toggle",
                type: "() => Promise<void>",
                default: "-",
                description: "Toggles between fullscreen and normal view.",
              },
            ]}
          />
        </div>

        <DocNextSteps
          prev={{ title: "createInfiniteScroll Primitive", href: "/docs/hooks/create-infinite-scroll" }}
          next={{ title: "createAudio Primitive", href: "/docs/hooks/create-audio" }}
        />
      </div>
    </>
  );
}
