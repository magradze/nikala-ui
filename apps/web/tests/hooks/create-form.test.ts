import { describe, expect, it } from "vitest";
import { createForm } from "@nikala-ui/hooks";

const inputEvent = (target: Record<string, unknown>) =>
  ({ currentTarget: target } as any);

describe("createForm", () => {
  it("supports validation timing modes", async () => {
    let validations = 0;
    const form = createForm({
      initialValues: { email: "" },
      validateOn: "submit",
      validate: (values) => {
        validations += 1;
        return values.email.includes("@") ? {} : { email: "Invalid email" };
      },
    });

    form.handleChange("email")(inputEvent({ value: "invalid", type: "email" }));
    form.handleBlur("email")();
    expect(validations).toBe(0);

    await form.handleSubmit();
    expect(validations).toBe(1);
    expect(form.errors().email).toBe("Invalid email");
  });

  it("reads checkbox and multi-select values", () => {
    const form = createForm({
      initialValues: { enabled: false, topics: [] as string[] },
    });

    form.handleChange("enabled")(
      inputEvent({ type: "checkbox", checked: true, value: "on" })
    );
    form.handleChange("topics")(
      inputEvent({
        multiple: true,
        value: "",
        selectedOptions: [{ value: "solid" }, { value: "tailwind" }],
      })
    );

    expect(form.values().enabled).toBe(true);
    expect(form.values().topics).toEqual(["solid", "tailwind"]);
  });

  it("ignores stale async validation results", async () => {
    const form = createForm({
      initialValues: { value: "" },
      validate: async (values) => {
        await new Promise((resolve) => setTimeout(resolve, values.value === "slow" ? 25 : 1));
        return values.value === "slow" ? { value: "Stale error" } : {};
      },
    });

    form.setFieldValue("value", "slow");
    form.setFieldValue("value", "fast");
    await new Promise((resolve) => setTimeout(resolve, 40));

    expect(form.errors()).toEqual({});
  });

  it("exposes submit errors and clears them on reset", async () => {
    const form = createForm({
      initialValues: { email: "valid@example.com" },
      onSubmit: async () => {
        throw new Error("Network unavailable");
      },
    });

    await form.handleSubmit();
    expect(form.submitError()).toBeInstanceOf(Error);
    expect(form.isSubmitting()).toBe(false);

    form.resetForm();
    expect(form.submitError()).toBeUndefined();
  });
});
