// src/routes/docs/hooks/index.tsx
import { For } from "solid-js";
import { A } from "@solidjs/router";
import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { HOOKS_LIST } from "@/config/docs";
import { Webhook } from "lucide-solid";

export default function HooksIndexPage() {
  return (
    <>
      <Seo
        title="Custom Reactive Hooks"
        description="Collection of fine-grained reactive primitives and custom hooks for Nikala UI."
        path="/docs/hooks"
      />

      <div class="space-y-10 pb-16">
        <DocPageHeader
          title="Hooks & Primitives"
          badge="Primitives"
          description="Explore reusable, fine-grained reactive hooks and state primitives built for SolidJS and Nikala UI."
        />

        <div class="space-y-6">
          <DocSectionHeader title="Available Hooks" />

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <For each={HOOKS_LIST}>
              {(hook) => (
                <A
                  href={hook.href}
                  class="group relative flex flex-col justify-between rounded-lg border border-border/60 bg-card p-5 transition-all hover:border-primary/50 hover:shadow-md"
                >
                  <div class="space-y-2">
                    <div class="flex items-center space-x-2">
                      <Webhook class="h-4 w-4 text-primary transition-transform group-hover:scale-110" />
                      <h3 class="text-sm font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
                        {hook.title}
                      </h3>
                    </div>
                    <p class="text-xs text-muted-foreground leading-relaxed">
                      {hook.description}
                    </p>
                  </div>

                  <div class="mt-4 flex items-center text-xs font-medium text-primary">
                    <span>View Documentation</span>
                    <svg
                      class="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </A>
              )}
            </For>
          </div>
        </div>

        <DocNextSteps
          prev={{ title: "Theming Guide", href: "/docs/theming" }}
          next={{ title: "createControllableSignal Primitive", href: "/docs/hooks/create-controllable-signal" }}
        />
      </div>
    </>
  );
}
