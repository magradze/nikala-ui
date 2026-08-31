import {
  createContext,
  createSignal,
  useContext,
  splitProps,
  onCleanup,
  type Component,
  type JSX,
  type ParentComponent,
  type Accessor,
  Show,
} from "solid-js";
import { cva, type VariantProps } from "class-variance-authority";
import { createClickOutside } from "@/hooks/create-click-outside";
import { cn } from "@/lib/cn";
import { ChevronDown } from "lucide-solid";

/* --- Context Definition --- */
interface NavigationMenuContextValue {
  activeValue: Accessor<string | null>;
  setActiveValue: (value: string | null) => void;
  onItemMouseEnter: (value: string) => void;
  onItemMouseLeave: () => void;
  delayMs: Accessor<number>;
}

const NavigationMenuContext = createContext<NavigationMenuContextValue>();

export function useNavigationMenu() {
  const context = useContext(NavigationMenuContext);
  if (!context) {
    throw new Error("useNavigationMenu must be used within a <NavigationMenu />");
  }
  return context;
}

/* --- 1. NavigationMenu Root --- */
export interface NavigationMenuProps extends JSX.HTMLAttributes<HTMLElement> {
  class?: string;
  delayMs?: number;
  value?: string | null;
  onValueChange?: (value: string | null) => void;
}

export const NavigationMenu: ParentComponent<NavigationMenuProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "delayMs", "value", "onValueChange", "children"]);

  const [internalValue, setInternalValue] = createSignal<string | null>(local.value ?? null);
  const activeValue = () => (local.value !== undefined ? local.value : internalValue());

  const setActiveValue = (val: string | null) => {
    if (local.value === undefined) {
      setInternalValue(val);
    }
    local.onValueChange?.(val);
  };

  let rootRef!: HTMLElement;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const delay = () => local.delayMs ?? 150;

  const onItemMouseEnter = (val: string) => {
    clearTimeout(timer);
    const ms = delay();
    if (ms <= 0) {
      setActiveValue(val);
    } else {
      timer = setTimeout(() => {
        setActiveValue(val);
      }, ms);
    }
  };

  const onItemMouseLeave = () => {
    clearTimeout(timer);
    const ms = delay();
    timer = setTimeout(() => {
      setActiveValue(null);
    }, Math.max(50, ms));
  };

  createClickOutside({
    target: () => rootRef,
    onInteractOutside: () => {
      setActiveValue(null);
    },
  });

  onCleanup(() => {
    clearTimeout(timer);
  });

  const contextValue: NavigationMenuContextValue = {
    activeValue,
    setActiveValue,
    onItemMouseEnter,
    onItemMouseLeave,
    delayMs: delay,
  };

  return (
    <NavigationMenuContext.Provider value={contextValue}>
      <nav
        ref={rootRef}
        aria-label="Main Navigation"
        class={cn("relative z-10 flex max-w-max flex-1 items-center justify-center", local.class)}
        {...rest}
      >
        {local.children}
      </nav>
    </NavigationMenuContext.Provider>
  );
};

/* --- 2. NavigationMenuList --- */
export interface NavigationMenuListProps extends JSX.HTMLAttributes<HTMLUListElement> {
  class?: string;
}

export const NavigationMenuList: ParentComponent<NavigationMenuListProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <ul
      class={cn(
        "group flex flex-1 list-none items-center justify-center space-x-1 p-1",
        local.class
      )}
      {...rest}
    >
      {local.children}
    </ul>
  );
};

/* --- 3. NavigationMenuItem Context & Component --- */
interface NavigationMenuItemContextValue {
  value: string;
  isOpen: Accessor<boolean>;
}

const NavigationMenuItemContext = createContext<NavigationMenuItemContextValue>();

function useNavigationMenuItem() {
  const context = useContext(NavigationMenuItemContext);
  if (!context) {
    throw new Error("useNavigationMenuItem must be used within a <NavigationMenuItem />");
  }
  return context;
}

export interface NavigationMenuItemProps extends JSX.HTMLAttributes<HTMLLIElement> {
  value?: string;
  class?: string;
}

let itemCounter = 0;

export const NavigationMenuItem: ParentComponent<NavigationMenuItemProps> = (props) => {
  const itemId = props.value ?? `nav-item-${++itemCounter}`;
  const [local, rest] = splitProps(props, ["class", "value", "children"]);
  const rootContext = useNavigationMenu();

  const isOpen = () => rootContext.activeValue() === itemId;

  const itemContext: NavigationMenuItemContextValue = {
    value: itemId,
    isOpen,
  };

  return (
    <NavigationMenuItemContext.Provider value={itemContext}>
      <li
        class={cn("relative", local.class)}
        onMouseEnter={() => rootContext.onItemMouseEnter(itemId)}
        onMouseLeave={() => rootContext.onItemMouseLeave()}
        {...rest}
      >
        {local.children}
      </li>
    </NavigationMenuItemContext.Provider>
  );
};

