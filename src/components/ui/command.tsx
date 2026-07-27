import {
  createContext,
  useContext,
  createSignal,
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
import { Kbd, KbdGroup } from "../ui/kbd";
import { InputGroup, InputGroupInput, InputGroupAddon } from "../ui/input-group";
import { List, ListGroup, ListHeader, ListItem, type ListItemProps } from "../ui/list";

/* --- Command Context State --- */
interface CommandContextValue {
  search: Accessor<string>;
  setSearch: (value: string) => void;
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

  return (
    <CommandContext.Provider value={{ search, setSearch }}>
      <div
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

  /* Listen for global Ctrl+K / Cmd+K hotkeys */
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
        <Dialog.Overlay class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0" />
        <div class="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
          <Dialog.Content class="w-full max-w-xl rounded-xl border border-border bg-popover text-popover-foreground shadow-2xl outline-none data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95">
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
      class={cn("max-h-[330px] overflow-y-auto p-1.5 scrollbar-thin", local.class)}
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
  const [local, rest] = splitProps(props, [
    "title",
    "subtitle",
    "keywords",
    "onSelect",
    "onClick",
    "class",
  ]);
  const { search } = useCommand();

  /* Auto fuzzy-filter item based on search query */
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