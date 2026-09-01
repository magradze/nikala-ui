import { splitProps, type JSX, type ValidComponent } from "solid-js";
import { Check, ChevronDown, X } from "lucide-solid";
import { ScrollArea } from "@/components/ui/scroll-area";
import * as ComboboxPrimitive from "@kobalte/core/combobox";
import { cn } from "@/lib/cn";

export type ComboboxRootProps<Option = any, OptGroup = any, T extends ValidComponent = "div"> =
  ComboboxPrimitive.ComboboxRootProps<Option, OptGroup, T> & {
    class?: string;
    children?: JSX.Element;
    triggerMode?: "input" | "focus" | "both" | "manual";
  };

/**
 * Root Combobox component providing search, single/multi-selection, and group support.
 * `triggerMode="focus"` or `triggerMode="both"` enables opening dropdown on input click/focus.
 */
export const Combobox = <Option = any, OptGroup = any, T extends ValidComponent = "div">(
  props: ComboboxRootProps<Option, OptGroup, T>
) => {
  const [local, rest] = splitProps(props as ComboboxRootProps, ["class", "children", "triggerMode"]);

  return (
    <ComboboxPrimitive.Root
      triggerMode={local.triggerMode ?? "input"}
      class={cn("relative w-full", local.class)}
      {...(rest as any)}
    >
      {local.children}
    </ComboboxPrimitive.Root>
  );
};

export type ComboboxControlProps<Option = any, T extends ValidComponent = "div"> =
  ComboboxPrimitive.ComboboxControlProps<Option, T> & {
    class?: string;
    children?: JSX.Element;
    clearable?: boolean;
    onClear?: () => void;
  };

/**
 * Input container for Combobox supporting search input, selected tags, and clear button.
 */
export const ComboboxControl = <Option = any, T extends ValidComponent = "div">(
  props: ComboboxControlProps<Option, T>
) => {
  const [local, rest] = splitProps(props as ComboboxControlProps, [
    "class",
    "children",
    "clearable",
    "onClear",
  ]);

  return (
    <ComboboxPrimitive.Control
      class={cn(
        "flex min-h-9 w-full flex-wrap items-center justify-between rounded-md border border-input bg-muted px-3 py-1 text-sm shadow-sm transition-colors focus-within:ring-1 focus-within:ring-primary focus-within:border-primary disabled:cursor-not-allowed disabled:opacity-50 gap-1.5 text-foreground",
        local.class
      )}
      {...(rest as any)}
    >
      <div class="flex flex-wrap items-center gap-1.5 flex-1 min-w-0">
        {local.children}
      </div>

      <div class="flex items-center gap-1 shrink-0 self-center">
        {local.clearable && (
          <button
            type="button"
            tabIndex={-1}
            onClick={(e) => {
              e.stopPropagation();
              if (local.onClear) local.onClear();
            }}
            class="rounded-sm p-0.5 opacity-60 hover:opacity-100 hover:bg-accent text-foreground transition-opacity focus:outline-none cursor-pointer"
            aria-label="Clear selection"
          >
            <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        <ComboboxTrigger />
      </div>
    </ComboboxPrimitive.Control>
  );
};

export type ComboboxInputProps<T extends ValidComponent = "input"> =
  ComboboxPrimitive.ComboboxInputProps<T> & {
    class?: string;
    openOnFocus?: boolean;
  };

/**
 * Search input field embedded within ComboboxControl.
 * Supports `openOnFocus` to automatically trigger the dropdown when focused or clicked.
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
        class="rounded-xs p-0.5 hover:bg-muted-foreground/20 text-muted-foreground hover:text-foreground transition-colors focus:outline-none cursor-pointer"
        aria-label="Remove tag"
      >
        <svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
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
        <ScrollArea class="max-h-60 w-full">
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
        "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-accent data-highlighted:text-accent-foreground text-popover-foreground transition-colors",
        local.class
      )}
      {...rest}
    >
      <ComboboxPrimitive.ItemIndicator class="absolute left-2 flex h-4 w-4 items-center justify-center text-primary">
        <svg class="h-4 w-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </ComboboxPrimitive.ItemIndicator>
      <ComboboxPrimitive.ItemLabel class="flex items-center gap-2 w-full truncate">
        {local.children}
      </ComboboxPrimitive.ItemLabel>
    </ComboboxPrimitive.Item>
  );
};

export type ComboboxGroupProps<T extends ValidComponent = "li"> =
  ComboboxPrimitive.ComboboxSectionProps<T> & {
    class?: string;
    children?: JSX.Element;
    label?: JSX.Element;
  };

/**
 * Group container for organizing related options.
 */
export const ComboboxGroup = <T extends ValidComponent = "li">(
  props: ComboboxGroupProps<T>
) => {
  const [local, rest] = splitProps(props as ComboboxGroupProps, ["class", "children", "label"]);

  return (
    <ComboboxPrimitive.Section class={cn("px-1 py-1", local.class)} {...(rest as any)}>
      {local.label && (
        <span class="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
          {local.label}
        </span>
      )}
      {local.children}
    </ComboboxPrimitive.Section>
  );
};

/**
 * Empty state notice when no matching search items exist.
 */
export const ComboboxEmpty = (props: { class?: string; children?: JSX.Element }) => {
  return (
    <div class={cn("py-6 text-center text-sm text-muted-foreground", props.class)}>
      {props.children || "No matching items found."}
    </div>
  );
};

/**
 * Hidden native select element for form integrations.
 */
export const ComboboxHiddenSelect = ComboboxPrimitive.HiddenSelect;
