import { splitProps, type Component, type JSX, createSignal, onCleanup } from "solid-js";
import { NumberField as KobalteNumberField } from "@kobalte/core/number-field";
import { Plus, Minus } from "lucide-solid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let intervalId: ReturnType<typeof setInterval> | null = null;

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

  const stopLongPress = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };

  const startLongPress = (direction: 1 | -1) => {
    if (local.disabled || local.readOnly) return;
    stopLongPress();

    const step = local.step || 1;

    // Start auto-repeat only after holding for 300ms
    timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        handleValueChange(currentVal() + direction * step);
      }, 75);
    }, 300);
  };

  onCleanup(() => stopLongPress());

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
          onPointerDown={() => startLongPress(-1)}
          onPointerUp={stopLongPress}
          onPointerLeave={stopLongPress}
        >
          <Minus class="h-3.5 w-3.5" />
        </KobalteNumberField.DecrementTrigger>

        <KobalteNumberField.IncrementTrigger
          as={Button}
          variant="ghost"
          size="icon"
          class="h-7 w-7 rounded-sm p-0 text-muted-foreground hover:text-foreground select-none"
          aria-label="Increment value"
          onPointerDown={() => startLongPress(1)}
          onPointerUp={stopLongPress}
          onPointerLeave={stopLongPress}
        >
          <Plus class="h-3.5 w-3.5" />
        </KobalteNumberField.IncrementTrigger>
      </div>
    </KobalteNumberField>
  );
};
