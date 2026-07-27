import { For, Show } from "solid-js";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ComponentSpec } from "../../types/playground";

interface PlaygroundControlsProps {
  spec: ComponentSpec;
  values: Record<string, any>;
  setValue: (key: string, val: any) => void;
}

export function PlaygroundControls(props: PlaygroundControlsProps) {
  return (
    <div class="space-y-4 p-5 rounded-lg border border-border bg-card/40">
      <h3 class="text-sm font-semibold tracking-tight text-foreground">
        Customize Props
      </h3>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <For each={props.spec.props}>
          {(propSpec) => (
            <div class="space-y-1.5">
              {/* Text Input Prop */}
              <Show when={propSpec.type === "text"}>
                <Label class="text-xs">{propSpec.label}</Label>
                <Input
                  value={props.values[propSpec.name] ?? ""}
                  onInput={(e) => props.setValue(propSpec.name, e.currentTarget.value)}
                  class="h-8 text-xs"
                />
              </Show>

              {/* Number Input Prop */}
              <Show when={propSpec.type === "number"}>
                <Label class="text-xs">{propSpec.label}</Label>
                <Input
                  type="number"
                  value={props.values[propSpec.name] ?? ""}
                  onInput={(e) => props.setValue(propSpec.name, Number(e.currentTarget.value))}
                  class="h-8 text-xs"
                />
              </Show>

              {/* Select Dropdown Prop */}
              <Show when={propSpec.type === "select" && propSpec.options}>
                <Label class="text-xs">{propSpec.label}</Label>
                <Select<string>
                  value={props.values[propSpec.name]}
                  onChange={(val) => val && props.setValue(propSpec.name, val)}
                  options={propSpec.options!}
                  itemComponent={(p) => <SelectItem item={p.item}>{p.item.rawValue}</SelectItem>}
                >
                  <SelectTrigger class="h-8 text-xs w-full">
                    <SelectValue<string>>{(s) => s.selectedOption()}</SelectValue>
                  </SelectTrigger>
                  <SelectContent />
                </Select>
              </Show>

              {/* Boolean Switch Prop */}
              <Show when={propSpec.type === "boolean"}>
                <div class="flex items-center justify-between pt-2">
                  <Label class="text-xs cursor-pointer">{propSpec.label}</Label>
                  <Switch
                    checked={Boolean(props.values[propSpec.name])}
                    onChange={(checked) => props.setValue(propSpec.name, checked)}
                  />
                </div>
              </Show>
            </div>
          )}
        </For>
      </div>
    </div>
  );
}