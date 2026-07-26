import { splitProps, createSignal, Show, type Component, type JSX } from "solid-js";
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
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-md",
        local.class
      )}
      {...rest}
    />
  );
};

export interface AvatarImageProps extends JSX.ImgHTMLAttributes<HTMLImageElement> {
  class?: string;
}

/**
 * Image element for the Avatar component with fallback error handling.
 */
export const AvatarImage: Component<AvatarImageProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "onError"]);
  const [hasError, setHasError] = createSignal(false);

  const handleError: JSX.EventHandlerUnion<HTMLImageElement, Event> = (e) => {
    setHasError(true);
    if (typeof local.onError === "function") {
      // Execute original onError handler if provided by parent
      (local.onError as (e: Event) => void)(e);
    }
  };

  return (
    <Show when={!hasError()}>
      <img
        class={cn("aspect-square h-full w-full object-cover", local.class)}
        onError={handleError}
        {...rest}
      />
    </Show>
  );
};

export interface AvatarFallbackProps extends JSX.HTMLAttributes<HTMLDivElement> {
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
        "flex h-full w-full items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground",
        local.class
      )}
      {...rest}
    />
  );
};