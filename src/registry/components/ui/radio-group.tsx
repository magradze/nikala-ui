import {
  createContext,
  useContext,
  createSignal,
  splitProps,
  Show,
  type Component,
  type JSX,
  type Accessor,
} from "solid-js";
import { cn } from "@/lib/cn";

interface RadioGroupContextValue {
  value: Accessor<string | undefined>;
  setValue: (value: string) => void;
  disabled: Accessor<boolean>;
}

const RadioGroupContext = createContext<RadioGroupContextValue>();

export interface RadioGroupProps
  extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Controlled value */
  value?: string;
  /** Uncontrolled default value */
  defaultValue?: string;
  /** Callback fired when selection changes */
  onChange?: (value: string) => void;
  /** Layout orientation of radio items */
  orientation?: "vertical" | "horizontal";
  disabled?: boolean;
  class?: string;
}

/**
 * Root RadioGroup container component managing radio state context and orientation.
 */
export const RadioGroup: Component<RadioGroupProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "value",
    "defaultValue",
    "onChange",
    "orientation",
    "disabled",
    "class",
    "children",
  ]);

  const [internalValue, setInternalValue] = createSignal(
    local.defaultValue
  );

  const currentValue = () =>
    local.value !== undefined ? local.value : internalValue();

  const orientation = () => local.orientation || "vertical";

  const handleSelect = (val: string) => {
    if (local.disabled) return;
    if (local.value === undefined) {
      setInternalValue(val);
    }
    if (typeof local.onChange === "function") {
      local.onChange(val);
    }
  };

  const contextValue: RadioGroupContextValue = {
    value: currentValue,
    setValue: handleSelect,
    disabled: () => !!local.disabled,
  };

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <div
        role="radiogroup"
        aria-orientation={orientation()}
        class={cn(
          orientation() === "horizontal"
            ? "flex flex-row items-center gap-4"
            : "grid gap-2",
          local.class
        )}
        {...rest}
      >
        {local.children}
      </div>
    </RadioGroupContext.Provider>
  );
};

export interface RadioGroupItemProps
  extends Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  /** Unique value for this radio option */
  value: string;
  class?: string;
}

/**
 * Individual radio option item within a RadioGroup.
 */
export const RadioGroupItem: Component<RadioGroupItemProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "value",
    "disabled",
    "class",
    "onClick",
  ]);
  const context = useContext(RadioGroupContext);

  if (!context) {
    throw new Error("RadioGroupItem must be used within a RadioGroup component");
  }

  const isChecked = () => context.value() === local.value;
  const isDisabled = () => local.disabled || context.disabled();

  const handleClick = (
    e: MouseEvent & { currentTarget: HTMLButtonElement; target: Element }
  ) => {
    if (isDisabled()) return;
    context.setValue(local.value);
    if (typeof local.onClick === "function") {
      local.onClick(e);
    }
  };

  return (
    <button
      type="button"
      role="radio"
      aria-checked={isChecked()}
      data-state={isChecked() ? "checked" : "unchecked"}
      disabled={isDisabled()}
      onClick={handleClick}
      class={cn(
        "aspect-square h-4 w-4 rounded-full border border-zinc-900 text-zinc-900 shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-100 dark:text-zinc-50 dark:focus-visible:ring-zinc-300 flex items-center justify-center transition-colors",
        local.class
      )}
      {...rest}
    >
      <Show when={isChecked()}>
        <span class="h-2 w-2 rounded-full bg-zinc-900 dark:bg-zinc-50" />
      </Show>
    </button>
  );
};