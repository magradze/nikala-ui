import { PmRunnerSelector } from "@/components/docs/pm-runner-selector";

export function CliPmSwitcher() {
  return (
    <div class="flex items-center justify-between p-3 rounded-lg border border-border bg-card/60 shadow-2xs">
      <span class="text-xs font-semibold text-muted-foreground uppercase tracking-wider font-mono">
        Package Manager Runner:
      </span>
      <PmRunnerSelector size="md" />
    </div>
  );
}