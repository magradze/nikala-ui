import { CtaBanner } from "./cta-banner";

export function CtaSection() {
  return (
    <section class="py-16 md:py-24">
      <div class="container max-w-7xl px-4 mx-auto">
        <CtaBanner />
      </div>
    </section>
  );
}

export * from "./cta-banner";
