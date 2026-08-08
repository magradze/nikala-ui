import { splitProps, type Component, type JSX, type ValidComponent, Show } from "solid-js";
import * as DialogPrimitive from "@kobalte/core/dialog";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-solid";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/cn";

// Global CSS Keyframe Animations specifically designed for Kobalte animationend DOM events
const sheetStyles = `
@keyframes sheet-slide-in-left { from { transform: translateX(-100%); } to { transform: translateX(0); } }
@keyframes sheet-slide-out-left { from { transform: translateX(0); } to { transform: translateX(-100%); } }
@keyframes sheet-slide-in-right { from { transform: translateX(100%); } to { transform: translateX(0); } }
@keyframes sheet-slide-out-right { from { transform: translateX(0); } to { transform: translateX(100%); } }
@keyframes sheet-slide-in-top { from { transform: translateY(-100%); } to { transform: translateY(0); } }
@keyframes sheet-slide-out-top { from { transform: translateY(0); } to { transform: translateY(-100%); } }
@keyframes sheet-slide-in-bottom { from { transform: translateY(100%); } to { transform: translateY(0); } }
@keyframes sheet-slide-out-bottom { from { transform: translateY(0); } to { transform: translateY(-100%); } }
@keyframes sheet-fade-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes sheet-fade-out { from { opacity: 1; } to { opacity: 0; } }
`;

/**
 * CVA variants for CSS keyframe slide animations across 4 edges.
 */
export const sheetVariants = cva(
  "fixed z-50 gap-4 bg-card p-6 text-card-foreground shadow-lg",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[expanded]:animate-[sheet-slide-in-top_300ms_ease-in-out] data-[closed]:animate-[sheet-slide-out-top_300ms_ease-in-out]",
        bottom:
          "inset-x-0 bottom-0 border-t data-[expanded]:animate-[sheet-slide-in-bottom_300ms_ease-in-out] data-[closed]:animate-[sheet-slide-out-bottom_300ms_ease-in-out]",
        left: "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm data-[expanded]:animate-[sheet-slide-in-left_300ms_ease-in-out] data-[closed]:animate-[sheet-slide-out-left_300ms_ease-in-out]",
        right:
          "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm data-[expanded]:animate-[sheet-slide-in-right_300ms_ease-in-out] data-[closed]:animate-[sheet-slide-out-right_300ms_ease-in-out]",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
);

export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.Close;
export const SheetPortal = DialogPrimitive.Portal;

export type SheetOverlayProps<T extends ValidComponent = "div"> =
  DialogPrimitive.DialogOverlayProps<T> & {
    /** Whether to apply backdrop blur (default: true) */
    blur?: boolean;
    class?: string;
  };

/**
 * Fullscreen dark backdrop with fade keyframe animation.
 */
export const SheetOverlay = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, SheetOverlayProps<T>>
) => {
  const [local, rest] = splitProps(props as SheetOverlayProps, ["class", "blur"]);

  return (
    <DialogPrimitive.Overlay
      class={cn(
        "fixed inset-0 z-50 transition-all duration-200 data-[expanded]:animate-[sheet-fade-in_300ms_ease-in-out] data-[closed]:animate-[sheet-fade-out_300ms_ease-in-out]",
        local.blur !== false ? "bg-black/80 backdrop-blur-sm" : "bg-black/80",
        local.class
      )}
      {...(rest as any)}
    />
  );
};

export type SheetContentProps<T extends ValidComponent = "div"> =
  DialogPrimitive.DialogContentProps<T> &
    VariantProps<typeof sheetVariants> & {
      side?: "top" | "bottom" | "left" | "right";
      showCloseButton?: boolean;
      closeOnOutsideClick?: boolean;
      blur?: boolean;
      class?: string;
      children?: JSX.Element;
    };

/**
 * Slide-out panel container with ScrollArea and animation support.
 */
export const SheetContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, SheetContentProps<T>>
) => {
  const [local, rest] = splitProps(props as SheetContentProps, [
    "class",
    "children",
    "side",
    "showCloseButton",
    "closeOnOutsideClick",
    "blur",
    "onPointerDownOutside",
    "onInteractOutside",
  ]);

  const side = () => local.side || "right";

  const handlePointerDownOutside = (e: Event) => {
    if (local.closeOnOutsideClick === false) {
      e.preventDefault();
    }
    if (typeof local.onPointerDownOutside === "function") {
      local.onPointerDownOutside(e as any);
    }
  };

  const handleInteractOutside = (e: Event) => {
    if (local.closeOnOutsideClick === false) {
      e.preventDefault();
    }
    if (typeof local.onInteractOutside === "function") {
      local.onInteractOutside(e as any);
    }
  };

  return (
    <SheetPortal>
      <style>{sheetStyles}</style>
      <SheetOverlay blur={local.blur} />
      <DialogPrimitive.Content
        onPointerDownOutside={handlePointerDownOutside}
        onInteractOutside={handleInteractOutside}
        class={cn(sheetVariants({ side: side() }), "p-0", local.class)}
        {...(rest as any)}
      >
        <ScrollArea class="h-full w-full p-6">
          {local.children}
        </ScrollArea>
        <Show when={local.showCloseButton !== false}>
          <DialogPrimitive.CloseButton class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none cursor-pointer z-50">
            <X class="h-4 w-4" />
            <span class="sr-only">Close</span>
          </DialogPrimitive.CloseButton>
        </Show>
      </DialogPrimitive.Content>
    </SheetPortal>
  );
};

export interface SheetHeaderProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

export const SheetHeader: Component<SheetHeaderProps> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      class={cn("flex flex-col space-y-2 text-center sm:text-left", local.class)}
      {...rest}
    />
  );
};

export interface SheetFooterProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

export const SheetFooter: Component<SheetFooterProps> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      class={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-4", local.class)}
      {...rest}
    />
  );
};

export interface SheetTitleProps {
  class?: string;
  children?: JSX.Element;
}

export const SheetTitle: Component<SheetTitleProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <DialogPrimitive.Title
      class={cn("text-lg font-semibold text-foreground", local.class)}
      {...rest}
    >
      {local.children}
    </DialogPrimitive.Title>
  );
};

export interface SheetDescriptionProps {
  class?: string;
  children?: JSX.Element;
}

export const SheetDescription: Component<SheetDescriptionProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <DialogPrimitive.Description
      class={cn("text-sm text-muted-foreground", local.class)}
      {...rest}
    >
      {local.children}
    </DialogPrimitive.Description>
  );
};