import { splitProps, type Component, type JSX, type ValidComponent } from "solid-js";
import * as DropdownMenuPrimitive from "@kobalte/core/dropdown-menu";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import { createClickOutside } from "@nikala-ui/hooks";
import { cn } from "@/lib/cn";

export type DropdownMenuRootProps = Omit<
  DropdownMenuPrimitive.DropdownMenuRootProps,
  "placement"
> & {
  placement?:
    | "top"
    | "top-start"
    | "top-end"
    | "right"
    | "right-start"
    | "right-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end";
};

export const DropdownMenu: Component<DropdownMenuRootProps> = (props) => {
  return <DropdownMenuPrimitive.Root {...props} />;
};

export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;
export const DropdownMenuSub = DropdownMenuPrimitive.Sub;
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

export type DropdownMenuSubTriggerProps<T extends ValidComponent = "div"> =
  DropdownMenuPrimitive.DropdownMenuSubTriggerProps<T> & {
    class?: string;
    children?: JSX.Element;
    inset?: boolean;
  };

export const DropdownMenuSubTrigger = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, DropdownMenuSubTriggerProps<T>>
) => {
  const [local, rest] = splitProps(props as DropdownMenuSubTriggerProps, ["class", "children", "inset"]);

  return (
    <DropdownMenuPrimitive.SubTrigger
      class={cn(
        "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent text-foreground",
        local.inset && "pl-8",
        local.class
      )}
      {...(rest as any)}
    >
      {local.children}
      <svg class="ml-auto h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </DropdownMenuPrimitive.SubTrigger>
  );
};

export type DropdownMenuSubContentProps<T extends ValidComponent = "div"> =
  DropdownMenuPrimitive.DropdownMenuSubContentProps<T> & {
    class?: string;
  };

export const DropdownMenuSubContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, DropdownMenuSubContentProps<T>>
) => {
  const [local, rest] = splitProps(props as DropdownMenuSubContentProps, ["class"]);

  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.SubContent
        class={cn(
          "z-50 min-w-32 overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-lg data-expanded:animate-in data-closed:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0",
          local.class
        )}
        {...(rest as any)}
      />
    </DropdownMenuPrimitive.Portal>
  );
};

export type DropdownMenuContentProps<T extends ValidComponent = "div"> =
  DropdownMenuPrimitive.DropdownMenuContentProps<T> & {
    class?: string;
  };

export const DropdownMenuContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, DropdownMenuContentProps<T>>
) => {
  const [local, rest] = splitProps(props as DropdownMenuContentProps, ["class"]);
  let contentRef: HTMLElement | undefined;

  createClickOutside({
    target: () => contentRef,
    onInteractOutside: (e) => {
      if (typeof (props as any).onInteractOutside === "function") {
        (props as any).onInteractOutside(e);
      }
    },
  });

  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={(el) => {
          contentRef = el;
          if (typeof (props as any).ref === "function") (props as any).ref(el);
        }}
        class={cn(
          "z-50 min-w-32 mt-1 overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md data-expanded:animate-in data-closed:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0",
          local.class
        )}
        {...(rest as any)}
      />
    </DropdownMenuPrimitive.Portal>
  );
};

export type DropdownMenuItemProps<T extends ValidComponent = "div"> =
  DropdownMenuPrimitive.DropdownMenuItemProps<T> & {
    class?: string;
    inset?: boolean;
    variant?: "default" | "destructive";
  };

export const DropdownMenuItem = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, DropdownMenuItemProps<T>>
) => {
  const [local, rest] = splitProps(props as DropdownMenuItemProps, [
    "class",
    "inset",
    "variant",
  ]);

  return (
    <DropdownMenuPrimitive.Item
      class={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
        local.inset && "pl-8",
        local.variant === "destructive" &&
        "text-destructive focus:bg-destructive/15 focus:text-destructive",
        local.class
      )}
      {...(rest as any)}
    />
  );
};

export type DropdownMenuCheckboxItemProps<T extends ValidComponent = "div"> =
  DropdownMenuPrimitive.DropdownMenuCheckboxItemProps<T> & {
    class?: string;
    children?: JSX.Element;
  };

export const DropdownMenuCheckboxItem = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, DropdownMenuCheckboxItemProps<T>>
) => {
  const [local, rest] = splitProps(props as DropdownMenuCheckboxItemProps, ["class", "children"]);

  return (
    <DropdownMenuPrimitive.CheckboxItem
      class={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
        local.class
      )}
      {...(rest as any)}
    >
      <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <svg class="h-4 w-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {local.children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
};

export type DropdownMenuRadioItemProps<T extends ValidComponent = "div"> =
  DropdownMenuPrimitive.DropdownMenuRadioItemProps<T> & {
    class?: string;
    children?: JSX.Element;
  };

export const DropdownMenuRadioItem = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, DropdownMenuRadioItemProps<T>>
) => {
  const [local, rest] = splitProps(props as DropdownMenuRadioItemProps, ["class", "children"]);

  return (
    <DropdownMenuPrimitive.RadioItem
      class={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
        local.class
      )}
      {...(rest as any)}
    >
      <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <span class="h-2 w-2 rounded-full bg-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {local.children}
    </DropdownMenuPrimitive.RadioItem>
  );
};

export interface DropdownMenuLabelProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
  inset?: boolean;
}

export const DropdownMenuLabel: Component<DropdownMenuLabelProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "inset"]);

  return (
    <div
      class={cn(
        "px-2 py-1.5 text-sm font-semibold text-foreground",
        local.inset && "pl-8",
        local.class
      )}
      {...rest}
    />
  );
};

export type DropdownMenuSeparatorProps<T extends ValidComponent = "hr"> =
  DropdownMenuPrimitive.DropdownMenuSeparatorProps<T> & {
    class?: string;
  };

export const DropdownMenuSeparator = <T extends ValidComponent = "hr">(
  props: PolymorphicProps<T, DropdownMenuSeparatorProps<T>>
) => {
  const [local, rest] = splitProps(props as DropdownMenuSeparatorProps, ["class"]);

  return (
    <DropdownMenuPrimitive.Separator
      class={cn("-mx-1 my-1 h-px bg-border", local.class)}
      {...(rest as any)}
    />
  );
};

export interface DropdownMenuShortcutProps extends JSX.HTMLAttributes<HTMLSpanElement> {
  class?: string;
}

export const DropdownMenuShortcut: Component<DropdownMenuShortcutProps> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <span
      class={cn("ml-auto text-xs tracking-widest text-muted-foreground", local.class)}
      {...rest}
    />
  );
};