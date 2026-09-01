import { For } from "solid-js";
import { isServer } from "solid-js/web";
import { Palette, Check } from "lucide-solid";
import { useTheme, type AccentColor } from "@/providers/theme-provider";
import { cn } from "@/lib/cn";

export interface AccentOption {
  name: AccentColor;
  label: string;
  colorClass: string;
}

export const ACCENT_OPTIONS: AccentOption[] = [
  { name: "yellow", label: "Yellow (Default)", colorClass: "bg-yellow-500" },
  { name: "red", label: "Red", colorClass: "bg-red-500" },
  { name: "violet", label: "Violet", colorClass: "bg-violet-500" },
  { name: "sky", label: "Sky", colorClass: "bg-sky-500" },
  { name: "emerald", label: "Emerald", colorClass: "bg-emerald-500" },
  { name: "zinc", label: "Zinc", colorClass: "bg-zinc-800 dark:bg-zinc-200" },
];

export function HeroThemePicker() {
  const { accent, setAccent } = useTheme();

  const isSelected = (name: AccentColor) => {
    if (isServer) return false;
    const current = accent() || "yellow";
    return current === name;
  };

  return (
    <div class="inline-flex items-center gap-3 p-1.5 px-3.5 rounded-lg border border-border/80 bg-card/60 backdrop-blur-md shadow-xs text-xs">
      <div class="flex items-center gap-1.5 text-muted-foreground font-medium pr-1">
        <Palette class="size-3.5 text-primary" />
        <span class="hidden sm:inline">Theme:</span>
      </div>
      <div class="flex items-center gap-1.5">
        <For each={ACCENT_OPTIONS}>
          {(opt) => {
            const selected = () => isSelected(opt.name);

            return (
              <button
                type="button"
                onClick={() => setAccent(opt.name)}
                class={cn(
                  "relative size-5 rounded-lg transition-all hover:scale-110 active:scale-95 cursor-pointer flex items-center justify-center ring-offset-background",
                  opt.colorClass
                )}
                classList={{
                  "ring-2 ring-foreground/60 ring-offset-1 scale-110": selected(),
                }}
                title={opt.label}
                aria-label={`Select ${opt.label} accent color`}
              >
                <Check
                  class="size-3 text-white dark:text-foreground drop-shadow-xs stroke-[3] transition-all duration-150 pointer-events-none"
                  classList={{
                    "opacity-100 scale-100": selected(),
                    "opacity-0 scale-75": !selected(),
                  }}
                />
              </button>
            );
          }}
        </For>
      </div>
    </div>
  );
}
