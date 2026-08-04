import { createSignal, createEffect, onCleanup, type Accessor } from "solid-js";
import { createControllableSignal } from "./create-controllable-signal";

export interface CreateAudioOptions {
  /** Controlled playing state. */
  playing?: boolean | Accessor<boolean | undefined>;
  /** Uncontrolled default playing state. Defaults to false. */
  defaultPlaying?: boolean;
  /** Controlled muted state. */
  muted?: boolean | Accessor<boolean | undefined>;
  /** Uncontrolled default muted state. Defaults to false. */
  defaultMuted?: boolean;
  /** Initial volume level between 0.0 and 1.0. Defaults to 1.0. */
  volume?: number;
  /** Whether the audio should loop upon finishing. Defaults to false. */
  loop?: boolean;
  /** Whether the audio should start playing automatically. Defaults to false. */
  autoplay?: boolean;
  /** Playback speed rate. Defaults to 1.0. */
  playbackRate?: number;
  /** Callback fired when playing state changes. */
  onPlayingChange?: (playing: boolean) => void;
  /** Callback fired when muted state changes. */
  onMutedChange?: (muted: boolean) => void;
  /** Callback fired when audio finishes playing. */
  onEnded?: () => void;
  /** Callback fired when audio playback encounters an error. */
  onError?: (err: Event) => void;
}

export interface CreateAudioReturn {
  /** Signal indicating if audio is currently playing. */
  isPlaying: Accessor<boolean>;
  /** Signal indicating current playback time in seconds. */
  currentTime: Accessor<number>;
  /** Signal indicating total duration in seconds. */
  duration: Accessor<number>;
  /** Signal indicating volume level (0.0 to 1.0). */
  volume: Accessor<number>;
  /** Signal indicating if audio is muted. */
  isMuted: Accessor<boolean>;
  /** Signal indicating if audio source is loaded and ready. */
  isReady: Accessor<boolean>;
  /** Play audio. */
  play: () => Promise<void>;
  /** Pause audio. */
  pause: () => void;
  /** Toggle play/pause state. */
  toggle: () => void;
  /** Seek to specified time in seconds. */
  seek: (time: number) => void;
  /** Set volume level between 0.0 and 1.0. */
  setVolume: (vol: number) => void;
  /** Toggle audio mute status. */
  toggleMute: () => void;
}

/**
 * SolidJS reactive primitive for controlling audio playback state with controlled/uncontrolled signal support.
 */
