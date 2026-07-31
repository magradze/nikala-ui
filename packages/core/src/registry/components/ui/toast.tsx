import { splitProps, type Component, type JSX, type ComponentProps } from "solid-js";
import { Toast as KobalteToast, toaster } from "@kobalte/core/toast";
import { cva, type VariantProps } from "class-variance-authority";
import { X, CircleCheck, Info, CircleAlert, TriangleAlert } from "lucide-solid";
import { cn } from "@/lib/cn";

export const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-lg border p-4 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--kb-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--kb-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[opened]:animate-in data-[closed]:animate-out data-[swipe=end]:animate-out data-[closed]:fade-out-80 data-[closed]:slide-out-to-right-full data-[opened]:slide-in-from-top-full data-[opened]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border-border bg-background text-foreground",
        success: "border-emerald-500/20 bg-emerald-500/10 text-emerald-900 dark:text-emerald-200 border-emerald-500/30",
        destructive: "border-destructive/30 bg-destructive/10 text-destructive dark:text-red-300",
        warning: "border-amber-500/20 bg-amber-500/10 text-amber-900 dark:text-amber-200 border-amber-500/30",
        info: "border-sky-500/20 bg-sky-500/10 text-sky-900 dark:text-sky-200 border-sky-500/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ToastProps
  extends ComponentProps<typeof KobalteToast>,
    VariantProps<typeof toastVariants> {
  class?: string;
}

export const Toast: Component<ToastProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "variant"]);

  return (
    <KobalteToast
      class={cn(toastVariants({ variant: local.variant }), local.class)}
      {...rest}
    />
  );
};

export const ToastTitle: Component<ComponentProps<typeof KobalteToast.Title>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <KobalteToast.Title
      class={cn("text-sm font-semibold [&+div]:text-xs", local.class)}
      {...rest}
    />
  );
};

export const ToastDescription: Component<ComponentProps<typeof KobalteToast.Description>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <KobalteToast.Description
      class={cn("text-sm opacity-90", local.class)}
      {...rest}
    />
  );
};

export const ToastCloseButton: Component<ComponentProps<typeof KobalteToast.CloseButton>> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <KobalteToast.CloseButton
      class={cn(
        "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100",
        local.class
      )}
      {...rest}
    >
      {local.children || <X class="h-4 w-4" />}
    </KobalteToast.CloseButton>
  );
};

export const ToastRegion: Component<ComponentProps<typeof KobalteToast.Region>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <KobalteToast.Region
      class={cn(
        "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
        local.class
      )}
      {...rest}
    />
  );
};

export const ToastList: Component<ComponentProps<typeof KobalteToast.List>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);

  return <KobalteToast.List class={cn("flex flex-col gap-2", local.class)} {...rest} />;
};

/* --- Helper Function to Trigger Toast Notifications --- */
export interface ShowToastOptions {
  title: string;
  description?: string;
  variant?: "default" | "success" | "destructive" | "warning" | "info";
  duration?: number;
}

export const showToast = (options: ShowToastOptions) => {
  return toaster.show((props) => (
    <Toast toastId={props.toastId} variant={options.variant || "default"}>
      <div class="flex items-start gap-3">
        {options.variant === "success" && <CircleCheck class="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />}
        {options.variant === "destructive" && <CircleAlert class="h-5 w-5 text-red-500 shrink-0 mt-0.5" />}
        {options.variant === "warning" && <TriangleAlert class="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />}
        {options.variant === "info" && <Info class="h-5 w-5 text-sky-500 shrink-0 mt-0.5" />}
        <div class="grid gap-1">
          <ToastTitle>{options.title}</ToastTitle>
          {options.description && <ToastDescription>{options.description}</ToastDescription>}
        </div>
      </div>
      <ToastCloseButton />
    </Toast>
  ));
};