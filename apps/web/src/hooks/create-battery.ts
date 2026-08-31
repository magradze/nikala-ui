import { createSignal, createEffect, onCleanup, type Accessor } from "solid-js";

export interface BatteryState {
  /** Battery charge level ratio from 0.0 (empty) to 1.0 (full). */
  level: number;
  /** Whether the device battery is currently charging. */
  charging: boolean;
  /** Seconds remaining until fully charged (0 if already full or unknown). */
  chargingTime: number;
  /** Seconds remaining until fully discharged. */
  dischargingTime: number;
}

export interface CreateBatteryReturn {
  /** Signal accessor containing battery state metrics. */
  battery: Accessor<BatteryState>;
  /** Signal accessor indicating whether Battery Status API is supported in browser environment. */
  isSupported: Accessor<boolean>;
}

const initialBatteryState: BatteryState = {
  level: 1,
  charging: true,
  chargingTime: 0,
  dischargingTime: Infinity,
};

/**
 * SolidJS reactive primitive for observing device battery status, charge level, and charging metrics.
 */
export function createBattery(): CreateBatteryReturn {
  const [battery, setBattery] = createSignal<BatteryState>(initialBatteryState);

  const isSupported = (): boolean =>
    typeof window !== "undefined" &&
    typeof navigator !== "undefined" &&
    "getBattery" in navigator;

  let batteryManager: any = null;

  const updateBatteryStatus = (): void => {
    if (!batteryManager) return;
    setBattery({
      level: batteryManager.level ?? 1,
      charging: Boolean(batteryManager.charging),
      chargingTime: batteryManager.chargingTime ?? 0,
      dischargingTime: batteryManager.dischargingTime ?? Infinity,
    });
  };

  createEffect(() => {
    if (!isSupported()) return;

    (navigator as any).getBattery().then((manager: any) => {
      batteryManager = manager;
      updateBatteryStatus();

      manager.addEventListener("levelchange", updateBatteryStatus);
      manager.addEventListener("chargingchange", updateBatteryStatus);
      manager.addEventListener("chargingtimechange", updateBatteryStatus);
      manager.addEventListener("dischargingtimechange", updateBatteryStatus);
    }).catch(() => {});

    onCleanup(() => {
      if (batteryManager) {
        batteryManager.removeEventListener("levelchange", updateBatteryStatus);
        batteryManager.removeEventListener("chargingchange", updateBatteryStatus);
        batteryManager.removeEventListener("chargingtimechange", updateBatteryStatus);
        batteryManager.removeEventListener("dischargingtimechange", updateBatteryStatus);
      }
    });
  });

  return {
    battery,
    isSupported,
  };
}
