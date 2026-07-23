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

type AccordionType = "single" | "multiple";

interface AccordionContextValue {
  value: Accessor<string | string[] | undefined>;
  toggleItem: (value: string) => void;
  type: Accessor<AccordionType>;
}

const AccordionContext = createContext<AccordionContextValue>();

export interface AccordionProps
  extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Mode type: "single" allows 1 open item, "multiple" allows many */
  type?: AccordionType;
  /** Controlled active value (string for single, string[] for multiple) */
  value?: string | string[];
  /** Initial default active value */
  defaultValue?: string | string[];
  /** Callback fired when open state changes */
  onChange?: (value: string | string[]) => void;
  class?: string;
}

/**
 * Root Accordion component managing collapse/expand state context.
 */
export const Accordion: Component<AccordionProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "type",
    "value",
    "defaultValue",
    "onChange",
    "class",
    "children",
  ]);

  const accType = () => local.type || "single";

  const [internalValue, setInternalValue] = createSignal<
    string | string[] | undefined
  >(local.defaultValue);

  const currentValue = () =>
    local.value !== undefined ? local.value : internalValue();

  const toggleItem = (val: string) => {
    const cur = currentValue();
    let next: string | string[] | undefined;

    if (accType() === "single") {
      next = cur === val ? "" : val;
    } else {
      const arr = Array.isArray(cur) ? [...cur] : cur ? [cur as string] : [];
      const index = arr.indexOf(val);
      if (index > -1) {
        arr.splice(index, 1);
      } else {
        arr.push(val);
      }
      next = arr;
    }

    if (local.value === undefined) {
      setInternalValue(next);
    }
    if (typeof local.onChange === "function") {
      local.onChange(next);
    }
  };

  const contextValue: AccordionContextValue = {
    value: currentValue,
    toggleItem,
    type: accType,
  };

  return (
    <AccordionContext.Provider value={contextValue}>
      <div
        class={cn("w-full divide-y divide-zinc-200 dark:divide-zinc-800", local.class)}
        {...rest}
      >
        {local.children}
      </div>
    </AccordionContext.Provider>
  );
};

interface AccordionItemContextValue {
  value: Accessor<string>;
  isOpen: Accessor<boolean>;
}

const AccordionItemContext = createContext<AccordionItemContextValue>();

export interface AccordionItemProps extends JSX.HTMLAttributes<HTMLDivElement> {
  value: string;
  class?: string;
}

/**
 * Individual Accordion section wrapper component.
 */
export const AccordionItem: Component<AccordionItemProps> = (props) => {
  const [local, rest] = splitProps(props, ["value", "class", "children"]);
  const rootContext = useContext(AccordionContext);

  if (!rootContext) {
    throw new Error("AccordionItem must be used within an Accordion component");
  }

  const isOpen = () => {
    const cur = rootContext.value();
    if (Array.isArray(cur)) {
      return cur.includes(local.value);
    }
    return cur === local.value;
  };

  const itemContext: AccordionItemContextValue = {
    value: () => local.value,
    isOpen,
  };

  return (
    <AccordionItemContext.Provider value={itemContext}>
      <div
        data-state={isOpen() ? "open" : "closed"}
        class={cn("border-b border-zinc-200 dark:border-zinc-800", local.class)}
        {...rest}
      >
        {local.children}
      </div>
    </AccordionItemContext.Provider>
  );
};

export interface AccordionTriggerProps
  extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  class?: string;
}

/**
 * Header button trigger toggling the expansion of an AccordionItem.
 */
export const AccordionTrigger: Component<AccordionTriggerProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children", "onClick"]);
  const rootContext = useContext(AccordionContext);
  const itemContext = useContext(AccordionItemContext);

  if (!rootContext || !itemContext) {
    throw new Error("AccordionTrigger must be used within an AccordionItem");
  }

  const handleClick = (
    e: MouseEvent & { currentTarget: HTMLButtonElement; target: Element }
  ) => {
    rootContext.toggleItem(itemContext.value());
    if (typeof local.onClick === "function") {
      local.onClick(e);
    }
  };

  return (
    <h3 class="flex">
      <button
        type="button"
        aria-expanded={itemContext.isOpen()}
        data-state={itemContext.isOpen() ? "open" : "closed"}
        onClick={handleClick}
        class={cn(
          "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180 cursor-pointer text-zinc-950 dark:text-zinc-50",
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
      </button>
    </h3>
  );
};

export interface AccordionContentProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

/**
 * Collapsible content panel revealed when the associated AccordionItem is open.
 */
export const AccordionContent: Component<AccordionContentProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  const itemContext = useContext(AccordionItemContext);

  if (!itemContext) {
    throw new Error("AccordionContent must be used within an AccordionItem");
  }

  return (
    <Show when={itemContext.isOpen()}>
      <div
        data-state={itemContext.isOpen() ? "open" : "closed"}
        class={cn("pb-4 pt-0 text-sm text-zinc-600 dark:text-zinc-400", local.class)}
        {...rest}
      >
        {local.children}
      </div>
    </Show>
  );
};