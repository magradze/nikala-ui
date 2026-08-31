import { createSignal, createMemo, type Accessor } from "solid-js";

export type FormErrors<T> = Partial<Record<keyof T, string>>;
export type FormTouched<T> = Partial<Record<keyof T, boolean>>;
export type ValidateOn = "change" | "blur" | "submit";

export type FormInputEvent = Event & {
  currentTarget:
    | HTMLInputElement
    | HTMLTextAreaElement
    | HTMLSelectElement;
};

export interface CreateFormOptions<T extends Record<string, any>> {
  /** Initial form field values object */
  initialValues: T;
  /** Custom validation function returning error messages object */
  validate?: (values: T) => FormErrors<T> | Promise<FormErrors<T>>;
  /** Event that triggers validation. Defaults to "change". */
  validateOn?: ValidateOn;
  /** Submit handler callback invoked when validation succeeds */
  onSubmit?: (values: T) => void | Promise<void>;
}

export interface CreateFormReturn<T extends Record<string, any>> {
  /** Accessor for current form field values */
  values: Accessor<T>;
  /** Accessor for form field validation error messages */
  errors: Accessor<FormErrors<T>>;
  /** Accessor for form field touched states */
  touched: Accessor<FormTouched<T>>;
  /** Accessor indicating if form is currently submitting */
  isSubmitting: Accessor<boolean>;
  /** Accessor containing an exception thrown by onSubmit, if any */
  submitError: Accessor<unknown>;
  /** Accessor indicating if form has zero validation errors */
  isValid: Accessor<boolean>;
  /** Accessor indicating if form values differ from initial values */
  isDirty: Accessor<boolean>;
  /** Update specific form field value */
  setFieldValue: <K extends keyof T>(field: K, value: T[K]) => void;
  /** Set specific form field validation error */
  setFieldError: <K extends keyof T>(field: K, error: string | undefined) => void;
  /** Set specific form field touched state */
  setFieldTouched: <K extends keyof T>(field: K, isTouched?: boolean) => void;
  /** Input change event listener helper factory function */
  handleChange: <K extends keyof T>(field: K) => (e: FormInputEvent) => void;
  /** Input blur event listener helper factory function */
  handleBlur: <K extends keyof T>(field: K) => () => void;
  /** Form onSubmit event handler */
  handleSubmit: (e?: Event) => Promise<void>;
  /** Reset form values, errors, and touched states to initial values */
  resetForm: () => void;
}

/**
 * SolidJS reactive primitive for managing form field state, validation, errors, and submission.
 *
 * @param options Form configuration options including initialValues and validate function.
 */
export function createForm<T extends Record<string, any>>(
  options: CreateFormOptions<T>
): CreateFormReturn<T> {
  const initialValues = { ...options.initialValues };

  const [values, setValues] = createSignal<T>({ ...initialValues });
  const [errors, setErrors] = createSignal<FormErrors<T>>({});
  const [touched, setTouched] = createSignal<FormTouched<T>>({});
  const [isSubmitting, setIsSubmitting] = createSignal(false);
  const [submitError, setSubmitError] = createSignal<unknown>();
  const validateOn = options.validateOn ?? "change";
  let validationSequence = 0;

  const isDirty = createMemo(() => {
    const current = values();
    return Object.keys(initialValues).some((key) => current[key] !== initialValues[key]);
  });

  const isValid = createMemo(() => {
    const errs = errors();
    return Object.keys(errs).length === 0;
  });

  const runValidation = async (currentValues: T): Promise<FormErrors<T>> => {
    const sequence = ++validationSequence;
    if (!options.validate) {
      setErrors(() => ({}));
      return {};
    }

    const result = await options.validate(currentValues);
    const newErrors = result || {};
    // Ignore stale async validations that finished after a newer request.
    if (sequence === validationSequence) {
      setErrors(() => newErrors);
    }
    return newErrors;
  };

  const setFieldValue = <K extends keyof T>(field: K, value: T[K]) => {
    const next = { ...values(), [field]: value };
    setValues(() => next);
    if (validateOn === "change") {
      void runValidation(next);
    }
  };

  const setFieldError = <K extends keyof T>(field: K, error: string | undefined) => {
    setErrors((prev) => {
      const next = { ...prev };
      if (error) next[field] = error;
      else delete next[field];
      return next;
    });
  };

  const setFieldTouched = <K extends keyof T>(field: K, isTouched = true) => {
    setTouched((prev) => ({ ...prev, [field]: isTouched }));
  };

  const handleChange = <K extends keyof T>(field: K) => {
    return (e: FormInputEvent) => {
      const target = e.currentTarget;
      let value: unknown = target.value;

      if (
        "checked" in target &&
        ((target as HTMLInputElement).type === "checkbox" ||
          (target as HTMLInputElement).type === "radio")
      ) {
        value = (target as HTMLInputElement).checked;
      } else if ("selectedOptions" in target && target.multiple) {
        value = Array.from(target.selectedOptions, (option) => option.value);
      }

      setFieldValue(field, value as T[K]);
    };
  };

  const handleBlur = <K extends keyof T>(field: K) => {
    return () => {
      setFieldTouched(field, true);
      if (validateOn === "blur") {
        void runValidation(values());
      }
    };
  };

  const handleSubmit = async (e?: Event) => {
    e?.preventDefault();
    setIsSubmitting(true);
    setSubmitError(undefined);

    // Mark all fields as touched on submit
    const allTouched = Object.keys(values()).reduce((acc, key) => {
      acc[key as keyof T] = true;
      return acc;
    }, {} as FormTouched<T>);
    setTouched(() => allTouched);

    try {
      const validationErrors = await runValidation(values());
      if (Object.keys(validationErrors).length === 0 && options.onSubmit) {
        try {
          await options.onSubmit(values());
        } catch (error) {
          setSubmitError(() => error);
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setValues(() => ({ ...initialValues }));
    setErrors(() => ({}));
    setTouched(() => ({}));
    setIsSubmitting(false);
    setSubmitError(undefined);
    validationSequence += 1;
  };

  return {
    values,
    errors,
    touched,
    isSubmitting,
    submitError,
    isValid,
    isDirty,
    setFieldValue,
    setFieldError,
    setFieldTouched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  };
}
