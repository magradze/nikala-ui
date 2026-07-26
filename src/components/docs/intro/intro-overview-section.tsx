import { DocSectionHeader } from "@/components/docs/doc-section-header";

export function IntroOverviewSection() {
  return (
    <div class="space-y-4">
      <DocSectionHeader title="What is Nikala UI?" />
      <p class="text-sm sm:text-base text-muted-foreground leading-relaxed">
        Tailwind CSS v4 introduced a CSS-first configuration (<code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">@theme</code>), which broke compatibility with many existing SolidJS UI wrappers.
      </p>
      <p class="text-sm sm:text-base text-muted-foreground leading-relaxed">
        Instead of adding a heavy third-party UI package to your <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">node_modules</code>, Nikala's CLI writes lightweight, fully reactive SolidJS components directly into your <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">src/components/ui</code> directory. You own 100% of the source code.
      </p>
    </div>
  );
}