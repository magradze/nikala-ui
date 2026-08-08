import {
  createContext,
  useContext,
  createSignal,
  onCleanup,
  Show,
  splitProps,
  type Component,
  type JSX,
  type Accessor,
} from "solid-js";
import { createKeybindings } from "@nikala-ui/hooks";
import { Dialog } from "@kobalte/core/dialog";
import { Search, ArrowUp, ArrowDown, CornerDownLeft } from "lucide-solid";
import { cn } from "@/lib/cn";
import { Kbd, KbdGroup } from "../ui/kbd";
import { InputGroup, InputGroupInput, InputGroupAddon } from "../ui/input-group";
import { List, ListGroup, ListHeader, ListItem, type ListItemProps } from "../ui/list";
import { ScrollArea } from "@/components/ui/scroll-area";

/* --- Command Context State --- */
interface CommandContextValue {
  search: Accessor<string>;
  setSearch: (value: string) => void;
  activeIndex: Accessor<number>;
  setActiveIndex: (fn: (prev: number) => number) => void;
  registerItemIndex: () => number;
  onItemSelect: (fn: () => void) => void;
}

const CommandContext = createContext<CommandContextValue>();

export const useCommand = () => {
  const ctx = useContext(CommandContext);
  if (!ctx) {
    throw new Error("useCommand must be used within a <Command /> root component.");
  }
  return ctx;
};

/* --- Command Root --- */
export interface CommandProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
  children?: JSX.Element | ((ctx: CommandContextValue) => JSX.Element);
}

export const Command: Component<CommandProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  const [search, setSearch] = createSignal("");
  const [activeIndex, setActiveIndex] = createSignal(0);
  let itemCounter = 0;
  const itemCallbacks: Record<number, () => void> = {};
  let containerRef: HTMLDivElement | undefined;

  const registerItemIndex = () => {
    const idx = itemCounter;
    itemCounter += 1;
    return idx;
  };

  const onItemSelect = (fn: () => void) => {
    itemCallbacks[activeIndex()] = fn;
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, Math.max(0, itemCounter - 1)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const fn = itemCallbacks[activeIndex()];
      if (fn) fn();
      const current = containerRef?.querySelector('[data-command-active="true"]') as HTMLElement;
      if (current) {
        current.click();
      }
    }
  };

  const ctx: CommandContextValue = {
    search,
    setSearch: (val) => {
      setSearch(val);
      setActiveIndex(0);
    },
    activeIndex,
    setActiveIndex: (fn) => setActiveIndex(fn),
    registerItemIndex,
    onItemSelect,
  };

  return (
    <CommandContext.Provider value={ctx}>
      <div
        ref={containerRef}
        onKeyDown={handleKeyDown}
        class={cn(
          "flex flex-col w-full h-full rounded-lg bg-popover text-popover-foreground overflow-hidden border border-border shadow-md outline-none",
          local.class
        )}
        tabIndex={0}
        {...rest}
      >
        {typeof local.children === "function" ? (local.children as any)(ctx) : local.children}
      </div>
    </CommandContext.Provider>
  );
};

/* --- Command Dialog (Modal) --- */
export interface CommandDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  enableHotkey?: boolean;
  hotkey?: string;
  class?: string;
  children?: JSX.Element;
}

export const CommandDialog: Component<CommandDialogProps> = (props) => {
  const [internalOpen, setInternalOpen] = createSignal(false);
  const isControlled = () => props.open !== undefined;
  const isOpen = () => (isControlled() ? (props.open as boolean) : internalOpen());

  const handleToggle = (val: boolean) => {
    if (!isControlled()) {
      setInternalOpen(val);
    }
    props.onOpenChange?.(val);
  };

  if (props.enableHotkey !== false) {
    const key = props.hotkey || "mod+k";
    createKeybindings({
      [key]: (e) => {
        e.preventDefault();
        handleToggle(!isOpen());
      },
    });
  }

  return (
    <Dialog.Root open={isOpen()} onOpenChange={handleToggle}>
      <Dialog.Portal>
        <Dialog.Overlay class="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs transition-opacity animate-in fade-in-0" />
        <Dialog.Content class="fixed left-1/2 top-1/2 z-50 w-full max-w-xl -translate-x-1/2 -translate-y-1/2 p-0 shadow-2xl border-0 bg-transparent outline-none">
          <Command class={props.class}>{props.children}</Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

/* --- Command Search Input --- */
export interface CommandInputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  class?: string;
}

export const CommandInput: Component<CommandInputProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "onInput"]);
  const { search, setSearch } = useCommand();

  return (
    <InputGroup class="border-0 border-b border-border rounded-none bg-transparent px-3 py-1 shadow-none focus-within:ring-0 focus-within:border-border">
      <InputGroupAddon align="inline-start">
        <Search class="w-4 h-4 text-muted-foreground" />
      </InputGroupAddon>

      <InputGroupInput
        ref={(el) => setTimeout(() => el.focus(), 50)}
        value={search()}
        onInput={(e) => {
          setSearch(e.currentTarget.value);
          if (typeof local.onInput === "function") {
            local.onInput(e);
          }
        }}
        placeholder="Type a command or search..."
        class="h-11 text-base sm:text-sm font-medium"
        {...rest}
      />
    </InputGroup>
  );
};

