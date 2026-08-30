// src/components/component-preview.tsx
import { createSignal, JSX, children, splitProps, type Component } from "solid-js";
import { createClipboard } from "@nikala-ui/hooks";
import { Sparkles } from "lucide-solid";
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
  isHook?: boolean;
  allowOverflow?: boolean;
}

export const ComponentPreview: Component<ComponentPreviewProps> = (props) => {
  const [local] = splitProps(props, ["name", "code", "align", "children", "isHook", "allowOverflow"]);
  const { copied, copy } = createClipboard({ timeout: 2000 });
  const { copied: aiCopied, copy: copyAi } = createClipboard({ timeout: 2000 });
  const { formatCommand } = usePackageManager();

  const cliCommand = () =>
    formatCommand(local.isHook ? `add --hook ${local.name}` : `add ${local.name}`);
  const resolvedChildren = children(() => local.children);

  const copyCli = () => {
    copy(cliCommand());
  };

  const copyForAi = () => {
    const prompt = `// Nikala UI SolidJS ${local.isHook ? "Hook" : "Component"}: ${local.name}
// Installation: ${cliCommand()}
// Usage code:
${local.code}`;
    copyAi(prompt);
  };

  const alignmentClass = () => {
    if (local.align === "start") return "items-start justify-start";
    if (local.align === "end") return "items-end justify-end";
    return "items-center justify-center";
  };

  return (
    <div class="group relative my-4 flex flex-col space-y-2">
      <Tabs defaultValue="preview" class="relative mr-auto w-full">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-0 md:pb-3 gap-2 sm:gap-0">
          <TabsList class="w-full sm:w-auto justify-start rounded-none bg-transparent p-0 gap-4">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>

          {/* Action buttons */}
          <div class="flex flex-wrap items-center justify-end gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={copyForAi}
              title="Copy code context formatted for AI assistants (Cursor, Claude, Copilot)"
              class="h-7 px-2 text-xs text-muted-foreground hover:text-foreground border border-border/50 rounded-md cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles class="size-3" />
              <span>{aiCopied() ? "Copied for AI!" : "Copy for AI"}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={copyCli}
              class="h-7 px-2 text-xs text-muted-foreground hover:text-foreground font-mono border border-border/50 rounded-md cursor-pointer"
            >
              {copied() ? "Copied command!" : cliCommand()}
            </Button>

            <PmRunnerSelector size="sm" />
          </div>
        </div>

        {/* Live Preview Tab */}
        <TabsContent
          value="preview"
          class={`relative rounded-lg bg-card/50 border border-border p-4 sm:p-6 md:p-10 backdrop-blur-xs max-w-full ${
            local.allowOverflow ? "overflow-visible" : "overflow-x-auto"
          }`}
        >
          <div
            class={`flex min-h-[180px] sm:min-h-[240px] w-full max-w-full ${
              local.allowOverflow ? "overflow-visible" : "overflow-x-auto"
            } ${alignmentClass()}`}
          >
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