export function createAudio(
  src: string | Accessor<string>,
  options: CreateAudioOptions = {}
): CreateAudioReturn {
  const playingAccessor = (): boolean | undefined => {
    if (typeof options.playing === "function") {
      return options.playing();
    }
    return options.playing;
  };

  const mutedAccessor = (): boolean | undefined => {
    if (typeof options.muted === "function") {
      return options.muted();
    }
    return options.muted;
  };

  const [isPlayingVal, setIsPlayingVal] = createControllableSignal<boolean>({
    value: playingAccessor,
    defaultValue: options.defaultPlaying ?? false,
    onChange: options.onPlayingChange,
  });

  const [isMutedVal, setIsMutedVal] = createControllableSignal<boolean>({
    value: mutedAccessor,
    defaultValue: options.defaultMuted ?? false,
    onChange: options.onMutedChange,
  });

  const [audioEl, setAudioEl] = createSignal<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = createSignal(0);
  const [duration, setDuration] = createSignal(0);
  const [volume, setVolumeSignal] = createSignal(options.volume ?? 1.0);
  const [isReady, setIsReady] = createSignal(false);

  const isPlaying = (): boolean => Boolean(isPlayingVal());
  const isMuted = (): boolean => Boolean(isMutedVal());

  const getSrc = (): string => {
    return typeof src === "function" ? src() : src;
  };

  /* Initialize Audio instance */
  createEffect(() => {
    if (typeof window === "undefined") return;

    const audio = new Audio(getSrc());
    setAudioEl(audio);

    const handleLoadedMetadata = (): void => {
      setDuration(audio.duration || 0);
      setIsReady(true);
    };

    const handleTimeUpdate = (): void => {
      setCurrentTime(audio.currentTime || 0);
    };

    const handlePlay = (): void => setIsPlayingVal(true);
    const handlePause = (): void => setIsPlayingVal(false);
    const handleEnded = (): void => {
      setIsPlayingVal(false);
      options.onEnded?.();
    };

    const handleError = (e: Event): void => {
      setIsReady(false);
      options.onError?.(e);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    onCleanup(() => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      setAudioEl(null);
    });
  });

  /* Sync properties with audio element */
  createEffect(() => {
    const audio = audioEl();
    if (!audio) return;

    audio.volume = volume();
    audio.muted = isMuted();
    audio.loop = options.loop ?? false;
    audio.autoplay = options.autoplay ?? false;
    if (options.playbackRate) {
      audio.playbackRate = options.playbackRate;
    }
  });

  /* Sync controlled playing state with HTMLAudioElement */
  createEffect(() => {
    const audio = audioEl();
    const shouldPlay = isPlaying();
    if (!audio) return;
    if (shouldPlay && audio.paused) {
      audio.play().catch(() => setIsPlayingVal(false));
    } else if (!shouldPlay && !audio.paused) {
      audio.pause();
    }
  });

  const play = async (): Promise<void> => {
    setIsPlayingVal(true);
    const audio = audioEl();
    if (audio) await audio.play();
  };

  const pause = (): void => {
    setIsPlayingVal(false);
    const audio = audioEl();
    if (audio) audio.pause();
  };

  const toggle = (): void => {
    if (isPlaying()) {
      pause();
    } else {
      play();
    }
  };

  const seek = (time: number): void => {
    const audio = audioEl();
    if (audio) {
      audio.currentTime = Math.max(0, Math.min(time, duration()));
      setCurrentTime(audio.currentTime);
    }
  };

  const setVolume = (vol: number): void => {
    const clamped = Math.max(0, Math.min(vol, 1.0));
    setVolumeSignal(clamped);
    const audio = audioEl();
    if (audio) {
      audio.volume = clamped;
    }
  };

  const toggleMute = (): void => {
    const nextMuted = !isMuted();
    setIsMutedVal(nextMuted);
    const audio = audioEl();
    if (audio) {
      audio.muted = nextMuted;
    }
  };

  return {
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isReady,
    play,
    pause,
    toggle,
    seek,
    setVolume,
    toggleMute,
  };
}

export interface CreateVideoOptions {
  /** Controlled playing state. */
  playing?: boolean | Accessor<boolean | undefined>;
  /** Uncontrolled default playing state. Defaults to false. */
  defaultPlaying?: boolean;
  /** Controlled muted state. */
  muted?: boolean | Accessor<boolean | undefined>;
  /** Uncontrolled default muted state. Defaults to false. */
  defaultMuted?: boolean;
  /** Initial volume level between 0.0 and 1.0. Defaults to 1.0. */
  volume?: number;
  /** Whether video should loop upon finishing. Defaults to false. */
  loop?: boolean;
  /** Callback fired when playing state changes. */
  onPlayingChange?: (playing: boolean) => void;
  /** Callback fired when muted state changes. */
  onMutedChange?: (muted: boolean) => void;
  /** Callback fired when video playback finishes. */
  onEnded?: () => void;
}

export interface CreateVideoReturn {
  /** Ref callback function to bind to HTMLVideoElement. */
  setVideoRef: (el: HTMLVideoElement | null) => void;
  /** Signal indicating if video is playing. */
  isPlaying: Accessor<boolean>;
  /** Signal indicating current playback time in seconds. */
  currentTime: Accessor<number>;
  /** Signal indicating total video duration in seconds. */
  duration: Accessor<number>;
  /** Signal indicating volume level (0.0 to 1.0). */
  volume: Accessor<number>;
  /** Signal indicating if video is muted. */
  isMuted: Accessor<boolean>;
  /** Play video. */
  play: () => Promise<void>;
  /** Pause video. */
  pause: () => void;
  /** Toggle play/pause. */
  toggle: () => void;
  /** Seek to time position. */
  seek: (time: number) => void;
  /** Set volume level. */
  setVolume: (vol: number) => void;
  /** Toggle mute status. */
  toggleMute: () => void;
}

