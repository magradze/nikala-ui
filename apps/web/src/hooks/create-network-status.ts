import { createEffect, createSignal, onCleanup, type Accessor } from "solid-js";

export interface CreateNetworkStatusReturn {
  /** Accessor indicating if browser is currently connected to the network */
  isOnline: Accessor<boolean>;
  /** Date timestamp when network went offline, if applicable */
  offlineAt: Accessor<Date | undefined>;
  /** Date timestamp when network re-connected online, if applicable */
  onlineAt: Accessor<Date | undefined>;
  /** Network connection estimated downlink speed in Mbps */
  downlink: Accessor<number | undefined>;
  /** Network connection estimated round-trip time in ms */
  rtt: Accessor<number | undefined>;
  /** Network connection data saver mode enabled status */
  saveData: Accessor<boolean | undefined>;
  /** Network connection effective type ('slow-2g', '2g', '3g', '4g') */
  effectiveType: Accessor<"slow-2g" | "2g" | "3g" | "4g" | undefined>;
}

/**
 * SolidJS reactive primitive for tracking browser network connectivity and connection quality metrics.
 */
export function createNetworkStatus(): CreateNetworkStatusReturn {
  const getInitialOnline = () => (typeof navigator !== "undefined" ? navigator.onLine : true);

  const [isOnline, setIsOnline] = createSignal(getInitialOnline());
  const [offlineAt, setOfflineAt] = createSignal<Date | undefined>(undefined);
  const [onlineAt, setOnlineAt] = createSignal<Date | undefined>(undefined);

  const getNetworkConnection = () => {
    if (typeof navigator === "undefined") return undefined;
    return (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  };

  const conn = getNetworkConnection();

  const [downlink, setDownlink] = createSignal<number | undefined>(conn?.downlink);
  const [rtt, setRtt] = createSignal<number | undefined>(conn?.rtt);
  const [saveData, setSaveData] = createSignal<boolean | undefined>(conn?.saveData);
  const [effectiveType, setEffectiveType] = createSignal<"slow-2g" | "2g" | "3g" | "4g" | undefined>(conn?.effectiveType);

  const updateNetworkInfo = () => {
    const currentConn = getNetworkConnection();
    if (currentConn) {
      setDownlink(currentConn.downlink);
      setRtt(currentConn.rtt);
      setSaveData(currentConn.saveData);
      setEffectiveType(currentConn.effectiveType);
    }
  };

  const handleOnline = () => {
    setIsOnline(true);
    setOnlineAt(new Date());
    updateNetworkInfo();
  };

  const handleOffline = () => {
    setIsOnline(false);
    setOfflineAt(new Date());
  };

  createEffect(() => {
    if (typeof window === "undefined") return;

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    const currentConn = getNetworkConnection();
    if (currentConn && currentConn.addEventListener) {
      currentConn.addEventListener("change", updateNetworkInfo);
    }

    onCleanup(() => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      if (currentConn && currentConn.removeEventListener) {
        currentConn.removeEventListener("change", updateNetworkInfo);
      }
    });
  });

  return {
    isOnline,
    offlineAt,
    onlineAt,
    downlink,
    rtt,
    saveData,
    effectiveType,
  };
}

/**
 * SolidJS reactive primitive for checking if browser is connected online.
 */
export function createOnline(): Accessor<boolean> {
  const { isOnline } = createNetworkStatus();
  return isOnline;
}
