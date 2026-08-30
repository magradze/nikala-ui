import { createSignal, Show, type Component } from "solid-js";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { Separator } from "../components/ui/separator";
import { Eye, EyeOff, Sparkles, ArrowRight } from "lucide-solid";

export const Login01: Component = () => {
  const [showPassword, setShowPassword] = createSignal(false);
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [rememberMe, setRememberMe] = createSignal(true);
  const [loading, setLoading] = createSignal(false);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  };

  return (
    <div class="@container w-full min-h-[560px] @5xl:min-h-[700px] grid grid-cols-1 @5xl:grid-cols-2 bg-background text-foreground rounded-lg border border-border overflow-hidden shadow-xs">
      {/* Left Column: Login Form */}
      <div class="flex flex-col justify-between p-6 @md:p-10 @5xl:p-12 w-full">
        {/* Brand Header */}
        <div class="flex items-center gap-2.5">
          <div class="size-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm shadow-2xs shrink-0">
            N
          </div>
          <span class="font-bold text-lg tracking-tight">Nikala UI</span>
        </div>

        {/* Form Container */}
        <div class="mx-auto w-full max-w-sm my-auto py-6 @md:py-8">
          <div class="space-y-1.5 text-left mb-6">
            <h1 class="text-2xl @md:text-3xl font-bold tracking-tight text-foreground">
              Welcome back
            </h1>
            <p class="text-xs @md:text-sm text-muted-foreground">
              Enter your credentials to access your account dashboard
            </p>
          </div>

          {/* Social OAuth Buttons */}
          <div class="grid grid-cols-1 @xs:grid-cols-2 gap-2.5 mb-6">
            <Button variant="outline" class="w-full justify-center text-xs @md:text-sm h-9">
              <svg class="size-4 mr-2 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </Button>
            <Button variant="outline" class="w-full justify-center text-xs @md:text-sm h-9">
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

          <div class="relative mb-6">
            <div class="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div class="relative flex justify-center text-xs uppercase">
              <span class="bg-background px-3 text-muted-foreground font-medium text-[11px]">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} class="space-y-4">
            <div class="space-y-1.5">
              <Label for="email" class="text-xs @md:text-sm font-medium">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@company.com"
                value={email()}
                onInput={(e) => setEmail(e.currentTarget.value)}
                required
                autocomplete="email"
              />
            </div>

            <div class="space-y-1.5">
              <div class="flex items-center justify-between">
                <Label for="password" class="text-xs @md:text-sm font-medium">Password</Label>
                <a
                  href="#forgot"
                  class="text-[11px] @md:text-xs text-primary font-medium hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <div class="relative">
                <Input
                  id="password"
                  type={showPassword() ? "text" : "password"}
                  placeholder="••••••••"
                  value={password()}
                  onInput={(e) => setPassword(e.currentTarget.value)}
                  required
                  autocomplete="current-password"
                  class="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword())}
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                  aria-label={showPassword() ? "Hide password" : "Show password"}
                >
                  <Show
                    when={showPassword()}
                    fallback={<Eye class="size-4" />}
                  >
                    <EyeOff class="size-4" />
                  </Show>
                </button>
              </div>
            </div>

            <div class="flex items-center space-x-2 pt-1">
              <Checkbox
                id="remember"
                checked={rememberMe()}
                onChange={(checked) => setRememberMe(checked)}
              />
              <Label
                for="remember"
                class="text-xs font-normal text-muted-foreground cursor-pointer select-none"
              >
                Remember me for 30 days
              </Label>
            </div>

            <Button
              type="submit"
              class="w-full mt-2 font-medium"
              disabled={loading()}
            >
              <Show when={loading()} fallback={<>Sign In <ArrowRight class="ml-2 size-4" /></>}>
                Signing in...
              </Show>
            </Button>
          </form>

          <p class="text-center text-xs text-muted-foreground mt-6">
            Don't have an account?{" "}
            <a href="#signup" class="text-primary font-semibold hover:underline">
              Sign up
            </a>
          </p>
        </div>

        {/* Footer info */}
        <div class="text-center @md:text-left text-xs text-muted-foreground pt-4 @md:pt-0">
          By signing in, you agree to our{" "}
          <a href="#terms" class="underline hover:text-foreground">Terms of Service</a>{" "}
          and{" "}
          <a href="#privacy" class="underline hover:text-foreground">Privacy Policy</a>.
        </div>
      </div>

      {/* Right Column: Hero Visual & Art / Testimonial Showcase (Desktop only @5xl+) */}
      <div class="hidden @5xl:flex relative flex-col justify-between p-10 bg-muted/40 border-l border-border overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-primary/5 pointer-events-none" />

        <div class="relative z-10 flex items-center gap-2 text-sm font-semibold text-foreground/80">
          <Sparkles class="size-4 text-primary" />
          <span>Production Ready SolidJS UI</span>
        </div>

        <div class="relative z-10 max-w-md space-y-6">
          <blockquote class="text-xl @md:text-2xl font-semibold tracking-tight text-foreground leading-snug">
            "Nikala UI transformed the way our team builds web applications with SolidJS. Fine-grained reactivity meets Tailwind v4 simplicity."
          </blockquote>
          <div class="space-y-1">
            <p class="text-sm font-semibold text-foreground">Davit Kakhidze</p>
            <p class="text-xs text-muted-foreground">Head of Engineering at Studio</p>
          </div>
        </div>

        <div class="relative z-10 flex items-center justify-between text-xs text-muted-foreground">
          <span>Honoring Niko Pirosmani</span>
          <span>© 2026 Nikala UI</span>
        </div>
      </div>
    </div>
  );
};

export default Login01;
