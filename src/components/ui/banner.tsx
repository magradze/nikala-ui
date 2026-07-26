// src/components/ui/banner.tsx
import {
  createSignal,
  onMount,
  onCleanup,
  Show,
  splitProps,
  type Component,
  type JSX,
} from "solid-js";
import { Dynamic } from "solid-js/web";
import { cva, type VariantProps } from "class-variance-authority";
import { Info, AlertTriangle, CheckCircle, AlertCircle, X } from "lucide-solid";
import { cn } from "@/lib/cn";

export const bannerVariants = cva(
  "relative flex w-full items-center justify-between gap-3 px-4 py-2.5 text-sm transition-all duration-300 ease-in-out",
  {
    variants: {
      variant: {
        default:
          "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900",
        warning:
          "bg-amber-500/15 text-amber-900 border-b border-amber-500/20 dark:text-amber-200",
        info:
          "bg-sky-500/15 text-sky-900 border-b border-sky-500/20 dark:text-sky-200",
        success:
          "bg-emerald-500/15 text-emerald-900 border-b border-emerald-500/20 dark:text-emerald-200",
        destructive:
          "bg-rose-500/15 text-rose-900 border-b border-rose-500/20 dark:text-rose-200",
        pirosmani:
          "bg-[#722f37] text-white border-b border-[#8a3943] shadow-sm",
      },
      sticky: {
        true: "sticky top-0 z-50 backdrop-blur-sm",
        false: "relative",
      },
    },
    defaultVariants: {
      variant: "default",
      sticky: false,
    },
  }
);

export interface BannerProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {
  dismissible?: boolean;
  autoHideDelay?: number;
  storageKey?: string;
  showIcon?: boolean;
  icon?: Component<{ class?: string }>;
  link?: string;
  linkText?: string;
  linkTarget?: string;
  onDismiss?: () => void;
  class?: string;
}

/**
 * Nikala UI Banner Component.
 */
export const Banner: Component<BannerProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "variant",
    "sticky",
    "dismissible",
    "autoHideDelay",
    "storageKey",
    "showIcon",
    "icon",
    "link",
    "linkText",
    "linkTarget",
    "onDismiss",
    "class",
    "children",
  ]);

  const [visible, setVisible] = createSignal(true);
  let timerId: ReturnType<typeof setTimeout> | undefined;

  onMount(() => {
    if (local.storageKey) {
      try {
        const isDismissed = localStorage.getItem(local.storageKey);
        if (isDismissed === "true") {
          setVisible(false);
          return;
        }
      } catch (e) {}
    }

    if (local.autoHideDelay && local.autoHideDelay > 0) {
      timerId = setTimeout(() => {
        handleDismiss();
      }, local.autoHideDelay);
    }
  });

  onCleanup(() => {
    if (timerId) clearTimeout(timerId);
  });

  const handleDismiss = () => {
    setVisible(false);

    if (local.storageKey) {
      try {
        localStorage.setItem(local.storageKey, "true");
      } catch (e) {}
    }

    if (typeof local.onDismiss === "function") {
      local.onDismiss();
    }
  };

  /* Default icon selector based on banner variant */
  const getDefaultIcon = () => {
    switch (local.variant) {
      case "warning":
        return AlertTriangle;
      case "success":
        return CheckCircle;
      case "destructive":
        return AlertCircle;
      default:
        return Info;
    }
  };

  const activeIcon = () => local.icon || getDefaultIcon();
  const shouldShowIcon = () => local.showIcon !== false;
  const shouldBeDismissible = () => local.dismissible !== false;

  return (
    <Show when={visible()}>
      <div
        class={cn(
          bannerVariants({ variant: local.variant, sticky: local.sticky }),
          local.class
        )}
        {...rest}
      >
        <div class="flex flex-1 items-center justify-center gap-2 text-center sm:text-left">
          {/* Dynamic Lucide Icon */}
          <Show when={shouldShowIcon()}>
            <span class="inline-flex shrink-0 items-center justify-center">
              <Dynamic component={activeIcon()} class="h-4 w-4 opacity-80" />
            </span>
          </Show>

          {/* Text Content */}
          <div class="flex-1 text-xs font-medium sm:text-sm">
            {local.children}
          </div>

          {/* Action Link */}
          <Show when={local.link}>
            <div class="shrink-0">
              <a
                href={local.link}
                target={local.linkTarget || "_blank"}
                rel="noreferrer"
                class="underline font-semibold hover:opacity-80 transition-opacity"
              >
                {local.linkText || "Learn more"}
              </a>
            </div>
          </Show>
        </div>

        {/* Close Button */}
        <Show when={shouldBeDismissible()}>
          <button
            type="button"
            onClick={handleDismiss}
            class="shrink-0 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Dismiss banner"
          >
            <X class="h-4 w-4" />
          </button>
        </Show>
      </div>
    </Show>
  );
};