/* --- 4. Trigger Style Helper --- */
export const navigationMenuTriggerVariants = cva(
  "group inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none gap-1",
  {
    variants: {
      variant: {
        default:
          "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground data-[state=open]:bg-muted data-[state=open]:text-foreground",
        filled:
          "bg-muted/60 text-foreground hover:bg-muted border border-border/40 data-[state=open]:bg-muted",
        ghost:
          "bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent/60",
        outline:
          "border border-border bg-background hover:bg-accent hover:text-accent-foreground shadow-2xs data-[state=open]:bg-accent",
      },
      size: {
        default: "h-9 px-3 text-sm",
        sm: "h-8 px-2.5 text-xs",
        lg: "h-10 px-4 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export function navigationMenuTriggerStyle(
  variants?: VariantProps<typeof navigationMenuTriggerVariants>
) {
  return navigationMenuTriggerVariants(variants);
}

/* --- 5. NavigationMenuTrigger --- */
export interface NavigationMenuTriggerProps
  extends JSX.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof navigationMenuTriggerVariants> {
  class?: string;
  hideChevron?: boolean;
}

export const NavigationMenuTrigger: ParentComponent<NavigationMenuTriggerProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "variant", "size", "hideChevron", "children"]);
  const rootContext = useNavigationMenu();
  const itemContext = useNavigationMenuItem();

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    if (itemContext.isOpen()) {
      rootContext.setActiveValue(null);
    } else {
      rootContext.setActiveValue(itemContext.value);
    }
  };

  return (
    <button
      type="button"
      aria-expanded={itemContext.isOpen()}
      data-state={itemContext.isOpen() ? "open" : "closed"}
      onClick={handleClick}
      class={cn(
        navigationMenuTriggerVariants({ variant: local.variant, size: local.size }),
        "gap-1.5",
        local.class
      )}
      {...rest}
    >
      {local.children}
      <Show when={!local.hideChevron}>
        <ChevronDown
          class={cn(
            "size-3.5 text-muted-foreground transition-transform duration-200",
            itemContext.isOpen() && "rotate-180 text-foreground"
          )}
          aria-hidden="true"
        />
      </Show>
    </button>
  );
};

/* --- 6. NavigationMenuContent (Mega Menu Flyout) --- */
export interface NavigationMenuContentProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

export const NavigationMenuContent: ParentComponent<NavigationMenuContentProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  const itemContext = useNavigationMenuItem();

  return (
    <Show when={itemContext.isOpen()}>
      <div
        data-state={itemContext.isOpen() ? "open" : "closed"}
        class={cn(
          "absolute left-0 top-full mt-1.5 w-auto rounded-lg border border-border bg-popover p-4 text-popover-foreground shadow-lg outline-hidden z-50",
          "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 duration-200",
          local.class
        )}
        {...rest}
      >
        {local.children}
      </div>
    </Show>
  );
};

/* --- 7. NavigationMenuLink --- */
export interface NavigationMenuLinkProps extends JSX.AnchorHTMLAttributes<HTMLAnchorElement> {
  class?: string;
  active?: boolean;
}

export const NavigationMenuLink: ParentComponent<NavigationMenuLinkProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "active", "children"]);

  return (
    <a
      data-active={local.active ? "" : undefined}
      class={cn(
        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        local.active && "bg-accent/60 text-accent-foreground",
        local.class
      )}
      {...rest}
    >
      {local.children}
    </a>
  );
};

/* --- 8. NavigationMenuViewport --- */
export interface NavigationMenuViewportProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

export const NavigationMenuViewport: Component<NavigationMenuViewportProps> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div class="absolute left-0 top-full flex justify-center">
      <div
        class={cn(
          "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-lg transition-all",
          local.class
        )}
        {...rest}
      />
    </div>
  );
};

/* --- 9. NavigationMenuIndicator --- */
export interface NavigationMenuIndicatorProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

export const NavigationMenuIndicator: Component<NavigationMenuIndicatorProps> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      class={cn(
        "top-full z-1 flex h-1.5 items-end justify-center overflow-hidden transition-[width,transform] duration-200",
        local.class
      )}
      {...rest}
    >
      <div class="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-xs bg-border shadow-md" />
    </div>
  );
};
