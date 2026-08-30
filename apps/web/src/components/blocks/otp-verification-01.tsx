import { createSignal, onMount, onCleanup, Show, type Component } from "solid-js";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { PinInput, PinInputInput } from "@/components/ui/pin-input";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { KeyRound, Mail, CheckCircle2, RotateCcw, ArrowRight } from "lucide-solid";

export const OtpVerification01: Component = () => {
  const [code, setCode] = createSignal("");
  const [loading, setLoading] = createSignal(false);
  const [verified, setVerified] = createSignal(false);
  const [countdown, setCountdown] = createSignal(59);
  const [canResend, setCanResend] = createSignal(false);

  let timerId: ReturnType<typeof setInterval> | undefined;

  const startCountdown = () => {
    setCountdown(59);
    setCanResend(false);
    clearInterval(timerId);
    timerId = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerId);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  onMount(() => {
    startCountdown();
  });

  onCleanup(() => {
    clearInterval(timerId);
  });

  const handleVerify = (e: Event) => {
    e.preventDefault();
    if (code().length < 6) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVerified(true);
    }, 1200);
  };

  const handleResend = () => {
    if (!canResend()) return;
    setCode("");
    startCountdown();
  };

  return (
    <div class="@container w-full min-h-[500px] flex items-center justify-center p-4 sm:p-6 md:p-10">
      <Card class="w-full max-w-md border-border shadow-md bg-card">
        {/* Card Header */}
        <CardHeader class="space-y-2 text-center pb-4">
          <div class="mx-auto size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-1 shadow-2xs">
            <KeyRound class="size-6" />
          </div>
          <div class="flex items-center justify-center gap-2">
            <CardTitle class="text-2xl font-bold tracking-tight">Two-Factor Auth</CardTitle>
            <Badge variant="secondary" class="text-[10px] px-1.5 py-0 font-mono">
              2FA
            </Badge>
          </div>
          <CardDescription class="text-xs sm:text-sm">
            Enter the 6-digit security code sent to your registered email address
          </CardDescription>
        </CardHeader>

        <CardContent class="space-y-6">
          {/* Info Alert */}
          <Alert class="bg-muted/40 border-border/70 py-2.5">
            <Mail class="size-4 text-primary shrink-0" />
            <AlertTitle class="text-xs font-semibold">Verification Code Sent</AlertTitle>
            <AlertDescription class="text-[11px] text-muted-foreground">
              Sent to <span class="font-medium text-foreground font-mono">dev***@nikala.dev</span>
            </AlertDescription>
          </Alert>

          {/* Form */}
          <Form onSubmit={handleVerify} loading={loading()} class="space-y-6">
            {/* Responsive 6-Digit PinInput */}
            <div class="flex flex-col items-center justify-center space-y-2 w-full">
              <PinInput
                value={code()}
                onValueChange={setCode}
                length={6}
                type="numeric"
                class="justify-center items-center gap-1.5 @sm:gap-2.5 max-w-full"
              >
                <PinInputInput index={0} class="h-9 w-9 @sm:h-11 @sm:w-11 text-sm @sm:text-base font-semibold" />
                <PinInputInput index={1} class="h-9 w-9 @sm:h-11 @sm:w-11 text-sm @sm:text-base font-semibold" />
                <PinInputInput index={2} class="h-9 w-9 @sm:h-11 @sm:w-11 text-sm @sm:text-base font-semibold" />
                <PinInputInput index={3} class="h-9 w-9 @sm:h-11 @sm:w-11 text-sm @sm:text-base font-semibold" />
                <PinInputInput index={4} class="h-9 w-9 @sm:h-11 @sm:w-11 text-sm @sm:text-base font-semibold" />
                <PinInputInput index={5} class="h-9 w-9 @sm:h-11 @sm:w-11 text-sm @sm:text-base font-semibold" />
              </PinInput>

              <Show when={verified()}>
                <div class="flex items-center gap-1.5 text-xs text-emerald-500 font-medium pt-1">
                  <CheckCircle2 class="size-3.5" />
                  <span>Code verified successfully!</span>
                </div>
              </Show>
            </div>

            {/* Countdown / Resend Action */}
            <div class="flex items-center justify-between text-xs text-muted-foreground px-1">
              <span>Didn't receive code?</span>
              <Show
                when={canResend()}
                fallback={
                  <span class="font-mono text-primary text-[11px]">
                    Resend in 00:{countdown() < 10 ? `0${countdown()}` : countdown()}s
                  </span>
                }
              >
                <Button
                  variant="link"
                  size="sm"
                  type="button"
                  onClick={handleResend}
                  class="h-auto p-0 text-xs text-primary font-semibold gap-1"
                >
                  <RotateCcw class="size-3" /> Resend Code
                </Button>
              </Show>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              class="w-full font-medium"
              disabled={loading() || code().length < 6 || verified()}
            >
              <Show when={loading()} fallback={<>Verify Account <ArrowRight class="ml-2 size-4" /></>}>
                Verifying...
              </Show>
            </Button>
          </Form>
        </CardContent>

        {/* Card Footer */}
        <CardFooter class="justify-center border-t border-border/50 py-4 text-xs text-muted-foreground">
          Need help?{" "}
          <a href="#support" class="text-primary font-semibold hover:underline ml-1">
            Contact Security Team
          </a>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OtpVerification01;
