import { Show } from "solid-js";
import {
  Titlebar,
  TitlebarControls,
  TitlebarTitle,
  TitlebarIcon,
  TitlebarActions,
} from "@/components/ui/titlebar";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { Settings, Search, Sparkles } from "lucide-solid";
import type { ComponentSpec, StageProps } from "@/types";

export const config: ComponentSpec = {
  id: "titlebar",
  name: "Titlebar",
  props: [
    {
      name: "platform",
      label: "Platform Control Style",
      type: "select",
      options: ["macos", "windows"],
      default: "macos",
    },
    {
      name: "variant",
      label: "Visual Variant",
      type: "select",
      options: ["default", "translucent", "floating", "transparent"],
      default: "default",
    },
    {
      name: "title",
      label: "Window Title",
      type: "text",
      default: "Nikala Desktop Studio",
    },
    {
      name: "size",
      label: "Height Size",
      type: "select",
      options: ["sm", "default", "lg"],
      default: "default",
    },
    {
      name: "showActions",
      label: "Show Action Buttons",
      type: "boolean",
      default: true,
    },
    {
      name: "showIcon",
      label: "Show App Icon",
      type: "boolean",
      default: true,
    },
  ],
};

export default function TitlebarStage(props: StageProps) {
  return (
    <div class="w-full max-w-xl p-4">
      <div class="relative w-full rounded-lg border border-border bg-card shadow-md overflow-hidden">
        <Titlebar
          platform={props.values.platform as any}
          variant={props.values.variant as any}
          size={props.values.size as any}
          class="border-b border-border/60"
        >
          <Show
            when={props.values.platform === "macos"}
            fallback={
              <>
                <TitlebarControls />
                <div class="flex items-center gap-1.5 flex-1 pl-2">
                  <Show when={props.values.showIcon}>
                    <TitlebarIcon>
                      <Logo class="size-3.5 rounded-xs" />
                    </TitlebarIcon>
                  </Show>
                  <TitlebarTitle class="text-xs">
                    {props.values.title || "Nikala Desktop"}
                  </TitlebarTitle>
                </div>
                <Show when={props.values.showActions}>
                  <TitlebarActions class="pr-2">
                    <Button variant="ghost" size="icon" class="h-6 w-6">
                      <Sparkles class="size-3 text-primary" />
                    </Button>
                  </TitlebarActions>
                </Show>
              </>
            }
          >
            <TitlebarControls />
            <div class="flex items-center gap-1.5 flex-1">
              <Show when={props.values.showIcon}>
                <TitlebarIcon>
                  <Logo class="size-3.5 rounded-xs" />
                </TitlebarIcon>
              </Show>
              <TitlebarTitle class="text-xs">
                {props.values.title || "Nikala Desktop"}
              </TitlebarTitle>
            </div>
            <Show when={props.values.showActions}>
              <TitlebarActions>
                <Button variant="ghost" size="icon" class="h-6 w-6">
                  <Search class="size-3" />
                </Button>
                <Button variant="ghost" size="icon" class="h-6 w-6">
                  <Settings class="size-3" />
                </Button>
              </TitlebarActions>
            </Show>
          </Show>
        </Titlebar>

        {/* Inner Window Canvas */}
        <div class="p-6 text-center text-xs text-muted-foreground bg-background/40 min-h-24 flex items-center justify-center">
          Tauri Native Window Drag Region Active
        </div>
      </div>
    </div>
  );
}
