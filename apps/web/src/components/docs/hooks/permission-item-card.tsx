import { Show, type Component } from "solid-js";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { PermissionStatusState } from "@nikala-ui/hooks";

export interface PermissionItemCardProps {
  /** Permission display title (e.g. "Geolocation", "Notifications"). */
  title: string;
  /** Permission API descriptor name (e.g. "geolocation", "notifications"). */
  name: string;
  /** Current permission status state ('granted', 'denied', 'prompt', 'unknown'). */
  state: PermissionStatusState;
  /** Callback fired when user clicks Request Access button. */
  onRequestAccess?: () => void | Promise<void>;
  /** Optional custom class name. */
  class?: string;
}

/**
 * Reusable permission item status card for hooks documentation demos.
 */
export const PermissionItemCard: Component<PermissionItemCardProps> = (props) => {
  return (
    <div class="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border/50">
      <div class="space-y-0.5">
        <div class="text-xs font-semibold text-foreground">{props.title}</div>
        <div class="text-[10px] text-muted-foreground font-mono">name: "{props.name}"</div>
      </div>

      <Show
        when={props.state !== "prompt"}
        fallback={
          <Button size="sm" onClick={() => props.onRequestAccess?.()}>
            Request Access
          </Button>
        }
      >
        <Badge
          variant={props.state === "granted" ? "default" : "destructive"}
          class="capitalize font-mono text-[11px]"
        >
          {props.state}
        </Badge>
      </Show>
    </div>
  );
};
