// src/components/ui/textarea.tsx
import {
  createSignal,
  splitProps,
  Show,
  type Component,
  type JSX,
} from "solid-js";
import { cn } from "@/lib/cn";

export interface TextareaProps
  extends JSX.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Uncontrolled initial default value */
  defaultValue?: string | number;
  /** Maximum allowed character limit */
  maxLength?: number;
  /** Whether to show live character count badge */
  showCount?: boolean;
  class?: string;
}

/**
 * Nikala UI Textarea component with optional live character counter and limit indicators.
 */
export const Textarea: Component<TextareaProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "maxLength",
    "showCount",
    "value",
    "defaultValue",
    "onInput",
    "class",
  ]);

  /* Internal reactive signal for character count tracking */
  const [currentValue, setCurrentValue] = createSignal<string>(
    String(local.value || local.defaultValue || "")
  );

  const handleInput: JSX.EventHandlerUnion<HTMLTextAreaElement, InputEvent> = (
    e
  ) => {
    setCurrentValue(e.currentTarget.value);
    if (typeof local.onInput === "function") {
      (local.onInput as (e: InputEvent) => void)(e);
    }
  };

  const count = () => currentValue().length;
  const isAtLimit = () =>
    local.maxLength !== undefined && count() >= local.maxLength;

  return (
    <div class="relative flex flex-col w-full">
      <textarea
        value={local.value !== undefined ? String(local.value) : currentValue()}
        maxLength={local.maxLength}
        onInput={handleInput}
        class={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-2xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          local.class
        )}
        {...rest}
      />

      {/* Dynamic Character Counter */}
      <Show when={local.showCount ?? Boolean(local.maxLength)}>
        <div
          class={cn(
            "mt-1 text-right text-[11px] font-mono transition-colors select-none",
            isAtLimit() ? "text-rose-500 font-bold" : "text-muted-foreground"
          )}
        >
          <span>{count()}</span>
          <Show when={local.maxLength}>
            <span> / {local.maxLength}</span>
          </Show>
        </div>
      </Show>
    </div>
  );
};