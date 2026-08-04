import { createSignal, createEffect, onCleanup, type Accessor } from "solid-js";

export interface CreateGeolocationOptions extends PositionOptions {
  /** Whether to start watching position immediately upon primitive initialization. Defaults to true. */
  immediate?: boolean;
}

export interface GeolocationState {
  /** Current latitude coordinate in degrees. */
  latitude: number | null;
  /** Current longitude coordinate in degrees. */
  longitude: number | null;
  /** Current altitude above sea level in meters. */
  altitude: number | null;
  /** Position accuracy level in meters. */
  accuracy: number | null;
  /** Altitude accuracy in meters. */
  altitudeAccuracy: number | null;
  /** Current heading direction in degrees relative to true north. */
  heading: number | null;
  /** Current speed in meters per second. */
  speed: number | null;
  /** Timestamp when location was captured. */
  timestamp: number | null;
}

export interface CreateGeolocationReturn {
  /** Signal accessor containing current geolocation coordinates and metrics. */
  coords: Accessor<GeolocationState>;
  /** Signal accessor indicating whether position retrieval is in progress. */
  loading: Accessor<boolean>;
  /** Signal accessor containing GeolocationPositionError if request failed. */
  error: Accessor<GeolocationPositionError | Error | null>;
  /** Signal accessor indicating whether Geolocation API is supported in browser environment. */
  isSupported: Accessor<boolean>;
  /** Imperative function to fetch current position once. */
  getCurrentPosition: () => void;
}

const initialCoords: GeolocationState = {
  latitude: null,
  longitude: null,
  altitude: null,
  accuracy: null,
  altitudeAccuracy: null,
  heading: null,
  speed: null,
  timestamp: null,
};

/**
 * SolidJS reactive primitive for tracking user geographic location and GPS metrics.
 */
export function createGeolocation(
  options: CreateGeolocationOptions = {}
): CreateGeolocationReturn {
  const [coords, setCoords] = createSignal<GeolocationState>(initialCoords);
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal<GeolocationPositionError | Error | null>(null);

  const isSupported = (): boolean => {
    if (typeof window === "undefined" || typeof navigator === "undefined") return false;
    return "geolocation" in navigator;
  };

  const getOptions = (): PositionOptions => ({
    timeout: options.timeout ?? 10000,
    maximumAge: options.maximumAge ?? 5000,
    enableHighAccuracy: options.enableHighAccuracy ?? false,
  });

  let watchId: number | null = null;

  const updatePosition = (position: GeolocationPosition): void => {
    setCoords({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      altitude: position.coords.altitude,
      accuracy: position.coords.accuracy,
      altitudeAccuracy: position.coords.altitudeAccuracy,
      heading: position.coords.heading,
      speed: position.coords.speed,
      timestamp: position.timestamp,
    });
    setLoading(false);
    setError(null);
  };

  const handleError = (err: GeolocationPositionError): void => {
    setError(err);
    setLoading(false);
  };

  const getCurrentPosition = (): void => {
    if (!isSupported()) {
      setError(new Error("Geolocation API is not supported in this browser environment."));
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        updatePosition(pos);
      },
      (err) => {
        handleError(err);
      },
      getOptions()
    );
  };

  createEffect(() => {
    if (!isSupported()) return;

    if (options.immediate ?? true) {
      setLoading(true);
      watchId = navigator.geolocation.watchPosition(
        updatePosition,
        handleError,
        getOptions()
      );
    }

    onCleanup(() => {
      if (watchId !== null && typeof window !== "undefined" && "geolocation" in navigator) {
        navigator.geolocation.clearWatch(watchId);
      }
    });
  });

  return {
    coords,
    loading,
    error,
    isSupported,
    getCurrentPosition,
  };
}