/* --- Command List Container --- */
export interface CommandListProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

export const CommandList: Component<CommandListProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <ScrollArea
      class={cn("max-h-82.5 p-1.5", local.class)}
      {...rest}
    >
      <List>{local.children}</List>
    </ScrollArea>
  );
};

/* --- Command Empty State --- */
export interface CommandEmptyProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

export const CommandEmpty: Component<CommandEmptyProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <div
      class={cn("py-6 text-center text-sm text-muted-foreground", local.class)}
      {...rest}
    >
      {local.children || "No results found."}
    </div>
  );
};

/* --- Command Group Container --- */
export interface CommandGroupProps {
  heading?: JSX.Element;
  class?: string;
  children?: JSX.Element;
}

export const CommandGroup: Component<CommandGroupProps> = (props) => {
  const [local, rest] = splitProps(props, ["heading", "class", "children"]);

  return (
    <ListGroup class={cn("px-1 py-1.5", local.class)} {...rest}>
      <Show when={local.heading}>
        <ListHeader class="px-2 py-1 text-xs font-semibold text-muted-foreground tracking-wider uppercase">
          {local.heading}
        </ListHeader>
      </Show>
      {local.children}
    </ListGroup>
  );
};

/* --- Command Selectable Item --- */
export interface CommandItemProps extends ListItemProps {
  value?: string;
  keywords?: string[];
  disabled?: boolean;
  onSelect?: () => void;
  class?: string;
}

export const CommandItem: Component<CommandItemProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "value",
    "keywords",
    "disabled",
    "onSelect",
    "class",
    "children",
  ]);

  const ctx = useCommand();
  const index = ctx.registerItemIndex();

  const isActive = () => ctx.activeIndex() === index;

  const isVisible = () => {
    const query = ctx.search().toLowerCase().trim();
    if (!query) return true;

    const valStr = (local.value || "").toLowerCase();
    if (valStr.includes(query)) return true;

    if (local.keywords) {
      return local.keywords.some((k) => k.toLowerCase().includes(query));
    }

    return false;
  };

  const handleSelect = () => {
    if (local.disabled) return;
    if (local.onSelect) local.onSelect();
  };

  return (
    <Show when={isVisible()}>
      <ListItem
        data-command-active={isActive() ? "true" : "false"}
        class={cn(
          "relative flex cursor-pointer select-none items-center rounded-md px-2 py-1.5 text-sm outline-none transition-colors",
          isActive()
            ? "bg-accent text-accent-foreground font-medium"
            : "text-popover-foreground hover:bg-muted/50",
          local.disabled && "pointer-events-none opacity-50",
          local.class
        )}
        onClick={handleSelect}
        onMouseEnter={() => ctx.setActiveIndex(() => index)}
        {...rest}
      >
        {local.children}
      </ListItem>
    </Show>
  );
};

/* --- Command Footer Indicator Bar --- */
export interface CommandFooterProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

export const CommandFooter: Component<CommandFooterProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <div
      class={cn(
        "flex items-center justify-between border-t border-border px-3 py-2 text-xs text-muted-foreground bg-muted/40",
        local.class
      )}
      {...rest}
    >
      {local.children || (
        <>
          <div class="flex items-center gap-2">
            <span class="inline-flex items-center gap-1">
              <KbdGroup>
                <Kbd size="sm">
                  <ArrowUp class="w-2.5 h-2.5" />
                </Kbd>
                <Kbd size="sm">
                  <ArrowDown class="w-2.5 h-2.5" />
                </Kbd>
              </KbdGroup>
              <span>Navigate</span>
            </span>

            <span class="inline-flex items-center gap-1">
              <Kbd size="sm">
                <CornerDownLeft class="w-2.5 h-2.5" />
              </Kbd>
              <span>Select</span>
            </span>
          </div>

          <span class="inline-flex items-center gap-1">
            <Kbd size="sm">ESC</Kbd>
            <span>Close</span>
          </span>
        </>
      )}
    </div>
  );
};