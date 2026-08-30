import { splitProps, type JSX, type ParentComponent } from "solid-js";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

/* --- Root Footer --- */
export const footerVariants = cva("w-full transition-colors", {
  variants: {
    variant: {
      default: "bg-background border-t border-border/60 text-foreground",
      muted: "bg-muted/40 border-t border-border text-foreground",
      bordered: "bg-background border-t-2 border-border text-foreground",
      floating: "my-8 rounded-lg border border-border/80 bg-card text-card-foreground shadow-xs",
      transparent: "bg-transparent border-transparent text-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface FooterProps
  extends JSX.HTMLAttributes<HTMLElement>,
    VariantProps<typeof footerVariants> {
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

export const Footer: ParentComponent<FooterProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "variant", "maxWidth", "children"]);

  const maxWidthClass = () => {
    switch (local.maxWidth) {
      case "sm":
        return "max-w-screen-sm";
      case "md":
        return "max-w-screen-md";
      case "lg":
        return "max-w-screen-lg";
      case "xl":
        return "max-w-screen-xl";
      case "full":
        return "max-w-full";
      case "2xl":
      default:
        return "max-w-screen-2xl";
    }
  };

  return (
    <footer
      class={cn(
        footerVariants({ variant: local.variant }),
        local.variant === "floating" && cn("mx-auto", maxWidthClass()),
        local.class
      )}
      {...rest}
    >
      <div class={cn("w-full", local.variant !== "floating" && cn("mx-auto", maxWidthClass()))}>
        {local.children}
      </div>
    </footer>
  );
};

/* --- Footer Container --- */
export interface FooterContainerProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

export const FooterContainer: ParentComponent<FooterContainerProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <div
      class={cn("px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16 w-full", local.class)}
      {...rest}
    >
      {local.children}
    </div>
  );
};

/* --- Footer Content (Columns Grid / Layout) --- */
export interface FooterContentProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

export const FooterContent: ParentComponent<FooterContentProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <div
      class={cn(
        "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12",
        local.class
      )}
      {...rest}
    >
      {local.children}
    </div>
  );
};

/* --- Footer Column --- */
export interface FooterColumnProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

export const FooterColumn: ParentComponent<FooterColumnProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <div class={cn("flex flex-col space-y-3", local.class)} {...rest}>
      {local.children}
    </div>
  );
};

/* --- Footer Column Title --- */
export interface FooterColumnTitleProps extends JSX.HTMLAttributes<HTMLHeadingElement> {
  class?: string;
}

export const FooterColumnTitle: ParentComponent<FooterColumnTitleProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <h4
      class={cn(
        "text-xs font-semibold uppercase tracking-wider text-foreground",
        local.class
      )}
      {...rest}
    >
      {local.children}
    </h4>
  );
};

/* --- Footer Column List --- */
export interface FooterColumnListProps extends JSX.HTMLAttributes<HTMLUListElement> {
  class?: string;
}

export const FooterColumnList: ParentComponent<FooterColumnListProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <ul class={cn("space-y-2 list-none p-0 m-0", local.class)} {...rest}>
      {local.children}
    </ul>
  );
};

/* --- Footer Link --- */
export interface FooterLinkProps extends JSX.AnchorHTMLAttributes<HTMLAnchorElement> {
  class?: string;
}

export const FooterLink: ParentComponent<FooterLinkProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <li>
      <a
        class={cn(
          "inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer",
          local.class
        )}
        {...rest}
      >
        {local.children}
      </a>
    </li>
  );
};

/* --- Footer Brand / Info Section --- */
export interface FooterBrandProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

export const FooterBrand: ParentComponent<FooterBrandProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <div
      class={cn(
        "col-span-2 sm:col-span-2 md:col-span-4 lg:col-span-2 flex flex-col space-y-3 mb-4 lg:mb-0",
        local.class
      )}
      {...rest}
    >
      {local.children}
    </div>
  );
};

/* --- Footer Bottom (Copyright and Secondary Links Bar) --- */
export interface FooterBottomProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

export const FooterBottom: ParentComponent<FooterBottomProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <div
      class={cn(
        "mt-12 sm:mt-16 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground",
        local.class
      )}
      {...rest}
    >
      {local.children}
    </div>
  );
};

/* --- Footer Copyright Text --- */
export interface FooterCopyrightProps extends JSX.HTMLAttributes<HTMLParagraphElement> {
  class?: string;
}

export const FooterCopyright: ParentComponent<FooterCopyrightProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <p class={cn("text-xs text-muted-foreground leading-relaxed", local.class)} {...rest}>
      {local.children}
    </p>
  );
};

/* --- Footer Social Links Container --- */
export interface FooterSocialsProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

export const FooterSocials: ParentComponent<FooterSocialsProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <div class={cn("flex items-center gap-3 text-muted-foreground", local.class)} {...rest}>
      {local.children}
    </div>
  );
};
