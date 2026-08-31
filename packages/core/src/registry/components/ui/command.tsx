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
import { createKeybindings } from "@/hooks/create-keybindings";
import { Search, ArrowUp, ArrowDown, CornerDownLeft } from "lucide-solid";
import { cn } from "@/lib/cn";
import { Kbd, KbdGroup } from "./kbd";
import { InputGroup, InputGroupInput, InputGroupAddon } from "./input-group";
import { List, ListGroup, ListHeader, ListItem, type ListItemProps } from "./list";
import { Dialog, DialogOverlay, DialogContent } from "./dialog";
import { ScrollArea } from "./scroll-area";

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
export interface CommandProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "children"> {
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
  children?: JSX.Element | ((ctx: CommandContextValue) => JSX.Element);
  class?: string;
}

export const CommandDialog: Component<CommandDialogProps> = (props) => {
  const [internalOpen, setInternalOpen] = createSignal(false);

  const isOpen = () => (props.open !== undefined ? props.open : internalOpen());
  const setOpen = (val: boolean) => {
    if (props.open === undefined) setInternalOpen(val);
    if (typeof props.onOpenChange === "function") props.onOpenChange(val);
  };

  /* Listen for global Ctrl+K / Cmd+K hotkeys */
  createKeybindings(
    [
      {
        key: ["meta+k", "ctrl+k"],
        handler: () => setOpen(!isOpen()),
        preventDefault: true,
      },
    ],
    {
      enabled: () => props.enableHotkey !== false,
    }
  );

  return (
    <Dialog open={isOpen()} onOpenChange={setOpen}>
      <DialogOverlay class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs data-expanded:animate-in data-closed:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0" />
      <div class="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
        <DialogContent class="w-full max-w-xl rounded-lg border border-border bg-popover text-popover-foreground shadow-2xl outline-none data-expanded:animate-in data-closed:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-closed:zoom-out-95 data-expanded:zoom-in-95 p-0">
          <Command class={props.class}>{props.children}</Command>
        </DialogContent>
      </div>
    </Dialog>
  );
};

/* --- Command Input --- */
export interface CommandInputProps
  extends JSX.InputHTMLAttributes<HTMLInputElement> {
  class?: string;
}

export const CommandInput: Component<CommandInputProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "value", "onInput"]);
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

/* --- Command Empty Block --- */
export interface CommandEmptyProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

export const CommandEmpty: Component<CommandEmptyProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  const { search } = useCommand();

  return (
    <Show when={search().trim().length > 0}>
      <div
        class={cn(
          "py-8 text-center text-sm text-muted-foreground font-medium select-none",
          local.class
        )}
        {...rest}
      >
        {local.children || `No results found for "${search()}".`}
      </div>
    </Show>
  );
};

/* --- Command Group --- */
export interface CommandGroupProps {
  heading: string;
  children?: JSX.Element;
  class?: string;
}

export const CommandGroup: Component<CommandGroupProps> = (props) => {
  return (
    <ListGroup class={props.class}>
      <ListHeader title={props.heading} />
      {props.children}
    </ListGroup>
  );
};

/* --- Command Item --- */
export interface CommandItemProps extends ListItemProps {
  keywords?: string[];
  onSelect?: () => void;
}

export const CommandItem: Component<CommandItemProps> = (props) => {
  let itemRef: HTMLDivElement | undefined;
  const [local, rest] = splitProps(props, [
    "title",
    "subtitle",
    "keywords",
    "disabled",
    "onSelect",
    "class",
    "children",
  ]);

  const ctx = useCommand();
  const index = ctx.registerItemIndex();

  const isActive = () => ctx.activeIndex() === index;

  /* Automatic scroll into view when navigating with Arrow keys */
  const scrollIntoViewIfNeeded = () => {
    if (isActive() && itemRef) {
      itemRef.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  };

  const isVisible = () => {
    const query = ctx.search().toLowerCase().trim();
    if (!query) return true;

    const titleStr = typeof local.title === "string" ? local.title.toLowerCase() : "";
    const subStr = typeof local.subtitle === "string" ? local.subtitle.toLowerCase() : "";

    if (titleStr.includes(query) || subStr.includes(query)) return true;

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
        ref={(el) => {
          itemRef = el;
          scrollIntoViewIfNeeded();
        }}
        title={local.title}
        subtitle={local.subtitle}
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