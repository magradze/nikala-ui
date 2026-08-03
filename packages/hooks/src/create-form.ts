import { createSignal, createMemo, type Accessor } from "solid-js";

export type FormErrors<T> = Partial<Record<keyof T, string>>;
export type FormTouched<T> = Partial<Record<keyof T, boolean>>;

export interface CreateFormOptions<T extends Record<string, any>> {
  /** Initial form field values object */
  initialValues: T;
  /** Custom validation function returning error messages object */
  validate?: (values: T) => FormErrors<T> | Promise<FormErrors<T>>;
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
  handleChange: <K extends keyof T>(field: K) => (e: Event & { currentTarget: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement }) => void;
  /** Input blur event listener helper factory function */
  handleBlur: <K extends keyof T>(field: K) => () => void;
  /** Form onSubmit event handler */
  handleSubmit: (e?: Event) => void;
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

  const isDirty = createMemo(() => {
    const current = values();
    return Object.keys(initialValues).some((key) => current[key] !== initialValues[key]);
  });

  const isValid = createMemo(() => {
    const errs = errors();
    return Object.keys(errs).length === 0;
  });

  const runValidation = async (currentValues: T): Promise<FormErrors<T>> => {
    if (!options.validate) return {};
    const result = await options.validate(currentValues);
    const newErrors = result || {};
    setErrors(() => newErrors);
    return newErrors;
  };

  const setFieldValue = <K extends keyof T>(field: K, value: T[K]) => {
    setValues((prev) => {
      const next = { ...prev, [field]: value };
      runValidation(next);
      return next;
    });
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
    return (e: Event & { currentTarget: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement }) => {
      const val = e.currentTarget.value;
      setFieldValue(field, val as any);
    };
  };

  const handleBlur = <K extends keyof T>(field: K) => {
    return () => {
      setFieldTouched(field, true);
    };
  };

  const handleSubmit = async (e?: Event) => {
    e?.preventDefault();
    setIsSubmitting(true);

    // Mark all fields as touched on submit
    const allTouched = Object.keys(values()).reduce((acc, key) => {
      acc[key as keyof T] = true;
      return acc;
    }, {} as FormTouched<T>);
    setTouched(() => allTouched);

    const validationErrors = await runValidation(values());
    if (Object.keys(validationErrors).length === 0) {
      if (options.onSubmit) {
        await options.onSubmit(values());
      }
    }

    setIsSubmitting(false);
  };

  const resetForm = () => {
    setValues(() => ({ ...initialValues }));
    setErrors(() => ({}));
    setTouched(() => ({}));
    setIsSubmitting(false);
  };

  return {
    values,
    errors,
    touched,
    isSubmitting,
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
