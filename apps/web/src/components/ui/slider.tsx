import { splitProps, type JSX, type ValidComponent } from "solid-js";
import * as SliderPrimitive from "@kobalte/core/slider";
import { cn } from "@/lib/cn";

export type SliderRootProps<T extends ValidComponent = "div"> =
  SliderPrimitive.SliderRootProps<T> & {
    class?: string;
    children?: JSX.Element;
  };

/**
 * Root Slider component built on Kobalte primitives.
 */
export const Slider = <T extends ValidComponent = "div">(
  props: SliderRootProps<T>
) => {
  const [local, rest] = splitProps(props as SliderRootProps, ["class", "children"]);

  return (
    <SliderPrimitive.Root
      class={cn(
        "relative flex w-full touch-none select-none flex-col gap-2 data-[orientation=vertical]:h-full data-[orientation=vertical]:w-auto data-[orientation=vertical]:items-center",
        local.class
      )}
      {...(rest as any)}
    >
      {local.children}
    </SliderPrimitive.Root>
  );
};

export type SliderTrackProps<T extends ValidComponent = "div"> =
  SliderPrimitive.SliderTrackProps<T> & {
    class?: string;
    children?: JSX.Element;
  };

/**
 * Slider track containing the active range fill and thumbs.
 */
export const SliderTrack = <T extends ValidComponent = "div">(
  props: SliderTrackProps<T>
) => {
  const [local, rest] = splitProps(props as SliderTrackProps, ["class", "children"]);

  return (
    <SliderPrimitive.Track
      class={cn(
        "relative h-2 w-full flex items-center rounded-lg bg-secondary cursor-pointer data-[orientation=vertical]:w-2 data-[orientation=vertical]:h-full data-[orientation=vertical]:flex-col data-[orientation=vertical]:justify-center",
        local.class
      )}
      {...(rest as any)}
    >
      <SliderFill />
      {local.children}
    </SliderPrimitive.Track>
  );
};

export type SliderFillProps<T extends ValidComponent = "div"> =
  SliderPrimitive.SliderFillProps<T> & {
    class?: string;
  };

/**
 * Active range indicator fill inside SliderTrack.
 */
export const SliderFill = <T extends ValidComponent = "div">(
  props: SliderFillProps<T>
) => {
  const [local, rest] = splitProps(props as SliderFillProps, ["class"]);

  return (
    <SliderPrimitive.Fill
      class={cn(
        "absolute rounded-lg bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
        local.class
      )}
      {...(rest as any)}
    />
  );
};

export type SliderThumbProps<T extends ValidComponent = "span"> =
  SliderPrimitive.SliderThumbProps<T> & {
    class?: string;
    children?: JSX.Element;
  };

/**
 * Draggable thumb handle for selecting slider values.
 * Positioned centered on Kobalte offset coordinates using -translate-x-1/2 -translate-y-1/2.
 */
export const SliderThumb = <T extends ValidComponent = "span">(
  props: SliderThumbProps<T>
) => {
  const [local, rest] = splitProps(props as SliderThumbProps, ["class", "children"]);

  return (
    <SliderPrimitive.Thumb
      class={cn(
        "block h-5 w-5 rounded-lg border-2 border-primary bg-background shadow-md transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 cursor-grab active:cursor-grabbing z-10 data-[orientation=horizontal]:translate-x-0 data-[orientation=horizontal]:translate-y-0 data-[orientation=vertical]:translate-x-0 data-[orientation=vertical]:translate-y-0",
        local.class
      )}
      {...(rest as any)}
    >
      <SliderPrimitive.Input />
      {local.children}
    </SliderPrimitive.Thumb>
  );
};

export type SliderLabelProps<T extends ValidComponent = "label"> =
  SliderPrimitive.SliderLabelProps<T> & {
    class?: string;
  };

/**
 * Accessible label for the Slider component.
 */
export const SliderLabel = <T extends ValidComponent = "label">(
  props: SliderLabelProps<T>
) => {
  const [local, rest] = splitProps(props as SliderLabelProps, ["class"]);

  return (
    <SliderPrimitive.Label
      class={cn("text-sm font-medium leading-none text-foreground", local.class)}
      {...(rest as any)}
    />
  );
};

export type SliderValueLabelProps<T extends ValidComponent = "output"> =
  SliderPrimitive.SliderValueLabelProps<T> & {
    class?: string;
  };

/**
 * Displays current formatted value label for single or dual thumbs.
 */
export const SliderValueLabel = <T extends ValidComponent = "output">(
  props: SliderValueLabelProps<T>
) => {
  const [local, rest] = splitProps(props as SliderValueLabelProps, ["class"]);

  return (
    <SliderPrimitive.ValueLabel
      class={cn("text-sm font-medium text-muted-foreground", local.class)}
      {...(rest as any)}
    />
  );
};