/**
 * SolidJS reactive primitive for controlling media element video playback with controlled/uncontrolled signal support.
 */
export function createVideo(
  options: CreateVideoOptions = {}
): CreateVideoReturn {
  const [videoEl, setVideoEl] = createSignal<HTMLVideoElement | null>(null);

  const playingAccessor = (): boolean | undefined => {
    if (typeof options.playing === "function") {
      return options.playing();
    }
    return options.playing;
  };

  const mutedAccessor = (): boolean | undefined => {
    if (typeof options.muted === "function") {
      return options.muted();
    }
    return options.muted;
  };

  const [isPlayingVal, setIsPlayingVal] = createControllableSignal<boolean>({
    value: playingAccessor,
    defaultValue: options.defaultPlaying ?? false,
    onChange: options.onPlayingChange,
  });

  const [isMutedVal, setIsMutedVal] = createControllableSignal<boolean>({
    value: mutedAccessor,
    defaultValue: options.defaultMuted ?? false,
    onChange: options.onMutedChange,
  });

  const [currentTime, setCurrentTime] = createSignal(0);
  const [duration, setDuration] = createSignal(0);
  const [volume, setVolumeSignal] = createSignal(options.volume ?? 1.0);

  const isPlaying = (): boolean => Boolean(isPlayingVal());
  const isMuted = (): boolean => Boolean(isMutedVal());

  createEffect(() => {
    const el = videoEl();
    if (!el) return;

    el.volume = volume();
    el.muted = isMuted();
    el.loop = options.loop ?? false;

    const handleLoadedMetadata = (): void => {
      setDuration(el.duration || 0);
    };
    const handleTimeUpdate = (): void => {
      setCurrentTime(el.currentTime || 0);
    };
    const handlePlay = (): void => setIsPlayingVal(true);
    const handlePause = (): void => setIsPlayingVal(false);
    const handleEnded = (): void => {
      setIsPlayingVal(false);
      options.onEnded?.();
    };

    el.addEventListener("loadedmetadata", handleLoadedMetadata);
    el.addEventListener("timeupdate", handleTimeUpdate);
    el.addEventListener("play", handlePlay);
    el.addEventListener("pause", handlePause);
    el.addEventListener("ended", handleEnded);

    onCleanup(() => {
      el.removeEventListener("loadedmetadata", handleLoadedMetadata);
      el.removeEventListener("timeupdate", handleTimeUpdate);
      el.removeEventListener("play", handlePlay);
      el.removeEventListener("pause", handlePause);
      el.removeEventListener("ended", handleEnded);
    });
  });

  /* Sync controlled playing state with video HTML element */
  createEffect(() => {
    const el = videoEl();
    const shouldPlay = isPlaying();
    if (!el) return;
    if (shouldPlay && el.paused) {
      el.play().catch(() => setIsPlayingVal(false));
    } else if (!shouldPlay && !el.paused) {
      el.pause();
    }
  });

  /* Sync controlled muted state with video HTML element */
  createEffect(() => {
    const el = videoEl();
    if (el) {
      el.muted = isMuted();
    }
  });

  const play = async (): Promise<void> => {
    setIsPlayingVal(true);
    const el = videoEl();
    if (el) await el.play();
  };

  const pause = (): void => {
    setIsPlayingVal(false);
    const el = videoEl();
    if (el) el.pause();
  };

  const toggle = (): void => {
    if (isPlaying()) {
      pause();
    } else {
      play();
    }
  };

  const seek = (time: number): void => {
    const el = videoEl();
    if (el) {
      el.currentTime = Math.max(0, Math.min(time, duration()));
      setCurrentTime(el.currentTime);
    }
  };

  const setVolume = (vol: number): void => {
    const clamped = Math.max(0, Math.min(vol, 1.0));
    setVolumeSignal(clamped);
    const el = videoEl();
    if (el) {
      el.volume = clamped;
    }
  };

  const toggleMute = (): void => {
    const nextMuted = !isMuted();
    setIsMutedVal(nextMuted);
    const el = videoEl();
    if (el) {
      el.muted = nextMuted;
    }
  };

  return {
    setVideoRef: setVideoEl,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    play,
    pause,
    toggle,
    seek,
    setVolume,
    toggleMute,
  };
}
