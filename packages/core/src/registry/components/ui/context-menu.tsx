import { splitProps, type Component, type JSX, type ValidComponent } from "solid-js";
import * as ContextMenuPrimitive from "@kobalte/core/context-menu";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import { createClickOutside } from "@nikala-ui/hooks";
import { ScrollArea } from "./scroll-area";
import { Separator } from "./separator";
import { Kbd } from "./kbd";
import { cn } from "@/lib/cn";

export type ContextMenuRootProps = ContextMenuPrimitive.ContextMenuRootProps;

export const ContextMenu: Component<ContextMenuRootProps> = (props) => {
  return <ContextMenuPrimitive.Root {...props} />;
};

export const ContextMenuTrigger = ContextMenuPrimitive.Trigger;
export const ContextMenuGroup = ContextMenuPrimitive.Group;
export const ContextMenuSub = ContextMenuPrimitive.Sub;

export type ContextMenuSubTriggerProps<T extends ValidComponent = "div"> =
  ContextMenuPrimitive.ContextMenuSubTriggerProps<T> & {
    class?: string;
    children?: JSX.Element;
    inset?: boolean;
  };

export const ContextMenuSubTrigger = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, ContextMenuSubTriggerProps<T>>
) => {
  const [local, rest] = splitProps(props as ContextMenuSubTriggerProps, ["class", "children", "inset"]);

  return (
    <ContextMenuPrimitive.SubTrigger
      class={cn(
        "flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground text-foreground",
        local.inset && "pl-8",
        local.class
      )}
      {...(rest as any)}
    >
      {local.children}
      <svg class="ml-auto h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </ContextMenuPrimitive.SubTrigger>
  );
};

export type ContextMenuSubContentProps<T extends ValidComponent = "div"> =
  ContextMenuPrimitive.ContextMenuSubContentProps<T> & {
    class?: string;
  };

export const ContextMenuSubContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, ContextMenuSubContentProps<T>>
) => {
  const [local, rest] = splitProps(props as ContextMenuSubContentProps, ["class"]);

  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.SubContent
        class={cn(
          "z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md transition-all animate-in fade-in-80 slide-in-from-top-1",
          local.class
        )}
        {...(rest as any)}
      />
    </ContextMenuPrimitive.Portal>
  );
};

export type ContextMenuContentProps<T extends ValidComponent = "div"> =
  ContextMenuPrimitive.ContextMenuContentProps<T> & {
    class?: string;
    ref?: (el: HTMLElement) => void;
    children?: JSX.Element;
  };

export const ContextMenuContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, ContextMenuContentProps<T>>
) => {
  const [local, rest] = splitProps(props as ContextMenuContentProps, ["class", "ref", "children"]);
  let menuRef: HTMLElement | undefined;

  createClickOutside({
    target: () => menuRef,
    onInteractOutside: () => {
      // Automatic portal dismiss on outside click
    },
  });

  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        ref={(el) => {
          menuRef = el;
          if (typeof local.ref === "function") local.ref(el);
        }}
        class={cn(
          "z-50 min-w-[8rem] rounded-md border border-border bg-popover text-popover-foreground shadow-md transition-all animate-in fade-in-80 slide-in-from-top-1 max-h-72 flex flex-col",
          local.class
        )}
        {...(rest as any)}
      >
        <ScrollArea class="max-h-72 w-full rounded-[inherit]">
          <div class="p-1">
            {local.children}
          </div>
        </ScrollArea>
      </ContextMenuPrimitive.Content>
    </ContextMenuPrimitive.Portal>
  );
};

export type ContextMenuItemProps<T extends ValidComponent = "div"> =
  ContextMenuPrimitive.ContextMenuItemProps<T> & {
    class?: string;
    inset?: boolean;
  };

export const ContextMenuItem = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, ContextMenuItemProps<T>>
) => {
  const [local, rest] = splitProps(props as ContextMenuItemProps, ["class", "inset"]);

  return (
    <ContextMenuPrimitive.Item
      class={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-foreground",
        local.inset && "pl-8",
        local.class
      )}
      {...(rest as any)}
    />
  );
};

export type ContextMenuCheckboxItemProps<T extends ValidComponent = "div"> =
  ContextMenuPrimitive.ContextMenuCheckboxItemProps<T> & {
    class?: string;
    children?: JSX.Element;
    checked?: boolean;
  };

export const ContextMenuCheckboxItem = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, ContextMenuCheckboxItemProps<T>>
) => {
  const [local, rest] = splitProps(props as ContextMenuCheckboxItemProps, ["class", "children", "checked"]);

  return (
    <ContextMenuPrimitive.CheckboxItem
      checked={local.checked}
      class={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-foreground",
        local.class
      )}
      {...(rest as any)}
    >
      <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {local.children}
    </ContextMenuPrimitive.CheckboxItem>
  );
};

export interface ContextMenuShortcutProps extends JSX.HTMLAttributes<HTMLSpanElement> {
  class?: string;
  children?: JSX.Element;
}

export const ContextMenuShortcut: Component<ContextMenuShortcutProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <span class={cn("ml-auto text-xs tracking-widest text-muted-foreground", local.class)} {...rest}>
      <Kbd size="sm">{local.children}</Kbd>
    </span>
  );
};

export interface ContextMenuSeparatorProps {
  class?: string;
}

export const ContextMenuSeparator: Component<ContextMenuSeparatorProps> = (props) => {
  return <Separator class={cn("-mx-1 my-1 h-px bg-border", props.class)} />;
};
