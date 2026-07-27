import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "tabs",
  name: "Tabs",
  props: [
    { name: "orientation", label: "Orientation", type: "select", options: ["horizontal", "vertical"], default: "horizontal" },
    { name: "value", label: "Active Tab", type: "select", options: ["account", "settings"], default: "account" },
  ],
  generateCode: (v) => {
    const isVert = v.orientation === "vertical";
    const listClass = isVert ? ' class="flex flex-col w-30"' : ' class="grid grid-cols-2 w-75"';
    return `<Tabs${isVert ? ' orientation="vertical"' : ''} value="${v.value || "account"}">
  <TabsList${listClass}>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account settings content.</TabsContent>
  <TabsContent value="settings">General workspace preferences.</TabsContent>
</Tabs>`;
  },
};

export default function TabsStage(props: StageProps) {
  const isVertical = () => props.values.orientation === "vertical";

  return (
    <Tabs
      orientation={props.values.orientation}
      value={props.values.value || "account"}
      class={isVertical() ? "w-100" : "w-75"}
    >
      <TabsList class={isVertical() ? "flex flex-col w-30 h-auto p-1 gap-1" : "grid grid-cols-2 w-full"}>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account" class="p-3 text-xs border border-border rounded-md bg-card flex-1">
        Account settings content.
      </TabsContent>
      <TabsContent value="settings" class="p-3 text-xs border border-border rounded-md bg-card flex-1">
        General workspace preferences.
      </TabsContent>
    </Tabs>
  );
}