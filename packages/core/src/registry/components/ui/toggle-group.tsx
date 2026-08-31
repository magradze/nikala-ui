import {
  createContext,
  useContext,
  splitProps,
  type Component,
  type JSX,
  type Accessor,
} from "solid-js";
import { cva, type VariantProps } from "class-variance-authority";
import { createControllableSignal } from "@/hooks/create-controllable-signal";
import { cn } from "@/lib/cn";

export const toggleGroupItemVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-border bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
      },
      size: {
        default: "h-9 px-3 min-w-9",
        sm: "h-8 px-2 text-xs min-w-8",
        lg: "h-10 px-3 min-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ToggleGroupContextValue {
  type: "single" | "multiple";
  value: Accessor<any>;
  onItemSelect: (itemValue: string) => void;
  variant: Accessor<"default" | "outline">;
  size: Accessor<"default" | "sm" | "lg">;
  disabled: Accessor<boolean>;
}

const ToggleGroupContext = createContext<ToggleGroupContextValue>();

export interface ToggleGroupProps<T extends "single" | "multiple" = "single">
  extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof toggleGroupItemVariants> {
  /** Mode of selection: single choice or multiple choices */
  type?: T;
  /** Controlled value: string for 'single', string[] for 'multiple' */
  value?: T extends "multiple" ? string[] : string;
  /** Uncontrolled default value */
  defaultValue?: T extends "multiple" ? string[] : string;
  /** Callback fired when selection changes */
  onChange?: (value: T extends "multiple" ? string[] : string) => void;
  /** Layout orientation */
  orientation?: "horizontal" | "vertical";
  /** Disables all buttons in the group */
  disabled?: boolean;
  class?: string;
  children?: JSX.Element;
}

/**
 * Root container for grouping connected toggle items with shared single/multiple selection state.
 */
export const ToggleGroup = <T extends "single" | "multiple" = "single">(
  props: ToggleGroupProps<T>
) => {
  const [local, rest] = splitProps(props, [
    "type",
    "value",
    "defaultValue",
    "onChange",
    "orientation",
    "variant",
    "size",
    "disabled",
    "class",
    "children",
  ]);

  const type = () => local.type ?? ("single" as T);
  const variant = () => local.variant ?? "default";
  const size = () => local.size ?? "default";
  const disabled = () => local.disabled ?? false;
  const orientation = () => local.orientation ?? "horizontal";

  const [currentValue, setCurrentValue] = createControllableSignal<any>({
    value: () => local.value,
    defaultValue: local.defaultValue ?? (type() === "multiple" ? [] : undefined),
    onChange: (val) => local.onChange?.(val),
  });

  const onItemSelect = (itemValue: string) => {
    if (disabled()) return;

    if (type() === "multiple") {
      const currentList = Array.isArray(currentValue()) ? currentValue() : [];
      if (currentList.includes(itemValue)) {
        setCurrentValue(currentList.filter((v: string) => v !== itemValue));
      } else {
        setCurrentValue([...currentList, itemValue]);
      }
    } else {
      const current = currentValue();
      if (current === itemValue) {
        setCurrentValue(undefined);
      } else {
        setCurrentValue(itemValue);
      }
    }
  };

  const contextValue: ToggleGroupContextValue = {
    type: type(),
    value: currentValue,
    onItemSelect,
    variant,
    size,
    disabled,
  };

  return (
    <ToggleGroupContext.Provider value={contextValue}>
      <div
        role="group"
        data-orientation={orientation()}
        class={cn(
          "flex items-center justify-center gap-1 rounded-lg",
          orientation() === "vertical" ? "flex-col" : "flex-row",
          local.class
        )}
        {...rest}
      >
        {local.children}
      </div>
    </ToggleGroupContext.Provider>
  );
};

export interface ToggleGroupItemProps
  extends JSX.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof toggleGroupItemVariants> {
  /** Unique value representing this toggle item within the group */
  value: string;
  class?: string;
  children?: JSX.Element;
}

/**
 * Individual toggle button item within a ToggleGroup.
 */
export const ToggleGroupItem: Component<ToggleGroupItemProps> = (props) => {
  const context = useContext(ToggleGroupContext);

  if (!context) {
    throw new Error("ToggleGroupItem must be used within a ToggleGroup");
  }

  const [local, rest] = splitProps(props, [
    "value",
    "variant",
    "size",
    "disabled",
    "class",
    "children",
  ]);

  const isSelected = () => {
    const groupValue = context.value();
    if (context.type === "multiple") {
      return Array.isArray(groupValue) && groupValue.includes(local.value);
    }
    return groupValue === local.value;
  };

  const isDisabled = () => local.disabled || context.disabled();
  const itemVariant = () => local.variant || context.variant();
  const itemSize = () => local.size || context.size();

  return (
    <button
      type="button"
      role={context.type === "single" ? "radio" : "checkbox"}
      aria-checked={isSelected()}
      data-state={isSelected() ? "on" : "off"}
      disabled={isDisabled()}
      onClick={() => context.onItemSelect(local.value)}
      class={cn(
        toggleGroupItemVariants({
          variant: itemVariant(),
          size: itemSize(),
        }),
        local.class
      )}
      {...rest}
    >
      {local.children}
    </button>
  );
};
