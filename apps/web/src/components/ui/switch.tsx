import { splitProps, type Component, type JSX } from "solid-js";
import { createControllableSignal } from "@nikala-ui/hooks";
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
  const [local, rest] = splitProps(props, [
    "checked",
    "defaultChecked",
    "onChange",
    "disabled",
    "class",
    "onClick",
  ]);

  const [isChecked, setIsChecked] = createControllableSignal({
    value: () => local.checked,
    defaultValue: local.defaultChecked ?? false,
    onChange: (val) => local.onChange?.(val),
  });

  const toggle = (
    e: MouseEvent & { currentTarget: HTMLButtonElement; target: Element }
  ) => {
    if (local.disabled) return;
    setIsChecked(!isChecked());

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
        "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-lg border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted",
        local.class
      )}
      {...rest}
    >
      <span
        data-state={isChecked() ? "checked" : "unchecked"}
        class={cn(
          "pointer-events-none block h-4 w-4 rounded-sm bg-primary-foreground shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
        )}
      />
    </button>
  );
};