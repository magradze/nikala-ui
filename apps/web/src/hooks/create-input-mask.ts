import { createSignal, type Accessor } from "solid-js";

export interface CreateInputMaskOptions {
  /** Mask pattern template (e.g. '+995 ### ##-##-##' or '#### #### #### ####') */
  mask: string;
  /** Initial default value */
  defaultValue?: string;
}

export interface CreateInputMaskReturn {
  /** Accessor returning formatted masked input string */
  value: Accessor<string>;
  /** Accessor returning raw unmasked user digits string */
  unmaskedValue: Accessor<string>;
  /** Function to programmatically update input value */
  setValue: (val: string) => void;
  /** JSX props object to spread onto target HTMLInputElement */
  props: {
    value: () => string;
    onInput: (e: Event & { currentTarget: HTMLInputElement }) => void;
  };
}

/**
 * Format raw unmasked text against a mask pattern template.
 */
export function formatMask(rawInput: string, pattern: string): { masked: string; unmasked: string } {
  if (!rawInput) {
    return { masked: "", unmasked: "" };
  }

  // Find static prefix of pattern before first slot placeholder (#, 0, X)
  let staticPrefix = "";
  for (let i = 0; i < pattern.length; i++) {
    const char = pattern[i];
    if (char === "#" || char === "0" || char === "X") break;
    staticPrefix += char;
  }
  const staticPrefixDigits = staticPrefix.replace(/\D/g, "");

  let digits = rawInput.replace(/\D/g, "");

  // Strip static prefix digits if present at the start
  if (staticPrefixDigits && digits.startsWith(staticPrefixDigits)) {
    digits = digits.slice(staticPrefixDigits.length);
  }

  if (!digits) {
    return { masked: "", unmasked: "" };
  }

  let masked = "";
  let digitIndex = 0;

  for (let i = 0; i < pattern.length; i++) {
    const char = pattern[i];
    if (char === "#" || char === "0" || char === "X") {
      if (digitIndex < digits.length) {
        masked += digits[digitIndex++];
      } else {
        break;
      }
    } else {
      if (digitIndex < digits.length) {
        masked += char;
      } else {
        break;
      }
    }
  }

  return { masked, unmasked: digits };
}

/**
 * SolidJS reactive primitive for input value masking (phone numbers, credit cards, dates).
 *
 * @param options Configuration options including mask pattern.
 */
export function createInputMask(options: CreateInputMaskOptions): CreateInputMaskReturn {
  const initial = formatMask(options.defaultValue || "", options.mask);
  const [value, setFormattedValue] = createSignal(initial.masked);
  const [unmaskedValue, setRawValue] = createSignal(initial.unmasked);

  const setValue = (newVal: string) => {
    const formatted = formatMask(newVal, options.mask);
    setFormattedValue(formatted.masked);
    setRawValue(formatted.unmasked);
  };

  const onInput = (e: Event & { currentTarget: HTMLInputElement }) => {
    const inputVal = e.currentTarget.value;
    const formatted = formatMask(inputVal, options.mask);

    setFormattedValue(formatted.masked);
    setRawValue(formatted.unmasked);
    e.currentTarget.value = formatted.masked;
  };

  return {
    value,
    unmaskedValue,
    setValue,
    props: {
      value: () => value(),
      onInput,
    },
  };
}
