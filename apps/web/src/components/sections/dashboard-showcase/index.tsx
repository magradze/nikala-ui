import { createSignal } from "solid-js";
import { ShowcaseHeader } from "./showcase-header";
import { ShowcaseTable, SAMPLE_ORDERS, type OrderItem } from "./showcase-table";
import { ShowcaseTimeline } from "./showcase-timeline";

export function DashboardShowcase() {
  const [period, setPeriod] = createSignal("week");
  const [selectedOrder, setSelectedOrder] = createSignal<OrderItem>(SAMPLE_ORDERS[0]);

  return (
    <section class="py-16 md:py-24 border-b border-border/40 bg-muted/20">
      <div class="container max-w-7xl px-4 mx-auto space-y-8">
        {/* Section Title */}
        <div class="text-center space-y-3 max-w-2xl mx-auto">
          <h2 class="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Production-Ready Component Composition
          </h2>
          <p class="text-sm sm:text-base text-muted-foreground">
            See how Nikala UI primitives combine effortlessly into complex, accessible dashboards with zero re-rendering overhead.
          </p>
        </div>

        {/* The Live Mini-Dashboard Shell */}
        <div class="rounded-xl border border-border/80 bg-background/90 backdrop-blur-xl p-5 md:p-8 shadow-xl space-y-6">
          <ShowcaseHeader period={period()} onPeriodChange={setPeriod} />

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Left: Orders Table (Spans 2 cols on Desktop) */}
            <div class="lg:col-span-2 space-y-3">
              <ShowcaseTable
                selectedOrderId={selectedOrder().id}
                onSelectOrder={setSelectedOrder}
              />
              <p class="text-[11px] text-muted-foreground text-left">
                💡 <span class="font-medium text-foreground">Interactive tip:</span> Click on any order row in the table to switch the live fulfillment tracking timeline.
              </p>
            </div>

            {/* Right: Fulfillment Timeline (Spans 1 col, matches table height) */}
            <div class="space-y-4">
              <ShowcaseTimeline order={selectedOrder()} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export * from "./showcase-header";
export * from "./showcase-table";
export * from "./showcase-timeline";
