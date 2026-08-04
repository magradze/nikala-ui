import { createDocumentTitle } from "@nikala-ui/hooks";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSignal, onMount, Show } from "solid-js";

const importCode = `import { createDocumentTitle } from "@/hooks/create-document-title";`;

const basicUsageCode = `const [title, setTitle] = createSignal("New Title - Nikala UI");

createDocumentTitle(title, { restoreOnUnmount: true });

return (
  <div class="p-4 border rounded-lg space-y-3">
    <Input value={title()} onInput={(e) => setTitle(e.currentTarget.value)} />
    <p>Check browser tab title bar!</p>
  </div>
);`;

export function DocumentTitleDemo() {
  const [mounted, setMounted] = createSignal(false);
  onMount(() => setMounted(true));

  const [customTitle, setCustomTitle] = createSignal("⚡ Nikala UI - SolidJS");

  createDocumentTitle(customTitle, { restoreOnUnmount: true });

  const prefixes = ["🔥 (1) New Message", "⚡ Nikala UI - SolidJS", "🚀 Launching App...", "✨ Dashboard"];

  return (
    <Show when={mounted()} fallback={<div class="p-4 text-xs font-mono text-muted-foreground">Loading Title...</div>}>
      <div class="w-full max-w-sm p-5 rounded-lg border border-border bg-card space-y-4 shadow-sm">
        <div class="flex items-center justify-between">
          <span class="text-xs font-mono text-muted-foreground">Document Title Manager</span>
        </div>

        <div class="space-y-3">
          <div class="space-y-1">
            <label class="text-xs font-medium text-muted-foreground">Active Tab Title</label>
            <Input
              value={customTitle()}
              onInput={(e) => setCustomTitle(e.currentTarget.value)}
              placeholder="Type document title..."
            />
          </div>

          <div class="space-y-1 pt-1">
            <label class="text-xs font-medium text-muted-foreground">Quick Presets</label>
            <div class="grid grid-cols-2 gap-1.5">
              {prefixes.map((preset) => (
                <Button
                  size="sm"
                  variant="outline"
                  class="text-[11px] h-8 justify-start px-2.5 truncate"
                  onClick={() => setCustomTitle(preset)}
                >
                  {preset}
                </Button>
              ))}
            </div>
          </div>

          <div class="p-3 rounded-lg bg-muted/50 border border-border/50 space-y-0.5">
            <span class="text-[10px] text-muted-foreground uppercase font-mono">Current document.title</span>
            <div class="text-xs font-mono font-semibold text-foreground truncate">
              {typeof document !== "undefined" ? document.title : customTitle()}
            </div>
          </div>
        </div>
      </div>
    </Show>
  );
}

export default function CreateDocumentTitleDocPage() {
  return (
    <>
      <Seo
        title="createDocumentTitle Primitive"
        description="SolidJS reactive primitive for managing document title dynamically."
        path="/docs/hooks/create-document-title"
      />

      <div class="space-y-10 pb-16">
        <DocPageHeader
          title="createDocumentTitle"
          badge="primitive"
          description="Reactive primitive for dynamically updating browser tab title with support for automatic restoration on component unmount."
        />

        <ComponentPreview isHook name="create-document-title" code={basicUsageCode}>
          <DocumentTitleDemo />
        </ComponentPreview>

        <div class="space-y-4">
          <DocSectionHeader title="Import" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Dynamic Page Title Management</h3>
            <p class="text-sm text-muted-foreground">
              Pass a static string or reactive signal accessor to <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">createDocumentTitle(title)</code>.
            </p>
            <CodeBlock code={basicUsageCode} lang="tsx" />
          </div>
        </div>

        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="CreateDocumentTitleOptions"
            items={[
              {
                prop: "restoreOnUnmount",
                type: "boolean",
                default: "true",
                description: "Whether to reset document.title to its previous value when component unmounts.",
              },
            ]}
          />
        </div>

        <DocNextSteps
          prev={{ title: "createWebSocket Primitive", href: "/docs/hooks/create-websocket" }}
          next={{ title: "createFavicon Primitive", href: "/docs/hooks/create-favicon" }}
        />
      </div>
    </>
  );
}
