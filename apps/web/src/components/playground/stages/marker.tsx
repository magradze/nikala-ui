import { Show } from "solid-js";
import {
  Marker,
  MarkerContent,
  MarkerDate,
  MarkerTyping,
} from "@/components/ui/marker";
import { Sparkles, Info, Bell } from "lucide-solid";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "marker",
  name: "Marker",
  props: [
    {
      name: "type",
      label: "Marker Type",
      type: "select",
      options: ["status", "date", "typing"],
      default: "status",
    },
    {
      name: "content",
      label: "Status Content",
      type: "text",
      default: "Niko Pirosmani joined the conversation",
    },
    {
      name: "date",
      label: "Date Divider Text",
      type: "text",
      default: "Today, August 31",
    },
    {
      name: "typingName",
      label: "Typing User Name",
      type: "text",
      default: "Alex",
    },
    {
      name: "showIcon",
      label: "Show Status Icon",
      type: "boolean",
      default: true,
    },
  ],
};

export default function MarkerStage(props: StageProps) {
  return (
    <div class="w-full max-w-md p-4 space-y-4">
      {/* 1. Status Marker */}
      <Show when={props.values.type === "status"}>
        <Marker>
          <MarkerContent>
            <Show when={props.values.showIcon}>
              <Sparkles class="size-3.5 text-primary shrink-0" />
            </Show>
            <span>{props.values.content || "System status event"}</span>
          </MarkerContent>
        </Marker>
      </Show>

      {/* 2. Date Divider Marker */}
      <Show when={props.values.type === "date"}>
        <MarkerDate date={props.values.date || "Today"} />
      </Show>

      {/* 3. Typing Indicator Marker */}
      <Show when={props.values.type === "typing"}>
        <div class="flex justify-start">
          <MarkerTyping name={props.values.typingName || "Someone"} />
        </div>
      </Show>
    </div>
  );
}
