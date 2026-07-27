// src/components/component-preview.tsx
import { createSignal, JSX, children, type Component } from "solid-js";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/code-block";
import { Button } from "@/components/ui/button";

interface ComponentPreviewProps {
  name: string;
  code: string;
  children: JSX.Element;
  align?: "center" | "start" | "end";
}

export const ComponentPreview: Component<ComponentPreviewProps> = (props) => {
  const [copiedCli, setCopiedCli] = createSignal(false);
  const cliCommand = () => `nikala add ${props.name}`;

  /* Memoize dynamic JSX children for safe SolidJS tab hydration */
  const resolvedChildren = children(() => props.children);

  const copyCli = async () => {
    await navigator.clipboard.writeText(cliCommand());
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  const alignmentClass = () => {
    if (props.align === "start") return "items-start justify-start";
    if (props.align === "end") return "items-end justify-end";
    return "items-center justify-center";
  };

  return (
      <div class="group relative my-4 flex flex-col space-y-2">
        <Tabs defaultValue="preview" class="relative mr-auto w-full">
          <div class="flex items-center justify-between pb-3">
            <TabsList class="w-full justify-start rounded-none border-b border-border bg-transparent p-0 gap-4">
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

            {/* Quick CLI Copy Button */}
            <Button
                variant="ghost"
                size="sm"
                onClick={copyCli}
                class="h-7 px-2 text-xs text-muted-foreground hover:text-foreground font-mono border border-border/50 rounded-md"
            >
              {copiedCli() ? "Copied command!" : cliCommand()}
            </Button>
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
            <CodeBlock code={props.code} lang="tsx" />
          </TabsContent>
        </Tabs>
      </div>
  );
};