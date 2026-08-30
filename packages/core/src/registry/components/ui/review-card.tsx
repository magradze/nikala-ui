import {
  splitProps,
  Show,
  type JSX,
  type ParentComponent,
  type Component,
} from "solid-js";
import { cva, type VariantProps } from "class-variance-authority";
import { CheckCircle2 } from "lucide-solid";
import { cn } from "@/lib/cn";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";
import { Rating, type RatingProps } from "./rating";

/* --- 1. ReviewCard Root --- */
export const reviewCardVariants = cva(
  "relative flex flex-col justify-between rounded-lg transition-all duration-200 overflow-hidden",
  {
    variants: {
      variant: {
        default: "border border-border bg-card text-card-foreground p-4 sm:p-5 shadow-2xs hover:shadow-xs",
        bordered: "border-2 border-border bg-background text-foreground p-4 sm:p-5",
        flat: "bg-muted/40 text-foreground p-4 sm:p-5",
        glass: "backdrop-blur-md bg-card/70 border border-border/80 text-card-foreground p-4 sm:p-5 shadow-2xs",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ReviewCardProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof reviewCardVariants> {
  class?: string;
}

export const ReviewCard: ParentComponent<ReviewCardProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "variant", "children"]);

  return (
    <div
      class={cn(reviewCardVariants({ variant: local.variant }), local.class)}
      {...rest}
    >
      {local.children}
    </div>
  );
};

/* --- 2. ReviewHeader --- */
export interface ReviewHeaderProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

export const ReviewHeader: ParentComponent<ReviewHeaderProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <div
      class={cn("flex items-start justify-between gap-3 mb-3 min-w-0 w-full", local.class)}
      {...rest}
    >
      {local.children}
    </div>
  );
};

/* --- 3. ReviewProfile (Avatar + Names container) --- */
export interface ReviewProfileProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

export const ReviewProfile: ParentComponent<ReviewProfileProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <div class={cn("flex items-start gap-2.5 min-w-0 flex-1 overflow-hidden", local.class)} {...rest}>
      {local.children}
    </div>
  );
};

/* --- 4. ReviewAvatar --- */
export interface ReviewAvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  class?: string;
}

export const ReviewAvatar: Component<ReviewAvatarProps> = (props) => {
  const [local] = splitProps(props, ["src", "alt", "fallback", "class"]);

  return (
    <Avatar class={cn("size-9 shrink-0 mt-0.5", local.class)}>
      <Show when={local.src}>
        <AvatarImage src={local.src!} alt={local.alt || "Reviewer Avatar"} />
      </Show>
      <AvatarFallback>
        {local.fallback || (local.alt ? local.alt.slice(0, 2).toUpperCase() : "U")}
      </AvatarFallback>
    </Avatar>
  );
};

/* --- 5. ReviewAuthor (Name & Subtitle/Role/Handle) --- */
export interface ReviewAuthorProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "role"> {
  name: string;
  username?: string;
  role?: string;
  verified?: boolean;
  class?: string;
}

export const ReviewAuthor: Component<ReviewAuthorProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "name",
    "username",
    "role",
    "verified",
    "class",
  ]);

  return (
    <div class={cn("flex flex-col min-w-0 flex-1 overflow-hidden", local.class)} {...rest}>
      <div class="flex items-center gap-1 font-semibold text-sm leading-tight text-foreground truncate">
        <span class="truncate">{local.name}</span>
        <Show when={local.verified}>
          <CheckCircle2 class="size-3.5 text-primary shrink-0" />
        </Show>
      </div>
      <Show when={local.username || local.role}>
        <p class="text-xs text-muted-foreground truncate mt-0.5">
          {local.username || local.role}
        </p>
      </Show>
    </div>
  );
};

/* --- 6. ReviewRating (Composing standalone Rating) --- */
export interface ReviewRatingProps extends RatingProps {}

export const ReviewRating: Component<ReviewRatingProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "size", "readOnly"]);

  return (
    <Rating
      size={local.size || "sm"}
      readOnly={local.readOnly !== undefined ? local.readOnly : true}
      class={cn("shrink-0 select-none ml-auto pt-0.5", local.class)}
      {...rest}
    />
  );
};

/* --- 7. ReviewBody (Quote / Content) --- */
export interface ReviewBodyProps extends JSX.HTMLAttributes<HTMLParagraphElement> {
  class?: string;
}

export const ReviewBody: ParentComponent<ReviewBodyProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <p
      class={cn("text-xs sm:text-sm text-muted-foreground leading-relaxed", local.class)}
      {...rest}
    >
      {local.children}
    </p>
  );
};

/* --- 8. ReviewFooter --- */
export interface ReviewFooterProps extends JSX.HTMLAttributes<HTMLDivElement> {
  class?: string;
}

export const ReviewFooter: ParentComponent<ReviewFooterProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <div
      class={cn(
        "mt-3 pt-3 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground",
        local.class
      )}
      {...rest}
    >
      {local.children}
    </div>
  );
};
