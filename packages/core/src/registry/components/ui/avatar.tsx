import {
  createSignal,
  createEffect,
  Show,
  splitProps,
  type Component,
  type JSX,
} from "solid-js";
import { cn } from "@/lib/cn";

export interface AvatarProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

/**
 * Root Avatar container component.
 */
export const Avatar: Component<AvatarProps> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      class={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-border bg-muted",
        local.class
      )}
      {...rest}
    />
  );
};

export interface AvatarImageProps
  extends JSX.ImgHTMLAttributes<HTMLImageElement> {
  class?: string;
}

/**
 * Image element for the Avatar component with background status loader.
 */
export const AvatarImage: Component<AvatarImageProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "class",
    "src",
    "alt",
    "onLoad",
    "onError",
  ]);
  const [status, setStatus] = createSignal<"loading" | "loaded" | "error">(
    "loading"
  );

  /* Pre-test image loading in background JS to prevent native broken icon flashes */
  createEffect(() => {
    const src = local.src;
    if (!src) {
      setStatus("error");
      return;
    }

    const img = new Image();
    img.src = src;
    img.onload = () => setStatus("loaded");
    img.onerror = () => setStatus("error");
  });

  const handleLoad: JSX.EventHandlerUnion<HTMLImageElement, Event> = (e) => {
    setStatus("loaded");
    if (typeof local.onLoad === "function") {
      (local.onLoad as (e: Event) => void)(e);
    }
  };

  const handleError: JSX.EventHandlerUnion<HTMLImageElement, Event> = (e) => {
    setStatus("error");
    if (typeof local.onError === "function") {
      (local.onError as (e: Event) => void)(e);
    }
  };

  return (
    <Show when={status() === "loaded"}>
      <img
        src={local.src}
        alt={local.alt}
        class={cn("aspect-square h-full w-full object-cover", local.class)}
        onLoad={handleLoad}
        onError={handleError}
        {...rest}
      />
    </Show>
  );
};

export interface AvatarFallbackProps
  extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

/**
 * Fallback container for rendering initials or icons when avatar image is missing/broken.
 */
export const AvatarFallback: Component<AvatarFallbackProps> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      class={cn(
        "flex h-full w-full items-center justify-center bg-muted text-sm font-medium text-muted-foreground select-none",
        local.class
      )}
      {...rest}
    />
  );
};