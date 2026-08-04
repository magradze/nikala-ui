import { createFavicon } from "@nikala-ui/hooks";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";
import { createSignal, onMount, Show } from "solid-js";

const importCode = `import { createFavicon } from "@nikala-ui/hooks";`;

const basicUsageCode = `const [icon, setIcon] = createSignal("/favicon.ico");

createFavicon(icon, { restoreOnUnmount: true });

return (
  <div class="flex gap-2">
    <Button onClick={() => setIcon("/favicon-red.ico")}>Red Favicon</Button>
    <Button onClick={() => setIcon("/favicon.ico")}>Default Favicon</Button>
  </div>
);`;

const greenSvgIcon = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="%2310b981"/></svg>`;
const redSvgIcon = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="%23ef4444"/></svg>`;
const blueSvgIcon = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="%233b82f6"/></svg>`;

export function FaviconDemo() {
  const [mounted, setMounted] = createSignal(false);
  onMount(() => setMounted(true));

  const [activeIcon, setActiveIcon] = createSignal(blueSvgIcon);
  const [activeColor, setActiveColor] = createSignal("Blue");

  createFavicon(activeIcon, { restoreOnUnmount: true });

  const setFavicon = (icon: string, color: string) => {
    setActiveIcon(icon);
    setActiveColor(color);
  };

  return (
    <Show when={mounted()} fallback={<div class="p-4 text-xs font-mono text-muted-foreground">Loading Favicon...</div>}>
      <div class="w-full max-w-sm p-5 rounded-lg border border-border bg-card space-y-4 shadow-sm">
        <div class="flex items-center justify-between">
          <span class="text-xs font-mono text-muted-foreground">Favicon Manager</span>
        </div>

        <div class="space-y-3">
          <div class="p-3.5 rounded-lg bg-muted/50 border border-border/50 flex items-center gap-3">
            <div class="size-8 rounded-lg bg-background border border-border flex items-center justify-center p-1.5 shadow-xs">
              <img src={activeIcon()} alt="Active Favicon" class="size-full" />
            </div>
            <div class="space-y-0.5">
              <div class="text-xs font-semibold text-foreground">Active Theme: {activeColor()}</div>
              <div class="text-[10px] text-muted-foreground font-mono">Updates tab favicon dynamically</div>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-2">
            <Button
              size="sm"
              variant={activeColor() === "Blue" ? "default" : "outline"}
              onClick={() => setFavicon(blueSvgIcon, "Blue")}
            >
              Blue 🔵
            </Button>
            <Button
              size="sm"
              variant={activeColor() === "Green" ? "default" : "outline"}
              onClick={() => setFavicon(greenSvgIcon, "Green")}
            >
              Green 🟢
            </Button>
            <Button
              size="sm"
              variant={activeColor() === "Red" ? "default" : "outline"}
              onClick={() => setFavicon(redSvgIcon, "Red")}
            >
              Red 🔴
            </Button>
          </div>
        </div>
      </div>
    </Show>
  );
}

export default function CreateFaviconDocPage() {
  return (
    <>
      <Seo
        title="createFavicon Primitive"
        description="SolidJS reactive primitive for dynamically updating browser favicon element."
        path="/docs/hooks/create-favicon"
      />

      <div class="space-y-10 pb-16">
        <DocPageHeader
          title="createFavicon"
          badge="primitive"
          description="Reactive primitive for dynamically altering browser favicon images, SVG icons, or data URIs with automatic restoration on unmount."
        />

        <ComponentPreview isHook name="create-favicon" code={basicUsageCode}>
          <FaviconDemo />
        </ComponentPreview>

        <div class="space-y-4">
          <DocSectionHeader title="Import" />
          <CodeBlock code={importCode} lang="tsx" />
        </div>

        <div class="space-y-8 pt-4">
          <DocSectionHeader title="Examples" />

          <div class="space-y-3">
            <h3 class="text-lg font-semibold tracking-tight">Dynamic Favicon Management</h3>
            <p class="text-sm text-muted-foreground">
              Pass a static icon URL or reactive signal accessor to <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">createFavicon(href)</code>.
            </p>
            <CodeBlock code={basicUsageCode} lang="tsx" />
          </div>
        </div>

        <div class="space-y-6 pt-6">
          <DocSectionHeader title="API Reference" />

          <DocApiTable
            title="CreateFaviconOptions"
            items={[
              {
                prop: "rel",
                type: "string",
                default: "'icon'",
                description: "HTML link element rel attribute selector value.",
              },
              {
                prop: "type",
                type: "string",
                default: "-",
                description: "Mime-type format of the icon (e.g. 'image/svg+xml').",
              },
              {
                prop: "restoreOnUnmount",
                type: "boolean",
                default: "true",
                description: "Whether to restore original favicon when component unmounts.",
              },
            ]}
          />
        </div>

        <DocNextSteps
          prev={{ title: "createDocumentTitle Primitive", href: "/docs/hooks/create-document-title" }}
          next={{ title: "createEventSource Primitive", href: "/docs/hooks/create-event-source" }}
        />
      </div>
    </>
  );
}
