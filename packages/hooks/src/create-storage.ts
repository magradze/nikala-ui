import { createSignal, onMount, onCleanup, type Accessor } from "solid-js";

export type StorageType = "local" | "session";

/**
 * Helper to safely read item from Web Storage.
 */
function readStorage<T>(key: string, storage: Storage | undefined, fallback: T): T {
  if (!storage) return fallback;
  try {
    const item = storage.getItem(key);
    return item !== null ? JSON.parse(item) : fallback;
  } catch (error) {
    console.warn(`[nikala-ui/hooks] Error reading storage key "${key}":`, error);
    return fallback;
  }
}

/**
 * SolidJS reactive primitive for Web Storage (localStorage / sessionStorage) synchronization.
 *
 * @param key Storage key name.
 * @param initialValue Default initial value if key doesn't exist.
 * @param type Storage type: "local" (default) or "session".
 */
export function createStorage<T>(
  key: string,
  initialValue: T | Accessor<T>,
  type: StorageType = "local"
): [value: Accessor<T>, setValue: (val: T | ((prev: T) => T)) => void, remove: () => void] {
  const getStorage = (): Storage | undefined => {
    if (typeof window === "undefined") return undefined;
    return type === "local" ? window.localStorage : window.sessionStorage;
  };

  const getFallback = (): T => (typeof initialValue === "function" ? (initialValue as Accessor<T>)() : initialValue);

  const [value, setInternalValue] = createSignal<T>(getFallback());

  const setValue = (val: T | ((prev: T) => T)) => {
    const storage = getStorage();
    const currentValue = value();
    const nextValue = typeof val === "function" ? (val as (prev: T) => T)(currentValue) : val;

    setInternalValue(() => nextValue);

    if (storage) {
      try {
        storage.setItem(key, JSON.stringify(nextValue));
      } catch (error) {
        console.warn(`[nikala-ui/hooks] Error setting storage key "${key}":`, error);
      }
    }
  };

  const remove = () => {
    const storage = getStorage();
    setInternalValue(() => getFallback());
    if (storage) {
      storage.removeItem(key);
    }
  };

  onMount(() => {
    if (typeof window === "undefined") return;

    const storage = getStorage();
    if (storage) {
      const stored = readStorage<T>(key, storage, getFallback());
      setInternalValue(() => stored);
    }

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        setInternalValue(() => (event.newValue !== null ? JSON.parse(event.newValue) : getFallback()));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    onCleanup(() => {
      window.removeEventListener("storage", handleStorageChange);
    });
  });

  return [value, setValue, remove];
}

/**
 * SolidJS reactive primitive for localStorage synchronization across components and browser tabs.
 */
export function createLocalStorage<T>(
  key: string,
  initialValue: T | Accessor<T>
): [value: Accessor<T>, setValue: (val: T | ((prev: T) => T)) => void, remove: () => void] {
  return createStorage<T>(key, initialValue, "local");
}

/**
 * SolidJS reactive primitive for sessionStorage synchronization.
 */
export function createSessionStorage<T>(
  key: string,
  initialValue: T | Accessor<T>
): [value: Accessor<T>, setValue: (val: T | ((prev: T) => T)) => void, remove: () => void] {
  return createStorage<T>(key, initialValue, "session");
}
