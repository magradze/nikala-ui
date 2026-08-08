import { splitProps, type Component, type JSX } from "solid-js";
import { ToggleButton as KobalteToggle } from "@kobalte/core/toggle-button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

export const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[pressed]:bg-accent data-[pressed]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground data-[pressed]:bg-accent data-[pressed]:text-accent-foreground",
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

export interface ToggleProps
  extends JSX.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof toggleVariants> {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  disabled?: boolean;
  class?: string;
  children?: JSX.Element;
}

export const Toggle: Component<ToggleProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "variant",
    "size",
    "class",
    "children",
    "pressed",
    "defaultPressed",
    "onPressedChange",
    "disabled",
    "onChange",
  ]);

  return (
    <KobalteToggle
      isPressed={local.pressed}
      defaultIsPressed={local.defaultPressed}
      onChange={local.onPressedChange}
      disabled={local.disabled}
      class={cn(
        toggleVariants({ variant: local.variant, size: local.size }),
        local.class
      )}
      {...rest}
    >
      {local.children}
    </KobalteToggle>
  );
};

export interface ToggleGroupProps extends JSX.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple";
  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: (value: any) => void;
  disabled?: boolean;
  class?: string;
  children?: JSX.Element;
}

export const ToggleGroup: Component<ToggleGroupProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "type",
    "value",
    "defaultValue",
    "onChange",
    "disabled",
    "class",
    "children",
  ]);

  return (
    <div
      class={cn(
        "flex items-center justify-center gap-1 rounded-md border border-border/40 p-1 bg-background",
        local.class
      )}
      {...rest}
    >
      {local.children}
    </div>
  );
};
