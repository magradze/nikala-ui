import { createSignal, Show, type Component } from "solid-js";
import { createForm } from "@nikala-ui/hooks";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Field, FieldLabel } from "@/components/ui/field";
import { FormMessage } from "@/components/ui/form-message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Check, X, ArrowRight, ShieldCheck } from "lucide-solid";

export const Register01: Component = () => {
  const [showPassword, setShowPassword] = createSignal(false);

  const form = createForm({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      agreeTerms: false,
    },
    validate: (values) => {
      const errors: Record<string, string> = {};
      if (!values.fullName.trim()) {
        errors.fullName = "Full name is required";
      }
      if (!values.email.trim()) {
        errors.email = "Email is required";
      } else if (!values.email.includes("@")) {
        errors.email = "Please enter a valid email address";
      }
      if (!values.password) {
        errors.password = "Password is required";
      } else if (values.password.length < 8) {
        errors.password = "Password must be at least 8 characters";
      }
      if (!values.agreeTerms) {
        errors.agreeTerms = "You must agree to the terms and privacy policy";
      }
      return errors;
    },
    onSubmit: async (values) => {
      // Simulate API registration request
      await new Promise((resolve) => setTimeout(resolve, 1200));
    },
  });

  const password = () => form.values().password;

  // Reactive password criteria calculations
  const hasMinLength = () => password().length >= 8;
  const hasNumber = () => /\d/.test(password());
  const hasSpecial = () => /[^A-Za-z0-9]/.test(password());
  const hasUpperLower = () => /[a-z]/.test(password()) && /[A-Z]/.test(password());

  const strengthScore = () => {
    let score = 0;
    if (password().length === 0) return 0;
    if (hasMinLength()) score += 25;
    if (hasNumber()) score += 25;
    if (hasSpecial()) score += 25;
    if (hasUpperLower()) score += 25;
    return score;
  };

  const strengthLabel = () => {
    const score = strengthScore();
    if (score === 0) return "None";
    if (score <= 25) return "Weak";
    if (score <= 50) return "Fair";
    if (score <= 75) return "Good";
    return "Strong";
  };

  const strengthColorClass = () => {
    const score = strengthScore();
    if (score <= 25) return "bg-destructive";
    if (score <= 50) return "bg-amber-500";
    if (score <= 75) return "bg-blue-500";
    return "bg-emerald-500";
  };

  const strengthBadgeVariant = () => {
    const score = strengthScore();
    if (score <= 25) return "destructive";
    if (score <= 50) return "outline";
    return "secondary";
  };

  const isFormValid = () =>
    form.values().fullName.trim() !== "" &&
    form.values().email.trim() !== "" &&
    form.values().agreeTerms &&
    strengthScore() >= 50;

  return (
    <div class="@container w-full min-h-[600px] flex items-center justify-center p-4 sm:p-6 md:p-10">
      <Card class="w-full max-w-lg border-border shadow-md bg-card">
        {/* Card Header */}
        <CardHeader class="space-y-2 text-center pb-6">
          <div class="mx-auto size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-1">
            <ShieldCheck class="size-5" />
          </div>
          <CardTitle class="text-2xl font-bold tracking-tight">Create your account</CardTitle>
          <CardDescription class="text-xs sm:text-sm">
            Join thousands of developers building fast SolidJS interfaces
          </CardDescription>
        </CardHeader>

        <CardContent class="space-y-6">
          {/* Social OAuth Buttons */}
          <div class="grid grid-cols-1 @xs:grid-cols-2 gap-2.5">
            <Button variant="outline" class="w-full justify-center text-xs h-9">
              <svg class="size-4 mr-2 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </Button>
            <Button variant="outline" class="w-full justify-center text-xs h-9">
              <svg class="size-4 mr-2 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              Google
            </Button>
          </div>

          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div class="relative flex justify-center text-xs uppercase">
              <span class="bg-card px-3 text-muted-foreground font-medium text-[11px]">
                Or register with email
              </span>
            </div>
          </div>

          {/* Registration Form with Nikala UI Form & Field ecosystem */}
          <Form onSubmit={form.handleSubmit} loading={form.isSubmitting()} class="space-y-4">
            <Field>
              <FieldLabel for="reg-name" class="text-xs sm:text-sm">Full Name</FieldLabel>
              <Input
                id="reg-name"
                type="text"
                placeholder="Niko Pirosmani"
                value={form.values().fullName}
                onInput={form.handleChange("fullName")}
                onBlur={form.handleBlur("fullName")}
                autocomplete="name"
              />
              <FormMessage form={form} name="fullName" />
            </Field>

            <Field>
              <FieldLabel for="reg-email" class="text-xs sm:text-sm">Email Address</FieldLabel>
              <Input
                id="reg-email"
                type="email"
                placeholder="niko@nikala.dev"
                value={form.values().email}
                onInput={form.handleChange("email")}
                onBlur={form.handleBlur("email")}
                autocomplete="email"
              />
              <FormMessage form={form} name="email" />
            </Field>

            {/* Password with Strength Meter */}
            <Field class="space-y-1.5">
              <div class="flex items-center justify-between">
                <FieldLabel for="reg-password" class="text-xs sm:text-sm">Password</FieldLabel>
                <Show when={password().length > 0}>
                  <Badge variant={strengthBadgeVariant()} class="text-[10px] px-1.5 py-0 font-mono">
                    {strengthLabel()}
                  </Badge>
                </Show>
              </div>

              <div class="relative">
                <Input
                  id="reg-password"
                  type={showPassword() ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={form.values().password}
                  onInput={form.handleChange("password")}
                  onBlur={form.handleBlur("password")}
                  autocomplete="new-password"
                  class="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword())}
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 cursor-pointer"
                  aria-label={showPassword() ? "Hide password" : "Show password"}
                >
                  <Show when={showPassword()} fallback={<Eye class="size-4" />}>
                    <EyeOff class="size-4" />
                  </Show>
                </button>
              </div>
              <FormMessage form={form} name="password" />

              {/* Reactive Password Strength Progress Bar */}
              <Show when={password().length > 0}>
                <Progress
                  value={strengthScore()}
                  class="h-1.5 mt-2"
                  indicatorClass={strengthColorClass()}
                />

                {/* Validation Checklist */}
                <div class="grid grid-cols-2 gap-1.5 pt-1 text-[11px] text-muted-foreground">
                  <div class={`flex items-center gap-1.5 ${hasMinLength() ? "text-emerald-500 font-medium" : ""}`}>
                    <Show when={hasMinLength()} fallback={<X class="size-3 text-muted-foreground/60" />}>
                      <Check class="size-3" />
                    </Show>
                    <span>8+ characters</span>
                  </div>
                  <div class={`flex items-center gap-1.5 ${hasNumber() ? "text-emerald-500 font-medium" : ""}`}>
                    <Show when={hasNumber()} fallback={<X class="size-3 text-muted-foreground/60" />}>
                      <Check class="size-3" />
                    </Show>
                    <span>At least 1 number</span>
                  </div>
                  <div class={`flex items-center gap-1.5 ${hasUpperLower() ? "text-emerald-500 font-medium" : ""}`}>
                    <Show when={hasUpperLower()} fallback={<X class="size-3 text-muted-foreground/60" />}>
                      <Check class="size-3" />
                    </Show>
                    <span>Uppercase & lowercase</span>
                  </div>
                  <div class={`flex items-center gap-1.5 ${hasSpecial() ? "text-emerald-500 font-medium" : ""}`}>
                    <Show when={hasSpecial()} fallback={<X class="size-3 text-muted-foreground/60" />}>
                      <Check class="size-3" />
                    </Show>
                    <span>1 special symbol</span>
                  </div>
                </div>
              </Show>
            </Field>

            {/* Terms of Service Agreement */}
            <div class="space-y-1 pt-1">
              <div class="flex items-start space-x-2.5">
                <Checkbox
                  id="reg-terms"
                  checked={form.values().agreeTerms}
                  onChange={(checked) => form.setFieldValue("agreeTerms", checked)}
                  class="mt-0.5"
                />
                <Label
                  for="reg-terms"
                  class="text-xs font-normal text-muted-foreground cursor-pointer select-none leading-tight"
                >
                  I agree to the{" "}
                  <a href="#terms" class="text-primary font-medium underline hover:text-primary/80">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#privacy" class="text-primary font-medium underline hover:text-primary/80">
                    Privacy Policy
                  </a>.
                </Label>
              </div>
              <FormMessage form={form} name="agreeTerms" />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              class="w-full mt-3 font-medium"
              disabled={form.isSubmitting() || !isFormValid()}
            >
              <Show when={form.isSubmitting()} fallback={<>Create Account <ArrowRight class="ml-2 size-4" /></>}>
                Creating account...
              </Show>
            </Button>
          </Form>
        </CardContent>

        {/* Card Footer */}
        <CardFooter class="justify-center border-t border-border/50 py-4 text-xs text-muted-foreground">
          Already have an account?{" "}
          <a href="/blocks/login-01" class="text-primary font-semibold hover:underline ml-1">
            Sign in
          </a>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register01;
