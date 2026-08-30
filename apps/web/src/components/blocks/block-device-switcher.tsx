import { type Component } from "solid-js";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import { Monitor, Tablet, Smartphone } from "lucide-solid";

export type DeviceSize = "desktop" | "tablet" | "mobile";

interface BlockDeviceSwitcherProps {
  value: DeviceSize;
  onChange: (size: DeviceSize) => void;
}

export const BlockDeviceSwitcher: Component<BlockDeviceSwitcherProps> = (props) => {
  return (
    <ButtonGroup class="hidden sm:inline-flex">
      <Button
        variant={props.value === "desktop" ? "secondary" : "outline"}
        size="sm"
        class="h-7 px-2 text-xs gap-1 cursor-pointer"
        onClick={() => props.onChange("desktop")}
        title="Desktop View (100%)"
      >
        <Monitor class="size-3.5" />
        <span>Desktop</span>
      </Button>
      <Button
        variant={props.value === "tablet" ? "secondary" : "outline"}
        size="sm"
        class="h-7 px-2 text-xs gap-1 cursor-pointer"
        onClick={() => props.onChange("tablet")}
        title="Tablet View (768px)"
      >
        <Tablet class="size-3.5" />
        <span>Tablet</span>
      </Button>
      <Button
        variant={props.value === "mobile" ? "secondary" : "outline"}
        size="sm"
        class="h-7 px-2 text-xs gap-1 cursor-pointer"
        onClick={() => props.onChange("mobile")}
        title="Mobile View (375px)"
      >
        <Smartphone class="size-3.5" />
        <span>Mobile</span>
      </Button>
    </ButtonGroup>
  );
};
