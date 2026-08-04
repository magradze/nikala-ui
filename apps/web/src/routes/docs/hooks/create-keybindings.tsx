// src/routes/docs/hooks/create-keybindings.tsx
import { createSignal } from "solid-js";
import { createKeybindings, createEscapeKey } from "@nikala-ui/hooks";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Kbd } from "@/components/ui/kbd";

const importCode = `import { createKeybindings, createEscapeKey } from "@nikala-ui/hooks";`;

const basicUsageCode = `const [lastAction, setLastAction] = createSignal("Press ⌘K or Esc");

createKeybindings([
  {
    key: ["meta+k", "ctrl+k"],
    handler: () => setLastAction("Triggered ⌘K / Ctrl+K!"),
    preventDefault: true,
  },
]);

createEscapeKey(() => {
  setLastAction("Triggered Escape Key!");
});`;

export function KeybindingsDemo() {
  const [lastAction, setLastAction] = createSignal("Press ⌘K / Ctrl+K or Esc");

  createKeybindings([
    {
      key: ["meta+k", "ctrl+k"],
      handler: () => setLastAction("Triggered ⌘K / Ctrl+K!"),
      preventDefault: true,
    },
  ]);

  createEscapeKey(() => {
    setLastAction("Triggered Escape Key!");
  });

  return (
    <div class="space-y-4 max-w-sm w-full min-h-[160px] flex flex-col items-center justify-center text-center">
      <div class="flex items-center gap-2">
        <Kbd class="text-xs">⌘K</Kbd>
        <span class="text-xs text-muted-foreground">or</span>
        <Kbd class="text-xs">Esc</Kbd>
      </div>

      <div class="p-3 rounded-lg border border-border bg-card w-full text-xs font-mono text-foreground shadow-xs">
        {lastAction()}
      </div>
    </div>
  );
}

export default function CreateKeybindingsDocPage() {
  return (
    <>
      <Seo
        title="createKeybindings & createEscapeKey Primitives"
        description="SolidJS reactive primitives for listening to keyboard shortcuts, key combinations, and Escape key presses."
        path="/docs/hooks/create-keybindings"
      />

      <div class="space-y-10 pb-16">
        {/* Page Header */}
        <DocPageHeader
          title="createKeybindings"
          badge="primitive"
          description="Reactive primitives for handling single or multi-key combinations (such as ⌘K, Ctrl+Shift+P) and Escape key interactions."
        />

        {/* Live Interactive Hero Preview */}
        <ComponentPreview name="create-keybindings" code={basicUsageCode}>
          <KeybindingsDemo />
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
            <h3 class="text-lg font-semibold tracking-tight">Keybindings & Escape Key</h3>
            <p class="text-sm text-muted-foreground">
              Pass key strings like <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">meta+k</code> or <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">ctrl+k</code> to trigger custom handlers.
            </p>
            <CodeBlock code={basicUsageCode} lang="tsx" />
          </div>
        </div>

        {/* API Reference */}
        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="KeybindingDefinition & Options"
            items={[
              {
                prop: "key",
                type: "string | string[]",
                default: "-",
                description: "Key string or array of key combination signatures (e.g. 'meta+k', 'ctrl+s', 'Escape').",
                required: true,
              },
              {
                prop: "handler",
                type: "(event: KeyboardEvent) => void",
                default: "-",
                description: "Callback invoked when matching key combination is triggered.",
                required: true,
              },
              {
                prop: "preventDefault",
                type: "boolean",
                default: "false",
                description: "Whether to call event.preventDefault() when triggered.",
              },
              {
                prop: "target",
                type: "HTMLElement | Window | Accessor<HTMLElement | Window | undefined>",
                default: "window",
                description: "Target element to attach key listeners to.",
              },
              {
                prop: "enabled",
                type: "boolean | Accessor<boolean>",
                default: "true",
                description: "Whether keybinding listeners are currently active.",
              },
            ]}
          />
        </div>

        {/* Footer Navigation */}
        <DocNextSteps
          prev={{ title: "createClipboard Primitive", href: "/docs/hooks/create-clipboard" }}
          next={{ title: "createLockScroll Primitive", href: "/docs/hooks/create-lock-scroll" }}
        />
      </div>
    </>
  );
}
