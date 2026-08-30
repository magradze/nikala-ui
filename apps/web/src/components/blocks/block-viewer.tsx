import { createSignal, Show, type Component, type JSX } from "solid-js";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/code-block";
import { createClipboard } from "@nikala-ui/hooks";
import { usePackageManager } from "@/hooks/use-package-manager";
import { PmRunnerSelector } from "@/components/docs/pm-runner-selector";
import { BlockDeviceSwitcher, type DeviceSize } from "./block-device-switcher";
import type { BlockItem } from "@/config/blocks";
import { Sparkles } from "lucide-solid";

// Dynamically load raw component TSX files with Vite ?raw
const rawBlockCodes: Record<string, string> = import.meta.glob("./*.tsx", {
  query: "?raw",
  import: "default",
  eager: true,
});

/**
 * Helper to safely retrieve raw code string for any block name.
 */
function getBlockRawCode(blockName: string): string {
  for (const [key, val] of Object.entries(rawBlockCodes)) {
    if (key.endsWith(`/${blockName}.tsx`) || key === `./${blockName}.tsx`) {
      return val;
    }
  }
  return "";
}

interface BlockViewerProps {
  block: BlockItem;
  children: JSX.Element;
}

export const BlockViewer: Component<BlockViewerProps> = (props) => {
  const [deviceSize, setDeviceSize] = createSignal<DeviceSize>("desktop");
  const [activeTab, setActiveTab] = createSignal<string>("preview");
  const { copied, copy } = createClipboard({ timeout: 2000 });
  const { copied: aiCopied, copy: copyAi } = createClipboard({ timeout: 2000 });
  const { formatCommand } = usePackageManager();

  const code = () => getBlockRawCode(props.block.name);
  const cliCommand = () => formatCommand(`add ${props.block.name}`);

  const copyCli = () => {
    copy(cliCommand());
  };

  const copyForAi = () => {
    const prompt = `// Nikala UI SolidJS Block: ${props.block.name}
// Installation: ${cliCommand()}
// Usage code:
${code()}`;
    copyAi(prompt);
  };

  const getContainerWidth = () => {
    switch (deviceSize()) {
      case "mobile":
        return "max-w-[375px]";
      case "tablet":
        return "max-w-[768px]";
      default:
        return "w-full";
    }
  };

  return (
    <div id={props.block.id} class="w-full space-y-4 pt-2 pb-8 scroll-mt-20">
      {/* 1. Block Title & Description Header */}
      <div class="space-y-1.5 pb-2">
        <div class="flex items-center gap-2.5">
          <h2 class="text-2xl font-bold tracking-tight text-foreground">
            {props.block.title}
          </h2>
          <Badge variant="outline" class="text-xs font-mono">
            {props.block.name}
          </Badge>
        </div>
        <p class="text-sm text-muted-foreground">
          {props.block.description}
        </p>
      </div>

      {/* 2. Main Tabs & Controls (Matching ComponentPreview exactly) */}
      <Tabs
        value={activeTab()}
        onChange={setActiveTab}
        class="relative mr-auto w-full space-y-3"
      >
        <div class="flex flex-col md:flex-row md:items-center justify-between pb-0 gap-3">
          {/* Left: Preview / Code Tabs & Responsive Switcher */}
          <div class="flex flex-wrap items-center gap-3">
            <TabsList class="w-full sm:w-auto justify-start rounded-none bg-transparent p-0 gap-4">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>

            {/* Responsive Device Switcher using extracted component */}
            <Show when={activeTab() === "preview"}>
              <BlockDeviceSwitcher value={deviceSize()} onChange={setDeviceSize} />
            </Show>
          </div>

          {/* Right: Actions (Copy for AI, Copy CLI Command, PM Runner Selector) */}
          <div class="flex flex-wrap items-center justify-start md:justify-end gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={copyForAi}
              title="Copy code context formatted for AI assistants (Cursor, Claude, Copilot)"
              class="h-7 px-2 text-xs text-muted-foreground hover:text-foreground border border-border/50 rounded-md cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles class="size-3 text-primary" />
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

        {/* 3. Live Preview Tab Content */}
        <TabsContent
          value="preview"
          class="relative rounded-lg bg-card/50 border border-border p-4 sm:p-6 md:p-8 backdrop-blur-xs overflow-x-auto"
        >
          <div class={`@container w-full mx-auto transition-all duration-300 ${getContainerWidth()}`}>
            {props.children}
          </div>
        </TabsContent>

        {/* 4. Code Tab Content */}
        <TabsContent value="code">
          <CodeBlock code={code()} lang="tsx" />
        </TabsContent>
      </Tabs>
    </div>
  );
};
