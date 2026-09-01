import { For } from "solid-js";
import { Palette, Check } from "lucide-solid";
import { useTheme, type AccentColor } from "@/providers/theme-provider";
import { cn } from "@/lib/cn";

export interface AccentOption {
  name: AccentColor;
  label: string;
  colorClass: string;
}

export const ACCENT_OPTIONS: AccentOption[] = [
  { name: "amber", label: "Amber (Default)", colorClass: "bg-[#d97706]" },
  { name: "violet", label: "Violet", colorClass: "bg-[#7c3aed]" },
  { name: "sky", label: "Sky", colorClass: "bg-[#0284c7]" },
  { name: "emerald", label: "Emerald", colorClass: "bg-[#059669]" },
  { name: "rose", label: "Rose", colorClass: "bg-[#e11d48]" },
  { name: "zinc", label: "Zinc", colorClass: "bg-[#18181b] dark:bg-[#fafafa]" },
];

export function HeroThemePicker() {
  const { accent, setAccent } = useTheme();

  const currentAccent = () => accent() || "amber";

  return (
    <div class="inline-flex items-center gap-3 p-1.5 px-3.5 rounded-lg border border-border/80 bg-card/60 backdrop-blur-md shadow-xs text-xs">
      <div class="flex items-center gap-1.5 text-muted-foreground font-medium pr-1">
        <Palette class="size-3.5 text-primary" />
        <span class="hidden sm:inline">Theme:</span>
      </div>
      <div class="flex items-center gap-1.5">
        <For each={ACCENT_OPTIONS}>
          {(opt) => {
            const isSelected = () => currentAccent() === opt.name;

            return (
              <button
                type="button"
                onClick={() => setAccent(opt.name)}
                class={cn(
                  "relative size-5 rounded-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer flex items-center justify-center ring-offset-background",
                  opt.colorClass,
                  isSelected() && "ring-2 ring-foreground/60 ring-offset-1 scale-110"
                )}
                title={opt.label}
                aria-label={`Select ${opt.label} accent color`}
              >
                {isSelected() && (
                  <Check class="size-3 text-white dark:text-foreground drop-shadow-xs stroke-[3]" />
                )}
              </button>
            );
          }}
        </For>
      </div>
    </div>
  );
}
