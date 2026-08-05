import { splitProps, type JSX, type ValidComponent } from "solid-js";
import * as HoverCardPrimitive from "@kobalte/core/hover-card";
import { cn } from "@/lib/cn";

export type HoverCardProps = HoverCardPrimitive.HoverCardRootProps;

/**
 * Root HoverCard component built on Kobalte primitives.
 * Controls hover open/close delays (default: 200ms / 150ms).
 */
export const HoverCard = (props: HoverCardProps) => {
  return (
    <HoverCardPrimitive.Root
      openDelay={200}
      closeDelay={150}
      {...props}
    />
  );
};

export type HoverCardTriggerProps<T extends ValidComponent = "a"> =
  HoverCardPrimitive.HoverCardTriggerProps<T> &
    JSX.AnchorHTMLAttributes<HTMLAnchorElement> & {
      class?: string;
      children?: JSX.Element;
    };

/**
 * HoverCard trigger handle (link, avatar, or text).
 */
export const HoverCardTrigger = <T extends ValidComponent = "a">(
  props: HoverCardTriggerProps<T>
) => {
  const [local, rest] = splitProps(props as HoverCardTriggerProps, [
    "class",
    "children",
  ]);

  return (
    <HoverCardPrimitive.Trigger
      class={cn(
        "inline-flex items-center text-sm font-medium text-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        local.class
      )}
      {...(rest as any)}
    >
      {local.children}
    </HoverCardPrimitive.Trigger>
  );
};

export type HoverCardContentProps<T extends ValidComponent = "div"> =
  HoverCardPrimitive.HoverCardContentProps<T> & {
    class?: string;
    children?: JSX.Element;
  };

/**
 * Floating card preview container rendered in a portal layer.
 * Includes offset spacing from trigger and support for optional HoverCardArrow.
 */
export const HoverCardContent = <T extends ValidComponent = "div">(
  props: HoverCardContentProps<T>
) => {
  const [local, rest] = splitProps(props as HoverCardContentProps, [
    "class",
    "children",
  ]);

  return (
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Content
        sideOffset={8}
        class={cn(
          "z-50 w-80 rounded-lg border border-border bg-popover p-4 text-popover-foreground shadow-xl outline-none transition-all data-expanded:animate-in data-closed:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-closed:zoom-out-95 data-expanded:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          local.class
        )}
        {...(rest as any)}
      >
        {local.children}
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Portal>
  );
};

export type HoverCardArrowProps<T extends ValidComponent = "div"> =
  HoverCardPrimitive.HoverCardArrowProps<T> & {
    class?: string;
  };

/**
 * Optional arrow pointer pointing to the trigger.
 */
export const HoverCardArrow = <T extends ValidComponent = "div">(
  props: HoverCardArrowProps<T>
) => {
  const [local, rest] = splitProps(props as HoverCardArrowProps, ["class"]);

  return (
    <HoverCardPrimitive.Arrow
      class={cn("fill-popover stroke-border stroke-1", local.class)}
      {...(rest as any)}
    />
  );
};
