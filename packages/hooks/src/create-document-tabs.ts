import {
  createSignal,
  createMemo,
  onMount,
  onCleanup,
  type Accessor,
} from "solid-js";

export interface TabItem<T = any> {
  id: string;
  title: string;
  icon?: any;
  isDirty?: boolean;
  isPinned?: boolean;
  closable?: boolean;
  data?: T;
}

export interface CreateDocumentTabsOptions<T = any> {
  /** Initial array of tab items. */
  initialTabs?: TabItem<T>[];
  /** Default active tab id. Defaults to first tab if available. */
  defaultActiveId?: string;
  /** Whether to enable keyboard shortcuts (Ctrl/Cmd+W to close active, Ctrl/Cmd+T for new tab). */
  enableKeybindings?: boolean;
  /** Callback triggered when the active tab changes. */
  onTabChange?: (tab: TabItem<T> | undefined) => void;
  /** Callback triggered before or when a tab closes. Return false to prevent closing. */
  onTabClose?: (tab: TabItem<T>) => boolean | void;
  /** Callback triggered when a new tab is created. */
  onTabAdd?: (tab: TabItem<T>) => void;
}

export interface CreateDocumentTabsReturn<T = any> {
  /** All tabs list. */
  tabs: Accessor<TabItem<T>[]>;
  /** Currently active tab ID. */
  activeTabId: Accessor<string>;
  /** Currently active tab object. */
  activeTab: Accessor<TabItem<T> | undefined>;
  /** Pinned tabs only. */
  pinnedTabs: Accessor<TabItem<T>[]>;
  /** Standard unpinned tabs. */
  unpinnedTabs: Accessor<TabItem<T>[]>;
  /** Whether any open tab has unsaved changes (isDirty). */
  hasDirtyTabs: Accessor<boolean>;
  /** Count of total open tabs. */
  count: Accessor<number>;
  /** Add a new tab to the list. */
  addTab: (tab: TabItem<T>, activate?: boolean) => void;
  /** Close a tab by ID with auto-switching to adjacent tab. */
  closeTab: (id: string) => boolean;
  /** Set the active tab. */
  setActiveTab: (id: string) => void;
  /** Mark or unmark a tab as dirty (unsaved changes). */
  markDirty: (id: string, isDirty?: boolean) => void;
  /** Toggle pinned state of a tab. */
  togglePin: (id: string) => void;
  /** Close all tabs except the specified one. */
  closeOthers: (id: string) => void;
  /** Close all open unpinned tabs. */
  closeAll: (includePinned?: boolean) => void;
  /** Switch to the next tab in sequence. */
  nextTab: () => void;
  /** Switch to the previous tab in sequence. */
  prevTab: () => void;
  /** Reorder tabs from one position to another. */
  reorderTabs: (fromIndex: number, toIndex: number) => void;
}

function findLastPinnedIndex<T>(items: TabItem<T>[]): number {
  for (let i = items.length - 1; i >= 0; i--) {
    if (items[i].isPinned) return i;
  }
  return -1;
}

/**
 * SolidJS reactive primitive for managing multi-document tabs, editor buffers, and browser tab states.
 */
