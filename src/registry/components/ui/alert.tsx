import {
  createSignal,
  splitProps,
  onMount,
  onCleanup,
  Show,
  type Component,
  type JSX,
} from "solid-js";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

/**
 * CVA variants for Alert status styles and color themes.
 */
export const alertVariants = cva(
  "relative w-full rounded-lg border p-4 transition-all duration-200 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-zinc-950 dark:[&>svg]:text-zinc-50",
  {
    variants: {
      variant: {
        default:
          "bg-white text-zinc-950 border-zinc-200 dark:bg-zinc-950 dark:text-zinc-50 dark:border-zinc-800",
        info:
          "bg-blue-50 text-blue-900 border-blue-200 dark:bg-blue-950/50 dark:text-blue-200 dark:border-blue-900/50",
        success:
          "bg-emerald-50 text-emerald-900 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-200 dark:border-emerald-900/50",
        warning:
          "bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-950/50 dark:text-amber-200 dark:border-amber-900/50",
        destructive:
          "bg-red-50 text-red-900 border-red-200 dark:bg-red-950/50 dark:text-red-200 dark:border-red-900/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface AlertProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  /** Display an interactive close (X) button */
  closable?: boolean;
  /** Auto-dismiss timer duration in milliseconds */
  duration?: number;
  /** Callback fired when the alert is dismissed */
  onClose?: () => void;
  class?: string;
}

/**
 * Nikala UI Alert notification banner with auto-dismiss timer and theme variants.
 */
export const Alert: Component<AlertProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "variant",
    "closable",
    "duration",
    "onClose",
    "class",
    "children",
  ]);

  const [isVisible, setIsVisible] = createSignal(true);
  let timer: ReturnType<typeof setTimeout> | undefined;

  const handleClose = () => {
    setIsVisible(false);
    if (typeof local.onClose === "function") {
      local.onClose();
    }
  };

  onMount(() => {
    if (local.duration && local.duration > 0) {
      timer = setTimeout(() => {
        handleClose();
      }, local.duration);
    }
  });

  onCleanup(() => {
    if (timer) clearTimeout(timer);
  });

  return (
    <Show when={isVisible()}>
      <div
        role="alert"
        class={cn(
          alertVariants({ variant: local.variant }),
          "animate-in fade-in-0 duration-200",
          local.class
        )}
        {...rest}
      >
        {local.children}
        <Show when={local.closable || typeof local.onClose === "function"}>
          <button
            type="button"
            aria-label="Close alert"
            onClick={handleClose}
            class="absolute right-3 top-3 rounded-md p-1 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 transition-colors cursor-pointer"
          >
            <svg
              class="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </Show>
      </div>
    </Show>
  );
};

export interface AlertTitleProps extends JSX.HTMLAttributes<HTMLHeadingElement> {
  class?: string;
}

/**
 * Header title element for the Alert banner.
 */
export const AlertTitle: Component<AlertTitleProps> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <h5
      class={cn("mb-1 font-medium leading-none tracking-tight", local.class)}
      {...rest}
    />
  );
};

export interface AlertDescriptionProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

/**
 * Body text content for the Alert banner.
 */
export const AlertDescription: Component<AlertDescriptionProps> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <div
      class={cn("text-sm [&_p]:leading-relaxed opacity-90", local.class)}
      {...rest}
    />
  );
};