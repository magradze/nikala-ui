import { FeatureCard } from "./feature-card";
import {
  Zap,
  Palette,
  Wrench,
  ShieldCheck,
  Sparkles,
  Layers,
} from "lucide-solid";

export function FeaturesGrid() {
  return (
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Feature 1 */}
      <FeatureCard
        icon={<Zap class="size-5" />}
        title="Zero Virtual DOM Overhead"
        badge="Performance"
        description="Built specifically for SolidJS fine-grained signal tracking. Never breaks reactive updates with full splitProps prop delegation."
      />

      {/* Feature 2 */}
      <FeatureCard
        icon={<Wrench class="size-5" />}
        title="100% Pure Code Ownership"
        badge="No Vendor Lock-in"
        description="Every component and primitive copies directly into your local src/components/ui/ directory. Edit and modify styles freely."
      />

      {/* Feature 3 */}
      <FeatureCard
        icon={<Palette class="size-5" />}
        title="Tailwind CSS v4 Native"
        badge="CSS-First"
        description="Engineered around modern @import 'tailwindcss'; design tokens (--primary, --border, --background) with seamless dark mode."
      />

      {/* Feature 4 */}
      <FeatureCard
        icon={<Layers class="size-5" />}
        title="40+ Standalone Hooks"
        badge="Reactivity Suite"
        description="Includes independent primitives for clipboard, network status, idle timers, dropzones, keyboard shortcuts, and media queries."
      />

      {/* Feature 5 */}
      <FeatureCard
        icon={<ShieldCheck class="size-5" />}
        title="Accessible by Default"
        badge="WAI-ARIA"
        description="Powered by the robust Kobalte UI primitive engine. Full keyboard navigation, roving focus, ARIA live regions, and SSR safety."
      />

      {/* Feature 6 */}
      <FeatureCard
        icon={<Sparkles class="size-5" />}
        title="AI MCP Server & Smart CLI"
        badge="Developer Experience"
        description="Autonomous AI tools for Cursor, Windsurf, and Claude Code alongside an interactive multi-select CLI binary."
      />
    </div>
  );
}
