import { splitProps, type Component, type ComponentProps } from "solid-js";
import { Popover as KobaltePopover } from "@kobalte/core/popover";
import { X } from "lucide-solid";
import { cn } from "@/lib/cn";

export const Popover = KobaltePopover;

export const PopoverTrigger = KobaltePopover.Trigger;

export const PopoverArrow: Component<ComponentProps<typeof KobaltePopover.Arrow>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <KobaltePopover.Arrow
      class={cn("fill-popover stroke-border", local.class)}
      {...rest}
    />
  );
};

export const PopoverContent: Component<ComponentProps<typeof KobaltePopover.Content>> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <KobaltePopover.Portal>
      <KobaltePopover.Content
        class={cn(
          "z-50 w-72 rounded-lg border border-border bg-popover p-4 text-popover-foreground shadow-md outline-none data-expanded:animate-in data-closed:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          local.class
        )}
        {...rest}
      >
        {local.children}
      </KobaltePopover.Content>
    </KobaltePopover.Portal>
  );
};

export const PopoverTitle: Component<ComponentProps<typeof KobaltePopover.Title>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <KobaltePopover.Title
      class={cn("text-sm font-semibold text-foreground", local.class)}
      {...rest}
    />
  );
};

export const PopoverDescription: Component<ComponentProps<typeof KobaltePopover.Description>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <KobaltePopover.Description
      class={cn("text-sm text-muted-foreground", local.class)}
      {...rest}
    />
  );
};

export const PopoverCloseButton: Component<ComponentProps<typeof KobaltePopover.CloseButton>> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <KobaltePopover.CloseButton
      class={cn(
        "absolute right-2 top-2 rounded-md p-1 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none",
        local.class
      )}
      {...rest}
    >
      {local.children || <X class="h-4 w-4 text-muted-foreground" />}
    </KobaltePopover.CloseButton>
  );
};