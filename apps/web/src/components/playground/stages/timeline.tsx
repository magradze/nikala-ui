import { Show } from "solid-js";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelinePoint,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
  TimelineTitle,
  TimelineDescription,
  TimelineTime,
} from "@/components/ui/timeline";
import { Check, Package, Truck } from "lucide-solid";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "timeline",
  name: "Timeline",
  props: [
    {
      name: "orientation",
      label: "Orientation",
      type: "select",
      options: ["vertical", "horizontal"],
      default: "vertical",
    },
    {
      name: "align",
      label: "Alignment",
      type: "select",
      options: ["left", "right", "alternate"],
      default: "left",
    },
    {
      name: "size",
      label: "Size",
      type: "select",
      options: ["sm", "default", "lg"],
      default: "default",
    },
    {
      name: "dashedConnectors",
      label: "Dashed Connectors",
      type: "boolean",
      default: false,
    },
  ],
  generateCode: (v) => {
    const orientStr = v.orientation && v.orientation !== "vertical" ? ` orientation="${v.orientation}"` : "";
    const alignStr = v.align && v.align !== "left" ? ` align="${v.align}"` : "";
    const sizeStr = v.size && v.size !== "default" ? ` size="${v.size}"` : "";
    const dashed = v.dashedConnectors ? " dashed" : "";

    if (v.align === "alternate") {
      return `<Timeline${orientStr}${alignStr}${sizeStr}>
  <TimelineItem>
    <TimelineOppositeContent>
      <TimelineTime>09:30 AM</TimelineTime>
    </TimelineOppositeContent>
    <TimelineSeparator>
      <TimelinePoint status="success"><Check class="size-4" /></TimelinePoint>
      <TimelineConnector${dashed} />
    </TimelineSeparator>
    <TimelineContent>
      <TimelineTitle>Order Placed</TimelineTitle>
      <TimelineDescription>Order #NK-9281 logged in system.</TimelineDescription>
    </TimelineContent>
  </TimelineItem>

  <TimelineItem>
    <TimelineOppositeContent>
      <TimelineTime>10:15 AM</TimelineTime>
    </TimelineOppositeContent>
    <TimelineSeparator>
      <TimelinePoint status="primary"><Package class="size-4" /></TimelinePoint>
      <TimelineConnector${dashed} />
    </TimelineSeparator>
    <TimelineContent>
      <TimelineTitle>Packaging</TimelineTitle>
      <TimelineDescription>Packed at Tbilisi Logistics Hub.</TimelineDescription>
    </TimelineContent>
  </TimelineItem>

  <TimelineItem>
    <TimelineOppositeContent>
      <TimelineTime>Tomorrow</TimelineTime>
    </TimelineOppositeContent>
    <TimelineSeparator>
      <TimelinePoint status="muted"><Truck class="size-4" /></TimelinePoint>
      <TimelineConnector${dashed} />
    </TimelineSeparator>
    <TimelineContent>
      <TimelineTitle>Delivery</TimelineTitle>
      <TimelineDescription>Scheduled courier dispatch.</TimelineDescription>
    </TimelineContent>
  </TimelineItem>
</Timeline>`;
    }

    return `<Timeline${orientStr}${alignStr}${sizeStr}>
  <TimelineItem>
    <TimelineSeparator>
      <TimelinePoint status="success"><Check class="size-4" /></TimelinePoint>
      <TimelineConnector${dashed} />
    </TimelineSeparator>
    <TimelineContent>
      <TimelineTitle>Order Placed</TimelineTitle>
      <TimelineTime>09:30 AM</TimelineTime>
    </TimelineContent>
  </TimelineItem>

  <TimelineItem>
    <TimelineSeparator>
      <TimelinePoint status="primary"><Package class="size-4" /></TimelinePoint>
      <TimelineConnector${dashed} />
    </TimelineSeparator>
    <TimelineContent>
      <TimelineTitle>Packaging</TimelineTitle>
      <TimelineTime>In Progress</TimelineTime>
    </TimelineContent>
  </TimelineItem>

  <TimelineItem>
    <TimelineSeparator>
      <TimelinePoint status="muted"><Truck class="size-4" /></TimelinePoint>
      <TimelineConnector${dashed} />
    </TimelineSeparator>
    <TimelineContent>
      <TimelineTitle>Delivery</TimelineTitle>
      <TimelineTime>Pending</TimelineTime>
    </TimelineContent>
  </TimelineItem>
</Timeline>`;
  },
};

export default function TimelineStage(props: StageProps) {
  return (
    <div class="flex flex-col items-center justify-center p-6 w-full max-w-xl">
      <Timeline
        orientation={props.values.orientation || "vertical"}
        align={props.values.align || "left"}
        size={props.values.size || "default"}
      >
        <TimelineItem>
          <TimelineOppositeContent>
            <TimelineTime>09:30 AM</TimelineTime>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelinePoint status="success">
              <Check class="size-4" />
            </TimelinePoint>
            <TimelineConnector dashed={props.values.dashedConnectors} />
          </TimelineSeparator>
          <TimelineContent>
            <div class="flex items-center justify-between gap-2">
              <TimelineTitle>Order Placed</TimelineTitle>
              <Show when={props.values.align !== "alternate"}>
                <TimelineTime>09:30 AM</TimelineTime>
              </Show>
            </div>
            <TimelineDescription>Order #NK-9281 logged in system.</TimelineDescription>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent>
            <TimelineTime>10:15 AM</TimelineTime>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelinePoint status="primary">
              <Package class="size-4" />
            </TimelinePoint>
            <TimelineConnector dashed={props.values.dashedConnectors} />
          </TimelineSeparator>
          <TimelineContent>
            <div class="flex items-center justify-between gap-2">
              <TimelineTitle class="text-primary">Packaging</TimelineTitle>
              <Show when={props.values.align !== "alternate"}>
                <TimelineTime>In Progress</TimelineTime>
              </Show>
            </div>
            <TimelineDescription>Packed at Tbilisi Logistics Hub.</TimelineDescription>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent>
            <TimelineTime>Tomorrow</TimelineTime>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelinePoint status="muted">
              <Truck class="size-4" />
            </TimelinePoint>
            <TimelineConnector dashed={props.values.dashedConnectors} />
          </TimelineSeparator>
          <TimelineContent>
            <div class="flex items-center justify-between gap-2">
              <TimelineTitle class="text-muted-foreground">Out for Delivery</TimelineTitle>
              <Show when={props.values.align !== "alternate"}>
                <TimelineTime>Pending</TimelineTime>
              </Show>
            </div>
            <TimelineDescription>Scheduled courier dispatch.</TimelineDescription>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  );
}
