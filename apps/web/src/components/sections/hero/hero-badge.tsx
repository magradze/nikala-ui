import { A } from "@solidjs/router";
import { Badge } from "@/components/ui/badge";

export function HeroBadge() {
  return (
    <A href="/docs" class="inline-flex items-center gap-2 group">
      <Badge
        variant="outline"
        class="px-3.5 py-1.5 text-xs rounded-lg border-primary/30 bg-primary/5 hover:bg-primary/10 transition-all cursor-pointer shadow-xs gap-1.5"
      >
        <span class="size-2 rounded-lg bg-primary animate-pulse mr-1" />
        <span class="font-medium text-foreground">Nikala UI v0.10.1 is now live for Tailwind v4</span>
      </Badge>
    </A>
  );
}
