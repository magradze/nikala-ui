import { splitProps, type JSX, type ValidComponent } from "solid-js";
import * as AccordionPrimitive from "@kobalte/core/accordion";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import { cn } from "@/lib/cn";

export type AccordionRootProps<T extends ValidComponent = "div"> = Omit<
  AccordionPrimitive.AccordionRootProps<T>,
  "value" | "defaultValue"
> & {
  /** Accordion mode: "single" allows one open item, "multiple" allows many */
  type?: "single" | "multiple";
  /** Controlled value (single string or array of strings) */
  value?: string | string[];
  /** Default initial value (single string or array of strings) */
  defaultValue?: string | string[];
  class?: string;
};

/**
 * Root Accordion component built on top of Kobalte headless primitives.
 */
export const Accordion = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, AccordionRootProps<T>>
) => {
  const [local, rest] = splitProps(props as AccordionRootProps, [
    "class",
    "type",
    "multiple",
  ]);

  // Support both `type="multiple"` and `multiple={true}`
  const isMultiple = () => local.multiple ?? local.type === "multiple";

  return (
    <AccordionPrimitive.Root
      multiple={isMultiple()}
      class={cn("w-full divide-y divide-zinc-200 dark:divide-zinc-800", local.class)}
      {...(rest as any)}
    />
  );
};

export type AccordionItemProps<T extends ValidComponent = "div"> =
  AccordionPrimitive.AccordionItemProps<T> & {
    class?: string;
    value: string;
  };

/**
 * Individual Accordion section item wrapper.
 */
export const AccordionItem = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, AccordionItemProps<T>>
) => {
  const [local, rest] = splitProps(props as AccordionItemProps, ["class"]);

  return (
    <AccordionPrimitive.Item
      class={cn("border-b border-zinc-200 dark:border-zinc-800", local.class)}
      {...rest}
    />
  );
};

export type AccordionTriggerProps<T extends ValidComponent = "button"> =
  AccordionPrimitive.AccordionTriggerProps<T> & {
    class?: string;
    children?: JSX.Element;
  };

/**
 * Header trigger button toggling the expansion of an AccordionItem.
 */
export const AccordionTrigger = <T extends ValidComponent = "button">(
  props: PolymorphicProps<T, AccordionTriggerProps<T>>
) => {
  const [local, rest] = splitProps(props as AccordionTriggerProps, ["class", "children"]);

  return (
    <AccordionPrimitive.Header class="flex">
      <AccordionPrimitive.Trigger
        class={cn(
          "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-expanded]>svg]:rotate-180 cursor-pointer text-zinc-950 dark:text-zinc-50",
          local.class
        )}
        {...rest}
      >
        {local.children}
        <svg
          class="h-4 w-4 shrink-0 text-zinc-500 transition-transform duration-200 dark:text-zinc-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
};

export type AccordionContentProps<T extends ValidComponent = "div"> =
  AccordionPrimitive.AccordionContentProps<T> & {
    class?: string;
    children?: JSX.Element;
  };

/**
 * Collapsible content panel revealed when the associated AccordionItem is open.
 */
export const AccordionContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, AccordionContentProps<T>>
) => {
  const [local, rest] = splitProps(props as AccordionContentProps, ["class", "children"]);

  return (
    <AccordionPrimitive.Content
      class={cn(
        "overflow-hidden text-sm text-zinc-600 transition-all dark:text-zinc-400",
        local.class
      )}
      {...rest}
    >
      <div class="pb-4 pt-0">{local.children}</div>
    </AccordionPrimitive.Content>
  );
};