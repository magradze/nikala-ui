// src/components/ui/command.tsx
import {
  createContext,
  useContext,
  createSignal,
  createEffect,
  onMount,
  onCleanup,
  Show,
  splitProps,
  type Component,
  type JSX,
  type Accessor,
} from "solid-js";
import { Dialog } from "@kobalte/core/dialog";
import { Search, ArrowUp, ArrowDown, CornerDownLeft } from "lucide-solid";
import { cn } from "@/lib/cn";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group";
import { List, ListGroup, ListHeader, ListItem, type ListItemProps } from "@/components/ui/list";

interface VisibleItem {
  id: string;
  onSelect?: () => void;
  href?: string;
}

/* --- Command Context State --- */
interface CommandContextValue {
  search: Accessor<string>;
  setSearch: (value: string) => void;
  activeIndex: Accessor<number>;
  setActiveIndex: (index: number | ((prev: number) => number)) => void;
  visibleItems: Accessor<VisibleItem[]>;
  registerVisibleItem: (item: VisibleItem) => void;
  unregisterVisibleItem: (id: string) => void;
}

const CommandContext = createContext<CommandContextValue>();

export const useCommand = () => {
  const ctx = useContext(CommandContext);
  if (!ctx) {
    throw new Error("useCommand must be used within a <Command />");
  }
  return ctx;
};

/* --- Root Command Container --- */
export interface CommandProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

export const Command: Component<CommandProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  const [search, setSearch] = createSignal("");
  const [activeIndex, setActiveIndex] = createSignal(0);
  const [visibleItems, setVisibleItems] = createSignal<VisibleItem[]>([]);

  /* Reset selected item index when search query updates */
  createEffect(() => {
    search();
    setActiveIndex(0);
  });

  const registerVisibleItem = (item: VisibleItem) => {
    setVisibleItems((prev) => {
      if (prev.some((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const unregisterVisibleItem = (id: string) => {
    setVisibleItems((prev) => prev.filter((i) => i.id !== id));
  };

  /* Listen for global keyboard navigation (Up, Down, Enter) */
  const handleKeyDown = (e: KeyboardEvent) => {
    const items = visibleItems();
    if (items.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % items.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const current = items[activeIndex()];
      if (current) {
        if (typeof current.onSelect === "function") {
          current.onSelect();
        }
        if (current.href) {
          window.location.href = current.href;
        }
      }
    }
  };

  return (
    <CommandContext.Provider
      value={{
        search,
        setSearch,
        activeIndex,
        setActiveIndex,
        visibleItems,
        registerVisibleItem,
        unregisterVisibleItem,
      }}
    >
      <div
        onKeyDown={handleKeyDown}
        class={cn(
          "flex flex-col w-full h-full rounded-xl bg-popover text-popover-foreground overflow-hidden border border-border shadow-md",
          local.class
        )}
        {...rest}
      >
        {local.children}
      </div>
    </CommandContext.Provider>
  );
};

/* --- Command Dialog (Modal) --- */
export interface CommandDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  enableHotkey?: boolean;
  children?: JSX.Element;
  class?: string;
}

export const CommandDialog: Component<CommandDialogProps> = (props) => {
  const [internalOpen, setInternalOpen] = createSignal(false);

  const isOpen = () => (props.open !== undefined ? props.open : internalOpen());
  const setOpen = (val: boolean) => {
    if (props.open === undefined) setInternalOpen(val);
    if (typeof props.onOpenChange === "function") props.onOpenChange(val);
  };

  onMount(() => {
    if (props.enableHotkey !== false) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
          e.preventDefault();
          setOpen(!isOpen());
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      onCleanup(() => window.removeEventListener("keydown", handleKeyDown));
    }
  });

  return (
    <Dialog open={isOpen()} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs data-expanded:animate-in dat-[closed:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0" />
        <div class="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
          <Dialog.Content class="w-full max-w-xl rounded-xl border border-border bg-popover text-popover-foreground shadow-2xl outline-none data-expanded:animate-in dat-[closed:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95">
            <Command class={props.class}>{props.children}</Command>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
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
    <div
      class={cn("max-h-82.5 overflow-y-auto p-1.5 scrollbar-thin", local.class)}
      {...rest}
    >
      <List>{local.children}</List>
    </div>
  );
};

/* --- Command Empty Block --- */
export interface CommandEmptyProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

export const CommandEmpty: Component<CommandEmptyProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  const { search, visibleItems } = useCommand();

  /* Show empty block strictly when search text exists AND zero matches are found */
  const shouldShow = () => search().trim().length > 0 && visibleItems().length === 0;

  return (
    <Show when={shouldShow()}>
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
let itemIdCounter = 0;

export interface CommandItemProps extends ListItemProps {
  keywords?: string[];
  onSelect?: () => void;
}

export const CommandItem: Component<CommandItemProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "title",
    "subtitle",
    "keywords",
    "onSelect",
    "onClick",
    "href",
    "class",
  ]);
  const { search, activeIndex, visibleItems, registerVisibleItem, unregisterVisibleItem } = useCommand();

  const itemId = `cmd-item-${++itemIdCounter}`;

  const matchesSearch = () => {
    const query = search().toLowerCase().trim();
    if (!query) return true;

    const titleMatch = local.title?.toLowerCase().includes(query);
    const subtitleMatch = local.subtitle?.toLowerCase().includes(query);
    const keywordMatch = local.keywords?.some((k) =>
      k.toLowerCase().includes(query)
    );

    return Boolean(titleMatch || subtitleMatch || keywordMatch);
  };

  /* Dynamic registration of visible items for active arrow selection */
  createEffect(() => {
    const isMatch = matchesSearch();
    if (isMatch) {
      registerVisibleItem({
        id: itemId,
        onSelect: local.onSelect,
        href: local.href,
      });
    } else {
      unregisterVisibleItem(itemId);
    }
  });

  onCleanup(() => {
    unregisterVisibleItem(itemId);
  });

  const isCurrentActive = () => {
    const items = visibleItems();
    const index = items.findIndex((i) => i.id === itemId);
    return index !== -1 && index === activeIndex();
  };

  const handleClick = (e: MouseEvent) => {
    if (typeof local.onSelect === "function") {
      local.onSelect();
    }
    if (typeof local.onClick === "function") {
      local.onClick(e as any);
    }
  };

  return (
    <Show when={matchesSearch()}>
      <ListItem
        title={local.title}
        subtitle={local.subtitle}
        href={local.href}
        active={isCurrentActive()}
        onClick={handleClick}
        class={local.class}
        {...rest}
      />
    </Show>
  );
};

/* --- Command Footer --- */
export interface CommandFooterProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

export const CommandFooter: Component<CommandFooterProps> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      class={cn(
        "flex items-center justify-between border-t border-border bg-muted/30 px-3 py-2 text-xs text-muted-foreground select-none",
        local.class
      )}
      {...rest}
    >
      <div class="flex items-center gap-3">
        <span class="flex items-center gap-1">
          <KbdGroup>
            <Kbd size="sm"><ArrowUp class="w-2.5 h-2.5" /></Kbd>
            <Kbd size="sm"><ArrowDown class="w-2.5 h-2.5" /></Kbd>
          </KbdGroup>
          <span>Navigate</span>
        </span>

        <span class="flex items-center gap-1">
          <Kbd size="sm"><CornerDownLeft class="w-2.5 h-2.5" /></Kbd>
          <span>Select</span>
        </span>
      </div>

      <span class="flex items-center gap-1">
        <Kbd size="sm">Esc</Kbd>
        <span>Close</span>
      </span>
    </div>
  );
};