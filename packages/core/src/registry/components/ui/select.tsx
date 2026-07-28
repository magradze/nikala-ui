import { splitProps, type JSX, type ValidComponent } from "solid-js";
import * as SelectPrimitive from "@kobalte/core/select";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import { cn } from "@/lib/cn";

export type SelectRootProps<Option = any, OptGroup = any, T extends ValidComponent = "div"> =
  SelectPrimitive.SelectRootProps<Option, OptGroup, T> & {
    class?: string;
  };

/**
 * Root Select component built on top of Kobalte headless primitives.
 */
export const Select = <Option = any, OptGroup = any, T extends ValidComponent = "div">(
  props: PolymorphicProps<T, SelectRootProps<Option, OptGroup, T>>
) => {
  const [local, rest] = splitProps(props as SelectRootProps, ["class"]);

  return <SelectPrimitive.Root class={cn("relative w-full", local.class)} {...(rest as any)} />;
};

export type SelectTriggerProps<T extends ValidComponent = "button"> =
  SelectPrimitive.SelectTriggerProps<T> & {
    class?: string;
    children?: JSX.Element;
  };

/**
 * Trigger button opening the Select options list.
 */
export const SelectTrigger = <T extends ValidComponent = "button">(
  props: PolymorphicProps<T, SelectTriggerProps<T>>
) => {
  const [local, rest] = splitProps(props as SelectTriggerProps, ["class", "children"]);

  return (
    <SelectPrimitive.Trigger
      class={cn(
        "flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer text-foreground",
        local.class
      )}
      {...rest}
    >
      {local.children}
      <SelectPrimitive.Icon
        as="svg"
        class="h-4 w-4 opacity-50 transition-transform"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
};

export type SelectValueProps<Option, T extends ValidComponent = "span"> =
  SelectPrimitive.SelectValueProps<Option, T> & {
    class?: string;
  };

/**
 * Renders the currently selected option text or placeholder.
 */
export const SelectValue = <Option = any, T extends ValidComponent = "span">(
  props: PolymorphicProps<T, SelectValueProps<Option, T>>
) => {
  const [local, rest] = splitProps(props as SelectValueProps<Option>, ["class"]);

  return (
    <SelectPrimitive.Value
      class={cn("block truncate", local.class)}
      {...(rest as any)}
    />
  );
};

export type SelectContentProps<T extends ValidComponent = "div"> =
  SelectPrimitive.SelectContentProps<T> & {
    class?: string;
  };

/**
 * Portaled overlay container rendering the listbox options.
 */
export const SelectContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, SelectContentProps<T>>
) => {
  const [local, rest] = splitProps(props as SelectContentProps, ["class"]);

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        class={cn(
          "relative z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-md animate-in fade-in-80",
          local.class
        )}
        {...rest}
      >
        <SelectPrimitive.Listbox class="p-1 outline-none" />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
};

export type SelectItemProps<T extends ValidComponent = "li"> =
  SelectPrimitive.SelectItemProps<T> & {
    class?: string;
    children?: JSX.Element;
  };

/**
 * Individual option item choice inside SelectContent.
 */
export const SelectItem = <T extends ValidComponent = "li">(
  props: PolymorphicProps<T, SelectItemProps<T>>
) => {
  const [local, rest] = splitProps(props as SelectItemProps, ["class", "children"]);

  return (
    <SelectPrimitive.Item
      class={cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
        local.class
      )}
      {...rest}
    >
      <SelectPrimitive.ItemIndicator class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <svg class="h-4 w-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </SelectPrimitive.ItemIndicator>
      <SelectPrimitive.ItemLabel>{local.children}</SelectPrimitive.ItemLabel>
    </SelectPrimitive.Item>
  );
};