import { For } from "solid-js";
import { usePackageManager, type PackageManager } from "@/hooks/use-package-manager";

export function CliPmSwitcher() {
  const { activePm, setPm } = usePackageManager();
  const pmList: PackageManager[] = ["bunx", "npx", "pnpm", "yarn"];

  return (
    <div class="flex items-center justify-between p-3 rounded-lg border border-border bg-card/60 shadow-2xs">
      <span class="text-xs font-semibold text-muted-foreground uppercase tracking-wider font-mono">
        Package Manager Runner:
      </span>
      <div class="flex items-center rounded-md border border-border bg-muted/40 p-0.5 text-xs font-mono select-none">
        <For each={pmList}>
          {(pm) => (
            <button
              type="button"
              onClick={() => setPm(pm)}
              class={`px-2.5 py-1 rounded-sm transition-colors cursor-pointer ${
                activePm() === pm
                  ? "bg-primary text-primary-foreground font-bold shadow-2xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {pm}
            </button>
          )}
        </For>
      </div>
    </div>
  );
}