export function createDocumentTabs<T = any>(
  options: CreateDocumentTabsOptions<T> = {}
): CreateDocumentTabsReturn<T> {
  const initial = options.initialTabs || [];
  const [tabs, setTabs] = createSignal<TabItem<T>[]>(initial);
  const [activeTabId, setActiveTabId] = createSignal<string>(
    options.defaultActiveId || (initial.length > 0 ? initial[0].id : "")
  );

  const activeTab = createMemo(() => tabs().find((t) => t.id === activeTabId()));
  const pinnedTabs = createMemo(() => tabs().filter((t) => t.isPinned));
  const unpinnedTabs = createMemo(() => tabs().filter((t) => !t.isPinned));
  const hasDirtyTabs = createMemo(() => tabs().some((t) => t.isDirty));
  const count = createMemo(() => tabs().length);

  const setActive = (id: string) => {
    const target = tabs().find((t) => t.id === id);
    if (target) {
      setActiveTabId(id);
      options.onTabChange?.(target);
    }
  };

  const addTab = (tab: TabItem<T>, activate = true) => {
    const existing = tabs().find((t) => t.id === tab.id);
    if (existing) {
      if (activate) setActive(tab.id);
      return;
    }

    setTabs((prev) => {
      if (tab.isPinned) {
        const lastPinnedIdx = findLastPinnedIndex(prev);
        if (lastPinnedIdx === -1) return [tab, ...prev];
        const next = [...prev];
        next.splice(lastPinnedIdx + 1, 0, tab);
        return next;
      }
      return [...prev, tab];
    });

    if (activate) {
      setActiveTabId(tab.id);
      options.onTabChange?.(tab);
    }
    options.onTabAdd?.(tab);
  };

  const closeTab = (id: string): boolean => {
    const currentTabs = tabs();
    const tabToClose = currentTabs.find((t) => t.id === id);
    if (!tabToClose) return false;

    if (options.onTabClose && options.onTabClose(tabToClose) === false) {
      return false;
    }

    const closeIdx = currentTabs.findIndex((t) => t.id === id);
    const nextTabs = currentTabs.filter((t) => t.id !== id);
    setTabs(nextTabs);

    if (activeTabId() === id) {
      if (nextTabs.length === 0) {
        setActiveTabId("");
        options.onTabChange?.(undefined);
      } else {
        const nextIdx = Math.min(closeIdx, nextTabs.length - 1);
        const nextActive = nextTabs[nextIdx];
        setActiveTabId(nextActive.id);
        options.onTabChange?.(nextActive);
      }
    }
    return true;
  };

  const markDirty = (id: string, isDirty = true) => {
    setTabs((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isDirty } : t))
    );
  };

  const togglePin = (id: string) => {
    setTabs((prev) => {
      const target = prev.find((t) => t.id === id);
      if (!target) return prev;
      const updated = { ...target, isPinned: !target.isPinned };
      const remaining = prev.filter((t) => t.id !== id);

      if (updated.isPinned) {
        const lastPinnedIdx = findLastPinnedIndex(remaining);
        if (lastPinnedIdx === -1) return [updated, ...remaining];
        remaining.splice(lastPinnedIdx + 1, 0, updated);
        return remaining;
      }
      return [...remaining, updated];
    });
  };

  const closeOthers = (id: string) => {
    setTabs((prev) => prev.filter((t) => t.id === id || t.isPinned));
    setActive(id);
  };

  const closeAll = (includePinned = false) => {
    if (includePinned) {
      setTabs([]);
      setActiveTabId("");
      options.onTabChange?.(undefined);
    } else {
      const pinned = tabs().filter((t) => t.isPinned);
      setTabs(pinned);
      if (pinned.length > 0) {
        setActiveTabId(pinned[0].id);
        options.onTabChange?.(pinned[0]);
      } else {
        setActiveTabId("");
        options.onTabChange?.(undefined);
      }
    }
  };

  const nextTab = () => {
    const list = tabs();
    if (list.length <= 1) return;
    const currentIdx = list.findIndex((t) => t.id === activeTabId());
    const nextIdx = (currentIdx + 1) % list.length;
    setActive(list[nextIdx].id);
  };

  const prevTab = () => {
    const list = tabs();
    if (list.length <= 1) return;
    const currentIdx = list.findIndex((t) => t.id === activeTabId());
    const prevIdx = (currentIdx - 1 + list.length) % list.length;
    setActive(list[prevIdx].id);
  };

  const reorderTabs = (fromIndex: number, toIndex: number) => {
    setTabs((prev) => {
      if (fromIndex < 0 || fromIndex >= prev.length || toIndex < 0 || toIndex >= prev.length) {
        return prev;
      }
      const clone = [...prev];
      const [moved] = clone.splice(fromIndex, 1);
      clone.splice(toIndex, 0, moved);
      return clone;
    });
  };

  onMount(() => {
    if (!options.enableKeybindings || typeof window === "undefined") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const isCmdOrCtrl = e.metaKey || e.ctrlKey;
      if (isCmdOrCtrl && (e.key === "w" || e.key === "W")) {
        const active = activeTabId();
        if (active) {
          e.preventDefault();
          closeTab(active);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    onCleanup(() => window.removeEventListener("keydown", handleKeyDown));
  });

  return {
    tabs,
    activeTabId,
    activeTab,
    pinnedTabs,
    unpinnedTabs,
    hasDirtyTabs,
    count,
    addTab,
    closeTab,
    setActiveTab: setActive,
    markDirty,
    togglePin,
    closeOthers,
    closeAll,
    nextTab,
    prevTab,
    reorderTabs,
  };
}
