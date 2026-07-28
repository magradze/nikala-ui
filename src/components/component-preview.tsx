// src/components/component-preview.tsx
import {
  createSignal,
  JSX,
  children,
  splitProps,
  For,
  type Component,
} from "solid-js";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";

export type PackageManager = "bunx" | "npx" | "pnpm" | "yarn";

/* Global reactive signal shared across all component preview blocks */
export const [activePm, setActivePm] = createSignal<PackageManager>("bunx");

interface ComponentPreviewProps {
  name: string;
  code: string;
  children: JSX.Element;
  align?: "center" | "start" | "end";
}

export const ComponentPreview: Component<ComponentPreviewProps> = (props) => {
  /* Use splitProps to adhere strictly to Nikala UI reactivity rules */
  const [local] = splitProps(props, ["name", "code", "align", "children"]);

  const [copiedCli, setCopiedCli] = createSignal(false);

  /* Dynamic CLI command generator based on active package manager runner */
  const cliCommand = () => {
    const pm = activePm();
    const pkg = "@nikala-ui/cli";
    const comp = local.name;

    switch (pm) {
      case "npx":
        return `npx ${pkg} add ${comp}`;
      case "pnpm":
        return `pnpm dlx ${pkg} add ${comp}`;
      case "yarn":
        return `yarn dlx ${pkg} add ${comp}`;
      default:
        return `bunx ${pkg} add ${comp}`;
    }
  };

  /* Memoize dynamic JSX children for safe SolidJS tab hydration */
  const resolvedChildren = children(() => local.children);

  const copyCli = async () => {
    try {
      await navigator.clipboard.writeText(cliCommand());
      setCopiedCli(true);
      setTimeout(() => setCopiedCli(false), 2000);
    } catch (e) {
      /* Fallback for environments with restricted clipboard permissions */
    }
  };

  const alignmentClass = () => {
    if (local.align === "start") return "items-start justify-start";
    if (local.align === "end") return "items-end justify-end";
    return "items-center justify-center";
  };

  const pmList: PackageManager[] = ["bunx", "npx", "pnpm", "yarn"];

  return (
    <div class="group relative my-4 flex flex-col space-y-2">
      <Tabs defaultValue="preview" class="relative mr-auto w-full">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-3 gap-2 sm:gap-0">
          <TabsList class="w-full sm:w-auto justify-start rounded-none border-b border-border bg-transparent p-0 gap-4">
            <TabsTrigger
              value="preview"
              class="relative rounded-none border-b-2 border-transparent px-2 pb-2 pt-1 font-semibold text-muted-foreground transition-none data-[state=active]:border-primary data-[state=active]:text-foreground"
            >
              Preview
            </TabsTrigger>
            <TabsTrigger
              value="code"
              class="relative rounded-none border-b-2 border-transparent px-2 pb-2 pt-1 font-semibold text-muted-foreground transition-none data-[state=active]:border-primary data-[state=active]:text-foreground"
            >
              Code
            </TabsTrigger>
          </TabsList>

          {/* Package Manager Selector & CLI Copy Button */}
          <div class="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={copyCli}
              class="h-7 px-2 text-xs text-muted-foreground hover:text-foreground font-mono border border-border/50 rounded-md cursor-pointer"
            >
              {copiedCli() ? "Copied command!" : cliCommand()}
            </Button>
            <div class="flex items-center rounded-md border border-border/50 bg-muted/40 p-0.5 text-[11px] font-mono select-none">
              <For each={pmList}>
                {(pm) => (
                  <button
                    type="button"
                    onClick={() => setActivePm(pm)}
                    class={`px-1.5 py-0.5 rounded-sm transition-colors cursor-pointer ${activePm() === pm
                      ? "bg-primary text-primary-foreground font-bold shadow-2xs"
                      : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    {pm}
                  </button>
                )}
              </For>
            </div>
          </div>
        </div>

        {/* Live Preview Tab */}
        <TabsContent
          value="preview"
          class="relative rounded-lg border border-border bg-background/50 p-10 backdrop-blur-xs"
        >
          <div class={`flex min-h-62.5 w-full ${alignmentClass()}`}>
            {resolvedChildren()}
          </div>
        </TabsContent>

        {/* Code Tab */}
        <TabsContent value="code">
          <CodeBlock code={local.code} lang="tsx" />
        </TabsContent>
      </Tabs>
    </div>
  );
};