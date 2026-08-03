import { createSignal, type Accessor } from "solid-js";

export interface CreateDisclosureOptions {
  /** Uncontrolled initial open state. Defaults to false. */
  defaultIsOpen?: boolean;
  /** Controlled open state accessor */
  isOpen?: boolean | Accessor<boolean | undefined>;
  /** Callback triggered when state transitions to open */
  onOpen?: () => void;
  /** Callback triggered when state transitions to closed */
  onClose?: () => void;
  /** Callback triggered whenever open state changes */
  onChange?: (isOpen: boolean) => void;
}

export interface CreateDisclosureReturn {
  /** Signal accessor indicating if disclosure is open */
  isOpen: Accessor<boolean>;
  /** Function to open the disclosure */
  open: () => void;
  /** Function to close the disclosure */
  close: () => void;
  /** Function to toggle the disclosure open state */
  toggle: () => void;
  /** Setter function to programmatically set open state */
  setOpen: (open: boolean) => void;
}

/**
 * SolidJS reactive primitive for managing boolean disclosure (open/close) state with controlled and uncontrolled support.
 *
 * @param options Configuration options including initial state and callbacks.
 */
export function createDisclosure(options: CreateDisclosureOptions = {}): CreateDisclosureReturn {
  const [internalOpen, setInternalOpen] = createSignal<boolean>(
    options.defaultIsOpen ?? false
  );

  const isControlled = () => {
    if (typeof options.isOpen === "function") {
      return options.isOpen() !== undefined;
    }
    return options.isOpen !== undefined;
  };

  const isOpen = (): boolean => {
    if (typeof options.isOpen === "function") {
      const val = options.isOpen();
      return val !== undefined ? val : internalOpen();
    }
    return options.isOpen !== undefined ? options.isOpen : internalOpen();
  };

  const setOpenState = (nextState: boolean) => {
    const currentState = isOpen();
    if (currentState === nextState) return;

    if (!isControlled()) {
      setInternalOpen(nextState);
    }

    options.onChange?.(nextState);

    if (nextState) {
      options.onOpen?.();
    } else {
      options.onClose?.();
    }
  };

  const open = () => setOpenState(true);
  const close = () => setOpenState(false);
  const toggle = () => setOpenState(!isOpen());

  return {
    isOpen,
    open,
    close,
    toggle,
    setOpen: setOpenState,
  };
}
