import { splitProps, type JSX, type ValidComponent } from "solid-js";
import { Check, ChevronDown, X } from "lucide-solid";
import { ScrollArea } from "@/components/ui/scroll-area";
import * as ComboboxPrimitive from "@kobalte/core/combobox";
import { cn } from "@/lib/cn";

export type ComboboxRootProps<Option = any, OptGroup = any, T extends ValidComponent = "div"> =
  ComboboxPrimitive.ComboboxRootProps<Option, OptGroup, T>;

/**
 * Root Combobox primitive component wrapper.
 */
export const Combobox = <Option = any, OptGroup = any, T extends ValidComponent = "div">(
  props: ComboboxRootProps<Option, OptGroup, T>
) => {
  return <ComboboxPrimitive.Root {...props} />;
};

export type ComboboxControlProps<Option = any, T extends ValidComponent = "div"> =
  ComboboxPrimitive.ComboboxControlProps<Option, T> & {
    class?: string;
    children?: JSX.Element;
  };

/**
 * Input container box supporting single or multi-select tokens.
 */
export const ComboboxControl = <Option = any, T extends ValidComponent = "div">(
  props: ComboboxControlProps<Option, T>
) => {
  const [local, rest] = splitProps(props as ComboboxControlProps, ["class", "children"]);

  return (
    <ComboboxPrimitive.Control
      class={cn(
        "flex min-h-9 w-full flex-wrap items-center gap-1.5 rounded-md border border-input bg-muted px-3 py-1.5 text-sm shadow-2xs ring-offset-background focus-within:ring-1 focus-within:ring-primary focus-within:border-primary disabled:cursor-not-allowed disabled:opacity-50 text-foreground cursor-text transition-colors",
        local.class
      )}
      {...(rest as any)}
    >
      {local.children}
    </ComboboxPrimitive.Control>
  );
};

export type ComboboxInputProps<T extends ValidComponent = "input"> =
  ComboboxPrimitive.ComboboxInputProps<T> & {
    class?: string;
    openOnFocus?: boolean;
  };

/**
 * Filter search input field.
 */
export const ComboboxInput = <T extends ValidComponent = "input">(
  props: ComboboxInputProps<T>
) => {
  const [local, rest] = splitProps(props as ComboboxInputProps, ["class", "openOnFocus", "onFocus", "onClick"]);

  return (
    <ComboboxPrimitive.Input
      class={cn(
        "flex-1 bg-transparent py-1 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed text-foreground min-w-16",
        local.class
      )}
      onFocus={(e: FocusEvent) => {
        if (typeof local.onFocus === "function") local.onFocus(e as any);
      }}
      onClick={(e: MouseEvent) => {
        if (typeof local.onClick === "function") local.onClick(e as any);
      }}
      {...(rest as any)}
    />
  );
};

export type ComboboxTriggerProps<T extends ValidComponent = "button"> =
  ComboboxPrimitive.ComboboxTriggerProps<T> & {
    class?: string;
  };

/**
 * Dropdown chevron trigger icon.
 */
export const ComboboxTrigger = <T extends ValidComponent = "button">(
  props: ComboboxTriggerProps<T>
) => {
  const [local, rest] = splitProps(props as ComboboxTriggerProps, ["class"]);

  return (
    <ComboboxPrimitive.Trigger
      class={cn(
        "flex h-4 w-4 items-center justify-center opacity-50 hover:opacity-100 transition-opacity focus:outline-none cursor-pointer",
        local.class
      )}
      {...(rest as any)}
    >
      <ComboboxPrimitive.Icon
        as="svg"
        class="h-4 w-4 stroke-current stroke-2 fill-none"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </ComboboxPrimitive.Icon>
    </ComboboxPrimitive.Trigger>
  );
};

export type ComboboxTokenProps<Option = any> = {
  class?: string;
  children?: JSX.Element;
  item?: Option;
  onRemove?: () => void;
};

/**
 * Selected item tag token pill rendered in multi-select mode.
 */
export const ComboboxToken = <Option = any>(props: ComboboxTokenProps<Option>) => {
  const [local, rest] = splitProps(props, ["class", "children", "onRemove"]);

  return (
    <span
      class={cn(
        "inline-flex items-center gap-1.5 rounded-md bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground border border-border shadow-2xs animate-in fade-in-50",
        local.class
      )}
      {...rest}
    >
      <span class="truncate">{local.children}</span>
      <button
        type="button"
        tabIndex={-1}
        onClick={(e) => {
          e.stopPropagation();
          if (local.onRemove) local.onRemove();
        }}
        class="rounded-xs opacity-70 hover:opacity-100 focus:outline-none cursor-pointer text-muted-foreground hover:text-foreground"
      >
        <X class="h-3 w-3" />
        <span class="sr-only">Remove</span>
      </button>
    </span>
  );
};

export type ComboboxContentProps<T extends ValidComponent = "div"> =
  ComboboxPrimitive.ComboboxContentProps<T> & {
    class?: string;
  };

/**
 * Portaled popover content listbox container.
 */
export const ComboboxContent = <T extends ValidComponent = "div">(
  props: ComboboxContentProps<T>
) => {
  const [local, rest] = splitProps(props as ComboboxContentProps, ["class"]);

  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Content
        class={cn(
          "relative z-50 min-w-8rem overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-md animate-in fade-in-80 data-expanded:animate-in data-closed:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-closed:zoom-out-95 data-expanded:zoom-in-95 max-h-60",
          local.class
        )}
        {...(rest as any)}
      >
        <ScrollArea class="max-h-60">
          <ComboboxPrimitive.Listbox class="p-1 outline-none" />
        </ScrollArea>
      </ComboboxPrimitive.Content>
    </ComboboxPrimitive.Portal>
  );
};

export type ComboboxItemProps<T extends ValidComponent = "li"> =
  ComboboxPrimitive.ComboboxItemProps<T> & {
    class?: string;
    children?: JSX.Element;
  };

/**
 * Individual option item inside listbox supporting custom avatars, icons, and titles.
 */
export const ComboboxItem = <T extends ValidComponent = "li">(
  props: ComboboxItemProps<T>
) => {
  const [local, rest] = splitProps(props as ComboboxItemProps, ["class", "children"]);

  return (
    <ComboboxPrimitive.Item
      class={cn(
        "relative flex w-full cursor-pointer select-none items-center justify-between rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50 text-foreground transition-colors",
        local.class
      )}
      {...(rest as any)}
    >
      <ComboboxPrimitive.ItemLabel class="flex-1 truncate">
        {local.children}
      </ComboboxPrimitive.ItemLabel>
      <ComboboxPrimitive.ItemIndicator class="ml-2 flex h-4 w-4 items-center justify-center text-primary">
        <Check class="h-4 w-4 stroke-2" />
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  );
};

export type ComboboxGroupProps<T extends ValidComponent = "li"> =
  ComboboxPrimitive.ComboboxGroupProps<T> & {
    class?: string;
    label?: JSX.Element;
    children?: JSX.Element;
  };

/**
 * Grouped category container with a group title header.
 */
export const ComboboxGroup = <T extends ValidComponent = "li">(
  props: ComboboxGroupProps<T>
) => {
  const [local, rest] = splitProps(props as ComboboxGroupProps, ["class", "label", "children"]);

  return (
    <ComboboxPrimitive.Group class={cn("overflow-hidden p-1 text-foreground", local.class)} {...(rest as any)}>
      {local.label && (
        <ComboboxPrimitive.GroupLabel class="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {local.label}
        </ComboboxPrimitive.GroupLabel>
      )}
      {local.children}
    </ComboboxPrimitive.Group>
  );
};
