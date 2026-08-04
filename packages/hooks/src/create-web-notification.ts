import { createSignal, createEffect, type Accessor } from "solid-js";

export interface CreateWebNotificationOptions extends NotificationOptions {
  /** Title of the notification. */
  title?: string;
  /** Callback fired when notification is clicked. */
  onClick?: (event: Event) => void;
  /** Callback fired when notification is closed. */
  onClose?: (event: Event) => void;
  /** Callback fired when notification error occurs. */
  onError?: (event: Event) => void;
  /** Callback fired when notification is shown. */
  onShow?: (event: Event) => void;
}

export interface CreateWebNotificationReturn {
  /** Signal accessor containing current Notification permission state. */
  permission: Accessor<NotificationPermission>;
  /** Signal accessor indicating whether Web Notifications API is supported in browser environment. */
  isSupported: Accessor<boolean>;
  /** Function to show a web notification. */
  show: (overrideTitle?: string, overrideOptions?: NotificationOptions) => Notification | null;
  /** Request notification permission from browser. */
  requestPermission: () => Promise<NotificationPermission>;
  /** Close active notification. */
  close: () => void;
}

/**
 * SolidJS reactive primitive for sending browser desktop notifications and managing notification permissions.
 */
export function createWebNotification(
  defaultOptions: CreateWebNotificationOptions = {}
): CreateWebNotificationReturn {
  const [permission, setPermission] = createSignal<NotificationPermission>("default");

  const isSupported = (): boolean =>
    typeof window !== "undefined" &&
    "Notification" in window;

  let activeNotification: Notification | null = null;

  const updatePermission = (): void => {
    if (isSupported()) {
      setPermission(Notification.permission);
    } else {
      setPermission("denied");
    }
  };

  const requestPermission = async (): Promise<NotificationPermission> => {
    if (!isSupported()) return "denied";

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result;
    } catch {
      updatePermission();
      return permission();
    }
  };

  const close = (): void => {
    if (activeNotification) {
      activeNotification.close();
      activeNotification = null;
    }
  };

  const show = (
    overrideTitle?: string,
    overrideOptions?: NotificationOptions
  ): Notification | null => {
    if (!isSupported() || permission() !== "granted") return null;

    const title = overrideTitle ?? defaultOptions.title ?? "Notification";
    const options: NotificationOptions = {
      ...defaultOptions,
      ...overrideOptions,
    };

    close();

    try {
      const notification = new Notification(title, options);
      activeNotification = notification;

      if (defaultOptions.onClick) notification.onclick = (e) => defaultOptions.onClick?.(e);
      if (defaultOptions.onClose) notification.onclose = (e) => defaultOptions.onClose?.(e);
      if (defaultOptions.onError) notification.onerror = (e) => defaultOptions.onError?.(e);
      if (defaultOptions.onShow) notification.onshow = (e) => defaultOptions.onShow?.(e);

      return notification;
    } catch {
      return null;
    }
  };

  createEffect(() => {
    updatePermission();
  });

  return {
    permission,
    isSupported,
    show,
    requestPermission,
    close,
  };
}
