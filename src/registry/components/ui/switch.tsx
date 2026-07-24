import { createSignal, splitProps, type Component, type JSX } from "solid-js";
import { cn } from "@/lib/cn";

export interface SwitchProps
  extends Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  /** Controlled checked state */
  checked?: boolean;
  /** Uncontrolled default checked state */
  defaultChecked?: boolean;
  /** Event handler triggered when toggle state changes */
  onChange?: (checked: boolean) => void;
  class?: string;
}

/**
 * Nikala UI Switch component for boolean toggle inputs built for SolidJS with Tailwind CSS v4 styling.
 */
export const Switch: Component<SwitchProps> = (props) => {
  // Use splitProps to preserve SolidJS reactivity
  const [local, rest] = splitProps(props, [
    "checked",
    "defaultChecked",
    "onChange",
    "disabled",
    "class",
    "onClick",
  ]);

  // Internal state for uncontrolled mode
  const [internalChecked, setInternalChecked] = createSignal(
    local.defaultChecked ?? false
  );

  // Computed checked state supporting both controlled and uncontrolled modes
  const isChecked = () =>
    local.checked !== undefined ? local.checked : internalChecked();

  const toggle = (
    e: MouseEvent & { currentTarget: HTMLButtonElement; target: Element }
  ) => {
    if (local.disabled) return;

    const nextState = !isChecked();
    if (local.checked === undefined) {
      setInternalChecked(nextState);
    }

    if (typeof local.onChange === "function") {
      local.onChange(nextState);
    }

    if (typeof local.onClick === "function") {
      local.onClick(e);
    }
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isChecked()}
      data-state={isChecked() ? "checked" : "unchecked"}
      disabled={local.disabled}
      onClick={toggle}
      class={cn(
        "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
        local.class
      )}
      {...rest}
    >
      <span
        data-state={isChecked() ? "checked" : "unchecked"}
        class={cn(
          "pointer-events-none block h-4 w-4 rounded-full bg-primary-foreground shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
        )}
      />
    </button>
  );
};