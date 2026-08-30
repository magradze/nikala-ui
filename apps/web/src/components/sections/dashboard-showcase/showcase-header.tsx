import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Badge } from "@/components/ui/badge";
import { Calendar, Layers } from "lucide-solid";

export interface ShowcaseHeaderProps {
  period: string;
  onPeriodChange: (val: string) => void;
}

export function ShowcaseHeader(props: ShowcaseHeaderProps) {
  return (
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-border/60">
      <div class="space-y-1 text-left">
        <div class="flex items-center gap-2.5">
          <div class="p-2 rounded-lg bg-primary/10 text-primary">
            <Layers class="size-4" />
          </div>
          <div>
            <h3 class="text-lg font-bold text-foreground tracking-tight">
              Order Logistics & Store Operations
            </h3>
            <p class="text-xs text-muted-foreground">
              Composed purely with <span class="text-primary font-medium">Table</span>, <span class="text-primary font-medium">Timeline</span>, and <span class="text-primary font-medium">ToggleGroup</span> primitives.
            </p>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
        <Badge variant="outline" class="gap-1.5 text-xs py-1 px-2.5 rounded-md">
          <span class="size-2 rounded-lg bg-emerald-500 animate-pulse" />
          Live Store
        </Badge>

        <ToggleGroup
          type="single"
          value={props.period}
          onChange={(val) => val && props.onPeriodChange(val)}
          size="sm"
          variant="outline"
          class="bg-background"
        >
          <ToggleGroupItem value="today" class="text-xs px-2.5">
            Today
          </ToggleGroupItem>
          <ToggleGroupItem value="week" class="text-xs px-2.5">
            7 Days
          </ToggleGroupItem>
          <ToggleGroupItem value="month" class="text-xs px-2.5">
            30 Days
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}
