import { createSignal, createEffect, onCleanup, type Accessor } from "solid-js";

export type PermissionNameType =
  | "geolocation"
  | "notifications"
  | "persistent-storage"
  | "push"
  | "screen-wake-lock"
  | "clipboard-read"
  | "clipboard-write"
  | "camera"
  | "microphone"
  | (string & {});

export type PermissionStatusState = "granted" | "denied" | "prompt" | "unknown";

export interface CreatePermissionOptions {
  /** Permission descriptor or name to query. */
  name: PermissionNameType;
}

export interface CreatePermissionReturn {
  /** Signal accessor containing current permission status ('granted', 'denied', 'prompt', 'unknown'). */
  state: Accessor<PermissionStatusState>;
  /** Signal accessor indicating whether Permissions API is supported in browser environment. */
  isSupported: Accessor<boolean>;
  /** Imperative function to re-query permission status manually. */
  query: () => Promise<PermissionStatusState>;
}

/**
 * SolidJS reactive primitive for querying and observing browser permission status changes.
 */
export function createPermission(
  options: PermissionNameType | CreatePermissionOptions
): CreatePermissionReturn {
  const [state, setState] = createSignal<PermissionStatusState>("unknown");

  const permissionName = typeof options === "string" ? options : options.name;

  const isSupported = (): boolean =>
    typeof window !== "undefined" &&
    typeof navigator !== "undefined" &&
    "permissions" in navigator;

  let permissionStatus: PermissionStatus | null = null;

  const query = async (): Promise<PermissionStatusState> => {
    if (!isSupported()) {
      setState("unknown");
      return "unknown";
    }

    try {
      const status = await navigator.permissions.query({
        name: permissionName as PermissionName,
      });

      permissionStatus = status;
      const currentState = status.state as PermissionStatusState;
      setState(currentState);

      status.onchange = () => {
        setState(status.state as PermissionStatusState);
      };

      return currentState;
    } catch {
      setState("unknown");
      return "unknown";
    }
  };

  createEffect(() => {
    if (!isSupported()) return;

    query();

    onCleanup(() => {
      if (permissionStatus) {
        permissionStatus.onchange = null;
      }
    });
  });

  return {
    state,
    isSupported,
    query,
  };
}
