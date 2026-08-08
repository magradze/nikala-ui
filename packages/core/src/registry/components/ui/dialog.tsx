import { splitProps, type Component, type JSX, type ValidComponent, Show } from "solid-js";
import * as DialogPrimitive from "@kobalte/core/dialog";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/cn";

export type DialogRootProps = DialogPrimitive.DialogRootProps;

/**
 * Root Dialog container managing state and context.
 */
export const Dialog: Component<DialogRootProps> = (props) => {
  return <DialogPrimitive.Root {...props} />;
};

export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export type DialogOverlayProps<T extends ValidComponent = "div"> =
  DialogPrimitive.DialogOverlayProps<T> & {
    /** Whether to apply background backdrop blur (default: true) */
    blur?: boolean;
    class?: string;
  };

/**
 * Darkened background overlay behind open dialog.
 */
export const DialogOverlay = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, DialogOverlayProps<T>>
) => {
  const [local, rest] = splitProps(props as DialogOverlayProps, ["class", "blur"]);

  return (
    <DialogPrimitive.Overlay
      class={cn(
        "fixed inset-0 z-50 transition-all duration-200 data-expanded:animate-in data-closed:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0",
        local.blur !== false ? "bg-black/80 backdrop-blur-sm" : "bg-black/80",
        local.class
      )}
      {...(rest as any)}
    />
  );
};

export type DialogContentProps<T extends ValidComponent = "div"> =
  DialogPrimitive.DialogContentProps<T> & {
    /** Whether to show the top-right close (X) button (default: true) */
    showCloseButton?: boolean;
    /** Whether clicking outside closes the dialog (default: true) */
    closeOnOutsideClick?: boolean;
    /** Whether to apply background backdrop blur (default: true) */
    blur?: boolean;
    class?: string;
    children?: JSX.Element;
  };

/**
 * Main dialog popup window housing header, content, and footer.
 */
export const DialogContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, DialogContentProps<T>>
) => {
  const [local, rest] = splitProps(props as DialogContentProps, [
    "class",
    "children",
    "showCloseButton",
    "closeOnOutsideClick",
    "blur",
    "onPointerDownOutside",
    "onInteractOutside",
  ]);

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
      {/* Forward blur prop to DialogOverlay */}
      <DialogOverlay blur={local.blur} />
      <DialogPrimitive.Content
        onPointerDownOutside={handlePointerDownOutside}
        onInteractOutside={handleInteractOutside}
        class={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] border border-border bg-popover shadow-lg duration-200 data-expanded:animate-in data-closed:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-closed:zoom-out-95 data-expanded:zoom-in-95 data-[closed]:slide-out-to-left-1/2 data-[closed]:slide-out-to-top-[48%] data-[expanded]:slide-in-from-left-1/2 data-[expanded]:slide-in-from-top-[48%] sm:rounded-lg text-card-foreground overflow-hidden max-h-[80vh]",
          local.class
        )}
        {...(rest as any)}
      >
        <ScrollArea class="max-h-[80vh] p-6">
          {local.children}
        </ScrollArea>
        <Show when={local.showCloseButton !== false}>
          <DialogPrimitive.CloseButton class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-expanded:bg-accent data-expanded:text-muted-foreground cursor-pointer z-50">
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span class="sr-only">Close</span>
          </DialogPrimitive.CloseButton>
        </Show>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
};

export interface DialogHeaderProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

export const DialogHeader: Component<DialogHeaderProps> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      class={cn("flex flex-col space-y-1.5 text-center sm:text-left", local.class)}
      {...rest}
    />
  );
};

export interface DialogFooterProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

export const DialogFooter: Component<DialogFooterProps> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      class={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-4",
        local.class
      )}
      {...rest}
    />
  );
};

export interface DialogTitleProps {
  class?: string;
  children?: JSX.Element;
}

export const DialogTitle: Component<DialogTitleProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <DialogPrimitive.Title
      class={cn("text-lg font-semibold leading-none tracking-tight text-foreground", local.class)}
      {...rest}
    >
      {local.children}
    </DialogPrimitive.Title>
  );
};

export interface DialogDescriptionProps {
  class?: string;
  children?: JSX.Element;
}

export const DialogDescription: Component<DialogDescriptionProps> = (props) => {
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