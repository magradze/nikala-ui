import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelinePoint,
  TimelineConnector,
  TimelineContent,
  TimelineTitle,
  TimelineDescription,
  TimelineTime,
} from "@/components/ui/timeline";
import { Check, Package, Truck, CreditCard } from "lucide-solid";
import type { OrderItem } from "./showcase-table";

export interface ShowcaseTimelineProps {
  order: OrderItem;
}

export function ShowcaseTimeline(props: ShowcaseTimelineProps) {
  return (
    <div class="rounded-lg border border-border/80 bg-card p-5 shadow-xs text-left space-y-4">
      <div class="flex items-center justify-between border-b border-border/60 pb-3">
        <div>
          <h4 class="text-sm font-semibold text-foreground">
            Fulfillment Journey
          </h4>
          <p class="text-xs text-muted-foreground">
            Tracking updates for <span class="font-mono text-primary font-medium">{props.order.id}</span>
          </p>
        </div>
      </div>

      <Timeline size="sm" class="space-y-1">
        {/* Step 1 */}
        <TimelineItem>
          <TimelineSeparator>
            <TimelinePoint status="success">
              <CreditCard class="size-3" />
            </TimelinePoint>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent class="pb-3">
            <div class="flex items-center justify-between gap-2">
              <TimelineTitle class="text-xs">Payment Captured</TimelineTitle>
              <TimelineTime>{props.order.amount}</TimelineTime>
            </div>
            <TimelineDescription class="text-[11px]">
              Processed via Stripe with 3D Secure verification.
            </TimelineDescription>
          </TimelineContent>
        </TimelineItem>

        {/* Step 2 */}
        <TimelineItem>
          <TimelineSeparator>
            <TimelinePoint status={props.order.status === "Pending" ? "muted" : "success"}>
              <Check class="size-3" />
            </TimelinePoint>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent class="pb-3">
            <div class="flex items-center justify-between gap-2">
              <TimelineTitle class="text-xs">Invoice & License Issued</TimelineTitle>
              <TimelineTime>{props.order.date}</TimelineTime>
            </div>
            <TimelineDescription class="text-[11px]">
              Automated PDF receipt sent to {props.order.customer.split(" ")[0].toLowerCase()}@pirosmani.ge.
            </TimelineDescription>
          </TimelineContent>
        </TimelineItem>

        {/* Step 3 */}
        <TimelineItem>
          <TimelineSeparator>
            <TimelinePoint status={props.order.status === "Completed" ? "success" : "primary"}>
              <Package class="size-3" />
            </TimelinePoint>
            <TimelineConnector dashed />
          </TimelineSeparator>
          <TimelineContent class="pb-3">
            <div class="flex items-center justify-between gap-2">
              <TimelineTitle class="text-xs text-primary">Warehouse Dispatch</TimelineTitle>
              <TimelineTime>Tbilisi Hub</TimelineTime>
            </div>
            <TimelineDescription class="text-[11px]">
              Packed & quality inspected by Nikala UI team.
            </TimelineDescription>
          </TimelineContent>
        </TimelineItem>

        {/* Step 4 */}
        <TimelineItem>
          <TimelineSeparator>
            <TimelinePoint status={props.order.status === "Completed" ? "success" : "muted"}>
              <Truck class="size-3" />
            </TimelinePoint>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent class="pb-0">
            <div class="flex items-center justify-between gap-2">
              <TimelineTitle class="text-xs text-muted-foreground">Delivered / Active</TimelineTitle>
              <TimelineTime>{props.order.status}</TimelineTime>
            </div>
            <TimelineDescription class="text-[11px]">
              Customer confirmed full receipt and satisfaction.
            </TimelineDescription>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  );
}
