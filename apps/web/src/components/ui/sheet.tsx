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
@keyframes sheet-slide-out-bottom { from { transform: translateY(0); } to { transform: translateY(100%); } }
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
        left: "fixed top-0 bottom-0 left-0 w-3/4 border-r border-border sm:max-w-sm data-[expanded]:animate-[sheet-slide-in-left_300ms_ease-in-out] data-[closed]:animate-[sheet-slide-out-left_300ms_ease-in-out]",
        right: "fixed top-0 bottom-0 right-0 w-3/4 border-l border-border sm:max-w-sm data-[expanded]:animate-[sheet-slide-in-right_300ms_ease-in-out] data-[closed]:animate-[sheet-slide-out-right_300ms_ease-in-out]",
        top: "fixed top-0 left-0 right-0 border-b border-border data-[expanded]:animate-[sheet-slide-in-top_300ms_ease-in-out] data-[closed]:animate-[sheet-slide-out-top_300ms_ease-in-out]",
        bottom: "fixed bottom-0 left-0 right-0 border-t border-border data-[expanded]:animate-[sheet-slide-in-bottom_300ms_ease-in-out] data-[closed]:animate-[sheet-slide-out-bottom_300ms_ease-in-out]",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
);

export type SheetRootProps = DialogPrimitive.DialogRootProps;

export const Sheet: Component<SheetRootProps> = (props) => {
  return <DialogPrimitive.Root {...props} />;
};

export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.CloseButton;

export interface SheetOverlayProps<T extends ValidComponent = "div"> {
  /** Whether to apply background blur effect or keep transparent (default: true) */
  blur?: boolean;
  class?: string;
}

/**
 * Backdrop overlay wrapper with fade-in and fade-out animations.
 */
export const SheetOverlay = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, SheetOverlayProps<T>>
) => {
  const [local, rest] = splitProps(props as SheetOverlayProps, ["class", "blur"]);

  return (
    <DialogPrimitive.Overlay
      class={cn(
        "fixed inset-0 z-50 data-[expanded]:animate-[sheet-fade-in_300ms_ease-in-out] data-[closed]:animate-[sheet-fade-out_300ms_ease-in-out]",
        local.blur !== false ? "bg-black/80 backdrop-blur-sm" : "bg-transparent",
        local.class
      )}
      {...(rest as any)}
    />
  );
};

export type SheetContentProps<T extends ValidComponent = "div"> =
  DialogPrimitive.DialogContentProps<T> &
  VariantProps<typeof sheetVariants> & {
    /** Direction from which the sheet slides out: top, bottom, left, right */
    side?: "top" | "bottom" | "left" | "right";
    /** Whether to display the top-right close (X) button (default: true) */
    showCloseButton?: boolean;
    /** Whether clicking outside closes the sheet (default: true) */
    closeOnOutsideClick?: boolean;
    /** Whether to apply background backdrop blur (default: true) */
    blur?: boolean;
    class?: string;
    children?: JSX.Element;
  };

/**
 * Main sheet container with smooth CSS keyframe slide animations.
 */
export const SheetContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, SheetContentProps<T>>
) => {
  const [local, rest] = splitProps(props as SheetContentProps, [
    "side",
    "showCloseButton",
    "closeOnOutsideClick",
    "blur",
    "class",
    "children",
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
    <DialogPrimitive.Portal>
      <style>{sheetStyles}</style>
      <SheetOverlay blur={local.blur} />
      <DialogPrimitive.Content
        onPointerDownOutside={handlePointerDownOutside}
        onInteractOutside={handleInteractOutside}
        class={cn(sheetVariants({ side: side() }), "p-0", local.class)}
        {...(rest as any)}
      >
        <ScrollArea class="h-full w-full">
          <div class="p-6 space-y-4">
            {local.children}
          </div>
        </ScrollArea>
        <Show when={local.showCloseButton !== false}>
          <DialogPrimitive.CloseButton class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none cursor-pointer z-50">
            <X class="h-4 w-4" />
            <span class="sr-only">Close</span>
          </DialogPrimitive.CloseButton>
        </Show>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
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
      class={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", local.class)}
      {...rest}
    />
  );
};

export type SheetTitleProps<T extends ValidComponent = "h2"> =
  DialogPrimitive.DialogTitleProps<T> & {
    class?: string;
  };

export const SheetTitle = <T extends ValidComponent = "h2">(
  props: PolymorphicProps<T, SheetTitleProps<T>>
) => {
  const [local, rest] = splitProps(props as SheetTitleProps, ["class"]);

  return (
    <DialogPrimitive.Title
      class={cn("text-lg font-semibold text-foreground", local.class)}
      {...(rest as any)}
    />
  );
};

export type SheetDescriptionProps<T extends ValidComponent = "p"> =
  DialogPrimitive.DialogDescriptionProps<T> & {
    class?: string;
  };

export const SheetDescription = <T extends ValidComponent = "p">(
  props: PolymorphicProps<T, SheetDescriptionProps<T>>
) => {
  const [local, rest] = splitProps(props as SheetDescriptionProps, ["class"]);

  return (
    <DialogPrimitive.Description
      class={cn("text-sm text-muted-foreground", local.class)}
      {...(rest as any)}
    />
  );
};