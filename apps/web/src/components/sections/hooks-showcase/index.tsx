import { A } from "@solidjs/router";
import { HookCard } from "./hook-card";
import {
  ClipboardLiveDemo,
  UndoRedoLiveDemo,
  NetworkStatusLiveDemo,
  IdleDetectorLiveDemo,
} from "./hooks-live-demos";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-solid";

export function HooksShowcase() {
  return (
    <section class="py-16 md:py-24 border-b border-border/40">
      <div class="container max-w-7xl px-4 mx-auto space-y-10">
        {/* Section Header */}
        <div class="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <div class="space-y-2 text-left max-w-2xl">
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-primary/30 bg-primary/5 text-primary text-xs font-semibold">
              <Sparkles class="size-3.5" />
              <span>Reactive Primitives Suite</span>
            </div>
            <h2 class="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              40+ Pure SolidJS Hooks & Primitives
            </h2>
            <p class="text-sm sm:text-base text-muted-foreground">
              Fine-grained signals without React-style hook rules or unnecessary lifecycle re-evaluations. Use them independently via copy-paste or the CLI.
            </p>
          </div>

          <A href="/docs/hooks/create-clipboard">
            <Button variant="outline" class="gap-2 text-xs font-semibold cursor-pointer">
              Explore All 40+ Hooks
              <ArrowRight class="size-3.5" />
            </Button>
          </A>
        </div>

        {/* 4 Cards Grid */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Hook 1: createClipboard */}
          <HookCard
            category="Browser / DOM"
            hookName="createClipboard"
            description="Copy text to system clipboard with timeout resets and automatic fallback."
            href="/docs/hooks/create-clipboard"
          >
            <ClipboardLiveDemo />
          </HookCard>

          {/* Hook 2: createUndoRedo */}
          <HookCard
            category="State Management"
            hookName="createUndoRedo"
            description="Time-travel history stack with bounded buffer and granular undo/redo accessors."
            href="/docs/hooks/create-undo-redo"
          >
            <UndoRedoLiveDemo />
          </HookCard>

          {/* Hook 3: createNetworkStatus */}
          <HookCard
            category="Network & Sensors"
            hookName="createNetworkStatus"
            description="Real-time online/offline browser connectivity signal with SSR safety."
            href="/docs/hooks/create-network-status"
          >
            <NetworkStatusLiveDemo />
          </HookCard>

          {/* Hook 4: createIdle */}
          <HookCard
            category="User Activity"
            hookName="createIdle"
            description="Detect user inactivity and idle state based on mouse, touch, and keypress events."
            href="/docs/hooks/create-idle"
          >
            <IdleDetectorLiveDemo />
          </HookCard>
        </div>
      </div>
    </section>
  );
}

export * from "./hook-card";
export * from "./hooks-live-demos";
