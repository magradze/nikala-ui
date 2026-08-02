// src/components/component-preview.tsx
import { createSignal, JSX, children, splitProps, type Component } from "solid-js";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";
import { usePackageManager } from "@/hooks/use-package-manager";
import { PmRunnerSelector } from "@/components/docs/pm-runner-selector";

interface ComponentPreviewProps {
  name: string;
  code: string;
  children: JSX.Element;
  align?: "center" | "start" | "end";
}

export const ComponentPreview: Component<ComponentPreviewProps> = (props) => {
  const [local] = splitProps(props, ["name", "code", "align", "children"]);
  const [copiedCli, setCopiedCli] = createSignal(false);
  const { formatCommand } = usePackageManager();

  const cliCommand = () => formatCommand(`add ${local.name}`);
  const resolvedChildren = children(() => local.children);

  const copyCli = async () => {
    try {
      await navigator.clipboard.writeText(cliCommand());
      setCopiedCli(true);
      setTimeout(() => setCopiedCli(false), 2000);
    } catch (e) { }
  };

  const alignmentClass = () => {
    if (local.align === "start") return "items-start justify-start";
    if (local.align === "end") return "items-end justify-end";
    return "items-center justify-center";
  };

  return (
    <div class="group relative my-4 flex flex-col space-y-2">
      <Tabs defaultValue="preview" class="relative mr-auto w-full">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-3 gap-2 sm:gap-0">
          <TabsList class="w-full sm:w-auto justify-start rounded-none border-b border-border bg-transparent p-0 gap-4">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>

          {/* CLI Copy Button & Reusable PM Runner Selector */}
          <div class="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={copyCli}
              class="h-7 px-2 text-xs text-muted-foreground hover:text-foreground font-mono border border-border/50 rounded-md cursor-pointer"
            >
              {copiedCli() ? "Copied command!" : cliCommand()}
            </Button>

            <PmRunnerSelector size="sm" />
          </div>
        </div>

        {/* Live Preview Tab */}
        <TabsContent value="preview" class="relative rounded-lg border border-border bg-background/50 p-10 backdrop-blur-xs">
          <div class={`flex min-h-[250px] w-full ${alignmentClass()}`}>
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