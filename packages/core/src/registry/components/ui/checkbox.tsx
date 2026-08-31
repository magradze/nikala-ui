import { splitProps, Show, type Component, type JSX } from "solid-js";
import { createControllableSignal } from "@/hooks/create-controllable-signal";
import { cn } from "@/lib/cn";

export interface CheckboxProps
  extends Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  /** Controlled checked state */
  checked?: boolean;
  /** Uncontrolled default checked state */
  defaultChecked?: boolean;
  /** Event handler triggered when checked state changes */
  onChange?: (checked: boolean) => void;
  class?: string;
}

/**
 * Nikala UI Checkbox component built for SolidJS with Tailwind CSS v4 styling.
 */
export const Checkbox: Component<CheckboxProps> = (props) => {
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
      role="checkbox"
      aria-checked={isChecked()}
      data-state={isChecked() ? "checked" : "unchecked"}
      disabled={local.disabled}
      onClick={toggle}
      class={cn(
        "peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground flex items-center justify-center transition-colors",
        local.class
      )}
      {...rest}
    >
      <Show when={isChecked()}>
        <svg
          class="h-3.5 w-3.5 fill-none stroke-current stroke-[3]"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </Show>
    </button>
  );
};