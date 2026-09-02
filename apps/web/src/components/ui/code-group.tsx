import {
  splitProps,
  type JSX,
  type ParentComponent,
} from "solid-js";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { cn } from "@/lib/cn";

export interface CodeGroupProps
  extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Controlled active tab value */
  value?: string;
  /** Default active tab value */
  defaultValue?: string;
  /** Callback fired when active tab changes */
  onChange?: (value: string) => void;
  class?: string;
}

/**
 * Tabbed code container composed directly from Nikala UI Tabs primitives.
 */
export const CodeGroup: ParentComponent<CodeGroupProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "value",
    "defaultValue",
    "onChange",
    "class",
    "children",
  ]);

  return (
    <Tabs
      value={local.value}
      defaultValue={local.defaultValue}
      onChange={local.onChange}
      class={cn(
        "my-4 w-full gap-0 overflow-hidden rounded-lg border border-border bg-muted/40 font-mono text-sm shadow-2xs",
        local.class
      )}
      {...rest}
    >
      {local.children}
    </Tabs>
  );
};

export interface CodeGroupListProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

export const CodeGroupList: ParentComponent<CodeGroupListProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <div class={cn("flex h-9 items-center justify-between border-b border-border/70 bg-muted/70 px-3 select-none", local.class)}>
      <TabsList class="h-auto bg-background/60 p-0.5 border border-border/50 gap-0.5 rounded-md" {...rest}>
        {local.children}
      </TabsList>
    </div>
  );
};

export interface CodeGroupTriggerProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  class?: string;
}

export const CodeGroupTrigger: ParentComponent<CodeGroupTriggerProps> = (props) => {
  const [local, rest] = splitProps(props, ["value", "class", "children"]);
  return (
    <TabsTrigger
      value={local.value}
      class={cn(
        "rounded-xs px-2 py-0.5 text-[11px] font-mono transition-colors cursor-pointer data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:font-semibold data-[state=active]:shadow-2xs",
        local.class
      )}
      {...rest}
    >
      {local.children}
    </TabsTrigger>
  );
};

export interface CodeGroupContentProps extends JSX.HTMLAttributes<HTMLDivElement> {
  value: string;
  class?: string;
}

export const CodeGroupContent: ParentComponent<CodeGroupContentProps> = (props) => {
  const [local, rest] = splitProps(props, ["value", "class", "children"]);
  return (
    <TabsContent
      value={local.value}
      class={cn("p-4 text-[13px] leading-relaxed overflow-x-auto m-0 focus-visible:outline-none", local.class)}
      {...rest}
    >
      {local.children}
    </TabsContent>
  );
};
