import { createSignal, onCleanup, splitProps, type Component, type JSX } from "solid-js";
import { NumberField as KobalteNumberField } from "@kobalte/core/number-field";
import { Plus, Minus } from "lucide-solid";
import { Input } from "./input";
import { Button } from "./button";
import { createLongPress } from "@nikala-ui/hooks";
import { cn } from "@/lib/cn";

export interface NumberInputProps {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  minValue?: number;
  maxValue?: number;
  step?: number;
  allowNegative?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  class?: string;
  id?: string;
}

export const NumberInput: Component<NumberInputProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "value",
    "defaultValue",
    "onValueChange",
    "minValue",
    "maxValue",
    "step",
    "allowNegative",
    "disabled",
    "readOnly",
    "class",
    "id",
  ]);

  const [internalVal, setInternalVal] = createSignal<number>(
    local.value !== undefined
      ? local.value
      : local.defaultValue !== undefined
      ? local.defaultValue
      : 0
  );

  let autoRepeatInterval: ReturnType<typeof setInterval> | undefined;

  const currentVal = () => (local.value !== undefined ? local.value : internalVal());

  const effectiveMin = () => {
    if (local.minValue !== undefined) return local.minValue;
    return local.allowNegative ? -Infinity : 0;
  };

  const effectiveMax = () => {
    if (local.maxValue !== undefined) return local.maxValue;
    return Infinity;
  };

  const handleValueChange = (val: number) => {
    if (isNaN(val)) return;
    const clamped = Math.max(effectiveMin(), Math.min(effectiveMax(), val));
    setInternalVal(clamped);
    local.onValueChange?.(clamped);
  };

  const stopAutoRepeat = () => {
    if (autoRepeatInterval) {
      clearInterval(autoRepeatInterval);
      autoRepeatInterval = undefined;
    }
  };

  const startAutoRepeat = (direction: 1 | -1) => {
    if (local.disabled || local.readOnly) return;
    stopAutoRepeat();
    const stepAmount = local.step || 1;
    autoRepeatInterval = setInterval(() => {
      handleValueChange(currentVal() + direction * stepAmount);
    }, 75);
  };

  /* Nikala UI createLongPress hook for Increment Trigger */
  const incrementLongPress = createLongPress(
    () => {
      startAutoRepeat(1);
    },
    {
      threshold: 300,
      onCancel: stopAutoRepeat,
    }
  );

  /* Nikala UI createLongPress hook for Decrement Trigger */
  const decrementLongPress = createLongPress(
    () => {
      startAutoRepeat(-1);
    },
    {
      threshold: 300,
      onCancel: stopAutoRepeat,
    }
  );

  onCleanup(() => stopAutoRepeat());

  return (
    <KobalteNumberField
      value={currentVal()}
      onRawValueChange={handleValueChange}
      minValue={effectiveMin()}
      maxValue={effectiveMax()}
      step={local.step || 1}
      disabled={local.disabled}
      readOnly={local.readOnly}
      id={local.id}
      class={cn("relative flex items-center max-w-[160px]", local.class)}
      {...rest}
    >
      <KobalteNumberField.Input
        as={Input}
        class="pr-16 text-center font-mono focus-visible:ring-1"
      />

      <div class="absolute right-1 flex items-center gap-0.5">
        <KobalteNumberField.DecrementTrigger
          as={Button}
          variant="ghost"
          size="icon"
          class="h-7 w-7 rounded-sm p-0 text-muted-foreground hover:text-foreground select-none"
          aria-label="Decrement value"
          {...decrementLongPress.props}
        >
          <Minus class="h-3.5 w-3.5" />
        </KobalteNumberField.DecrementTrigger>

        <KobalteNumberField.IncrementTrigger
          as={Button}
          variant="ghost"
          size="icon"
          class="h-7 w-7 rounded-sm p-0 text-muted-foreground hover:text-foreground select-none"
          aria-label="Increment value"
          {...incrementLongPress.props}
        >
          <Plus class="h-3.5 w-3.5" />
        </KobalteNumberField.IncrementTrigger>
      </div>
    </KobalteNumberField>
  );
};
