import { Palette } from "lucide-solid";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocCallout } from "@/components/docs/doc-callout";

const accentColors = [
  { name: "amber", hex: "#d97706", bg: "bg-[#d97706]" },
  { name: "violet", hex: "#7c3aed", bg: "bg-[#7c3aed]" },
  { name: "sky", hex: "#0284c7", bg: "bg-[#0284c7]" },
  { name: "emerald", hex: "#059669", bg: "bg-[#059669]" },
  { name: "rose", hex: "#e11d48", bg: "bg-[#e11d48]" },
  { name: "zinc", hex: "#18181b", bg: "bg-[#18181b] dark:bg-[#fafafa]" },
];

const baseGrays = ["zinc (default)", "slate", "gray", "neutral", "stone"];

export function ThemingPalettesSection() {
  return (
    <div class="space-y-6">
      <DocSectionHeader
        title="Supported Palettes & Accent Colors"
        description="Select from base gray palettes and dynamic brand accent colors."
      />

      <DocCallout variant="warning" title="Amber Accent (#d97706)" icon={Palette}>
        The signature <code class="font-bold text-primary">amber</code> accent color provides a warm, energetic gold tone for your components.
      </DocCallout>

      {/* Base Gray Palettes */}
      <div class="space-y-3">
        <h3 class="text-sm font-semibold tracking-tight">Base Gray Palettes</h3>
        <div class="flex flex-wrap gap-2 text-xs font-mono">
          {baseGrays.map((gray) => (
            <span class="px-3 py-1.5 rounded-md border border-border bg-card shadow-sm">
              {gray}
            </span>
          ))}
        </div>
      </div>

      {/* Primary Brand Accent Colors Grid */}
      <div class="space-y-3">
        <h3 class="text-sm font-semibold tracking-tight">Primary Brand Accent Colors</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {accentColors.map((item) => (
            <div class="flex items-center gap-2.5 p-2.5 rounded-lg border border-border bg-card shadow-sm hover:border-primary/50 transition-colors">
              <span class={`w-5 h-5 rounded-lg shrink-0 shadow-inner ${item.bg}`} />
              <div class="flex flex-col text-xs font-mono">
                <span class="font-bold capitalize">{item.name}</span>
                <span class="text-muted-foreground text-[10px]">{item.hex}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}