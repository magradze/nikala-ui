import {
  createSignal,
  createMemo,
  createContext,
  useContext,
  type JSX,
} from "solid-js";
import { cn } from "@/lib/cn";

export type PinInputType = "numeric" | "alphanumeric";

export interface PinInputContextValue {
  value: () => string;
  setValue: (val: string) => void;
  mask: () => boolean;
  disabled: () => boolean;
  length: () => number;
  type: () => PinInputType;
  containerRef: HTMLDivElement | undefined;
}

const PinInputContext = createContext<PinInputContextValue>();

export interface PinInputProps {
  value?: string;
  onValueChange?: (value: string) => void;
  length?: number;
  type?: PinInputType;
  mask?: boolean;
  disabled?: boolean;
  class?: string;
  children?: JSX.Element;
}

/**
 * Root PinInput component for 4 or 6-digit OTP / verification PIN codes.
 */
export const PinInput = (props: PinInputProps) => {
  let containerRef: HTMLDivElement | undefined;
  const [internalValue, setInternalValue] = createSignal(props.value ?? "");

  const value = () => props.value ?? internalValue();
  const mask = () => props.mask ?? false;
  const disabled = () => props.disabled ?? false;
  const length = () => props.length ?? 6;

  const inputType = (): PinInputType => {
    const t = props.type ?? "numeric";
    if (t !== "numeric" && t !== "alphanumeric") {
      return "numeric";
    }
    return t;
  };

  const handleValueChange = (val: string) => {
    setInternalValue(val);
    props.onValueChange?.(val);
  };

  const contextValue: PinInputContextValue = {
    value,
    setValue: handleValueChange,
    mask,
    disabled,
    length,
    type: inputType,
    get containerRef() {
      return containerRef;
    },
  };

  return (
    <PinInputContext.Provider value={contextValue}>
      <div ref={containerRef} class={cn("flex items-center gap-2", props.class)}>
        {props.children}
      </div>
    </PinInputContext.Provider>
  );
};

export interface PinInputLabelProps {
  class?: string;
  children?: JSX.Element;
}

/**
 * Accessible label for PinInput.
 */
export const PinInputLabel = (props: PinInputLabelProps) => {
  return (
    <label class={cn("text-sm font-medium leading-none text-foreground", props.class)}>
      {props.children}
    </label>
  );
};

const focusIndex = (containerRef: HTMLDivElement | undefined, index: number) => {
  const el = containerRef?.querySelector<HTMLInputElement>(
    `[data-pin-input-index="${index}"]`
  );
  el?.focus();
  el?.select();
};

export interface PinInputInputProps {
  index: number;
  class?: string;
}

/**
 * Individual input slot for a single OTP digit/character.
 */
export const PinInputInput = (props: PinInputInputProps) => {
  const ctx = useContext(PinInputContext);
  const digit = createMemo(() => ctx?.value()[props.index] ?? "");

  const isCharAllowed = (char: string) => {
    if (!ctx || char === "") return false;
    return ctx.type() === "numeric"
      ? /^[0-9]$/.test(char)
      : /^[a-zA-Z0-9]$/.test(char);
  };

  const commitChar = (char: string) => {
    if (!ctx) return;
    const currentArray = ctx.value().split("");
    while (currentArray.length < props.index) currentArray.push("");
    currentArray[props.index] = char;
    ctx.setValue(currentArray.join(""));
  };

  const handleInput = (e: InputEvent & { currentTarget: HTMLInputElement }) => {
    if (!ctx || ctx.disabled()) return;
    const val = e.currentTarget.value;
    const rawChar = val ? val[val.length - 1] : "";

    // Clear digit if input is empty
    if (rawChar === "") {
      commitChar("");
      return;
    }

    if (!isCharAllowed(rawChar)) {
      e.currentTarget.value = digit();
      return;
    }

    commitChar(rawChar);

    if (props.index < ctx.length() - 1) {
      focusIndex(ctx.containerRef, props.index + 1);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!ctx || ctx.disabled()) return;
    if (e.key === "Backspace" && digit() === "" && props.index > 0) {
      focusIndex(ctx.containerRef, props.index - 1);
    }
  };

  const handlePaste = (e: ClipboardEvent & { currentTarget: HTMLInputElement }) => {
    if (!ctx || ctx.disabled()) return;
    e.preventDefault();
    const pasted = e.clipboardData?.getData("text") ?? "";
    const chars = pasted.split("").filter(isCharAllowed);
    if (chars.length === 0) return;

    const currentArray = ctx.value().split("");
    let lastFilled = props.index;
    for (let i = 0; i < chars.length && props.index + i < ctx.length(); i++) {
      while (currentArray.length < props.index + i) currentArray.push("");
      currentArray[props.index + i] = chars[i];
      lastFilled = props.index + i;
    }
    ctx.setValue(currentArray.join(""));
    focusIndex(ctx.containerRef, Math.min(lastFilled + 1, ctx.length() - 1));
  };

  return (
    <input
      type={ctx?.mask() ? "password" : "text"}
      inputMode={ctx?.type() === "numeric" ? "numeric" : "text"}
      autocomplete="one-time-code"
      maxLength={1}
      disabled={ctx?.disabled()}
      data-pin-input-index={props.index}
      value={digit()}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      class={cn(
        "relative flex h-10 w-10 text-center text-sm font-semibold rounded-md border border-input bg-background shadow-xs transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50",
        props.class
      )}
    />
  );
};
