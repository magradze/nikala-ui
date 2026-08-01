import type { ComponentSpec } from "@/types/playground";

/* Dynamically auto-discover all component specs from stages directory */
const stageModules = import.meta.glob<{ config: ComponentSpec }>(
  "../components/playground/stages/*.tsx",
  { eager: true }
);

export const PLAYGROUND_COMPONENTS: ComponentSpec[] = Object.values(stageModules)
  .map((mod) => mod.config)
  .filter(Boolean);