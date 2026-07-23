import {
  createContext,
  useContext,
  createSignal,
  splitProps,
  onMount,
  onCleanup,
  Show,
  type Component,
  type JSX,
  type Accessor,
} from "solid-js";
import { cn } from "@/lib/cn";

interface SelectContextValue {
  value: Accessor<string | undefined>;
  label: Accessor<string | undefined>;
  isOpen: Accessor<boolean>;
  toggle: () => void;
  close: () => void;
  selectOption: (value: string, label?: string) => void;
  disabled: Accessor<boolean>;
}

const SelectContext = createContext<SelectContextValue>();

export interface SelectProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  class?: string;
  children?: JSX.Element;
}

/**
 * Root Select component managing dropdown state context.
 */
export const Select: Component<SelectProps> = (props) => {
  const [local] = splitProps(props, [
    "value",
    "defaultValue",
    "onChange",
    "disabled",
    "class",
    "children",
  ]);

  const [internalValue, setInternalValue] = createSignal(local.defaultValue);
  const [selectedLabel, setSelectedLabel] = createSignal<string | undefined>();
  const [isOpen, setIsOpen] = createSignal(false);

  const currentValue = () =>
    local.value !== undefined ? local.value : internalValue();

  let containerRef: HTMLDivElement | undefined;

  // Handle outside click to close dropdown menu
  const handleOutsideClick = (e: MouseEvent) => {
    if (containerRef && !containerRef.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  // Handle Escape key press
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  onMount(() => {
    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);
  });

  onCleanup(() => {
    document.removeEventListener("click", handleOutsideClick);
    document.removeEventListener("keydown", handleKeyDown);
  });

  const selectOption = (val: string, lbl?: string) => {
    if (local.disabled) return;
    if (local.value === undefined) {
      setInternalValue(val);
    }
    setSelectedLabel(lbl || val);
    setIsOpen(false);
    if (typeof local.onChange === "function") {
      local.onChange(val);
    }
  };

  const contextValue: SelectContextValue = {
    value: currentValue,
    label: selectedLabel,
    isOpen,
    toggle: () => !local.disabled && setIsOpen((prev) => !prev),
    close: () => setIsOpen(false),
    selectOption,
    disabled: () => !!local.disabled,
  };

  return (
    <SelectContext.Provider value={contextValue}>
      <div ref={containerRef} class={cn("relative inline-block w-full", local.class)}>
        {local.children}
      </div>
    </SelectContext.Provider>
  );
};

export interface SelectTriggerProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  class?: string;
}

/**
 * Trigger button to toggle the Select dropdown.
 */
export const SelectTrigger: Component<SelectTriggerProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children", "onClick"]);
  const context = useContext(SelectContext);

  if (!context) {
    throw new Error("SelectTrigger must be used within a Select component");
  }

  const handleClick = (
    e: MouseEvent & { currentTarget: HTMLButtonElement; target: Element }
  ) => {
    context.toggle();
    if (typeof local.onClick === "function") {
      local.onClick(e);
    }
  };

  return (
    <button
      type="button"
      role="combobox"
      aria-expanded={context.isOpen()}
      disabled={context.disabled()}
      onClick={handleClick}
      class={cn(
        "flex h-9 w-full items-center justify-between rounded-md border border-zinc-200 bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-white placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus:ring-zinc-300",
        local.class
      )}
      {...rest}
    >
      {local.children}
      <svg
        class={cn("h-4 w-4 opacity-50 transition-transform", context.isOpen() && "rotate-180")}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
};

export interface SelectValueProps {
  placeholder?: string;
  class?: string;
}

/**
 * Renders the selected option label or placeholder text.
 */
export const SelectValue: Component<SelectValueProps> = (props) => {
  const context = useContext(SelectContext);

  if (!context) {
    throw new Error("SelectValue must be used within a Select component");
  }

  const displayText = () => context.label() || context.value() || props.placeholder;

  return (
    <span class={cn("block truncate", !context.value() && "text-zinc-500 dark:text-zinc-400", props.class)}>
      {displayText()}
    </span>
  );
};

export interface SelectContentProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

/**
 * Popup container holding Select options.
 */
export const SelectContent: Component<SelectContentProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  const context = useContext(SelectContext);

  if (!context) {
    throw new Error("SelectContent must be used within a Select component");
  }

  return (
    <Show when={context.isOpen()}>
      <div
        class={cn(
          "absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-zinc-200 bg-white p-1 text-zinc-950 shadow-md animate-in fade-in-80 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50",
          local.class
        )}
        {...rest}
      >
        {local.children}
      </div>
    </Show>
  );
};

export interface SelectItemProps extends JSX.HTMLAttributes<HTMLDivElement> {
  value: string;
  class?: string;
}

/**
 * Individual option item inside SelectContent.
 */
export const SelectItem: Component<SelectItemProps> = (props) => {
  const [local, rest] = splitProps(props, ["value", "class", "children", "onClick"]);
  const context = useContext(SelectContext);

  if (!context) {
    throw new Error("SelectItem must be used within a Select component");
  }

  const isSelected = () => context.value() === local.value;

  const handleClick = (
    e: MouseEvent & { currentTarget: HTMLDivElement; target: Element }
  ) => {
    let labelText: string | undefined;
    if (typeof local.children === "string") {
      labelText = local.children;
    }
    context.selectOption(local.value, labelText);
    if (typeof local.onClick === "function") {
      local.onClick(e);
    }
  };

  return (
    <div
      role="option"
      aria-selected={isSelected()}
      onClick={handleClick}
      class={cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
        isSelected() && "bg-zinc-100 font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50",
        local.class
      )}
      {...rest}
    >
      <Show when={isSelected()}>
        <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          <svg class="h-4 w-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </span>
      </Show>
      {local.children}
    </div>
  );
};