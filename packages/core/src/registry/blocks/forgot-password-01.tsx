import { createSignal, Show, type Component } from "solid-js";
import { createForm } from "@nikala-ui/hooks";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { Form } from "../components/ui/form";
import { Field, FieldLabel } from "../components/ui/field";
import { FormMessage } from "../components/ui/form-message";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Alert, AlertTitle, AlertDescription } from "../components/ui/alert";
import { Lock, Mail, ArrowLeft, ArrowRight, CheckCircle2, RotateCcw } from "lucide-solid";

export const ForgotPassword01: Component = () => {
  const [sent, setSent] = createSignal(false);
  const [submittedEmail, setSubmittedEmail] = createSignal("");

  const form = createForm({
    initialValues: {
      email: "",
    },
    validate: (values) => {
      const errors: Record<string, string> = {};
      if (!values.email.trim()) {
        errors.email = "Email is required";
      } else if (!values.email.includes("@")) {
        errors.email = "Please enter a valid email address";
      }
      return errors;
    },
    onSubmit: async (values) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmittedEmail(values.email);
      setSent(true);
    },
  });

  const isFormValid = () =>
    form.values().email.trim() !== "" && form.values().email.includes("@");

  const handleReset = () => {
    setSent(false);
    form.resetForm();
  };

  return (
    <div class="@container w-full min-h-[520px] flex items-center justify-center p-4 sm:p-6 md:p-10">
      <Card class="w-full max-w-md border-border shadow-md bg-card">
        {/* Card Header */}
        <CardHeader class="space-y-2 text-center pb-4">
          <div class="mx-auto size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-1 shadow-2xs">
            <Show when={sent()} fallback={<Lock class="size-6" />}>
              <Mail class="size-6" />
            </Show>
          </div>
          <CardTitle class="text-2xl font-bold tracking-tight">
            {sent() ? "Check your email" : "Reset your password"}
          </CardTitle>
          <CardDescription class="text-xs sm:text-sm">
            {sent()
              ? `We have sent a secure password reset link to ${submittedEmail()}`
              : "Enter the email associated with your account and we will send you a reset link"}
          </CardDescription>
        </CardHeader>

        <CardContent class="space-y-4">
          <Show
            when={sent()}
            fallback={
              <Form onSubmit={form.handleSubmit} loading={form.isSubmitting()} class="space-y-4">
                <Field>
                  <FieldLabel for="fp-email" class="text-xs sm:text-sm">Email address</FieldLabel>
                  <Input
                    id="fp-email"
                    type="email"
                    placeholder="name@company.com"
                    value={form.values().email}
                    onInput={form.handleChange("email")}
                    onBlur={form.handleBlur("email")}
                    autocomplete="email"
                  />
                  <FormMessage form={form} name="email" />
                </Field>

                <Button
                  type="submit"
                  class="w-full font-medium"
                  disabled={form.isSubmitting() || !isFormValid()}
                >
                  <Show when={form.isSubmitting()} fallback={<>Send Reset Link <ArrowRight class="ml-2 size-4" /></>}>
                    Sending instructions...
                  </Show>
                </Button>
              </Form>
            }
          >
            <div class="space-y-4">
              <Alert class="bg-emerald-500/10 border-emerald-500/30 text-emerald-500 py-3">
                <CheckCircle2 class="size-4 text-emerald-500 shrink-0" />
                <AlertTitle class="text-xs font-semibold text-foreground">Instructions Sent</AlertTitle>
                <AlertDescription class="text-[11px] text-muted-foreground">
                  If an account exists for <span class="font-medium text-foreground font-mono">{submittedEmail()}</span>, you will receive an email shortly.
                </AlertDescription>
              </Alert>

              <div class="flex items-center justify-between text-xs text-muted-foreground pt-1">
                <span>Didn't get the email?</span>
                <Button
                  variant="link"
                  size="sm"
                  type="button"
                  onClick={handleReset}
                  class="h-auto p-0 text-xs text-primary font-semibold gap-1 cursor-pointer"
                >
                  <RotateCcw class="size-3" /> Try another email
                </Button>
              </div>
            </div>
          </Show>
        </CardContent>

        {/* Card Footer */}
        <CardFooter class="justify-center border-t border-border/50 py-4 text-xs text-muted-foreground">
          <a
            href="/blocks/login-01"
            class="inline-flex items-center gap-1.5 text-foreground hover:text-primary transition-colors font-medium"
          >
            <ArrowLeft class="size-3.5" /> Back to sign in
          </a>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgotPassword01;
