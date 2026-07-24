import { splitProps, type JSX, type ValidComponent } from "solid-js";
import * as RadioGroupPrimitive from "@kobalte/core/radio-group";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import { cn } from "@/lib/cn";

export type RadioGroupRootProps<T extends ValidComponent = "div"> =
  RadioGroupPrimitive.RadioGroupRootProps<T> & {
    class?: string;
  };

/**
 * Root RadioGroup component built on top of Kobalte headless primitives.
 */
export const RadioGroup = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, RadioGroupRootProps<T>>
) => {
  const [local, rest] = splitProps(props as RadioGroupRootProps, ["class"]);

  return (
    <RadioGroupPrimitive.Root
      class={cn(
        "grid gap-2 data-[orientation=horizontal]:flex data-[orientation=horizontal]:flex-row data-[orientation=horizontal]:items-center data-[orientation=horizontal]:gap-4",
        local.class
      )}
      {...rest}
    />
  );
};

export type RadioGroupItemProps<T extends ValidComponent = "div"> =
  RadioGroupPrimitive.RadioGroupItemProps<T> & {
    class?: string;
    children?: JSX.Element;
    id?: string;
    value: string;
  };

/**
 * Accessible RadioGroup item choice wrapping Kobalte primitives.
 */
export const RadioGroupItem = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, RadioGroupItemProps<T>>
) => {
  const [local, rest] = splitProps(props as RadioGroupItemProps, ["class", "children"]);

  return (
    <RadioGroupPrimitive.Item
      class={cn("flex items-center space-x-2 cursor-pointer", local.class)}
      {...rest}
    >
      <RadioGroupPrimitive.ItemInput />
      <RadioGroupPrimitive.ItemControl
        class={cn(
          "aspect-square h-4 w-4 rounded-full border border-zinc-900 text-zinc-900 shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-100 dark:text-zinc-50 dark:focus-visible:ring-zinc-300 flex items-center justify-center transition-colors data-[checked]:bg-zinc-900 dark:data-[checked]:bg-zinc-50"
        )}
      >
        <RadioGroupPrimitive.ItemIndicator class="flex items-center justify-center">
          <span class="h-2 w-2 rounded-full bg-zinc-50 dark:bg-zinc-900" />
        </RadioGroupPrimitive.ItemIndicator>
      </RadioGroupPrimitive.ItemControl>
      {local.children}
    </RadioGroupPrimitive.Item>
  );
};

export type RadioGroupItemLabelProps<T extends ValidComponent = "label"> =
  RadioGroupPrimitive.RadioGroupItemLabelProps<T> & {
    class?: string;
    children?: JSX.Element;
  };

/**
 * Accessible text label for a RadioGroup item.
 */
export const RadioGroupItemLabel = <T extends ValidComponent = "label">(
  props: PolymorphicProps<T, RadioGroupItemLabelProps<T>>
) => {
  const [local, rest] = splitProps(props as RadioGroupItemLabelProps, ["class"]);

  return (
    <RadioGroupPrimitive.ItemLabel
      class={cn(
        "text-sm font-medium leading-none select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-950 dark:text-zinc-50",
        local.class
      )}
      {...rest}
    />
  );
};